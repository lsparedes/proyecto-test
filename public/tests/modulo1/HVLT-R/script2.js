document.addEventListener('DOMContentLoaded', () => {
    const startButton2 = document.getElementById('startButton2');
    const mainScreen2 = document.getElementById('main-screen2');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const audio1_ej2 = document.getElementById('audio1_ejercicio2');
    const finishScreen = document.getElementById('finishScreen');
    const recordingControls4 = document.getElementById('recordingControls4');
    const startRecordingButton4 = document.getElementById('startRecordingButton4');
    const stopRecordingButton4 = document.getElementById('stopRecordingButton4');
    const DownloadButton = document.getElementById('download');
    const NXButton21 = document.getElementById('nxbutton21');
    const mainScreen3 = document.getElementById('main-screen2-1');
    const FinishRecordingImage = document.getElementById('FinishRecordingImage');

    const beep = new Audio('audios/beep.wav');
    beep.load(); // Pre-carga el beep

    let recordingInterval;
    let recordingSeconds = 0;
    let startTime = new Date();
    let finishTime;
    let audioBlob;
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();

    const audioFiles = [];
    let mediaRecorder;
    let audioChunks = [];
    let audioContext;
    let destination;
    let micStream;
    let combinedStream;

    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenEnabled && !document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('minimize.png')";
            document.documentElement.requestFullscreen();
        } else if (document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('full-screen.png')";
            document.exitFullscreen();
        } else {
            console.log('El modo de pantalla completa no es soportado por tu navegador.');
        }
    });

    function stopAllMedia() {
        audio1_ej2.pause();
        audio1_ej2.currentTime = 0;

        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            clearInterval(recordingInterval);
            startRecordingButton4.disabled = false;
            stopRecordingButton4.disabled = true;
        }
    }

    NXButton21.addEventListener('click', () => {
        stopAllMedia();
        mainScreen3.style.display = 'none';
        recordingControls4.style.display = 'none';
        finishScreen.style.display = 'block';
        startRecordingButton4.style.display = 'none';
        DownloadButton.style.display = 'block';
        finishTime = new Date();
    });

    startButton2.addEventListener('click', () => {
        stopAllMedia();
        mainScreen2.style.display = 'none';
        mainScreen3.style.display = 'block';
        recordingControls4.style.display = 'block';
        startRecording('HVLT_delay.wav', false); // false para que no se reproduzca el beep
        startFinishTimer();
    });

    audio1_ej2.addEventListener('play', () => {
        const remainingTime = audio1_ej2.duration - audio1_ej2.currentTime;
        if (remainingTime > 2) {
            setTimeout(() => {
                startRecording('HVLT_delay.wav');
            }, (remainingTime - 2) * 1000);
        } else {
            startRecording('HVLT_delay.wav');
        }
    });

    audio1_ej2.addEventListener('ended', () => {
        mainScreen2.style.display = 'none';
        mainScreen3.style.display = 'block';
        recordingControls4.style.display = 'block';

        beep.play().then(() => {
            startRecording('HVLT_delay.wav');
        }).catch((error) => {
            console.error("Error al reproducir el beep:", error);
            startRecording('HVLT_delay.wav'); // continuar de todas formas
        });

    });

    startRecordingButton4.addEventListener('click', () => {
        stopAllMedia();
        startRecording();
    });

    stopRecordingButton4.addEventListener('click', () => {
        stopAllMedia();
        recordingControls4.style.display = 'none';
        stopRecordingButton4.style.display = 'none';
        FinishRecordingImage.style.display = 'block';
        finishTime = new Date();
    });

    DownloadButton.addEventListener('click', () => {
        generateZip();
    });

    async function startRecording(fileName = 'HVLT_delay.wav') {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });


        audioContext = new AudioContext();
        destination = audioContext.createMediaStreamDestination();

        const micSource = audioContext.createMediaStreamSource(micStream);
        micSource.connect(destination);

        combinedStream = destination.stream;

        audioChunks = [];
        mediaRecorder = new MediaRecorder(combinedStream);
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.start();
        mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
            audioFiles.push({ blob: audioBlob, fileName: fileName });
        });

        recordingInterval = setInterval(() => {
            recordingSeconds++;
        }, 1000);

        startRecordingButton4.disabled = true;
        stopRecordingButton4.disabled = false;
    }


    function stopRecording() {
        clearInterval(recordingInterval);
        recordingSeconds = 0;
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
        }
        startRecordingButton4.disabled = false;
        stopRecordingButton4.disabled = true;
        DownloadButton.style.display = 'block';
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

    function saveToCSV() {
        // Asegurarse de que userInfo esté disponible para obtener las iniciales
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return; // Salir si userInfo no está disponible
        }

        // Obtener las iniciales del participante
        const inicialesParticipante = userInfo?.initials || `${userInfo?.name || ""} ${userInfo?.last_name || ""}`.trim().split(/\s+/).filter(Boolean).map(part => part.charAt(0).toUpperCase()).join("") || "EX";

        // Configurar las opciones de formato de fecha
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const startTimeFormatted = new Date(startTime).toLocaleString('en-US', options);
        const finishTimeFormatted = new Date(finishTime).toLocaleString('en-US', options);

        // Calcular el tiempo total en segundos
        const timeSpent = (finishTime - startTime) / 1000;
        const timeSpentFormatted = timeSpent.toFixed(3).replace('.', ',');

        // Crear el contenido del archivo CSV con las iniciales del participante
        const csvContent = `TotTime;Iniciales\n${timeSpentFormatted};${inicialesParticipante}`;

        return csvContent;
    }


    let diaStr = dia.toString().padStart(2, '0');
    let mesStr = mes.toString().padStart(2, '0');
    let añoStr = año.toString().padStart(4, '0');
    let fechaStr = `${diaStr}${mesStr}${añoStr.slice(-2)}`;

    function generateZip() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }

        const zip = new JSZip();
        audioFiles.forEach((file) => {
            zip.file(file.fileName, file.blob);
        });

        const csvContent = saveToCSV();
        const inicialesExaminador = userInfo?.initials || `${userInfo?.name || ""} ${userInfo?.last_name || ""}`.trim().split(/\s+/).filter(Boolean).map(part => part.charAt(0).toUpperCase()).join("") || "EX";
        zip.file(`${idParticipante}_HVLT-R_delay.csv`, csvContent);

        zip.generateAsync({ type: 'blob' }).then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = `${idParticipante}_HVLT_delay_${fechaStr}_${inicialesExaminador}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => {
                window.close();
            }, 3000);
        });
    }

    function pauseAudios() {
        audio1_ej2.pause();
    }
});
