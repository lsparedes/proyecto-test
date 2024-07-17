document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos comunes
    const mainScreen = document.getElementById('main-screen');
    const optionsScreen = document.getElementById('options-screen');
    const startButton = document.getElementById('start-button');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const finishScreen = document.getElementById('finishScreen');

    // Seleccionar elementos específicos para los index
    const drawWithFigureScreen = document.getElementById('draw-with-figure-screen');
    const finishDrawingWithFigureButton = document.getElementById('finish-drawing-with-figure');

    const drawFromMemoryScreen = document.getElementById('draw-from-memory-screen');
    const finishDrawingFromMemoryButton = document.getElementById('finish-drawing-from-memory');

    const identifyFigureScreen = document.getElementById('identify-figure-screen');
    const finishIdentifyingFigureButton = document.getElementById('finish-identifying-figure');

    const drawWithFigureButton = document.getElementById('draw-with-figure-button');
    const drawFromMemoryButton = document.getElementById('draw-from-memory-button');
    const identifyFigureButton = document.getElementById('identify-figure-button');
    
    const selectableImages = document.querySelectorAll('.selectable');

    let mediaRecorder;
    let recordedChunks = [];
    let currentStream;
    let selectedFigure = null;

    initAudioContext();
    let countdownElement; 

    let timerInterval;
    let memoryTimerInterval;
    let countdownInterval;

    // Eventos comunes
    startButton.addEventListener('click', () => {
        mainScreen.style.display = 'none';
        optionsScreen.style.display = 'block';
    });

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    if (drawWithFigureButton) {
        drawWithFigureButton.addEventListener('click', async () => {
            optionsScreen.style.display = 'none';
            drawWithFigureScreen.style.display = 'block';
            await startScreenRecording();
            initCanvas('drawing-canvas', 'clear-canvas-button', 'download-canvas-button');
        });

        finishDrawingWithFigureButton.addEventListener('click', () => {
            drawWithFigureScreen.style.display = 'none';
            finishScreen.style.display = 'block';
            stopScreenRecording();
        });
    }

    if (drawFromMemoryButton) {
        drawFromMemoryButton.addEventListener('click', async () => {
            optionsScreen.style.display = 'none';
            drawFromMemoryScreen.style.display = 'block';
            await startScreenRecording();
            initCanvas('memory-canvas', 'clear-memory-canvas-button', 'download-memory-canvas-button');
            initTimer('memory-timer', 'start-memory-timer-button', 'stop-memory-timer-button');
        });

        finishDrawingFromMemoryButton.addEventListener('click', () => {
            drawFromMemoryScreen.style.display = 'none';
            finishScreen.style.display = 'block';
            stopScreenRecording();
        });
    }

    if (identifyFigureButton) {
        identifyFigureButton.addEventListener('click', async () => {
            optionsScreen.style.display = 'none';
            identifyFigureScreen.style.display = 'block';
            await startScreenRecording();
        });

        finishIdentifyingFigureButton.addEventListener('click', () => {
            if (selectedFigure) {
                const selectedFigureId = selectedFigure.getAttribute('data-figure');
                console.log(`Figura seleccionada: ${selectedFigureId}`);
                identifyFigureScreen.style.display = 'none';
                finishScreen.style.display = 'block';
                stopScreenRecording();
            } else {
                alert('Por favor, seleccione una figura antes de continuar.');
            }
        });
    }

    if (selectableImages) {
        selectableImages.forEach(image => {
            image.addEventListener('click', (event) => {
                if (selectedFigure) {
                    selectedFigure.classList.remove('selected');
                }
                selectedFigure = event.target;
                selectedFigure.classList.add('selected');
            });
        });
    }

    function initCanvas(canvasId, clearButtonId, downloadButtonId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        let drawing = false;
        let x = 0;
        let y = 0;
        let isDrawingAllowed = true; // Controlar si se permite dibujar

        canvas.addEventListener('mousedown', (e) => {
            if (!isDrawingAllowed) return;
            x = e.offsetX;
            y = e.offsetY;
            drawing = true;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (drawing && isDrawingAllowed) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                x = e.offsetX;
                y = e.offsetY;
            }
        });

        canvas.addEventListener('mouseup', () => {
            drawing = false;
        });

        canvas.addEventListener('mouseleave', () => {
            drawing = false;
        });

        document.getElementById(clearButtonId).addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        document.getElementById(downloadButtonId).addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'Benson Complex Figure .png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });

        setTimeout(() => {
            const finishButton = document.getElementById('finish-drawing-with-figure');
            finishButton.style.backgroundImage = 'url("flecha4.png")';
            finishButton.classList.add('red-arrow'); // Añadir clase de flecha roja
        }, 4 * 60 * 1000); //Tiempo para dibujar
    }

    async function startScreenRecording() {
        try {
            currentStream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: "screen" }
            });
            mediaRecorder = new MediaRecorder(currentStream, {
                mimeType: 'video/webm; codecs=vp9'
            });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.start();
        } catch (err) {
            console.error("Error al iniciar la grabación de pantalla:", err);
        }
    }

    // Función para detener la grabación y descargar el video
    function stopScreenRecording() {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            currentStream.getTracks().forEach(track => track.stop());
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'Benson Complex Figure.webm';
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                }, 100);
            };
        }
    }

    function initTimer(timerId, startButtonId, stopButtonId) {
        let startTime;
        const timerDisplay = document.getElementById(timerId);
        const startButton = document.getElementById(startButtonId);
        const stopButton = document.getElementById(stopButtonId);

        function updateTimer() {
            const elapsedTime = Date.now() - startTime;
            const minutes = Math.floor(elapsedTime / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }

        startButton.addEventListener('click', () => {
            startTime = Date.now();
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);
            startButton.style.display = 'none';
            stopButton.style.display = 'inline';
        });

        stopButton.addEventListener('click', () => {
            clearInterval(timerInterval);
            startButton.style.display = 'inline';
            stopButton.style.display = 'none';
        });
    }

    function startCountdown() {
        countdownElement = document.createElement('div');
        countdownElement.id = 'countdown-timer';
        document.body.appendChild(countdownElement);

        let countdownTime = 15 * 60; // minutos en segundos

        function updateCountdown() {
            const minutes = Math.floor(countdownTime / 60);
            const seconds = countdownTime % 60;
            countdownElement.textContent = `Tiempo restante: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                playTimerSound(); // Llama a la función para reproducir el sonido
            } else {
                countdownTime--;
            }
        }

        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    function playTimerSound() {
        const timerSound = document.getElementById('timer-sound');
        timerSound.play();
    }

    function stopAndRemoveCountdown() {
        if (countdownElement) {
            clearInterval(countdownInterval);
            document.body.removeChild(countdownElement);
            countdownElement = null;
        }
    }
});

// Función para inicializar el contexto de audio
function initAudioContext() {
    audioContext = new AudioContext();
}
