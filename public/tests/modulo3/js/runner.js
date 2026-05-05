import { MODULO3 } from "./habla_script.js";

const url = new URL(window.location.href);
const partId = Number(url.searchParams.get("part") || "1");
const test = MODULO3.tests.find((item) => item.id === partId) || null;
const test1Section = document.getElementById("part-1-test-1");
const test2Section = document.getElementById("part-1-test-2");
const motorSection = document.getElementById("part-2-motor");
const test13Section = document.getElementById("part-3-test-1");
const topBar = document.getElementById("topBar");

if (test1Section) {
  test1Section.style.display = "none";
}

if (test2Section) {
  test2Section.style.display = "none";
}

if (motorSection) {
  motorSection.style.display = "none";
}

if (test13Section) {
  test13Section.style.display = "none";
}

if (test?.id === 1) {
  runProcesosMotoresBasicos(test, () => {
    const integratedTest = MODULO3.tests.find((item) => item.id === 2);
    if (test1Section) {
      test1Section.style.display = "none";
    }

    if (integratedTest) {
      setupPart1Test2(integratedTest, closeCurrentWindow);
      return;
    }

    closeCurrentWindow();
  });
}

if (test?.id === 2) {
  setupPart1Test2(test);
}

if (test?.groupId === 2) {
  runEvaluacionMotoraHabla();
}

if (test?.id === 13) {
  runHablaConectada(test);
}

function runProcesosMotoresBasicos(testConfig, onComplete = closeCurrentWindow) {
  return setupPart1Test1(testConfig, onComplete);
}

