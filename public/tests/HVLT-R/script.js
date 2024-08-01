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
    const initRecordingButton3 = document.getElementById('initRecordingButton3');
    const stopRecordingButton3 = document.getElementById('stopRecordingButton3');

    //ENDSCREEN
    const endScreen = document.getElementById('finish');
    const finishScreen = document.getElementById('finishScreen');
    const NXButton6 = document.getElementById('nxbutton6');

    let mediaRecorder;
    let audioChunks = [];
    let startTime = new Date();
    let finishTime;

    // An array to hold all the audio files to be zipped
    const audioFiles = [];

    // Include JSZip script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js';
    document.head.appendChild(script);

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
        console.log(`${finishTime}`);
        startFinishTimer();
        downloadZip();
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
        startRecording(initRecordingButton1, stopRecordingButton1, 'HVLT-R Ensayo 1.mp3');
    });

    audio3_e.addEventListener('ended', () => {
        audio3_e.style.display = 'none';
        recordingControls2.style.display = 'block';
        startRecording(initRecordingButton2, stopRecordingButton2, 'HVLT-R Ensayo 2.mp3');
    });

    audio3_e3.addEventListener('ended', () => {
        audio3_e3.style.display = 'none';
        recordingControls3.style.display = 'block';
        startRecording(initRecordingButton3, stopRecordingButton3, 'HVLT-R Ensayo 3.mp3');
    });

    initRecordingButton1.addEventListener('click', () => {
        startRecording(initRecordingButton1, stopRecordingButton1, 'HVLT-R Ensayo 1.mp3');
    });

    initRecordingButton2.addEventListener('click', () => {
        startRecording(initRecordingButton2, stopRecordingButton2, 'HVLT-R Ensayo 2.mp3');
    });

    initRecordingButton3.addEventListener('click', () => {
        startRecording(initRecordingButton3, stopRecordingButton3, 'HVLT-R Ensayo 3.mp3');
    });

    stopRecordingButton1.addEventListener('click', () => {
        stopRecording(initRecordingButton1, stopRecordingButton1);
    });

    stopRecordingButton2.addEventListener('click', () => {
        stopRecording(initRecordingButton2, stopRecordingButton2);
    });

    stopRecordingButton3.addEventListener('click', () => {
        stopRecording(initRecordingButton3, stopRecordingButton3);
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
                    audioFiles.push({ blob: audioBlob, fileName: fileName });
                });

                initButton.disabled = true;
                stopButton.disabled = false;
            })
            .catch(err => {
                console.error('Error accessing media devices.', err);
            });
    }

    function stopRecording(initButton, stopButton) {
        mediaRecorder.stop();
        stopButton.disabled = true;
        initButton.disabled = false;
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

        const csvContent = `Start Time,Finish Time,Time Spent (HH:MM:SS)\n${startTimeFormatted},${finishTimeFormatted},${timeSpentFormatted}`;
        return csvContent;
    }

    function downloadZip() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }

        const zip = new JSZip();
        
        // Agregar archivos de audio al zip
        audioFiles.forEach((file) => {
            zip.file(file.fileName, file.blob);
        });

        // Agregar el archivo CSV al zip
        const csvContent = saveToCSV();
        zip.file('HVLT-R_Recuerdo_Libre_Inmediato.csv', csvContent);

        // Generar y descargar el zip
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'HVLT-R RecuerdoLibreInmediato.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    function startFinishTimer() {
        setTimeout(() => {
            playBeepSound();
        }, 0.1 * 60 * 1000); // 20 minutos en milisegundos
    }
    
    function playBeepSound() {
        const beep = new Audio('beep.wav');
        beep.play();
    }
});
