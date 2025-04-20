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

    audioContext = new AudioContext();
    destination = audioContext.createMediaStreamDestination();

    const micSource = audioContext.createMediaStreamSource(micStream);
    micSource.connect(destination);

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

    if (audioContext && audioContext.state !== "closed") {
        audioContext.close();
    }

    // Cambiar imagen del botón de grabación a negro
    const recImg = document.getElementById('recButton' + part);
    if (recImg) {
        recImg.src = 'boton-recnegro.png';
    }

    // Cambiar imagen del botón de stop a rojo
    const stopBtn = document.getElementById('stopRecordingButton' + part);
    if (stopBtn) {
        stopBtn.style.backgroundImage = "url('detenerr1rojo.png')";
        stopBtn.style.display = 'inline-block'; // Mostrar el botón si lo ocultabas antes
        stopBtn.style.width = '100px';  // Asegúrate de darle tamaño si usas backgroundImage
        stopBtn.style.height = '100px';
        stopBtn.style.backgroundSize = 'contain';
        stopBtn.style.backgroundRepeat = 'no-repeat';
        stopBtn.style.border = 'none';
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

document.getElementById('nextButton1').addEventListener('click', () => {
    stopRecording(1);
    nextSection(1); // 🔹 Ahora cambia de pantalla después de grabar
});

document.getElementById('nextButton2').addEventListener('click', () => {
    stopRecording(2); // Primero detenemos la grabación
    nextSection(2);   // Luego pasamos a la siguiente pantalla
});


function nextSection(part) {
    if (part === 1) {
        document.getElementById('testSection1').style.display = 'none';
        document.getElementById('instructionAudio1').pause();
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

    audio.src = `audios/Fonologica_2.wav`;
    letterDisplay.textContent = 'S';

    audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration;

        setTimeout(() => {
            startRecording(part);
        }, (duration - 2) * 1000);

        // Mostrar letra durante los últimos 3 segundos
        const interval = setInterval(() => {
            const timeRemaining = (audio.duration - audio.currentTime) / audio.playbackRate;
            if (timeRemaining <= 3 && timeRemaining > 0) {
                letterDisplay.style.display = 'block';
            }
        }, 100);

        // Al terminar el audio
        audio.addEventListener('ended', () => {
            clearInterval(interval);
            letterDisplay.style.display = 'none';
            document.getElementById('nextButton' + part).style.display = 'inline-block';
            const beep = new Audio('beep.wav');
            beep.play();
        });
    });
}



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
    
        // Obtener la fecha actual en formato DD_MM_YYYY
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${day}_${month}_${year}`;
    
        // Calcular el tiempo total en milisegundos
        const totalTime = Date.now() - startTime;
        const totalTimeSecs = (totalTime / 1000).toFixed(3).replace('.', ',');
    
        // Crear el contenido del archivo .csv con el tiempo total y las iniciales del examinador
        const txtContent = `TotTime;Examinador\n${totalTimeSecs};${inicialesExaminador}`;
        const timeBlob = new Blob([txtContent], { type: 'text/csv' });
        const timeUrl = URL.createObjectURL(timeBlob);
    
        // Crear un objeto JSZip para agregar archivos
        const zip = new JSZip();
        
        // Agregar el archivo CSV al ZIP
        zip.file(`${idParticipante}_8_Fluidez_Verbal_Fonologica_${inicialesExaminador}_${formattedDate}.csv`, timeBlob);
    
        // Crear y agregar el archivo de audio al ZIP
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        zip.file(`${idParticipante}_8_Fluidez_Verbal_Fonologica_${inicialesExaminador}_${formattedDate}.wav`, audioBlob);
    
        // Generar el archivo ZIP
        zip.generateAsync({ type: 'blob' }).then(content => {
            const zipLink = document.createElement('a');
            zipLink.href = URL.createObjectURL(content);
    
            // Construir el nombre del archivo ZIP con las iniciales
            const zipFilename = `${idParticipante}_8_Fluidez_Verbal_Fonologica_${inicialesExaminador}_${formattedDate}.zip`;
    
            zipLink.download = zipFilename;
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

