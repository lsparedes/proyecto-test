document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const testScreen = document.getElementById('test-screen');
    const completionScreen = document.getElementById('completion-screen');
    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");
    const handInputs = document.getElementsByName('hand');
    const startBtn = document.getElementById('startButton');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const stopBtn = document.getElementById('stop-btn');
    const RecordingBtn = document.getElementById('recording-btn');
    const nextBtn = document.getElementById('next-btn');
    const audioBtn = document.getElementById('audio-btn');
    const testImage = document.getElementById('test-image');
    const testAudio = document.getElementById('test-audio');
    const audioSource = document.getElementById('audio-source');
    const videoPreview = document.getElementById('video-preview');
    const currentItem = document.getElementById('current-item');
    const timerDisplay = document.createElement('div');
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
    let totalTestTime = 0;
    let testStartTime;
    let selectedHand = "";
    const zip = new JSZip();

    startBtn.addEventListener('click', () => {
        stopAllAudios();
        testStartTime = Date.now();
        startScreen.classList.remove('active');
        startScreen.classList.add('hidden');
        testScreen.classList.remove('hidden');
        testScreen.classList.add('active');
        loadNextImage();
    });

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
        RecordingBtn.disabled = false;
        RecordingBtn.style.display = 'inline-block';
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
        stopAllAudios();
        stopRecording(true);
    });

    nextBtn.addEventListener('click', () => {
        stopAllAudios();
        stopRecording(true);
    });


    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

        if (selectedHand) {
            handButton.style.display = 'block';
        }
    }

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
                RecordingBtn.disabled = true;
                RecordingBtn.style.display = 'none';
                stopBtn.disabled = true;
                stopBtn.style.display = 'none';
                audioBtn.style.display = 'inline';
                nextBtn.style.display = 'none';
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
        testScreen.style.display = 'none';
        audioBtn.style.display = 'none';
        currentItem.style.display = 'none';
        fin.style.display = 'block';
        selectHandContainer.style.display = "block";

        handButton.addEventListener('click', function () {
            createZipAndDownload();
        });
    }

    function showCompletionScreen() {
        // createZipAndDownload();
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

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    // Obtener el id_participante de la URL
    const idParticipante = getQueryParam('id_participante');

    const fechaActual = new Date();
    const options = { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' };
    const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
    const [day, month, year] = fechaHoraChilena.split('-');
    const fechaFormateada = `${day}_${month}_${year}`;
    function createTxtFile() {
        const filename = `${idParticipante}_Pantomime_${fechaFormateada}.txt`;
        // Definir el contenido del archivo TXT
        const txtContent = `Tiempo dedicado (Segundos): ${totalTestTime / 1000}\nMano utilizada: ${selectedHand}\n`;
        const blob = new Blob([txtContent], { type: 'text/plain' });
    
        // Agregar el archivo TXT al ZIP con el nombre dinámico
        zip.file(filename, blob);
    }
    
    function createZipAndDownload() {
        handButton.style.display = "none";
        selectHandContainer.style.display = "none";
        createTxtFile();
        zip.generateAsync({ type: 'blob' }).then(content => {
            const link = document.createElement('a');
            const zipname = `${idParticipante}_Pantomime_${fechaFormateada}.zip`;
    
            link.href = URL.createObjectURL(content);
            link.download = zipname;
            link.click();
            window.close();
        });
    }


    // Manages the hand selection
    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            validateInputs();
            selectedHand = e.target.value;
        });
    });

    handButton.addEventListener('click', () => {
        stopAllAudios();
        showCompletionScreen();
    });

    function stopAllAudios() {
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => audio.pause());
    }
});
