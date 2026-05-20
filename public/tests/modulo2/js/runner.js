import { CAT } from "./cat_script.js";
import { addResult, getPartProgress, setPartProgress } from "./storage.js";
import { getPartData, setPartData } from "./storage.js";
import { WavRecorder } from "./audio_recorder_wav.js";
import { saveAudioBlob } from "./audio_store_idb.js";
import { VideoRecorder } from "./video_recorder.js";
import { saveBlob } from "./blob_store_idb.js";
import { exportSemanticPanZip, exportVerbalFluencyAudioZip, exportShortTermMemoryZip, exportPantomimeZip, exportCalculationZip, exportWrittenPhonologicalZip, exportOrationalPart9Zip, exportOrationalPart10Zip, exportOralParagraphsZip, exportRepeatAudioZip, exportWritingImagesZip, exportImageAssetsZip, exportLineBisectionZip } from "./export.js";

const topBar = document.getElementById("topBar");
const btnNext = document.getElementById("btnNext");
const btnFullscreen = document.getElementById("btnFullscreen");

const layoutSemantic = document.getElementById("layoutSemantic");
const layoutCalc = document.getElementById("layoutCalc");
const layoutTextImage = document.getElementById("layoutTextImage");
const layoutInstruction = document.getElementById("layoutInstruction");
const layoutDictation = document.getElementById("layoutDictation");
const layoutWritingCanvas = document.getElementById("layoutWritingCanvas");
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
  "story_yesno_flow",
  "writing_copy_canvas",
  "image_labeling",
  "dictation_text"
]);

