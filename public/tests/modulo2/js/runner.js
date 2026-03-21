import { CAT } from "./cat_script.js";
import { getPartProgress, setPartProgress } from "./storage.js";
import { getPartData, setPartData } from "./storage.js";
import { WavRecorder } from "./audio_recorder_wav.js";
import { saveAudioBlob } from "./audio_store_idb.js";
import { VideoRecorder } from "./video_recorder.js";
import { saveBlob } from "./blob_store_idb.js";

const topBar = document.getElementById("topBar");
const btnNext = document.getElementById("btnNext");
const btnFullscreen = document.getElementById("btnFullscreen");

const layoutSemantic = document.getElementById("layoutSemantic");
const layoutCalc = document.getElementById("layoutCalc");
const layoutTextImage = document.getElementById("layoutTextImage");
const layoutInstruction = document.getElementById("layoutInstruction");
const layoutDictation = document.getElementById("layoutDictation");
const layoutAudioRecord = document.getElementById("layoutAudioRecord");
const layoutVideoRecord = document.getElementById("layoutVideoRecord");

const btnAudio = document.getElementById("btnAudio");
const instructionAudio = document.getElementById("instructionAudio");

const btnAudioCenter = document.getElementById("btnAudioCenter");
const btnAudio2 = document.getElementById("btnAudio2");
const instructionAudio2 = document.getElementById("instructionAudio2");
const btnAudioCenter2 = document.getElementById("btnAudioCenter2");
const instructionAudioCenter2 = document.getElementById("instructionAudioCenter2");

const layoutCenterAudios = document.getElementById("layoutCenterAudios");
const layoutYesNo = document.getElementById("layoutYesNo");

const layoutRepeatAudio = document.getElementById("layoutRepeatAudio");

const layoutImageInstrRecord = document.getElementById("layoutImageInstrRecord");

const layoutImageRecordSimple = document.getElementById("layoutImageRecordSimple");

const layoutFluency = document.getElementById("layoutFluency");

const layoutLineBisection = document.getElementById("layoutLineBisection");

function showLayout(which) {
  layoutSemantic.style.display = (which === "semantic") ? "block" : "none";
  layoutCalc.style.display = (which === "calc") ? "block" : "none";
  layoutTextImage.style.display = (which === "text_image") ? "block" : "none";
  layoutInstruction.style.display = (which === "instruction") ? "block" : "none";
  layoutDictation.style.display = (which === "dictation") ? "block" : "none";
  layoutAudioRecord.style.display = (which === "audio_record") ? "block" : "none";
  layoutVideoRecord.style.display = (which === "video_record") ? "block" : "none";
  layoutCenterAudios.style.display = (which === "center_audios") ? "block" : "none";
  layoutYesNo.style.display = (which === "yesno") ? "block" : "none";
  layoutRepeatAudio.style.display = (which === "repeat_audio") ? "block" : "none";
  layoutImageInstrRecord.style.display = (which === "img_instr_record") ? "block" : "none";
  layoutImageRecordSimple.style.display = (which === "img_record_simple") ? "block" : "none";
  layoutFluency.style.display = (which === "fluency") ? "block" : "none";
  layoutLineBisection.style.display = (which === "line_bisection") ? "block" : "none";
}

const cAudio1 = document.getElementById("cAudio1");
const cAudio2 = document.getElementById("cAudio2");
const cAudio3 = document.getElementById("cAudio3");
const cAudioEl1 = document.getElementById("cAudioEl1");
const cAudioEl2 = document.getElementById("cAudioEl2");
const cAudioEl3 = document.getElementById("cAudioEl3");

const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");

function toggleFullscreen() {
  const el = document.documentElement;

  if (!document.fullscreenElement) {
    if (el.requestFullscreen) el.requestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    btnFullscreen.src = "minimize.png";
  } else {
    btnFullscreen.src = "full-screen.png";
  }
});

function setupInstructionAudio(audioPath, show = true) {
  if (!audioPath || !show) {
    btnAudio.style.display = "none";
    instructionAudio.src = "";
    return;
  }

  instructionAudio.src = audioPath;
  btnAudio.style.display = "block";

  btnAudio.onclick = () => {
    instructionAudio.currentTime = 0;
    instructionAudio.play();
  };
}

function setupAudio(btnEl, audioEl, audioPath, { forceShow = false } = {}) {
  if (!audioPath && !forceShow) {
    btnEl.style.display = "none";
    audioEl.src = "";
    btnEl.onclick = null;
    return;
  }

  // si no hay path aún, igual mostramos el ícono pero no hace nada
  audioEl.src = audioPath || "";
  btnEl.style.display = "block";

  btnEl.onclick = () => {
    if (!audioEl.src) return;
    audioEl.currentTime = 0;
    audioEl.play();
  };
}

function setupCenterAudios(audioList) {
  const list = audioList || [];
  const audios = [cAudioEl1, cAudioEl2, cAudioEl3];
  const btns = [cAudio1, cAudio2, cAudio3];

  for (let i = 0; i < 3; i++) {
    const path = list[i] || "";
    audios[i].src = path;

    // Mostrar u ocultar ícono: en este test queremos que se vea aunque sea null,
    // pero solo para la cantidad que corresponde (1 o 3).
    btns[i].style.display = (i < list.length) ? "block" : "none";

    btns[i].onclick = () => {
      if (!audios[i].src) return; // cuando pegues el audio, funcionará
      audios[i].currentTime = 0;
      audios[i].play();
    };
  }
}

const url = new URL(window.location.href);
const partId = Number(url.searchParams.get("part") || "0");
const resume = url.searchParams.get("resume") === "1";

const part = CAT.parts.find(p => p.id === partId);
if (!part) throw new Error("Parte no encontrada");

const step = part.steps?.[0];
if (!step) throw new Error("Parte sin steps");

//SEMANTIC MATCH (Parte 2)

function runSemanticMatch(step) {
  showLayout("semantic");

  const centerImg = document.getElementById("centerImg");
  const optBoxes = [
    document.getElementById("opt0"),
    document.getElementById("opt1"),
    document.getElementById("opt2"),
    document.getElementById("opt3"),
  ];
  const optImgs = [
    document.getElementById("img0"),
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
  ];

  const trials = step.trials || [];
  if (!trials.length) throw new Error("Sin trials");

  let trialIndex = 0;
  const saved = getPartProgress(partId);
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.trialIndex)) {
    trialIndex = Math.min(Math.max(saved.trialIndex, 0), trials.length - 1);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1, trialIndex });

  let selectedIndex = null;

  function hideInstructionAudio() {
    const possibleSelectors = [
      "#instructionAudioBtn",
      "#instructionAudioContainer",
      ".instruction-audio",
      ".instruction-audio-btn",
      ".audio-button"
    ];

    possibleSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.display = "none";
        el.style.visibility = "hidden";
        el.style.pointerEvents = "none";
      });
    });

    document.querySelectorAll("audio").forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  function clearMarks() {
    optBoxes.forEach(b => b.classList.remove("selected"));
    btnNext.style.display = "none";
    selectedIndex = null;
  }

  function updateTopBar() {
    const practiceCount = 1;

    if (trialIndex === 0) {
      topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · Práctica 1/1`;
      return;
    }

    const testIndex = trialIndex - practiceCount;
    const totalTestTrials = Math.max(trials.length - practiceCount, 0);

    topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · Ensayo ${testIndex + 1}/${totalTestTrials}`;
  }

  function updateFullscreenButton() {
    btnFullscreen.style.display = (trialIndex === 0) ? "block" : "none";
  }

  function renderTrial() {
    clearMarks();

    const t = trials[trialIndex];
    centerImg.src = t.center;
    for (let i = 0; i < 4; i++) optImgs[i].src = t.options[i];

    updateTopBar();
    updateFullscreenButton();

    setupInstructionAudio(step.instructionAudio, trialIndex === 0);

    setPartProgress(partId, { trialIndex });
  }

  btnFullscreen.onclick = () => toggleFullscreen();

  optBoxes.forEach(box => {
    box.onclick = () => {
      const idx = Number(box.dataset.opt);
      selectedIndex = idx;

      optBoxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");

      btnNext.style.display = "block";
    };
  });

  btnNext.onclick = () => {
    if (selectedIndex === null) return;

    hideInstructionAudio();

    trialIndex++;

    if (trialIndex >= trials.length) {
      setPartProgress(partId, { status: "done", trialIndex: trials.length - 1 });
      // intento de cierre
      window.open("", "_self");
      window.close();
      return;
    }

    setPartProgress(partId, { status: "in_progress", trialIndex });
    renderTrial();
  };

  renderTrial();
}

//Memoria a corto plazo

