import { MODULO3 } from "./habla_script.js";

const url = new URL(window.location.href);
const partId = Number(url.searchParams.get("part") || "1");
const test = MODULO3.tests.find((item) => item.id === partId) || null;
const test1Section = document.getElementById("part-1-test-1");
const test2Section = document.getElementById("part-1-test-2");

if (test1Section) {
  test1Section.style.display = "none";
}

if (test2Section) {
  test2Section.style.display = "none";
}

if (test?.id === 1) {
  setupPart1Test1(test);
}

if (test?.id === 2) {
  setupPart1Test2(test);
}

function setupPart1Test1(testConfig) {
  const section = document.getElementById("part-1-test-1");
  const instructionView = document.getElementById("p1t1-screen-instruction");
  const wordView = document.getElementById("p1t1-screen-word");
  const recordView = document.getElementById("p1t1-screen-record");

  if (!section || !instructionView || !wordView || !recordView) {
    return;
  }

  section.style.display = "block";

  const screens = testConfig.screens || [];
  const instructionText = document.getElementById("p1t1-instruction-text");
  const centerAudio = document.getElementById("p1t1-center-audio");
  const wordLabel = document.getElementById("p1t1-word-label");
  const recordTitle = document.getElementById("p1t1-record-title");
  const camera = document.getElementById("p1t1-camera");
  const recBtn = document.getElementById("p1t1-rec-btn");
  const recordingIndicator = document.getElementById("p1t1-recording-indicator");
  const stopBtn = document.getElementById("p1t1-stop-btn");
  const fullscreenBtn = document.getElementById("p1t1-fullscreen-btn");
  const audioBtn = document.getElementById("p1t1-audio-btn");
  const nextBtn = document.getElementById("p1t1-next-btn");
  const audioPlayer = document.getElementById("p1t1-audio-player");

  let currentScreenIndex = 0;
  let mediaStream = null;
  let mediaRecorder = null;

  nextBtn.addEventListener("click", async () => {
    if (nextBtn.style.display === "none") {
      return;
    }

    stopAudio(audioPlayer);
    await stopRecorder();

    if (currentScreenIndex < screens.length - 1) {
      currentScreenIndex += 1;
      await renderScreen();
      return;
    }

    closeCurrentWindow();
  });

  fullscreenBtn.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      fullscreenBtn.src = "minimize.png";
      return;
    }

    await document.exitFullscreen();
    fullscreenBtn.src = "full-screen.png";
  });

  document.addEventListener("fullscreenchange", () => {
    fullscreenBtn.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";
  });

  centerAudio.addEventListener("click", () => {
    const screen = screens[currentScreenIndex];
    playAudio(audioPlayer, screen?.audio);
  });

  audioBtn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    await playAudio(audioPlayer, screen?.audio, async () => {
      await startRecorder();
    });
  });

  recBtn.addEventListener("click", async () => {
    await startRecorder();
  });

  stopBtn.addEventListener("click", async () => {
    await stopRecorder();
    showNext(nextBtn, true);
  });

  renderScreen();

  async function renderScreen() {
    const screen = screens[currentScreenIndex];

    instructionView.classList.remove("is-active");
    wordView.classList.remove("is-active");
    recordView.classList.remove("is-active");

    fullscreenBtn.style.display = "none";
    audioBtn.style.display = "none";
    centerAudio.style.display = "none";

    stopAudio(audioPlayer);
    await stopRecorder();
    showNext(nextBtn, true);

    if (!screen) {
      return;
    }

    if (screen.kind === "instruction") {
      instructionView.classList.add("is-active");
      instructionText.textContent = screen.text || "";
      centerAudio.style.display = "inline-block";
      fullscreenBtn.style.display = "block";
      return;
    }

    if (screen.kind === "label") {
      wordView.classList.add("is-active");
      wordLabel.textContent = screen.text || screen.label || "";
      return;
    }

    if (screen.kind === "record") {
      recordView.classList.add("is-active");
      recordTitle.textContent = screen.title || screen.label || "";
      audioBtn.style.display = "block";
      showNext(nextBtn, false);
      await ensureCamera();
    }
  }

  async function ensureCamera() {
    if (mediaStream) {
      camera.srcObject = mediaStream;
      return;
    }

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      camera.srcObject = mediaStream;
    } catch (error) {
      console.error("No se pudo acceder a la camara.", error);
      recordTitle.textContent = "No se pudo acceder a la camara del dispositivo.";
    }
  }

  async function startRecorder() {
    if (!mediaStream) {
      await ensureCamera();
    }

    if (!mediaStream || (mediaRecorder && mediaRecorder.state === "recording")) {
      return;
    }

    mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.start();

    recBtn.classList.add("hidden");
    recordingIndicator.classList.remove("hidden");
    stopBtn.classList.remove("is-disabled");
  }

  async function stopRecorder() {
    if (!mediaRecorder || mediaRecorder.state !== "recording") {
      recBtn.classList.remove("hidden");
      recordingIndicator.classList.add("hidden");
      stopBtn.classList.add("is-disabled");
      return;
    }

    await new Promise((resolve) => {
      mediaRecorder.onstop = () => {
        mediaRecorder = null;
        recBtn.classList.remove("hidden");
        recordingIndicator.classList.add("hidden");
        stopBtn.classList.add("is-disabled");
        resolve();
      };
      mediaRecorder.stop();
    });
  }
}