function showLayout(which) {
  layoutSemantic.style.display = (which === "semantic") ? "block" : "none";
  layoutCalc.style.display = (which === "calc") ? "block" : "none";
  layoutTextImage.style.display = (which === "text_image") ? "block" : "none";
  layoutInstruction.style.display = (which === "instruction") ? "block" : "none";
  layoutDictation.style.display = (which === "dictation") ? "block" : "none";
  layoutWritingCanvas.style.display = (which === "writing_canvas") ? "block" : "none";
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

function setupInstructionAudio(audioSrc, centered = false, position = "bottom-left") {
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
    btnAudio.style.bottom = "84px";
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
const ZIP_DOWNLOAD_CLOSE_DELAY_MS = 3000;

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

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    handButton.addEventListener("click", async () => {
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

      if (partId === 1) {
        const currentData = getPartData(partId);
        setPartData(partId, {
          ...currentData,
          usedHand
        });

        const exported = await exportLineBisectionZip(usedHand);
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
        clearPartData(partId);
      }

      if (partId === 4) {
        const currentData = getPartData(partId);
        const shortTermMemoryResponses = (currentData.shortTermMemoryResponses || []).map((response) => ({
          ...response,
          mano_usada: usedHand
        }));

        setPartData(partId, {
          ...currentData,
          usedHand,
          shortTermMemoryResponses
        });

        const exported = await exportShortTermMemoryZip(usedHand);
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 2) {
        const exported = await exportSemanticPanZip(usedHand);
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 6) {
        const currentData = getPartData(partId);
        const calculationResponses = (currentData.calculationResponses || []).map((response) => ({
          ...response,
          mano_seleccionada: usedHand
        }));

        setPartData(partId, {
          ...currentData,
          usedHand,
          calculationResponses
        });

        const exported = await exportCalculationZip(usedHand);
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 8) {
        const currentData = getPartData(partId);
        const writtenPhonologicalResponses = (currentData.writtenPhonologicalResponses || []).map((response) => ({
          ...response,
          usedHand
        }));

        setPartData(partId, {
          ...currentData,
          usedHand,
          writtenPhonologicalResponses
        });

        const exported = await exportWrittenPhonologicalZip(usedHand);
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 9) {
        const currentData = getPartData(partId);
        const orationalPart9Responses = (currentData.orationalPart9Responses || []).map((response) => ({
          ...response,
          usedHand
        }));

        setPartData(partId, {
          ...currentData,
          usedHand,
          orationalPart9Responses
        });

        const exported = await exportOrationalPart9Zip(usedHand);
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 10) {
        const currentData = getPartData(partId);
        const orationalPart10Responses = (currentData.orationalPart10Responses || []).map((response) => ({
          ...response,
          usedHand
        }));

        setPartData(partId, {
          ...currentData,
          usedHand,
          orationalPart10Responses
        });

        const exported = await exportOrationalPart10Zip(usedHand);
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 11) {
        const currentData = getPartData(partId);
        setPartData(partId, {
          ...currentData,
          usedHand
        });

        const exported = await exportOralParagraphsZip(usedHand);
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 12) {
        const currentData = getPartData(partId);
        setPartData(partId, {
          ...currentData,
          usedHand
        });

        const exported = await exportRepeatAudioZip(usedHand);
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 13) {
        const currentData = getPartData(partId);
        setPartData(partId, {
          ...currentData,
          usedHand
        });

        const exported = await exportRepeatAudioZip(usedHand, 13, 31, "Repeticion_de_palabras_complejas");
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

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
  const backButtonId = "btnSemanticBack";
  let btnBack = document.getElementById(backButtonId);

  if (!btnBack) {
    btnBack = document.createElement("img");
    btnBack.id = backButtonId;
    btnBack.src = "flecha.png";
    btnBack.alt = "Volver";
    btnBack.style.position = "absolute";
    btnBack.style.left = "14px";
    btnBack.style.bottom = "84px";
    btnBack.style.width = "56px";
    btnBack.style.height = "56px";
    btnBack.style.cursor = "pointer";
    btnBack.style.transform = "rotate(180deg)";
    btnBack.style.zIndex = "65";
    btnBack.style.display = "none";
    document.getElementById("screen").appendChild(btnBack);
  }

  optBoxes[0].style.left = "25%";
  optBoxes[0].style.top = "25%";
  optBoxes[0].style.right = "auto";
  optBoxes[0].style.bottom = "auto";
  optBoxes[0].style.transform = "translate(-50%, -50%)";

  optBoxes[1].style.left = "75%";
  optBoxes[1].style.top = "25%";
  optBoxes[1].style.right = "auto";
  optBoxes[1].style.bottom = "auto";
  optBoxes[1].style.transform = "translate(-50%, -50%)";

  optBoxes[2].style.left = "25%";
  optBoxes[2].style.top = "75%";
  optBoxes[2].style.right = "auto";
  optBoxes[2].style.bottom = "auto";
  optBoxes[2].style.transform = "translate(-50%, -50%)";

  optBoxes[3].style.left = "75%";
  optBoxes[3].style.top = "75%";
  optBoxes[3].style.right = "auto";
  optBoxes[3].style.bottom = "auto";
  optBoxes[3].style.transform = "translate(-50%, -50%)";

  optBoxes.forEach((box) => {
    box.style.border = "none";
    box.style.background = "transparent";
    box.style.boxShadow = "none";
    box.style.padding = "0";
    box.style.width = "440px";
    box.style.height = "360px";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.boxSizing = "border-box";
  });

  optImgs.forEach((imgEl) => {
    imgEl.style.maxWidth = "410px";
    imgEl.style.maxHeight = "330px";
    imgEl.style.width = "100%";
    imgEl.style.height = "100%";
    imgEl.style.filter = "none";
  });

  const trials = step.trials || [];
  if (!trials.length) throw new Error("Sin trials");

  let trialIndex = 0;
  const saved = getPartProgress(partId);
  if (resume && saved?.status === "in_progress" && Number.isFinite(saved.trialIndex)) {
    trialIndex = Math.min(Math.max(saved.trialIndex, 0), trials.length - 1);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1, trialIndex });

  let selectedIndex = null;
  const panResponses = [];

  function hideInstructionAudio() {
    if (btnAudio) btnAudio.style.display = "none";

    if (window.currentInstructionAudio) {
      try {
        window.currentInstructionAudio.pause();
        window.currentInstructionAudio.currentTime = 0;
      } catch (e) { }
      window.currentInstructionAudio = null;
    }

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
    optBoxes.forEach((b, idx) => {
      b.classList.remove("selected");
      b.style.border = "none";
      b.style.boxShadow = "none";
      if (optImgs[idx]) {
        optImgs[idx].style.filter = "none";
        optImgs[idx].style.boxShadow = "none";
        optImgs[idx].style.borderRadius = "0";
      }
    });
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

  function updateBackButton() {
    btnBack.style.display = trialIndex > 0 ? "block" : "none";
  }

  function renderTrial() {
    clearMarks();

    const t = trials[trialIndex];
    if (centerBox) {
      centerBox.style.padding = "14px";
    }
    centerImg.style.maxWidth = "360px";
    centerImg.style.maxHeight = "280px";
    optImgs.forEach((imgEl) => {
      imgEl.style.maxWidth = "410px";
      imgEl.style.maxHeight = "330px";
      imgEl.style.filter = "none";
      imgEl.style.boxShadow = "none";
      imgEl.style.borderRadius = "0";
    });

    centerImg.src = t.center;
    for (let i = 0; i < 4; i++) optImgs[i].src = t.options[i];

    updateTopBar();
    updateFullscreenButton();
    updateBackButton();

    setupInstructionAudio(trialIndex === 0 ? step.instructionAudio : null, false, "bottom-left");

    setPartProgress(partId, { trialIndex });
  }

  btnFullscreen.onclick = () => toggleFullscreen();

  optBoxes.forEach(box => {
    box.onclick = () => {
      const idx = Number(box.dataset.opt);
      selectedIndex = idx;

      optBoxes.forEach((b, imgIndex) => {
        b.classList.remove("selected");
        b.style.border = "none";
        b.style.boxShadow = "none";
        if (optImgs[imgIndex]) {
          optImgs[imgIndex].style.filter = "none";
          optImgs[imgIndex].style.boxShadow = "none";
          optImgs[imgIndex].style.borderRadius = "0";
        }
      });
      box.classList.add("selected");
      box.style.border = "none";
      box.style.boxShadow = "none";
      if (optImgs[idx]) {
        optImgs[idx].style.filter = "none";
        optImgs[idx].style.boxShadow = "0 0 0 10px rgba(37, 99, 235, 0.32), 0 0 22px rgba(37, 99, 235, 0.55)";
        optImgs[idx].style.borderRadius = "8px";
      }

      btnNext.style.display = "block";
    };
  });

  btnBack.onclick = () => {
    if (trialIndex <= 0) return;
    hideInstructionAudio();
    trialIndex--;
    setPartProgress(partId, { status: "in_progress", trialIndex });
    renderTrial();
  };

  btnNext.onclick = () => {
    if (selectedIndex === null) return;

    hideInstructionAudio();

    const currentTrial = trials[trialIndex];
    panResponses[trialIndex] = buildSemanticPanResult(currentTrial, trialIndex, selectedIndex);
    setPartData(partId, {
      semanticPanResponses: panResponses.filter(Boolean)
    });

    trialIndex++;

    if (trialIndex >= trials.length) {
      btnBack.style.display = "none";
      setPartProgress(partId, { status: "done", trialIndex: trials.length - 1 });
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, { status: "in_progress", trialIndex });
    renderTrial();
  };

  renderTrial();
}

const SEMANTIC_PAN_ITEMS = [
  { item: "Ej.", target: "mono", correct: 1, close: 2, far: 0 },
  { item: 1, target: "silbato", correct: 3, close: 1, far: 0 },
  { item: 2, target: "mano", correct: 1, close: 3, far: 0 },
  { item: 3, target: "cerillas", correct: 2, close: 0, far: 1 },
  { item: 4, target: "almohada", correct: 0, close: 1, far: 3 },
  { item: 5, target: "egipcio", correct: 1, close: 3, far: 2 },
  { item: 6, target: "reloj", correct: 2, close: 1, far: 3 },
  { item: 7, target: "monja", correct: 0, close: 3, far: 2 },
  { item: 8, target: "tienda", correct: 3, close: 2, far: 1 },
  { item: 9, target: "botella", correct: 0, close: 2, far: 3 },
  { item: 10, target: "flor", correct: 3, close: 1, far: 2 }
];

function optionLetter(index) {
  return ["A", "B", "C", "D"][index] || "";
}

function getPanCategory(meta, selectedIndex) {
  if (selectedIndex === meta.correct) return "respuesta correcta";
  if (selectedIndex === meta.close) return "distractor semantico cercano";
  if (selectedIndex === meta.far) return "distractor semantico lejano";
  return "distractor no relacionado";
}

function buildSemanticPanResult(trial, trialIndex, selectedIndex) {
  const meta = SEMANTIC_PAN_ITEMS[trialIndex] || {};
  const category = getPanCategory(meta, selectedIndex);

  return {
    numero_item: meta.item ?? trial?.id ?? trialIndex + 1,
    target_mostrado: meta.target || trial?.center || "",
    opcion_seleccionada: optionLetter(selectedIndex),
    imagen_seleccionada: trial?.options?.[selectedIndex] || "",
    categoria_opcion_seleccionada: category,
    puntaje: category === "respuesta correcta" ? 1 : 0,
    conteo_respuesta_correcta: category === "respuesta correcta" ? 1 : 0,
    conteo_distractor_semantico_cercano: category === "distractor semantico cercano" ? 1 : 0,
    conteo_distractor_semantico_lejano: category === "distractor semantico lejano" ? 1 : 0,
    conteo_distractor_no_relacionado: category === "distractor no relacionado" ? 1 : 0
  };
}

const SHORT_TERM_MEMORY_ANSWER_KEY = {
  1: 3,
  2: 1,
  3: 2,
  4: 1,
  5: 2,
  6: 3,
  7: 1,
  8: 0,
  9: 0,
  10: 2,
  11: 3
};

const CALCULATION_OPERATIONS = [
  "9 + 6",
  "7 - 4",
  "8 x 7",
  "14 + 18",
  "34 - 15",
  "147 + 58"
];

const WRITTEN_PHONOLOGICAL_ITEMS = {
  1: { itemNumber: "Ej.", targetWord: "piña", correct: "piña", phonological: "viña", features: "2rd", position: "I", semantic: "pera", unrelated: "uva" },
  2: { itemNumber: 1, targetWord: "dedal", correct: "dedal", phonological: "pedal", features: "2rd", position: "I", semantic: "aguja", unrelated: "rueda" },
  3: { itemNumber: 2, targetWord: "sable", correct: "sable", phonological: "cable", features: "2rd", position: "I", semantic: "cuchillo", unrelated: "cuerda" },
  4: { itemNumber: 3, targetWord: "mesa", correct: "mesa", phonological: "pesa", features: "2rd", position: "I", semantic: "taburete", unrelated: "pelota" },
  5: { itemNumber: 4, targetWord: "carta", correct: "carta", aliases: { carta: ["carte"] }, phonological: "carpa", features: "1rd", position: "M", semantic: "dado", unrelated: "iglú" },
  6: { itemNumber: 5, targetWord: "cocina", correct: "cocina", phonological: "bocina", features: "2rd", position: "I", semantic: "sopa", unrelated: "campana" },
  7: { itemNumber: 6, targetWord: "espina", correct: "espina", phonological: "espiga", features: "2rd", position: "M", semantic: "aguja", unrelated: "flor" },
  8: { itemNumber: 7, targetWord: "vela", correct: "vela", phonological: "tela", features: "2rd", position: "I", semantic: "bombilla", unrelated: "ovillo" },
  9: { itemNumber: 8, targetWord: "rama", correct: "rama", phonological: "llama", features: "2rd", position: "I", semantic: "hoja", unrelated: "caballo" },
  10: { itemNumber: 9, targetWord: "toro", correct: "toro", phonological: "coro", features: "1rd", position: "I", semantic: "vaca", unrelated: "guitarra" },
  11: { itemNumber: 10, targetWord: "hueso", correct: "hueso", phonological: "huevo", features: "1rd", position: "M", semantic: "espina", unrelated: "pollito", aliases: { pollito: ["pollo"] } },
  12: { itemNumber: 11, targetWord: "lima", correct: "lima", phonological: "liga", features: "2rd", position: "M", semantic: "cepillo", unrelated: "pie" },
  13: { itemNumber: 12, targetWord: "pata", correct: "pata", phonological: "bata", features: "1rd", position: "I", semantic: "zapato", unrelated: "camisa" },
  14: { itemNumber: 13, targetWord: "cama", correct: "cama", phonological: "cara", features: "2rd", position: "M", semantic: "hamaca", unrelated: "dedo" },
  15: { itemNumber: 14, targetWord: "fuente", correct: "fuente", phonological: "puente", features: "2rd", position: "I", semantic: "grifo", unrelated: "escalera" },
  16: { itemNumber: 15, targetWord: "barco", correct: "barco", phonological: "marco", features: "1rd", position: "I", semantic: "bote", unrelated: "pintura" }
};

const WRITTEN_PHONOLOGICAL_IMAGE_OPTIONS = {
  1: ["1-viña.png", "1-pera.png", "1-uva.png", "1-piña.png"],
  2: ["2-aguja.png", "2-rueda.png", "2-pedal.png", "2-dedal.png"],
  3: ["3-sable.png", "3-cuchillo.png", "3-cuerda.png", "3-cable.png"],
  4: ["4-taburete.png", "4-pesa.png", "4-mesa.png", "4-pelota.png"],
  5: ["5-carte.png", "5-carpa.png", "5-iglu.png", "5-dado.png"],
  6: ["6-campana.png", "6-bocina.png", "6-cocina.png", "6-sopa.png"],
  7: ["7-flor.png", "7-aguja.png", "7-espina.png", "7-espiga.png"],
  8: ["8-tela.png", "8-vela.png", "8-bombilla.png", "8-ovillo.png"],
  9: ["9-hoja.png", "9-rama.png", "9-llama.png", "9-caballo.png"],
  10: ["10-coro.png", "10-guitarra.png", "10-toro.png", "10-vaca.png"],
  11: ["11-hueso.png", "11-pollo.png", "11-huevo.png", "11-espina.png"],
  12: ["12-pie.png", "12-liga.png", "12-cepillo.png", "12-lima.png"],
  13: ["13-camisa.png", "13-pata.png", "13-bata.png", "13-zapato.png"],
  14: ["14-cama.png", "14-dedo.png", "14-cara.png", "14-hamaca.png"],
  15: ["15-puente.png", "15-fuente.png", "15-escalera.png", "15-grifo.png"],
  16: ["16-barco.png", "16-marco.png", "16-bote.png", "16-pintura.png"]
};

function normalizeResponseWord(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function wordFromSelectedImage(src) {
  const filename = String(src || "").split(/[\\/]/).pop() || "";
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+-/, "");
}

function writtenPhonologicalCategory(meta, selectedWord) {
  const normalizedSelected = normalizeResponseWord(selectedWord);
  const matches = (word) => {
    if (normalizeResponseWord(word) === normalizedSelected) return true;
    return (meta.aliases?.[word] || []).some((alias) => normalizeResponseWord(alias) === normalizedSelected);
  };

  if (matches(meta.correct)) return "correcta";
  if (matches(meta.phonological)) return "distractor fonológico";
  if (matches(meta.semantic)) return "distractor semántico";
  if (matches(meta.unrelated)) return "distractor no relacionado";
  return "";
}

const ORATIONAL_PART9_ITEMS = {
  1: { itemNumber: "Ej.", sentenceType: "SN + SV (1)", correctLetter: "A", correctIndex: 0, correctSentence: "La mujer está sentada" },
  2: { itemNumber: 1, sentenceType: "SN + SV (1)", correctLetter: "B", correctIndex: 1, correctSentence: "La mujer está bebiendo" },
  3: { itemNumber: 2, sentenceType: "SN + SV (1)", correctLetter: "C", correctIndex: 2, correctSentence: "El hombre está andando" },
  4: { itemNumber: 3, sentenceType: "SN + SV (1)", correctLetter: "C", correctIndex: 2, correctSentence: "Ella está sonriendo" },
  5: { itemNumber: 4, sentenceType: "SN + SV + SN (2) I/A", correctLetter: "D", correctIndex: 3, correctSentence: "El hombre (se) está comiendo una manzana" },
  6: { itemNumber: 5, sentenceType: "SN + SV + SN (2) I/A", correctLetter: "B", correctIndex: 1, correctSentence: "La mujer está pintando una valla" },
  7: { itemNumber: 6, sentenceType: "SN + SV + SPrep (2) L", correctLetter: "A", correctIndex: 0, correctSentence: "El perro está sentado sobre la mesa" },
  8: { itemNumber: 7, sentenceType: "SN + SV + SPrep (2) R", correctLetter: "B", correctIndex: 1, correctSentence: "La manzana está bajo el zapato" },
  9: { itemNumber: 8, sentenceType: "SN + SV + SPrep (2) R/A", correctLetter: "B", correctIndex: 1, correctSentence: "El doctor llama al cocinero" },
  10: { itemNumber: 9, sentenceType: "SN + SV + SPrep (2) R/A", correctLetter: "C", correctIndex: 2, correctSentence: "El cantante moja al doctor" },
  11: { itemNumber: 10, sentenceType: "SN + SV + SPrep (2) R/P", correctLetter: "A", correctIndex: 0, correctSentence: "La bruja es dibujada por la bailarina" },
  12: { itemNumber: 11, sentenceType: "SN + SV + SPrep (2) R/P", correctLetter: "D", correctIndex: 3, correctSentence: "El cocinero es perseguido por el doctor" },
  13: { itemNumber: 12, sentenceType: "SN + SV + SPrep (2) R/A", correctLetter: "A", correctIndex: 0, correctSentence: "La bailarina dibuja a la bruja" },
  14: { itemNumber: 13, sentenceType: "SN + (*SPrep) + SV + SAdj (2) R/S", correctLetter: "D", correctIndex: 3, correctSentence: "El zapato bajo el lápiz es amarillo" },
  15: { itemNumber: 14, sentenceType: "SN + (*cláusula)+ SV + SAdj (2) R/S", correctLetter: "A", correctIndex: 0, correctSentence: "La alfombra en la que está el gato es roja" },
  16: { itemNumber: 15, sentenceType: "SN + SV + SPrep (2) R", correctLetter: "C", correctIndex: 2, correctSentence: "El lápiz rojo está bajo el zapato" },
  17: { itemNumber: 16, sentenceType: "SN + (*SPrep)+ SV + SAdj (2) R", correctLetter: "D", correctIndex: 3, correctSentence: "La flor en la taza es amarilla" }
};

const ORATIONAL_PART10_ITEMS = {
  1: { itemNumber: "Ej.", sentenceType: "SN + SV (1)", correctLetter: "D", correctIndex: 3, correctSentence: "El hombre está sentado" },
  2: { itemNumber: 1, sentenceType: "SN + SV (1)", correctLetter: "C", correctIndex: 2, correctSentence: "El hombre está bebiendo" },
  3: { itemNumber: 2, sentenceType: "SN + SV (1)", correctLetter: "B", correctIndex: 1, correctSentence: "La mujer está andando" },
  4: { itemNumber: 3, sentenceType: "SN + SV (1)", correctLetter: "D", correctIndex: 3, correctSentence: "Él está llorando" },
  5: { itemNumber: 4, sentenceType: "SN + SV + SN (2) I/A", correctLetter: "B", correctIndex: 1, correctSentence: "La mujer (se) está comiendo un helado" },
  6: { itemNumber: 5, sentenceType: "SN + SV + SN (2) I/A", correctLetter: "C", correctIndex: 2, correctSentence: "El hombre está pintando un cuadro" },
  7: { itemNumber: 6, sentenceType: "SN + SV + SPrep (2) L", correctLetter: "D", correctIndex: 3, correctSentence: "El niño está sentado bajo la mesa" },
  8: { itemNumber: 7, sentenceType: "SN + SV + SN (2) R", correctLetter: "A", correctIndex: 0, correctSentence: "El lápiz está bajo el papel" },
  9: { itemNumber: 8, sentenceType: "SN + SV + SPrep (2) R/A", correctLetter: "A", correctIndex: 0, correctSentence: "El cocinero llama a el doctor" },
  10: { itemNumber: 9, sentenceType: "SN + SV + SPrep (2) R/A", correctLetter: "D", correctIndex: 3, correctSentence: "El doctor empuja al cantante" },
  11: { itemNumber: 10, sentenceType: "SN + SV + SPrep (2) R/P", correctLetter: "C", correctIndex: 2, correctSentence: "La bailarina es dibujada por la bruja" },
  12: { itemNumber: 11, sentenceType: "SN + SV + SPrep (2) R/P", correctLetter: "C", correctIndex: 2, correctSentence: "El doctor es perseguido por el cocinero" },
  13: { itemNumber: 12, sentenceType: "SN + SV + SPrep (2) R/A", correctLetter: "C", correctIndex: 2, correctSentence: "La bruja dibuja a la bailarina" },
  14: { itemNumber: 13, sentenceType: "SN + (*SPrep)+ SV + SPrep (2) R/S", correctLetter: "D", correctIndex: 3, correctSentence: "El zapato bajo el lápiz es rojo" },
  15: { itemNumber: 14, sentenceType: "SN + (*cláusula)+ SV + SAdj (2) R/S", correctLetter: "B", correctIndex: 1, correctSentence: "La alfombra en la que está el gato es verde" },
  16: { itemNumber: 15, sentenceType: "SN + SV + SPrep (2) R", correctLetter: "A", correctIndex: 0, correctSentence: "El zapato amarillo está bajo el lápiz" },
  17: { itemNumber: 16, sentenceType: "SN + (*SPrep)+ SV + SAdj (2) R", correctLetter: "B", correctIndex: 1, correctSentence: "La flor bajo la taza es roja" }
};

const ORAL_PARAGRAPHS_QUESTIONS = {
  2: { storyNumber: 1, questionNumber: 1, questionText: "¿Viajaban Sandra y Pablo en coche?", correctAnswer: "No", countsForScore: true },
  3: { storyNumber: 1, questionNumber: 2, questionText: "¿Llegaban tarde?", correctAnswer: "Sí", countsForScore: true },
  4: { storyNumber: 1, questionNumber: 3, questionText: "¿Viajaban en tren?", correctAnswer: "Sí", countsForScore: false },
  5: { storyNumber: 1, questionNumber: 4, questionText: "¿Llegaban temprano?", correctAnswer: "No", countsForScore: false },
  7: { storyNumber: 2, questionNumber: 1, questionText: "¿Fue la explosión en Córdoba?", correctAnswer: "No", countsForScore: true },
  8: { storyNumber: 2, questionNumber: 2, questionText: "¿Fue causada por una bomba?", correctAnswer: "No", countsForScore: true },
  9: { storyNumber: 2, questionNumber: 3, questionText: "¿Fue en Santiago?", correctAnswer: "Sí", countsForScore: false },
  10: { storyNumber: 2, questionNumber: 4, questionText: "¿Causó el escape de gas la explosión?", correctAnswer: "Sí", countsForScore: false }
};

//test 3 Revisar

function runVerbalFluency(step) {
  showLayout("fluency");

  const centerText = document.getElementById("t3CenterText");
  const centerAudio = document.getElementById("t3CenterAudio");
  const topAudio = document.getElementById("t3TopAudio");
  const audioEl = document.getElementById("t3AudioEl");
  const recRow = document.getElementById("t3RecRow");
  const recordingIcon = document.getElementById("t3Recording");

  const stopBtn = document.getElementById("t3Stop");

  const recorder = new WavRecorder();
  let prepared = false;
  let isCapturing = false;
  let timer = null;
  let promptLeadTimer = null;
  let nextRedTimer = null;
  let minuteElapsed = false;
  let promptFinished = false;

  const duration = step.recordDurationMs || 60000;
  const captureDurationMs = duration + 3000;
  const beepAudio = new Audio("/tests/modulo2/assets/beep.wav");
  let beepConnected = false;

  const screens = [
    { type: "instruction", audio: step.instr1Audio, topBar: "Instrucción" },
    { type: "practice", text: "Ropa", audio: step.ropaAudio, topBar: "P 1/1" },
    { type: "test", text: "Animales", audio: step.animalesAudio, topBar: "E 1/1" },
    { type: "instruction", audio: step.instr2Audio, topBar: "Instrucción" },
    { type: "practice", text: "b__________", audio: step.letraBAudio, topBar: "P 1/1" },
    { type: "test", text: "s______", audio: step.letraSAudio, topBar: "E 1/1" }
  ];

  let index = 0;

  btnFullscreen.style.display = "block";
  btnNext.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  centerText.style.fontSize = "123px";
  centerText.style.lineHeight = "1";

  topAudio.style.position = "fixed";
  topAudio.style.left = "14px";
  topAudio.style.bottom = "95px";
  topAudio.style.top = "auto";
  topAudio.style.right = "auto";
  topAudio.style.width = "56px";
  topAudio.style.height = "56px";
  topAudio.style.zIndex = "80";

  async function ensurePrepared() {
    if (prepared) return;
    await recorder.prepare({ numChannels: 1 });
    prepared = true;
    if (!beepConnected && typeof recorder.connectAudioElement === "function") {
      try {
        recorder.connectAudioElement(beepAudio);
        beepConnected = true;
      } catch (e) {
        console.warn("No se pudo conectar beep.wav a la grabacion:", e);
      }
    }
  }

  function showMicError(err) {
    console.error("Error al acceder al micrófono:", err);

    let msg = "No se pudo acceder al micrófono.";

    if (err?.name === "NotAllowedError") {
      msg = "El navegador bloqueó el permiso del micrófono. Debes permitirlo.";
    } else if (err?.name === "NotFoundError") {
      msg = "No se encontró ningún micrófono disponible.";
    } else if (err?.name === "NotReadableError") {
      msg = "El micrófono está siendo usado por otra aplicación o no se puede leer.";
    } else if (err?.name === "SecurityError") {
      msg = "El navegador bloqueó el micrófono por seguridad.";
    } else if (err?.message) {
      msg = `No se pudo acceder al micrófono: ${err.message}`;
    }

    alert(msg);
  }

  function showMicError(err) {
    console.error("Error al acceder al micrófono:", err);

    let msg = "No se pudo acceder al micrófono.";

    if (err?.name === "NotAllowedError") {
      msg = "El navegador bloqueó el permiso del micrófono. Debes permitirlo.";
    } else if (err?.name === "NotFoundError") {
      msg = "No se encontró ningún micrófono disponible.";
    } else if (err?.name === "NotReadableError") {
      msg = "El micrófono está siendo usado por otra aplicación o no se puede leer.";
    } else if (err?.name === "SecurityError") {
      msg = "El navegador bloqueó el micrófono por seguridad.";
    } else if (err?.message) {
      msg = `No se pudo acceder al micrófono: ${err.message}`;
    }

    alert(msg);
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;
    if (n === 1) {
      topBar.textContent = `${partLabel} · P 1/1`;
    } else {
      topBar.textContent = `${partLabel} · E ${n - 1}/${last - 1}`;
    }
  }

  async function startCapture() {
    clearTimeout(promptLeadTimer);
    clearTimeout(nextRedTimer);
    await ensurePrepared();
    recorder.beginCapture();
    isCapturing = true;
    minuteElapsed = false;
    nextRedTimer = setTimeout(() => {
      markNextButtonAsReady();
    }, captureDurationMs);

    timer = setTimeout(async () => {
      markNextButtonAsReady();
      await stopAndSave();
      setStoppedState();
    }, captureDurationMs);
  }

  async function stopAndSave() {
    if (!isCapturing) return;
    isCapturing = false;

    clearTimeout(timer);
    clearTimeout(promptLeadTimer);
    clearTimeout(nextRedTimer);

    const blob = await recorder.stop();
    if (blob) {
      const screen = screens[index] || {};
      if (screen.type !== "test") {
        return;
      }

      const key = `part03_screen${index + 1}.wav`;
      await saveAudioBlob(key, blob);

      const data = getPartData(partId);
      const verbalFluencyAudios = data.verbalFluencyAudios || {};
      verbalFluencyAudios[String(index)] = {
        key,
        screenIndex: index,
        label: screen.text || screen.topBar || `pantalla_${index + 1}`,
        type: screen.type || "",
      };
      setPartData(partId, { verbalFluencyAudios });
    }
  }

  function stopPromptAudio() {
    clearTimeout(promptLeadTimer);
    try {
      audioEl.pause();
      audioEl.currentTime = 0;
      beepAudio.pause();
      beepAudio.currentTime = 0;
    } catch (e) { }
    audioEl.onended = null;
  }

  async function playFluencyBeep() {
    try {
      beepAudio.pause();
      beepAudio.currentTime = 0;
      await beepAudio.play();
    } catch (e) {
      console.warn("No se pudo reproducir beep.wav:", e);
    }
  }

  function bindTestAudioEnded() {
    audioEl.onended = async () => {
      clearTimeout(promptLeadTimer);
      if (!isCapturing) {
        await startCapture();
        setRecordingState();
      }
      await playFluencyBeep();
    };
  }

  function updateTopBar(label) {
    topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · ${label}`;
  }

  function resetNextButtonState() {
    btnNext.style.display = "block";
    btnNext.style.filter = "none";
  }

  function markNextButtonAsReady() {
    minuteElapsed = true;
    btnNext.style.display = "block";
    btnNext.style.filter = "invert(17%) sepia(86%) saturate(7471%) hue-rotate(355deg) brightness(92%) contrast(122%)";
  }

  function setPromptState() {
    promptFinished = false;
    resetNextButtonState();
    recRow.style.display = "flex";
    stopBtn.style.display = "block";
    if (recordingIcon) {
      recordingIcon.style.display = "none";
      recordingIcon.src = "grabando.png";
    }
  }

  function setRecordingState() {
    promptFinished = true;
    resetNextButtonState();
    if (recordingIcon) {
      recordingIcon.style.display = "block";
      recordingIcon.src = "grabando.png";
    }
    stopBtn.style.display = "block";
  }

  function setStoppedState() {
    clearTimeout(nextRedTimer);
    recRow.style.display = "flex";
    stopBtn.style.display = "none";
    if (recordingIcon) {
      recordingIcon.style.display = "none";
    }
    btnNext.style.display = "block";
    if (minuteElapsed) {
      markNextButtonAsReady();
    } else {
      btnNext.style.filter = "none";
    }
  }

  function scheduleLeadRecording() {
    clearTimeout(promptLeadTimer);

    if (!Number.isFinite(audioEl.duration) || audioEl.duration <= 0) {
      audioEl.onloadedmetadata = () => {
        audioEl.onloadedmetadata = null;
        scheduleLeadRecording();
      };
      return;
    }

    const durationMs = audioEl.duration * 1000;
    const leadMs = Math.max(durationMs - 3000, 0);

    promptLeadTimer = setTimeout(async () => {
      if (isCapturing) return;
      await startCapture();
      setRecordingState();
    }, leadMs);
  }

  async function render() {
    const s = screens[index];

    centerText.style.display = "none";
    centerAudio.style.display = "none";
    topAudio.style.display = "none";
    recRow.style.display = "none";
    if (recordingIcon) recordingIcon.style.display = "none";
    stopPromptAudio();
    clearTimeout(nextRedTimer);
    promptFinished = false;
    resetNextButtonState();
    updateTopBar(s.topBar || "");

    if (s.type === "instruction") {
      centerAudio.style.display = "block";
      centerAudio.onclick = () => {
        if (!s.audio) return;
        audioEl.src = s.audio;
        audioEl.currentTime = 0;
        audioEl.play();
      };
      return;
    }

    if (s.type === "practice") {
      centerText.style.display = "block";
      centerText.textContent = s.text;
      recRow.style.display = "none";
      stopBtn.style.display = "none";
      if (recordingIcon) recordingIcon.style.display = "none";

      topAudio.style.display = s.audio ? "block" : "none";
      topAudio.onclick = async () => {
        if (!s.audio) return;
        stopPromptAudio();
        audioEl.src = s.audio;
        audioEl.currentTime = 0;
        await audioEl.play();
      };
      return;
    }

    if (s.type === "test") {
      centerText.style.display = "block";
      centerText.textContent = s.text;
      setPromptState();

      topAudio.style.display = "block";
      topAudio.onclick = async () => {
        if (!s.audio) return;

        if (isCapturing) {
          await stopAndSave();
        }

        stopPromptAudio();
        setPromptState();
        bindTestAudioEnded();
        audioEl.src = s.audio;
        audioEl.currentTime = 0;
        await audioEl.play();
        scheduleLeadRecording();
      };

      bindTestAudioEnded();
    }
  }

  stopBtn.onclick = async () => {
    stopPromptAudio();
    if (isCapturing) {
      await stopAndSave();
    }
    setStoppedState();
  };

  btnNext.onclick = async () => {
    stopPromptAudio();
    clearTimeout(nextRedTimer);
    if (isCapturing) {
      await stopAndSave();
    }
    if (promptFinished) {
      setStoppedState();
    }

    index++;
    if (index >= screens.length) {
      await recorder.close();
      await exportVerbalFluencyAudioZip();
      setTimeout(() => {
        finishCurrentPart();
      }, ZIP_DOWNLOAD_CLOSE_DELAY_MS);
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
    btnPatientAudio.style.width = "56px";
    btnPatientAudio.style.height = "56px";
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

  const optionPositions = [
    { left: "31%", top: "30%" },
    { left: "69%", top: "30%" },
    { left: "31%", top: "70%" },
    { left: "69%", top: "70%" },
  ];

  optBoxes.forEach((box, boxIndex) => {
    box.style.left = optionPositions[boxIndex].left;
    box.style.top = optionPositions[boxIndex].top;
    box.style.right = "auto";
    box.style.bottom = "auto";
    box.style.transform = "translate(-50%, -50%)";
    box.style.width = "min(42vw, 435px)";
    box.style.height = "min(36vh, 335px)";
    box.style.border = "none";
    box.style.background = "transparent";
    box.style.boxShadow = "none";
    box.style.padding = "0";
  });

  optImgs.forEach((imgEl) => {
    imgEl.style.width = "100%";
    imgEl.style.height = "100%";
    imgEl.style.maxWidth = "100%";
    imgEl.style.maxHeight = "100%";
    imgEl.style.objectFit = "contain";
    imgEl.style.filter = "none";
    imgEl.style.boxShadow = "none";
    imgEl.style.borderRadius = "0";
  });

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

  function buildShortTermMemoryResult(currentTrialIndex, currentSelectedIndex) {
    const correctIndex = SHORT_TERM_MEMORY_ANSWER_KEY[currentTrialIndex];
    const isPractice = currentTrialIndex === practiceIndex;
    const selectedOptionNumber = currentSelectedIndex + 1;
    const correctOptionNumber = Number.isFinite(correctIndex) ? correctIndex + 1 : null;
    const selectedImage = fileFor(currentTrialIndex, selectedOptionNumber);
    const correctImage = correctOptionNumber ? fileFor(currentTrialIndex, correctOptionNumber) : "";
    const isCorrect = currentSelectedIndex === correctIndex;

    return {
      numero_item: isPractice ? "Ej." : currentTrialIndex - practiceIndex,
      pantalla: currentTrialIndex,
      opcion_seleccionada: selectedOptionNumber,
      imagen_seleccionada: selectedImage,
      opcion_correcta: correctOptionNumber,
      imagen_correcta: correctImage,
      es_correcta: isCorrect,
      puntaje: isPractice ? 0 : (isCorrect ? 1 : 0),
      es_ejemplo: isPractice,
      mano_usada: getPartData(partId).usedHand || ""
    };
  }

  function clearSelection() {
    optBoxes.forEach((b, idx) => {
      b.classList.remove("selected");
      b.style.border = "none";
      b.style.boxShadow = "none";
      if (optImgs[idx]) {
        optImgs[idx].style.filter = "none";
        optImgs[idx].style.boxShadow = "none";
        optImgs[idx].style.borderRadius = "0";
      }
    });
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

      optBoxes.forEach((b, imgIndex) => {
        b.classList.remove("selected");
        b.style.border = "none";
        b.style.boxShadow = "none";
        if (optImgs[imgIndex]) {
          optImgs[imgIndex].style.filter = "none";
          optImgs[imgIndex].style.boxShadow = "none";
          optImgs[imgIndex].style.borderRadius = "0";
        }
      });
      box.classList.add("selected");
      box.style.border = "none";
      box.style.boxShadow = "none";
      if (optImgs[idx]) {
        optImgs[idx].style.boxShadow = "0 0 0 10px rgba(37, 99, 235, 0.32), 0 0 22px rgba(37, 99, 235, 0.55)";
        optImgs[idx].style.borderRadius = "8px";
      }

      btnNext.style.display = "block";
    };
  });

  btnNext.onclick = () => {
    if (requireSel && selectedIndex === null) return;

    const data = getPartData(partId);
    const responses = data.responses || {};
    const shortTermMemoryResponses = (data.shortTermMemoryResponses || [])
      .filter((response) => Number(response.pantalla) !== trialIndex);
    const result = buildShortTermMemoryResult(trialIndex, selectedIndex);

    responses[String(trialIndex)] = {
      selected: selectedIndex,
      selectedOption: result.opcion_seleccionada,
      selectedImage: result.imagen_seleccionada,
      correctOption: result.opcion_correcta,
      correctImage: result.imagen_correcta,
      isCorrect: result.es_correcta,
      score: result.puntaje,
      isPractice: result.es_ejemplo
    };

    shortTermMemoryResponses.push(result);
    shortTermMemoryResponses.sort((a, b) => Number(a.pantalla) - Number(b.pantalla));

    setPartData(partId, { responses, shortTermMemoryResponses });

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
  const vrStimImage = document.getElementById("vrStimImage");
  const vrStimImageWrap = document.getElementById("vrStimImageWrap");
  const vrStimWrap = document.getElementById("vrStimWrap");
  const vrSmallPreviewWrap = document.getElementById("vrSmallPreviewWrap");
  const vrSmallPreview = document.getElementById("vrSmallPreview");

  const vBtnRec = document.getElementById("vBtnRec");
  const vBtnStop = document.getElementById("vBtnStop");
  const vBtnRecording = document.getElementById("vBtnRecording");
  const vrControls = document.getElementById("vrControls");

  const images = step.images || [];
  const practiceCount = Number(step.practiceCount ?? 1); // prueba
  const trialCount = Number(step.trialCount ?? 6);       // ensayos reales
  const totalScreens = 1 + images.length;

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
  btnNext.style.display = "none";

  vrStimImageWrap.style.left = "44%";
  vrStimImageWrap.style.top = "50%";
  vrStimImageWrap.style.transform = "translate(-50%, -50%)";
  vrStimImageWrap.style.width = "720px";
  vrStimImageWrap.style.maxWidth = "60vw";
  vrStimImage.style.maxWidth = "720px";
  vrStimImage.style.maxHeight = "82vh";

  vrPreviewWrap.style.left = "auto";
  vrPreviewWrap.style.right = "300px";
  vrPreviewWrap.style.top = "300px";
  vrPreviewWrap.style.transform = "translate(0, -50%)";
  vrPreviewWrap.style.width = "360px";
  vrPreviewWrap.style.maxWidth = "32vw";
  vrPreview.style.width = "360px";
  vrPreview.style.height = "270px";
  vrPreview.style.maxWidth = "32vw";
  vrPreview.style.maxHeight = "45vh";
  vrPreview.style.objectFit = "cover";
  vrControls.style.left = "auto";
  vrControls.style.right = "430px";
  vrControls.style.top = "520px";
  vrControls.style.transform = "translateX(50%)";

  const recorder = new VideoRecorder();
  let isRecording = false;
  let didRecordThisScreen = false;
  let audioPlayed = false;
  let noCameraMode = false;

  function setIdleUI() {
    if (vrControls) vrControls.style.display = "none";
    vBtnRec.style.display = "none";
    vBtnStop.style.display = "none";
    vBtnRecording.style.display = "none";
    isRecording = false;
  }

  function setRecordingUI() {
    if (vrControls) vrControls.style.display = "flex";
    vBtnRec.style.display = "none";
    vBtnStop.style.display = "block";
    vBtnRecording.style.display = "block";
    isRecording = true;
  }

  async function startStreamTo(el) {
    await recorder.startStream(el);
  }

  function showVideoDeviceError(error) {
    console.error("No se pudo acceder a la camara para Pantomima:", error);

    let message = "No se pudo acceder a la camara.";
    if (error?.name === "NotFoundError") {
      message = "No se encontro una camara disponible para realizar Pantomima.";
    } else if (error?.name === "NotAllowedError") {
      message = "El navegador bloqueo el permiso de camara. Debes permitirlo para realizar Pantomima.";
    } else if (error?.name === "NotReadableError") {
      message = "La camara esta siendo usada por otra aplicacion o no se puede leer.";
    } else if (error?.message) {
      message = `No se pudo acceder a la camara: ${error.message}`;
    }

    alert(message);
  }

  function enableNoCameraMode(error) {
    noCameraMode = true;
    recorder.stopStream();
    setIdleUI();
    btnNext.style.display = "block";

    if (vrPreview) {
      vrPreview.removeAttribute("src");
      vrPreview.srcObject = null;
      vrPreview.poster = "";
      vrPreview.style.background = "#111";
    }

    showVideoDeviceError(error);
  }

  function saveNoCameraTake() {
    const data = getPartData(partId);
    const takes = data.takes || {};
    const stimIndex = screenIndex;
    const imageName = images[screenIndex - 1] || null;
    takes[String(stimIndex)] = {
      key: null,
      image: imageName,
      sin_camara: true
    };
    setPartData(partId, { takes, sin_camara: true });
    didRecordThisScreen = true;
  }

  async function startRecording() {
    if (noCameraMode) {
      didRecordThisScreen = false;
      btnNext.style.display = "none";
      setRecordingUI();
      return;
    }

    await startStreamTo(vrPreview);
    await recorder.startRecording();
    didRecordThisScreen = false;
    setRecordingUI();
  }

  async function stopRecordingAndSave() {
    if (noCameraMode) {
      saveNoCameraTake();
      setIdleUI();
      btnNext.style.display = "block";
      return;
    }

    if (!isRecording) return;

    setIdleUI();
    const blob = await recorder.stopRecording();

    if (blob) {
      didRecordThisScreen = true;
      const stimIndex = screenIndex;
      const imageName = images[screenIndex - 1] || null;

      const key = `part${String(partId).padStart(2, "0")}_s${String(stimIndex).padStart(2, "0")}.webm`;
      await saveBlob(key, blob);

      const data = getPartData(partId);
      const takes = data.takes || {};
      takes[String(stimIndex)] = { key, image: imageName };
      setPartData(partId, { takes });
    }

    recorder.stopStream();
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (screenIndex === 0) {
      topBar.textContent = `${partLabel} · Ajuste cámara`;
      return;
    }

    if (screenIndex <= practiceCount) {
      topBar.textContent = `${partLabel} · P ${screenIndex}/${practiceCount}`;
      return;
    }

    const ensayoN = screenIndex - practiceCount;
    topBar.textContent = `${partLabel} · E ${ensayoN}/${trialCount}`;
  }

  function stopInstructionAudio() {
    try {
      instructionAudio.pause();
      instructionAudio.currentTime = 0;
    } catch (e) { }
    instructionAudio.onended = null;
  }

  function setAudioButtonPosition() {
    btnAudio.style.display = "block";
    btnAudio.style.position = "fixed";
    btnAudio.style.left = "14px";
    btnAudio.style.bottom = "95px";
    btnAudio.style.top = "auto";
    btnAudio.style.right = "auto";
    btnAudio.style.transform = "none";
    btnAudio.style.zIndex = "80";
  }

  async function render() {
    updateTopBar();
    setPartProgress(partId, { screenIndex });
    audioPlayed = false;
    stopInstructionAudio();
    recorder.stopStream();

    if (screenIndex === 0) {
      vrStimWrap.style.display = "none";
      vrPreviewWrap.style.display = "flex";
      vrPreviewWrap.style.left = "50%";
      vrPreviewWrap.style.right = "auto";
      vrPreviewWrap.style.top = "50%";
      vrPreviewWrap.style.transform = "translate(-50%, -50%)";
      vrPreviewWrap.style.width = "760px";
      vrPreviewWrap.style.maxWidth = "92vw";
      vrPreview.style.width = "760px";
      vrPreview.style.height = "560px";
      vrPreview.style.maxWidth = "92vw";
      vrPreview.style.maxHeight = "80vh";
      vrControls.style.left = "50%";
      vrControls.style.right = "auto";
      vrControls.style.top = "86%";
      vrControls.style.transform = "translate(-50%, -50%)";
      btnAudio.style.display = "none";
      setIdleUI();
      btnNext.style.display = "block";
      try {
        await startStreamTo(vrPreview);
      } catch (error) {
        enableNoCameraMode(error);
      }
      return;
    }

    vrStimWrap.style.display = "block";
    vrPreviewWrap.style.display = "none";
    vrPreviewWrap.style.left = "auto";
    vrPreviewWrap.style.right = "300px";
    vrPreviewWrap.style.top = "300px";
    vrPreviewWrap.style.transform = "translate(0, -50%)";
    vrPreviewWrap.style.width = "360px";
    vrPreviewWrap.style.maxWidth = "32vw";
    vrPreview.style.width = "360px";
    vrPreview.style.height = "270px";
    vrPreview.style.maxWidth = "32vw";
    vrPreview.style.maxHeight = "45vh";
    vrControls.style.left = "auto";
    vrControls.style.right = "430px";
    vrControls.style.top = "520px";
    vrControls.style.transform = "translateX(50%)";
    vrStimImageWrap.style.display = "flex";
    vrSmallPreviewWrap.style.display = "none";

    setAudioButtonPosition();
    instructionAudio.src = step.instructionAudio || "";
    instructionAudio.load();

    if (!images[screenIndex - 1]) {
      console.warn(`No existe imagen para screenIndex=${screenIndex}`);
      return;
    }

    vrStimImage.src = `${step.basePath}/${images[screenIndex - 1]}`;

    setIdleUI();
    btnNext.style.display = "none";

    btnAudio.onclick = async () => {
      if (!instructionAudio.src || audioPlayed) return;
      audioPlayed = true;
      try {
        instructionAudio.currentTime = 0;
        await instructionAudio.play();
      } catch (e) {
        console.error(e);
      }
    };

    instructionAudio.onended = async () => {
      btnAudio.style.display = "none";
      vrStimImageWrap.style.display = "flex";
      vrPreviewWrap.style.display = "flex";
      try {
        await startRecording();
      } catch (e) {
        enableNoCameraMode(e);
      }
    };
  }

  vBtnRec.onclick = async () => { };

  vBtnStop.onclick = async () => {
    stopInstructionAudio();
    await stopRecordingAndSave();
    btnNext.style.display = "block";
  };

  btnNext.onclick = async () => {
    stopInstructionAudio();
    if (isRecording || noCameraMode) {
      await stopRecordingAndSave();
    }

    screenIndex++;

    if (screenIndex >= totalScreens) {
      setPartProgress(partId, { status: "done", screenIndex: totalScreens - 1 });
      recorder.stopStream();
      btnAudio.style.display = "none";
      const exported = await exportPantomimeZip();
      if (exported) {
        await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
      }
      finishCurrentPart();
      return;
    }

    setPartProgress(partId, { status: "in_progress", screenIndex });
    await render();
  };

  render().catch(showVideoDeviceError);
}

//   CÁLCULO (Parte 6)

function runCalcMCQ(step) {
  showLayout("calc");

  const promptBox = document.getElementById("calcPromptBox");
  const promptImg = document.getElementById("calcPromptImg");
  let promptText = document.getElementById("calcPromptText");
  if (!promptText && promptBox) {
    promptText = document.createElement("div");
    promptText.id = "calcPromptText";
    promptBox.appendChild(promptText);
  }
  if (promptImg) {
    promptImg.style.display = "none";
    promptImg.removeAttribute("src");
  }
  if (promptText) {
    promptText.style.display = "block";
    promptText.style.fontSize = "112px";
    promptText.style.fontWeight = "800";
    promptText.style.lineHeight = "1";
    promptText.style.textAlign = "center";
    promptText.style.whiteSpace = "nowrap";
    promptText.style.minWidth = "520px";
  }
  const optBoxes = Array.from(document.querySelectorAll("#calcOptions .opt5"));
  const optImgs = [
    document.getElementById("cimg0"),
    document.getElementById("cimg1"),
    document.getElementById("cimg2"),
    document.getElementById("cimg3"),
    document.getElementById("cimg4"),
  ];
  const optLabels = optBoxes.map((box, index) => {
    let labelEl = box.querySelector(".calcOptionLabel");
    if (!labelEl) {
      labelEl = document.createElement("div");
      labelEl.className = "calcOptionLabel";
      labelEl.style.display = "none";
      labelEl.style.fontSize = "88px";
      labelEl.style.fontWeight = "700";
      labelEl.style.lineHeight = "1";
      labelEl.style.textAlign = "center";
      labelEl.style.minWidth = "120px";
      labelEl.style.padding = "18px 12px";
      box.appendChild(labelEl);
    }
    return labelEl;
  });

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
    btnAudio.style.left = "14px";
    btnAudio.style.bottom = "84px";
    btnAudio.style.top = "auto";
    btnAudio.style.right = "auto";
    btnAudio.style.zIndex = "9999";
    btnAudio.style.width = "56px";
    btnAudio.style.height = "56px";

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
    btnFullscreen.style.width = "56px";
    btnFullscreen.style.height = "56px";

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
    if (promptImg) {
      promptImg.style.display = "none";
      promptImg.removeAttribute("src");
    }
    if (promptText) {
      promptText.textContent = CALCULATION_OPERATIONS[trialIndex] || "";
    }
    for (let i = 0; i < 5; i++) {
      const optionValue = t.options[i];
      const isImage = typeof optionValue === "string" && /\.(png|jpe?g|webp|gif|svg)$/i.test(optionValue);

      if (isImage) {
        optImgs[i].style.display = "block";
        optImgs[i].src = optionValue;
        optLabels[i].style.display = "none";
        optLabels[i].textContent = "";
      } else {
        optImgs[i].style.display = "none";
        optImgs[i].removeAttribute("src");
        optLabels[i].style.display = "block";
        optLabels[i].textContent = String(optionValue ?? "");
      }
    }
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

    const currentTrial = trials[trialIndex];
    const data = getPartData(partId);
    const calculationResponses = (data.calculationResponses || [])
      .filter((response) => Number(response.ejercicio) !== trialIndex + 1);

    calculationResponses.push({
      ejercicio: trialIndex + 1,
      operacion_aritmetica: CALCULATION_OPERATIONS[trialIndex] || currentTrial.promptImg || "",
      opcion_elegida: currentTrial.options?.[selectedIndex] ?? "",
      mano_seleccionada: data.usedHand || ""
    });

    calculationResponses.sort((a, b) => Number(a.ejercicio) - Number(b.ejercicio));
    setPartData(partId, { calculationResponses });

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

  const compactOptionPositions = [
    { left: "38%", top: "36%" },
    { left: "62%", top: "36%" },
    { left: "38%", top: "66%" },
    { left: "62%", top: "66%" },
  ];

  optBoxes.forEach((box, boxIndex) => {
    box.style.left = compactOptionPositions[boxIndex].left;
    box.style.top = compactOptionPositions[boxIndex].top;
    box.style.right = "auto";
    box.style.bottom = "auto";
    box.style.transform = "translate(-50%, -50%)";
    box.style.width = "min(32vw, 380px)";
    box.style.height = "min(29vh, 300px)";
    box.style.padding = "10px";
  });

  optImgs.forEach((imgEl) => {
    imgEl.style.width = "100%";
    imgEl.style.height = "100%";
    imgEl.style.maxWidth = "100%";
    imgEl.style.maxHeight = "100%";
    imgEl.style.objectFit = "contain";
  });

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
    const mappedFile = step.imageFiles?.[t]?.[o - 1];
    if (mappedFile) return `${basePath}/${mappedFile}`;

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
      topBar.textContent = `${partLabel} · P 1/1`;
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

  optBoxes.forEach((box) => {
    box.style.width = "360px";
    box.style.height = "280px";
    box.style.padding = "12px";
  });
  function applyPart8ImageStyle(imgEl, selected = false) {
    if (!imgEl) return;
    imgEl.style.maxWidth = "400px";
    imgEl.style.maxHeight = "300px";
    imgEl.style.width = "130%";
    imgEl.style.height = "130%";
    imgEl.style.filter = "none";
    imgEl.style.border = "2px solid black";
    imgEl.style.boxShadow = selected
      ? "0 0 0 10px rgba(37, 99, 235, 0.32), 0 0 22px rgba(37, 99, 235, 0.55)"
      : "none";
    imgEl.style.borderRadius = "8px";
  }

  optImgs.forEach(applyPart8ImageStyle);

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
    const mappedFile = WRITTEN_PHONOLOGICAL_IMAGE_OPTIONS[t]?.[o - 1];
    if (mappedFile) return `${basePath}/${mappedFile}`;

    const f = filePattern.replace("{t}", String(t)).replace("{o}", String(o));
    return `${basePath}/${f}`;
  }

  function buildWrittenPhonologicalResult(t, currentSelectedIndex) {
    const meta = WRITTEN_PHONOLOGICAL_ITEMS[t];
    if (!meta) return null;

    const selectedImage = optImgs[currentSelectedIndex]?.getAttribute("src") || "";
    const selectedWord = wordFromSelectedImage(selectedImage);
    const selectedCategory = writtenPhonologicalCategory(meta, selectedWord);
    const responseMode = "D";

    return {
      itemNumber: meta.itemNumber,
      targetWord: meta.targetWord,
      selectedImage,
      selectedOption: optionLetter(currentSelectedIndex),
      selectedCategory,
      responseMode,
      assignedScore: selectedCategory === "correcta" ? 2 : 0,
      phonologicalDistinctiveFeatures: selectedCategory === "distractor fonológico" ? meta.features : "",
      phonologicalPosition: selectedCategory === "distractor fonológico" ? meta.position : "",
      usedHand: getPartData(partId).usedHand || ""
    };
  }

  function clearSelection() {
    optBoxes.forEach((b, idx) => {
      b.classList.remove("selected");
      b.style.border = "none";
      b.style.boxShadow = "none";
      applyPart8ImageStyle(optImgs[idx], false);
    });
    selectedIndex = null;
    btnNext.style.display = requireSel ? "none" : "block";
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;
    if (screenIndex === 0) topBar.textContent = `${partLabel} · Instrucción`;
    else topBar.textContent = `${partLabel} · E ${screenIndex}/16`;
  }

  function positionCornerAudio() {
    if (!btnAudio) return;
    btnAudio.style.position = "fixed";
    btnAudio.style.left = "14px";
    btnAudio.style.bottom = "84px";
    btnAudio.style.top = "auto";
    btnAudio.style.right = "auto";
    btnAudio.style.width = "56px";
    btnAudio.style.height = "56px";
    btnAudio.style.transform = "none";
    btnAudio.style.zIndex = "9999";
  }

  function mountAudioForTrial(t) {
    // Reglas:
    // - t=1: hay audio (arriba derecha)
    // - t=2: hay audio (arriba derecha)
    // - t>=3: sin audio
    if (t === 1) setupAudio(btnAudio, instructionAudio, step.audioT1, { forceShow: true });
    else if (t === 2) setupAudio(btnAudio, instructionAudio, step.audioT2, { forceShow: true });
    else setupInstructionAudio(null);

    if (t === 1 || t === 2) {
      positionCornerAudio();
    }

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
      applyPart8ImageStyle(optImgs[o - 1], false);
    }

    mountAudioForTrial(t);
  }

  // seleccionar
  optBoxes.forEach(box => {
    box.onclick = () => {
      if (screenIndex === 0) return;
      const idx = Number(box.dataset.opt);
      selectedIndex = idx;

      optBoxes.forEach((b, imgIndex) => {
        b.classList.remove("selected");
        b.style.border = "none";
        b.style.boxShadow = "none";
        applyPart8ImageStyle(optImgs[imgIndex], false);
      });
      box.classList.add("selected");
      box.style.border = "none";
      box.style.boxShadow = "none";
      applyPart8ImageStyle(optImgs[idx], true);

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

      const writtenPhonologicalResponses = (data.writtenPhonologicalResponses || [])
        .filter((response) => String(response.itemNumber) !== String(WRITTEN_PHONOLOGICAL_ITEMS[screenIndex]?.itemNumber));
      const result = buildWrittenPhonologicalResult(screenIndex, selectedIndex);
      if (result) {
        writtenPhonologicalResponses.push(result);
        writtenPhonologicalResponses.sort((a, b) => {
          if (a.itemNumber === "Ej.") return -1;
          if (b.itemNumber === "Ej.") return 1;
          return Number(a.itemNumber) - Number(b.itemNumber);
        });
      }

      setPartData(partId, { responses, writtenPhonologicalResponses });
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
  const screenEl = document.getElementById("screen");
  const introVoiceLabels = [
    ensurePart9VoiceLabel("part9IntroFemale", "femenino.jpg", "Audio femenino"),
    ensurePart9VoiceLabel("part9IntroMale", "masculino.jpg", "Audio masculino")
  ];

  const part9OptionPositions = [
    { left: "33%", top: "28%" },
    { left: "67%", top: "28%" },
    { left: "33%", top: "72%" },
    { left: "67%", top: "72%" },
  ];

  optBoxes.forEach((box, boxIndex) => {
    box.style.left = part9OptionPositions[boxIndex].left;
    box.style.top = part9OptionPositions[boxIndex].top;
    box.style.right = "auto";
    box.style.bottom = "auto";
    box.style.transform = "translate(-50%, -50%)";
    box.style.width = "400px";
    box.style.height = "330px";
    box.style.padding = "0";
    box.style.border = "none";
    box.style.background = "transparent";
    box.style.boxShadow = "none";
  });
  optImgs.forEach((imgEl) => {
    imgEl.style.maxWidth = "400px";
    imgEl.style.maxHeight = "310px";
    imgEl.style.width = "100%";
    imgEl.style.height = "100%";
    imgEl.style.border = "none";
    imgEl.style.boxShadow = "none";
    imgEl.style.borderRadius = "0";
  });

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

  function ensurePart9VoiceLabel(id, imageSrc, title) {
    let label = document.getElementById(id);
    if (!label && screenEl) {
      label = document.createElement("div");
      label.id = id;
      label.title = title;
      label.setAttribute("aria-label", title);
      screenEl.appendChild(label);
    }
    if (label) {
      label.textContent = "";
      label.style.position = "absolute";
      label.style.left = "50%";
      label.style.top = "calc(50% + 82px)";
      label.style.width = "54px";
      label.style.height = "54px";
      label.style.border = "none";
      label.style.borderRadius = "0";
      label.style.background = `transparent url("${imageSrc}") center / contain no-repeat`;
      label.style.display = "none";
      label.style.alignItems = "center";
      label.style.justifyContent = "center";
      label.style.zIndex = "82";
      label.style.pointerEvents = "none";
    }
    return label;
  }

  function setPart9IntroVoiceLabelsVisible(visible) {
    introVoiceLabels.forEach((label, index) => {
      if (!label) return;
      label.style.display = visible ? "flex" : "none";
      label.style.transform = index === 0 ? "translate(-101px, 0)" : "translate(59px, 0)";
    });
  }

  function fileFor(t, o) {
    const f = filePattern.replace("{t}", String(t)).replace("{o}", String(o));
    return `${basePath}/${f}`;
  }

  function buildOrationalPart9Result(t, currentSelectedIndex) {
    const meta = ORATIONAL_PART9_ITEMS[t];
    if (!meta) return null;

    const selectedLetter = optionLetter(currentSelectedIndex);
    const isCorrect = currentSelectedIndex === meta.correctIndex;
    const responseMode = "D";

    return {
      itemNumber: meta.itemNumber,
      screenNumber: t,
      sentenceType: meta.sentenceType,
      correctLetter: meta.correctLetter,
      selectedLetter,
      selectedImage: fileFor(t, currentSelectedIndex + 1),
      selectedSentence: isCorrect ? meta.correctSentence : "",
      correctSentence: meta.correctSentence,
      isCorrect,
      responseMode,
      assignedScore: meta.itemNumber === "Ej." ? 0 : (isCorrect ? 2 : 0),
      usedHand: getPartData(partId).usedHand || ""
    };
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
    optBoxes.forEach((b, idx) => {
      b.classList.remove("selected");
      b.style.border = "none";
      b.style.background = "transparent";
      b.style.boxShadow = "none";
      if (optImgs[idx]) {
        optImgs[idx].style.border = "none";
        optImgs[idx].style.boxShadow = "none";
      }
    });
    selectedIndex = null;
    btnNext.style.display = requireSel ? "none" : "block";
  }

  function positionCornerAudio() {
    if (!btnAudio) return;
    btnAudio.style.position = "fixed";
    btnAudio.style.left = "14px";
    btnAudio.style.bottom = "84px";
    btnAudio.style.top = "auto";
    btnAudio.style.right = "auto";
    btnAudio.style.width = "56px";
    btnAudio.style.height = "56px";
    btnAudio.style.transform = "none";
    btnAudio.style.zIndex = "9999";
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (screenIndex === 0) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    if (screenIndex === 1) {
      topBar.textContent = `${partLabel} · P 1/1`;
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
    setPart9IntroVoiceLabelsVisible(false);

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
      setPart9IntroVoiceLabelsVisible(true);

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
      optImgs[o - 1].style.border = "none";
      optImgs[o - 1].style.boxShadow = "none";
      optImgs[o - 1].style.borderRadius = "0";
    }

    // screenIndex 1 = ejemplo => practiceAudio1 (audio3.wav)
    if (screenIndex === 1) {
      setupExclusiveAudio(btnAudio, instructionAudio, step.practiceAudio1, { forceShow: true });
      positionCornerAudio();
      return;
    }

    // screenIndex 2..17 = ensayos
    // ensayo 1 debe usar audio4.wav, ensayo 2 => audio5.wav, etc.
    const ensayoAudioNumber = screenIndex + 2;
    const ensayoAudioSrc = step.trialAudioPattern
      ? step.trialAudioPattern.replace("{t}", String(ensayoAudioNumber))
      : null;

    setupExclusiveAudio(btnAudio, instructionAudio, ensayoAudioSrc, { forceShow: true });
    positionCornerAudio();
  }

  optBoxes.forEach(box => {
    box.onclick = () => {
      if (screenIndex === 0) return;

      const idx = Number(box.dataset.opt);
      selectedIndex = idx;

      optBoxes.forEach((b, imgIndex) => {
        b.classList.remove("selected");
        b.style.border = "none";
        b.style.background = "transparent";
        b.style.boxShadow = "none";
        if (optImgs[imgIndex]) {
          optImgs[imgIndex].style.border = "none";
          optImgs[imgIndex].style.boxShadow = "none";
        }
      });
      box.classList.add("selected");
      box.style.border = "none";
      box.style.background = "transparent";
      box.style.boxShadow = "0 0 0 10px rgba(37, 99, 235, 0.32), 0 0 22px rgba(37, 99, 235, 0.55)";

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

      const orationalPart9Responses = (data.orationalPart9Responses || [])
        .filter((response) => String(response.screenNumber) !== String(screenIndex));
      const result = buildOrationalPart9Result(screenIndex, selectedIndex);
      if (result) {
        orationalPart9Responses.push(result);
        orationalPart9Responses.sort((a, b) => Number(a.screenNumber) - Number(b.screenNumber));
      }

      setPartData(partId, { responses, orationalPart9Responses });
    }

    screenIndex++;

    if (screenIndex >= totalScreens) {
      stopAllAudios();
      setPart9IntroVoiceLabelsVisible(false);
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
  const screenEl = document.getElementById("screen");
  const practiceVoiceIcons = [
    ensurePart10PracticeVoiceIcon("part10PracticeFemale", "femenino.jpg", "Audio femenino"),
    ensurePart10PracticeVoiceIcon("part10PracticeMale", "masculino.jpg", "Audio masculino")
  ];

  centerWord.style.inset = "";
  centerWord.style.top = "50%";
  centerWord.style.left = "50%";
  centerWord.style.transform = "translate(-50%, -50%)";
  centerWord.style.fontSize = "52px";
  centerWord.style.maxWidth = "80vw";
  centerWord.style.width = "max-content";
  centerWord.style.textAlign = "center";
  centerWord.style.zIndex = "60";

  optBoxes[0].style.inset = "26% auto auto 34%";
  optBoxes[0].style.left = "34%";
  optBoxes[0].style.top = "26%";
  optBoxes[0].style.right = "auto";
  optBoxes[0].style.bottom = "auto";
  optBoxes[0].style.transform = "translate(-50%, -50%)";

  optBoxes[1].style.inset = "26% auto auto 66%";
  optBoxes[1].style.left = "66%";
  optBoxes[1].style.top = "26%";
  optBoxes[1].style.right = "auto";
  optBoxes[1].style.bottom = "auto";
  optBoxes[1].style.transform = "translate(-50%, -50%)";

  optBoxes[2].style.left = "34%";
  optBoxes[2].style.top = "74%";
  optBoxes[2].style.right = "auto";
  optBoxes[2].style.bottom = "auto";
  optBoxes[2].style.transform = "translate(-50%, -50%)";

  optBoxes[3].style.left = "66%";
  optBoxes[3].style.top = "74%";
  optBoxes[3].style.right = "auto";
  optBoxes[3].style.bottom = "auto";
  optBoxes[3].style.transform = "translate(-50%, -50%)";

  optBoxes.forEach((box) => {
    box.style.width = "400px";
    box.style.height = "330px";
    box.style.padding = "0";
    box.style.border = "none";
    box.style.background = "transparent";
    box.style.boxShadow = "none";
  });

  optImgs.forEach((imgEl) => {
    imgEl.style.maxWidth = "400px";
    imgEl.style.maxHeight = "310px";
    imgEl.style.width = "100%";
    imgEl.style.height = "100%";
    imgEl.style.border = "none";
    imgEl.style.boxShadow = "none";
    imgEl.style.borderRadius = "0";
  });

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

  function ensurePart10PracticeVoiceIcon(id, imageSrc, title) {
    let icon = document.getElementById(id);
    if (!icon && screenEl) {
      icon = document.createElement("div");
      icon.id = id;
      icon.title = title;
      icon.setAttribute("aria-label", title);
      screenEl.appendChild(icon);
    }
    if (icon) {
      icon.style.position = "absolute";
      icon.style.top = "74px";
      icon.style.width = "44px";
      icon.style.height = "44px";
      icon.style.border = "none";
      icon.style.borderRadius = "0";
      icon.style.background = `transparent url("${imageSrc}") center / contain no-repeat`;
      icon.style.display = "none";
      icon.style.zIndex = "72";
      icon.style.pointerEvents = "none";
    }
    return icon;
  }

  function setPart10PracticeVoiceIconsVisible(visible) {
    practiceVoiceIcons.forEach((icon, index) => {
      if (!icon) return;
      icon.style.display = visible ? "block" : "none";
      icon.style.right = index === 0 ? "90px" : "18px";
    });
  }

  function positionPart10PracticeAudioButtons() {
    if (btnAudio) {
      btnAudio.style.position = "absolute";
      btnAudio.style.top = "12px";
      btnAudio.style.right = "84px";
      btnAudio.style.left = "auto";
      btnAudio.style.bottom = "auto";
      btnAudio.style.width = "56px";
      btnAudio.style.height = "56px";
      btnAudio.style.transform = "none";
    }
    if (btnAudio2) {
      btnAudio2.style.position = "absolute";
      btnAudio2.style.top = "12px";
      btnAudio2.style.right = "12px";
      btnAudio2.style.left = "auto";
      btnAudio2.style.bottom = "auto";
      btnAudio2.style.width = "56px";
      btnAudio2.style.height = "56px";
      btnAudio2.style.transform = "none";
    }
  }

  function fileFor(t, o) {
    const f = filePattern.replace("{t}", String(t)).replace("{o}", String(o));
    return `${basePath}/${f}`;
  }

  function buildOrationalPart10Result(t, currentSelectedIndex) {
    const meta = ORATIONAL_PART10_ITEMS[t];
    if (!meta) return null;

    const selectedLetter = optionLetter(currentSelectedIndex);
    const isCorrect = currentSelectedIndex === meta.correctIndex;
    const responseMode = "D";

    return {
      itemNumber: meta.itemNumber,
      screenNumber: t,
      sentenceType: meta.sentenceType,
      correctLetter: meta.correctLetter,
      selectedLetter,
      selectedImage: fileFor(t, currentSelectedIndex + 1),
      selectedSentence: sentences[t - 1] || "",
      correctSentence: meta.correctSentence,
      isCorrect,
      responseMode,
      assignedScore: meta.itemNumber === "Ej." ? 0 : (isCorrect ? 2 : 0),
      usedHand: getPartData(partId).usedHand || ""
    };
  }

  function clearSelection() {
    optBoxes.forEach((b, idx) => {
      b.classList.remove("selected");
      b.style.border = "none";
      b.style.background = "transparent";
      b.style.boxShadow = "none";
      if (optImgs[idx]) {
        optImgs[idx].style.border = "none";
        optImgs[idx].style.boxShadow = "none";
      }
    });
    selectedIndex = null;
    btnNext.style.display = requireSel ? "none" : "block";
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;
    if (screenIndex === 0) topBar.textContent = `${partLabel} · Instrucción`;
    else if (screenIndex === 1) topBar.textContent = `${partLabel} · P 1/1`;
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
    setPart10PracticeVoiceIconsVisible(false);

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
      optImgs[o - 1].style.border = "none";
      optImgs[o - 1].style.boxShadow = "none";
      optImgs[o - 1].style.borderRadius = "0";
    }

    // t=1: ejemplo con 2 audios
    if (t === 1) {
      positionPart10PracticeAudioButtons();
      setPart10PracticeVoiceIconsVisible(true);

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

      optBoxes.forEach((b, imgIndex) => {
        b.classList.remove("selected");
        b.style.border = "none";
        b.style.background = "transparent";
        b.style.boxShadow = "none";
        if (optImgs[imgIndex]) {
          optImgs[imgIndex].style.border = "none";
          optImgs[imgIndex].style.boxShadow = "none";
        }
      });
      box.classList.add("selected");
      box.style.border = "none";
      box.style.background = "transparent";
      box.style.boxShadow = "0 0 0 10px rgba(37, 99, 235, 0.32), 0 0 22px rgba(37, 99, 235, 0.55)";

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

      const orationalPart10Responses = (data.orationalPart10Responses || [])
        .filter((response) => String(response.screenNumber) !== String(screenIndex));
      const result = buildOrationalPart10Result(screenIndex, selectedIndex);
      if (result) {
        orationalPart10Responses.push(result);
        orationalPart10Responses.sort((a, b) => Number(a.screenNumber) - Number(b.screenNumber));
      }

      setPartData(partId, { responses, orationalPart10Responses });
    }

    // antes de pasar de pantalla, detener audios
    pauseAllAudios();

    screenIndex++;

    if (screenIndex >= totalScreens) {
      pauseAllAudios();
      hideAllAudioButtons();
      setPart10PracticeVoiceIconsVisible(false);

      setPartProgress(partId, {
        status: "done",
        screenIndex: totalScreens - 1
      });

      clearPartProgress(partId);
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

  if (btnYes) {
    btnYes.style.fontSize = "117px";
    btnYes.style.padding = "18px 90px";
    btnYes.style.paddingLeft = "113px";
    btnYes.style.paddingRight = "113px";
  }
  if (btnNo) {
    btnNo.style.fontSize = "117px";
    btnNo.style.padding = "18px 90px";
  }

  function buildOralParagraphResult(currentScreenIndex, selectedAnswer) {
    const meta = ORAL_PARAGRAPHS_QUESTIONS[currentScreenIndex];
    if (!meta) return null;

    const isCorrect = selectedAnswer === meta.correctAnswer;

    return {
      storyNumber: meta.storyNumber,
      questionNumber: meta.questionNumber,
      questionText: meta.questionText,
      selectedAnswer,
      correctAnswer: meta.correctAnswer,
      isCorrect,
      countsForScore: meta.countsForScore,
      assignedScore: meta.countsForScore && isCorrect ? 1 : 0
    };
  }

  function updateTopBar() {
    topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · ${screenIndex + 1}/${screens.length}`;
  }

  function clearYesNo() {
    btnYes.classList.remove("selected");
    btnNo.classList.remove("selected");
    selected = null;
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (screenIndex === 0 || screenIndex === 1 || screenIndex === 6) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    if (screenIndex >= 2 && screenIndex <= 5) {
      topBar.textContent = `${partLabel} · E ${screenIndex - 1}/4`;
      return;
    }

    if (screenIndex >= 7 && screenIndex <= 10) {
      topBar.textContent = `${partLabel} · E ${screenIndex - 6}/4`;
    }
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
      if (btnAudio) {
        btnAudio.style.position = "fixed";
        btnAudio.style.left = "14px";
        btnAudio.style.bottom = "84px";
        btnAudio.style.top = "auto";
        btnAudio.style.right = "auto";
        btnAudio.style.width = "56px";
        btnAudio.style.height = "56px";
        btnAudio.style.transform = "none";
        btnAudio.style.zIndex = "9999";
      }

      if (btnAudio2) btnAudio2.style.display = "none";
      return;
    }
  }

  // ---------- respuestas sí/no ----------
  btnYes.onclick = () => {
    selected = "Sí";
    btnYes.classList.add("selected");
    btnNo.classList.remove("selected");
  };

  btnNo.onclick = () => {
    selected = "No";
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
      const oralParagraphResponses = (data.oralParagraphResponses || [])
        .filter((response) => !(response.storyNumber === ORAL_PARAGRAPHS_QUESTIONS[screenIndex]?.storyNumber
          && response.questionNumber === ORAL_PARAGRAPHS_QUESTIONS[screenIndex]?.questionNumber));
      const result = buildOralParagraphResult(screenIndex, selected);
      if (result) {
        oralParagraphResponses.push(result);
        oralParagraphResponses.sort((a, b) => {
          if (a.storyNumber !== b.storyNumber) return Number(a.storyNumber) - Number(b.storyNumber);
          return Number(a.questionNumber) - Number(b.questionNumber);
        });
      }

      setPartData(partId, { responses, oralParagraphResponses });
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

  if (!resume) {
    setPartData(partId, { takes: {} });
  }

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
  const screenEl = document.getElementById("screen");

  const introA1 = step.introAudios?.[0] ?? null;
  const introA2 = step.introAudios?.[1] ?? null;
  const startBeep = (partId === 15 || partId === 16) ? new Audio("/tests/modulo2/assets/beep.wav") : null;
  const repeatIntroGenderIcons = partId === 12
    ? [
      ensureRepeatIntroGenderIcon("repeatIntroFemale", "femenino.jpg", "Audio femenino"),
      ensureRepeatIntroGenderIcon("repeatIntroMale", "masculino.jpg", "Audio masculino")
    ]
    : [];

  const recorder = new WavRecorder();
  let prepared = false;
  let isCapturing = false;
  let psRedTimer = null;
  let isClosing = false;
  let hasRecordedCurrentScreen = false;
  let captureLeadTimer = null;

  function ensureRepeatIntroGenderIcon(id, imageSrc, title) {
    let icon = document.getElementById(id);
    if (!icon && screenEl) {
      icon = document.createElement("div");
      icon.id = id;
      icon.title = title;
      icon.setAttribute("aria-label", title);
      screenEl.appendChild(icon);
    }
    if (icon) {
      icon.style.position = "absolute";
      icon.style.left = "50%";
      icon.style.width = "54px";
      icon.style.height = "54px";
      icon.style.border = "none";
      icon.style.borderRadius = "0";
      icon.style.background = `transparent url("${imageSrc}") center / contain no-repeat`;
      icon.style.display = "none";
      icon.style.zIndex = "82";
      icon.style.pointerEvents = "none";
    }
    return icon;
  }

  function setRepeatIntroGenderIconsVisible(visible) {
    repeatIntroGenderIcons.forEach((icon, index) => {
      if (!icon) return;
      icon.style.display = visible ? "block" : "none";
      icon.style.top = index === 0 ? "calc(50% - 58px)" : "calc(50% + 82px)";
      icon.style.transform = "translate(76px, 0)";
    });
  }

  function stopAllAudios() {
    clearTimeout(captureLeadTimer);
    captureLeadTimer = null;

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

    try {
      if (startBeep) {
        startBeep.pause();
        startBeep.currentTime = 0;
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

  function keyForCurrentScreen(takeNumber = 1) {
    const s = screenIndex + 1;
    const suffix = takeNumber > 1 ? `_${takeNumber}` : "";
    return `part${String(partId).padStart(2, "0")}_s${String(s).padStart(2, "0")}${suffix}.wav`;
  }

  function labelForCurrentScreen() {
    const introOffset = hasIntro ? 1 : 0;

    if (!noExample && screenIndex === introOffset) {
      return "ejemplo";
    }

    const trialsStart = introOffset + (noExample ? 0 : 1);
    const trialNumber = (screenIndex - trialsStart) + 1;
    if (trialNumber > 0) {
      const trialWord = step.trialWords?.[trialNumber - 1];
      return trialWord ? `ensayo_${trialWord}` : `ensayo_${String(trialNumber).padStart(2, "0")}`;
    }
    return `pantalla_${String(screenIndex + 1).padStart(2, "0")}`;
  }

  function takeNumberForCurrentScreen() {
    const data = getPartData(partId);
    const takes = Object.values(data.takes || {});
    return takes.filter((take) => Number(take?.screenIndex) === Number(screenIndex)).length + 1;
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
    recRow.style.display = "flex";
    btnPlay.style.display = "block";

    if (recIcon) recIcon.style.display = "none";
    if (stopBtn) stopBtn.style.display = "none";
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;

    if (hasIntro && screenIndex === 0) {
      topBar.textContent = `${partLabel} · Instrucción`;
      return;
    }

    const introOffset = hasIntro ? 1 : 0;

    if (!noExample && screenIndex === introOffset) {
      topBar.textContent = `${partLabel} · P 1/1`;
      return;
    }

    const trialsStart = introOffset + (noExample ? 0 : 1);
    const ensayoN = (screenIndex - trialsStart) + 1;
    topBar.textContent = `${partLabel} · E ${ensayoN}/${totalTrials}`;
  }

  async function ensurePrepared() {
    if (prepared) return;
    await recorder.prepare({ numChannels: 1 });
    prepared = true;
  }

  function showMicError(err) {
    console.error(err);

    let message = "No se pudo acceder al micr\u00f3fono.";
    if (err?.name === "NotAllowedError") {
      message = "Permiso de micr\u00f3fono bloqueado en el navegador.";
    } else if (err?.name === "NotFoundError") {
      message = "No se encontr\u00f3 ning\u00fan micr\u00f3fono disponible.";
    } else if (err?.name === "NotReadableError") {
      message = "El micr\u00f3fono est\u00e1 ocupado por otra aplicaci\u00f3n.";
    } else if (err?.name === "SecurityError") {
      message = "El navegador bloque\u00f3 el acceso al micr\u00f3fono por seguridad.";
    } else if (err?.message) {
      message = err.message;
    }

    alert(message);
  }

  async function startCapture(showControls = true) {
    console.log("startCapture() => inicia grabación");

    if (isCapturing) {
      if (showControls) showRecUI();
      return;
    }

    await ensurePrepared();
    recorder.beginCapture();
    isCapturing = true;
    hasRecordedCurrentScreen = false;

    if (showControls) {
      showRecUI();
    }

    console.log("recRow display:", recRow.style.display);
  }

  async function stopAndSave() {
    if (!isCapturing) return false;

    const blob = await recorder.stop();
    isCapturing = false;
    hideRecUI();

    if (blob) {
      const takeNumber = takeNumberForCurrentScreen();
      const key = keyForCurrentScreen(takeNumber);
      await saveAudioBlob(key, blob);

      const data = getPartData(partId);
      const takes = data.takes || {};
      const takeId = `${screenIndex}_${takeNumber}`;
      const label = labelForCurrentScreen();
      takes[takeId] = {
        key,
        screenIndex,
        label,
        takeNumber,
        isExample: label === "ejemplo"
      };
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

    if (partId === 12) {
      const exported = await exportRepeatAudioZip("", 12, 30, "Repeticion_de_palabras");
      if (exported) {
        await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
      }
    }

    if (partId === 13) {
      const exported = await exportRepeatAudioZip("", 13, 31, "Repeticion_de_palabras_complejas");
      if (exported) {
        await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
      }
    }

    if (partId === 14) {
      const exported = await exportRepeatAudioZip("", 14, 32, "Repeticion_de_no_palabras");
      if (exported) {
        await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
      }
    }

    if (partId === 15) {
      const exported = await exportRepeatAudioZip("", 15, 33, "Repeticion_de_digitos");
      if (exported) {
        await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
      }
    }

    if (partId === 16) {
      const exported = await exportRepeatAudioZip("", 16, 34, "Repeticion_de_oraciones");
      if (exported) {
        await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
      }
    }

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
    setRepeatIntroGenderIconsVisible(false);

    isCapturing = false;
    hideRecUI();
    hasRecordedCurrentScreen = false;

    if (hasIntro && screenIndex === 0) {
      btnPlay.style.display = "none";
      recRow.style.display = "none";

      if (Array.isArray(step.introAudios) && step.introAudios.length === 2) {
        document.body.classList.add("stackCenterAudios");
        setRepeatIntroGenderIconsVisible(partId === 12);
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

        await ensurePrepared();

        stopAllAudios();
        clearPromptAudio();

        promptAudio.onended = async () => {
          if (isCapturing) {
            showRecUI();
          } else {
            console.log("audio terminado -> startCapture()");
            if (startBeep) {
              try {
                startBeep.currentTime = 0;
                await startBeep.play();
              } catch (e) {
                console.warn("No se pudo reproducir beep.wav", e);
              }
            }
            await startCapture(true);
          }
        };

        promptAudio.onerror = () => {
          console.error("Error cargando audio:", a, promptAudio.error);
        };

        const scheduleEarlyCapture = () => {
          clearTimeout(captureLeadTimer);
          captureLeadTimer = null;

          const durationMs = Number.isFinite(promptAudio.duration) ? promptAudio.duration * 1000 : 0;
          if (durationMs > 3500) {
            const leadMs = Math.min(3000, Math.max(1000, durationMs - 500));
            const delayMs = Math.max(0, durationMs - leadMs);
            captureLeadTimer = setTimeout(async () => {
              if (!isCapturing) {
                console.log("inicio anticipado de grabacion sin mostrar controles");
                await startCapture(false);
              }
            }, delayMs);
          }
        };

        promptAudio.onloadedmetadata = scheduleEarlyCapture;
        promptAudio.ontimeupdate = async () => {
          const duration = Number(promptAudio.duration);
          if (!Number.isFinite(duration) || duration <= 0 || isCapturing) return;
          if ((duration - promptAudio.currentTime) <= 3) {
            clearTimeout(captureLeadTimer);
            captureLeadTimer = null;
            console.log("inicio anticipado de grabacion por timeupdate sin mostrar controles");
            await startCapture(false);
          }
        };

        promptAudio.src = a;
        promptAudio.load();
        promptAudio.currentTime = 0;
        scheduleEarlyCapture();
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
  let psRedTimer = null;

  async function ensurePrepared() {
    if (prepared) return;
    await recorder.prepare({ numChannels: 1 });
    prepared = true;
  }

  async function connectObjectCueAudiosToRecorder() {
    await ensurePrepared();
    [audioI, audioP, audioPS, audioPF].forEach((audioEl) => {
      recorder.connectAudioElement(audioEl);
    });
  }

  function showMicError(err) {
    console.error(err);

    let message = "No se pudo acceder al micr\u00f3fono.";
    if (err?.name === "NotAllowedError") {
      message = "Permiso de micr\u00f3fono bloqueado en el navegador.";
    } else if (err?.name === "NotFoundError") {
      message = "No se encontr\u00f3 ning\u00fan micr\u00f3fono disponible.";
    } else if (err?.name === "NotReadableError") {
      message = "El micr\u00f3fono est\u00e1 ocupado por otra aplicaci\u00f3n.";
    } else if (err?.name === "SecurityError") {
      message = "El navegador bloque\u00f3 el acceso al micr\u00f3fono por seguridad.";
    } else if (err?.message) {
      message = err.message;
    }

    alert(message);
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
        P: "",
        PS: step.instrPS || "",
        PF: step.instrPF || "",
        labels: {
          I: "I",
          P: "",
          PS: "PS",
          PF: "PF"
        },
        show: {
          I: true,
          P: false,
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
        P: "",
        PS: ensayoAudio(startAudioNumber + 1),  // PS
        PF: ensayoAudio(startAudioNumber + 2),  // PF
        labels: {
          I: "PF2",
          P: "",
          PS: "PS",
          PF: "PF"
        },
        show: {
          I: true,
          P: false,
          PS: true,
          PF: true
        }
      };
    }

    return {
      I: "",
      P: "",
      PS: ensayoAudio(startAudioNumber + 1),
      PF: ensayoAudio(startAudioNumber + 2),
      labels: {
        I: "",
        P: "",
        PS: "PS",
        PF: "PF"
      },
      show: {
        I: false,
        P: false,
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

  function resetPsVisualState() {
    clearTimeout(psRedTimer);
    if (iconPS) iconPS.style.filter = "none";
    if (boxPS) boxPS.style.color = "";
    const labelEl = boxPS?.querySelector(".label") || boxPS?.querySelector("span") || boxPS?.querySelector("p") || boxPS?.firstElementChild;
    if (labelEl && labelEl.tagName !== "IMG") {
      labelEl.style.color = "";
    }
  }

  function schedulePsRedState() {
    resetPsVisualState();
    psRedTimer = setTimeout(() => {
      if (iconPS) {
        iconPS.style.filter = "invert(17%) sepia(86%) saturate(7471%) hue-rotate(355deg) brightness(92%) contrast(122%)";
      }
      if (boxPS) boxPS.style.color = "#dc2626";
      const labelEl = boxPS?.querySelector(".label") || boxPS?.querySelector("span") || boxPS?.querySelector("p") || boxPS?.firstElementChild;
      if (labelEl && labelEl.tagName !== "IMG") {
        labelEl.style.color = "#dc2626";
      }
    }, 10000);
  }

  function updateTopBar() {
    const partLabel = `Parte ${String(partId).padStart(2, "0")}`;
    if (n === 1) {
      topBar.textContent = `${partLabel} · P 1/1`;
    } else {
      topBar.textContent = `${partLabel} · E ${n - 1}/${last - 1}`;
    }
  }

  async function startCapture() {
    await connectObjectCueAudiosToRecorder();
    recorder.beginCapture();
    isCapturing = true;
    if (recIcon) recIcon.style.display = "block";
    if (stopBtn) stopBtn.style.display = "block";
  }

  async function stopAndSave() {
    if (!isCapturing) return;
    isCapturing = false;

    if (recIcon) recIcon.style.display = "none";
    if (stopBtn) stopBtn.style.display = "none";

    const blob = await recorder.stop();
    if (blob) {
      const key = wavKey(n);
      await saveAudioBlob(key, blob);

      const data = getPartData(partId);
      const takes = data.takes || {};
      takes[String(n)] = {
        key,
        image: imageFile(n),
        screenIndex: n - 1,
        label: n === 1 ? "ejemplo" : `ensayo_${String(n - 1).padStart(2, "0")}`
      };
      setPartData(partId, { takes });
    }
  }

  function reorderInstructionBoxes(currentN) {
    const container = boxP.parentElement;
    if (!container) return;

    if (currentN === 13) {
      // Orden deseado: PS, PF, PF2
      container.appendChild(boxPS);
      container.appendChild(boxPF);
      container.appendChild(boxI); // boxI se usa como PF2
    } else if (currentN === 1) {
      // P 1/1: I, PS, PF
      container.appendChild(boxI);
      container.appendChild(boxPS);
      container.appendChild(boxPF);
    } else {
      // Ensayos normales: PS, PF
      container.appendChild(boxPS);
      container.appendChild(boxPF);
      container.appendChild(boxI); // queda oculto igual
    }
  }

  async function render() {
    pauseAllInstructionAudios();
    resetPsVisualState();
    if (recIcon) recIcon.style.display = "none";
    if (stopBtn) stopBtn.style.display = "none";

    updateTopBar();
    imgEl.src = imageFile(n);

    mountInstr(n);
    reorderInstructionBoxes(n);
    schedulePsRedState();

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
    resetPsVisualState();

    if (isCapturing) {
      await stopAndSave();
    }

    n++;

    if (n > last) {
      pauseAllInstructionAudios();
      resetPsVisualState();

      setPartProgress(partId, {
        status: "done",
        itemIndex: last
      });

      await recorder.close();

      clearPartProgress(partId);
      const exported = await exportRepeatAudioZip("", 17, 35, "Denominacion_de_objetos");
      if (exported) {
        await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
      }
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

  render().catch(showMicError);
}

// 14.-
function runImageAutoRecordSimple(step) {
  showLayout("img_record_simple");

  const imgEl = document.getElementById("t18Image");
  const audioIcon = document.getElementById("t18InstrAudio");
  const audioEl = document.getElementById("t18AudioEl");
  const recIcon = document.getElementById("t18Recording");
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

  function setRecordingUI() {
    if (recIcon) recIcon.style.display = "block";
    if (stopBtn) stopBtn.style.display = "block";
  }

  function setStoppedUI() {
    if (recIcon) recIcon.style.display = "none";
    if (stopBtn) stopBtn.style.display = "none";
  }

  function imageFile(num) {
    return `${basePath}/${pattern.replace("{n}", String(num))}`;
  }

  function wavKey(num) {
    return `part${String(partId).padStart(2, "0")}_item${String(num).padStart(3, "0")}.wav`;
  }

  function updateTopBar() {
    const label = `Parte ${String(partId).padStart(2, "0")}`;
    if (n === first) {
      topBar.textContent = `${label} · P 1/1`;
    } else {
      topBar.textContent = `${label} · E ${n - first}/${last - first}`;
    }
  }

  async function ensurePrepared() {
    if (prepared) return;
    await recorder.prepare({ numChannels: 1 });
    prepared = true;
  }

  async function connectSimpleInstructionAudioToRecorder() {
    await ensurePrepared();
    recorder.connectAudioElement(audioEl);
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
    await connectSimpleInstructionAudioToRecorder();
    recorder.beginCapture();
    isCapturing = true;
    setRecordingUI();
  }

  async function stopAndSave() {
    if (!isCapturing) return;

    isCapturing = false;
    setStoppedUI();
    const currentN = n;

    const blob = await recorder.stop();
    if (blob) {
      const key = wavKey(currentN);
      await saveAudioBlob(key, blob);

      const data = getPartData(partId);
      const takes = data.takes || {};
      takes[String(currentN)] = {
        key,
        image: imageFile(currentN),
        screenIndex: currentN - first,
        label: currentN === first ? "ejemplo" : `ensayo_${String(currentN - first).padStart(2, "0")}`
      };
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
    } else {
      setStoppedUI();
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
        const exported = await exportRepeatAudioZip("", 18, 36, "Denominacion_de_acciones");
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
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

      if (window.currentInstructionAudio) {
        window.currentInstructionAudio.pause();
        window.currentInstructionAudio.currentTime = 0;
        window.currentInstructionAudio = null;
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

  async function startRec(options = {}) {
    try {
      const { stopAudio = true } = options;

      if (isRecording) return;

      if (stopAudio) stopAllTestAudios();

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

  function setupAutoRecordInstructionAudio() {
    setupInstructionAudio(step.instructionAudio);

    if (!step.instructionAudio || typeof btnAudio === "undefined" || !btnAudio) return;

    btnAudio.onclick = async () => {
      try {
        if (window.currentInstructionAudio) {
          window.currentInstructionAudio.pause();
          window.currentInstructionAudio.currentTime = 0;
        }

        const a = new Audio(step.instructionAudio);
        window.currentInstructionAudio = a;
        a.onended = async () => {
          if (window.currentInstructionAudio === a) window.currentInstructionAudio = null;
          if (!isRecording && !hasAudio) {
            await startRec({ stopAudio: false });
          }
        };

        await a.play();
      } catch (err) {
        console.error("Error audio:", err);
      }
    };
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
        const data = getPartData(partId);
        const takes = data.takes || {};
        takes["0"] = {
          key,
          screenIndex: 0,
          label: "descripcion_oral_imagen"
        };
        setPartData(partId, { takes });
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
    const exported = await exportRepeatAudioZip("", 19, 37, "Descripcion_oral_de_una_imagen");
    if (exported) {
      await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
    }
    clearPartData(partId);
    finishCurrentPart();

  };

  setIdleUI();
  setupAutoRecordInstructionAudio();
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

    if ((isExampleScreen() || (!hasExample && screenIndex === 0)) && step.instructionAudio) {
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
          screenIndex,
          label: isExampleScreen() ? "ejemplo" : `ensayo_${String(hasExample ? screenIndex : screenIndex + 1).padStart(2, "0")}_${currentWord}`,
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
      topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · P 1/1`;
    } else {
      const currentRealIndex = hasExample ? screenIndex : (screenIndex + 1);
      const noWordLabel = partId === 23 ? " (No palabra)" : "";
      topBar.textContent = `Parte ${String(partId).padStart(2, "0")} · E ${currentRealIndex}/${totalRealWords}${noWordLabel}`;
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
    btnFullscreen.style.display = "block";
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

      if (partId === 20) {
        const exported = await exportRepeatAudioZip("", 20, 38, "Lectura_de_palabras_aisladas");
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 21) {
        const exported = await exportRepeatAudioZip("", 21, 39, "Lectura_de_palabras_complejas");
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 22) {
        const exported = await exportRepeatAudioZip("", 22, 40, "Lectura_de_palabras_funcionales");
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
      }

      if (partId === 23) {
        const exported = await exportRepeatAudioZip("", 23, 41, "Lectura_de_no_palabras");
        if (exported) {
          await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
        }
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

function runWritingCanvasFlow(step, config = {}) {
  const canvas = document.getElementById("writingCanvas");
  const downloadBtn = document.getElementById("downloadWritingBtn");
  const ctx = canvas.getContext("2d");

  const screens = config.screens || [{ label: "P 1/1", image: null, audio: null }];
  let screenIndex = 0;
  let drawing = false;
  let strokes = [];
  let backgroundImage = null;

  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnFullscreen.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";
  btnNext.style.display = "block";

  function setCanvasSize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawLine(y) {
    const w = canvas.clientWidth;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.12, y);
    ctx.lineTo(w * 0.88, y);
    ctx.stroke();
  }

  function drawLineAt(x1, x2, y) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();
  }

  function drawBackground() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const screen = screens[screenIndex] || {};

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);

    if (backgroundImage) {
      const maxW = w * (screen.imageMaxW ?? 0.72);
      const maxH = h * (screen.imageMaxH ?? 0.48);
      const scale = Math.min(maxW / backgroundImage.naturalWidth, maxH / backgroundImage.naturalHeight);
      const imgW = backgroundImage.naturalWidth * scale;
      const imgH = backgroundImage.naturalHeight * scale;
      ctx.drawImage(backgroundImage, (w - imgW) / 2, h * (screen.imageY ?? 0.08), imgW, imgH);
    }

    if (screen.mode === "copy") {
      drawLine(h * 0.48);
      drawLine(h * 0.64);
    }

    if (screen.mode === "copy_prompt") {
      ctx.fillStyle = "#111";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.font = screen.promptFont || "700 34px Arial, sans-serif";

      if (screen.layout === "word_columns") {
        const words = Array.isArray(screen.words) ? screen.words : [];
        const xs = [0.24, 0.50, 0.76];
        words.forEach((word, index) => {
          const x = w * (xs[index] ?? 0.5);
          ctx.fillText(word, x, h * 0.24);
          drawLineAt(x - w * 0.12, x + w * 0.12, h * 0.42);
        });
        return;
      }

      if (screen.layout === "letter_columns") {
        const letters = Array.isArray(screen.letters) ? screen.letters : [];
        const count = Math.max(letters.length, 1);
        letters.forEach((letter, index) => {
          const x = w * ((index + 1) / (count + 1));
          const label = screen.letterLabels?.[index];
          if (label) {
            ctx.save();
            ctx.font = screen.labelFont || "700 30px Arial, sans-serif";
            ctx.fillText(label, x, h * (screen.labelY ?? 0.15));
            ctx.restore();
            ctx.font = screen.promptFont || "700 34px Arial, sans-serif";
          }
          ctx.fillText(letter, x, h * (screen.letterY ?? 0.25));
          drawLineAt(x - w * 0.055, x + w * 0.055, h * (screen.lineY ?? 0.43));
        });
        return;
      }

      const lines = Array.isArray(screen.promptLines) ? screen.promptLines : [screen.prompt || ""];
      const startY = h * (screen.promptStartY ?? 0.16);
      const gap = Number(screen.promptGap ?? 44);
      lines.forEach((line, index) => {
        if (Array.isArray(screen.promptFonts) && screen.promptFonts[index]) {
          ctx.font = screen.promptFonts[index];
        } else {
          ctx.font = screen.promptFont || "700 34px Arial, sans-serif";
        }
        ctx.fillText(line, w / 2, startY + (index * gap));
      });

      const writingLines = Array.isArray(screen.writingLines) ? screen.writingLines : [0.48];
      writingLines.forEach((lineY) => drawLine(h * lineY));
    }

    if (screen.mode === "label") {
      drawLine(h * 0.78);
    }

    if (screen.mode === "dictation") {
      drawLine(h * 0.58);
    }
  }

  function drawStrokes() {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (const stroke of strokes) {
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
    drawBackground();
    drawStrokes();
  }

  function pointerToCanvas(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function startStroke(e) {
    drawing = true;
    strokes.push([{ ...pointerToCanvas(e), t: Date.now() }]);
    renderCanvas();
  }

  function addPoint(e) {
    if (!drawing) return;
    const stroke = strokes[strokes.length - 1];
    stroke.push({ ...pointerToCanvas(e), t: Date.now() });
    renderCanvas();
  }

  function endStroke() {
    drawing = false;
  }

  function bindDrawing() {
    canvas.onpointerdown = (e) => {
      canvas.setPointerCapture(e.pointerId);
      startStroke(e);
    };
    canvas.onpointermove = addPoint;
    canvas.onpointerup = endStroke;
    canvas.onpointercancel = endStroke;
    canvas.onpointerleave = endStroke;
  }

  function downloadCanvas() {
    const link = document.createElement("a");
    link.download = `modulo2_parte${String(partId).padStart(2, "0")}_pantalla${String(screenIndex + 1).padStart(2, "0")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function saveCurrentCanvasImage() {
    const screen = screens[screenIndex] || {};
    const data = getPartData(partId);
    const writingImages = data.writingImages || {};

    writingImages[String(screenIndex)] = {
      screenIndex,
      label: screen.label || `pantalla_${screenIndex + 1}`,
      dataUrl: canvas.toDataURL("image/png"),
      savedAt: new Date().toISOString()
    };

    setPartData(partId, {
      ...data,
      writingImages,
      screenIndex,
      lastImage: writingImages[String(screenIndex)].dataUrl,
      savedAt: writingImages[String(screenIndex)].savedAt
    });
  }

  async function exportCurrentWritingZip() {
    const exportMap = {
      24: { testNumber: 42, label: "Copia" },
      25: { testNumber: 43, label: "Etiquetado_de_imagenes" },
      26: { testNumber: 44, label: "Escritura_al_dictado" },
      27: { testNumber: 45, label: "Descripcion_escrita_de_una_imagen" }
    };
    const config = exportMap[partId];
    if (!config) return;

    const exported = await exportWritingImagesZip(partId, config.testNumber, config.label);
    if (exported) {
      await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
    }
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      if (!src) {
        backgroundImage = null;
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        backgroundImage = img;
        resolve();
      };
      img.onerror = () => {
        backgroundImage = null;
        resolve();
      };
      img.src = src;
    });
  }

  async function renderScreen() {
    const screen = screens[screenIndex] || {};

    showLayout("writing_canvas");
    if (downloadBtn) downloadBtn.style.display = "none";
    canvas.style.border = "none";
    setCanvasSize();
    strokes = [];

    topBar.textContent = `Parte ${String(partId).padStart(2, "0")} Â· ${screen.label || ""}`;
    setPartProgress(partId, {
      status: "in_progress",
      screenIndex,
      totalScreens: screens.length
    });

    setupInstructionAudio(screen.audio || null);
    await loadImage(screen.image || null);
    renderCanvas();
  }

  if (downloadBtn) downloadBtn.onclick = downloadCanvas;
  bindDrawing();

  btnNext.onclick = async () => {
    saveCurrentCanvasImage();

    screenIndex++;
    if (screenIndex >= screens.length) {
      setPartProgress(partId, { status: "done", screenIndex: screens.length - 1 });
      await exportCurrentWritingZip();
      finishCurrentPart();
      return;
    }

    await renderScreen();
  };

  window.addEventListener("resize", renderCanvas);
  renderScreen();
}

function runCopyCanvas(step) {
  runWritingCanvasFlow(step, {
    screens: [
      {
        label: "P 1/3",
        mode: "copy_prompt",
        promptLines: ["Por favor, escriba su nombre"],
        writingLines: [0.48]
      },
      {
        label: "P 2/4",
        mode: "copy_prompt",
        layout: "letter_columns",
        promptFont: "700 52px Arial, sans-serif",
        letters: ["T", "C", "H", "A", "Y"],
        letterY: 0.24,
        lineY: 0.43
      },
      {
        label: "P 3/4",
        mode: "copy_prompt",
        layout: "letter_columns",
        promptFont: "700 52px Arial, sans-serif",
        letters: ["d", "e", "r", "b", "f", "g"],
        letterLabels: ["Ejemplo"],
        labelY: 0.14,
        letterY: 0.24,
        lineY: 0.43
      },
      {
        label: "P 4/4",
        mode: "copy_prompt",
        layout: "word_columns",
        promptFont: "700 44px Arial, sans-serif",
        words: ["pie", "taza", "salvavidas"]
      }
    ]
  });
}

function runImageLabelingCanvas(step) {
  const images = step.images || [];
  const screens = images.map((image, index) => ({
    label: index === 0 ? "P 1/1" : `E ${index}/${Math.max(images.length - 1, 1)}`,
    mode: "label",
    image,
    imageMaxW: 0.86,
    imageMaxH: 0.62,
    imageY: 0.04
  }));

  runWritingCanvasFlow(step, { screens });
}

function runDictationCanvas(step) {
  const screens = [];
  if (step.exampleAudio) {
    screens.push({ label: "P 1/1", mode: "dictation", audio: step.exampleAudio });
  }

  (step.trialAudios || []).forEach((audio, index, arr) => {
    screens.push({ label: `E ${index + 1}/${arr.length}`, mode: "dictation", audio });
  });

  runWritingCanvasFlow(step, { screens });
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
      topBar.textContent = `${partLabel} · P 1/1`;
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

  btnFullscreen.style.display = "block";
  btnFullscreen.onclick = () => toggleFullscreen();
  btnNext.style.display = "block";

  const btnAudio = document.getElementById("btnAudio");
  const audioTop = document.getElementById("instructionAudio");
  const textInstruction = document.getElementById("textInstruction");
  const textImageWrap = document.getElementById("textImageWrap");
  const textImage = document.getElementById("textImage");
  const textAnswer = document.getElementById("textAnswer");
  const textBoxWrap = document.getElementById("textBoxWrap");
  const textCanvasLabel = document.getElementById("textCanvasLabel");
  const textWriteCanvas = document.getElementById("textWriteCanvas");
  const textWriteCtx = textWriteCanvas?.getContext("2d");
  let drawing = false;
  let strokes = [];

  topBar.textContent = `Parte ${String(partId).padStart(2, "0")} - ${part.name}`;

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

  textInstruction.textContent = "";
  textImage.src = step.image;
  if (textImageWrap) {
    textImageWrap.style.left = "25%";
    textImageWrap.style.top = "50%";
    textImageWrap.style.width = "58vw";
    textImageWrap.style.maxWidth = "835px";
    textImageWrap.style.transform = "translate(-50%, -50%)";
  }
  if (textImage) {
    textImage.style.width = "100%";
    textImage.style.maxWidth = "835px";
    textImage.style.maxHeight = "92vh";
  }
  if (textAnswer) {
    textAnswer.value = "";
    textAnswer.style.display = "none";
  }
  if (textBoxWrap) {
    textBoxWrap.style.display = "block";
    textBoxWrap.style.left = "74%";
    textBoxWrap.style.top = "50%";
    textBoxWrap.style.width = "44vw";
    textBoxWrap.style.height = "76vh";
    textBoxWrap.style.maxWidth = "780px";
    textBoxWrap.style.transform = "translate(-50%, -50%)";
  }
  if (textWriteCanvas) {
    textWriteCanvas.style.display = "block";
  }
  if (textCanvasLabel) {
    textCanvasLabel.style.display = "block";
  }

  function resizeTextCanvas() {
    if (!textWriteCanvas || !textWriteCtx) return;
    const rect = textWriteCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    textWriteCanvas.width = Math.floor(rect.width * dpr);
    textWriteCanvas.height = Math.floor(rect.height * dpr);
    textWriteCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    renderTextCanvas();
  }

  function renderTextCanvas() {
    if (!textWriteCanvas || !textWriteCtx) return;
    const w = textWriteCanvas.clientWidth;
    const h = textWriteCanvas.clientHeight;
    textWriteCtx.clearRect(0, 0, w, h);
    textWriteCtx.fillStyle = "#fff";
    textWriteCtx.fillRect(0, 0, w, h);
    textWriteCtx.strokeStyle = "#000";
    textWriteCtx.lineWidth = 4;
    textWriteCtx.lineCap = "round";
    textWriteCtx.lineJoin = "round";
    strokes.forEach((stroke) => {
      if (!stroke || stroke.length < 2) return;
      textWriteCtx.beginPath();
      textWriteCtx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        textWriteCtx.lineTo(stroke[i].x, stroke[i].y);
      }
      textWriteCtx.stroke();
    });
  }

  function pointFromEvent(e) {
    const rect = textWriteCanvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  if (textWriteCanvas) {
    textWriteCanvas.onpointerdown = (e) => {
      drawing = true;
      textWriteCanvas.setPointerCapture(e.pointerId);
      strokes.push([pointFromEvent(e)]);
      renderTextCanvas();
    };
    textWriteCanvas.onpointermove = (e) => {
      if (!drawing) return;
      strokes[strokes.length - 1].push(pointFromEvent(e));
      renderTextCanvas();
    };
    textWriteCanvas.onpointerup = () => { drawing = false; };
    textWriteCanvas.onpointercancel = () => { drawing = false; };
    textWriteCanvas.onpointerleave = () => { drawing = false; };
    setTimeout(resizeTextCanvas, 50);
    window.addEventListener("resize", resizeTextCanvas);
  }

  setPartProgress(partId, { status: "in_progress", stepIndex: 0, totalSteps: 1 });

  btnNext.onclick = async () => {
    if (textWriteCanvas) {
      renderTextCanvas();
      const writingImages = {
        0: {
          screenIndex: 0,
          label: "descripcion_escrita",
          dataUrl: textWriteCanvas.toDataURL("image/png"),
          savedAt: new Date().toISOString()
        }
      };
      setPartData(partId, { writingImages });
    }
    setPartProgress(partId, { status: "done" });
    stopAllAudios();
    const exported = await exportWritingImagesZip(partId, 45, "Descripcion_escrita_de_una_imagen");
    if (exported) {
      await wait(ZIP_DOWNLOAD_CLOSE_DELAY_MS);
    }
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

  const lineBisectionReference = [
    { lineNumber: 1, y: 228.5, startX: 238, endX: 645, centerX: 441.5, unitPx: 33.5 },
    { lineNumber: 2, y: 313.5, startX: 6, endX: 343, centerX: 174.5, unitPx: 33.25 },
    { lineNumber: 3, y: 404.5, startX: 245, endX: 910, centerX: 577.5, unitPx: 33.25 }
  ];

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

  function canvasPointToImagePoint(point) {
    return {
      x: (point.x / canvas.width) * img.naturalWidth,
      y: (point.y / canvas.height) * img.naturalHeight
    };
  }

  function median(values) {
    const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
    if (!sorted.length) return null;
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  function findCutXForLine(line) {
    const candidates = [];
    const nearLineTolerancePx = 18;

    for (const stroke of patientStrokes) {
      if (!stroke || stroke.length < 2) continue;

      for (let i = 1; i < stroke.length; i++) {
        const p1 = canvasPointToImagePoint(stroke[i - 1]);
        const p2 = canvasPointToImagePoint(stroke[i]);
        const minY = Math.min(p1.y, p2.y);
        const maxY = Math.max(p1.y, p2.y);

        if (line.y >= minY && line.y <= maxY && Math.abs(p2.y - p1.y) > 0.01) {
          const ratio = (line.y - p1.y) / (p2.y - p1.y);
          const x = p1.x + ratio * (p2.x - p1.x);
          if (x >= line.startX - 25 && x <= line.endX + 25) {
            candidates.push(x);
          }
        } else {
          if (Math.abs(p1.y - line.y) <= nearLineTolerancePx && p1.x >= line.startX - 25 && p1.x <= line.endX + 25) {
            candidates.push(p1.x);
          }
          if (Math.abs(p2.y - line.y) <= nearLineTolerancePx && p2.x >= line.startX - 25 && p2.x <= line.endX + 25) {
            candidates.push(p2.x);
          }
        }
      }
    }

    return median(candidates);
  }

  function analyzeLineBisection() {
    return lineBisectionReference.map((line) => {
      const cutX = findCutXForLine(line);
      const hasCut = Number.isFinite(cutX);
      const deviationPx = hasCut ? cutX - line.centerX : null;
      const deviationUnits = hasCut ? deviationPx / line.unitPx : null;
      const direction = hasCut && deviationUnits !== 0 ? Math.sign(deviationUnits) : 0;
      const absDeviation = hasCut ? Math.abs(deviationUnits) : null;
      const scaleScore = hasCut
        ? (absDeviation <= 0.5 ? 0 : direction * (absDeviation <= 1.5 ? 1 : 2))
        : null;
      const isExact = hasCut && scaleScore === 0;

      return {
        lineNumber: line.lineNumber,
        expectedCenterX: Number(line.centerX.toFixed(2)),
        cutX: hasCut ? Number(cutX.toFixed(2)) : null,
        deviationPx: hasCut ? Number(deviationPx.toFixed(2)) : null,
        deviationUnits: hasCut ? Number(deviationUnits.toFixed(2)) : null,
        scaleScore,
        isExact,
        assignedScore: scaleScore
      };
    });
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
    const lineBisectionResults = analyzeLineBisection();
    setPartData(partId, {
      ...data,
      baseImage: step.baseImage,
      scaleImage: step.scaleImage || null,
      patientStrokes,
      patientImage: canvas.toDataURL("image/png"),
      lineBisectionResults,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      savedAt: new Date().toISOString()
    });
  }

  btnNext.onclick = async () => {
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
  const key = "CAT_PROGRESS_V1";
  try {
    const data = JSON.parse(localStorage.getItem(key)) || {};
    if (data.parts) delete data.parts[partId];
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    localStorage.removeItem(`partProgress_${partId}`);
  }
}

function clearPartData(partId) {
  const key = "CAT_PROGRESS_V1";
  try {
    const data = JSON.parse(localStorage.getItem(key)) || {};
    if (data.partData) delete data.partData[partId];
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    localStorage.removeItem(`partData_${partId}`);
  }
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
else if (step.type === "dictation_text") runDictationCanvas(step);
else if (step.type === "image_labeling") runImageLabelingCanvas(step);
else if (step.type === "writing_copy_canvas") runCopyCanvas(step);
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