function runMCQ4ImageTrials(step) {
  showLayout("semantic"); // reutilizamos layout de 4 opciones + centro

  const centerBox = document.getElementById("centerBox");
  const centerImg = document.getElementById("centerImg");
  const optBoxes = [
    document.getElementById("opt0"),
    document.getElementById("opt1"),
    document.getElementById("opt2"),
    document.getElementById("opt3"),
  ];
  const optImgs = [
    document.getElementById("img0"),
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
  ];

  // ===== NUEVO: botón para patient audio =====
  let btnPatientAudio = document.getElementById("btnPatientAudio");

  if (!btnPatientAudio) {
    btnPatientAudio = document.createElement("img");
    btnPatientAudio.id = "btnPatientAudio";
    btnPatientAudio.src = "audio.png"; // cambia por tu icono real si usas otro
    btnPatientAudio.alt = "Reproducir audio del paciente";
    btnPatientAudio.style.position = "fixed";
    btnPatientAudio.style.top = "12px";
    btnPatientAudio.style.right = "12px";
    btnPatientAudio.style.width = "46px";
    btnPatientAudio.style.height = "46px";
    btnPatientAudio.style.cursor = "pointer";
    btnPatientAudio.style.zIndex = "9999";
    btnPatientAudio.style.display = "none";
    document.body.appendChild(btnPatientAudio);
  }

  let patientAudioEl = document.getElementById("patientAudio");
  if (!patientAudioEl) {
    patientAudioEl = document.createElement("audio");
    patientAudioEl.id = "patientAudio";
    document.body.appendChild(patientAudioEl);
  }

  // En este test NO hay imagen central. Ocultamos el centro:
  centerBox.style.display = "none";

  // Fullscreen disponible siempre
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  // Flecha oculta hasta elegir (si requireSelectionToAdvance)
  btnNext.style.display = "none";

  const total = Number(step.totalTrials ?? 11);      // 11 pantallas: 1 prueba + 10 ensayos
  const practiceIndex = Number(step.practiceIndex ?? 1); // 1 = prueba
  const basePath = step.basePath || "assets/parte4";
  const pattern = step.filePattern || "{t}-{o}.png";
  const requireSel = step.requireSelectionToAdvance !== false;

  // Progreso
  const saved = getPartProgress(partId);
  let trialIndex = 1; // 1..total

  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.trialIndex)) {
    trialIndex = Math.min(Math.max(saved.trialIndex, 1), total);
  }

  setPartProgress(partId, {
    status: "in_progress",
    stepIndex: 0,
    totalSteps: 1,
    trialIndex,
    totalTrials: total
  });

  let selectedIndex = null;

  function fileFor(t, o) {
    return `${basePath}/${pattern.replace("{t}", String(t)).replace("{o}", String(o))}`;
  }

  function clearSelection() {
    optBoxes.forEach(b => b.classList.remove("selected"));
    selectedIndex = null;
    btnNext.style.display = requireSel ? "none" : "block";
  }

  function updateTopBar() {
    if (trialIndex === practiceIndex) {
      topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · Prueba 1/1`;
    } else {
      const ensayoN = trialIndex - practiceIndex; // 2->1 ... 11->10
      topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · Ensayo ${ensayoN}/10`;
    }
  }

  function hidePatientAudio() {
    btnPatientAudio.style.display = "none";
    patientAudioEl.pause();
    patientAudioEl.currentTime = 0;
    patientAudioEl.src = "";
  }

  function showPatientAudio(audioPath) {
    if (!audioPath) {
      hidePatientAudio();
      return;
    }

    patientAudioEl.src = audioPath;
    btnPatientAudio.style.display = "block";

    btnPatientAudio.onclick = () => {
      patientAudioEl.currentTime = 0;
      patientAudioEl.play();
    };
  }

  function updateAudioButton() {
    // Ocultamos primero todo
    setupInstructionAudio(null);
    hidePatientAudio();

    // PRUEBA
    if (trialIndex === practiceIndex) {
      setupInstructionAudio(step.instructionAudio);

      btnAudio.style.display = "block";
      instructionAudio.src = step.instructionAudio || "";
      btnAudio.onclick = () => {
        if (!instructionAudio.src) return;
        instructionAudio.currentTime = 0;
        instructionAudio.play();
      };
      return;
    }

    // ENSAYO 1
    const ensayoN = trialIndex - practiceIndex;
    if (ensayoN === 1) {
      showPatientAudio(step.patientAudio);
    }
  }

  function renderTrial() {
    clearSelection();
    updateTopBar();
    updateAudioButton();

    for (let o = 1; o <= 4; o++) {
      optImgs[o - 1].src = fileFor(trialIndex, o);
    }

    setPartProgress(partId, { trialIndex });
  }

  optBoxes.forEach(box => {
    box.onclick = () => {
      const idx = Number(box.dataset.opt); // 0..3
      selectedIndex = idx;

      optBoxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");

      btnNext.style.display = "block";
    };
  });

  btnNext.onclick = () => {
    if (requireSel && selectedIndex === null) return;

    const data = getPartData(partId);
    const responses = data.responses || {};
    responses[String(trialIndex)] = { selected: selectedIndex };
    setPartData(partId, { responses });

    trialIndex++;
    if (trialIndex > total) {
      setPartProgress(partId, { status: "done", trialIndex: total });
      hidePatientAudio();
      // intento de cierre
      window.open("", "_self");
      window.close();
      return;
    }

    setPartProgress(partId, { status: "in_progress", trialIndex });
    renderTrial();
  };

  renderTrial();
}

// PANTOMIMA

function runVideoRecordTrials(step) {
  showLayout("video_record");

  const vrPreviewWrap = document.getElementById("vrPreviewWrap");
  const vrPreview = document.getElementById("vrPreview");

  const vrStimWrap = document.getElementById("vrStimWrap");
  const vrStimImage = document.getElementById("vrStimImage");
  const vrSmallPreview = document.getElementById("vrSmallPreview");

  const vBtnRec = document.getElementById("vBtnRec");
  const vBtnStop = document.getElementById("vBtnStop");
  const vBtnRecording = document.getElementById("vBtnRecording");

  const images = step.images || [];
  const practiceCount = Number(step.practiceCount ?? 1); // prueba
  const trialCount = Number(step.trialCount ?? 6);       // ensayos reales

  // Total real de pantallas con estímulo = prueba + ensayos
  const totalStimScreens = practiceCount + trialCount;   // 1 + 6 = 7

  // screenIndex:
  // 0 = ajuste cámara
  // 1 = prueba
  // 2..7 = ensayos 1..6
  const totalScreens = 1 + totalStimScreens;

  const saved = getPartProgress(partId);
  let screenIndex = 0;

  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), totalScreens - 1);
  }

  setPartProgress(partId, {
    status: "in_progress",
    stepIndex: 0,
    totalSteps: 1,
    screenIndex,
    totalScreens
  });

  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  btnNext.style.display = "block";

  const recorder = new VideoRecorder();
  let isRecording = false;
  let didRecordThisScreen = false;

  function setIdleUI() {
    vBtnRec.style.display = "block";
    vBtnStop.style.display = "none";
    vBtnRecording.style.display = "none";
    isRecording = false;
  }

  function setRecordingUI() {
    vBtnRec.style.display = "none";
    vBtnStop.style.display = "block";
    vBtnRecording.style.display = "block";
    isRecording = true;
  }

  async function startStreamTo(el) {
    await recorder.startStream(el);
  }

  async function startRecording() {
    await recorder.startRecording();
    didRecordThisScreen = false;
    setRecordingUI();
  }

  async function stopRecordingAndSave() {
    if (!isRecording) return;

    const blob = await recorder.stopRecording();
    setIdleUI();

    if (blob) {
      didRecordThisScreen = true;

      const stimIndex = screenIndex; // 1..7
      const imageIndex = stimIndex - 1;
      const imageName = images[imageIndex] || null;

      const key = `part${String(partId).padStart(2, "0")}_s${String(stimIndex).padStart(2, "0")}.webm`;
      await saveBlob(key, blob);

      const data = getPartData(partId);
      const takes = data.takes || {};
      takes[String(stimIndex)] = { key, image: imageName };
      setPartData(partId, { takes });
    }
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (screenIndex === 0) {
      topBar.textContent = `${partLabel} · Ajuste cámara`;
      return;
    }

    if (screenIndex <= practiceCount) {
      topBar.textContent = `${partLabel} · Prueba ${screenIndex}/${practiceCount}`;
      return;
    }

    const ensayoN = screenIndex - practiceCount; // 2->1, 3->2 ... 7->6
    topBar.textContent = `${partLabel} · Ensayo ${ensayoN}/${trialCount}`;
  }

  async function render() {
    updateTopBar();
    setPartProgress(partId, { screenIndex });

    // Pantalla 0: ajuste cámara
    if (screenIndex === 0) {
      vrPreviewWrap.style.display = "flex";
      vrStimWrap.style.display = "none";

      setupInstructionAudio(null);
      btnAudio.style.display = "none";

      await startStreamTo(vrPreview);

      setIdleUI();
      vBtnRec.style.display = "none";
      vBtnStop.style.display = "none";
      vBtnRecording.style.display = "none";
      return;
    }

    // Pantallas con estímulo
    vrPreviewWrap.style.display = "none";
    vrStimWrap.style.display = "block";

    // Audio SOLO en la prueba
    if (screenIndex <= practiceCount) {
      setupInstructionAudio(step.instructionAudio);
      btnAudio.style.display = "block";
    } else {
      setupInstructionAudio(null);
      btnAudio.style.display = "none";
    }

    await startStreamTo(vrSmallPreview);

    const imageIndex = screenIndex - 1;

    if (!images[imageIndex]) {
      console.warn(`No existe imagen para screenIndex=${screenIndex}, imageIndex=${imageIndex}`);
      return;
    }

    vrStimImage.src = `${step.basePath}/${images[imageIndex]}`;

    setIdleUI();
  }

  vBtnRec.onclick = async () => {
    try {
      await startRecording();
    } catch (e) {
      console.error(e);
      alert("No se pudo iniciar la grabación.");
      setIdleUI();
    }
  };

  vBtnStop.onclick = async () => {
    await stopRecordingAndSave();
  };

  btnNext.onclick = async () => {
    if (isRecording) {
      await stopRecordingAndSave();
      return;
    }

    screenIndex++;

    if (screenIndex >= totalScreens) {
      setPartProgress(partId, { status: "done", screenIndex: totalScreens - 1 });
      recorder.stopStream();

      window.open("", "_self");
      window.close();
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    await render();
  };

  render();
}

//   CÁLCULO (Parte 6)