function setupPart1Test1(testConfig, onComplete = closeCurrentWindow) {
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
  let recorderChunks = [];
  const recordedVideos = [];
  const summaryRows = [];

  const sectionCounters = buildSectionCounters(screens);

  nextBtn.addEventListener("click", async () => {
    if (nextBtn.style.display === "none") {
      return;
    }

    stopAudio(audioPlayer);
    await stopRecorder(true);

    if (currentScreenIndex < screens.length - 1) {
      currentScreenIndex += 1;
      await renderScreen();
      return;
    }

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      mediaStream = null;
      camera.srcObject = null;
    }

    await exportProcesosMotoresBasicosZip(recordedVideos, summaryRows);
    setTimeout(() => {
      onComplete();
    }, 3000);
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
    playAudio(audioPlayer, screen?.audio, async () => {
      if (currentScreenIndex < screens.length - 1) {
        currentScreenIndex += 1;
        await renderScreen();
      }
    });
  });

  audioBtn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    await playAudio(audioPlayer, screen?.audio, async () => {
      await startRecorder();
      showNext(nextBtn, true);
    });
  });

  recBtn.addEventListener("click", async () => {
    await startRecorder();
    showNext(nextBtn, true);
  });

  stopBtn.addEventListener("click", async () => {
    await stopRecorder(true);
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
    await stopRecorder(false);
    showNext(nextBtn, true);

    if (!screen) {
      return;
    }

    if (screen.kind === "instruction") {
      setScreenCounter("");
      instructionView.classList.add("is-active");
      instructionText.textContent = screen.text || "";
      centerAudio.style.display = "inline-block";
      fullscreenBtn.style.display = "block";
      return;
    }

    if (screen.kind === "label") {
      setScreenCounter("");
      wordView.classList.add("is-active");
      wordLabel.textContent = screen.text || screen.label || "";
      return;
    }

    if (screen.kind === "record") {
      setScreenCounter(sectionCounters[currentScreenIndex] || "");
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

    recorderChunks = [];
    const recorderOptions = getVideoRecorderOptions();
    mediaRecorder = recorderOptions
      ? new MediaRecorder(mediaStream, recorderOptions)
      : new MediaRecorder(mediaStream);
    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recorderChunks.push(event.data);
      }
    };

    mediaRecorder.start(250);

    recBtn.classList.add("hidden");
    recordingIndicator.classList.remove("hidden");
    stopBtn.classList.remove("is-disabled");
  }

  async function stopRecorder(shouldSave = false) {
    if (!mediaRecorder || mediaRecorder.state !== "recording") {
      recBtn.classList.remove("hidden");
      recordingIndicator.classList.add("hidden");
      stopBtn.classList.add("is-disabled");
      return;
    }

    await new Promise((resolve) => {
      mediaRecorder.onstop = () => {
        const screen = screens[currentScreenIndex];
        if (shouldSave && screen?.record && recorderChunks.length > 0) {
          const mimeType = mediaRecorder.mimeType || "video/webm";
          const videoBlob = new Blob(recorderChunks, { type: mimeType });
          const outputName = `${screen.outputName || `modulo3_test1_${screen.section || "pantalla"}_${currentScreenIndex}`}.webm`;
          const timestamp = new Date().toISOString();

          recordedVideos.push({
            name: outputName,
            blob: videoBlob
          });

          summaryRows.push({
            pantalla: screen.title || screen.label || screen.text || "",
            seccion: screen.section || screen.label || "",
            archivo_audio_usado: screen.audio || "",
            nombre_video_generado: outputName,
            fecha_hora: timestamp
          });
        }

        recorderChunks = [];
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

function getVideoRecorderOptions() {
  if (typeof MediaRecorder === "undefined") {
    return undefined;
  }

  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm;codecs=vp8",
    "video/webm"
  ];
  const mimeType = candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate));
  return mimeType ? { mimeType } : undefined;
}

async function exportProcesosMotoresBasicosZip(videos = [], rows = []) {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar Procesos Motores Basicos.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const baseName = `${participantId}_${userInitials}_M3_T1_Procesos_Motores_Basicos_Evaluacion_Orofacial`;
  const zip = new JSZip();

  videos.forEach((video) => {
    if (video?.blob && video?.name) {
      zip.file(video.name, video.blob);
    }
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const objectUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

async function exportPart1Test2Zip(audios = []) {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar Test 2 Modulo 3.");
    return false;
  }

  if (!audios.length) {
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const baseName = `${participantId}_${userInitials}_M3_T2_Respiracion_Fonacion_Resonancia`;
  const zip = new JSZip();

  const rows = audios.map((audio) => ({
    pantalla: audio.title,
    archivo_audio_usado: audio.audio,
    nombre_audio_generado: audio.name,
    fecha_hora: audio.timestamp
  }));

  zip.file("resumen.csv", toCSV(rows));

  audios.forEach((audio) => {
    if (audio?.blob && audio?.name) {
      zip.file(audio.name, audio.blob);
    }
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const objectUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

async function exportHablaConectadaZip(audios = [], rows = []) {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar Habla Conectada.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const baseName = `${participantId}_${userInitials}_48_Habla_Conectada`;
  const zip = new JSZip();

  zip.file("resumen.csv", toCSV(rows));

  audios.forEach((audio) => {
    if (audio?.blob && audio?.name) {
      zip.file(audio.name, audio.blob);
    }
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const objectUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

async function exportEvaluacionMotoraHablaZip(audios = [], rows = []) {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar Evaluacion Motora del Habla.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));
  const baseName = `${participantId}_${userInitials}_M3_Parte2_Evaluacion_Motora_Habla`;
  const zip = new JSZip();

  zip.file("resumen.csv", toCSV(rows));

  audios.forEach((audio) => {
    if (audio?.blob && audio?.name) {
      const folderName = sanitizeFilename(audio.section || "audios");
      zip.file(`${folderName}/${audio.name}`, audio.blob);
    }
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const objectUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = `${baseName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 5000);

  return true;
}

function toCSV(rows) {
  const headersSet = new Set();
  rows.forEach((row) => Object.keys(row || {}).forEach((key) => headersSet.add(key)));
  const headers = Array.from(headersSet);
  const esc = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.map(esc).join(",")];

  rows.forEach((row) => {
    lines.push(headers.map((header) => esc(row[header])).join(","));
  });

  return lines.join("\n");
}

function sanitizeFilename(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "_");
}

async function getAuthenticatedUserInitialsFallback(fallback) {
  try {
    const response = await fetch("/api/user-info");
    if (!response.ok) return fallback;

    const user = await response.json();
    const parts = [user?.name, user?.last_name]
      .filter(Boolean)
      .map((part) => String(part).trim())
      .filter(Boolean);
    const initials = parts.map((part) => part.charAt(0).toUpperCase()).join("");

    return initials || fallback;
  } catch (_) {
    return fallback;
  }
}

function setupPart1Test2(testConfig, onComplete = closeCurrentWindow) {
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
  const recordingIndicator = document.getElementById("p1t2-recording-indicator");
  const stopBtn = document.getElementById("p1t2-stop-btn");
  const nextBtn = document.getElementById("p1t2-next-btn");
  const audioPlayer = document.getElementById("p1t2-audio-player");

  let currentScreenIndex = 0;
  let currentRecorder = null;
  let firstRecordingActive = false;
  let secondRecordingActive = false;
  let activeAudioSlot = null;
  let endCountdownTimer = null;
  const recordedAudios = [];
  const sectionCounters = buildSectionCounters(screens);

  nextBtn.addEventListener("click", async () => {
    if (nextBtn.style.display === "none") {
      return;
    }

    clearCountdown(endCountdownTimer);
    stopAudio(audioPlayer);

    await stopCurrentAudioRecording(true);

    if (currentScreenIndex < screens.length - 1) {
      currentScreenIndex += 1;
      renderScreen();
      return;
    }

    await exportPart1Test2Zip(recordedAudios);
    setTimeout(() => {
      onComplete();
    }, 3000);
  });

  stopBtn.addEventListener("click", async () => {
    const stoppedSlot = activeAudioSlot;
    clearCountdown(endCountdownTimer);
    stopAudio(audioPlayer);
    await stopCurrentAudioRecording(true);

    if (stoppedSlot === 1) {
      status.textContent = "Ahora reproduce el segundo audio.";
      audio2Btn.classList.remove("is-disabled");
      return;
    }

    if (stoppedSlot === 2) {
      status.textContent = "Ahora puedes pasar a la siguiente pantalla.";
      showNext(nextBtn, true);
    }
  });

  audio1Btn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    if (!screen || screen.kind !== "dual_audio_record") {
      return;
    }

    showNext(nextBtn, false);
    audio1Btn.classList.add("is-disabled");
    audio2Btn.classList.add("is-disabled");

    await playTimedAudio(audioPlayer, screen.audio1, async () => {
      if (!firstRecordingActive) {
        currentRecorder = new WavAudioRecorder();
        await currentRecorder.start();
        firstRecordingActive = true;
        activeAudioSlot = 1;
        showRecordControls(true);
        status.textContent = "Grabando audio 1. Cuando inicie el segundo audio, la primera grabacion se cerrara.";
      }
    });
  });

  audio2Btn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    if (!screen || screen.kind !== "dual_audio_record") {
      return;
    }

    if (firstRecordingActive) {
      return;
    }

    audio2Btn.classList.add("is-disabled");

    await playTimedAudio(audioPlayer, screen.audio2, async () => {
      if (!secondRecordingActive) {
        currentRecorder = new WavAudioRecorder();
        await currentRecorder.start();
        secondRecordingActive = true;
        activeAudioSlot = 2;
        showRecordControls(true);
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
    activeAudioSlot = null;
    showRecordControls(false);

    if (!screen) {
      return;
    }

    if (screen.kind === "title") {
      setScreenCounter("");
      titleView.classList.add("is-active");
      titleLabel.textContent = screen.title || "";
      status.textContent = "";
      return;
    }

    if (screen.kind === "dual_audio_record") {
      setScreenCounter(sectionCounters[currentScreenIndex] || "E 1/1");
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
        const triggerDelay = Math.max(durationMs - 1500, 0);

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
        status.textContent = "Presiona detener para guardar la grabacion del audio 1.";
        return;
      }

      if (secondRecordingActive) {
        status.textContent = "Presiona detener para guardar la grabacion del audio 2.";
      }
    };
  }

  async function stopCurrentAudioRecording(shouldSave = false) {
    if (!currentRecorder) {
      firstRecordingActive = false;
      secondRecordingActive = false;
      activeAudioSlot = null;
      showRecordControls(false);
      return null;
    }

    const screen = screens[currentScreenIndex];
    const stoppedSlot = activeAudioSlot;
    const blob = await currentRecorder.stop();

    if (shouldSave && blob) {
      const sectionName = sanitizeFilename(screen?.title || `pantalla_${currentScreenIndex + 1}`).toLowerCase();
      const filename = `modulo3_test2_${sectionName}_${stoppedSlot || 1}.wav`;
      recordedAudios.push({
        name: filename,
        blob,
        title: screen?.title || "",
        audio: stoppedSlot === 2 ? screen?.audio2 : screen?.audio1,
        timestamp: new Date().toISOString()
      });
    }

    currentRecorder = null;
    firstRecordingActive = false;
    secondRecordingActive = false;
    activeAudioSlot = null;
    showRecordControls(false);
    return blob;
  }

  function showRecordControls(visible) {
    if (recordingIndicator) {
      recordingIndicator.classList.toggle("hidden", !visible);
    }

    if (stopBtn) {
      stopBtn.classList.toggle("hidden", !visible);
    }
  }
}

function runEvaluacionMotoraHabla() {
  const section = document.getElementById("part-2-motor");
  const screenView = document.getElementById("p2motor-screen");
  const titleEl = document.getElementById("p2motor-title");
  const labelEl = document.getElementById("p2motor-label");
  const textEl = document.getElementById("p2motor-text");
  const audiosEl = document.getElementById("p2motor-audios");
  const recordControls = document.getElementById("p2motor-record-controls");
  const recBtn = document.getElementById("p2motor-rec-btn");
  const recordingIndicator = document.getElementById("p2motor-recording-indicator");
  const stopBtn = document.getElementById("p2motor-stop-btn");
  const fullscreenBtn = document.getElementById("p2motor-fullscreen-btn");
  const nextBtn = document.getElementById("p2motor-next-btn");
  const audioPlayer = document.getElementById("p2motor-audio-player");

  if (!section || !screenView || !titleEl || !labelEl || !textEl || !audiosEl) {
    return;
  }

  section.style.display = "block";
  screenView.classList.add("is-active");

  const screens = buildEvaluacionMotoraHablaScreens();
  const sectionCounters = buildMotorCounters(screens);
  const audios = [];
  const summaryRows = [];

  let currentScreenIndex = 0;
  let currentRecorder = null;

  nextBtn.addEventListener("click", async () => {
    stopAudio(audioPlayer);
    await stopRecording(true);

    if (currentScreenIndex < screens.length - 1) {
      currentScreenIndex += 1;
      await renderScreen();
      return;
    }

    await exportEvaluacionMotoraHablaZip(audios, summaryRows);
    setTimeout(() => {
      closeCurrentWindow();
    }, 3000);
  });

  recBtn.addEventListener("click", async () => {
    await startRecording(screens[currentScreenIndex]);
  });

  stopBtn.addEventListener("click", async () => {
    await stopRecording(true);
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

  renderScreen();

  async function renderScreen() {
    const screen = screens[currentScreenIndex];
    if (!screen) return;

    setScreenCounter(sectionCounters[currentScreenIndex] || "");
    titleEl.textContent = screen.kind === "title" ? (screen.title || "") : "";
    titleEl.style.display = screen.kind === "title" ? "block" : "none";
    labelEl.textContent = screen.kind === "title" ? "" : "";
    labelEl.style.display = "none";
    textEl.textContent = screen.text || "";
    textEl.style.display = screen.text ? "block" : "none";
    textEl.classList.toggle("is-centered", screen.section === "Lectura de frases");
    renderAudioButtons(screen);
    resetRecordControls();
    recordControls.style.display = screen.record ? "flex" : "none";

    if (screen.record && (screen.autoStartOnEnter || normalizeAudioList(screen.audio).length === 0)) {
      await startRecording(screen);
    }
  }

  function renderAudioButtons(screen) {
    audiosEl.innerHTML = "";
    const audioList = normalizeAudioList(screen.audio);
    audiosEl.classList.toggle("is-centered", Boolean(screen.centerAudio) || (!screen.record && audioList.length > 1));

    audioList.forEach((audioPath, index) => {
      const button = document.createElement("img");
      button.src = (screen.centerAudio || (!screen.record && audioList.length > 1))
        ? "audio.png"
        : (index === 0 ? "audio.png" : `audio${Math.min(index + 1, 4)}.png`);
      button.alt = `Audio ${index + 1}`;
      button.addEventListener("click", async () => {
        await playMotorAudios(screen.playSequential === false ? [audioPath] : audioList.slice(index), screen);
      });
      audiosEl.appendChild(button);
    });
  }

  async function playMotorAudios(audioList, screen) {
    stopAudio(audioPlayer);

    for (let index = 0; index < audioList.length; index += 1) {
      const audioPath = audioList[index];
      const shouldStartNearEnd = Boolean(screen.record && screen.autoStartAfterAudio !== false && index === audioList.length - 1);
      await playAudioAndWait(audioPlayer, audioPath, shouldStartNearEnd ? () => startRecording(screen) : null);
    }

    if (screen.record && screen.autoStartAfterAudio !== false) {
      await startRecording(screen);
    }
  }

  async function playAudioAndWait(audioEl, audioPath, onNearEnd = null) {
    if (!audioPath) return;

    await new Promise((resolve) => {
      let nearEndTimer = null;
      audioEl.src = audioPath;
      audioEl.onloadedmetadata = () => {
        if (typeof onNearEnd === "function") {
          const durationMs = Number.isFinite(audioEl.duration) ? audioEl.duration * 1000 : 0;
          nearEndTimer = setTimeout(onNearEnd, Math.max(durationMs - 1000, 0));
        }
      };
      audioEl.onended = () => {
        clearCountdown(nearEndTimer);
        resolve();
      };
      audioEl.onerror = () => {
        clearCountdown(nearEndTimer);
        resolve();
      };
      audioEl.play().catch((error) => {
        console.error("No se pudo reproducir el audio.", error);
        clearCountdown(nearEndTimer);
        resolve();
      });
    });
  }

  async function startRecording(screen) {
    if (!screen?.record) return;
    if (currentRecorder) return;

    try {
      currentRecorder = new WavAudioRecorder();
      await currentRecorder.start();
      recBtn.classList.add("hidden");
      recordingIndicator.classList.remove("hidden");
      stopBtn.classList.remove("is-disabled");
    } catch (error) {
      currentRecorder = null;
      resetRecordControls();
      console.error("No se pudo iniciar la grabacion de audio.", error);
    }
  }

  async function stopRecording(shouldSave = false) {
    if (!currentRecorder) {
      resetRecordControls();
      return;
    }

    const screen = screens[currentScreenIndex];
    const blob = await currentRecorder.stop();

    if (shouldSave && screen?.record && blob) {
      const audioName = `${screen.outputName}.wav`;
      audios.push({
        name: audioName,
        blob,
        section: screen.section || ""
      });
      summaryRows.push({
        subtest: screen.section || "",
        ensayo: screen.trial || "",
        audio_usado: normalizeAudioList(screen.audio).join(" | "),
        texto_mostrado: screen.text || "",
        nombre_audio: audioName,
        fecha_hora: new Date().toISOString()
      });
    }

    currentRecorder = null;
    resetRecordControls();
  }

  function resetRecordControls() {
    recBtn.classList.remove("hidden");
    recordingIndicator.classList.add("hidden");
    stopBtn.classList.add("is-disabled");
  }

}

function normalizeAudioList(audio) {
  return Array.isArray(audio) ? audio.filter(Boolean) : [audio].filter(Boolean);
}

function buildEvaluacionMotoraHablaScreens() {
  const lecturaTexto = "El viento Norte y el Sol discutían sobre cuál de ellos era el más fuerte, cuando pasó un extraño viajero envuelto en unas ropas muy abrigadas. Convinieron en que quien antes lograra obligarlo al transeúnte a quitarse el abrigo sería considerado más poderoso. El viento sopló con gran furia, pero cuanto más soplaba, más se ceñía el hombre su ropa al cuerpo. Entonces se dio por vencido, y el sol empezó a brillar con mucha fuerza. Inmediatamente el viajero se despojó de su abrigo; y así ya quedó claro que el sol tenía superioridad respecto del viento.";
  const lecturaFrases = [
    "La balada serena es del paso",
    "Come jalapeño y bebe jugo",
    "Sopló con fuerza tras mostrar su vientre",
    "Las brujas arreglaron el perchero",
    "Taló un pino al lado del saladero para hacer un lapicero",
    "El cuñado señaló a la cucaracha que jugaba en el reguero",
    "El partido se retransmitió con retraso por el precio del arbitraje",
    "El gringo contempló con perplejidad el gruñido del tigre griego"
  ];
  const base = "assets/parte2";
  const screens = [
    {
      section: "Volumen creciente",
      title: "Volumen creciente",
      label: "Instrucción",
      audio: `${base}/1_volumencreciente/instruccion1.wav`,
      record: true,
      autoStartAfterAudio: false,
      trial: "1",
      outputName: "modulo3_parte2_01_volumencreciente"
    },
    {
      section: "Habla automática",
      title: "Habla automática",
      label: "Instrucción",
      audio: `${base}/2_hablaautomatica/habla_automatica.wav`,
      record: true,
      trial: "1",
      outputName: "modulo3_parte2_02_hablaautomatica"
    },
    {
      section: "Diadococinesia",
      title: "Repetición de sílabas - Diadococinesia",
      label: "Instrucciones y ejemplo",
      audio: [
        `${base}/3_diadococinesia/instruccion1_diadococinesia.wav`,
        `${base}/3_diadococinesia/ejemplo_diadococinesia.wav`,
        `${base}/3_diadococinesia/instruccion2_diadococinesia.wav`
      ],
      record: false
    },
    ...[1, 2, 3, 4, 5].map((trial) => ({
      section: "Diadococinesia",
      title: "Repetición de sílabas - Diadococinesia",
      label: `Ensayo ${String.fromCharCode(96 + trial)}`,
      audio: `${base}/3_diadococinesia/${trial}_diadococinesia.wav`,
      record: true,
      trial: String(trial),
      outputName: `modulo3_parte2_03_diadococinesia_${trial}`
    })),
    {
      section: "Lectura",
      title: "Lectura",
      label: "Lea el texto en pantalla",
      audio: `${base}/4_lectura/instruccion_lectura.wav`,
      record: true,
      trial: "1",
      text: lecturaTexto,
      outputName: "modulo3_parte2_04_lectura"
    },
    {
      section: "Diptongos",
      title: "Diptongos",
      label: "Instrucciones y ejemplo",
      audio: [
        `${base}/5_diptongos/instruccion_diptongos.mp3`,
        `${base}/5_diptongos/ejemplo_diptongos.wav`,
        `${base}/5_diptongos/instruccion2_diptongos.wav`
      ],
      record: false
    },
    ...[1, 2, 3, 4, 5, 6].map((trial) => ({
      section: "Diptongos",
      title: "Diptongos",
      label: `Ensayo ${String.fromCharCode(96 + trial)}`,
      audio: `${base}/5_diptongos/${trial}_diptongo.mp3`,
      record: true,
      trial: String(trial),
      outputName: `modulo3_parte2_05_diptongos_${trial}`
    })),
    {
      section: "Palabras polisilábicas",
      title: "Palabras polisilábicas",
      label: "Instrucciones y ejemplo",
      audio: [
        `${base}/6_polisilabicas/instruccion1_polisilabicas.mp3`,
        `${base}/6_polisilabicas/ejemplo_polisibalicas.wav`,
        `${base}/6_polisilabicas/instruccion2_polisibalicas.wav`
      ],
      record: false
    },
    ...[1, 2, 3, 4, 5, 6].map((trial) => ({
      section: "Palabras polisilábicas",
      title: "Palabras polisilábicas",
      label: `Ensayo ${String.fromCharCode(96 + trial)}`,
      audio: `${base}/6_polisilabicas/${trial}_polisibalicas.${trial === 1 ? "wav" : "mp3"}`,
      record: true,
      trial: String(trial),
      outputName: `modulo3_parte2_06_polisilabicas_${trial}`
    })),
    {
      section: "Palabras con longitud creciente",
      title: "Palabras con longitud creciente",
      label: "Instrucción",
      audio: `${base}/7_longitudcreciente/instruccion1_longitudcreciente.wav`,
      centerAudio: true,
      record: false
    },
    {
      section: "Palabras con longitud creciente",
      title: "Palabras con longitud creciente",
      label: "Ejemplo a",
      audio: [1, 2, 3].map((number) => `${base}/7_longitudcreciente/${number}a_longitudcreciente.wav`),
      record: true,
      autoStartOnEnter: true,
      playSequential: false,
      centerAudio: true,
      trial: "a",
      outputName: "modulo3_parte2_07_longitudcreciente_a"
    },
    {
      section: "Palabras con longitud creciente",
      title: "Palabras con longitud creciente",
      label: "Instrucción 2",
      audio: `${base}/7_longitudcreciente/instruccion2_longitudcreciente.wav`,
      centerAudio: true,
      record: false
    },
    ...["b", "c", "d", "e", "f"].map((letter) => ({
      section: "Palabras con longitud creciente",
      title: "Palabras con longitud creciente",
      label: `Letra ${letter}`,
      audio: [1, 2, 3].map((number) => `${base}/7_longitudcreciente/${number}${letter}_longitudcreciente.wav`),
      record: true,
      autoStartOnEnter: true,
      playSequential: false,
      centerAudio: true,
      trial: letter,
      outputName: `modulo3_parte2_07_longitudcreciente_${letter}`
    })),
    {
      section: "Pseudopalabras",
      title: "Pseudopalabras",
      label: "Instrucción",
      audio: `${base}/8_pseudopalabras/instruccion_pseudopalabras.wav`,
      centerAudio: true,
      record: false
    },
    ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((fileNumber, index) => ({
      section: "Pseudopalabras",
      title: "Pseudopalabras",
      label: `Ensayo ${index + 1}`,
      audio: `${base}/8_pseudopalabras/${fileNumber}_pseudopalabras.wav`,
      record: true,
      trial: String(index + 1),
      outputName: `modulo3_parte2_08_pseudopalabras_${index + 1}`
    })),
    {
      section: "Repetición de frases",
      title: "Repetición de frases",
      label: "Instrucción",
      audio: `${base}/9_repeticionfrases/instruccion1_repeticionfrases.wav`,
      record: false
    },
    ...[1, 2, 3, 4, 5, 6, 7, 8].map((trial) => ({
      section: "Repetición de frases",
      title: "Repetición de frases",
      label: `Ensayo ${trial}`,
      audio: `${base}/9_repeticionfrases/${trial}_${trial === 7 ? "repeticionfraes" : "repeticionfrases"}.wav`,
      record: true,
      trial: String(trial),
      outputName: `modulo3_parte2_09_repeticionfrases_${trial}`
    })),
    {
      section: "Lectura de frases",
      title: "Lectura de frases",
      label: "Instrucción",
      audio: `${base}/10_lecturafrases/instruccion_lecturafrases.wav`,
      record: false
    },
    ...lecturaFrases.map((text, index) => ({
      section: "Lectura de frases",
      title: "Lectura de frases",
      label: `Frase ${String.fromCharCode(97 + index)}`,
      audio: "",
      record: true,
      trial: String(index + 1),
      text,
      outputName: `modulo3_parte2_10_lecturafrases_${index + 1}`
    }))
  ];

  return withMotorTitleScreens(screens);
}

function withMotorTitleScreens(screens) {
  const result = [];
  const seenSections = new Set();

  screens.forEach((screen) => {
    if (screen.section && !seenSections.has(screen.section)) {
      seenSections.add(screen.section);
      result.push({
        kind: "title",
        section: screen.section,
        title: screen.section,
        label: "",
        audio: "",
        record: false
      });
    }

    result.push(screen);
  });

  return result;
}

function buildMotorCounters(screens) {
  const grouped = new Map();
  const counters = {};

  screens.forEach((screen, index) => {
    if (screen.kind === "title") {
      return;
    }

    const key = screen.section || "Evaluacion Motora del Habla";
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key).push(index);
  });

  grouped.forEach((indexes, sectionName) => {
    indexes.forEach((screenIndex, itemIndex) => {
      counters[screenIndex] = `${sectionName} E ${itemIndex + 1}/${indexes.length}`;
    });
  });

  return counters;
}

function runHablaConectada(testConfig) {
  const section = document.getElementById("part-3-test-1");
  const imageAudioView = document.getElementById("p3-screen-image-audio");
  const storyIntroView = document.getElementById("p3-screen-story-intro");
  const storyImageView = document.getElementById("p3-screen-story-image");
  const finalView = document.getElementById("p3-screen-final");
  const personalView = document.getElementById("p3-screen-personal");

  if (!section || !imageAudioView || !storyIntroView || !storyImageView || !finalView || !personalView) {
    return;
  }

  section.style.display = "block";

  const screens = testConfig.screens || [];
  const mainImage = document.getElementById("p3-main-image");
  const storyIntroImage = document.getElementById("p3-story-intro-image");
  const storyImage = document.getElementById("p3-story-image");
  const singleAudioBtn = document.getElementById("p3-single-audio-btn");
  const audioTopBtn = document.getElementById("p3-audio-top-btn");
  const audioBottomBtn = document.getElementById("p3-audio-bottom-btn");
  const finalAudioBtn = document.getElementById("p3-final-audio-btn");
  const personalAudioBtn = document.getElementById("p3-personal-audio-btn");
  const recordControls = document.getElementById("p3-record-controls");
  const stopBtn = document.getElementById("p3-stop-btn");
  const fullscreenBtn = document.getElementById("p3-fullscreen-btn");
  const prevBtn = document.getElementById("p3-prev-btn");
  const nextBtn = document.getElementById("p3-next-btn");
  const audioPlayer = document.getElementById("p3-audio-player");

  let currentScreenIndex = 0;
  let currentRecorder = null;
  let activeTake = null;
  let selectedStoryAudio = "";
  const recordedAudios = [];
  const summaryRows = [];
  const sectionCounters = buildPart3Counters(screens);
  const storyIntroIndex = screens.findIndex((screen) => screen.kind === "story_intro");

  nextBtn.addEventListener("click", async () => {
    if (nextBtn.style.display === "none") {
      return;
    }

    stopAudio(audioPlayer);
    const screen = screens[currentScreenIndex];

    if (screen?.kind === "final_record") {
      await stopAudioRecording(true);
    }

    if (screen?.kind === "personal_record") {
      await stopAudioRecording(true);
    }

    if (screen?.kind === "image_single_audio_record") {
      await stopAudioRecording(true);
    }

    if (currentScreenIndex < screens.length - 1) {
      currentScreenIndex += 1;
      await renderScreen();
      return;
    }

    await exportHablaConectadaZip(recordedAudios, summaryRows);
    setTimeout(() => {
      closeCurrentWindow();
    }, 3000);
  });

  prevBtn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    if (screen?.section !== "narracion_historia" || currentScreenIndex <= storyIntroIndex) {
      return;
    }

    stopAudio(audioPlayer);
    currentScreenIndex -= 1;
    await renderScreen();
  });

  singleAudioBtn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    await playAudio(audioPlayer, screen?.audio, async () => {
      await startAudioRecording(screen);
      showNext(nextBtn, true);
    });
  });

  audioTopBtn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    selectedStoryAudio = screen?.audioTop || "";
    await playAudio(audioPlayer, selectedStoryAudio, () => {
      showNext(nextBtn, true);
    });
  });

  audioBottomBtn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    selectedStoryAudio = screen?.audioBottom || "";
    await playAudio(audioPlayer, selectedStoryAudio, () => {
      showNext(nextBtn, true);
    });
  });

  finalAudioBtn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    await playAudio(audioPlayer, screen?.audio, async () => {
      await startAudioRecording(screen);
      showNext(nextBtn, true);
    });
  });

  personalAudioBtn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    await playAudio(audioPlayer, screen?.audio, async () => {
      await startAudioRecording(screen);
      showNext(nextBtn, true);
    });
  });

  stopBtn.addEventListener("click", async () => {
    await stopAudioRecording(true);
    showNext(nextBtn, true);
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

  renderScreen();

  async function renderScreen() {
    const screen = screens[currentScreenIndex];

    imageAudioView.classList.remove("is-active");
    storyIntroView.classList.remove("is-active");
    storyImageView.classList.remove("is-active");
    finalView.classList.remove("is-active");
    personalView.classList.remove("is-active");

    singleAudioBtn.style.display = "none";
    audioTopBtn.classList.remove("is-disabled");
    audioBottomBtn.classList.remove("is-disabled");
    finalAudioBtn.style.display = "none";
    personalAudioBtn.style.display = "none";
    showNext(nextBtn, true);
    showNext(prevBtn, false);

    stopAudio(audioPlayer);

    if (!screen) {
      setScreenCounter("");
      return;
    }

    setScreenCounter(sectionCounters[currentScreenIndex] || "");

    if (screen.kind === "image_single_audio_record") {
      imageAudioView.classList.add("is-active");
      mainImage.src = screen.image || "";
      singleAudioBtn.style.display = "block";
      placeRecordControls(imageAudioView);
      return;
    }

    if (screen.kind === "story_intro") {
      storyIntroView.classList.add("is-active");
      storyIntroImage.src = screen.image || "";
      if (currentRecorder) {
        placeRecordControls(storyIntroView);
        showNext(nextBtn, true);
      }
      return;
    }

    if (screen.kind === "story_image") {
      storyImageView.classList.add("is-active");
      storyImage.src = screen.image || "";
      if (currentRecorder) {
        placeRecordControls(storyImageView);
      }
      showNext(prevBtn, currentScreenIndex > storyIntroIndex);
      showNext(nextBtn, true);
      return;
    }

    if (screen.kind === "final_record") {
      finalView.classList.add("is-active");
      finalAudioBtn.style.display = "block";
      placeRecordControls(finalView);
      showNext(prevBtn, currentScreenIndex > storyIntroIndex);
      return;
    }

    if (screen.kind === "personal_record") {
      personalView.classList.add("is-active");
      personalAudioBtn.style.display = "block";
      placeRecordControls(personalView);
    }
  }

  async function startAudioRecording(screen) {
    if (currentRecorder) {
      return;
    }

    try {
      currentRecorder = new WavAudioRecorder();
      activeTake = buildTakeForScreen(screen);
      await currentRecorder.start();
      showRecordControls(true);
    } catch (error) {
      currentRecorder = null;
      activeTake = null;
      showRecordControls(false);
      console.error("No se pudo iniciar la grabacion de audio.", error);
    }
  }

  async function stopAudioRecording(shouldSave = false) {
    if (!currentRecorder) {
      showRecordControls(false);
      return;
    }

    const take = activeTake;
    const blob = await currentRecorder.stop();

    if (shouldSave && take && blob) {
      const audioName = `${take.outputName}.wav`;
      recordedAudios.push({ name: audioName, blob });
      summaryRows.push({
        seccion: take.sectionTitle,
        imagen_usada: take.image || "",
        audio_usado: take.audio || "",
        nombre_audio: audioName,
        fecha_hora: new Date().toISOString()
      });
    }

    currentRecorder = null;
    activeTake = null;
    showRecordControls(false);
  }

  function buildTakeForScreen(screen) {
    if (screen?.kind === "final_record") {
      return {
        section: "narracion_historia",
        sectionTitle: "Narracion de una historia",
        image: "FIN",
        audio: screen.audio || "",
        outputName: "modulo3_parte3_narracion_historia"
      };
    }

    if (screen?.section === "narracion_historia") {
      return {
        section: "narracion_historia",
        sectionTitle: "Narracion de una historia",
        image: "assets/parte3/test2_1.png",
        audio: selectedStoryAudio,
        outputName: "modulo3_parte3_narracion_historia"
      };
    }

    return {
      section: screen?.section || "",
      sectionTitle: screen?.title || "",
      image: screen?.image || "",
      audio: screen?.audio || "",
      outputName: screen?.outputName || `modulo3_parte3_${screen?.section || "grabacion"}`
    };
  }

  function showRecordControls(visible) {
    if (recordControls) {
      recordControls.classList.toggle("hidden", !visible);
    }
  }

  function placeRecordControls(view) {
    const panel = view?.querySelector(".screen-panel");
    if (panel && recordControls && recordControls.parentElement !== panel) {
      panel.appendChild(recordControls);
    }
  }
}

function showNext(buttonEl, visible) {
  if (!buttonEl) {
    return;
  }

  buttonEl.style.display = visible ? "block" : "none";
}

function setScreenCounter(value) {
  if (!topBar) {
    return;
  }

  topBar.textContent = value || "";
  topBar.style.display = value ? "block" : "none";
}

function normalizeSectionLabel(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buildSectionCounters(screens) {
  const groups = new Map();

  screens.forEach((screen, index) => {
    if (screen.kind !== "record" && screen.kind !== "dual_audio_record") {
      return;
    }

    const key = normalizeSectionLabel(screen.label || screen.title || screen.text || screen.kind);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(index);
  });

  const counters = {};
  groups.forEach((indexes) => {
    indexes.forEach((screenIndex, itemIndex) => {
      counters[screenIndex] = `E ${itemIndex + 1}/${indexes.length}`;
    });
  });

  return counters;
}

function buildPart3Counters(screens) {
  const counters = {};
  const storyIndexes = [];

  screens.forEach((screen, index) => {
    if (screen.kind === "story_image") {
      storyIndexes.push(index);
      return;
    }

    if (
      screen.kind === "image_single_audio_record" ||
      screen.kind === "story_intro" ||
      screen.kind === "final_record"
    ) {
      counters[index] = "E 1/1";
    }
  });

  storyIndexes.forEach((screenIndex, itemIndex) => {
    counters[screenIndex] = `E ${itemIndex + 1}/${storyIndexes.length}`;
  });

  return counters;
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
