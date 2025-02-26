let startTime;

document.getElementById('startTestButton').addEventListener('click', () => {
    document.getElementById('mainInstructionAudio').pause();
    startTime = Date.now();
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('categoryFluency2').style.display = 'block';
    loadAudio(2); // Cargar el segundo audio
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

let mediaRecorder2;
let audioChunks2 = [];
let mediaRecorders = [null, null, mediaRecorder2];
let timers = [null, null, null];

let audioStream = null; // Guardar el stream de audio

let mediaRecorder;
let audioChunks = [];
let audioContext;
let destination;
let micStream;
let audioElementStream;
let combinedStream;

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

async function startRecording(part) {
    if (!audioStream) {
        alert('No se puede acceder al micrófono. Por favor, revisa los permisos.');
        return;
    }

    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const audio = new Audio('beep.wav');
    audio.crossOrigin = "anonymous"; 
    audio.play();

    audioContext = new AudioContext();

    destination = audioContext.createMediaStreamDestination();

    const micSource = audioContext.createMediaStreamSource(micStream);
    micSource.connect(destination);

    const audioElementSource = audioContext.createMediaElementSource(audio);
    audioElementSource.connect(audioContext.destination);
    audioElementSource.connect(destination);

    combinedStream = destination.stream;

    mediaRecorder = new MediaRecorder(combinedStream);
    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.start();

    document.getElementById('stopRecordingButton' + part).style.display = 'inline-block';
    document.getElementById('recButton' + part).style.display = 'inline-block';
    startTimer(part); // Start the timer
}

function stopRecording(part) {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
    }
    
    // Verificar si audioContext está definido y no ha sido cerrado
    if (audioContext && audioContext.state !== "closed") {
        audioContext.close();
    }

    // Ocultar solo el botón de detener grabación sin afectar otros elementos
    document.getElementById('stopRecordingButton' + part).style.display = 'none';
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

document.getElementById('stopRecordingButton2').addEventListener('click', () => stopRecording(2));
document.getElementById('nextButton2').addEventListener('click', () => {
    stopRecording(2); // Primero detenemos la grabación
    nextSection(2);   // Luego pasamos a la siguiente pantalla
});


function nextSection(part) {
    if (part === 2) {
        document.getElementById('categoryFluency2').style.display = 'none';
        document.getElementById('instructionAudio2').pause();
        handButton.style.display = 'block';
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

    if (part === 2) {
        audio.src = 'audios/Semantica_2.wav';
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
            // if (recordingStarted && timeRemaining <= 3) {
            //     clearInterval(intervalId);
            // }
        }, 100);
    });

    audio.addEventListener('ended', () => {
        letterDisplay.style.display = 'none';
        document.getElementById('startRecButton' + part).style.display = 'inline-block'; // Mostrar botón para comenzar grabación
        document.getElementById('nextButton' + part).style.display = 'inline-block'; // Mostrar la flecha
        document.getElementById('startRecButton' + part).click(); // Iniciar grabación automáticamente
    });
}

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

let userInfo;

fetch('/api/user-info')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener la información del usuario');
        }
        return response.json();
    })
    .then(data => {
        userInfo = data; // Asignar los datos al objeto global
        console.log("Usuario autenticado:", userInfo);
    })
    .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
    });

    function downloadRecordingAndTime() {
        // Asegurarse de que userInfo esté disponible para obtener las iniciales
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return; // Salir si userInfo no está disponible
        }
    
        // Obtener las iniciales del examinador
        const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();
    
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${day}_${month}_${year}`;
    
        const totalTime = Date.now() - startTime;
        const totalTimeMs = totalTime;
        const totalTimeSecs = (totalTime / 1000).toFixed(2);
    
        // Modificar el contenido CSV para incluir el tiempo total y las iniciales del examinador
        const txtContent = `TotTime;Examinador\n${totalTimeSecs};${inicialesExaminador}`;
    
        // Crear los blobs para los archivos
        const timeBlob = new Blob([txtContent], { type: 'text/csv' });
        const timeUrl = URL.createObjectURL(timeBlob);
    
        // Crear un enlace para descargar los archivos
        const zip = new JSZip();
        
        // Agregar el archivo CSV al ZIP
        zip.file(`${idParticipante}_8_Fluidez_Verbal_Semantica_${formattedDate}.csv`, timeBlob);
    
        // Agregar el archivo de audio al ZIP
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        zip.file(`${idParticipante}_8_Fluidez_Verbal_Semantica_${formattedDate}.wav`, audioBlob);
    
        // Generar el archivo ZIP
        zip.generateAsync({ type: 'blob' }).then(content => {
            const zipLink = document.createElement('a');
            zipLink.href = URL.createObjectURL(content);
    
            // Nombre del archivo ZIP
            const fileName = `${idParticipante}_8_Fluidez_Verbal_Semantica_${formattedDate}.zip`;
    
            zipLink.download = fileName;
            zipLink.click();
            
            // Cerrar la ventana después de un breve retraso
            setTimeout(() => {
                window.close();
            }, 3000);
        }).catch(err => {
            console.error("Error generando el archivo ZIP:", err);
        });
    }
    

// SELECCION DE MANO JS
const handButton = document.getElementById("handButton");

function showHandSelection() {
    document.getElementById("preEnd").style.display = 'block';
}

function confirmHandSelection() {
    document.getElementById("preEnd").style.display = 'none';
    endGame();
}

document.getElementById('handButton').addEventListener('click', confirmHandSelection);