function runCalcMCQ(step) {
  showLayout("calc");

  const promptImg = document.getElementById("calcPromptImg");
  const optBoxes = Array.from(document.querySelectorAll("#calcOptions .opt5"));
  const optImgs = [
    document.getElementById("cimg0"),
    document.getElementById("cimg1"),
    document.getElementById("cimg2"),
    document.getElementById("cimg3"),
    document.getElementById("cimg4"),
  ];

  const btnAudio = document.getElementById("btnAudio");
  const instructionAudio = document.getElementById("instructionAudio");
  const btnFullscreen = document.getElementById("btnFullscreen");

  const trials = step.trials || [];
  if (!trials.length) throw new Error("Sin trials");

  let trialIndex = 0;
  const saved = getPartProgress(partId);
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.trialIndex)) {
    trialIndex = Math.min(Math.max(saved.trialIndex, 0), trials.length - 1);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1, trialIndex });

  let selectedIndex = null;

  // AUDIO
  if (btnAudio && instructionAudio && step.instructionAudio) {
    instructionAudio.src = step.instructionAudio;
    instructionAudio.load();

    btnAudio.style.display = "block";
    btnAudio.style.position = "fixed";
    btnAudio.style.top = "16px";
    btnAudio.style.right = "16px";
    btnAudio.style.left = "auto";
    btnAudio.style.bottom = "auto";
    btnAudio.style.zIndex = "9999";
    btnAudio.style.width = "48px";
    btnAudio.style.height = "48px";

    btnAudio.onclick = () => {
      instructionAudio.currentTime = 0;
      instructionAudio.play().catch(err => {
        console.error("No se pudo reproducir el audio:", err);
      });
    };
  } else if (btnAudio) {
    btnAudio.style.display = "none";
  }

  // FULLSCREEN
  if (btnFullscreen) {
    btnFullscreen.style.display = "block";
    btnFullscreen.style.position = "fixed";
    btnFullscreen.style.bottom = "16px";
    btnFullscreen.style.left = "16px";
    btnFullscreen.style.top = "auto";
    btnFullscreen.style.right = "auto";
    btnFullscreen.style.zIndex = "9999";
    btnFullscreen.style.width = "48px";
    btnFullscreen.style.height = "48px";

    btnFullscreen.onclick = () => toggleFullscreen();
    btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";
  }

  function clearMarks() {
    optBoxes.forEach(b => b.classList.remove("selected", "correct", "wrong"));
    btnNext.style.display = "none";
    selectedIndex = null;
  }

  function updateTop() {
    topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · Ejercicio ${trialIndex + 1}/${trials.length}`;
  }

  function renderTrial() {
    clearMarks();
    const t = trials[trialIndex];
    promptImg.src = t.promptImg;
    for (let i = 0; i < 5; i++) optImgs[i].src = t.options[i];
    updateTop();
    setPartProgress(partId, { trialIndex });
  }

  optBoxes.forEach(box => {
    box.onclick = () => {
      const idx = Number(box.dataset.opt);
      selectedIndex = idx;

      optBoxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");

      btnNext.style.display = "block";
    };
  });

  btnNext.onclick = () => {
    if (selectedIndex === null) return;

    trialIndex++;
    if (trialIndex >= trials.length) {
      setPartProgress(partId, { status: "done", trialIndex: trials.length - 1 });

      if (btnAudio) btnAudio.style.display = "none";
      if (btnFullscreen) btnFullscreen.style.display = "none";

      window.open("", "_self");
      window.close();
      return;
    }

    setPartProgress(partId, { status: "in_progress", trialIndex });
    renderTrial();
  };

  renderTrial();
}

function runAudioMCQ4Trials(step) {
  // Reutilizamos layout de 4 opciones (semantic) pero SIN centro
  showLayout("semantic");
  const centerBox = document.getElementById("centerBox");
  centerBox.style.display = "none";

  const optBoxes = [
    document.getElementById("opt0"),
    document.getElementById("opt1"),
    document.getElementById("opt2"),
    document.getElementById("opt3"),
  ];
  const optImgs = [
    document.getElementById("img0"),
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
  ];

  const basePath = step.basePath || "assets/parte7";
  const filePattern = step.filePattern || "{t}-{o}.png";
  const firstTrial = Number(step.firstTrial ?? 1);
  const lastTrial = Number(step.lastTrial ?? 16);
  const requireSel = step.requireSelectionToAdvance !== false;

  // práctica = t=1
  const practiceT = 1;
  const totalTestTrials = Math.max(lastTrial - 1, 0); // 2..16 => 15

  // screenIndex:
  // 0 = instrucción
  // 1 = práctica (t=1)
  // 2..16 = ensayos (t=2..16)  -> en general, screenIndex == t
  const totalScreens = 1 + (lastTrial - firstTrial + 1); // 1 + 16 = 17

  const saved = getPartProgress(partId);
  let screenIndex = 0;
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), totalScreens - 1);
  }

  setPartProgress(partId, {
    status: "in_progress",
    stepIndex: 0,
    totalSteps: 1,
    screenIndex,
    totalScreens
  });

  // Fullscreen + flecha
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  let selectedIndex = null;

  function fileFor(t, o) {
    const f = filePattern.replace("{t}", String(t)).replace("{o}", String(o));
    return `${basePath}/${f}`;
  }

  function trialAudioFor(t) {
    const p = step.trialAudioPattern;
    if (!p) return null;

    const audioNum = t + 2; // t=2 -> audio4, t=16 -> audio18
    return p.replace("{t}", String(audioNum));
  }

  function clearSelection() {
    optBoxes.forEach(b => b.classList.remove("selected"));
    selectedIndex = null;
    btnNext.style.display = requireSel ? "none" : "block";
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (screenIndex === 0) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    if (screenIndex === 1) {
      topBar.textContent = `${partLabel} · Ejemplo 1/1`;
      return;
    }

    const t = screenIndex; // 2..16
    const ensayoN = t - 1; // 2->1 ... 16->15
    topBar.textContent = `${partLabel} · Ensayo ${ensayoN}/${totalTestTrials}`;
  }

  function render() {
    updateTopBar();
    setPartProgress(partId, { screenIndex });

    // por defecto ocultamos todo audio extra
    btnAudioCenter.style.display = "none";
    btnAudio2.style.display = "none";

    if (screenIndex === 0) {
      // Pantalla instrucción: solo audio centrado
      clearSelection();
      optBoxes.forEach(b => (b.style.display = "none")); // ocultar opciones

      // audio centrado (forzar ícono visible aunque aún no exista el mp3)
      setupAudio(btnAudioCenter, instructionAudio, step.instructionAudio, { forceShow: true });

      // ocultar solo los otros botones, sin tocar instructionAudio
      btnAudio.style.display = "none";
      btnAudio.onclick = null;

      setupAudio(btnAudio2, instructionAudio2, null);

      // flecha para pasar a práctica
      btnNext.style.display = "block";
      return;
    }

    // Pantallas con 4 imágenes (práctica y ensayos)
    optBoxes.forEach(b => (b.style.display = "block"));
    clearSelection();

    const t = screenIndex; // 1..16

    for (let o = 1; o <= 4; o++) {
      optImgs[o - 1].src = fileFor(t, o);
    }

    // Audio arriba derecha:
    if (t === practiceT) {
      // práctica: 2 iconos
      setupAudio(btnAudio, instructionAudio, step.practiceAudio1, { forceShow: true });
      setupAudio(btnAudio2, instructionAudio2, step.practiceAudio2, { forceShow: true });
    } else {
      // ensayos: 1 icono
      setupAudio(btnAudio, instructionAudio, trialAudioFor(t), { forceShow: true });
      setupAudio(btnAudio2, instructionAudio2, null);
    }
  }

  // elegir opción
  optBoxes.forEach(box => {
    box.onclick = () => {
      if (screenIndex === 0) return;
      const idx = Number(box.dataset.opt);
      selectedIndex = idx;

      optBoxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");

      btnNext.style.display = "block";
    };
  });

  // flecha avanza
  btnNext.onclick = () => {
    // si estamos en práctica/ensayo, exigir selección
    if (screenIndex !== 0 && requireSel && selectedIndex === null) return;

    // guardar selección para ZIP futuro
    if (screenIndex !== 0) {
      const data = getPartData(partId);
      const responses = data.responses || {};
      responses[String(screenIndex)] = { selected: selectedIndex }; // 0..3
      setPartData(partId, { responses });
    }

    screenIndex++;
    if (screenIndex >= totalScreens) {
      setPartProgress(partId, { status: "done", screenIndex: totalScreens - 1 });
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}

function runAudioMCQ4WordsOnScreen(step) {
  showLayout("semantic");

  const centerBox = document.getElementById("centerBox");
  const centerImg = document.getElementById("centerImg");
  const centerWord = document.getElementById("centerWord");

  const optBoxes = [
    document.getElementById("opt0"),
    document.getElementById("opt1"),
    document.getElementById("opt2"),
    document.getElementById("opt3"),
  ];
  const optImgs = [
    document.getElementById("img0"),
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
  ];

  // este test no usa imagen central, usa palabra
  centerBox.style.display = "none";
  centerWord.style.display = "block";

  const basePath = step.basePath || "assets/parte8";
  const filePattern = step.filePattern || "{t}-{o}.png";
  const firstTrial = Number(step.firstTrial ?? 1);
  const lastTrial = Number(step.lastTrial ?? 16);
  const words = step.words || [];
  const requireSel = step.requireSelectionToAdvance !== false;

  // screenIndex:
  // 0 = instrucción
  // 1..16 = trials
  const totalScreens = 1 + (lastTrial - firstTrial + 1); // 17

  const saved = getPartProgress(partId);
  let screenIndex = 0;
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), totalScreens - 1);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1, screenIndex, totalScreens });

  // fullscreen
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  let selectedIndex = null;

  function fileFor(t, o) {
    const f = filePattern.replace("{t}", String(t)).replace("{o}", String(o));
    return `${basePath}/${f}`;
  }

  function clearSelection() {
    optBoxes.forEach(b => b.classList.remove("selected"));
    selectedIndex = null;
    btnNext.style.display = requireSel ? "none" : "block";
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;
    if (screenIndex === 0) topBar.textContent = `${partLabel} · Instrucción`;
    else topBar.textContent = `${partLabel} · ${screenIndex}/16`;
  }

  function mountAudioForTrial(t) {
    // Reglas:
    // - t=1: hay audio (arriba derecha)
    // - t=2: hay audio (arriba derecha)
    // - t>=3: sin audio
    if (t === 1) setupAudio(btnAudio, instructionAudio, step.audioT1, { forceShow: true });
    else if (t === 2) setupAudio(btnAudio, instructionAudio, step.audioT2, { forceShow: true });
    else setupInstructionAudio(null);

    // este test no usa audio 2
    if (btnAudio2) btnAudio2.style.display = "none";
  }

  function render() {
    updateTopBar();
    setPartProgress(partId, { screenIndex });

    // ocultar audio center por defecto
    btnAudioCenter.style.display = "none";

    if (screenIndex === 0) {
      // instrucción: solo audio centrado, sin texto
      clearSelection();
      optBoxes.forEach(b => (b.style.display = "none"));
      centerWord.style.display = "none";

      setupAudio(btnAudioCenter, instructionAudio, step.instructionAudio, { forceShow: true });
      setupInstructionAudio(null);
      btnNext.style.display = "block";
      return;
    }

    // trials
    optBoxes.forEach(b => (b.style.display = "block"));
    centerWord.style.display = "block";
    clearSelection();

    const t = screenIndex; // 1..16
    centerWord.textContent = words[t - 1] || "";

    for (let o = 1; o <= 4; o++) {
      optImgs[o - 1].src = fileFor(t, o);
    }

    mountAudioForTrial(t);
  }

  // seleccionar
  optBoxes.forEach(box => {
    box.onclick = () => {
      if (screenIndex === 0) return;
      const idx = Number(box.dataset.opt);
      selectedIndex = idx;

      optBoxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");

      btnNext.style.display = "block";
    };
  });

  // flecha
  btnNext.onclick = () => {
    if (screenIndex !== 0 && requireSel && selectedIndex === null) return;

    // guardar selección
    if (screenIndex !== 0) {
      const data = getPartData(partId);
      const responses = data.responses || {};
      responses[String(screenIndex)] = {
        word: words[screenIndex - 1] || "",
        selected: selectedIndex
      };
      setPartData(partId, { responses });
    }

    screenIndex++;
    if (screenIndex >= totalScreens) {
      setPartProgress(partId, { status: "done", screenIndex: totalScreens - 1 });
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}

function runAudioMCQ4TrialsWithDualIntro(step) {
  showLayout("semantic");

  const centerBox = document.getElementById("centerBox");
  centerBox.style.display = "none"; // no hay imagen central

  const optBoxes = [
    document.getElementById("opt0"),
    document.getElementById("opt1"),
    document.getElementById("opt2"),
    document.getElementById("opt3"),
  ];
  const optImgs = [
    document.getElementById("img0"),
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
  ];

  const basePath = step.basePath || "assets/parte9";
  const filePattern = step.filePattern || "{t}-{o}.png";
  const firstTrial = Number(step.firstTrial ?? 1);
  const lastTrial = Number(step.lastTrial ?? 17);
  const requireSel = step.requireSelectionToAdvance !== false;

  // screenIndex:
  // 0 = intro (2 audios centrados)
  // 1 = práctica (t=1)
  // 2..17 = ensayos (t=2..17)
  const totalScreens = 1 + (lastTrial - firstTrial + 1); // 18

  const saved = getPartProgress(partId);
  let screenIndex = 0;
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), totalScreens - 1);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1, screenIndex, totalScreens });

  // fullscreen
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  let selectedIndex = null;

  function fileFor(t, o) {
    const f = filePattern.replace("{t}", String(t)).replace("{o}", String(o));
    return `${basePath}/${f}`;
  }

  function trialAudioFor(t) {
    const p = step.trialAudioPattern;
    if (!p) return null;
    return p.replace("{t}", String(t));
  }

  function clearSelection() {
    optBoxes.forEach(b => b.classList.remove("selected"));
    selectedIndex = null;
    btnNext.style.display = requireSel ? "none" : "block";
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (screenIndex === 0) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    if (screenIndex === 1) {
      topBar.textContent = `${partLabel} · Ejemplo 1/1`;
      return;
    }

    // ensayos: screenIndex 2..17 => 1..16
    const ensayoN = screenIndex - 1;
    topBar.textContent = `${partLabel} · Ensayo ${ensayoN}/16`;
  }

  function render() {
    updateTopBar();
    setPartProgress(partId, { screenIndex });

    // reset “modo 2 audios”
    document.body.classList.remove("twoCenterAudios");
    btnAudioCenter.style.display = "none";
    btnAudioCenter2.style.display = "none";

    if (screenIndex === 0) {
      // INTRO: ocultar imágenes y mostrar 2 audios centrados
      optBoxes.forEach(b => (b.style.display = "none"));
      clearSelection();

      document.body.classList.add("twoCenterAudios");

      setupAudio(btnAudioCenter, instructionAudio, step.introAudio1, { forceShow: true });
      setupAudio(btnAudioCenter2, instructionAudioCenter2, step.introAudio2, { forceShow: true });

      // no audio arriba derecha aquí
      setupInstructionAudio(null);
      if (btnAudio2) btnAudio2.style.display = "none";

      btnNext.style.display = "block";
      return;
    }

    // pantallas con 4 imágenes
    optBoxes.forEach(b => (b.style.display = "block"));
    clearSelection();

    const t = screenIndex; // 1..17
    for (let o = 1; o <= 4; o++) {
      optImgs[o - 1].src = fileFor(t, o);
    }

    // audio arriba derecha SIEMPRE en práctica y ensayos
    setupAudio(btnAudio, instructionAudio, trialAudioFor(t), { forceShow: true });
    if (btnAudio2) btnAudio2.style.display = "none";
  }

  // seleccionar
  optBoxes.forEach(box => {
    box.onclick = () => {
      if (screenIndex === 0) return;
      const idx = Number(box.dataset.opt);
      selectedIndex = idx;

      optBoxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");

      btnNext.style.display = "block";
    };
  });

  // flecha
  btnNext.onclick = () => {
    if (screenIndex !== 0 && requireSel && selectedIndex === null) return;

    // guardar selección
    if (screenIndex !== 0) {
      const data = getPartData(partId);
      const responses = data.responses || {};
      responses[String(screenIndex)] = { selected: selectedIndex };
      setPartData(partId, { responses });
    }

    screenIndex++;
    if (screenIndex >= totalScreens) {
      setPartProgress(partId, { status: "done", screenIndex: totalScreens - 1 });
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}

function runMCQ4SentenceCenterWithAudioPractice(step) {
  showLayout("semantic");

  const centerBox = document.getElementById("centerBox");
  centerBox.style.display = "none";

  const centerWord = document.getElementById("centerWord");
  centerWord.style.display = "none";

  const optBoxes = [
    document.getElementById("opt0"),
    document.getElementById("opt1"),
    document.getElementById("opt2"),
    document.getElementById("opt3"),
  ];
  const optImgs = [
    document.getElementById("img0"),
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
  ];

  const basePath = step.basePath || "assets/parte10";
  const filePattern = step.filePattern || "{t}-{o}.png";
  const firstTrial = Number(step.firstTrial ?? 1);
  const lastTrial = Number(step.lastTrial ?? 17);
  const sentences = step.sentences || [];
  const requireSel = step.requireSelectionToAdvance !== false;

  // screenIndex:
  // 0 = instrucción
  // 1..17 = trials (t = screenIndex)
  const totalScreens = 1 + (lastTrial - firstTrial + 1); // 18

  const saved = getPartProgress(partId);
  let screenIndex = 0;
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), totalScreens - 1);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1, screenIndex, totalScreens });

  // fullscreen
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  let selectedIndex = null;

  function fileFor(t, o) {
    const f = filePattern.replace("{t}", String(t)).replace("{o}", String(o));
    return `${basePath}/${f}`;
  }

  function clearSelection() {
    optBoxes.forEach(b => b.classList.remove("selected"));
    selectedIndex = null;
    btnNext.style.display = requireSel ? "none" : "block";
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;
    if (screenIndex === 0) topBar.textContent = `${partLabel} · Instrucción`;
    else if (screenIndex === 1) topBar.textContent = `${partLabel} · Ejemplo 1/1`;
    else topBar.textContent = `${partLabel} · Ensayo ${screenIndex - 1}/16`;
  }

  function render() {
    updateTopBar();
    setPartProgress(partId, { screenIndex });

    // reset audios extra
    btnAudioCenter.style.display = "none";
    if (btnAudio2) btnAudio2.style.display = "none";

    if (screenIndex === 0) {
      // Instrucción: audio centrado
      optBoxes.forEach(b => (b.style.display = "none"));
      centerWord.style.display = "none";
      clearSelection();

      setupAudio(btnAudioCenter, instructionAudio, step.instructionAudio, { forceShow: true });
      setupInstructionAudio(null);

      btnNext.style.display = "block";
      return;
    }

    // Trials
    optBoxes.forEach(b => (b.style.display = "block"));
    clearSelection();

    const t = screenIndex; // 1..17
    centerWord.style.display = "block";
    centerWord.textContent = sentences[t - 1] || "";

    for (let o = 1; o <= 4; o++) {
      optImgs[o - 1].src = fileFor(t, o);
    }

    // Audios:
    // - t=1 (ejemplo): 2 audios arriba derecha
    // - t>=2: sin audio
    if (t === 1) {
      setupAudio(btnAudio, instructionAudio, step.practiceAudio1, { forceShow: true });
      setupAudio(btnAudio2, instructionAudio2, step.practiceAudio2, { forceShow: true });
    } else {
      setupInstructionAudio(null);
      if (btnAudio2) btnAudio2.style.display = "none";
    }
  }

  optBoxes.forEach(box => {
    box.onclick = () => {
      if (screenIndex === 0) return;
      const idx = Number(box.dataset.opt);
      selectedIndex = idx;

      optBoxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");

      btnNext.style.display = "block";
    };
  });

  btnNext.onclick = () => {
    if (screenIndex !== 0 && requireSel && selectedIndex === null) return;

    // guardar selección (para ZIP futuro)
    if (screenIndex !== 0) {
      const data = getPartData(partId);
      const responses = data.responses || {};
      responses[String(screenIndex)] = {
        sentence: sentences[screenIndex - 1] || "",
        selected: selectedIndex
      };
      setPartData(partId, { responses });
    }

    screenIndex++;
    if (screenIndex >= totalScreens) {
      setPartProgress(partId, { status: "done", screenIndex: totalScreens - 1 });
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}

function runStoryYesNoFlow(step) {
  // Fullscreen
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  // flecha siempre visible (pero puede exigir selección)
  btnNext.style.display = "block";

  // secuencia de pantallas (11)
  const screens = [
    { type: "center_audios", centerAudios: step.screen1_centerAudios },           // 1
    { type: "center_audio_one", centerAudios: [step.story1_audio] },              // 2 (historia 1 centrada)
    { type: "yesno", audio: step.yesno_block1_audios?.[0] },                      // 3
    { type: "yesno", audio: step.yesno_block1_audios?.[1] },                      // 4
    { type: "yesno", audio: step.yesno_block1_audios?.[2] },                      // 5
    { type: "yesno", audio: step.yesno_block1_audios?.[3] },                      // 6
    { type: "center_audios", centerAudios: [step.story2_audio, ...(step.screen7_centerAudios || [])] }, // 7 (historia 2 + 3 apilados)
    { type: "yesno", audio: step.yesno_block2_audios?.[0] },                      // 8
    { type: "yesno", audio: step.yesno_block2_audios?.[1] },                      // 9
    { type: "yesno", audio: step.yesno_block2_audios?.[2] },                      // 10
    { type: "yesno", audio: step.yesno_block2_audios?.[3] },                      // 11
  ];

  // progreso
  const saved = getPartProgress(partId);
  let screenIndex = 0;
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), screens.length - 1);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1, screenIndex, totalScreens: screens.length });

  const requireSel = step.requireSelectionToAdvance !== false;
  let selected = null;

  function updateTopBar() {
    topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · ${screenIndex + 1}/${screens.length}`;
  }

  function clearYesNo() {
    btnYes.classList.remove("selected");
    btnNo.classList.remove("selected");
    selected = null;
  }

  function render() {
    updateTopBar();
    setPartProgress(partId, { screenIndex });

    // ocultar audios “arriba derecha” por defecto
    setupInstructionAudio(null);

    const s = screens[screenIndex];

    if (s.type === "center_audios" || s.type === "center_audio_one") {
      showLayout("center_audios");
      // en pantalla de audios centrados no hay selección
      clearYesNo();

      // s.centerAudios ya trae 1 o 3 o 4 (en pantalla 7 trae 4: historia + 3)
      // pero nosotros mostraremos exactamente el largo que venga.
      setupCenterAudios(s.centerAudios || []);
      return;
    }

    if (s.type === "yesno") {
      showLayout("yesno");
      clearYesNo();

      // audio arriba derecha (forzar ícono visible aunque sea null)
      setupAudio(btnAudio, instructionAudio, s.audio, { forceShow: true });
      if (btnAudio2) btnAudio2.style.display = "none";

      return;
    }
  }

  // clic Sí/No
  btnYes.onclick = () => {
    selected = "SI";
    btnYes.classList.add("selected");
    btnNo.classList.remove("selected");
  };
  btnNo.onclick = () => {
    selected = "NO";
    btnNo.classList.add("selected");
    btnYes.classList.remove("selected");
  };

  // flecha
  btnNext.onclick = () => {
    const s = screens[screenIndex];

    if (s.type === "yesno" && requireSel && !selected) return;

    // Guardar respuestas yes/no
    if (s.type === "yesno") {
      const data = getPartData(partId);
      const responses = data.responses || {};
      responses[String(screenIndex + 1)] = { answer: selected }; // pantalla 3..6 y 8..11
      setPartData(partId, { responses });
    }

    screenIndex++;
    if (screenIndex >= screens.length) {
      setPartProgress(partId, { status: "done", screenIndex: screens.length - 1 });
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}

function runRepeatAudioRecord(step) {
  const hasIntro = Array.isArray(step.introAudios) && step.introAudios.length > 0;
  const noExample = step.noExample === true;

  const totalTrials = Number(step.totalTrials ?? 14);

  // screens:
  // si hasIntro: 0=intro
  // luego:
  //   si noExample: trials empiezan inmediatamente
  //   si NO: hay example y luego trials
  const totalScreens = (hasIntro ? 1 : 0) + (noExample ? 0 : 1) + totalTrials;

  // progreso
  const saved = getPartProgress(partId);
  let screenIndex = 0;
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), totalScreens - 1);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1, screenIndex, totalScreens });

  // Fullscreen + flecha
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";
  btnNext.style.display = "block";

  // Layout refs
  const btnPlay = document.getElementById("btnRepeatPlay");
  const recRow = document.getElementById("repeatRecRow");
  const recIcon = document.getElementById("repeatRecording");
  const stopBtn = document.getElementById("repeatStop");
  const promptAudio = document.getElementById("repeatPromptAudio");

  // Reutilizamos botones centrados existentes para intro (2 audios al centro)
  // (Si ya tienes btnAudioCenter y btnAudioCenter2 en run.html, los usamos)
  // Si no los tienes, dímelo y lo montamos igual acá.
  const introA1 = step.introAudios?.[0] ?? null;
  const introA2 = step.introAudios?.[1] ?? null;

  const recorder = new WavRecorder();
  let prepared = false;
  let isCapturing = false;
  let lastSavedKey = null;

  function audioForCurrentScreen() {
    const introOffset = hasIntro ? 1 : 0;
    const exampleOffset = noExample ? 0 : 1;

    // example (si existe)
    if (!noExample) {
      const exampleScreen = introOffset; // justo después del intro
      if (screenIndex === exampleScreen) return step.exampleAudio || null;
    }

    // trials
    const trialsStart = introOffset + (noExample ? 0 : 1);
    if (screenIndex >= trialsStart) {
      const n = (screenIndex - trialsStart) + 1; // 1..totalTrials
      if (!step.trialAudioPattern) return null;
      return step.trialAudioPattern.replace("{n}", String(n));
    }

    return null;
  }

  function keyForCurrentScreen() {
    // guardamos wav por pantalla 2..16:
    // ejemplo = s02, ensayo1 = s03...
    const s = screenIndex + 1; // humano
    return `part${String(partId).padStart(2, "0")}_s${String(s).padStart(2, "0")}.wav`;
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (hasIntro && screenIndex === 0) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    const introOffset = hasIntro ? 1 : 0;
    const trialsStart = introOffset + (noExample ? 0 : 1);

    const ensayoN = (screenIndex - trialsStart) + 1; // 1..12
    topBar.textContent = `${partLabel} · Ensayo ${ensayoN}/${totalTrials}`;
  }

  function resetRecUI() {
    recRow.style.display = "none";
    isCapturing = false;
  }

  async function ensurePrepared() {
    if (prepared) return;
    await recorder.prepare({ numChannels: 1 });
    prepared = true;
  }

  async function startCapture() {
    await ensurePrepared();
    recorder.beginCapture();
    isCapturing = true;
    recRow.style.display = "flex";
  }

  async function stopAndSave() {
    if (!isCapturing) return;
    const blob = await recorder.stop(); // WAV
    resetRecUI();

    if (blob) {
      const key = keyForCurrentScreen();
      lastSavedKey = key;
      await saveAudioBlob(key, blob);
      // (Opcional) guardar mapping para el ZIP futuro:
      const data = getPartData(partId);
      const takes = data.takes || {};
      takes[String(screenIndex)] = { key };
      setPartData(partId, { takes });
    }
  }

  async function render() {
    showLayout("repeat_audio");
    updateTopBar();
    setPartProgress(partId, { screenIndex });

    // Por defecto ocultamos audio arriba derecha (no se usa en este test)
    setupInstructionAudio(null);
    if (btnAudio2) btnAudio2.style.display = "none";
    if (btnAudioCenter) btnAudioCenter.style.display = "none";
    if (btnAudioCenter2) btnAudioCenter2.style.display = "none";
    document.body.classList.remove("twoCenterAudios");

    resetRecUI();

    // INTRO: 2 audios centrados (sin grabación)
    if (hasIntro && screenIndex === 0) {
      btnPlay.style.display = "none";
      recRow.style.display = "none";

      document.body.classList.remove("twoCenterAudios");
      document.body.classList.remove("stackCenterAudios");

      // si hay 2 audios en intro, por defecto los apilamos (Test 14)
      if (Array.isArray(step.introAudios) && step.introAudios.length === 2) {
        document.body.classList.add("stackCenterAudios");
      } else if (Array.isArray(step.introAudios) && step.introAudios.length === 2) {
        document.body.classList.add("twoCenterAudios");
      }

      setupAudio(btnAudioCenter, instructionAudio, introA1, { forceShow: true });
      setupAudio(btnAudioCenter2, instructionAudioCenter2, introA2, { forceShow: true });;

      // en intro la flecha avanza
      return;
    }

    // EJEMPLO + ENSAYOS: 1 audio centrado que al terminar => auto grabar
    btnPlay.style.display = "block";

    const a = audioForCurrentScreen();
    promptAudio.src = a || "";

    // MOSTRAR ícono aunque no exista el mp3 todavía
    // (si está vacío, el click no hará nada)
    btnPlay.onclick = async () => {
      if (!promptAudio.src) return;

      // PRE-CARGAR micrófono ANTES de reproducir
      await ensurePrepared();

      // reproducir audio
      promptAudio.currentTime = 0;
      await promptAudio.play();
    };

    // cuando termina el audio: empezar a grabar inmediatamente
    promptAudio.onended = async () => {
      await startCapture();
    };

    // detener manual
    stopBtn.onclick = async () => {
      await stopAndSave();
    };
  }

  // Flecha:
  // - si está grabando: detiene+guarda y (segundo click) avanza
  // - si no está grabando: avanza
  btnNext.onclick = async () => {
    if (isCapturing) {
      await stopAndSave();
      return; // primera pulsación solo detiene
    }

    screenIndex++;
    if (screenIndex >= totalScreens) {
      setPartProgress(partId, { status: "done", screenIndex: totalScreens - 1 });
      await recorder.close();
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}

function runImageInstrAutoRecord(step) {
  showLayout("img_instr_record");

  // refs
  const imgEl = document.getElementById("t17Image");

  const boxI = document.getElementById("t17InstrI");
  const boxP = document.getElementById("t17InstrP");
  const boxPS = document.getElementById("t17InstrPS");
  const boxPF = document.getElementById("t17InstrPF");

  const audioI = document.getElementById("t17AudioI");
  const audioP = document.getElementById("t17AudioP");
  const audioPS = document.getElementById("t17AudioPS");
  const audioPF = document.getElementById("t17AudioPF");

  // cada item tiene el icono <img> como segundo hijo
  const iconI = boxI.querySelector("img");
  const iconP = boxP.querySelector("img");
  const iconPS = boxPS.querySelector("img");
  const iconPF = boxPF.querySelector("img");

  const recIcon = document.getElementById("t17Recording");
  const stopBtn = document.getElementById("t17Stop");

  // config
  const basePath = step.basePath || "assets/parte17";
  const first = Number(step.firstImage ?? 1);
  const last = Number(step.lastImage ?? 25);
  const pattern = step.imagePattern || "{n}.png";
  const total = last - first + 1;

  // progreso reanudar
  const saved = getPartProgress(partId);
  let n = first;
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.itemIndex)) {
    n = Math.min(Math.max(saved.itemIndex, first), last);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1, itemIndex: n, totalItems: total });

  // fullscreen + flecha
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";
  btnNext.style.display = "block";

  // WAV recorder (auto)
  const recorder = new WavRecorder();
  let prepared = false;
  let isCapturing = false;

  async function ensurePrepared() {
    if (prepared) return;
    await recorder.prepare({ numChannels: 1 }); // versión “prepare/beginCapture”
    prepared = true;
  }

  function imageFile(num) {
    return `${basePath}/${pattern.replace("{n}", String(num))}`;
  }

  function wavKey(num) {
    // part17_item001.wav ... item025.wav
    return `part${String(partId).padStart(2, "0")}_item${String(num).padStart(3, "0")}.wav`;
  }

  function mountInstr({ showI, showP, showPS, showPF }) {
    // mostrar/ocultar items
    boxI.style.display = showI ? "flex" : "none";
    boxP.style.display = showP ? "flex" : "none";
    boxPS.style.display = showPS ? "flex" : "none";
    boxPF.style.display = showPF ? "flex" : "none";

    // asignar src (pueden ser null por ahora, el icono igual queda y no hace nada)
    audioI.src = step.instrI || "";
    audioP.src = step.instrP || "";
    audioPS.src = step.instrPS || "";
    audioPF.src = step.instrPF || "";

    const play = (a) => {
      if (!a.src) return;
      a.currentTime = 0;
      a.play();
    };

    iconI.onclick = () => play(audioI);
    iconP.onclick = () => play(audioP);
    iconPS.onclick = () => play(audioPS);
    iconPF.onclick = () => play(audioPF);
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;
    if (n === 1) topBar.textContent = `${partLabel} · Ejemplo 1/1`;
    else topBar.textContent = `${partLabel} · Ensayo ${n - 1}/${last - 1}`;
  }

  async function startCapture() {
    await ensurePrepared();
    recorder.beginCapture();
    isCapturing = true;
    // (grabando.png ya está visible)
  }

  async function stopAndSave() {
    if (!isCapturing) return;
    isCapturing = false;

    const blob = await recorder.stop();
    if (blob) {
      const key = wavKey(n);
      await saveAudioBlob(key, blob);

      const data = getPartData(partId);
      const takes = data.takes || {};
      takes[String(n)] = { key, image: imageFile(n) };
      setPartData(partId, { takes });
    }
  }

  async function render() {
    updateTopBar();
    imgEl.src = imageFile(n);

    // instrucciones: pantalla 1 (n=1) muestra I,P,PS,PF
    // resto (n>=2) muestra P,PS,PF
    // Si el test tiene solo instrP (y los demás null), asumimos que es “un audio único en ejemplo”
    const onlyOne = !!step.instrP && !step.instrI && !step.instrPS && !step.instrPF;

    if (onlyOne) {
      if (n === 1) {
        // Ejemplo: mostrar solo P (audio único)
        mountInstr({ showI: false, showP: true, showPS: false, showPF: false });
      } else {
        // Ensayos: sin audio
        mountInstr({ showI: false, showP: false, showPS: false, showPF: false });
      }
    } else {
      // Comportamiento original del test 17
      if (n === 1) mountInstr({ showI: true, showP: true, showPS: true, showPF: true });
      else mountInstr({ showI: false, showP: true, showPS: true, showPF: true });
    }

    // auto grabar al entrar a cada pantalla
    setPartProgress(partId, { itemIndex: n });
    await startCapture();
  }

  // detener manual (si quieres permitirlo)
  stopBtn.onclick = async () => {
    await stopAndSave();
  };

  // flecha: si está grabando -> detiene y guarda y avanza
  btnNext.onclick = async () => {
    if (isCapturing) {
      await stopAndSave();
      // seguimos avanzando en el mismo click (como tú pediste que no se pierdan segundos)
      // si prefieres “primer click detiene, segundo avanza”, dímelo.
    }

    n++;
    if (n > last) {
      setPartProgress(partId, { status: "done", itemIndex: last });
      await recorder.close();
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", itemIndex: n });
    await render();
  };

  // iniciar
  ensurePrepared().then(render).catch(err => {
    console.error(err);
    alert("No se pudo acceder al micrófono.");
  });
}

