import { CAT } from "./cat_script.js";
import { addResult, getPartProgress, setPartProgress } from "./storage.js";
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
const handFinishScreen = document.getElementById("handFinishScreen");
const selectHandContainer = document.getElementById("selectHand");
const handButton = document.getElementById("handButton");
const handInputs = Array.from(document.querySelectorAll('input[name="hand"]'));

const HAND_SELECTION_STEP_TYPES = new Set([
  "line_bisection",
  "semantic_match",
  "mcq_image",
  "mcq4_image_trials",
  "audio_mcq4_trials",
  "audio_mcq4_words_on_screen",
  "audio_mcq4_trials_with_dual_intro",
  "mcq4_sentence_center_with_audio_practice",
  "story_yesno_flow"
]);

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

function setupInstructionAudio(audioSrc, centered = false, position = "top-right") {
  const btnAudio = document.getElementById("btnAudio");

  if (!btnAudio) return;

  // reset estilos
  btnAudio.style.display = "none";
  btnAudio.style.bottom = "";
  btnAudio.style.top = "";
  btnAudio.style.right = "";
  btnAudio.style.left = "";
  btnAudio.style.transform = "";

  if (!audioSrc) return;

  btnAudio.style.display = "block";

  if (centered) {
    // CENTRADO
    btnAudio.style.position = "fixed";
    btnAudio.style.top = "50%";
    btnAudio.style.left = "50%";
    btnAudio.style.transform = "translate(-50%, -50%) scale(1.4)";
  } else if (position === "bottom-left") {
    btnAudio.style.position = "fixed";
    btnAudio.style.left = "14px";
    btnAudio.style.bottom = "95px";
    btnAudio.style.transform = "none";
  } else {
    // ESQUINA
    btnAudio.style.position = "fixed";
    btnAudio.style.top = "12px";
    btnAudio.style.right = "12px";
    btnAudio.style.transform = "none";
  }

  btnAudio.onclick = async () => {
    try {
      if (window.currentInstructionAudio) {
        window.currentInstructionAudio.pause();
        window.currentInstructionAudio.currentTime = 0;
      }

      const a = new Audio(audioSrc);
      window.currentInstructionAudio = a;
      await a.play();
    } catch (err) {
      console.error("Error audio:", err);
    }
  };
}
function setupAudio(buttonEl, audioEl, audioPath, options = {}) {
  const { forceShow = false } = options;

  function stopAllAudios() {
    document.querySelectorAll("audio").forEach(a => {
      try {
        a.pause();
        a.currentTime = 0;
      } catch (e) { }
    });
  }

  if (!audioPath) {
    if (buttonEl) buttonEl.style.display = forceShow ? "block" : "none";
    if (audioEl) {
      try {
        audioEl.pause();
        audioEl.currentTime = 0;
        audioEl.removeAttribute("src");
        audioEl.load();
      } catch (e) { }
    }
    return;
  }

  if (buttonEl) buttonEl.style.display = "block";

  if (audioEl) {
    audioEl.src = audioPath;
    audioEl.load();
  }

  if (buttonEl) {
    buttonEl.onclick = async () => {
      try {
        stopAllAudios(); // corta cualquier otro audio
        audioEl.currentTime = 0;
        await audioEl.play();
      } catch (err) {
        console.error("No se pudo reproducir el audio:", audioPath, err);
      }
    };
  }
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
let handScreenBound = false;

function requiresHandSelection(currentStep) {
  return HAND_SELECTION_STEP_TYPES.has(currentStep?.type);
}

function closeCurrentWindow() {
  try {
    window.open("", "_self");
    window.close();
  } catch (e) { }

  setTimeout(() => {
    try {
      window.close();
    } catch (e) { }

    if (!window.closed) {
      window.location.href = "about:blank";
    }
  }, 150);
}

function hideHandSelectionScreen() {
  if (handFinishScreen) handFinishScreen.style.display = "none";
  if (selectHandContainer) selectHandContainer.style.display = "none";
  if (handButton) handButton.style.display = "none";
}

function showHandSelectionScreen() {
  if (!handFinishScreen) {
    closeCurrentWindow();
    return;
  }

  stopAllAudios();
  showLayout(null);

  const centerWord = document.getElementById("centerWord");
  if (centerWord) centerWord.style.display = "none";

  if (btnAudio) btnAudio.style.display = "none";
  if (btnAudio2) btnAudio2.style.display = "none";
  if (btnAudioCenter) btnAudioCenter.style.display = "none";
  if (btnAudioCenter2) btnAudioCenter2.style.display = "none";

  topBar.style.display = "none";
  btnNext.style.display = "none";
  btnFullscreen.style.display = "none";
  handFinishScreen.style.display = "block";
  if (selectHandContainer) selectHandContainer.style.display = "block";
  if (handButton) handButton.style.display = "none";

  handInputs.forEach((inputEl) => {
    inputEl.checked = false;
  });

  if (handScreenBound) return;

  handInputs.forEach((inputEl) => {
    inputEl.addEventListener("change", () => {
      if (handButton) handButton.style.display = "block";
    });
  });

  if (handButton) {
    handButton.addEventListener("click", () => {
      const usedHand = document.querySelector('input[name="hand"]:checked')?.value || "";
      if (!usedHand) return;

      addResult(partId, {
        event: "hand_selection",
        step_type: step.type,
        used_hand: usedHand,
        completed_at: new Date().toISOString()
      });

      const data = getPartData(partId);
      setPartData(partId, { ...data, usedHand });
      setPartProgress(partId, { usedHand });

      hideHandSelectionScreen();
      closeCurrentWindow();
    });
  }

  handScreenBound = true;
}

function finishCurrentPart() {
  if (requiresHandSelection(step)) {
    showHandSelectionScreen();
    return;
  }

  closeCurrentWindow();
}

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
      topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · P 1/1`;
      return;
    }

    const testIndex = trialIndex - practiceCount;
    const totalTestTrials = Math.max(trials.length - practiceCount, 0);

    topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · E ${testIndex + 1}/${totalTestTrials}`;
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

    setupInstructionAudio(step.instructionAudio, false, trialIndex === 0 ? "bottom-left" : "top-right");

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
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, { status: "in_progress", trialIndex });
    renderTrial();
  };

  renderTrial();
}