function setupPart1Test2(testConfig) {
  const section = document.getElementById("part-1-test-2");
  const titleView = document.getElementById("p1t2-screen-title");
  const audioView = document.getElementById("p1t2-screen-audios");

  if (!section || !titleView || !audioView) {
    return;
  }

  section.style.display = "block";

  const screens = testConfig.screens || [];
  const titleLabel = document.getElementById("p1t2-title-label");
  const status = document.getElementById("p1t2-status");
  const audio1Btn = document.getElementById("p1t2-audio-1-btn");
  const audio2Btn = document.getElementById("p1t2-audio-2-btn");
  const nextBtn = document.getElementById("p1t2-next-btn");
  const audioPlayer = document.getElementById("p1t2-audio-player");

  let currentScreenIndex = 0;
  let currentRecorder = null;
  let firstRecordingActive = false;
  let secondRecordingActive = false;
  let endCountdownTimer = null;

  nextBtn.addEventListener("click", async () => {
    if (nextBtn.style.display === "none") {
      return;
    }

    clearCountdown(endCountdownTimer);
    stopAudio(audioPlayer);

    if (secondRecordingActive && currentRecorder) {
      const blob = await currentRecorder.stop();
      saveBlobReference(blob);
      secondRecordingActive = false;
    }

    if (currentScreenIndex < screens.length - 1) {
      currentScreenIndex += 1;
      renderScreen();
      return;
    }

    closeCurrentWindow();
  });

  audio1Btn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    if (!screen || screen.kind !== "dual_audio_record") {
      return;
    }

    showNext(nextBtn, false);
    audio1Btn.classList.add("is-disabled");

    await playTimedAudio(audioPlayer, screen.audio1, async () => {
      if (!firstRecordingActive) {
        currentRecorder = new WavAudioRecorder();
        await currentRecorder.start();
        firstRecordingActive = true;
        status.textContent = "Grabando audio 1. Cuando inicie el segundo audio, la primera grabacion se cerrara.";
      }
    });
  });

  audio2Btn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    if (!screen || screen.kind !== "dual_audio_record") {
      return;
    }

    if (firstRecordingActive && currentRecorder) {
      const blob = await currentRecorder.stop();
      saveBlobReference(blob);
      firstRecordingActive = false;
    }

    audio2Btn.classList.add("is-disabled");

    await playTimedAudio(audioPlayer, screen.audio2, async () => {
      if (!secondRecordingActive) {
        currentRecorder = new WavAudioRecorder();
        await currentRecorder.start();
        secondRecordingActive = true;
        status.textContent = "Grabando audio 2. Esta grabacion se cerrara al pasar a la siguiente pantalla.";
      }
    });
  });

  renderScreen();

  function renderScreen() {
    const screen = screens[currentScreenIndex];

    titleView.classList.remove("is-active");
    audioView.classList.remove("is-active");
    audio1Btn.classList.remove("is-disabled");
    audio2Btn.classList.add("is-disabled");
    clearCountdown(endCountdownTimer);
    stopAudio(audioPlayer);
    showNext(nextBtn, true);
    firstRecordingActive = false;
    secondRecordingActive = false;

    if (!screen) {
      return;
    }

    if (screen.kind === "title") {
      titleView.classList.add("is-active");
      titleLabel.textContent = screen.title || "";
      status.textContent = "";
      return;
    }

    if (screen.kind === "dual_audio_record") {
      audioView.classList.add("is-active");
      status.textContent = "Reproduce el primer audio. La grabacion iniciara automaticamente 2-3 segundos antes del final.";
      showNext(nextBtn, false);
    }
  }

  async function playTimedAudio(audioEl, audioPath, onNearEnd) {
    stopAudio(audioEl);

    if (!audioPath) {
      return;
    }

    audioEl.src = audioPath;
    audioEl.load();

    await new Promise((resolve) => {
      audioEl.onloadedmetadata = () => {
        const durationMs = Number.isFinite(audioEl.duration) ? audioEl.duration * 1000 : 0;
        const triggerDelay = Math.max(durationMs - 2500, 0);

        clearCountdown(endCountdownTimer);
        endCountdownTimer = setTimeout(async () => {
          await onNearEnd();
        }, triggerDelay);

        resolve();
      };
    });

    try {
      await audioEl.play();
    } catch (error) {
      console.error("No se pudo reproducir el audio.", error);
    }

    audioEl.onended = () => {
      if (!firstRecordingActive && !secondRecordingActive) {
        return;
      }

      if (firstRecordingActive) {
        status.textContent = "Ahora reproduce el segundo audio.";
        audio2Btn.classList.remove("is-disabled");
        return;
      }

      if (secondRecordingActive) {
        status.textContent = "Ahora puedes pasar a la siguiente pantalla.";
        showNext(nextBtn, true);
      }
    };
  }
}

