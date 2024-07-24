document.addEventListener('DOMContentLoaded', () => {
    const fullscreenButton = document.getElementById('fullscreen-button');
    const finishScreen = document.getElementById('finishScreen');

    // Pantalla de dibujo con figura
    const finishDrawingWithFigureButton = document.getElementById('finish-drawing-with-figure');
    const instruccionesDespues = document.getElementById('instruccionesdespues');
    const container2 = document.querySelector('.container2');
    const finishRememberingFigureButton = document.getElementById("finalize-button")

    // Pantalla de dibujo desde memoria
    const drawFromMemoryScreen = document.getElementById('draw-from-memory-screen');
    const finishDrawingFromMemoryButton = document.getElementById('finish-drawing-from-memory');

    // Pantalla de identificación de figura
    const identifyFigureScreen = document.getElementById('identify-figure-screen');
    const finishIdentifyingFigureButton = document.getElementById('finish-identifying-figure');
    const selectableImages = document.querySelectorAll('.selectable');

    let selectedFigure = null;
    let mediaRecorder;
    let recordedChunks = [];
    let countdownInterval;

    initAudioContext();

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Audio
    const audioElement = document.getElementById('benson-audio');
    audioElement.addEventListener('ended', () => {
        setTimeout(() => {
            finishDrawingWithFigureButton.classList.add('red-arrow');
        }, 5000); // 5 segundos
    });

    if (drawFromMemoryScreen || identifyFigureScreen) {
        const firstTestEndTime = localStorage.getItem('firstTestEndTime');
        const secondTestEndTime = localStorage.getItem('secondTestEndTime');
        if (firstTestEndTime) {
            const now = new Date().getTime();
            const endTime = new Date(parseInt(firstTestEndTime)).getTime();
            const timeLeft = endTime + 0.05 * 60 * 1000 - now;
            if (timeLeft > 0) {
                disableStartButton(timeLeft);
            }
        }
        if (secondTestEndTime) {
            const now = new Date().getTime();
            const endTime = new Date(parseInt(secondTestEndTime)).getTime();
            const timeLeft = endTime + 0.05 * 60 * 1000 - now;
            if (timeLeft > 0) {
                disableStartButton(timeLeft);
            }
        }
    }

    if (finishDrawingWithFigureButton) {
        finishDrawingWithFigureButton.addEventListener('click', () => {
            if (container2.style.display === 'none') {
                container2.style.display = 'block';
                instruccionesDespues.style.display = 'none';
            } else if (instruccionesDespues.style.display === 'none') {
                container2.style.display = 'none';
                instruccionesDespues.style.display = 'block';
            } else {
                instruccionesDespues.style.display = 'none';
                finishScreen.style.display = 'block';
            }
            stopCanvasRecording();
            downloadCanvas('drawing-canvas', 'DrawWithFigure.png');
            localStorage.setItem('firstTestEndTime', new Date().getTime().toString());
        });
        initCanvas('drawing-canvas', 'clear-canvas-button', 'download-canvas-button');
        startCanvasRecording('drawing-canvas');
    }

    if (finishRememberingFigureButton) {
        finishRememberingFigureButton.addEventListener('click', () => {
            container2.style.display = 'none';
            instruccionesDespues.style.display = 'none';
            finishScreen.style.display = 'block';
        });
    }

    if (finishDrawingFromMemoryButton) {
        finishDrawingFromMemoryButton.addEventListener('click', () => {
            drawFromMemoryScreen.style.display = 'none';
            finishScreen.style.display = 'block';
            stopCanvasRecording();
            downloadCanvas('memory-canvas', 'DrawFromMemory.png');
            localStorage.setItem('secondTestEndTime', new Date().getTime().toString());
        });
        initCanvas('memory-canvas', 'clear-memory-canvas-button', 'download-memory-canvas-button');
        startCanvasRecording('memory-canvas');
    }

    if (finishIdentifyingFigureButton) {
        finishIdentifyingFigureButton.addEventListener('click', () => {
            if (selectedFigure) {
                identifyFigureScreen.style.display = 'none';
                finishScreen.style.display = 'block';
                const link = document.createElement('a');
                link.href = selectedFigure.src;
                link.download = 'selected-image.png';
                link.click();
                localStorage.setItem('thirdTestEndTime', new Date().getTime().toString());
            } else {
                alert('Por favor, selecciona una figura antes de continuar.');
            }
        });
        selectableImages.forEach(image => {
            image.addEventListener('click', () => {
                selectableImages.forEach(img => img.classList.remove('selected'));
                image.classList.add('selected');
                selectedFigure = image;
            });
        });
    }

    function startCountdown(duration) {
        let timeLeft = duration;
        countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                finishDrawingWithFigureButton.classList.add('red-arrow');
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

        setCanvasBackground(canvas, 'white');
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
            downloadCanvas(canvasId, canvasId + '.png');
        });
    }

    function downloadCanvas(canvasId, filename) {
        const canvas = document.getElementById(canvasId);
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    async function startCanvasRecording(canvasId) {
        const canvas = document.getElementById(canvasId);
        const stream = canvas.captureStream(30);

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