//test 3 Revisar

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
      finishCurrentPart();
      return;
    }
    render();
  };

  render();
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
      topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · E ${ensayoN}/10`;
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
      finishCurrentPart();
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
    topBar.textContent = `${partLabel} · E ${ensayoN}/${trialCount}`;
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
      finishCurrentPart();
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
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, { status: "in_progress", trialIndex });
    renderTrial();
  };

  renderTrial();
}

// 7.- Comprensión oral de palabras aisladas

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

    const start = Number(step.trialAudioStart ?? 4);
    const ensayoIndex = t - 2;   // t=2 es el primer ensayo
    const audioNum = start + ensayoIndex;

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
    topBar.textContent = `${partLabel} · E ${ensayoN}/${totalTestTrials}`;
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
      const ensayoAudio = trialAudioFor(t);

      instructionAudio.pause();
      instructionAudio.currentTime = 0;
      instructionAudio.src = ensayoAudio;
      instructionAudio.load();

      setupAudio(btnAudio, instructionAudio, ensayoAudio, { forceShow: true });
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
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}

// 8.-Comprensión escrita de palabras aisladas

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
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}

// 9.- Comprensión oral de oraciones

function runAudioMCQ4TrialsWithDualIntro(step) {
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

  const basePath = step.basePath || "assets/parte9";
  const filePattern = step.filePattern || "{t}-{o}.png";
  const firstTrial = Number(step.firstTrial ?? 1);
  const lastTrial = Number(step.lastTrial ?? 17);
  const requireSel = step.requireSelectionToAdvance !== false;

  // 0 = instrucción
  // 1 = ejemplo
  // 2..17 = ensayos
  const totalScreens = 1 + (lastTrial - firstTrial + 1);

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

  let selectedIndex = null;

  function fileFor(t, o) {
    const f = filePattern.replace("{t}", String(t)).replace("{o}", String(o));
    return `${basePath}/${f}`;
  }

  function stopAllAudios() {
    const audios = [instructionAudio];

    audios.forEach(audio => {
      if (!audio) return;
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.removeAttribute("src");
        audio.load();
      } catch (e) {
        console.warn("No se pudo detener/resetear audio:", e);
      }
    });
  }

  function playExclusive(audioEl, src) {
    if (!audioEl || !src) return;

    try {
      stopAllAudios();
      audioEl.src = src;
      audioEl.load();

      const playPromise = audioEl.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(err => {
          console.warn(`No se pudo reproducir el audio: ${src}`, err);
        });
      }
    } catch (err) {
      console.warn(`Error reproduciendo audio: ${src}`, err);
    }
  }

  function setupExclusiveAudio(buttonEl, audioEl, src, opts = {}) {
    if (!buttonEl) return;

    const forceShow = opts.forceShow === true;

    if (!src) {
      buttonEl.style.display = "none";
      buttonEl.onclick = null;
      return;
    }

    buttonEl.style.display = forceShow ? "block" : "";
    buttonEl.onclick = () => playExclusive(audioEl, src);
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

    const ensayoN = screenIndex - 1;
    topBar.textContent = `${partLabel} · E ${ensayoN}/16`;
  }

  function render() {
    stopAllAudios();

    updateTopBar();
    setPartProgress(partId, { screenIndex });

    document.body.classList.remove("twoCenterAudios");

    if (btnAudioCenter) {
      btnAudioCenter.style.display = "none";
      btnAudioCenter.onclick = null;
    }

    if (btnAudioCenter2) {
      btnAudioCenter2.style.display = "none";
      btnAudioCenter2.onclick = null;
    }

    if (btnAudio) {
      btnAudio.style.display = "none";
      btnAudio.onclick = null;
    }

    if (btnAudio2) {
      btnAudio2.style.display = "none";
      btnAudio2.onclick = null;
    }

    if (screenIndex === 0) {
      clearSelection();
      optBoxes.forEach(b => (b.style.display = "none"));
      centerWord.style.display = "none";

      document.body.classList.add("twoCenterAudios");

      setupExclusiveAudio(btnAudioCenter, instructionAudio, step.introAudio1, { forceShow: true });
      setupExclusiveAudio(btnAudioCenter2, instructionAudio, step.introAudio2, { forceShow: true });

      btnNext.style.display = "block";
      return;
    }

    optBoxes.forEach(b => (b.style.display = "block"));
    clearSelection();

    const t = screenIndex; // imágenes 1..17
    for (let o = 1; o <= 4; o++) {
      optImgs[o - 1].src = fileFor(t, o);
    }

    // screenIndex 1 = ejemplo => practiceAudio1 (audio3.wav)
    if (screenIndex === 1) {
      setupExclusiveAudio(btnAudio, instructionAudio, step.practiceAudio1, { forceShow: true });
      return;
    }

    // screenIndex 2..17 = ensayos
    // ensayo 1 debe usar audio4.wav, ensayo 2 => audio5.wav, etc.
    const ensayoAudioNumber = screenIndex + 2;
    const ensayoAudioSrc = step.trialAudioPattern
      ? step.trialAudioPattern.replace("{t}", String(ensayoAudioNumber))
      : null;

    setupExclusiveAudio(btnAudio, instructionAudio, ensayoAudioSrc, { forceShow: true });
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

    stopAllAudios();

    if (screenIndex !== 0) {
      const data = getPartData(partId);
      const responses = data.responses || {};
      responses[String(screenIndex)] = { selected: selectedIndex };
      setPartData(partId, { responses });
    }

    screenIndex++;

    if (screenIndex >= totalScreens) {
      stopAllAudios();
      setPartProgress(partId, { status: "done", screenIndex: totalScreens - 1 });
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    render();
  };

  render();
}

// 10.- Comprensión escrita de oraciones

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
  // 1..17 = trials
  const totalScreens = 1 + (lastTrial - firstTrial + 1);

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
    else topBar.textContent = `${partLabel} · E ${screenIndex - 1}/16`;
  }

  // =========================
  // CONTROL CENTRAL DE AUDIOS
  // =========================
  const audioButtons = [btnAudioCenter, btnAudio, btnAudio2].filter(Boolean);
  const audioElements = [instructionAudio, instructionAudio2].filter(Boolean);

  function pauseAllAudios() {
    audioElements.forEach(audio => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (e) {
        console.warn("No se pudo pausar audio:", e);
      }
    });
  }

  function hideAllAudioButtons() {
    audioButtons.forEach(btn => {
      btn.style.display = "none";
      btn.onclick = null;
    });
  }

  function setupManagedAudio(button, audioEl, audioPath, options = {}) {
    if (!button || !audioEl || !audioPath) {
      if (button) {
        button.style.display = "none";
        button.onclick = null;
      }
      return;
    }

    button.style.display = options.forceShow ? "block" : "block";
    audioEl.src = audioPath;
    audioEl.load();

    button.onclick = async () => {
      try {
        // pausa todos los audios antes de reproducir el nuevo
        audioElements.forEach(a => {
          if (a !== audioEl) {
            a.pause();
            a.currentTime = 0;
          }
        });

        // si el mismo audio ya estaba sonando, reinicia desde 0
        audioEl.pause();
        audioEl.currentTime = 0;

        await audioEl.play();
      } catch (err) {
        console.error("No se pudo reproducir el audio:", audioPath, err);
      }
    };

    audioEl.onended = () => {
      try {
        audioEl.currentTime = 0;
      } catch (e) { }
    };
  }

  function render() {
    updateTopBar();
    setPartProgress(partId, { screenIndex });

    // al cambiar de screen, detener todo audio
    pauseAllAudios();
    hideAllAudioButtons();

    if (screenIndex === 0) {
      // Instrucción
      optBoxes.forEach(b => (b.style.display = "none"));
      centerWord.style.display = "none";
      clearSelection();

      setupManagedAudio(
        btnAudioCenter,
        instructionAudio,
        step.instructionAudio,
        { forceShow: true }
      );

      btnNext.style.display = "block";
      return;
    }

    // Trials
    optBoxes.forEach(b => (b.style.display = "block"));
    clearSelection();

    const t = screenIndex;
    centerWord.style.display = "block";
    centerWord.textContent = sentences[t - 1] || "";

    for (let o = 1; o <= 4; o++) {
      optImgs[o - 1].src = fileFor(t, o);
    }

    // t=1: ejemplo con 2 audios
    if (t === 1) {
      setupManagedAudio(
        btnAudio,
        instructionAudio,
        step.practiceAudio1,
        { forceShow: true }
      );

      setupManagedAudio(
        btnAudio2,
        instructionAudio2,
        step.practiceAudio2,
        { forceShow: true }
      );
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

    // guardar respuesta
    if (screenIndex !== 0) {
      const data = getPartData(partId);
      const responses = data.responses || {};
      responses[String(screenIndex)] = {
        sentence: sentences[screenIndex - 1] || "",
        selected: selectedIndex
      };
      setPartData(partId, { responses });
    }

    // antes de pasar de pantalla, detener audios
    pauseAllAudios();

    screenIndex++;

    if (screenIndex >= totalScreens) {
      pauseAllAudios();
      hideAllAudioButtons();

      setPartProgress(partId, {
        status: "done",
        screenIndex: totalScreens - 1
      });

      clearPartProgress(partId);
      clearPartData(partId);
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, {
      status: "in_progress",
      screenIndex
    });

    render();
  };

  render();
}

// 11.- Comprensión oral de párrafos

function runStoryYesNoFlow(step) {
  // ---------- helpers de audio ----------
  function stopAudioEl(audioEl) {
    if (!audioEl) return;
    try {
      audioEl.pause();
      audioEl.currentTime = 0;
    } catch (e) { }
  }

  function stopAllAudios() {
    // audio superior derecho
    stopAudioEl(instructionAudio);

    // cualquier audio del layout central
    document.querySelectorAll("audio").forEach(a => {
      try {
        a.pause();
        a.currentTime = 0;
      } catch (e) { }
    });
  }

  function finishTestAndClose() {
    stopAllAudios();

    setPartProgress(partId, {
      status: "done",
      screenIndex: screens.length - 1
    });

    clearPartProgress(partId);
    clearPartData(partId);
    finishCurrentPart();
  }

  // ---------- fullscreen ----------
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  // flecha siempre visible
  btnNext.style.display = "block";

  // ---------- secuencia corregida ----------
  const screens = [
    // 1) tres audios centrados de instrucción
    { type: "center_audios", centerAudios: step.screen1_centerAudios || [] },

    // 2) historia 1 centrada
    { type: "center_audio_one", centerAudios: [step.story1_audio] },

    // 3-6) preguntas sí/no
    { type: "yesno", audio: step.yesno_block1_audios?.[0] },
    { type: "yesno", audio: step.yesno_block1_audios?.[1] },
    { type: "yesno", audio: step.yesno_block1_audios?.[2] },
    { type: "yesno", audio: step.yesno_block1_audios?.[3] },

    // 7) historia 2 corregida:
    // primero los 2 audios de instrucción y DESPUÉS el audio de la historia
    {
      type: "center_audios",
      centerAudios: [
        ...(step.screen7_centerAudios || []),
        step.story2_audio
      ].filter(Boolean)
    },

    // 8-11) preguntas sí/no
    { type: "yesno", audio: step.yesno_block2_audios?.[0] },
    { type: "yesno", audio: step.yesno_block2_audios?.[1] },
    { type: "yesno", audio: step.yesno_block2_audios?.[2] },
    { type: "yesno", audio: step.yesno_block2_audios?.[3] },
  ];

  // ---------- progreso ----------
  const saved = getPartProgress(partId);
  let screenIndex = 0;

  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), screens.length - 1);
  }

  setPartProgress(partId, {
    status: "in_progress",
    stepIndex: 0,
    totalSteps: 1,
    screenIndex,
    totalScreens: screens.length
  });

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
    // cortar cualquier audio al cambiar de pantalla
    stopAllAudios();

    updateTopBar();
    setPartProgress(partId, { screenIndex });

    // ocultar audio superior derecho por defecto
    setupInstructionAudio(null);

    const s = screens[screenIndex];

    if (s.type === "center_audios" || s.type === "center_audio_one") {
      showLayout("center_audios");
      clearYesNo();

      // aquí se muestran los audios centrados
      setupCenterAudios((s.centerAudios || []).filter(Boolean));
      return;
    }

    if (s.type === "yesno") {
      showLayout("yesno");
      clearYesNo();

      // audio arriba derecha
      setupAudio(btnAudio, instructionAudio, s.audio, { forceShow: true });

      if (btnAudio2) btnAudio2.style.display = "none";
      return;
    }
  }

  // ---------- respuestas sí/no ----------
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

  // ---------- siguiente ----------
  btnNext.onclick = () => {
    const s = screens[screenIndex];

    if (s.type === "yesno" && requireSel && !selected) return;

    // guardar respuesta
    if (s.type === "yesno") {
      const data = getPartData(partId);
      const responses = data.responses || {};
      responses[String(screenIndex + 1)] = { answer: selected };
      setPartData(partId, { responses });
    }

    // cortar audio antes de pasar
    stopAllAudios();

    screenIndex++;

    if (screenIndex >= screens.length) {
      finishTestAndClose();
      return;
    }

    setPartProgress(partId, {
      status: "in_progress",
      screenIndex
    });

    render();
  };

  render();
}

// 12.- Repetición de palabras

function runRepeatAudioRecord(step) {
  const hasIntro = Array.isArray(step.introAudios) && step.introAudios.length > 0;
  const noExample = step.noExample === true;

  const trialAudios = Array.isArray(step.trialAudios) ? step.trialAudios : [];
  const totalTrials = Number(step.totalTrials ?? trialAudios.length ?? 0);

  const totalScreens = (hasIntro ? 1 : 0) + (noExample ? 0 : 1) + totalTrials;

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
  btnNext.style.display = "block";

  // Layout refs
  const btnPlay = document.getElementById("btnRepeatPlay");
  const recRow = document.getElementById("repeatRecRow");
  const recIcon = document.getElementById("repeatRecording");
  const stopBtn = document.getElementById("repeatStop");
  const promptAudio = document.getElementById("repeatPromptAudio");

  const introA1 = step.introAudios?.[0] ?? null;
  const introA2 = step.introAudios?.[1] ?? null;

  const recorder = new WavRecorder();
  let prepared = false;
  let isCapturing = false;
  let isClosing = false;
  let hasRecordedCurrentScreen = false;

  function stopAllAudios() {
    try {
      if (typeof instructionAudio !== "undefined" && instructionAudio) {
        instructionAudio.pause();
        instructionAudio.currentTime = 0;
      }
    } catch (_) { }

    try {
      if (typeof instructionAudioCenter2 !== "undefined" && instructionAudioCenter2) {
        instructionAudioCenter2.pause();
        instructionAudioCenter2.currentTime = 0;
      }
    } catch (_) { }

    try {
      if (promptAudio) {
        promptAudio.pause();
        promptAudio.currentTime = 0;
      }
    } catch (_) { }
  }

  function clearPromptAudio() {
    if (!promptAudio) return;
    promptAudio.pause();
    promptAudio.currentTime = 0;
    // NO borrar onended ni onerror aquí
    promptAudio.removeAttribute("src");
    promptAudio.load();
  }

  function audioForCurrentScreen() {
    const introOffset = hasIntro ? 1 : 0;

    if (!noExample) {
      const exampleScreen = introOffset;
      if (screenIndex === exampleScreen) return step.exampleAudio || null;
    }

    const trialsStart = introOffset + (noExample ? 0 : 1);
    if (screenIndex >= trialsStart) {
      const n = screenIndex - trialsStart; // 0..totalTrials-1

      if (trialAudios.length > 0) {
        return trialAudios[n] ?? null;
      }

      if (typeof step.trialAudioPattern === "string") {
        const trialAudioStart = Number(step.trialAudioStart ?? 1);
        const audioNumber = trialAudioStart + n;
        return step.trialAudioPattern.replace("{n}", String(audioNumber));
      }
    }

    return null;
  }

  function keyForCurrentScreen() {
    const s = screenIndex + 1;
    return `part${String(partId).padStart(2, "0")}_s${String(s).padStart(2, "0")}.wav`;
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (hasIntro && screenIndex === 0) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    const introOffset = hasIntro ? 1 : 0;

    if (!noExample && screenIndex === introOffset) {
      topBar.textContent = `${partLabel} · Prueba`;
      return;
    }

    const trialsStart = introOffset + (noExample ? 0 : 1);
    const ensayoN = (screenIndex - trialsStart) + 1;
    topBar.textContent = `${partLabel} · E ${ensayoN}/${totalTrials}`;
  }

  function showRecUI() {
    btnPlay.style.display = "none";
    recRow.style.display = "flex";

    if (recIcon) recIcon.style.display = "block";
    if (stopBtn) stopBtn.style.display = "block";
  }

  function hideRecUI() {
    recRow.style.display = "none";
    btnPlay.style.display = "block";

    if (recIcon) recIcon.style.display = "block";
    if (stopBtn) stopBtn.style.display = "block";
  }

  async function ensurePrepared() {
    if (prepared) return;
    await recorder.prepare({ numChannels: 1 });
    prepared = true;
  }

  async function startCapture() {
    console.log("startCapture() => inicia grabación");

    if (isCapturing) return;

    await ensurePrepared();
    recorder.beginCapture();
    isCapturing = true;
    hasRecordedCurrentScreen = false;

    showRecUI();

    console.log("recRow display:", recRow.style.display);
  }

  async function stopAndSave() {
    if (!isCapturing) return false;

    const blob = await recorder.stop();
    isCapturing = false;
    hideRecUI();

    if (blob) {
      const key = keyForCurrentScreen();
      await saveAudioBlob(key, blob);

      const data = getPartData(partId);
      const takes = data.takes || {};
      takes[String(screenIndex)] = { key };
      setPartData(partId, { takes });

      hasRecordedCurrentScreen = true;
      console.log("Grabación guardada:", key);
      return true;
    }

    return false;
  }

  const obs = new MutationObserver(() => {
    console.log("repeatRecRow cambió:", recRow.style.display, recRow.getAttribute("style"));
  });

  obs.observe(recRow, {
    attributes: true,
    attributeFilter: ["style", "class"]
  });

  async function finishAndClose() {
    if (isClosing) return;
    isClosing = true;

    stopAllAudios();
    clearPromptAudio();

    if (isCapturing) {
      await stopAndSave();
    }

    try {
      await recorder.close();
    } catch (_) { }

    setPartProgress(partId, {
      status: "done",
      screenIndex: Math.max(0, totalScreens - 1)
    });
    finishCurrentPart();
  }

  async function render() {
    showLayout("repeat_audio");
    updateTopBar();
    setPartProgress(partId, { screenIndex });

    stopAllAudios();
    clearPromptAudio();

    setupInstructionAudio(null);
    if (btnAudio2) btnAudio2.style.display = "none";
    if (btnAudioCenter) btnAudioCenter.style.display = "none";
    if (btnAudioCenter2) btnAudioCenter2.style.display = "none";
    document.body.classList.remove("twoCenterAudios");
    document.body.classList.remove("stackCenterAudios");

    isCapturing = false;
    hideRecUI();
    hasRecordedCurrentScreen = false;

    if (hasIntro && screenIndex === 0) {
      btnPlay.style.display = "none";
      recRow.style.display = "none";

      if (Array.isArray(step.introAudios) && step.introAudios.length === 2) {
        document.body.classList.add("stackCenterAudios");
      }

      setupAudio(btnAudioCenter, instructionAudio, introA1, { forceShow: true });
      setupAudio(btnAudioCenter2, instructionAudioCenter2, introA2, { forceShow: true });
      return;
    }

    hideRecUI();

    const a = audioForCurrentScreen();

    console.log("screenIndex:", screenIndex);
    console.log("audio actual:", a);

    if (a) {
      promptAudio.src = a;
      promptAudio.load();
    }

    btnPlay.onclick = async () => {
      if (!a) {
        console.warn("No hay audio configurado para esta pantalla");
        return;
      }

      try {
        if (isCapturing) {
          await stopAndSave();
        }

        stopAllAudios();
        clearPromptAudio();

        promptAudio.src = a;
        promptAudio.load();

        promptAudio.onended = async () => {
          console.log("audio terminado -> startCapture()");
          await startCapture();
        };

        promptAudio.onerror = () => {
          console.error("Error cargando audio:", a, promptAudio.error);
        };

        promptAudio.currentTime = 0;
        await promptAudio.play();
        console.log("audio reproduciéndose...");
      } catch (err) {
        console.error("No se pudo reproducir el audio:", a, err);
      }
    };

    stopBtn.onclick = async () => {
      await stopAndSave();
    };
  }

  btnNext.onclick = async () => {
    stopAllAudios();
    clearPromptAudio();

    // si está grabando, detener, guardar y avanzar inmediatamente
    if (isCapturing) {
      await stopAndSave();
      screenIndex++;
    } else {
      screenIndex++;
    }

    if (screenIndex >= totalScreens) {
      await finishAndClose();
      return;
    }

    setPartProgress(partId, {
      status: "in_progress",
      screenIndex
    });

    await render();
  };

  window.addEventListener("beforeunload", stopAllAudios);

  render();
}

// 13.-

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

  const trialAudioBase = step.trialAudioBase || "";
  const trialAudioStart = Number(step.trialAudioStart ?? 5);
  const specialTrialPF2 = Number(step.specialTrialPF2 ?? 12);

  // progreso reanudar
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

  // fullscreen + flecha
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";
  btnNext.style.display = "block";

  // WAV recorder
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

  function ensayoAudio(num) {
    return `${trialAudioBase}/audio${num}.wav`;
  }

  function pauseAllInstructionAudios() {
    [audioI, audioP, audioPS, audioPF].forEach(a => {
      try {
        a.pause();
        a.currentTime = 0;
      } catch (_) { }
    });
  }

  function setBoxVisibility(box, show) {
    box.style.display = show ? "flex" : "none";
  }

  function setBoxLabel(box, text) {
    const labelEl =
      box.querySelector(".label") ||
      box.querySelector("span") ||
      box.querySelector("p") ||
      box.firstElementChild;

    if (labelEl && labelEl.tagName !== "IMG") {
      labelEl.textContent = text;
    }
  }

  function playOnly(audioEl) {
    if (!audioEl || !audioEl.src) return;
    pauseAllInstructionAudios();
    audioEl.currentTime = 0;
    audioEl.play().catch(err => {
      console.warn("No se pudo reproducir el audio:", audioEl.src, err);
    });
  }

  function bindBox(box, icon, audioEl, show, label, src) {
    setBoxVisibility(box, show);
    setBoxLabel(box, label || "");

    audioEl.pause();
    audioEl.currentTime = 0;
    audioEl.src = src || "";

    icon.onclick = null;
    if (show && src) {
      icon.onclick = () => playOnly(audioEl);
      box.onclick = (e) => {
        if (e.target !== icon) playOnly(audioEl);
      };
    } else {
      box.onclick = null;
    }
  }

  function getAudioSetForScreen(currentN) {
    // currentN = 1 => ejemplo
    if (currentN === 1) {
      return {
        I: step.instrI || "",
        P: step.instrP || "",
        PS: step.instrPS || "",
        PF: step.instrPF || "",
        labels: {
          I: "I",
          P: "P",
          PS: "PS",
          PF: "PF"
        },
        show: {
          I: true,
          P: true,
          PS: true,
          PF: true
        }
      };
    }

    // Ensayos: currentN 2..25 => ensayo 1..24
    const trialIndex = currentN - 1;

    // Calculamos el audio inicial de ese ensayo
    // Ensayos 1..11 = 3 audios c/u => 33 audios
    // Ensayo 12 = 4 audios => 4 audios
    // Ensayos 13..24 = 3 audios c/u

    let startAudioNumber;

    if (trialIndex <= 11) {
      startAudioNumber = trialAudioStart + ((trialIndex - 1) * 3);
    } else if (trialIndex === 12) {
      startAudioNumber = trialAudioStart + (11 * 3); // 5 + 33 = 38
    } else {
      // después del 12 ya consumimos 33 + 4 = 37 audios
      startAudioNumber = trialAudioStart + 37 + ((trialIndex - 13) * 3);
    }

    if (trialIndex === specialTrialPF2) {
      // reutilizamos la caja I para mostrar PF2
      return {
        I: ensayoAudio(startAudioNumber + 3),   // PF2
        P: ensayoAudio(startAudioNumber + 0),   // P
        PS: ensayoAudio(startAudioNumber + 1),  // PS
        PF: ensayoAudio(startAudioNumber + 2),  // PF
        labels: {
          I: "PF2",
          P: "P",
          PS: "PS",
          PF: "PF"
        },
        show: {
          I: true,
          P: true,
          PS: true,
          PF: true
        }
      };
    }

    return {
      I: "",
      P: ensayoAudio(startAudioNumber + 0),
      PS: ensayoAudio(startAudioNumber + 1),
      PF: ensayoAudio(startAudioNumber + 2),
      labels: {
        I: "",
        P: "P",
        PS: "PS",
        PF: "PF"
      },
      show: {
        I: false,
        P: true,
        PS: true,
        PF: true
      }
    };
  }

  function mountInstr(currentN) {
    const cfg = getAudioSetForScreen(currentN);

    bindBox(boxI, iconI, audioI, cfg.show.I, cfg.labels.I, cfg.I);
    bindBox(boxP, iconP, audioP, cfg.show.P, cfg.labels.P, cfg.P);
    bindBox(boxPS, iconPS, audioPS, cfg.show.PS, cfg.labels.PS, cfg.PS);
    bindBox(boxPF, iconPF, audioPF, cfg.show.PF, cfg.labels.PF, cfg.PF);
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;
    if (n === 1) {
      topBar.textContent = `${partLabel} · Ejemplo 1/1`;
    } else {
      topBar.textContent = `${partLabel} · E ${n - 1}/${last - 1}`;
    }
  }

  async function startCapture() {
    await ensurePrepared();
    recorder.beginCapture();
    isCapturing = true;
    if (recIcon) recIcon.style.display = "block";
  }

  async function stopAndSave() {
    if (!isCapturing) return;
    isCapturing = false;

    if (recIcon) recIcon.style.display = "none";

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

  function reorderInstructionBoxes(currentN) {
    const container = boxP.parentElement;
    if (!container) return;

    if (currentN === 13) {
      // Orden deseado: P, PS, PF, PF2
      container.appendChild(boxP);
      container.appendChild(boxPS);
      container.appendChild(boxPF);
      container.appendChild(boxI); // boxI se usa como PF2
    } else if (currentN === 1) {
      // Ejemplo: I, P, PS, PF
      container.appendChild(boxI);
      container.appendChild(boxP);
      container.appendChild(boxPS);
      container.appendChild(boxPF);
    } else {
      // Ensayos normales: P, PS, PF
      container.appendChild(boxP);
      container.appendChild(boxPS);
      container.appendChild(boxPF);
      container.appendChild(boxI); // queda oculto igual
    }
  }

  async function render() {
    pauseAllInstructionAudios();

    updateTopBar();
    imgEl.src = imageFile(n);

    mountInstr(n);
    reorderInstructionBoxes(n);

    setPartProgress(partId, { itemIndex: n });

    if (step.autoStartRecording) {
      await startCapture();
    }
  }

  stopBtn.onclick = async () => {
    await stopAndSave();
  };

  btnNext.onclick = async () => {
    pauseAllInstructionAudios();

    if (isCapturing) {
      await stopAndSave();
    }

    n++;

    if (n > last) {
      pauseAllInstructionAudios();

      setPartProgress(partId, {
        status: "done",
        itemIndex: last
      });

      await recorder.close();

      clearPartProgress(partId);
      clearPartData(partId);
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, {
      status: "in_progress",
      itemIndex: n
    });

    await render();
  };

  ensurePrepared()
    .then(render)
    .catch(err => {
      console.error(err);
      alert("No se pudo acceder al micrófono.");
    });
}

// 14.-
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

  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";
  btnNext.style.display = "block";

  const recorder = new WavRecorder();
  let prepared = false;
  let isCapturing = false;
  let isTransitioning = false;

  function imageFile(num) {
    return `${basePath}/${pattern.replace("{n}", String(num))}`;
  }

  function wavKey(num) {
    return `part${String(partId).padStart(2, "0")}_item${String(num).padStart(3, "0")}.wav`;
  }

  function updateTopBar() {
    const label = `Parte ${String(partId).padStart(2, "0")}`;
    if (n === first) {
      topBar.textContent = `${label} · Ejemplo 1/1`;
    } else {
      topBar.textContent = `${label} · E ${n - first}/${last - first}`;
    }
  }

  async function ensurePrepared() {
    if (prepared) return;
    await recorder.prepare({ numChannels: 1 });
    prepared = true;
  }

  function preloadImage(src) {
    const img = new Image();
    img.src = src;
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      imgEl.onload = () => resolve();
      imgEl.onerror = () => reject(new Error(`No se pudo cargar la imagen: ${src}`));
      imgEl.src = src;
    });
  }

  async function startCapture() {
    if (isCapturing) return;
    await ensurePrepared();
    recorder.beginCapture();
    isCapturing = true;
  }

  async function stopAndSave() {
    if (!isCapturing) return;

    isCapturing = false;
    const currentN = n;

    const blob = await recorder.stop();
    if (blob) {
      const key = wavKey(currentN);
      await saveAudioBlob(key, blob);

      const data = getPartData(partId);
      const takes = data.takes || {};
      takes[String(currentN)] = { key, image: imageFile(currentN) };
      setPartData(partId, { takes });
    }
  }

  function stopInstructionAudio() {
    audioEl.pause();
    audioEl.currentTime = 0;
  }

  async function render() {
    updateTopBar();

    stopInstructionAudio();

    if (n === first && step.instructionAudio) {
      audioEl.src = step.instructionAudio;
      audioIcon.style.display = "block";
      audioIcon.onclick = () => {
        audioEl.pause();
        audioEl.currentTime = 0;
        audioEl.play();
      };
    } else {
      audioIcon.style.display = "none";
      audioEl.removeAttribute("src");
      audioEl.load();
    }

    await loadImage(imageFile(n));

    if (n < last) {
      preloadImage(imageFile(n + 1));
    }

    setPartProgress(partId, { itemIndex: n });

    if (step.autoStartRecording) {
      await startCapture();
    }
  }

  stopBtn.onclick = async () => {
    await stopAndSave();
  };

  btnNext.onclick = async () => {
    if (isTransitioning) return;
    isTransitioning = true;

    try {
      stopInstructionAudio();
      await stopAndSave();

      n++;
      if (n > last) {
        setPartProgress(partId, { status: "done", itemIndex: last });
        await recorder.close();
        finishCurrentPart();
        return;
      }

      await render();
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al pasar a la siguiente imagen.");
    } finally {
      isTransitioning = false;
    }
  };

  render().catch(err => {
    console.error(err);
    alert("No se pudo iniciar el test.");
  });
}

// 19.-Descripción oral de una imagen

async function runAudioRecordImage(step) {
  showLayout("audio_record");

  // UI refs
  const arImageWrap = document.getElementById("arImageWrap");
  const arImage = document.getElementById("arImage");
  const btnRec = document.getElementById("btnRec");
  const btnStop = document.getElementById("btnStop");
  const btnRecording = document.getElementById("btnRecording");

  // top bar
  topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · ${part.name}`;

  // IMPORTANTE: mostrar contenedor de imagen
  if (arImageWrap) {
    arImageWrap.style.display = "flex"; // o "block" según tu diseño
  }

  if (arImage) {
    arImage.style.display = "block";
  }

  // fullscreen
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  // audio instrucciones
  setupInstructionAudio(step.instructionAudio);

  // flecha
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

  function stopAllTestAudios() {
    try {
      if (typeof stopAllAudio === "function") stopAllAudio();

      if (typeof instructionAudio !== "undefined" && instructionAudio) {
        instructionAudio.pause();
        instructionAudio.currentTime = 0;
      }
    } catch (e) {
      console.warn("No se pudieron detener los audios:", e);
    }
  }

  async function testMicrophoneAccess() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("getUserMedia no está disponible en este navegador o contexto.");
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    return true;
  }

  // Imagen
  arImage.onload = () => {
    console.log("Imagen cargada correctamente:", step.image);
  };

  arImage.onerror = () => {
    console.error("Error cargando imagen:", step.image);
    alert(`No se pudo cargar la imagen: ${step.image}`);
  };

  arImage.src = step.image;

  async function startRec() {
    try {
      stopAllTestAudios();

      console.log("Intentando iniciar grabación...");
      console.log("Ruta imagen:", step.image);
      console.log("Audio key:", step.audioKey);

      // validar acceso real al micrófono primero
      await testMicrophoneAccess();

      // luego iniciar recorder
      await recorder.prepare({ numChannels: 1 });
      recorder.beginCapture();

      isRecording = true;
      setRecordingUI();
      console.log("Grabación iniciada correctamente");

    } catch (err) {
      console.error("Error al acceder al micrófono:", err);

      let msg = "No se pudo acceder al micrófono.";

      if (err?.name === "NotAllowedError") {
        msg = "El navegador bloqueó el permiso del micrófono. Debes permitirlo.";
      } else if (err?.name === "NotFoundError") {
        msg = "No se encontró ningún micrófono conectado.";
      } else if (err?.name === "NotReadableError") {
        msg = "El micrófono está siendo usado por otra aplicación o no se puede leer.";
      } else if (err?.name === "SecurityError") {
        msg = "El navegador bloqueó el micrófono por seguridad.";
      } else if (err?.message) {
        msg = `No se pudo acceder al micrófono: ${err.message}`;
      }

      alert(msg);
      setIdleUI();
    }
  }

  async function stopRecAndSave() {
    if (!isRecording) return;

    try {
      isRecording = false;

      const blob = await recorder.stop();

      if (blob) {
        hasAudio = true;
        const key = step.audioKey || `part${partId}_take1`;
        await saveAudioBlob(key, blob);
        console.log("Audio guardado correctamente con key:", key);
      } else {
        console.warn("No se obtuvo blob de audio");
      }

      setIdleUI();
    } catch (err) {
      console.error("Error al detener o guardar audio:", err);
      setIdleUI();
    }
  }

  btnRec.onclick = async () => {
    await startRec();
  };

  btnStop.onclick = async () => {
    await stopRecAndSave();
  };

  btnNext.onclick = async () => {
    stopAllTestAudios();

    if (isRecording) {
      await stopRecAndSave();
      return;
    }

    if (!hasAudio) {
      const ok = confirm("Aún no hay grabación. ¿Desea continuar igual?");
      if (!ok) return;
    }

    setPartProgress(partId, { status: "done" });
    clearPartProgress(partId);
    clearPartData(partId);
    finishCurrentPart();

  };

  setIdleUI();
  setPartProgress(partId, {
    status: "in_progress",
    stepIndex: 0,
    totalSteps: 1
  });
}

