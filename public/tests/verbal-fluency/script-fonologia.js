let startTime;

document.getElementById('startTestButton').addEventListener('click', () => {
    document.getElementById('mainInstructionAudio').pause();
    startTime = Date.now();
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('testSection1').style.display = 'block';
    loadAudio(1); // Cargar el primer audio
});

const fullscreenButton = document.getElementById('fullscreenButton');
fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
        fullscreenButton.style.backgroundImage = "url('minimize.png')"; // Cambiar la imagen del botón a 'minimize'
        document.documentElement.requestFullscreen();
    } else if (document.fullscreenElement) {
        fullscreenButton.style.backgroundImage = "url('full-screen.png')"; // Cambiar la imagen del botón a 'full-screen'
        document.exitFullscreen();
    } else {
        console.log('El modo de pantalla completa no es soportado por tu navegador.');
    }
});


let mediaRecorder1, mediaRecorder2;
let audioChunks1 = [], audioChunks2 = [];
let mediaRecorders = [null, mediaRecorder1, mediaRecorder2];
let audioChunks = [null, audioChunks1, audioChunks2];
let timers = [null, null, null];

let audioStream = null; // Guardar el stream de audio

document.addEventListener('DOMContentLoaded', () => {
    requestMicrophonePermission();
});

function requestMicrophonePermission() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Tu navegador no soporta grabación de audio.');
        return;
    }

    // Verificar si ya se tiene el permiso
    if (audioStream) {
        return;
    }

    // Solicitar permisos
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioStream = stream; // Guardar el stream de audio
        })
        .catch(err => {
            console.error('Error al solicitar permisos de micrófono:', err);
        });
}

function startRecording(part) {
    if (!audioStream) {
        alert('No se puede acceder al micrófono. Por favor, revisa los permisos.');
        return;
    }

    mediaRecorders[part] = new MediaRecorder(audioStream);
    mediaRecorders[part].start();
    audioChunks[part] = [];

    mediaRecorders[part].addEventListener('dataavailable', event => {
        audioChunks[part].push(event.data);
    });

    mediaRecorders[part].addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks[part], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        document.getElementById('nextButton' + part).style.display = 'inline-block';
        showRecordingCreatedMessage(part);
        clearInterval(timers[part]); // Clear the timer when recording stops
    });

    document.getElementById('stopRecordingButton' + part).style.display = 'inline-block';
    document.getElementById('recButton' + part).style.display = 'inline-block';
    startTimer(part); // Start the timer
}

function stopRecording(part) {
    if (mediaRecorders[part]) {
        mediaRecorders[part].stop();
        document.getElementById('stopRecordingButton' + part).style.display = 'none';
        document.getElementById('recButton' + part).style.display = 'none';
        document.getElementById('instructionAudio' + part).style.display = 'none'; // Ocultar el reproductor de audio
        nextSection(part);
    }
}

function startTimer(part) {
    let timeLeft = 60;
    timers[part] = setInterval(() => {
        if (timeLeft === 0) {
            document.getElementById('stopRecordingButton' + part).style.backgroundImage = 'url("detenerr.png")'; // Change to new icon
        }
        timeLeft--;
    }, 1000);
}

document.getElementById('stopRecordingButton1').addEventListener('click', () => stopRecording(1));
document.getElementById('stopRecordingButton2').addEventListener('click', () => stopRecording(2));

document.getElementById('nextButton1').addEventListener('click', () => stopRecording(1));
document.getElementById('nextButton2').addEventListener('click', () => stopRecording(2));

function nextSection(part) {
    if (part === 1) {
        // document.getElementById('testSection1').style.display = 'none';
        // document.getElementById('testSection2').style.display = 'block';
        // document.getElementById('instructionAudio1').pause();
        // loadAudio(2); // Cargar el segundo audio
        document.getElementById('testSection1').style.display = 'none';
        document.getElementById('instructionAudio1').pause();
        showHandSelection();

    } else if (part === 2) {
        document.getElementById('testSection2').style.display = 'none';
        document.getElementById('instructionAudio2').pause();
        showHandSelection();

    }
}

function endGame() {
    document.getElementById('completionMessage').style.display = 'block';
    downloadRecordingAndTime();
}