function runImageAutoRecordSimple(step) {
  showLayout("img_record_simple");

  const imgEl = document.getElementById("t18Image");
  const audioIcon = document.getElementById("t18InstrAudio");
  const audioEl = document.getElementById("t18AudioEl");

  const stopBtn = document.getElementById("t18Stop");

  const basePath = step.basePath;
  const first = Number(step.firstImage);
  const last = Number(step.lastImage);
  const pattern = step.imagePattern || "{n}.png";

  const total = last - first + 1;

  const saved = getPartProgress(partId);
  let n = first;

  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.itemIndex)) {
    n = Math.min(Math.max(saved.itemIndex, first), last);
  }

  setPartProgress(partId, {
    status: "in_progress",
    stepIndex: 0,
    totalSteps: 1,
    itemIndex: n,
    totalItems: total
  });

  // Fullscreen + flecha
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";
  btnNext.style.display = "block";

  const recorder = new WavRecorder();
  let prepared = false;
  let isCapturing = false;

  async function ensurePrepared() {
    if (prepared) return;
    await recorder.prepare({ numChannels: 1 });
    prepared = true;
  }

  function imageFile(num) {
    return `${basePath}/${pattern.replace("{n}", String(num))}`;
  }

  function wavKey(num) {
    return `part${String(partId).padStart(2, "0")}_item${String(num).padStart(3, "0")}.wav`;
  }

  function updateTopBar() {
    const label = `Parte ${String(partId).padStart(2, "0")}`;
    if (n === 1) topBar.textContent = `${label} · Ejemplo 1/1`;
    else topBar.textContent = `${label} · Ensayo ${n - 1}/${last - 1}`;
  }

  async function startCapture() {
    await ensurePrepared();
    recorder.beginCapture();
    isCapturing = true;
  }

  async function stopAndSave() {
    if (!isCapturing) return;
    isCapturing = false;

    const blob = await recorder.stop();
    if (blob) {
      const key = wavKey(n);
      await saveAudioBlob(key, blob);

      const data = getPartData(partId);
      const takes = data.takes || {};
      takes[String(n)] = { key, image: imageFile(n) };
      setPartData(partId, { takes });
    }
  }

  async function render() {
    updateTopBar();
    imgEl.src = imageFile(n);

    // Solo pantalla 1 tiene audio instrucción
    if (n === 1 && step.instructionAudio) {
      audioEl.src = step.instructionAudio;
      audioIcon.style.display = "block";
      audioIcon.onclick = () => {
        audioEl.currentTime = 0;
        audioEl.play();
      };
    } else {
      audioIcon.style.display = "none";
    }

    setPartProgress(partId, { itemIndex: n });
    await startCapture();
  }

  stopBtn.onclick = async () => {
    await stopAndSave();
  };

  btnNext.onclick = async () => {
    if (isCapturing) {
      await stopAndSave();
    }

    n++;
    if (n > last) {
      setPartProgress(partId, { status: "done", itemIndex: last });
      await recorder.close();
      window.location.href = "index.html";
      return;
    }

    await render();
  };

  ensurePrepared().then(render).catch(err => {
    console.error(err);
    alert("No se pudo acceder al micrófono.");
  });
}