// 20 al 23 Lectura de palabras aisladas

async function runAudioRecordWords(step) {
  showLayout("audio_record");

  const arWordWrap = document.getElementById("arWordWrap");
  const arWord = document.getElementById("arWord");
  const arImageWrap = document.getElementById("arImageWrap");

  const btnRec = document.getElementById("btnRec");
  const btnStop = document.getElementById("btnStop");
  const btnRecording = document.getElementById("btnRecording");

  arImageWrap.style.display = "none";
  arWordWrap.style.display = "flex";

  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  btnNext.style.display = "block";

  const allWords = step.words || [];
  if (!allWords.length) throw new Error("Sin palabras configuradas");

  // NUEVO:
  // Si no se indica, asumimos que sí hay ejemplo (para mantener compatibilidad con test 20)
  const hasExample = step.hasExample !== false;

  const exampleWord = hasExample ? allWords[0] : null;
  const realWords = hasExample ? allWords.slice(1) : allWords.slice();
  const totalRealWords = realWords.length;
  const totalScreens = hasExample ? (1 + totalRealWords) : totalRealWords;

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

  const partData = getPartData(partId);
  const takes = partData.takes || {};

  const recorder = new WavRecorder();
  let isRecording = false;

  function keyForScreen(i) {
    return `part${String(partId).padStart(2, "0")}_w${String(i + 1).padStart(3, "0")}`;
  }

  function isExampleScreen() {
    return hasExample && screenIndex === 0;
  }

  function getCurrentWord() {
    if (isExampleScreen()) return exampleWord;
    return hasExample ? realWords[screenIndex - 1] : realWords[screenIndex];
  }

  function stopInstructionAudioOnly() {
    try {
      if (typeof stopAllAudios === "function") stopAllAudios();

      if (typeof instructionAudio !== "undefined" && instructionAudio) {
        instructionAudio.pause();
        instructionAudio.currentTime = 0;
        instructionAudio.src = "";
        if (typeof instructionAudio.load === "function") instructionAudio.load();
      }

      if (typeof btnAudio !== "undefined" && btnAudio) {
        btnAudio.style.display = "none";
        btnAudio.onclick = null;
      }
    } catch (e) {
      console.warn("No se pudo detener el audio de instrucción:", e);
    }
  }

  function setupAudioForCurrentScreen() {
    stopInstructionAudioOnly();

    if (isExampleScreen() && step.instructionAudio) {
      setupInstructionAudio(step.instructionAudio);
    } else {
      if (typeof btnAudio !== "undefined" && btnAudio) {
        btnAudio.style.display = "none";
        btnAudio.onclick = null;
      }
      if (typeof instructionAudio !== "undefined" && instructionAudio) {
        instructionAudio.pause();
        instructionAudio.currentTime = 0;
        instructionAudio.src = "";
      }
    }
  }

  function setIdleUI() {
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
    btnStop.style.display = "none";
    btnRecording.style.display = "none";
  }

  async function ensurePrepared() {
    if (!recorder.prepared) {
      await recorder.prepare({ numChannels: 1 });
    }
  }

  async function startRecAuto() {
    try {
      await ensurePrepared();
      recorder.beginCapture();
      isRecording = true;
      setRecordingUI();
    } catch (err) {
      console.error("Error preparando micrófono:", err);
      alert("No se pudo acceder al micrófono.");
      setIdleUI();
    }
  }

  async function stopRecAndSaveCurrent() {
    if (!isRecording) return;

    try {
      isRecording = false;
      const blob = await recorder.stop();

      if (blob) {
        const currentWord = getCurrentWord();
        const key = keyForScreen(screenIndex);

        await saveAudioBlob(key, blob);

        takes[String(screenIndex)] = {
          word: currentWord,
          key,
          isExample: isExampleScreen()
        };

        setPartData(partId, { takes });
      }

      setStoppedUI();
    } catch (err) {
      console.error("Error al detener/grabar audio:", err);
      setStoppedUI();
    }
  }

  function updateTopBar() {
    if (isExampleScreen()) {
      topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · Prueba - 1/1`;
    } else {
      const currentRealIndex = hasExample ? screenIndex : (screenIndex + 1);
      topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · Palabra ${currentRealIndex}/${totalRealWords}`;
    }
  }

  async function renderScreen() {
    stopInstructionAudioOnly();
    updateTopBar();
    arWord.textContent = getCurrentWord();

    setPartProgress(partId, {
      screenIndex,
      totalScreens
    });

    setupAudioForCurrentScreen();

    setIdleUI();
    await startRecAuto();
  }

  btnStop.onclick = async () => {
    await stopRecAndSaveCurrent();
  };

  btnNext.onclick = async () => {
    stopInstructionAudioOnly();

    if (isRecording) {
      await stopRecAndSaveCurrent();
    }

    screenIndex++;

    if (screenIndex >= totalScreens) {
      setPartProgress(partId, {
        status: "done",
        screenIndex: totalScreens - 1
      });

      stopInstructionAudioOnly();

      try {
        await recorder.close();
      } catch (e) {
        console.warn("No se pudo cerrar recorder:", e);
      }
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, {
      status: "in_progress",
      screenIndex
    });

    await renderScreen();
  };

  await renderScreen();
}

