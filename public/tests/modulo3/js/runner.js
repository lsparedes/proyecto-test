import { module3Tests } from "./modulo3_scripts.js";
import { WavRecorder } from "./audio_recorder_wav.js";

const btnAudio = document.getElementById("btnAudio");
const btnAudio2 = document.getElementById("btnAudio2");
const btnAudioCenter = document.getElementById("btnAudioCenter");
const btnFullscreen = document.getElementById("btnFullscreen");
const btnFlecha = document.getElementById("btnFlecha");

const instructionAudio = document.getElementById("instructionAudio");
const instructionAudio2 = document.getElementById("instructionAudio2");

const mainImage = document.getElementById("mainImage");
const textScreen = document.getElementById("textScreen");

const recordingIcon = document.getElementById("recordingIcon");
const stopIcon = document.getElementById("stopIcon");

const videoPreview = document.getElementById("videoPreview");
const topBar = document.getElementById("topBar");
const trialIndicator = document.getElementById("trialIndicator");

const params = new URLSearchParams(window.location.search);
const requestedPart = String(params.get("part") || "1").trim();

function findCurrentTest(tests, requestedId) {
    if (!Array.isArray(tests)) return null;

    return tests.find((t) => {
        if (!t) return false;

        if (String(t.id) === requestedId) return true;
        if (String(t.testId) === requestedId) return true;
        if (String(t.part) === requestedId) return true;

        return false;
    }) || null;
}

const currentTest = findCurrentTest(module3Tests, requestedPart);

let recorder = null;
let currentAudioBlob = null;

let currentPartIndex = 0;
let currentScreenIndex = 0;

init();

async function init() {
    console.log("requestedPart =", requestedPart);
    console.log(
        "tests disponibles =",
        Array.isArray(module3Tests)
            ? module3Tests.map(t => ({
                id: t?.id,
                testId: t?.testId,
                part: t?.part,
                name: t?.name
            }))
            : module3Tests
    );

    if (!currentTest) {
        console.warn("No se encontró el test para part =", requestedPart);
        alert(`No se encontró el test solicitado para part=${requestedPart}. Revisa modulo3_scripts.js`);
        return;
    }

    if (topBar) {
        topBar.textContent = currentTest.name || currentTest.test || `Parte ${requestedPart}`;
    }

    setupGlobalEvents();
    await renderCurrentPart();
}

function setupGlobalEvents() {
    btnFullscreen.onclick = () => toggleFullscreen();

    stopIcon.onclick = () => {
        stopRecordingFlow();
    };

    window.addEventListener("beforeunload", () => {
        try {
            stopAllAudios();
            if (recorder) recorder.destroy();
        } catch (e) {
            console.warn("Error cerrando recursos:", e);
        }
    });

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            btnFullscreen.src = "/tests/modulo3/full-screen.png";
            btnFullscreen.alt = "Pantalla completa";
        }
    });
}

async function renderCurrentPart() {
    const part = currentTest.parts?.[currentPartIndex];
    resetUI();

    if (!part) {
        closeTest();
        return;
    }

    // =========================================
    // TEST 1 - Procesos Motores Básicos
    // =========================================
    if (part.type === "orofacial_video_sequence") {
        await runOrofacialVideoSequence(part);
        return;
    }

    if (part.type === "breathing_phonation_resonance_video") {
        await runBreathingPhonationResonanceVideo(part);
        return;
    }

    // =========================================
    // TEST 3 - Habla Conectada
    // =========================================
    if (part.type === "image_description_audio_record") {
        await runImageDescriptionAudioRecord(part);
        return;
    }

    if (part.type === "story_narration_sequence") {
        await runStoryNarrationSequence(part);
        return;
    }

    if (part.type === "personal_narration_record") {
        await runPersonalNarrationRecord(part);
        return;
    }

    console.warn("Parte no implementada:", part.type);
}

function resetUI() {
    stopAllAudios();
    hideRecordingControls();

    btnAudio.classList.add("hidden");
    btnAudio2.classList.add("hidden");
    btnAudioCenter.classList.add("hidden");
    btnFlecha.classList.remove("hidden");

    instructionAudio.onended = null;
    instructionAudio2.onended = null;

    btnAudio.onclick = null;
    btnAudio2.onclick = null;
    btnAudioCenter.onclick = null;
    btnFlecha.onclick = null;

    mainImage.classList.remove("hidden");
    textScreen.classList.add("hidden");
    textScreen.textContent = "";
}

function updateIndicator(totalScreens = 0) {
    if (!trialIndicator) return;

    if (!totalScreens) {
        trialIndicator.classList.add("hidden");
        trialIndicator.textContent = "";
        return;
    }

    trialIndicator.classList.remove("hidden");
    trialIndicator.textContent = `${currentScreenIndex + 1} / ${totalScreens}`;
}

