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
    const initRecordingButton1 = document.getElementById('initRecordingButton1');
    const stopRecordingButton1 = document.getElementById('stopRecordingButton1');

    // ENSAYO 2
    const wordsScreen2 = document.getElementById('words2');
    const Ensayo2Screen = document.getElementById('ensayo2');
    const NXButton2 = document.getElementById('nxbutton2');
    const NXButton3 = document.getElementById('nxbutton3');
    const audio2_e = document.getElementById('audio2_ensayo2');
    const audio3_e = document.getElementById('audio3_ensayo2');
    const recordingControls2 = document.getElementById('recordingControls2');
    const startRecordingButton2 = document.getElementById('startRecordingButton2');
    const initRecordingButton2 = document.getElementById('initRecordingButton2');
    const stopRecordingButton2 = document.getElementById('stopRecordingButton2');

    // ENSAYO 3
    const Ensayo3Screen = document.getElementById('ensayo3');
    const wordsScreen3 = document.getElementById('words3');
    const NXButton4 = document.getElementById('nxbutton4');
    const NXButton5 = document.getElementById('nxbutton5');
    const audio2_e3 = document.getElementById('audio2_ensayo3');
    const audio3_e3 = document.getElementById('audio3_ensayo3');
    const recordingControls3 = document.getElementById('recordingControls3');
    const startRecordingButton3 = document.getElementById('startRecordingButton3');
    const initRecordingButton3 = document.getElementById('initRecordingButton3');
    const stopRecordingButton3 = document.getElementById('stopRecordingButton3');

    //ENDSCREEN
    const endScreen = document.getElementById('finish');
    const finishScreen = document.getElementById('finishScreen');
    const NXButton6 = document.getElementById('nxbutton6');

    let mediaRecorder;
    let audioChunks = [];
    let recordingInterval;
    let startTime = new Date();
    let finishTime;

    console.log(`${startTime}`);
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
        finishTime = new Date();
        console.log(`${finishTime}`)
        startFinishTimer();
        saveToCSV();
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
        startRecording(initRecordingButton1, stopRecordingButton1, 'HVLT-R Ensayo 1.mp3');
        initRecordingButton1.style.display = 'block';
        stopRecordingButton1.style.display = 'block';
        startRecordingButton1.style.display = 'none';
    });

    stopRecordingButton1.addEventListener('click', () => {
        stopRecording(initRecordingButton1, stopRecordingButton1, startRecordingButton1);
    });

    startRecordingButton2.addEventListener('click', () => {
        startRecording(initRecordingButton2, stopRecordingButton2, 'HVLT-R Ensayo 2.mp3');
        initRecordingButton2.style.display = 'block';
        stopRecordingButton2.style.display = 'block';
        startRecordingButton2.style.display = 'none';
    });

    stopRecordingButton2.addEventListener('click', () => {
        stopRecording(initRecordingButton2, stopRecordingButton2, startRecordingButton2);
    });

    startRecordingButton3.addEventListener('click', () => {
        startRecording(initRecordingButton3, stopRecordingButton3, 'HVLT-R Ensayo 3.mp3');
        initRecordingButton3.style.display = 'block';
        stopRecordingButton3.style.display = 'block';
        startRecordingButton3.style.display = 'none';
    });

    stopRecordingButton3.addEventListener('click', () => {
        stopRecording(initRecordingButton3, stopRecordingButton3, startRecordingButton3);
    });

    function startRecording(initButton, stopButton, fileName) {
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

                stopButton.textContent = '';
                initButton.disabled = true;
                stopButton.disabled = false;
            });
    }

    function stopRecording(initButton, stopButton, startButton) {
        clearInterval(recordingInterval);
        recordingSeconds = 0;
        mediaRecorder.stop();

        stopButton.textContent = '';
        initButton.disabled = false;
        stopButton.disabled = true;
        startButton.style.display = 'block';
        initButton.style.display = 'none';
        stopButton.style.display = 'none';
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
    
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    function saveToCSV() {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const startTimeFormatted = new Date(startTime).toLocaleString('en-US', options); 
        const finishTimeFormatted = new Date(finishTime).toLocaleString('en-US', options); 
    
        const timeSpent = (finishTime - startTime) / 1000; 
        const timeSpentFormatted = formatTime(timeSpent);
    
        const csvContent = `data:text/csv;charset=utf-8,Start Time,Finish Time,Time Spent (HH:MM:SS)\n${startTimeFormatted},${finishTimeFormatted},${timeSpentFormatted}`;
    
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'HVLT-R_Recuerdo_Libre_Inmediato.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