function showNext(buttonEl, visible) {
  if (!buttonEl) {
    return;
  }

  buttonEl.style.display = visible ? "block" : "none";
}

function closeCurrentWindow() {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  window.close();
}

async function playAudio(audioEl, audioPath, onEnded) {
  stopAudio(audioEl);

  if (!audioPath) {
    return;
  }

  audioEl.src = audioPath;

  if (typeof onEnded === "function") {
    audioEl.onended = onEnded;
  } else {
    audioEl.onended = null;
  }

  try {
    await audioEl.play();
  } catch (error) {
    console.error("No se pudo reproducir el audio.", error);
  }
}

function stopAudio(audioEl) {
  if (!audioEl) {
    return;
  }

  audioEl.pause();
  audioEl.currentTime = 0;
  audioEl.onended = null;
}

function clearCountdown(timerId) {
  if (timerId) {
    clearTimeout(timerId);
  }
}

function saveBlobReference(blob) {
  return blob;
}

class WavAudioRecorder {
  constructor() {
    this.audioContext = null;
    this.stream = null;
    this.source = null;
    this.processor = null;
    this.chunks = [];
    this.sampleRate = 44100;
    this.isRecording = false;
  }

  async start() {
    this.chunks = [];
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.sampleRate = this.audioContext.sampleRate;
    this.source = this.audioContext.createMediaStreamSource(this.stream);
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

    this.processor.onaudioprocess = (event) => {
      if (!this.isRecording) {
        return;
      }

      const channelData = event.inputBuffer.getChannelData(0);
      this.chunks.push(new Float32Array(channelData));
    };

    this.source.connect(this.processor);
    this.processor.connect(this.audioContext.destination);
    this.isRecording = true;
  }

  async stop() {
    this.isRecording = false;
    const wavBlob = this.exportWav();
    this.destroy();
    return wavBlob;
  }

  exportWav() {
    const merged = this.mergeBuffers(this.chunks);
    const wavBuffer = this.encodeWav(merged);
    return new Blob([wavBuffer], { type: "audio/wav" });
  }

  mergeBuffers(chunks) {
    let length = 0;
    chunks.forEach((chunk) => {
      length += chunk.length;
    });

    const result = new Float32Array(length);
    let offset = 0;

    chunks.forEach((chunk) => {
      result.set(chunk, offset);
      offset += chunk.length;
    });

    return result;
  }

  encodeWav(samples) {
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
    for (let i = 0; i < input.length; i += 1, offset += 2) {
      let sample = Math.max(-1, Math.min(1, input[i]));
      sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, sample, true);
    }
  }

  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i += 1) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  destroy() {
    try {
      if (this.processor) {
        this.processor.disconnect();
      }
      if (this.source) {
        this.source.disconnect();
      }
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
      }
      if (this.audioContext) {
        this.audioContext.close();
      }
    } catch (error) {
      console.warn("Error al liberar grabacion.", error);
    }
  }
}