// 25.-

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

  // screenIndex:
  // 0 = instrucción
  // 1 = práctica
  // 2..6 = ensayos
  const totalScreens = 1 + images.length;

  // SIEMPRE empezar desde cero
  let screenIndex = 0;

  // audio de instrucción
  const instructionAudio = step.instructionAudio || step.audio || null;

  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";

  btnNext.style.display = "block";

  // respuestas SOLO en memoria
  const responses = {};

  function stopCurrentAudio() {
    if (window.currentInstructionAudio) {
      window.currentInstructionAudio.pause();
      window.currentInstructionAudio.currentTime = 0;
      window.currentInstructionAudio = null;
    }
  }

  function resetVisualState() {
    stopCurrentAudio();
    setupInstructionAudio(null);
    textAnswer.value = "";
    textAnswer.placeholder = "";
    textImage.removeAttribute("src");
  }

  function finishPart() {
    resetVisualState();

    // borrar lo que haya en pantalla
    screenIndex = 0;
    Object.keys(responses).forEach(key => delete responses[key]);
    finishCurrentPart();
  }

  function setTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (screenIndex === 0) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    if (screenIndex === 1) {
      topBar.textContent = `${partLabel} · P 1/1`;
      return;
    }

    const ensayoIndex = screenIndex - 1;
    topBar.textContent = `${partLabel} · E ${ensayoIndex}/5`;
  }

  function render() {
    setTopBar();

    document.body.classList.remove("centeredInstruction");

    if (screenIndex === 0) {
      showLayout("instruction");
      document.body.classList.add("centeredInstruction");

      bodyEl.textContent = step.instructionBody || "";

      setupInstructionAudio(instructionAudio, true);
      btnNext.style.display = "block";
      return;
    }

    showLayout("text_image");

    setupInstructionAudio(null);

    textInstruction.textContent = "";

    const imgIndex = screenIndex - 1;
    textImage.src = images[imgIndex];

    textAnswer.placeholder = step.placeholder || "";
    textAnswer.value = responses[String(screenIndex)] || "";

    textAnswer.oninput = () => {
      responses[String(screenIndex)] = textAnswer.value;
    };
  }

  btnNext.onclick = () => {
    if (screenIndex !== 0) {
      responses[String(screenIndex)] = textAnswer.value;

      const minChars = Number(step.minChars ?? 0);
      if (minChars > 0 && (textAnswer.value || "").trim().length < minChars) {
        alert(`Debe escribir al menos ${minChars} caracteres.`);
        return;
      }
    }

    screenIndex++;

    if (screenIndex >= totalScreens) {
      finishPart();
      return;
    }

    render();
  };

  render();
}