function loadAudio(part) {
    const audio = document.getElementById('instructionAudio' + part);
    const letterDisplay = document.getElementById('letterDisplay' + part);

    switch (part) {
        case 1:
            audio.src = 'audios/Fonologica_2.wav';
            break;
        case 2:
            audio.src = 'audios/Fonologica_2.wav';
            break;
    }

    audio.addEventListener('loadedmetadata', () => {
        let recordingStarted = false; // Bandera para evitar múltiples ejecuciones de startRecording
        const checkTimeRemaining = () => {
            const timeRemaining = (audio.duration - audio.currentTime) / audio.playbackRate;
    
            if (!recordingStarted && timeRemaining <= 1) {
                startRecording(part);
                recordingStarted = true; // Actualizar la bandera para evitar múltiples ejecuciones
            }
    
            if (timeRemaining <= 3 && timeRemaining > 0) {
                letterDisplay.style.display = 'block';
            }
        };
    
        const intervalId = setInterval(() => {
            checkTimeRemaining();
            
            // Detener el setInterval una vez que la grabación ha comenzado y el tiempo restante es menor a 3 segundos.
            if (recordingStarted && timeRemaining <= 3) {
                clearInterval(intervalId);
            }
        }, 100);
    });

    audio.addEventListener('ended', () => {
        letterDisplay.style.display = 'none';
        document.getElementById('startRecButton' + part).style.display = 'inline-block'; // Mostrar botón para comenzar grabación
        document.getElementById('nextButton' + part).style.display = 'inline-block'; // Mostrar la flecha
        document.getElementById('startRecButton' + part).click(); // Iniciar grabación automáticamente
    });
}

document.getElementById('startRecButton1').addEventListener('click', () => {
    // startRecording(1);
    document.getElementById('startRecButton1').style.display = 'none'; // Ocultar botón después de hacer clic
    document.getElementById('recButton1').style.display = 'inline-block'; // Mostrar imagen de grabando
});

document.getElementById('startRecButton2').addEventListener('click', () => {
    // startRecording(2);
    document.getElementById('startRecButton2').style.display = 'none'; // Ocultar botón después de hacer clic
    document.getElementById('recButton2').style.display = 'inline-block'; // Mostrar imagen de grabando
});

function showRecordingCreatedMessage(part) {
    const messageElement = document.getElementById('recordingCreatedMessage' + part);
    if (!messageElement) {
        return;
    }
    messageElement.style.display = 'block';
}
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Obtener el id_participante de la URL
const idParticipante = getQueryParam('id_participante');


function downloadRecordingAndTime() {
    // Obtener la fecha actual en formato YYYYMMDD
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${day}_${month}_${year}`;

    const totalTime = Date.now() - startTime;
    const totalTimeMs = totalTime;
    const totalTimeSecs = (totalTime / 1000).toFixed(2);

    // Crear el contenido del archivo .txt con la mano utilizada
    const txtContent = `Tiempo total: ${totalTimeMs} ms (${totalTimeSecs} s)`;
    const timeBlob = new Blob([txtContent], { type: 'text/plain' });
    const timeUrl = URL.createObjectURL(timeBlob);

    const link = document.createElement('a');
    link.href = timeUrl;
    link.download = `${idParticipante}_verbal_fluency_fonologia_${formattedDate}.txt`;
    // link.click();

    const zip = new JSZip();
    zip.file(`${idParticipante}_verbal_fluency_fonologia_${formattedDate}.txt`, timeBlob);

    const audio1Blob = new Blob(audioChunks[1], { type: 'audio/wav' });
    zip.file(`${idParticipante}_verbal_fluency_fonologia_${formattedDate}.wav`, audio1Blob);

    const audio2Blob = new Blob(audioChunks[2], { type: 'audio/wav' });
    // zip.file("Fonológica - Parte 2.wav", audio2Blob);

    zip.generateAsync({ type: 'blob' }).then(content => {
        const zipLink = document.createElement('a');
        zipLink.href = URL.createObjectURL(content);

        // Construir el nombre del archivo ZIP
        const fileName = `${idParticipante}_verbal_fluency_fonologia_${formattedDate}.zip`;

        zipLink.download = fileName;
        zipLink.click();
        window.close()
    });
}

// SELECCION DE MANO JS
const handButton = document.getElementById("handButton");
const handInputs = document.getElementsByName('hand');

// Variable con la mano seleccionada

// Funcion para mostrar la pantalla de seleccion de mano
function showHandSelection() {
    document.getElementById("preEnd").style.display = 'block';
    handButton.style.display = 'block';

}

// Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
// En este caso fue mostrarFinalizacion()
function confirmHandSelection() {
    document.getElementById("preEnd").style.display = 'none';

    endGame();
}

document.getElementById('handButton').addEventListener('click', confirmHandSelection);

