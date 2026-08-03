import { MODULO3 } from "./habla_script.js";

const url = new URL(window.location.href);
const partId = Number(url.searchParams.get("part") || "1");
const test = MODULO3.tests.find((item) => item.id === partId) || null;
const test1Section = document.getElementById("part-1-test-1");
const test2Section = document.getElementById("part-1-test-2");
const motorSection = document.getElementById("part-2-motor");
const test13Section = document.getElementById("part-3-test-1");
const topBar = document.getElementById("topBar");
const itemIndicator = document.querySelector(".item-indicator");
const currentItem = document.getElementById("current-item");

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
  runProcesosMotoresBasicos(test);
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

  const screens = buildPart1Test1Screens(testConfig.screens || []);
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

  const sectionCounters = buildPart1Test1Counters(screens);

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
      instructionText.textContent = "Evaluación Orofacial";
      centerAudio.style.display = "inline-block";
      fullscreenBtn.style.display = "block";
      // Preparar la cámara desde el inicio evita la espera al entrar al primer estímulo.
      await ensureCamera();
      return;
    }

    if (screen.kind === "label") {
      setScreenCounter("");
      wordView.classList.add("is-active");
      wordLabel.textContent = screen.section === "praxiasorofaciales"
        ? "Praxias orofaciales"
        : (screen.text || screen.label || "");
      return;
    }

    if (screen.kind === "record") {
      setScreenCounter(sectionCounters[currentScreenIndex] || "");
      recordView.classList.add("is-active");
      recordTitle.textContent = "";
      audioBtn.style.display = "block";
      showNext(nextBtn, true);
      await ensureCamera();
      // Feedback: comenzar a grabar apenas aparece la pantalla (quitar la demora de 2-3s).
      await startRecorder();
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

function buildPart1Test1Screens(rawScreens = []) {
  let praxiaIndex = 0;

  return rawScreens
    .filter((screen) => {
      if (screen.kind === "label") {
        return screen.section === "praxiasorofaciales";
      }

      if (
        screen.section === "praxiasorofaciales" &&
        /praxiasorofaciales1\.wav$/i.test(screen.audio || "")
      ) {
        return false;
      }

      return true;
    })
    .map((screen) => {
      if (screen.section !== "praxiasorofaciales" || screen.kind !== "record") {
        return screen;
      }

      praxiaIndex += 1;
      return {
        ...screen,
        outputName: `modulo3_test1_praxiasorofaciales_${praxiaIndex}`
      };
    });
}

function buildPart1Test1Counters(screens = []) {
  const counters = {};
  const nonPraxiaRecords = screens.filter((screen) => screen.kind === "record" && screen.section !== "praxiasorofaciales");
  const praxiaRecords = screens.filter((screen) => screen.kind === "record" && screen.section === "praxiasorofaciales");
  let nonPraxiaIndex = 0;
  let praxiaIndex = 0;

  screens.forEach((screen, index) => {
    if (screen.kind !== "record") {
      return;
    }

    if (screen.section === "praxiasorofaciales") {
      praxiaIndex += 1;
      counters[index] = `E ${praxiaIndex}/${praxiaRecords.length}`;
      return;
    }

    nonPraxiaIndex += 1;
    counters[index] = `E ${nonPraxiaIndex}/${nonPraxiaRecords.length}`;
  });

  return counters;
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

// Descarga un JSZip ya armado con el nombre indicado. Reutilizable para los casos
// en que el documento exige varias carpetas ZIP separadas en una misma prueba.
async function downloadZipWithName(zip, baseName) {
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
}

function delayMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function exportProcesosMotoresBasicosZip(videos = [], rows = []) {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar Subsistemas del Habla.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getExaminerThreeInitials(participantId));

  // El documento exige DOS carpetas ZIP separadas: OroFace_comm y OroFace_praxis
  const commZip = new JSZip();
  const praxisZip = new JSZip();
  let hasComm = false;
  let hasPraxis = false;

  videos.forEach((video) => {
    if (video?.blob && video?.name) {
      const base = stripExtension(video.name);
      const officialName = OROFACE_VIDEO_NAMES[base] || base;
      const fileEntry = namedWithExtension(officialName, "webm");
      if (/praxiasorofaciales/i.test(base)) {
        praxisZip.file(fileEntry, video.blob);
        hasPraxis = true;
      } else {
        commZip.file(fileEntry, video.blob);
        hasComm = true;
      }
    }
  });

  if (hasComm) {
    await downloadZipWithName(commZip, platformZipBase(participantId, "OroFace_comm", userInitials));
  }
  if (hasPraxis) {
    if (hasComm) await delayMs(400);
    await downloadZipWithName(praxisZip, platformZipBase(participantId, "OroFace_praxis", userInitials));
  }

  return hasComm || hasPraxis;
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
  const baseName = platformZipBase(participantId, "SpeechSub", userInitials);
  const zip = new JSZip();

  // Nomenclatura: dentro del ZIP solo los audios solicitados (sin resumen.csv ni subcarpetas)
  audios.forEach((audio) => {
    if (audio?.blob && audio?.name) {
      zip.file(namedWithExtension(speechSubsystemAudioName(audio), "wav"), audio.blob);
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

  // El documento exige una carpeta ZIP por tarea:
  // SPDesc_cat_rescue, StoryNarr_frog y PersNarr_s (separadas).
  let exported = false;
  for (const audio of audios) {
    if (audio?.blob && audio?.name) {
      const base = stripExtension(audio.name);
      const officialName = HABLA_CONECTADA_AUDIO_NAMES[base] || base;
      const zip = new JSZip();
      zip.file(namedWithExtension(officialName, "wav"), audio.blob);
      if (exported) await delayMs(400);
      await downloadZipWithName(zip, platformZipBase(participantId, officialName, userInitials));
      exported = true;
    }
  }

  return exported;
}

async function exportEvaluacionMotoraHablaZip(audios = [], rows = []) {
  if (typeof JSZip === "undefined") {
    console.error("JSZip no esta disponible para exportar Evaluacion Motora del Habla.");
    return false;
  }

  const url = new URL(window.location.href);
  const participantId = url.searchParams.get("id_participante") || "participante";
  const userInitials = sanitizeFilename(await getAuthenticatedUserInitialsFallback(participantId));

  // Agrupar por código de ZIP. Esto separa AMR (1_ta,2_ka,3_pa) de SMR (1_pata,2_pataka),
  // que el documento exige en carpetas ZIP distintas aunque provengan de la misma sección.
  const groups = new Map();
  audios.forEach((audio) => {
    if (audio?.blob && audio?.name) {
      const code = motorZipCodeForAudio(audio);
      if (!groups.has(code)) groups.set(code, []);
      groups.get(code).push(audio);
    }
  });

  if (!groups.size) {
    return false;
  }

  let first = true;
  for (const [code, groupAudios] of groups) {
    const zip = new JSZip();

    // Nomenclatura: dentro del ZIP solo los audios con sus nombres (sin resumen.csv ni subcarpetas)
    groupAudios.forEach((audio) => {
      const base = stripExtension(audio.name);
      const officialName = MOTOR_AUDIO_NAMES[base] || base;
      zip.file(namedWithExtension(officialName, "wav"), audio.blob);
    });

    if (!first) await delayMs(400);
    await downloadZipWithName(zip, platformZipBase(participantId, code, userInitials));
    first = false;
  }

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

function currentPlatformDate() {
  const date = new Date();
  return [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getFullYear()).slice(-2)
  ].join("");
}

function platformZipBase(participantId, code, initials, includeNaa = true) {
  return `${sanitizeFilename(participantId)}_${code}_${currentPlatformDate()}_${sanitizeFilename(initials)}`;
}

const OROFACE_VIDEO_NAMES = {
  modulo3_test1_cara_1: "1_smile",
  modulo3_test1_cara_2: "2_eyesbrows",
  modulo3_test1_cara_3: "3_cheeks",
  modulo3_test1_mandibula_1: "4_open_mouth",
  modulo3_test1_lengua_1: "5_tongue_out",
  modulo3_test1_lengua_2: "6_tongue_side",
  modulo3_test1_lengua_3: "7_tongue_up_down",
  modulo3_test1_paladarblando_1: "8_long_a",
  modulo3_test1_praxiasorofaciales_1: "1_kiss",
  modulo3_test1_praxiasorofaciales_2: "2_silence",
  modulo3_test1_praxiasorofaciales_3: "3_blow",
  modulo3_test1_praxiasorofaciales_4: "4_cluck_tongue",
  modulo3_test1_praxiasorofaciales_5: "5_chew"
};

const HABLA_CONECTADA_AUDIO_NAMES = {
  modulo3_parte3_descripcion_imagen: "SPDesc_cat_rescue",
  modulo3_parte3_narracion_historia: "StoryNarr_frog",
  modulo3_parte3_narracion_personal: "PersNarr_s"
};

const MOTOR_AUDIO_NAMES = {
  modulo3_parte2_01_volumencreciente: "Count_5_incvol",
  modulo3_parte2_02_hablaautomatica: "Count_20",
  modulo3_parte2_03_diadococinesia_1: "1_ta",
  modulo3_parte2_03_diadococinesia_2: "2_ka",
  modulo3_parte2_03_diadococinesia_3: "3_pa",
  modulo3_parte2_03_diadococinesia_4: "1_pata",
  modulo3_parte2_03_diadococinesia_5: "2_pataka",
  modulo3_parte2_04_lectura: "ReadParagraph",
  modulo3_parte2_05_diptongos_1: "1_seis",
  modulo3_parte2_05_diptongos_2: "2_ingenuo",
  modulo3_parte2_05_diptongos_3: "3_viudo",
  modulo3_parte2_05_diptongos_4: "4_suizo",
  modulo3_parte2_05_diptongos_5: "5_ley",
  modulo3_parte2_05_diptongos_6: "6_paraguas",
  modulo3_parte2_06_polisilabicas_1: "1_paquistani",
  modulo3_parte2_06_polisilabicas_2: "2_bicicleta",
  modulo3_parte2_06_polisilabicas_3: "3_deposito",
  modulo3_parte2_06_polisilabicas_4: "4_cupula",
  modulo3_parte2_06_polisilabicas_5: "5_ceramica",
  modulo3_parte2_06_polisilabicas_6: "6_banana",
  modulo3_parte2_07_longitudcreciente_1: "1_maniobra",
  modulo3_parte2_07_longitudcreciente_2: "2_maniobrable",
  modulo3_parte2_07_longitudcreciente_3: "3_maniobrabilidad",
  modulo3_parte2_07_longitudcreciente_4: "4_peligro",
  modulo3_parte2_07_longitudcreciente_5: "5_peligroso",
  modulo3_parte2_07_longitudcreciente_6: "6_peligrosamente",
  modulo3_parte2_07_longitudcreciente_7: "7_existencia",
  modulo3_parte2_07_longitudcreciente_8: "8_existencial",
  modulo3_parte2_07_longitudcreciente_9: "9_existencialismo",
  modulo3_parte2_07_longitudcreciente_10: "10_caida",
  modulo3_parte2_07_longitudcreciente_11: "11_paracaidas",
  modulo3_parte2_07_longitudcreciente_12: "12_paracaidismo",
  modulo3_parte2_07_longitudcreciente_13: "13_estable",
  modulo3_parte2_07_longitudcreciente_14: "14_inestable",
  modulo3_parte2_07_longitudcreciente_15: "15_inestabilidad",
  modulo3_parte2_07_longitudcreciente_16: "16_silencio",
  modulo3_parte2_07_longitudcreciente_17: "17_silenciosa",
  modulo3_parte2_07_longitudcreciente_18: "18_silenciosamente",
  modulo3_parte2_08_pseudopalabras_1: "1_pofa",
  modulo3_parte2_08_pseudopalabras_2: "2_zunoja",
  modulo3_parte2_08_pseudopalabras_3: "3_pataresa",
  modulo3_parte2_08_pseudopalabras_4: "4_batrasper",
  modulo3_parte2_08_pseudopalabras_5: "5_trantaslerma",
  modulo3_parte2_08_pseudopalabras_6: "6_tulasa",
  modulo3_parte2_08_pseudopalabras_7: "7_rachu",
  modulo3_parte2_08_pseudopalabras_8: "8_jachuyoza",
  modulo3_parte2_08_pseudopalabras_9: "9_drisnal",
  modulo3_parte2_08_pseudopalabras_10: "10_yerchal",
  modulo3_parte2_08_pseudopalabras_11: "11_griscupoya",
  modulo3_parte2_08_pseudopalabras_12: "12_prasnuzal",
  modulo3_parte2_09_repeticionfrases_1: "SRep_1",
  modulo3_parte2_09_repeticionfrases_2: "SRep_2",
  modulo3_parte2_09_repeticionfrases_3: "SRep_3",
  modulo3_parte2_09_repeticionfrases_4: "SRep_4",
  modulo3_parte2_09_repeticionfrases_5: "SRep_5",
  modulo3_parte2_09_repeticionfrases_6: "SRep_6",
  modulo3_parte2_09_repeticionfrases_7: "SRep_7",
  modulo3_parte2_09_repeticionfrases_8: "SRep_8",
  modulo3_parte2_10_lecturafrases_1: "SRead_1",
  modulo3_parte2_10_lecturafrases_2: "SRead_2",
  modulo3_parte2_10_lecturafrases_3: "SRead_3",
  modulo3_parte2_10_lecturafrases_4: "SRead_4",
  modulo3_parte2_10_lecturafrases_5: "SRead_5",
  modulo3_parte2_10_lecturafrases_6: "SRead_6",
  modulo3_parte2_10_lecturafrases_7: "SRead_7",
  modulo3_parte2_10_lecturafrases_8: "SRead_8"
};

const MOTOR_FOLDER_NAMES = {
  "Volumen creciente": "Volumen creciente",
  "Habla automática": "Habla automática",
  "Diadococinesia": "Repetición de sílabas-. Diadococinesia",
  "Lectura": "Lectura",
  "Diptongos": "Diptongos",
  "Palabras polisilábicas": "palabras Polisilábicas",
  "Palabras con longitud creciente": "Palabras con longitud creciente",
  "Pseudopalabras": "Pseudopalabras",
  "Repetición de frases": "Repetición de frase",
  "Lectura de frases": "Lectura de frases"
};

function motorFolderName(section) {
  const name = MOTOR_FOLDER_NAMES[section] || section || "audios";
  return String(name).replace(/[\\/]/g, "-").trim() || "audios";
}

function stripExtension(filename) {
  return String(filename || "").replace(/\.[^.]+$/, "");
}

function namedWithExtension(base, extension) {
  return `${sanitizeFilename(base)}.${extension}`;
}

function speechSubsystemAudioName(audio) {
  // Normalizar acentos: los títulos vienen como "fonación"/"espiración" y sin esto
  // el match fallaba y el archivo quedaba con un nombre larguísimo en vez de A_1/S_1.
  const title = String(audio?.title || "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase();
  const slot = Number(String(audio?.name || "").match(/_(\d+)(?:_toma\d+)?\.wav$/i)?.[1] || "1");
  const take = String(audio?.name || "").match(/(_toma\d+)\.wav$/i)?.[1] || "";
  const normalizedTitle = sanitizeFilename(audio?.title || "").toLowerCase();

  if (normalizedTitle.includes("espiracion")) return `S_${slot}${take}`;
  if (normalizedTitle.includes("fonacion")) return `A_${slot}${take}`;
  if (normalizedTitle.includes("resonancia")) return `Resonance_${slot}${take}`;

  return `${stripExtension(audio?.name || "SpeechSub")}${take}`;
}

function motorZipCodeForAudios(audios = []) {
  const sections = new Set(audios.map((audio) => String(audio?.section || "")));
  if (sections.size !== 1) return "SpeechMotor";

  const section = Array.from(sections)[0].toLowerCase();
  if (section.includes("volumen")) return "Count_5_incvol";
  if (section.includes("autom")) return "Count_20";
  if (section.includes("diadococinesia")) return "AMR";
  if (section.includes("lectura de frases")) return "SRead";
  if (section === "lectura") return "ReadParagraph";
  if (section.includes("diptongos")) return "WRep_multi_3";
  if (section.includes("polisil")) return "WRep_multi_5";
  if (section.includes("longitud")) return "WRep_inclength";
  if (section.includes("pseudopalabras")) return "PseudoRep";
  if (section.includes("frases")) return "SRep";

  return "SpeechMotor";
}

// Código de ZIP para UN audio individual. Necesario para separar AMR y SMR,
// que comparten la sección "Diadococinesia" pero deben ir en ZIP distintos.
function motorZipCodeForAudio(audio) {
  const section = String(audio?.section || "").toLowerCase();
  if (section.includes("diadococinesia")) {
    const base = stripExtension(audio?.name || "");
    const official = MOTOR_AUDIO_NAMES[base] || "";
    if (official === "1_pata" || official === "2_pataka") return "SMR";
    return "AMR";
  }
  return motorZipCodeForAudios([audio]);
}

async function getAuthenticatedUserInitialsFallback(fallback) {
  try {
    const response = await fetch("/api/user-info");
    if (!response.ok) return fallback;

    const user = await response.json();
    const initials = user?.initials || `${user?.name || ""} ${user?.last_name || ""}`
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return initials || fallback;
  } catch (_) {
    return fallback;
  }
}

async function getExaminerThreeInitials(fallback) {
  try {
    const response = await fetch("/api/user-info");
    if (!response.ok) return fallback;

    const user = await response.json();
    const firstName = String(user?.name || "").trim().split(/\s+/).filter(Boolean)[0] || "";
    const surnames = String(user?.last_name || "").trim().split(/\s+/).filter(Boolean).slice(0, 2);
    const initials = [firstName, ...surnames]
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return initials || user?.initials || fallback;
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
  const audio1Row = audio1Btn?.closest(".audio-choice-row");
  const audio2Row = audio2Btn?.closest(".audio-choice-row");
  const audio1Label = audio1Row?.querySelector(".audio-choice-label");
  const playRecordBtn = document.getElementById("p1t2-play-record-btn");
  const recordingIndicator = document.getElementById("p1t2-recording-indicator");
  const stopBtn = document.getElementById("p1t2-stop-btn");
  const fullscreenBtn = document.getElementById("p1t2-fullscreen-btn");
  const nextBtn = document.getElementById("p1t2-next-btn");
  const audioPlayer = document.getElementById("p1t2-audio-player");

  let currentScreenIndex = 0;
  let currentRecorder = null;
  let firstRecordingActive = false;
  let secondRecordingActive = false;
  let activeAudioSlot = null;
  let selectedAudioSlot = null;
  let endCountdownTimer = null;
  const recordedAudios = [];
  const takeCounts = {};
  const sectionCounters = buildSectionCounters(screens);

  fullscreenBtn?.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    if (fullscreenBtn) {
      fullscreenBtn.src = document.fullscreenElement ? "minimize.png" : "full-screen.png";
    }
  });

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

    const screen = screens[currentScreenIndex];
    if (screen?.kind === "single_audio_record") {
      status.textContent = "Grabacion guardada. Puedes grabar de nuevo o pasar a la siguiente pantalla.";
      showPlayRecordButton(true);
      showNext(nextBtn, true);
      return;
    }

    if (stoppedSlot === 1) {
      status.textContent = "Grabacion guardada. Puedes grabar de nuevo o reproducir el segundo audio.";
      showPlayRecordButton(true);
      audio2Btn.classList.remove("is-disabled");
      return;
    }

    if (stoppedSlot === 2) {
      status.textContent = "Grabacion guardada. Puedes grabar de nuevo o pasar a la siguiente pantalla.";
      showPlayRecordButton(true);
      showNext(nextBtn, true);
    }
  });

  audio1Btn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    if (!screen || !["dual_audio_record", "single_audio_record"].includes(screen.kind)) {
      return;
    }

    selectedAudioSlot = screen.kind === "single_audio_record" ? (screen.slot || 1) : 1;
    showNext(nextBtn, false);
    showPlayRecordButton(false);
    await playTimedAudio(audioPlayer, screen.audio || screen.audio1, selectedAudioSlot);
  });

  audio2Btn.addEventListener("click", async () => {
    const screen = screens[currentScreenIndex];
    if (!screen || screen.kind !== "dual_audio_record") {
      return;
    }

    if (firstRecordingActive) {
      return;
    }

    selectedAudioSlot = 2;
    showPlayRecordButton(false);
    await playTimedAudio(audioPlayer, screen.audio2, 2);
  });

  renderScreen();

  function renderScreen() {
    const screen = screens[currentScreenIndex];

    titleView.classList.remove("is-active");
    audioView.classList.remove("is-active");
    audio1Btn.classList.remove("is-disabled");
    audio2Btn.classList.add("is-disabled");
    if (audio1Row) audio1Row.style.display = "";
    if (audio2Row) audio2Row.style.display = "";
    clearCountdown(endCountdownTimer);
    stopAudio(audioPlayer);
    showNext(nextBtn, true);
    firstRecordingActive = false;
    secondRecordingActive = false;
    activeAudioSlot = null;
    selectedAudioSlot = null;
    showPlayRecordButton(false);
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

    if (screen.kind === "dual_audio_record" || screen.kind === "single_audio_record") {
      setScreenCounter(sectionCounters[currentScreenIndex] || "E 1/1");
      audioView.classList.add("is-active");
      status.textContent = "Reproduce el audio. La grabación comenzará tres segundos antes de que termine.";
      if (screen.kind === "single_audio_record") {
        if (audio2Row) audio2Row.style.display = "none";
        if (audio1Label) audio1Label.textContent = `${screen.slot || 1}. `;
        audio1Btn.alt = screen.label || `Audio ${screen.slot || 1}`;
      } else if (audio1Label) {
        audio1Label.textContent = "1. ";
      }
      showNext(nextBtn, false);
    }
  }

  async function playTimedAudio(audioEl, audioPath, slot) {
    stopAudio(audioEl);

    if (!audioPath) {
      return;
    }

    audioEl.src = audioPath;
    audioEl.load();

    const startScheduledRecording = async () => {
      if (currentRecorder) return;
      selectedAudioSlot = slot;
      currentRecorder = new WavAudioRecorder();
      await currentRecorder.start();
      firstRecordingActive = slot === 1;
      secondRecordingActive = slot === 2;
      activeAudioSlot = slot;
      status.textContent = `Grabando audio ${slot}. Presiona la flecha para guardar y continuar.`;
    };

    const scheduleFromDuration = () => {
      clearCountdown(endCountdownTimer);
      const duration = Number(audioEl.duration);
      if (!Number.isFinite(duration) || duration <= 0) return;
      endCountdownTimer = setTimeout(() => {
        startScheduledRecording().catch(console.error);
      }, Math.max(0, (duration - 3) * 1000));
    };

    audioEl.onloadedmetadata = scheduleFromDuration;
    audioEl.ontimeupdate = () => {
      const remaining = Number(audioEl.duration) - Number(audioEl.currentTime);
      if (!currentRecorder && Number.isFinite(remaining) && remaining <= 3) {
        clearCountdown(endCountdownTimer);
        startScheduledRecording().catch(console.error);
      }
    };
    audioEl.onended = async () => {
      if (!currentRecorder) await startScheduledRecording();
      selectedAudioSlot = slot;
      showNext(nextBtn, true);
      status.textContent = `Grabando audio ${slot}. Presiona la flecha para guardar y continuar.`;
    };

    try {
      await audioEl.play();
      scheduleFromDuration();
    } catch (error) {
      console.error("No se pudo reproducir el audio.", error);
    }
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
      const takeKey = `${currentScreenIndex}_${stoppedSlot || 1}`;
      takeCounts[takeKey] = (takeCounts[takeKey] || 0) + 1;
      const takeSuffix = takeCounts[takeKey] > 1 ? `_toma${takeCounts[takeKey]}` : "";
      const filename = `modulo3_test2_${sectionName}_${stoppedSlot || 1}${takeSuffix}.wav`;
      recordedAudios.push({
        name: filename,
        blob,
        title: screen?.title || "",
        audio: screen?.audio || (stoppedSlot === 2 ? screen?.audio2 : screen?.audio1),
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

  function showPlayRecordButton(visible) {
    if (playRecordBtn) {
      playRecordBtn.classList.toggle("hidden", !visible);
    }
  }

  function showRecordControls(visible) {
    showPlayRecordButton(false);

    if (recordingIndicator) {
      recordingIndicator.classList.add("hidden");
    }

    if (stopBtn) {
      stopBtn.classList.add("hidden");
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

  const allScreens = buildEvaluacionMotoraHablaScreens();
  const subtests = buildMotorSubtests(allScreens);
  const audios = [];
  const summaryRows = [];

  let currentScreenIndex = 0;
  let activeScreens = [];
  let sectionCounters = {};
  let currentMode = "menu";
  let currentRecorder = null;

  nextBtn.addEventListener("click", async () => {
    if (currentMode !== "running") {
      return;
    }

    stopAudio(audioPlayer);
    await stopRecording(true);

    if (currentScreenIndex < activeScreens.length - 1) {
      currentScreenIndex += 1;
      await renderScreen();
      return;
    }

    renderSubtestComplete();
  });

  recBtn.addEventListener("click", async () => {
    await startRecording(activeScreens[currentScreenIndex]);
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

  renderMenu();

  function renderMenu() {
    currentMode = "menu";
    currentScreenIndex = 0;
    activeScreens = [];
    sectionCounters = {};
    setScreenCounter("");
    stopAudio(audioPlayer);
    resetRecordControls();
    recordControls.style.display = "none";
    showNext(nextBtn, false);

    titleEl.textContent = "Evaluacion Motora del Habla";
    titleEl.style.display = "block";
    labelEl.style.display = "none";
    textEl.style.display = "none";
    audiosEl.innerHTML = "";
    audiosEl.className = "motor-menu";

    subtests.forEach((subtest) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = subtest.section;
      button.addEventListener("click", async () => {
        await startSubtest(subtest);
      });
      audiosEl.appendChild(button);
    });

    if (audios.length > 0) {
      const finishButton = document.createElement("button");
      finishButton.type = "button";
      finishButton.textContent = "Terminar tarea";
      finishButton.addEventListener("click", finishMotorTask);
      audiosEl.appendChild(finishButton);
    }
  }

  async function startSubtest(subtest) {
    currentMode = "running";
    activeScreens = subtest.screens;
    sectionCounters = buildMotorCounters(activeScreens);
    currentScreenIndex = 0;
    showNext(nextBtn, true);
    await renderScreen();
  }

  function renderSubtestComplete() {
    currentMode = "complete";
    setScreenCounter("");
    stopAudio(audioPlayer);
    resetRecordControls();
    recordControls.style.display = "none";
    showNext(nextBtn, false);

    titleEl.textContent = "Subtest terminado";
    titleEl.style.display = "block";
    labelEl.style.display = "none";
    textEl.style.display = "none";
    audiosEl.innerHTML = "";
    audiosEl.className = "motor-menu";

    const menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.textContent = "Volver al menu principal";
    menuButton.addEventListener("click", renderMenu);
    audiosEl.appendChild(menuButton);

    const finishButton = document.createElement("button");
    finishButton.type = "button";
    finishButton.textContent = "Terminar tarea";
    finishButton.addEventListener("click", finishMotorTask);
    audiosEl.appendChild(finishButton);
  }

  async function finishMotorTask() {
    stopAudio(audioPlayer);
    await stopRecording(true);
    await exportEvaluacionMotoraHablaZip(audios, summaryRows);
    setTimeout(() => {
      closeCurrentWindow();
    }, 3000);
  }

  async function renderScreen() {
    const screen = activeScreens[currentScreenIndex];
    if (!screen) return;

    setScreenCounter(sectionCounters[currentScreenIndex] || "");
    titleEl.textContent = screen.kind === "title" ? (screen.title || "") : "";
    titleEl.style.display = screen.kind === "title" ? "block" : "none";
    labelEl.textContent = screen.kind === "title" ? "" : "";
    labelEl.style.display = "none";
    textEl.textContent = screen.text || "";
    textEl.style.display = screen.text ? "block" : "none";
    textEl.classList.toggle("is-reading", screen.section === "Lectura");
    textEl.classList.toggle("is-centered", screen.section === "Lectura de frases");
    textEl.classList.toggle("is-phrase-reading", screen.section === "Lectura de frases");
    renderAudioButtons(screen);
    resetRecordControls();
    recordControls.style.display = screen.record ? "flex" : "none";

    // Feedback: eliminar botón REC y grabar desde que aparece la pantalla del estímulo
    // hasta que se presiona la flecha para avanzar. Toda pantalla de grabación inicia sola.
    if (screen.record) {
      await startRecording(screen);
    }
  }

  function renderAudioButtons(screen) {
    audiosEl.innerHTML = "";
    audiosEl.className = "motor-audio-list";
    const audioList = normalizeAudioList(screen.audio);
    audiosEl.classList.toggle("is-centered", Boolean(screen.centerAudio) || (!screen.record && audioList.length > 1));

    audioList.forEach((audioPath, index) => {
      const button = document.createElement("img");
      button.src = (screen.centerAudio || (!screen.record && audioList.length > 1))
        ? "audio.png"
        : (index === 0 ? "audio.png" : `audio${Math.min(index + 1, 4)}.png`);
      button.alt = `Audio ${index + 1}`;
      button.addEventListener("click", async () => {
        // Feedback: los audios de estímulo deben reproducirse de forma independiente
        // (solo el que el examinador toca), no encadenarse automáticamente.
        await playMotorAudios([audioPath], screen);
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

    const screen = activeScreens[currentScreenIndex];
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
    // Feedback: eliminar el botón REC manual. La grabación se controla por la aparición
    // de la pantalla y la flecha de avanzar; solo se muestra el indicador de grabación.
    recBtn.classList.add("hidden");
    stopBtn.classList.add("hidden");
    stopBtn.classList.add("is-disabled");
    recordingIndicator.classList.add("hidden");
  }

}

function normalizeAudioList(audio) {
  return Array.isArray(audio) ? audio.filter(Boolean) : [audio].filter(Boolean);
}

function buildMotorSubtests(screens = []) {
  const grouped = new Map();

  screens.forEach((screen) => {
    const section = screen.section || screen.title || "Subtest";
    if (!grouped.has(section)) {
      grouped.set(section, []);
    }
    grouped.get(section).push(screen);
  });

  return Array.from(grouped.entries()).map(([section, sectionScreens]) => ({
    section,
    screens: sectionScreens
  }));
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
    // Grupo "a" (ejemplo): cada palabra se graba por separado -> índices 1, 2, 3
    ...[1, 2, 3].map((number) => ({
      section: "Palabras con longitud creciente",
      title: "Palabras con longitud creciente",
      label: `Ejemplo a (${number}/3)`,
      audio: `${base}/7_longitudcreciente/${number}a_longitudcreciente.wav`,
      record: true,
      autoStartOnEnter: true,
      centerAudio: true,
      trial: `a${number}`,
      outputName: `modulo3_parte2_07_longitudcreciente_${number}`
    })),
    {
      section: "Palabras con longitud creciente",
      title: "Palabras con longitud creciente",
      label: "Instrucción 2",
      audio: `${base}/7_longitudcreciente/instruccion2_longitudcreciente.wav`,
      centerAudio: true,
      record: false
    },
    // Grupos b..f: cada palabra se graba por separado -> índices 4..18 (documento: guardar todos por separado)
    ...["b", "c", "d", "e", "f"].flatMap((letter, groupIndex) =>
      [1, 2, 3].map((number) => {
        const docIndex = (groupIndex + 1) * 3 + number; // b -> 4..6, c -> 7..9, ... f -> 16..18
        return {
          section: "Palabras con longitud creciente",
          title: "Palabras con longitud creciente",
          label: `Letra ${letter} (${number}/3)`,
          audio: `${base}/7_longitudcreciente/${number}${letter}_longitudcreciente.wav`,
          record: true,
          autoStartOnEnter: true,
          centerAudio: true,
          trial: `${letter}${number}`,
          outputName: `modulo3_parte2_07_longitudcreciente_${docIndex}`
        };
      })
    ),
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
    if (screen.kind === "title" || !screen.record) {
      return;
    }

    const key = screen.section || "Evaluacion Motora del Habla";
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key).push(index);
  });

  grouped.forEach((indexes, sectionName) => {
    const practiceIndexes = indexes.filter((screenIndex) => /Ejemplo/i.test(screens[screenIndex]?.label || ""));
    const ensayoIndexes = indexes.filter((screenIndex) => !practiceIndexes.includes(screenIndex));

    practiceIndexes.forEach((screenIndex, itemIndex) => {
      counters[screenIndex] = `${sectionName} P ${itemIndex + 1}/${practiceIndexes.length}`;
    });

    ensayoIndexes.forEach((screenIndex, itemIndex) => {
      counters[screenIndex] = `${sectionName} E ${itemIndex + 1}/${ensayoIndexes.length}`;
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
      // Feedback: grabar desde que aparece la lámina hasta presionar avanzar.
      await startAudioRecording(screen);
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
      // Feedback: grabar desde que aparece la lámina hasta presionar avanzar.
      await startAudioRecording(screen);
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
  const label = parseItemIndicatorLabel(value);
  if (currentItem) {
    currentItem.textContent = label;
  }
  if (itemIndicator) {
    itemIndicator.style.display = label ? "block" : "none";
  }

  if (!topBar) {
    return;
  }

  topBar.textContent = value || "";
  topBar.style.display = "none";
}

function parseItemIndicatorLabel(value) {
  const text = String(value || "")
    .replace(/\u00c2/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!text || /Instrucci|Titulo|T[ií]tulo/i.test(text)) {
    return "";
  }

  const pMatch = text.match(/\b(?:Pr[aá]ctica|Practica|Prueba|P)\s*(\d+)?(?:\s*\/\s*\d+)?\b/i);
  if (pMatch) {
    return `P${pMatch[1] || "1"}`;
  }

  const eMatch = text.match(/\b(?:Ensayo|E)\s*(\d+)?(?:\s*\/\s*\d+)?\b/i);
  if (eMatch) {
    return `E${eMatch[1] || "1"}`;
  }

  return "";
}

function normalizeSectionLabel(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buildSectionCounters(screens) {
  const recordIndexes = [];

  screens.forEach((screen, index) => {
    if (screen.kind !== "record" && screen.kind !== "dual_audio_record" && screen.kind !== "single_audio_record") {
      return;
    }

    recordIndexes.push(index);
  });

  const counters = {};
  recordIndexes.forEach((screenIndex, itemIndex) => {
    counters[screenIndex] = `E ${itemIndex + 1}/${recordIndexes.length}`;
  });

  return counters;
}

function buildPart3Counters(screens) {
  const counters = {};

  screens.forEach((screen, index) => {
    if (
      screen.kind === "image_single_audio_record" ||
      screen.kind === "final_record" ||
      screen.kind === "personal_record"
    ) {
      counters[index] = "E 1/1";
    }
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
  audioEl.onloadedmetadata = null;
  audioEl.ontimeupdate = null;
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