// 26.-
function runDictationText(step) {
  const practiceCount = Number(step.totalPractice ?? 1); // 1 ejemplo
  const trialCount = Number(step.totalTrials ?? 5);     // 5 ensayos
  const totalScreens = 1 + practiceCount + trialCount;  // 7 pantallas

  // 0 = instrucción
  // 1 = ejemplo
  // 2..6 = ensayos
  const saved = getPartProgress(partId);
  let screenIndex = 0;

  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.screenIndex)) {
    screenIndex = Math.min(Math.max(saved.screenIndex, 0), totalScreens - 1);
  }

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
  const responses = data.responses || {};

  let saveTimer = null;

  function stopCurrentAudio() {
    const audioTop = document.getElementById("instructionAudio");
    if (audioTop) {
      audioTop.pause();
      audioTop.currentTime = 0;
    }

    if (typeof stopAllAudios === "function") {
      stopAllAudios();
    }
  }

  function setTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (screenIndex === 0) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    if (screenIndex === 1) {
      topBar.textContent = `${partLabel} · Ejemplo`;
      return;
    }

    const ensayoIndex = screenIndex - 1; // 2->1, 3->2, ... 6->5
    topBar.textContent = `${partLabel} · E ${ensayoIndex}/${trialCount}`;
  }

  function getAudioForScreen() {
    if (screenIndex === 0) {
      return step.instructionAudio || null;
    }

    if (screenIndex === 1) {
      return step.exampleAudio || null;
    }

    const trialIdx = screenIndex - 2; // screen 2 => trial 0
    return Array.isArray(step.trialAudios) ? (step.trialAudios[trialIdx] || null) : null;
  }

  function render() {
    stopCurrentAudio();
    clearTimeout(saveTimer);

    setTopBar();
    setPartProgress(partId, { screenIndex });

    btnNext.style.display = "block";

    if (screenIndex === 0) {
      showLayout("instruction");

      setupInstructionAudio(getAudioForScreen());

      titleEl.textContent = step.instructionTitle || "";
      bodyEl.textContent = step.instructionBody || "";

      return;
    }

    showLayout("dictation");

    setupInstructionAudio(getAudioForScreen());

    promptEl.textContent = step.prompt || "Escriba aquí la palabra que escucha:";
    textEl.value = responses[String(screenIndex)] || "";

    textEl.oninput = () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        responses[String(screenIndex)] = textEl.value;
        setPartData(partId, { responses });
      }, 150);
    };

    // foco automático en el input/textarea
    setTimeout(() => {
      try {
        textEl.focus();
      } catch (e) {
        console.warn("No se pudo enfocar el campo de texto:", e);
      }
    }, 50);
  }

  btnNext.onclick = () => {
    stopCurrentAudio();
    clearTimeout(saveTimer);

    // Guardar respuesta solo en ejemplo/ensayos
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
      setPartProgress(partId, {
        status: "done",
        screenIndex: totalScreens - 1
      });
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, {
      status: "in_progress",
      screenIndex
    });

    render();
  };

  // opcional: cortar audio si se cierra/recarga
  window.addEventListener("beforeunload", stopCurrentAudio);

  render();
}

