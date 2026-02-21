// js/audio_recorder_wav.js
// Grabación WAV (PCM 16-bit) usando Web Audio (sin MediaRecorder)

export class WavRecorder {
  constructor() {
    this.audioContext = null;
    this.stream = null;
    this.source = null;
    this.processor = null;
    this.buffers = [];
    this.sampleRate = 44100;
    this.capture = false;
    this.numChannels = 1;
    this.prepared = false;
  }

  async prepare({ numChannels = 1 } = {}) {
    if (this.prepared) return;
    this.numChannels = numChannels;

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.sampleRate = this.audioContext.sampleRate;

    this.source = this.audioContext.createMediaStreamSource(this.stream);

    const bufferSize = 4096;
    this.processor = this.audioContext.createScriptProcessor(bufferSize, this.numChannels, this.numChannels);

    this.buffers = [];
    this.capture = false;

    this.processor.onaudioprocess = (e) => {
      if (!this.capture) return;
      const input = e.inputBuffer.getChannelData(0);
      this.buffers.push(new Float32Array(input));
    };

    this.source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);

    this.prepared = true;
  }

  beginCapture() {
    if (!this.prepared) throw new Error("Recorder not prepared");
    this.buffers = [];
    this.capture = true;
  }

  async stop() {
    if (!this.prepared) return null;
    this.capture = false;

    const wavBlob = this._encodeWav(this.buffers, this.sampleRate);

    // limpiar para próxima toma (mantenemos pipeline listo)
    this.buffers = [];
    return wavBlob;
  }

  async close() {
    // cerrar totalmente (al salir del test)
    try { this.processor?.disconnect(); } catch {}
    try { this.source?.disconnect(); } catch {}

    if (this.stream) this.stream.getTracks().forEach(t => t.stop());
    if (this.audioContext) {
      try { await this.audioContext.close(); } catch {}
    }

    this.audioContext = null;
    this.stream = null;
    this.source = null;
    this.processor = null;
    this.buffers = [];
    this.prepared = false;
  }

  _encodeWav(chunks, sampleRate) {
    const length = chunks.reduce((acc, cur) => acc + cur.length, 0);
    const pcm = new Float32Array(length);
    let offset = 0;
    for (const c of chunks) { pcm.set(c, offset); offset += c.length; }

    const bytesPerSample = 2;
    const blockAlign = this.numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = pcm.length * bytesPerSample;

    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    this._writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    this._writeString(view, 8, "WAVE");

    this._writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, this.numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);

    this._writeString(view, 36, "data");
    view.setUint32(40, dataSize, true);

    let idx = 44;
    for (let i = 0; i < pcm.length; i++) {
      let s = Math.max(-1, Math.min(1, pcm[i]));
      const int16 = s < 0 ? s * 0x8000 : s * 0x7FFF;
      view.setInt16(idx, int16, true);
      idx += 2;
    }

    return new Blob([view], { type: "audio/wav" });
  }

  _writeString(view, offset, str) {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  }


  /*async start({ numChannels = 1 } = {}) {
    if (this.recording) return;
    this.numChannels = numChannels;

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.sampleRate = this.audioContext.sampleRate;

    this.source = this.audioContext.createMediaStreamSource(this.stream);

    // ScriptProcessor es simple y suficiente para tu caso (compatibilidad)
    const bufferSize = 4096;
    this.processor = this.audioContext.createScriptProcessor(bufferSize, this.numChannels, this.numChannels);

    this.buffers = [];
    this.processor.onaudioprocess = (e) => {
      if (!this.recording) return;
      const input = e.inputBuffer.getChannelData(0);
      // clonar (porque el buffer se reutiliza)
      this.buffers.push(new Float32Array(input));
    };

    this.source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);

    this.recording = true;
  }
*/
 
}
