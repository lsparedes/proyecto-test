document.getElementById('startTestButton').addEventListener('click', () => {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('testSection1').style.display = 'block';
    loadAudio(1); // Cargar el primer audio
});

document.getElementById('fullscreenButton').addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
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
        const downloadLink = document.getElementById('downloadLink' + part);
        downloadLink.href = audioUrl;
        downloadLink.download = `Parte ${part}.wav`;
        downloadLink.style.display = 'block';
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
    document.getElementById('testSection1').style.display = 'none';
    document.getElementById('testSection2').style.display = 'block';
    loadAudio(2); // Cargar el segundo audio
});

document.getElementById('nextButton2').addEventListener('click', () => {
    document.getElementById('testSection2').style.display = 'none';
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
    }

    audio.addEventListener('ended', () => {
        document.getElementById('startRecButton' + part).style.display = 'inline-block'; // Mostrar botón para comenzar grabación
    });
}

document.getElementById('startRecButton1').addEventListener('click', () => {
    startRecording(1);
    document.getElementById('startRecButton1').style.display = 'none'; // Ocultar botón después de hacer clic
    document.getElementById('recButton1').style.display = 'inline-block'; // Mostrar imagen de grabando
});

document.getElementById('startRecButton2').addEventListener('click', () => {
    startRecording(2);
    document.getElementById('startRecButton2').style.display = 'none'; // Ocultar botón después de hacer clic
    document.getElementById('recButton2').style.display = 'inline-block'; // Mostrar imagen de grabando
});

function showRecordingCreatedMessage(part) {
    const messageElement = document.getElementById('recordingCreatedMessage' + part);
    messageElement.style.display = 'block';
}
