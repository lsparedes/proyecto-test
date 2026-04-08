export class WavRecorder {
  constructor() {
    this.audioContext = null;
    this.stream = null;
    this.source = null;
    this.processor = null;
    this.chunks = [];
    this.sampleRate = 44100;
    this.isRecording = false;
    this.prepared = false;
  }

  async prepare() {
    if (this.prepared) return;

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.sampleRate = this.audioContext.sampleRate;

    this.source = this.audioContext.createMediaStreamSource(this.stream);

    const bufferSize = 4096;
    this.processor = this.audioContext.createScriptProcessor(bufferSize, 1, 1);

    this.processor.onaudioprocess = (e) => {
      if (!this.isRecording) return;
      const channelData = e.inputBuffer.getChannelData(0);
      this.chunks.push(new Float32Array(channelData));
    };

    this.source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);

    this.prepared = true;
  }

  start() {
    this.chunks = [];
    this.isRecording = true;
  }

  stop() {
    this.isRecording = false;
    const wavBlob = this.exportWAV();
    return wavBlob;
  }

  exportWAV() {
    const mergedBuffer = this.mergeBuffers(this.chunks);
    const wavBuffer = this.encodeWAV(mergedBuffer);
    return new Blob([wavBuffer], { type: "audio/wav" });
  }

  mergeBuffers(chunks) {
    let length = 0;
    for (const chunk of chunks) length += chunk.length;

    const result = new Float32Array(length);
    let offset = 0;

    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  }

  encodeWAV(samples) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    this.writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    this.writeString(view, 8, "WAVE");
    this.writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, this.sampleRate, true);
    view.setUint32(28, this.sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    this.writeString(view, 36, "data");
    view.setUint32(40, samples.length * 2, true);

    this.floatTo16BitPCM(view, 44, samples);

    return buffer;
  }

  floatTo16BitPCM(view, offset, input) {
    for (let i = 0; i < input.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }

  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  destroy() {
    try {
      if (this.processor) this.processor.disconnect();
      if (this.source) this.source.disconnect();
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
      }
      if (this.audioContext) this.audioContext.close();
    } catch (e) {
      console.warn("Error liberando grabador:", e);
    }

    this.processor = null;
    this.source = null;
    this.stream = null;
    this.audioContext = null;
    this.prepared = false;
    this.isRecording = false;
  }
}