function runVerbalFluency(step) {
  showLayout("fluency");

  const centerText = document.getElementById("t3CenterText");
  const centerAudio = document.getElementById("t3CenterAudio");
  const topAudio = document.getElementById("t3TopAudio");
  const audioEl = document.getElementById("t3AudioEl");

  const stopBtn = document.getElementById("t3Stop");

  const recorder = new WavRecorder();
  let prepared = false;
  let isCapturing = false;
  let timer = null;

  const duration = step.recordDurationMs || 60000;

  const screens = [
    { type: "centerAudio", audio: step.instr1Audio },
    { type: "fluency", text: "Ropa", audio: step.ropaAudio },
    { type: "fluency", text: "Animales", audio: step.animalesAudio },
    { type: "centerAudio", audio: step.instr2Audio },
    { type: "fluency", text: "b__________", audio: step.letraBAudio },
    { type: "fluency", text: "s______", audio: step.letraSAudio }
  ];

  let index = 0;

  btnFullscreen.style.display = "block";
  btnNext.style.display = "block";

  async function ensurePrepared() {
    if (prepared) return;
    await recorder.prepare({ numChannels: 1 });
    prepared = true;
  }

  async function startCapture() {
    await ensurePrepared();
    recorder.beginCapture();
    isCapturing = true;

    timer = setTimeout(async () => {
      await stopAndSave();
    }, duration);
  }

  async function stopAndSave() {
    if (!isCapturing) return;
    isCapturing = false;

    clearTimeout(timer);

    const blob = await recorder.stop();
    if (blob) {
      const key = `part03_screen${index + 1}.wav`;
      await saveAudioBlob(key, blob);
    }
  }

  async function render() {
    const s = screens[index];

    centerText.style.display = "none";
    centerAudio.style.display = "none";
    topAudio.style.display = "none";

    if (s.type === "centerAudio") {
      centerAudio.style.display = "block";
      centerAudio.onclick = () => {
        if (!s.audio) return;
        audioEl.src = s.audio;
        audioEl.currentTime = 0;
        audioEl.play();
      };
      return;
    }

    if (s.type === "fluency") {
      centerText.style.display = "block";
      centerText.textContent = s.text;

      topAudio.style.display = "block";
      topAudio.onclick = async () => {
        if (!s.audio) return;

        // PRELOAD 2 seg antes
        await ensurePrepared();
        setTimeout(() => { }, 2000);

        audioEl.src = s.audio;
        audioEl.currentTime = 0;
        await audioEl.play();
      };

      audioEl.onended = async () => {
        await startCapture();
      };
    }
  }

  stopBtn.onclick = async () => {
    await stopAndSave();
  };

  btnNext.onclick = async () => {
    if (isCapturing) await stopAndSave();

    index++;
    if (index >= screens.length) {
      await recorder.close();
      window.location.href = "index.html";
      return;
    }
    render();
  };

  render();
}

