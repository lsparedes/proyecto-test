document.addEventListener('DOMContentLoaded', () => {
    const startButton2 = document.getElementById('startButton2');
    const mainScreen2 = document.getElementById('main-screen2');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const audio1_ej2 = document.getElementById('audio1_ejercicio2');
    const finishScreen = document.getElementById('finishScreen');
    const recordingControls4 = document.getElementById('recordingControls4');
    const startRecordingButton4 = document.getElementById('startRecordingButton4');
    const stopRecordingButton4 = document.getElementById('stopRecordingButton4');
    const enterID = document.getElementById('enterID');
    let mediaRecorder;
    let audioChunks = [];
    let recordingInterval;
    let recordingSeconds = 0;
    let startTime = new Date();
    let finishTime;
    let audioBlob;  // Guardar el audioBlob aquí para uso posterior
    const audioFiles = [];

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
        startRecording('HVLT-R Ensayo 1.mp3');
    });

    startRecordingButton4.addEventListener('click', () => {
        startRecording();
    });

    stopRecordingButton4.addEventListener('click', () => {
        recordingControls4.style.display = 'none';
        finishScreen.style.display = 'block';
        enterID.style.display = 'inline-block';
        startRecordingButton4.style.display = 'none';
        stopRecording();
        finishTime = new Date();
    });

    function startRecording(fileName) {
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
                    audioFiles.push({ blob: audioBlob, fileName: fileName })
                });

                recordingInterval = setInterval(() => {
                    recordingSeconds++;
                }, 1000);

                startRecordingButton4.disabled = true;
                stopRecordingButton4.disabled = false;
            });
    }

    function stopRecording() {
        clearInterval(recordingInterval);
        recordingSeconds = 0;
        mediaRecorder.stop();
        startRecordingButton4.disabled = false;
        stopRecordingButton4.disabled = true;
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

        const csvContent = `Start Time,Finish Time,Time Spent (HH:MM:SS),Audio URL\n${startTimeFormatted},${finishTimeFormatted},${timeSpentFormatted}`;
        return csvContent;
    }

    document.getElementById('participantID').addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            validateInputs();
            generateZip();
        }
    });

    let participantID = 0;

    function validateInputs() {
        participantID = document.getElementById('participantID').value;
    }

    function generateZip() {
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
        zip.file('HVLT-R_Recuerdo_Libre_Diferido_.csv', csvContent);

        // Generar y descargar el zip
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = `HVLT-R RecuerdoLibreDiferido-${participantID}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }
});