// 27.- 
function runTextImage(step) {
  showLayout("text_image");

  // BOTONES
  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();

  btnNext.style.display = "block";

  // AUDIO botón top
  const btnAudio = document.getElementById("btnAudio");
  const audioTop = document.getElementById("instructionAudio");

  // Topbar
  topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · ${part.name}`;

  // AUDIO DE INSTRUCCIÓN
  if (part.instructionAudio) {
    btnAudio.style.display = "block";
    audioTop.src = part.instructionAudio;

    btnAudio.onclick = async () => {
      try {
        stopAllAudios();
        audioTop.currentTime = 0;
        await audioTop.play();
      } catch (e) {
        console.warn("No se pudo reproducir audio:", e);
      }
    };
  } else {
    btnAudio.style.display = "none";
  }

  // CONTENIDO
  const textInstruction = document.getElementById("textInstruction");
  const textImage = document.getElementById("textImage");
  const textAnswer = document.getElementById("textAnswer");

  textInstruction.textContent = step.instruction || "";
  textImage.src = step.image;

  // SIEMPRE iniciar vacío
  textAnswer.value = "";

  // Progreso
  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1 });

  // Next
  btnNext.onclick = () => {
    const txt = (textAnswer.value || "").trim();
    const minChars = Number(step.minChars ?? 1);

    if (txt.length < minChars) {
      alert(`Debe escribir al menos ${minChars} caracter(es).`);
      return;
    }

    // Por ahora NO guardar texto
    setPartProgress(partId, { status: "done" });

    // cortar audio al salir
    stopAllAudios();
    finishCurrentPart();
  };
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
    if (screenIndex === 0) topBar.textContent = `${partLabel} · P1`;
    if (screenIndex === 1) topBar.textContent = `${partLabel} · E1`;
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
      finishCurrentPart();
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

function stopAllAudios() {
  document.querySelectorAll("audio").forEach(a => {
    a.pause();
    a.currentTime = 0;
  });
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