//
// =====================================================
// TEST 1
// =====================================================
//

// Parte 1: Evaluación orofacial
async function runOrofacialVideoSequence(part) {
    const screens = part.screens || [];
    if (!screens.length) return;

    updateIndicator(screens.length);

    const screen = screens[currentScreenIndex];
    if (!screen) return;

    if (screen.kind === "section") {
        showTextScreen(screen.title || "");
        btnAudio.classList.add("hidden");
        btnAudio2.classList.add("hidden");
        btnAudioCenter.classList.add("hidden");

        btnFlecha.onclick = async () => {
            stopAllAudios();
            stopRecordingIfNeeded();

            if (currentScreenIndex < screens.length - 1) {
                currentScreenIndex++;
                await runOrofacialVideoSequence(part);
            } else {
                currentPartIndex++;
                currentScreenIndex = 0;
                await renderCurrentPart();
            }
        };
        return;
    }

    if (screen.kind === "audio") {
        showTextScreen("");
        btnAudio.classList.add("hidden");
        btnAudio2.classList.add("hidden");
        btnAudioCenter.classList.remove("hidden");

        instructionAudio.src = screen.audio || "";

        btnAudioCenter.onclick = async () => {
            try {
                stopAllAudios();
                stopRecordingIfNeeded();
                hideRecordingControls();

                instructionAudio.currentTime = 0;
                await instructionAudio.play();
            } catch (e) {
                console.warn("No se pudo reproducir audio:", e);
            }
        };

        instructionAudio.onended = async () => {
            await startRecordingFlow();
        };

        btnFlecha.onclick = async () => {
            stopAllAudios();
            stopRecordingIfNeeded();

            if (currentScreenIndex < screens.length - 1) {
                currentScreenIndex++;
                await runOrofacialVideoSequence(part);
            } else {
                currentPartIndex++;
                currentScreenIndex = 0;
                await renderCurrentPart();
            }
        };
    }
}

// Parte 2 del test 1
async function runBreathingPhonationResonanceVideo(part) {
    showTextScreen(part.title || "Evaluación integrada");

    btnAudio.classList.add("hidden");
    btnAudio2.classList.add("hidden");
    btnAudioCenter.classList.remove("hidden");

    instructionAudio.src = part.audio1 || "";

    btnAudioCenter.onclick = async () => {
        try {
            stopAllAudios();
            stopRecordingIfNeeded();
            hideRecordingControls();

            instructionAudio.currentTime = 0;
            await instructionAudio.play();
        } catch (e) {
            console.warn("No se pudo reproducir audio:", e);
        }
    };

    instructionAudio.onended = async () => {
        await startRecordingFlow();
    };

    btnFlecha.onclick = async () => {
        stopAllAudios();
        stopRecordingIfNeeded();
        closeTest();
    };
}

//
// =====================================================
// TEST 3
// =====================================================
//

async function runImageDescriptionAudioRecord(part) {
    showImageScreen(part.image);

    btnAudio.classList.remove("hidden");
    btnAudio2.classList.add("hidden");
    btnAudioCenter.classList.add("hidden");

    instructionAudio.src = part.instructionAudio;

    btnAudio.onclick = async () => {
        try {
            stopAllAudios();
            stopRecordingIfNeeded();
            hideRecordingControls();

            instructionAudio.currentTime = 0;
            await instructionAudio.play();
        } catch (error) {
            console.warn("No se pudo reproducir el audio:", error);
        }
    };

    instructionAudio.onended = async () => {
        await startRecordingFlow();
    };

    btnFlecha.onclick = async () => {
        stopAllAudios();
        stopRecordingIfNeeded();

        currentPartIndex = 1;
        currentScreenIndex = 0;
        await renderCurrentPart();
    };
}

async function runStoryNarrationSequence(part) {
    updateIndicator(screens.length);
    const screens = part.screens || [];
    if (!screens.length) return;

    const screen = screens[currentScreenIndex];

    if (screen.type === "final_record") {
        await runFinalRecordScreen(screen);
        return;
    }

    showImageScreen(screen.image || "");

    if (currentScreenIndex === 0) {
        btnAudio.classList.remove("hidden");
        btnAudio2.classList.remove("hidden");
        btnAudioCenter.classList.add("hidden");

        instructionAudio.src = screen.audio1 || "";
        instructionAudio2.src = screen.audio2 || "";

        btnAudio.onclick = async () => {
            try {
                instructionAudio2.pause();
                instructionAudio2.currentTime = 0;
                instructionAudio.currentTime = 0;
                await instructionAudio.play();
            } catch (e) {
                console.warn("No se pudo reproducir audio 1:", e);
            }
        };

        btnAudio2.onclick = async () => {
            try {
                instructionAudio.pause();
                instructionAudio.currentTime = 0;
                instructionAudio2.currentTime = 0;
                await instructionAudio2.play();
            } catch (e) {
                console.warn("No se pudo reproducir audio 2:", e);
            }
        };
    } else {
        btnAudio.classList.add("hidden");
        btnAudio2.classList.add("hidden");
        btnAudioCenter.classList.add("hidden");
    }

    btnFlecha.onclick = async () => {
        stopAllAudios();
        stopRecordingIfNeeded();

        if (currentScreenIndex < screens.length - 1) {
            currentScreenIndex++;
            await runStoryNarrationSequence(part);
        }
    };
}