function runImageLabeling(step) {
  const titleEl = document.getElementById("instructionTitle");
  const bodyEl = document.getElementById("instructionBody");

  const textInstruction = document.getElementById("textInstruction");
  const textImage = document.getElementById("textImage");
  const textAnswer = document.getElementById("textAnswer");

  const images = step.images || [];
  if (images.length !== 6) {
    console.warn("Parte 25: se esperaban 6 imágenes (1 práctica + 5 ensayos).");
  }

  // Pantallas:
  // screenIndex 0 = instrucción
  // screenIndex 1 = práctica (images[0])
  // screenIndex 2..6 = ensayos (images[1..5])
  const totalScreens = 1 + images.length; // 1 + 6 = 7

  const saved = getPartProgress(partId);
  let screenIndex = 0;

  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), totalScreens - 1);
  }

  // Fullscreen + flecha siempre disponibles en este test
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  btnNext.style.display = "block";

  setPartProgress(partId, {
    status: "in_progress",
    stepIndex: 0,
    totalSteps: 1,
    screenIndex,
    totalScreens
  });

  const data = getPartData(partId);
  const responses = data.responses || {}; // {"1":"texto práctica", "2":"texto ensayo1", ...}

  let saveTimer = null;

  function setTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (screenIndex === 0) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    if (screenIndex === 1) {
      topBar.textContent = `${partLabel} · Práctica 1/1`;
      return;
    }

    // Ensayos: screenIndex 2..6 => ensayo 1..5
    const ensayoIndex = screenIndex - 1;
    topBar.textContent = `${partLabel} · Ensayo ${ensayoIndex}/5`;
  }

  function render() {
    setTopBar();
    setPartProgress(partId, { screenIndex });

    // limpiar clase de centrado por defecto
    document.body.classList.remove("centeredInstruction");

    if (screenIndex === 0) {
      showLayout("instruction");
      document.body.classList.add("centeredInstruction");

      titleEl.textContent = step.instructionTitle || "Instrucción";
      bodyEl.textContent = step.instructionBody || "";

      // Audio de instrucción (ícono arriba derecha)
      setupInstructionAudio(step.instructionAudio);

      // En instrucción, NO mostramos textarea, pero sí flecha para continuar
      btnNext.style.display = "block";
      return;
    }

    // Práctica + ensayos
    showLayout("text_image");

    // En práctica/ensayos ocultamos audio (solo era para instrucción)
    setupInstructionAudio(null);

    // Instrucción pequeña arriba (opcional)
    textInstruction.textContent = ""; // si quieres un texto fijo, ponlo aquí

    // Imagen según pantalla
    const imgIndex = screenIndex - 1; // 1->0, 2->1, ...
    textImage.src = images[imgIndex];

    // cargar texto guardado para esta pantalla
    textAnswer.placeholder = step.placeholder || "";
    textAnswer.value = responses[String(screenIndex)] || "";

    textAnswer.oninput = () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        responses[String(screenIndex)] = textAnswer.value;
        setPartData(partId, { responses });
      }, 150);
    };
  }

  btnNext.onclick = () => {
    // si estamos en práctica/ensayo, guardar antes de avanzar
    if (screenIndex !== 0) {
      responses[String(screenIndex)] = textAnswer.value;
      setPartData(partId, { responses });

      const minChars = Number(step.minChars ?? 0);
      if (minChars > 0 && (textAnswer.value || "").trim().length < minChars) {
        alert(`Debe escribir al menos ${minChars} caracteres.`);
        return;
      }
    }

    screenIndex++;

    if (screenIndex >= totalScreens) {
      setPartProgress(partId, { status: "done", screenIndex: totalScreens - 1 });
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}


function runDictationText(step) {
  const practiceCount = Number(step.totalPractice ?? 1);
  const trialCount = Number(step.totalTrials ?? 5);
  const totalScreens = 1 + practiceCount + trialCount; // 1 instrucción + práctica + ensayos

  // Estado: screenIndex (0..6)
  // 0 = instrucción
  // 1 = práctica
  // 2..6 = ensayos
  const saved = getPartProgress(partId);
  let screenIndex = 0;

  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), totalScreens - 1);
  }

  // Fullscreen siempre disponible en esta parte
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  setPartProgress(partId, {
    status: "in_progress",
    stepIndex: 0,
    totalSteps: 1,
    screenIndex,
    totalScreens
  });

  const titleEl = document.getElementById("instructionTitle");
  const bodyEl = document.getElementById("instructionBody");

  const promptEl = document.getElementById("dictationPrompt");
  const textEl = document.getElementById("dictationAnswer");

  const data = getPartData(partId);
  const responses = data.responses || {}; // { "1": "texto práctica", "2": "texto ensayo 1", ... }

  let saveTimer = null;

  function setTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (screenIndex === 0) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    if (screenIndex === 1) {
      topBar.textContent = `${partLabel} · Práctica 1/1`;
      return;
    }

    const ensayoIndex = screenIndex - 1; // 2->1, 3->2...
    topBar.textContent = `${partLabel} · Ensayo ${ensayoIndex}/${trialCount}`;
  }

  function render() {
    setTopBar();
    setPartProgress(partId, { screenIndex });

    // Flecha siempre visible, pero en dictado puede exigir minChars
    btnNext.style.display = "block";

    if (screenIndex === 0) {
      showLayout("instruction");
      setupInstructionAudio(null); // sin audio en instrucción (si quieres que haya, lo cambiamos)

      titleEl.textContent = step.instructionTitle || "";
      bodyEl.textContent = step.instructionBody || "";

      return;
    }

    // Práctica + Ensayos
    showLayout("dictation");

    // Audio disponible aquí (es el mismo en todos)
    setupInstructionAudio(step.audio);

    promptEl.textContent = step.prompt || "";

    // cargar texto guardado para esta pantalla
    textEl.value = responses[String(screenIndex)] || "";

    // autosave
    textEl.oninput = () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        responses[String(screenIndex)] = textEl.value;
        setPartData(partId, { responses });
      }, 150);
    };
  }

  btnNext.onclick = () => {
    // si estamos en práctica/ensayo, guarda antes de avanzar
    if (screenIndex !== 0) {
      responses[String(screenIndex)] = textEl.value;
      setPartData(partId, { responses });

      const minChars = Number(step.minChars ?? 0);
      if (minChars > 0 && (textEl.value || "").trim().length < minChars) {
        alert(`Debe escribir al menos ${minChars} caracteres.`);
        return;
      }
    }

    screenIndex++;

    if (screenIndex >= totalScreens) {
      // terminar parte
      setPartProgress(partId, { status: "done", screenIndex: totalScreens - 1 });
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}


function runTextImage(step) {
  showLayout("text_image");

  // Fullscreen SI disponible acá (como pediste)
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  // Flecha: siempre visible en este test (pero podemos exigir minChars)
  btnNext.style.display = "block";

  // Topbar
  topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · ${part.name}`;

  // Instrucción + imagen
  const textInstruction = document.getElementById("textInstruction");
  const textImage = document.getElementById("textImage");
  const textAnswer = document.getElementById("textAnswer");

  textInstruction.textContent = step.instruction || "";
  textImage.src = step.image;

  // Cargar texto guardado (si reanuda)
  const savedData = getPartData(partId);
  textAnswer.value = savedData.text || "";

  // Guardado automático (cada vez que escribe)
  let saveTimer = null;
  textAnswer.addEventListener("input", () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      setPartData(partId, { text: textAnswer.value });
    }, 150);
  });

  // Marcar progreso
  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1 });

  // Flecha: validar mínimo y terminar
  btnNext.onclick = () => {
    const txt = (textAnswer.value || "").trim();
    const minChars = Number(step.minChars ?? 1);

    if (txt.length < minChars) {
      // ultra básico: no alert feo, pero sí avisar
      alert(`Debe escribir al menos ${minChars} caracter(es).`);
      return;
    }

    // Guardar definitivo
    setPartData(partId, { text: textAnswer.value });

    // Marcar done y volver al menú
    setPartProgress(partId, { status: "done" });
    window.location.href = "index.html";
  };
}

function runAudioRecordImage(step) {
  showLayout("audio_record");

  // UI refs
  const arImage = document.getElementById("arImage");
  const btnRec = document.getElementById("btnRec");
  const btnStop = document.getElementById("btnStop");
  const btnRecording = document.getElementById("btnRecording");

  // top bar
  topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · ${part.name}`;

  // imagen
  arImage.src = step.image;

  // audio instrucciones (icono arriba derecha)
  setupInstructionAudio(step.instructionAudio);

  // fullscreen disponible
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  // flecha: si está grabando -> detiene. Si ya está detenido -> termina (vuelve menú)
  btnNext.style.display = "block";

  const recorder = new WavRecorder();
  let isRecording = false;
  let hasAudio = false;

  function setIdleUI() {
    btnRec.style.display = "block";
    btnStop.style.display = "none";
    btnRecording.style.display = "none";
  }

  function setRecordingUI() {
    btnRec.style.display = "none";
    btnStop.style.display = "block";
    btnRecording.style.display = "block";
  }

  async function startRec() {
    try {
      await recorder.start({ numChannels: 1 });
      isRecording = true;
      setRecordingUI();
    } catch (err) {
      console.error(err);
      alert("No se pudo acceder al micrófono.");
      setIdleUI();
    }
  }

  async function stopRecAndSave() {
    if (!isRecording) return;
    isRecording = false;

    const blob = await recorder.stop();
    if (blob) {
      hasAudio = true;
      const key = step.audioKey || `part${partId}_take1`;
      await saveAudioBlob(key, blob);
      // Dejamos UI en reposo (puedes decidir ocultar rec si solo es 1 toma)
      setIdleUI();
    } else {
      setIdleUI();
    }
  }

  btnRec.onclick = () => startRec();
  btnStop.onclick = () => stopRecAndSave();

  btnNext.onclick = async () => {
    // flecha también detiene
    if (isRecording) {
      await stopRecAndSave();
      return; // primera pulsación solo detiene
    }

    // opcional: exigir que exista audio antes de salir
    // si no quieres exigirlo, elimina este if
    if (!hasAudio) {
      const ok = confirm("Aún no hay grabación. ¿Desea continuar igual?");
      if (!ok) return;
    }

    setPartProgress(partId, { status: "done" });
    window.location.href = "index.html";
  };

  // estado inicial
  setIdleUI();
  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1 });
}

