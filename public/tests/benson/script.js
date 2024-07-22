document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos comunes
    const mainScreen = document.getElementById('main-screen');
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

    const selectableImages = document.querySelectorAll('.selectable');

    let selectedFigure = null;
    let mediaRecorder;
    let recordedChunks = [];

    initAudioContext();

    let countdownInterval;

    const beepAudio = new Audio('beep.wav');
    if (drawFromMemoryScreen || identifyFigureScreen) {
        const firstTestEndTime = localStorage.getItem('firstTestEndTime');
        const secondTestEndTime = localStorage.getItem('secondTestEndTime');
        if (firstTestEndTime) {
            const now = new Date().getTime();
            const endTime = new Date(parseInt(firstTestEndTime)).getTime();
            const timeLeft = endTime + 10 * 60 * 1000 - now;
            if (timeLeft > 0) {
                disableStartButton(timeLeft);
            }
        }
        if (secondTestEndTime) {
            const now = new Date().getTime();
            const endTime = new Date(parseInt(secondTestEndTime)).getTime();
            const timeLeft = endTime + 10 * 60 * 1000 - now;
            if (timeLeft > 0) {
                disableStartButton(timeLeft);
            }
        }
    }


    drawWithFigure.addEventListener('click', async () => {
        drawWithFigure.style.display = 'none';
        drawContainer.style.display = 'block';
        finishDrawingWithFigureButton.style.display = 'block';
        initCanvas('drawing-canvas', 'clear-canvas-button', 'download-canvas-button');
        await startCanvasRecording('drawing-canvas');
    });

    finishDrawingWithFigureButton.addEventListener('click', () => {
        drawContainer.style.display = 'none';
        finishScreen.style.display = 'block';
        stopCanvasRecording();
        localStorage.setItem('firstTestEndTime', new Date().getTime().toString());
    });

    // Eventos comunes
    startButton.addEventListener('click', async () => {


        if (drawFromMemoryScreen) {
            drawFromMemoryScreen.style.display = 'block';
            initCanvas('memory-canvas', 'clear-memory-canvas-button', 'download-memory-canvas-button');
            await startCanvasRecording('memory-canvas');
        }

        if (identifyFigureScreen) {
            identifyFigureScreen.style.display = 'block';
        }
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

    if (finishDrawingWithFigureButton) {
        finishDrawingWithFigureButton.addEventListener('click', () => {
            drawWithFigureScreen.style.display = 'none';
            finishScreen.style.display = 'block';
            stopCanvasRecording();
            localStorage.setItem('firstTestEndTime', new Date().getTime().toString());
        });
    }

    if (finishDrawingFromMemoryButton) {
        finishDrawingFromMemoryButton.addEventListener('click', () => {
            drawFromMemoryScreen.style.display = 'none';
            finishScreen.style.display = 'block';
            stopCanvasRecording();
            localStorage.setItem('secondTestEndTime', new Date().getTime().toString());
            setTimeout(() => {
                disableStartButton(10 * 60 * 1000);
            }, 0);
        });
    }

    if (finishIdentifyingFigureButton) {
        finishIdentifyingFigureButton.addEventListener('click', () => {
            if (selectedFigure) {
                identifyFigureScreen.style.display = 'none';
                finishScreen.style.display = 'block';

                // Descargar automáticamente la imagen seleccionada
                const link = document.createElement('a');
                link.href = selectedFigure.src;
                link.download = 'selected-image.png';
                link.click();
            } else {
                alert('Por favor, seleccione una figura antes de continuar.');
            }
            localStorage.setItem('thirdTestEndTime', new Date().getTime().toString());
            setTimeout(() => {
                disableStartButton(10 * 60 * 1000);
            }, 0);
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
    }

    function disableStartButton(timeLeft) {
        startButton.disabled = true;
        const countdownElement = document.createElement('div');
        countdownElement.id = 'contador';
        document.body.appendChild(countdownElement);

        updateCountdown(timeLeft);

        countdownInterval = setInterval(() => {
            timeLeft -= 1000;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                startButton.disabled = false;
                countdownElement.remove();
                beepAudio.play(); // Reproducir el audio cuando el tiempo llegue a 0
            } else {
                updateCountdown(timeLeft);
            }
        }, 1000);
    }

    function updateCountdown(timeLeft) {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        const countdownElement = document.getElementById('contador');
    }

    function setCanvasBackground(canvas, color) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function initCanvas(canvasId, clearButtonId, downloadButtonId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');

        // Establecer el color del fondo en blanco
        setCanvasBackground(canvas, 'white');

        // Establecer el color del trazo en negro
        ctx.strokeStyle = 'black';

        let drawing = false;
        let x = 0;
        let y = 0;

        canvas.addEventListener('mousedown', (e) => {
            x = e.offsetX;
            y = e.offsetY;
            drawing = true;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (drawing) {
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
            setCanvasBackground(canvas, 'white');
        });

        document.getElementById(downloadButtonId).addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'Benson Complex Figure.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    async function startCanvasRecording(canvasId) {
        const canvas = document.getElementById(canvasId);
        const stream = canvas.captureStream(30); // 30 FPS

        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9'
        });

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.start();
    }

    function stopCanvasRecording() {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm'
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'canvas-recording.webm';
            link.click();
            URL.revokeObjectURL(url);
            recordedChunks = [];
        };
    }

    function initAudioContext() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
});
