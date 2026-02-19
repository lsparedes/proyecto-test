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
    this.recording = false;
    this.numChannels = 1;
  }

  async start({ numChannels = 1 } = {}) {
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

  async stop() {
    if (!this.recording) return null;
    this.recording = false;

    // desconectar nodos
    try { this.processor.disconnect(); } catch {}
    try { this.source.disconnect(); } catch {}

    // detener stream
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
    }

    // cerrar AudioContext
    if (this.audioContext) {
      try { await this.audioContext.close(); } catch {}
    }

    const wavBlob = this._encodeWav(this.buffers, this.sampleRate);
    // limpiar
    this.audioContext = null;
    this.stream = null;
    this.source = null;
    this.processor = null;
    this.buffers = [];

    return wavBlob;
  }

  _encodeWav(chunks, sampleRate) {
    // concatenar Float32
    const length = chunks.reduce((acc, cur) => acc + cur.length, 0);
    const pcm = new Float32Array(length);
    let offset = 0;
    for (const c of chunks) { pcm.set(c, offset); offset += c.length; }

    // convertir a PCM 16-bit
    const bytesPerSample = 2;
    const blockAlign = this.numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = pcm.length * bytesPerSample;

    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    // RIFF header
    this._writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    this._writeString(view, 8, "WAVE");

    // fmt chunk
    this._writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);           // PCM
    view.setUint16(20, 1, true);            // AudioFormat PCM
    view.setUint16(22, this.numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);           // bits per sample

    // data chunk
    this._writeString(view, 36, "data");
    view.setUint32(40, dataSize, true);

    // samples
    let idx = 44;
    for (let i = 0; i < pcm.length; i++) {
      let s = Math.max(-1, Math.min(1, pcm[i]));
      // float -> int16
      const int16 = s < 0 ? s * 0x8000 : s * 0x7FFF;
      view.setInt16(idx, int16, true);
      idx += 2;
    }

    return new Blob([view], { type: "audio/wav" });
  }

  _writeString(view, offset, str) {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  }
}
