document.getElementById('startTestButton').addEventListener('click', () => {
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


let mediaRecorder1, mediaRecorder2, mediaRecorder3, mediaRecorder4, mediaRecorder5;
let audioChunks1 = [], audioChunks2 = [], audioChunks3 = [], audioChunks4 = [], audioChunks5 = [];
let mediaRecorders = [null, mediaRecorder1, mediaRecorder2, mediaRecorder3, mediaRecorder4, mediaRecorder5];
let audioChunks = [null, audioChunks1, audioChunks2, audioChunks3, audioChunks4, audioChunks5];
let timers = [null, null, null, null, null, null];

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
            document.getElementById('permission-message').classList.add('hidden');
        })
        .catch(err => {
            console.error('Error al solicitar permisos de micrófono:', err);
            document.getElementById('permission-message').classList.remove('hidden');
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
        const downloadLink = document.getElementById('downloadLink' + part);
        downloadLink.href = audioUrl;
        downloadLink.download = `Parte ${part}.wav`;
        downloadLink.style.display = 'none';
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
document.getElementById('stopRecordingButton3').addEventListener('click', () => stopRecording(3));
document.getElementById('stopRecordingButton4').addEventListener('click', () => stopRecording(4));
document.getElementById('stopRecordingButton5').addEventListener('click', () => stopRecording(5));

document.getElementById('nextButton1').addEventListener('click', () => {
    document.getElementById('testSection1').style.display = 'none';
    document.getElementById('testSection2').style.display = 'block';
    loadAudio(2); // Cargar el segundo audio
});

document.getElementById('nextButton2').addEventListener('click', () => {
    document.getElementById('testSection2').style.display = 'none';
    document.getElementById('categoryFluency1').style.display = 'block';
    loadAudio(3); // Cargar el tercer audio
});

document.getElementById('nextButton3').addEventListener('click', () => {
    document.getElementById('categoryFluency1').style.display = 'none';
    document.getElementById('categoryFluency2').style.display = 'block';
    loadAudio(4); // Cargar el cuarto audio
});

document.getElementById('nextButton4').addEventListener('click', () => {
    document.getElementById('categoryFluency2').style.display = 'none';
    document.getElementById('categoryFluency3').style.display = 'block';
    loadAudio(5); // Cargar el quinto audio
});

document.getElementById('nextButton5').addEventListener('click', () => {
    document.getElementById('categoryFluency3').style.display = 'none';
    document.getElementById('downloadLinksContainer').style.display = 'block';
    const downloadLinks = document.getElementById('downloadLinks');
    for (let i = 1; i <= 5; i++) {
        const downloadLink = document.createElement('a');
        downloadLink.href = document.getElementById('downloadLink' + i).href;
        downloadLink.download = 'recording' + i + '.wav';
        downloadLink.textContent = 'Descargar Grabación ' + i;
        downloadLink.style.display = 'block';
        downloadLinks.appendChild(downloadLink);
    }
    document.getElementById('finishButton').style.display = 'none';
});

document.getElementById('finishButton').addEventListener('click', () => {
    document.getElementById('downloadLinksContainer').style.display = 'none';
    document.getElementById('completionMessage').style.display = 'block';
});

function loadAudio(part) {
    const audio = document.getElementById('instructionAudio' + part);
    switch (part) {
        case 1:
            audio.src = 'audios/P.mp3';
            break;
        case 2:
            audio.src = 'audios/M.mp3';
            break;
        case 3:
            audio.src = 'audios/prendas-de-vestir.mp3';
            break;
        case 4:
            audio.src = 'audios/animales.mp3';
            break;
        case 5:
            audio.src = 'audios/vegetales.mp3';
            break;
    }

    audio.addEventListener('ended', () => {
        startRecording(part);
    });
}

function showRecordingCreatedMessage(part) {
    const messageElement = document.getElementById('recordingCreatedMessage' + part);
    messageElement.style.display = 'block';
}
    