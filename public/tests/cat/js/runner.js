import { CAT } from "./cat_script.js";
import { getPartProgress, setPartProgress } from "./storage.js";
import { getPartData, setPartData } from "./storage.js";
import { WavRecorder } from "./audio_recorder_wav.js";
import { saveAudioBlob } from "./audio_store_idb.js";


const topBar = document.getElementById("topBar");
const btnNext = document.getElementById("btnNext");
const btnFullscreen = document.getElementById("btnFullscreen");

const layoutSemantic = document.getElementById("layoutSemantic");
const layoutCalc = document.getElementById("layoutCalc");
const layoutTextImage = document.getElementById("layoutTextImage");
const layoutInstruction = document.getElementById("layoutInstruction");
const layoutDictation = document.getElementById("layoutDictation");
const layoutAudioRecord = document.getElementById("layoutAudioRecord");

const btnAudio = document.getElementById("btnAudio");
const instructionAudio = document.getElementById("instructionAudio");

function showLayout(which) {
  layoutSemantic.style.display = (which === "semantic") ? "block" : "none";
  layoutCalc.style.display = (which === "calc") ? "block" : "none";
  layoutTextImage.style.display = (which === "text_image") ? "block" : "none";
  layoutInstruction.style.display = (which === "instruction") ? "block" : "none";
  layoutDictation.style.display = (which === "dictation") ? "block" : "none";
  layoutAudioRecord.style.display = (which === "audio_record") ? "block" : "none";

}



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

function setupInstructionAudio(audioPath) {
  if (!audioPath) {
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


const url = new URL(window.location.href);
const partId = Number(url.searchParams.get("part") || "0");
const resume = url.searchParams.get("resume") === "1";

const part = CAT.parts.find(p => p.id === partId);
if (!part) throw new Error("Parte no encontrada");

const step = part.steps?.[0];
if (!step) throw new Error("Parte sin steps");

/* =========================
   SEMANTIC MATCH (Parte 2)
   - Seleccionar NO avanza
   - Muestra flecha para avanzar
   - Fullscreen solo ensayo 1
========================= */
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
    // solo ensayo 1
    btnFullscreen.style.display = (trialIndex === 0) ? "block" : "none";
  }

  function renderTrial() {
    clearMarks();

    const t = trials[trialIndex];
    centerImg.src = t.center;
    for (let i = 0; i < 4; i++) optImgs[i].src = t.options[i];

    updateTopBar();
    updateFullscreenButton();
    setupInstructionAudio(step.instructionAudio);
    setPartProgress(partId, { trialIndex });
  }

  btnFullscreen.onclick = () => toggleFullscreen();

  optBoxes.forEach(box => {
    box.onclick = () => {
      const idx = Number(box.dataset.opt);
      selectedIndex = idx;

      // solo marca lo que eligió (sin correct/incorrect)
      optBoxes.forEach(b => b.classList.remove("selected"));
      box.classList.add("selected");

      // habilita flecha para avanzar
      btnNext.style.display = "block";
    };
  });

  btnNext.onclick = () => {
    if (selectedIndex === null) return;

    trialIndex++;
    if (trialIndex >= trials.length) {
      setPartProgress(partId, { status: "done", trialIndex: trials.length - 1 });
      window.location.href = "index.html";
      return;
    }

    setPartProgress(partId, { status: "in_progress", trialIndex });
    renderTrial();
  };

  renderTrial();
}


/* =========================
   CÁLCULO (Parte 6)
   - mismo patrón: seleccionar NO avanza
   - flecha para avanzar
   - sin fullscreen (solo parte 2)
========================= */
function runCalcMCQ(step) {
  showLayout("calc");
  btnFullscreen.style.display = "none"; // no se usa acá

  const promptImg = document.getElementById("calcPromptImg");
  const optBoxes = Array.from(document.querySelectorAll("#calcOptions .opt5"));
  const optImgs = [
    document.getElementById("cimg0"),
    document.getElementById("cimg1"),
    document.getElementById("cimg2"),
    document.getElementById("cimg3"),
    document.getElementById("cimg4"),
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
      window.location.href = "index.html";
      return;
    }
    setPartProgress(partId, { status: "in_progress", trialIndex });
    renderTrial();
  };

  renderTrial();
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


// Router
if (step.type === "semantic_match") runSemanticMatch(step);
else if (step.type === "mcq_image") runCalcMCQ(step);
else if (step.type === "text_image") runTextImage(step);
else if (step.type === "dictation_text") runDictationText(step);
else if (step.type === "image_labeling") runImageLabeling(step);
else if (step.type === "audio_record_image") runAudioRecordImage(step);
else if (step.type === "audio_record_words") runAudioRecordWords(step);
else {
  topBar.textContent = `Tipo no soportado: ${step.type}`;
  btnNext.style.display = "none";
  btnFullscreen.style.display = "none";
  throw new Error("Tipo no soportado");
}
