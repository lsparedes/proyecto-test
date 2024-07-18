document.getElementById('startTestButton').addEventListener('click', () => {
    document.getElementById('instructions').style.display = 'none';
    document.getElementById('categoryFluency1').style.display = 'block';
    loadAudio(1); // Cargar el primer audio
});

document.getElementById('fullscreenButton').addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
});

let mediaRecorder3, mediaRecorder4, mediaRecorder5;
let audioChunks3 = [], audioChunks4 = [], audioChunks5 = [];
let mediaRecorders = [null, mediaRecorder3, mediaRecorder4, mediaRecorder5];
let audioChunks = [null, audioChunks3, audioChunks4, audioChunks5];
let timers = [null, null, null, null];

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
        const downloadLink = document.getElementById('downloadLink' + (part + 2)); // Ajustar el índice para este test
        downloadLink.href = audioUrl;
        downloadLink.download = `Parte ${part}.wav`;
        downloadLink.style.display = 'block';
        document.getElementById('nextButton' + (part + 2)).style.display = 'inline-block';
        showRecordingCreatedMessage(part);
        clearInterval(timers[part]); // Clear the timer when recording stops
    });

    document.getElementById('stopRecordingButton' + (part + 2)).style.display = 'inline-block';
    document.getElementById('recButton' + (part + 2)).style.display = 'inline-block';
    startTimer(part); // Start the timer
}

function stopRecording(part) {
    if (mediaRecorders[part]) {
        mediaRecorders[part].stop();
        document.getElementById('stopRecordingButton' + (part + 2)).style.display = 'none';
        document.getElementById('recButton' + (part + 2)).style.display = 'none';
        document.getElementById('instructionAudio' + (part + 2)).style.display = 'none'; // Ocultar el reproductor de audio
    }
}

function startTimer(part) {
    let timeLeft = 60;
    timers[part] = setInterval(() => {
        if (timeLeft === 0) {
            document.getElementById('stopRecordingButton' + (part + 2)).style.backgroundImage = 'url("detenerr.png")'; // Change to new icon
        }
        timeLeft--;
    }, 1000);
}

document.getElementById('stopRecordingButton3').addEventListener('click', () => stopRecording(1));
document.getElementById('stopRecordingButton4').addEventListener('click', () => stopRecording(2));
document.getElementById('stopRecordingButton5').addEventListener('click', () => stopRecording(3));

document.getElementById('nextButton3').addEventListener('click', () => {
    document.getElementById('categoryFluency1').style.display = 'none';
    document.getElementById('categoryFluency2').style.display = 'block';
    loadAudio(2); // Cargar el segundo audio
});

document.getElementById('nextButton4').addEventListener('click', () => {
    document.getElementById('categoryFluency2').style.display = 'none';
    document.getElementById('categoryFluency3').style.display = 'block';
    loadAudio(3); // Cargar el tercer audio
});

document.getElementById('nextButton5').addEventListener('click', () => {
    document.getElementById('categoryFluency3').style.display = 'none';
    document.getElementById('completionMessage').style.display = 'block';
});

function loadAudio(part) {
    const audio = document.getElementById('instructionAudio' + (part + 2)); // Ajustar el índice para este test
    switch (part) {
        case 1:
            audio.src = 'audios/prendas-de-vestir.mp3';
            break;
        case 2:
            audio.src = 'audios/animales.mp3';
            break;
        case 3:
            audio.src = 'audios/vegetales.mp3';
            break;
    }

    audio.addEventListener('ended', () => {
        document.getElementById('startRecButton' + (part + 2)).style.display = 'inline-block'; // Mostrar botón para comenzar grabación
    });
}

document.getElementById('startRecButton3').addEventListener('click', () => {
    startRecording(1);
    document.getElementById('startRecButton3').style.display = 'none'; // Ocultar botón después de hacer clic
    document.getElementById('recButton3').style.display = 'inline-block'; // Mostrar imagen de grabando
});

document.getElementById('startRecButton4').addEventListener('click', () => {
    startRecording(2);
    document.getElementById('startRecButton4').style.display = 'none'; // Ocultar botón después de hacer clic
    document.getElementById('recButton4').style.display = 'inline-block'; // Mostrar imagen de grabando
});

document.getElementById('startRecButton5').addEventListener('click', () => {
    startRecording(3);
    document.getElementById('startRecButton5').style.display = 'none'; // Ocultar botón después de hacer clic
    document.getElementById('recButton5').style.display = 'inline-block'; // Mostrar imagen de grabando
});

function showRecordingCreatedMessage(part) {
    const messageElement = document.getElementById('recordingCreatedMessage' + (part + 2)); // Ajustar el índice para este test
    messageElement.style.display = 'block';
}
