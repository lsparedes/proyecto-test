// js/video_recorder.js
export class VideoRecorder {
  constructor() {
    this.stream = null;
    this.mediaRecorder = null;
    this.chunks = [];
    this.recording = false;
  }

  async startStream(videoEl) {
    if (!this.stream) {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true
      });
    }
    if (videoEl) videoEl.srcObject = this.stream;
    return this.stream;
  }

  stopStream() {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
  }

  async startRecording() {
    if (!this.stream) throw new Error("No stream");
    if (this.recording) return;

    const mime = this._pickMimeType();
    this.chunks = [];

    this.mediaRecorder = new MediaRecorder(this.stream, mime ? { mimeType: mime } : undefined);
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) this.chunks.push(e.data);
    };

    await new Promise((resolve) => {
      this.mediaRecorder.onstart = resolve;
      this.mediaRecorder.start(250); // trozos
    });

    this.recording = true;
  }

  async stopRecording() {
    if (!this.mediaRecorder || !this.recording) return null;

    await new Promise((resolve) => {
      this.mediaRecorder.onstop = resolve;
      this.mediaRecorder.stop();
    });

    this.recording = false;

    const blob = new Blob(this.chunks, { type: this.mediaRecorder.mimeType || "video/webm" });
    this.mediaRecorder = null;
    this.chunks = [];
    return blob;
  }

  _pickMimeType() {
    const candidates = [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm;codecs=vp8",
      "video/webm"
    ];
    for (const c of candidates) {
      if (MediaRecorder.isTypeSupported(c)) return c;
    }
    return "";
  }
}