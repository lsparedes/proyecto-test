document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const testScreen = document.getElementById('test-screen');
    const completionScreen = document.getElementById('completion-screen');
    const startBtn = document.getElementById('start-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const recordBtn = document.getElementById('record-btn');
    const stopBtn = document.getElementById('stop-btn');
    const nextBtn = document.getElementById('next-btn');
    const audioBtn = document.getElementById('audio-btn');
    const testImage = document.getElementById('test-image');
    const testAudio = document.getElementById('test-audio');
    const audioSource = document.getElementById('audio-source');
    const videoPreview = document.getElementById('video-preview');
    const currentItem = document.getElementById('current-item');
    const timerDisplay = document.createElement('div');
    const downloadsContainer = document.getElementById('downloads-container');
    const recordingMessage = document.createElement('div');

    timerDisplay.id = 'timer-display';
    timerDisplay.textContent = '00:00';
    timerDisplay.classList.add('hidden');
    testScreen.appendChild(timerDisplay);

    recordingMessage.className = 'recording-message';
    recordingMessage.textContent = 'Grabación creada';
    testScreen.appendChild(recordingMessage);

    let currentImageIndex = 0;
    const images = [
        'img-jpg/1.jpg',
        'img-jpg/2.jpg',
        'img-jpg/3.jpg',
        'img-jpg/4.jpg',
        'img-jpg/5.jpg',
        'img-jpg/6.jpg',
        'img-jpg/7.jpg',
        'img-jpg/8.jpg',
        'img-jpg/9.jpg',
        'img-jpg/10.jpg',
        'img-jpg/11.jpg',
        'img-jpg/12.jpg',
        'img-jpg/13.jpg',
        'img-jpg/14.jpg',
        'img-jpg/15.jpg',
        'img-jpg/16.jpg',
        'img-jpg/17.jpg',
        'img-jpg/18.jpg',
        'img-jpg/19.jpg',
        'img-jpg/20.jpg'
    ];

    const audios = [
        'audio/1.mp3',
        'audio/2.mp3',
        'audio/3.mp3',
        'audio/4.mp3',
        'audio/5.mp3',
        'audio/6.mp3',
        'audio/7.mp3',
        'audio/8.mp3',
        'audio/9.mp3',
        'audio/10.mp3',
        'audio/11.mp3',
        'audio/12.mp3',
        'audio/13.mp3',
        'audio/14.mp3',
        'audio/15.mp3',
        'audio/16.mp3',
        'audio/17.mp3',
        'audio/18.mp3',
        'audio/19.mp3',
        'audio/20.mp3'
    ];

    let mediaRecorder;
    let chunks = [];
    let timer;
    let seconds = 0;
    const downloadLinks = [];

    startBtn.addEventListener('click', () => {
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

    recordBtn.addEventListener('click', async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoPreview.srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = e => chunks.push(e.data);
        mediaRecorder.start();
        recordBtn.disabled = true;
        stopBtn.disabled = false;
        stopBtn.style.display = 'inline-block'; // Mostrar el botón stopBtn
        audioBtn.style.display = 'none'; // Ocultar el botón audioBtn
        testImage.classList.add('hidden');
        testAudio.classList.add('hidden');
        videoPreview.classList.remove('hidden');
        timerDisplay.classList.remove('hidden');
        nextBtn.style.display = 'none'; // Ocultar el botón nextBtn al iniciar la grabación
        startTimer();
    });

    stopBtn.addEventListener('click', () => {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/mp4' });
            chunks = [];
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = `pantomima_video_${currentImageIndex + 1}.mp4`;
            downloadLink.textContent = `Descargar Video ${currentImageIndex + 1}`;
            downloadLinks.push(downloadLink);
        };
        const stream = videoPreview.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoPreview.srcObject = null;
        recordBtn.disabled = false;
        stopBtn.disabled = true;
        stopBtn.style.display = 'none'; // Ocultar el botón stopBtn
        audioBtn.style.display = 'inline-block'; // Mostrar el botón audioBtn
        timerDisplay.classList.add('hidden');
        stopTimer();
        nextBtn.style.display = 'block'; // Mostrar el botón nextBtn al detener la grabación

        showRecordingMessage();
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex++;
        if (currentImageIndex < images.length) {
            loadNextImage();
            nextBtn.style.display = 'none'; // Ocultar el botón nextBtn al avanzar al siguiente ítem
        } else {
            showCompletionScreen();
        }
    });

    function loadNextImage() {
        testImage.src = images[currentImageIndex];
        audioSource.src = audios[currentImageIndex];
        testAudio.load(); // Cargar el nuevo audio
        currentItem.textContent = `I${currentImageIndex + 1}`;
        testImage.classList.remove('hidden');
        testAudio.classList.remove('hidden');
        videoPreview.classList.add('hidden');
    }

    function showCompletionScreen() {
        testScreen.classList.remove('active');
        testScreen.classList.add('hidden');
        completionScreen.classList.remove('hidden');
        downloadsContainer.innerHTML = '';
        downloadLinks.forEach(link => {
            const div = document.createElement('div');
            div.appendChild(link);
            downloadsContainer.appendChild(div);
        });
    }

    function startTimer() {
        seconds = 0;
        timer = setInterval(() => {
            seconds++;
            timerDisplay.textContent = formatTime(seconds);
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        timerDisplay.textContent = '00:00';
    }

    function formatTime(sec) {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function showRecordingMessage() {
        recordingMessage.style.display = 'block';
        setTimeout(() => {
            recordingMessage.style.display = 'none';
        }, 1300); // Ocultar el mensaje después de 1.3 segundos
    }
});