async function runFinalRecordScreen(screen) {
    showTextScreen(screen.text || "FIN");

    btnAudio.classList.remove("hidden");
    btnAudio2.classList.add("hidden");
    btnAudioCenter.classList.add("hidden");

    instructionAudio.src = screen.audio1 || "";

    btnAudio.onclick = async () => {
        try {
            stopAllAudios();
            stopRecordingIfNeeded();
            hideRecordingControls();

            instructionAudio.currentTime = 0;
            await instructionAudio.play();
        } catch (e) {
            console.warn("No se pudo reproducir audio final:", e);
        }
    };

    instructionAudio.onended = async () => {
        await startRecordingFlow();
    };

    btnFlecha.onclick = async () => {
        stopAllAudios();
        stopRecordingIfNeeded();

        currentPartIndex = 2;
        currentScreenIndex = 0;
        await renderCurrentPart();
    };
}

async function runPersonalNarrationRecord(part) {
    showTextScreen("");

    btnAudio.classList.add("hidden");
    btnAudio2.classList.add("hidden");
    btnAudioCenter.classList.remove("hidden");

    instructionAudio.src = part.audio1 || "";

    btnAudioCenter.onclick = async () => {
        try {
            stopAllAudios();
            stopRecordingIfNeeded();
            hideRecordingControls();

            instructionAudio.currentTime = 0;
            await instructionAudio.play();
        } catch (e) {
            console.warn("No se pudo reproducir audio de narración personal:", e);
        }
    };

    instructionAudio.onended = async () => {
        await startRecordingFlow();
    };

    btnFlecha.onclick = async () => {
        stopAllAudios();
        stopRecordingIfNeeded();
        closeTest();
    };
}

//
// =====================================================
// UI
// =====================================================
//

function showImageScreen(src) {
    textScreen.classList.add("hidden");
    textScreen.textContent = "";

    mainImage.classList.remove("hidden");
    mainImage.src = src || "";
}

function showTextScreen(text) {
    mainImage.classList.add("hidden");
    mainImage.src = "";

    textScreen.classList.remove("hidden");
    textScreen.textContent = text || "";
}



//
// =====================================================
// AUDIO / GRABACIÓN
// =====================================================
//

async function startRecordingFlow() {
    try {
        if (!recorder) {
            recorder = new WavRecorder();
            await recorder.prepare();
        }

        recorder.start();
        showRecordingControls();
    } catch (error) {
        console.error("No se pudo iniciar la grabación:", error);
        alert("No se pudo acceder al micrófono.");
    }
}

function stopRecordingFlow() {
    try {
        if (!recorder) return;

        currentAudioBlob = recorder.stop();
        hideRecordingControls();

        console.log("Grabación finalizada:", currentAudioBlob);
    } catch (error) {
        console.error("Error al detener la grabación:", error);
    }
}

function stopRecordingIfNeeded() {
    try {
        if (!recorder) return;
        if (recordingIcon.classList.contains("hidden")) return;

        currentAudioBlob = recorder.stop();
        hideRecordingControls();
    } catch (error) {
        console.warn("No se pudo detener grabación activa:", error);
    }
}

function showRecordingControls() {
    recordingIcon.classList.remove("hidden");
    stopIcon.classList.remove("hidden");
}

function hideRecordingControls() {
    recordingIcon.classList.add("hidden");
    stopIcon.classList.add("hidden");
}

function stopAllAudios() {
    [instructionAudio, instructionAudio2].forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

function showVideoPreview() {
  if (videoPreview) videoPreview.classList.remove("hidden");
}

function hideVideoPreview() {
  if (videoPreview) videoPreview.classList.add("hidden");
}

//
// =====================================================
// FULLSCREEN / CIERRE
// =====================================================
//

async function toggleFullscreen() {
    if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        btnFullscreen.src = "/tests/modulo3/minimize.png";
        btnFullscreen.alt = "Minimizar";
    } else {
        await document.exitFullscreen();
        btnFullscreen.src = "/tests/modulo3/full-screen.png";
        btnFullscreen.alt = "Pantalla completa";
    }
}

function closeTest() {
    try {
        window.close();
    } catch (e) {
        console.warn("No se pudo cerrar la ventana automáticamente:", e);
    }

    setTimeout(() => {
        if (!window.closed) {
            window.location.href = "about:blank";
        }
    }, 150);
}