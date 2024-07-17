document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen');
    const optionsScreen = document.getElementById('options-screen');
    const drawWithFigureScreen = document.getElementById('draw-with-figure-screen');
    const drawFromMemoryScreen = document.getElementById('draw-from-memory-screen');
    const identifyFigureScreen = document.getElementById('identify-figure-screen');
    initAudioContext();
    let countdownElement; 

    let timerInterval;
    let memoryTimerInterval;
    let countdownInterval;

    const selectableImages = document.querySelectorAll('.selectable');
    let selectedFigure = null;

    const startButton = document.getElementById('start-button');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const optionButtons = document.querySelectorAll('.option-button');
    const finishDrawingWithFigureButton = document.getElementById('finish-drawing-with-figure');
    const finishDrawingFromMemoryButton = document.getElementById('finish-drawing-from-memory');
    const finishIdentifyingFigureButton = document.getElementById('finish-identifying-figure');

    startButton.addEventListener('click', () => {
        mainScreen.style.display = 'none';
        optionsScreen.style.display = 'block';
    });

    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    });

    selectableImages.forEach(image => {
        image.addEventListener('click', (event) => {
            if (selectedFigure) {
                selectedFigure.classList.remove('selected');
            }
            selectedFigure = event.target;
            selectedFigure.classList.add('selected');
        });
    });

    finishIdentifyingFigureButton.addEventListener('click', () => {
        if (selectedFigure) {
            const selectedFigureId = selectedFigure.getAttribute('data-figure');
            console.log(`Figura seleccionada: ${selectedFigureId}`);
        } else {
            alert('Por favor, seleccione una figura antes de continuar.');
        }
    });

    optionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            optionsScreen.style.display = 'none';
            const option = event.target.dataset.option;
            stopAndRemoveCountdown();
            if (option === '1') {
                drawWithFigureScreen.style.display = 'block';
            } else if (option === '2') {
                drawFromMemoryScreen.style.display = 'block';
            } else if (option === '3') {
                identifyFigureScreen.style.display = 'block';
            }
        });
    });

    finishDrawingWithFigureButton.addEventListener('click', () => {
        drawWithFigureScreen.style.display = 'none';
        optionsScreen.style.display = 'block';
        startCountdown();
    });

    finishDrawingFromMemoryButton.addEventListener('click', () => {
        drawFromMemoryScreen.style.display = 'none';
        optionsScreen.style.display = 'block';
    });

    finishIdentifyingFigureButton.addEventListener('click', () => {
        identifyFigureScreen.style.display = 'none';
        optionsScreen.style.display = 'block';
    });

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
            link.download = 'drawing.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });

        setTimeout(() => {
            const finishButton = document.getElementById('finish-drawing-with-figure');
            finishButton.style.backgroundImage = 'url("flecha4.png")';
            finishButton.classList.add('red-arrow'); // Añadir clase de flecha roja
        }, 0.05 * 60 * 1000); //Tiempo para dibujar
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

    initCanvas('drawing-canvas', 'clear-canvas-button', 'download-canvas-button');
    initCanvas('memory-canvas', 'clear-memory-canvas-button', 'download-memory-canvas-button');
    initTimer('timer', 'start-timer-button', 'stop-timer-button');
    initTimer('memory-timer', 'start-memory-timer-button', 'stop-memory-timer-button');
});

// Función para inicializar el contexto de audio
function initAudioContext() {
    audioContext = new AudioContext();
}
