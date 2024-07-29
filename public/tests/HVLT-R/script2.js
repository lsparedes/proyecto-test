document.addEventListener('DOMContentLoaded', () => {
    const startButton2 = document.getElementById('startButton2');
    const mainScreen2 = document.getElementById('main-screen2');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const audio1_ej2 = document.getElementById('audio1_ejercicio2');
    const finishScreen = document.getElementById('finishScreen');
    const recordingControls4 = document.getElementById('recordingControls4');
    const startRecordingButton4 = document.getElementById('startRecordingButton4');
    const stopRecordingButton4 = document.getElementById('stopRecordingButton4');
    const recordingTime4 = document.getElementById('recordingTime4');
    const recordingStatus4 = document.getElementById('recordingStatus4');

    let mediaRecorder;
    let audioChunks = [];
    let recordingInterval;
    let recordingSeconds = 0;

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    startButton2.addEventListener('click', () => {
        mainScreen2.style.display = 'none';
        finishScreen.style.display = 'block';
        startFinishTimer();
    });

    audio1_ej2.addEventListener('ended', () => {
        mainScreen2.style.display = 'none';
        audio1_ej2.style.display = 'none';
        fullscreenButton.style.display = 'none';
        recordingControls4.style.display = 'block';
        startRecording(recordingTime4, recordingStatus4, startRecordingButton4, stopRecordingButton4, 'HVLT-R_Recuerdo_Libre_Diferido.mp3');
    });

    startRecordingButton4.addEventListener('click', () => {
        startRecording(recordingTime4, recordingStatus4, startRecordingButton4, stopRecordingButton4, 'HVLT-R_Recuerdo_Libre_Diferido.mp3');
    });

    stopRecordingButton4.addEventListener('click', () => {
        recordingControls4.style.display = 'none';
        finishScreen.style.display = 'block';
        stopRecording(recordingTime4, recordingStatus4, startRecordingButton4, stopRecordingButton4);
        
    });

    function startRecording(timeDisplay, statusDisplay, startButton, stopButton, fileName) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                audioChunks = [];

                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener('stop', () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const a = document.createElement('a');
                    a.href = audioUrl;
                    a.download = fileName;
                    a.click();
                });

                recordingInterval = setInterval(() => {
                    recordingSeconds++;
                    timeDisplay.textContent = recordingSeconds;
                }, 1000);

                statusDisplay.textContent = 'Grabando...';
                startButton.disabled = true;
                stopButton.disabled = false;

                // Detener la grabación automáticamente después de 1 minuto
                setTimeout(() => {
                    stopRecording(timeDisplay, statusDisplay, startButton, stopButton);
                }, 60 * 1000); // 1 minuto en milisegundos
            });
    }

    function stopRecording(timeDisplay, statusDisplay, startButton, stopButton) {
        clearInterval(recordingInterval);
        recordingSeconds = 0;
        mediaRecorder.stop();

        statusDisplay.textContent = 'Grabación finalizada.';
        startButton.disabled = false;
        stopButton.disabled = true;
    }

    function startFinishTimer() {
        setTimeout(() => {
            playBeepSound();
        }, 20 * 60 * 1000); // 20 minutos en milisegundos
    }

    function playBeepSound() {
        const beep = new Audio('beep.wav');
        beep.play();
    }
});