function runAudioRecordWords(step) {
  showLayout("audio_record");

  const arWordWrap = document.getElementById("arWordWrap");
  const arWord = document.getElementById("arWord");
  const arImageWrap = document.getElementById("arImageWrap");
  const arImage = document.getElementById("arImage");

  const btnRec = document.getElementById("btnRec");
  const btnStop = document.getElementById("btnStop");
  const btnRecording = document.getElementById("btnRecording");

  // Este layout será solo palabras
  arImageWrap.style.display = "none";
  arWordWrap.style.display = "flex";

  // instrucciones por icono
  setupInstructionAudio(step.instructionAudio);

  // fullscreen disponible
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  // flecha siempre visible
  btnNext.style.display = "block";

  const words = step.words || [];
  if (!words.length) throw new Error("Sin palabras configuradas");

  // Progreso (reanudar en la palabra exacta)
  const saved = getPartProgress(partId);
  let wordIndex = 0;
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.wordIndex)) {
    wordIndex = Math.min(Math.max(saved.wordIndex, 0), words.length - 1);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1, wordIndex, totalWords: words.length });

  // Para el ZIP futuro: guardamos mapping palabra->key
  const partData = getPartData(partId);
  const takes = partData.takes || {}; // { "0": {word, key}, ... }

  const recorder = new WavRecorder();
  let isRecording = false;
  let hasThisWordAudio = false;

  function keyForWord(i) {
    // Ej: part20_w001
    return `part${String(partId).padStart(2, "0")}_w${String(i + 1).padStart(3, "0")}`;
  }

  function setIdleUI() {
    // En este test NO necesitamos rec manual (autoStart),
    // pero lo dejamos oculto para evitar tocarlo.
    btnRec.style.display = "none";
    btnStop.style.display = "none";
    btnRecording.style.display = "none";
  }

  function setRecordingUI() {
    btnRec.style.display = "none";
    btnStop.style.display = "block";
    btnRecording.style.display = "block";
  }

  function setStoppedUI() {
    // detenido: mostramos solo el botón detener? no; mejor ocultarlo
    btnStop.style.display = "none";
    btnRecording.style.display = "none";
  }

  async function startRecAuto() {
    try {
      await recorder.start({ numChannels: 1 });
      isRecording = true;
      hasThisWordAudio = false;
      setRecordingUI();
    } catch (err) {
      console.error(err);
      alert("No se pudo acceder al micrófono.");
      setIdleUI();
    }
  }

  async function stopRecAndSaveCurrent() {
    if (!isRecording) return;
    isRecording = false;

    const blob = await recorder.stop();
    if (blob) {
      const key = keyForWord(wordIndex);
      await saveAudioBlob(key, blob);

      takes[String(wordIndex)] = { word: words[wordIndex], key };
      setPartData(partId, { takes });

      hasThisWordAudio = true;
    }
    setStoppedUI();
  }

  function updateTopBar() {
    topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · Palabra ${wordIndex + 1}/${words.length}`;
  }

  async function renderWord() {
    updateTopBar();
    arWord.textContent = words[wordIndex];
    setPartProgress(partId, { wordIndex });

    // clave: apenas aparece la palabra, ya está grabando
    setIdleUI();
    await startRecAuto();
  }

  // Botón detener: detiene y guarda, pero NO avanza
  btnStop.onclick = async () => {
    await stopRecAndSaveCurrent();
  };

  // Flecha: si está grabando, primero detiene+guarda y luego avanza
  btnNext.onclick = async () => {
    if (isRecording) {
      await stopRecAndSaveCurrent();
      // después de detener, avanzamos inmediatamente
    }

    // avanzar
    wordIndex++;
    if (wordIndex >= words.length) {
      setPartProgress(partId, { status: "done", wordIndex: words.length - 1 });
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", wordIndex });
    await renderWord();
  };

  // iniciar
  renderWord();
}

function runLineBisection(step) {
  if (!resume) {
    clearPartProgress(partId);
    clearPartData(partId);
  }

  // 2 pantallas:
  // 0 = demostración (2 audios abajo izquierda + dibujo)
  // 1 = paciente (1 audio abajo izquierda + dibujo)
  const totalScreens = 2;

  // === progreso / resume ===
  const saved = getPartProgress(partId);
  let screenIndex = 0;

  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), totalScreens - 1);
  }

  setPartProgress(partId, {
    status: "in_progress",
    stepIndex: 0,
    totalSteps: 1,
    screenIndex,
    totalScreens
  });

  // === UI base ===
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  btnNext.style.display = "block";

  // ocultar audios centrados
  if (btnAudioCenter) btnAudioCenter.style.display = "none";
  if (btnAudioCenter2) btnAudioCenter2.style.display = "none";
  document.body.classList.remove("stackCenterAudios");

  // layout
  showLayout("line_bisection");

  const canvas = document.getElementById("lbCanvas");
  const ctx = canvas.getContext("2d");

  // imagen base
  const img = new Image();
  img.src = step.baseImage;

  // trazos separados
  let demoStrokes = [];
  let patientStrokes = [];
  let drawing = false;

  const existingData = resume ? getPartData(partId) : null;
  if (resume && existingData?.patientStrokes && Array.isArray(existingData.patientStrokes)) {
    patientStrokes = existingData.patientStrokes;
  }

  function getCurrentStrokes() {
    if (screenIndex === 0) return demoStrokes;
    if (screenIndex === 1) return patientStrokes;
    return [];
  }

  function setCanvasSize() {
    canvas.width = Math.floor(window.innerWidth);
    canvas.height = Math.floor(window.innerHeight);
  }

  function drawBase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  function drawStrokes() {
    const strokesToDraw = getCurrentStrokes();

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (const stroke of strokesToDraw) {
      if (!stroke || stroke.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    }
  }

  function renderCanvas() {
    drawBase();
    drawStrokes();
  }

  function pointerToCanvas(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    return { x, y };
  }

  function startStroke(p) {
    drawing = true;
    const currentStrokes = getCurrentStrokes();
    currentStrokes.push([{ x: p.x, y: p.y, t: Date.now() }]);
    renderCanvas();
  }

  function addPoint(p) {
    if (!drawing) return;
    const currentStrokes = getCurrentStrokes();
    const stroke = currentStrokes[currentStrokes.length - 1];
    if (!stroke) return;
    stroke.push({ x: p.x, y: p.y, t: Date.now() });
    renderCanvas();
  }

  function endStroke() {
    drawing = false;
  }

  function enableDrawing(enable) {
    canvas.onmousedown = null;
    canvas.onmousemove = null;
    canvas.onmouseup = null;
    canvas.onmouseleave = null;

    canvas.ontouchstart = null;
    canvas.ontouchmove = null;
    canvas.ontouchend = null;
    canvas.ontouchcancel = null;

    if (!enable) return;

    canvas.onmousedown = (e) => {
      const p = pointerToCanvas(e);
      startStroke(p);
    };

    canvas.onmousemove = (e) => {
      const p = pointerToCanvas(e);
      addPoint(p);
    };

    canvas.onmouseup = endStroke;
    canvas.onmouseleave = endStroke;

    canvas.ontouchstart = (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      const p = pointerToCanvas(t);
      startStroke(p);
    };

    canvas.ontouchmove = (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      const p = pointerToCanvas(t);
      addPoint(p);
    };

    canvas.ontouchend = (e) => {
      e.preventDefault();
      endStroke();
    };

    canvas.ontouchcancel = endStroke;
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;
    if (screenIndex === 0) topBar.textContent = `${partLabel} · Demostración`;
    if (screenIndex === 1) topBar.textContent = `${partLabel} · Paciente`;
  }

  function hideCornerAudios() {
    if (btnAudio) btnAudio.style.display = "none";
    if (btnAudio2) btnAudio2.style.display = "none";

    if (instructionAudio) {
      instructionAudio.pause();
      instructionAudio.currentTime = 0;
    }

    if (instructionAudio2) {
      instructionAudio2.pause();
      instructionAudio2.currentTime = 0;
    }
  }

  function showDemoAudios() {
    hideCornerAudios();

    setupAudio(btnAudio, instructionAudio, step.demoAudios?.[0] ?? null, { forceShow: true });
    setupAudio(btnAudio2, instructionAudio2, step.demoAudios?.[1] ?? null, { forceShow: true });

    if (btnAudio) {
      btnAudio.style.display = "block";
      btnAudio.style.position = "fixed";
      btnAudio.style.left = "20px";
      btnAudio.style.bottom = "130px";
      btnAudio.style.top = "auto";
      btnAudio.style.right = "auto";
      btnAudio.style.zIndex = "9999";
    }

    if (btnAudio2) {
      btnAudio2.style.display = "block";
      btnAudio2.style.position = "fixed";
      btnAudio2.style.left = "20px";
      btnAudio2.style.bottom = "70px";
      btnAudio2.style.top = "auto";
      btnAudio2.style.right = "auto";
      btnAudio2.style.zIndex = "9999";
    }
  }

  function showPatientAudio() {
    hideCornerAudios();

    setupAudio(btnAudio, instructionAudio, step.patientAudio ?? null, { forceShow: true });

    if (btnAudio) {
      btnAudio.style.display = "block";
      btnAudio.style.position = "fixed";
      btnAudio.style.left = "20px";
      btnAudio.style.bottom = "70px";
      btnAudio.style.top = "auto";
      btnAudio.style.right = "auto";
      btnAudio.style.zIndex = "9999";
    }
  }

  function renderScreen() {
    updateTopBar();
    setPartProgress(partId, { screenIndex });

    showLayout("line_bisection");
    renderCanvas();
    enableDrawing(true);

    if (screenIndex === 0) {
      showDemoAudios();
      return;
    }

    if (screenIndex === 1) {
      showPatientAudio();
      return;
    }
  }

  function savePatientData() {
    const data = getPartData(partId) || {};
    setPartData(partId, {
      ...data,
      baseImage: step.baseImage,
      scaleImage: step.scaleImage || null,
      patientStrokes,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      savedAt: new Date().toISOString()
    });
  }

  btnNext.onclick = () => {
    if (screenIndex === 1) {
      savePatientData();
    }

    if (screenIndex === 0) {
      demoStrokes = [];
    }

    screenIndex++;

    if (screenIndex >= totalScreens) {
      if ((screenIndex - 1) === 1) {
        savePatientData();
      }

      setPartProgress(partId, {
        status: "done",
        screenIndex: totalScreens - 1
      });

      clearPartProgress(partId);
      clearPartData(partId);

      demoStrokes = [];
      patientStrokes = [];
      drawing = false;

      // intento de cierre
      window.open("", "_self");
      window.close();

      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    renderScreen();
  };

  window.addEventListener("resize", () => {
    setCanvasSize();
    renderCanvas();
  });

  img.onload = () => {
    setCanvasSize();
    renderScreen();
  };
}

function clearPartProgress(partId) {
  localStorage.removeItem(`partProgress_${partId}`);
}

function clearPartData(partId) {
  localStorage.removeItem(`partData_${partId}`);
}


// Router
if (step.type === "semantic_match") runSemanticMatch(step);
else if (step.type === "mcq_image") runCalcMCQ(step);
else if (step.type === "text_image") runTextImage(step);
else if (step.type === "dictation_text") runDictationText(step);
else if (step.type === "image_labeling") runImageLabeling(step);
else if (step.type === "audio_record_image") runAudioRecordImage(step);
else if (step.type === "audio_record_words") runAudioRecordWords(step);
else if (step.type === "mcq4_image_trials") runMCQ4ImageTrials(step);
else if (step.type === "video_record_trials") runVideoRecordTrials(step);
else if (step.type === "audio_mcq4_trials") runAudioMCQ4Trials(step);
else if (step.type === "audio_mcq4_words_on_screen") runAudioMCQ4WordsOnScreen(step);
else if (step.type === "audio_mcq4_trials_with_dual_intro") runAudioMCQ4TrialsWithDualIntro(step);
else if (step.type === "mcq4_sentence_center_with_audio_practice") runMCQ4SentenceCenterWithAudioPractice(step);
else if (step.type === "story_yesno_flow") runStoryYesNoFlow(step);
else if (step.type === "repeat_audio_record") runRepeatAudioRecord(step);
else if (step.type === "image_instr_auto_record") runImageInstrAutoRecord(step);
else if (step.type === "image_auto_record_simple") runImageAutoRecordSimple(step);
else if (step.type === "verbal_fluency") runVerbalFluency(step);
else if (step.type === "line_bisection") runLineBisection(step);
else {
  topBar.textContent = `Tipo no soportado: ${step.type}`;
  btnNext.style.display = "none";
  btnFullscreen.style.display = "none";
  throw new Error("Tipo no soportado");
}
