document.addEventListener('DOMContentLoaded', () => {
    // MAIN-SCREEN
    const mainScreen = document.getElementById('main-screen');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const startButton = document.getElementById('startButton');

    // ENSAYO 1
    const wordsScreen = document.getElementById('words');

    const NXButton = document.getElementById('nxbutton');

    const audio2 = document.getElementById('audio2');
    const audio3 = document.getElementById('audio3');

    const recordingControls1 = document.getElementById('recordingControls1');
    const startRecordingButton1 = document.getElementById('startRecordingButton1');
    const stopRecordingButton1 = document.getElementById('stopRecordingButton1');

    const recordingStatus1 = document.getElementById('recordingStatus1');
    const recordingTime1 = document.getElementById('recordingTime1');

    // ENSAYO 2
    const wordsScreen2 = document.getElementById('words2');
    const Ensayo2Screen = document.getElementById('ensayo2');

    const NXButton2 = document.getElementById('nxbutton2');
    const NXButton3 = document.getElementById('nxbutton3');

    const audio2_e = document.getElementById('audio2_ensayo2');
    const audio3_e = document.getElementById('audio3_ensayo2');

    const recordingControls2 = document.getElementById('recordingControls2');
    const startRecordingButton2 = document.getElementById('startRecordingButton2');
    const stopRecordingButton2 = document.getElementById('stopRecordingButton2');

    const recordingStatus2 = document.getElementById('recordingStatus2');
    const recordingTime2 = document.getElementById('recordingTime2');

    // ENSAYO 3
    const Ensayo3Screen = document.getElementById('ensayo3');
    const wordsScreen3 = document.getElementById('words3');

    const NXButton4 = document.getElementById('nxbutton4');
    const NXButton5 = document.getElementById('nxbutton5');

    const audio2_e3 = document.getElementById('audio2_ensayo3');
    const audio3_e3 = document.getElementById('audio3_ensayo3');

    const recordingControls3 = document.getElementById('recordingControls3');
    const startRecordingButton3 = document.getElementById('startRecordingButton3');
    const stopRecordingButton3 = document.getElementById('stopRecordingButton3');

    const recordingStatus3 = document.getElementById('recordingStatus3');
    const recordingTime3 = document.getElementById('recordingTime3');

    //ENDSCREEN
    const endScreen = document.getElementById('finish');
    const finishScreen = document.getElementById('finishScreen');
    const NXButton6 = document.getElementById('nxbutton6')


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

    startButton.addEventListener('click', () => {
        mainScreen.style.display = 'none';
        wordsScreen.style.display = 'block';
    });

    NXButton.addEventListener('click', () => {
        wordsScreen.style.display = 'none';
        recordingControls1.style.display = 'none';
        Ensayo2Screen.style.display = 'block';
    });

    NXButton2.addEventListener('click', () => {
        Ensayo2Screen.style.display = 'none';
        wordsScreen2.style.display = 'block';
    });

    NXButton3.addEventListener('click', () => {
        wordsScreen2.style.display = 'none';
        recordingControls2.style.display = 'none';
        Ensayo3Screen.style.display = 'block';
    });

    NXButton4.addEventListener('click', () => {
        Ensayo3Screen.style.display = 'none';
        wordsScreen3.style.display = 'block';
    });

    NXButton5.addEventListener('click', () => {
        wordsScreen3.style.display = 'none';
        recordingControls3.style.display = 'none';
        endScreen.style.display = 'block';
    });

    NXButton6.addEventListener('click', () => {
        endScreen.style.display = 'none';
        finishScreen.style.display = 'block';
        startFinishTimer();
    });

    audio2.addEventListener('ended', () => {
        audio2.style.display = 'none';
    });

    audio2_e.addEventListener('ended', () => {
        audio2_e.style.display = 'none';
    });

    audio2_e3.addEventListener('ended', () => {
        audio2_e3.style.display = 'none';
    });

    audio3.addEventListener('ended', () => {
        audio3.style.display = 'none';
        recordingControls1.style.display = 'block';
    });

    audio3_e.addEventListener('ended', () => {
        audio3_e.style.display = 'none';
        recordingControls2.style.display = 'block';
    });

    audio3_e3.addEventListener('ended', () => {
        audio3_e3.style.display = 'none';
        recordingControls3.style.display = 'block';
    });

    startRecordingButton1.addEventListener('click', () => {
        startRecording(recordingTime1, recordingStatus1, startRecordingButton1, stopRecordingButton1, 'HVLT-R Ensayo 1.mp3');
    });

    stopRecordingButton1.addEventListener('click', () => {
        stopRecording(recordingTime1, recordingStatus1, startRecordingButton1, stopRecordingButton1);
    });

    startRecordingButton2.addEventListener('click', () => {
        startRecording(recordingTime2, recordingStatus2, startRecordingButton2, stopRecordingButton2, 'HVLT-R Ensayo 2.mp3');
    });

    stopRecordingButton2.addEventListener('click', () => {
        stopRecording(recordingTime2, recordingStatus2, startRecordingButton2, stopRecordingButton2);
    });

    startRecordingButton3.addEventListener('click', () => {
        startRecording(recordingTime3, recordingStatus3, startRecordingButton3, stopRecordingButton3, 'HVLT-R Ensayo 3.mp3');
    });

    stopRecordingButton3.addEventListener('click', () => {
        stopRecording(recordingTime3, recordingStatus3, startRecordingButton3, stopRecordingButton3);
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
