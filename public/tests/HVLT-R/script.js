document.addEventListener('DOMContentLoaded', () => {
    // MAIN-SCREEN
    const mainScreen = document.getElementById('main-screen');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const startButton = document.getElementById('startButton');
    const DownloadButton = document.getElementById('download');
    // ENSAYO 1
    const wordsScreen = document.getElementById('words');
    const NXButton = document.getElementById('nxbutton');

    const audioE1 = document.getElementById('audio_E1')
    const recordingControls1 = document.getElementById('recordingControls1');
    const initRecordingButton1 = document.getElementById('initRecordingButton1');
    const stopRecordingButton1 = document.getElementById('stopRecordingButton1');

    // ENSAYO 2
    const wordsScreen2 = document.getElementById('words2');
    const Ensayo2Screen = document.getElementById('ensayo2');
    const NXButton2 = document.getElementById('nxbutton2');
    const NXButton3 = document.getElementById('nxbutton3');

    const audioE2 = document.getElementById('audio_E2')
    const recordingControls2 = document.getElementById('recordingControls2');
    const initRecordingButton2 = document.getElementById('initRecordingButton2');
    const stopRecordingButton2 = document.getElementById('stopRecordingButton2');

    // ENSAYO 3
    const Ensayo3Screen = document.getElementById('ensayo3');
    const wordsScreen3 = document.getElementById('words3');
    const NXButton4 = document.getElementById('nxbutton4');
    const NXButton5 = document.getElementById('nxbutton5');

    const audioE3 = document.getElementById('audio_E3')
    const recordingControls3 = document.getElementById('recordingControls3');
    const initRecordingButton3 = document.getElementById('initRecordingButton3');
    const stopRecordingButton3 = document.getElementById('stopRecordingButton3');

    //ENDSCREEN
    const endScreen = document.getElementById('finish');
    const finishScreen = document.getElementById('finishScreen');
    const NXButton6 = document.getElementById('nxbutton6');
    let startTime = new Date();
    let fecha = new Date();

    let endTimeExecution3 = null; // EndTimeExecution

    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();

    let is_recording = false;

    let mediaRecorder;
    let audioChunks = [];
    let audioContext;
    let destination;
    let micStream;
    let audioElementStream;
    let combinedStream;

    // An array to hold all the audio files to be zipped
    const audioFiles = [];

    // Include JSZip script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js';
    document.head.appendChild(script);

    console.log(`${startTime}`);
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

    startButton.addEventListener('click', () => {
        pauseAudios();
        mainScreen.style.display = 'none';
        wordsScreen.style.display = 'block';
    });

    NXButton.addEventListener('click', () => {
        stopRecording(initRecordingButton1, stopRecordingButton1); // Detener y guardar la grabación
        wordsScreen.style.display = 'none';
        recordingControls1.style.display = 'none';
        Ensayo2Screen.style.display = 'flex';
    });

    NXButton2.addEventListener('click', () => {
        pauseAudios();
        Ensayo2Screen.style.display = 'none';
        wordsScreen2.style.display = 'block';
    });

    NXButton3.addEventListener('click', () => {
        stopRecording(initRecordingButton2, stopRecordingButton2); // Detener y guardar la grabación
        wordsScreen2.style.display = 'none';
        recordingControls2.style.display = 'none';
        Ensayo3Screen.style.display = 'flex';
    });

    NXButton4.addEventListener('click', () => {
        pauseAudios();
        Ensayo3Screen.style.display = 'none';
        wordsScreen3.style.display = 'block';
    });

    NXButton5.addEventListener('click', () => {
        stopRecording(initRecordingButton3, stopRecordingButton3); // Detener y guardar la grabación
        wordsScreen3.style.display = 'none';
        recordingControls3.style.display = 'none';
        endScreen.style.display = 'flex';

    });

    NXButton6.addEventListener('click', () => {
        pauseAudios();
        endScreen.style.display = 'none';
        finishScreen.style.display = 'flex';
        endTimeExecution3 = new Date();
        console.log(`${endTimeExecution3}`);
        localStorage.setItem('endTimeExecution3', endTimeExecution3);
    });


    NXButton6.addEventListener('click', () => {
        downloadZip();
    });

    audioE1.addEventListener('timeupdate', () => {
        if (audioE1.currentTime >= audioE1.duration - 1) {
            // Iniciar la grabación un segundo antes de que termine el audio
            if (!is_recording) {
            startRecording(initRecordingButton1, stopRecordingButton1, 'HVLT-R Ensayo 1.wav');
            };
        }
    });

    audioE1.addEventListener('ended', () => {
        audioE1.style.display = 'none';
        recordingControls1.style.display = 'block';
    });

    audioE2.addEventListener('timeupdate', () => {
        if (audioE2.currentTime >= audioE2.duration - 1) {
            // Iniciar la grabación un segundo antes de que termine el audio
            if (!is_recording) {
            startRecording(initRecordingButton2, stopRecordingButton2, 'HVLT-R Ensayo 2.wav');
            };
        }
    });

    audioE2.addEventListener('ended', () => {
        audioE2.style.display = 'none';
        recordingControls2.style.display = 'block';

    });

    audioE3.addEventListener('timeupdate', () => {
        if (audioE3.currentTime >= audioE3.duration - 1) {
            // Iniciar la grabación un segundo antes de que termine el audio
            if (!is_recording) {
                startRecording(initRecordingButton3, stopRecordingButton3, 'HVLT-R Ensayo 3.wav');
            };
        }
    });

    audioE3.addEventListener('ended', () => {
        audioE3.style.display = 'none';
        recordingControls3.style.display = 'block';

    });

    initRecordingButton1.addEventListener('click', () => {
        startRecording(initRecordingButton1, stopRecordingButton1, 'HVLT-R Ensayo 1.wav');
    });

    initRecordingButton2.addEventListener('click', () => {
        startRecording(initRecordingButton2, stopRecordingButton2, 'HVLT-R Ensayo 2.wav');
    });

    initRecordingButton3.addEventListener('click', () => {
        startRecording(initRecordingButton3, stopRecordingButton3, 'HVLT-R Ensayo 3.wav');
    });

    stopRecordingButton1.addEventListener('click', () => {
        stopRecording(initRecordingButton1, stopRecordingButton1);
        initRecordingButton1.style.display = 'none';
    });

    stopRecordingButton2.addEventListener('click', () => {
        stopRecording(initRecordingButton2, stopRecordingButton2);
        initRecordingButton2.style.display = 'none';
    });

    stopRecordingButton3.addEventListener('click', () => {
        stopRecording(initRecordingButton3, stopRecordingButton3);
        initRecordingButton3.style.display = 'none';
    });

    async function startRecording(initButton, stopButton, fileName) {
        is_recording = true;
        audioChunks = [];

        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const beep = new Audio('audios/beep.wav');
        beep.crossOrigin = "anonymous";
        beep.play();

        audioContext = new AudioContext();

        destination = audioContext.createMediaStreamDestination();

        const micSource = audioContext.createMediaStreamSource(micStream);
        micSource.connect(destination);

        const audioElementSource = audioContext.createMediaElementSource(beep);
        audioElementSource.connect(audioContext.destination);
        audioElementSource.connect(destination);

        combinedStream = destination.stream;

        mediaRecorder = new MediaRecorder(combinedStream);
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.start();

        mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
            audioFiles.push({ blob: audioBlob, fileName: fileName });
        });
        initButton.disabled = true;
        stopButton.disabled = false;
    }

    function stopRecording(initButton, stopButton) {
        if (is_recording) {
            if (mediaRecorder) {
                mediaRecorder.stop();
                stopButton.disabled = true;
                initButton.disabled = false;
                is_recording = false;
            } else {
                console.warn('No mediaRecorder available to stop.');
            }
        }
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Obtener el id_participante de la URL
    const idParticipante = getQueryParam('id_participante');

    function saveToCSV() {

        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const startTimeFormatted = new Date(startTime).toLocaleString('en-US', options);
        const finishTimeFormatted = new Date(endTimeExecution3).toLocaleString('en-US', options);

        const timeSpent = (endTimeExecution3 - startTime) / 1000;
        const timeSpentFormatted = formatTime(timeSpent);

        const csvContent = `Start Time;Finish Time;Time Spent (HH:MM:SS)\n${startTimeFormatted};${finishTimeFormatted};${timeSpentFormatted}`;
        return csvContent;
    }

    let diaStr = dia.toString().padStart(2, '0');
    let mesStr = mes.toString().padStart(2, '0');
    let añoStr = año.toString().padStart(4, '0');

    function downloadZip() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }

        const zip = new JSZip();

        audioFiles.forEach((file) => {
            zip.file(file.fileName, file.blob);
        });

        const csvContent = saveToCSV();
        zip.file('HVLT-R_Recuerdo_Libre_Inmediato_.csv', csvContent);

        zip.generateAsync({ type: 'blob' }).then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = `${idParticipante}_HVLT-R_Inmediato_${diaStr}_${mesStr}_${añoStr}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => {
                window.close();
            }, 1000);
        });
    }

    function startFinishTimer() {
        setTimeout(() => {
            playBeepSound();
        }, 20 * 60 * 1000); // 20 minutos en milisegundos
    }

    function playBeepSound() {
        const beep = new Audio('audios/beep.wav');
        beep.play();
    }

    function pauseAudios() {
        document.getElementById('audio1').pause();
        document.getElementById('audio4').pause();
        document.getElementById('audio5').pause();
        document.getElementById('audio7').pause();
    }
});
