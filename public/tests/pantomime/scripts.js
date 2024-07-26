document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const testScreen = document.getElementById('test-screen');
    const completionScreen = document.getElementById('completion-screen');
    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");
    const handInputs = document.getElementsByName('hand');
    const startBtn = document.getElementById('startButton');
    const fullscreenBtn = document.getElementById('fullscreenButton');
    const stopBtn = document.getElementById('stop-btn');
    const nextBtn = document.getElementById('next-btn');
    const audioBtn = document.getElementById('audio-btn');
    const testImage = document.getElementById('test-image');
    const testAudio = document.getElementById('test-audio');
    const audioSource = document.getElementById('audio-source');
    const videoPreview = document.getElementById('video-preview');
    const currentItem = document.getElementById('current-item');
    const timerDisplay = document.createElement('div');
    const recordingMessage = document.createElement('div');
    let currentImageIndex = 0;
    const images = [
        'img-jpg/1.jpg',
        'img-jpg/2.jpg'
    ];

    const audios = [
        'audio/1.mp3',
        'audio/2.mp3'
    ];

    recordingMessage.className = 'recording-message';
    recordingMessage.textContent = 'Grabación creada';
    testScreen.appendChild(recordingMessage);

    let mediaRecorder;
    let chunks = [];
    let timer;
    let seconds = 0;
    let totalTestTime = 0;
    let testStartTime;
    let selectedHand = "";
    const zip = new JSZip();

    startBtn.addEventListener('click', () => {
        testStartTime = Date.now();
        startScreen.classList.remove('active');
        startScreen.classList.add('hidden');
        testScreen.classList.remove('hidden');
        testScreen.classList.add('active');
        loadNextImage();
    });

    fullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    });

    audioBtn.addEventListener('click', () => {
        testAudio.play();
    });

    testAudio.addEventListener('ended', () => {
        startRecording();
    });

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoPreview.srcObject = stream;

        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = e => chunks.push(e.data);
        mediaRecorder.start();
        stopBtn.disabled = false;
        stopBtn.style.display = 'inline-block';
        nextBtn.disabled = false;
        nextBtn.style.display = 'inline-block';
        audioBtn.style.display = 'none';
        testImage.classList.add('hidden');
        testAudio.classList.add('hidden');
        videoPreview.classList.remove('hidden');
        timerDisplay.classList.remove('hidden');
        startTimer();
    }

    stopBtn.addEventListener('click', () => {
        stopRecording(true);
    });

    nextBtn.addEventListener('click', () => {
        stopRecording(true);
    });

    function stopRecording(showNextButton) {
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/mp4' });
                chunks = [];
                const dateTime = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }).replace(/:/g, "-").replace(/\//g, "_");

                zip.file(`grabaciones/pantomima_video_${dateTime}_${currentImageIndex + 1}.mp4`, blob);

                const stream = videoPreview.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                videoPreview.srcObject = null;
                stopBtn.disabled = true;
                stopBtn.style.display = 'none';
                audioBtn.style.display = 'inline-block';
                timerDisplay.classList.add('hidden');
                stopTimer();

                // Always proceed to the next image after stopping the recording
                proceedToNextImage();
            };
        }
    }

    function proceedToNextImage() {
        currentImageIndex++;
        if (currentImageIndex < images.length) {
            loadNextImage();
        } else {
            showHandSelection();
        }
    }

    function loadNextImage() {
        testImage.src = images[currentImageIndex];
        audioSource.src = audios[currentImageIndex];
        testAudio.load();
        currentItem.textContent = `I${currentImageIndex + 1}`;
        testImage.classList.remove('hidden');
        testAudio.classList.remove('hidden');
        videoPreview.classList.add('hidden');
    }

    function showHandSelection() {
        testScreen.classList.remove('active');
        testScreen.classList.add('hidden');
        selectHandContainer.classList.remove('hidden');
        selectHandContainer.classList.add('active');
    }

    function showCompletionScreen() {
        selectHandContainer.classList.remove('active');
        selectHandContainer.classList.add('hidden');
        completionScreen.classList.remove('hidden');
        completionScreen.classList.add('active');
        createZipAndDownload();
    }

    function startTimer() {
        seconds = 0;
        timer = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        totalTestTime = Math.floor((Date.now() - testStartTime));
        timerDisplay.textContent = '00:00';
    }

    function createCsvFile() {
        const date = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }).replace(/:/g, "-").replace(/\//g, "_");
        const filename = `respuestas_pantomime_${date}.csv`;

        // Definir el contenido del archivo CSV
        const csvContent = `Tiempo dedicado (Milisegundos);Mano utilizada\n${totalTestTime};${selectedHand}\n`;
        const blob = new Blob([csvContent], { type: 'text/csv' });

        // Agregar el archivo CSV al ZIP con el nombre dinámico
        zip.file(filename, blob);
    }

    function createZipAndDownload() {
        createCsvFile();
        zip.generateAsync({ type: 'blob' }).then(content => {
            const link = document.createElement('a');
            const date = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }).replace(/:/g, "-").replace(/\//g, "_");
            const zipname = `pantomime_${date}.zip`;

            link.href = URL.createObjectURL(content);
            link.download = zipname;
            link.click();
            showFinalMessage();
        });
    }
    function showFinalMessage() {
        completionScreen.classList.remove('hidden');
        completionScreen.classList.add('active');
    }

    // Manages the hand selection
    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            handButton.style.display = "block";
            selectedHand = e.target.value;
        });
    });

    handButton.addEventListener('click', () => {
        showCompletionScreen();
    });
});
