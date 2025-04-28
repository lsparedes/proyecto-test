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
    const videoPreviewInitial = document.getElementById('video-preview-initial');
    const videoPreviewTest = document.getElementById('video-preview-test');
    const currentItem = document.getElementById('current-item');
    const timerDisplay = document.createElement('div');
    const nextscreen = document.getElementById('nextscreen');
    const camera = document.getElementById('camera-open');
    const FinishRecordingImage = document.getElementById('FinishRecordingImage');

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
        'audio/2_Ampolleta.wav',
        'audio/3_Cepillo.wav',
        'audio/4_Martillo.wav',
        'audio/5_Llave.wav',
        'audio/6_Lápiz.wav',
        'audio/7_Manzana.wav',
        'audio/8_Peineta.wav',
        'audio/9_Regadera.wav',
        'audio/10_Tijeras.wav',
        'audio/11_Pipa.wav',
        'audio/12_Cuchara.wav',
        'audio/13_Brocha.wav',
        'audio/14_Destornillador.wav',
        'audio/15_Exprimidor.wav',
        'audio/16_Plancha.wav',
        'audio/17_Vaso.wav',
        'audio/18_Dardos.wav',
        'audio/19_Piano.wav',
        'audio/20_Binoculares.wav',
        'audio/21_Serrucho.wav'
    ];

    async function iniciarCamara() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoPreviewInitial.srcObject = stream;
            videoPreviewInitial.play();
            cameraStream = stream; // Guardas el stream si lo necesitas liberar después
        } catch (error) {
            console.error('No se pudo acceder a la cámara:', error);
            alert('Por favor permite el acceso a la cámara para continuar.');
        }
    }


    iniciarCamara(); // Llama la función automáticamente al cargar


    let mediaRecorder;
    let chunks = [];
    let timer;
    let seconds = 0;
    let totalTestTime = 0;
    let testStartTime;
    let selectedHand = "";
    const zip = new JSZip();
    let audioPlayed = false;

    nextscreen.addEventListener('click', () => {
        const stream = videoPreviewInitial.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoPreviewInitial.srcObject = null;
        }

        camera.classList.remove('active');
        camera.classList.add('hidden');
        startScreen.classList.remove('hidden');
        startScreen.classList.add('active');
    });



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
        audioBtn.style.display = 'none';
    });

    testAudio.addEventListener('ended', () => {
        RecordingBtn.style.display = 'inline-block';
        stopBtn.style.display = 'inline-block';
    });

    let cameraStream = null;
    let isCameraActive = false;

    testAudio.addEventListener('timeupdate', () => {
        const timeRemaining = testAudio.duration - testAudio.currentTime;

        // Verifica si el tiempo restante es menor o igual a 0.5 segundos
        if (timeRemaining <= 2 && !audioPlayed) {
            audioPlayed = true; // Evita que la función se llame más de una vez
            startRecording();
        }
    });

    async function startRecording() {
        try {
            // Asegúrate de cerrar la cámara anterior (si existe)
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
                cameraStream = null;
            }
    
            // Intenta pedir un nuevo stream de cámara
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraStream = stream; // Actualizar la nueva referencia
            videoPreviewTest.srcObject = stream;
    
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
            videoPreviewTest.classList.remove('hidden');
            timerDisplay.classList.remove('hidden');
            startTimer();
        } catch (error) {
            console.error('Error al iniciar grabación:', error);
            alert('No se pudo iniciar la grabación. Verifica que la cámara esté disponible.');
        }
    }
    

    stopBtn.addEventListener('click', () => {
        stopAllAudios();
        stopRecording(); // Ya se llama aquí
        stopBtn.style.display = 'none'; // Oculta el botón de stop al presionarlo
        document.getElementById('FinishRecordingImage').style.display = 'block'; // Mostrar imagen
    });


    nextBtn.addEventListener('click', () => {
        stopAllAudios();
        stopRecording(); // ← Detenemos la grabación como lo hace el botón "stop"
        proceedToNextImage(); // ← Luego avanzamos
        document.getElementById('FinishRecordingImage').style.display = 'none';
        audioBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
        RecordingBtn.style.display = 'none';
    });
    

    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

        if (selectedHand) {
            handButton.style.display = 'block';
        }
    }

    function stopRecording() {
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/mp4' });
                chunks = [];
                const dateTime = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }).replace(/:/g, "-").replace(/\//g, "_");

                zip.file(`grabaciones/pantomima_video_${dateTime}_${currentImageIndex + 1}.mp4`, blob);

                const stream = videoPreviewTest.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                videoPreviewTest.srcObject = null;
                RecordingBtn.style.display = 'none'; // Oculta también el botón de grabación
                initRecordingButtonBlack1.style.display = 'inline-block';
                stopRecordingButtonRed1.style.display = 'inline-block';


                RecordingBtn.disabled = true;
                RecordingBtn.style.display = 'none';
                stopBtn.disabled = true;
                stopBtn.style.display = 'none'; // Aseguramos que el botón se oculta
                audioBtn.style.display = false;
                nextBtn.disabled = false; // Habilitamos el botón Next después de detener la grabación
                nextBtn.style.display = 'inline-block';
                timerDisplay.classList.add('hidden');
                stopTimer();
            };
        }
    }

    function proceedToNextImage() {
        currentImageIndex++;
        audioPlayed = false; // Reinicia la bandera para la siguiente imagen

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
        currentItem.textContent = `E${currentImageIndex + 1}`;
        testImage.classList.remove('hidden');
        testAudio.classList.remove('hidden');
        videoPreviewTest.classList.add('hidden');
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

    const fechaActual = new Date();
    const options = { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' };
    const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
    const [day, month, year] = fechaHoraChilena.split('-');
    const fechaFormateada = `${day}_${month}_${year}`;
    function createTxtFile() {
        // Asegurarse de que userInfo esté disponible
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return; // Salir si userInfo no está disponible
        }

        // Obtener las iniciales del examinador
        const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();

        // Formatear la fecha
        const filename = `${idParticipante}_17_Pantomima_del_uso_de_objetos_${fechaFormateada}.csv`;

        // Definir el contenido del archivo CSV

        const totalTime = ((new Date() - totalTestTime) / 1000).toFixed(3).replace('.', ',');

        const txtContent = [["TotTime", "Hand", "Examinador"], [totalTime, selectedHand, inicialesExaminador]]
            .map(e => e.join(';'))
            .join('\n');

        const blob = new Blob([txtContent], { type: 'text/csv;charset=utf-8;' });

        // Agregar el archivo CSV al ZIP con el nombre dinámico
        zip.file(filename, blob);
    }


    function createZipAndDownload() {
        handButton.style.display = "none";
        selectHandContainer.style.display = "none";
        createTxtFile();
        zip.generateAsync({ type: 'blob' }).then(content => {
            const link = document.createElement('a');
            const zipname = `${idParticipante}_17_Pantomima_del_uso_de_objetos_${fechaFormateada}.zip`;

            link.href = URL.createObjectURL(content);
            link.download = zipname;
            link.click();
            setTimeout(() => {
                window.close();
            }, 3000);
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
