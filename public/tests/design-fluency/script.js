window.onload = function () {
    const instructions = document.getElementById('instructions');
    const practiceContainer = document.getElementById('practiceContainer');
    const practiceCanvas = document.getElementById('practiceCanvas');
    const practiceCtx = practiceCanvas.getContext('2d');
    const practiceImage = new Image();
    const practiceFinishScreen = document.getElementById('practiceFinishScreen');

    const canvasContainer = document.getElementById('canvasContainer');
    const canvas = document.getElementById('designCanvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    const finishScreen = document.getElementById('finishScreen');
    const endScreen = document.getElementById('endScreen');

    let drawing = false;
    let startX = 0;
    let startY = 0;
    let practiceMediaRecorder;
    let mediaRecorder;
    let practiceRecordedChunks = [];
    let recordedChunks = [];

    const points = [
        // Agregar las coordenadas de los puntos de cada cuadro
        [{ x: 50, y: 50 }, { x: 70, y: 50 }, { x: 50, y: 70 }, { x: 70, y: 70 }, { x: 60, y: 60 }],
        // Añadir más cuadros aquí
    ];
    const connectedPoints = points.map(() => new Set());

    document.getElementById('startButton').addEventListener('click', function () {
        instructions.style.display = 'none';
        practiceContainer.style.display = 'block';
        practiceImage.src = 'practica.png';
        practiceImage.onload = function () {
            practiceCtx.save();
            practiceCtx.translate(practiceCanvas.width / 2, practiceCanvas.height / 2);
            practiceCtx.rotate(-Math.PI / 2);
            practiceCtx.drawImage(practiceImage, -practiceCanvas.height / 2, -practiceCanvas.width / 2, practiceCanvas.height, practiceCanvas.width);
            practiceCtx.restore();
        }
        startPracticeRecording();
        document.getElementById('practiceNextButton').style.display = 'block';
    });

    document.getElementById('practiceNextButton').addEventListener('click', function () {
        stopPracticeRecording();
        downloadCanvas(practiceCanvas, 'practice-drawing.png');
        downloadPracticeVideo();
        practiceContainer.style.display = 'none';
        practiceFinishScreen.style.display = 'block';
    });

    document.getElementById('toMainTestButton').addEventListener('click', function () {
        practiceFinishScreen.style.display = 'none';
        canvasContainer.style.display = 'block';
        image.src = 'imagen2.png';
        image.onload = function () {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        startRecording();
    });

    document.getElementById('finishButton').addEventListener('click', function () {
        stopRecording();
        downloadCanvas(canvas, 'drawing.png');
        downloadVideo();
        canvasContainer.style.display = 'none';
        finishScreen.style.display = 'block';
    });

    document.getElementById('endTestButton').addEventListener('click', function () {
        finishScreen.style.display = 'none';
        endScreen.style.display = 'block';
    });

    document.getElementById('downloadPracticeImage').addEventListener('click', function () {
        downloadCanvas(practiceCanvas, 'practice-drawing.png');
    });

    document.getElementById('downloadPracticeVideo').addEventListener('click', function () {
        downloadPracticeVideo();
    });

    document.getElementById('downloadImage').addEventListener('click', function () {
        downloadCanvas(canvas, 'drawing.png');
    });

    document.getElementById('downloadVideo').addEventListener('click', function () {
        downloadVideo();
    });

    [practiceCanvas, canvas].forEach(currentCanvas => {
        currentCanvas.addEventListener('mousedown', function (e) {
            const rect = currentCanvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            drawing = true;
        });

        currentCanvas.addEventListener('mousemove', function (e) {
            if (!drawing) return;
            const rect = currentCanvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const currentCtx = currentCanvas === practiceCanvas ? practiceCtx : ctx;
            currentCtx.beginPath();
            currentCtx.moveTo(startX, startY);
            currentCtx.lineTo(mouseX, mouseY);
            currentCtx.stroke();

            startX = mouseX;
            startY = mouseY;

            points.forEach((boxPoints, boxIndex) => {
                boxPoints.forEach((point, pointIndex) => {
                    if (isNearPoint(mouseX, mouseY, point.x, point.y)) {
                        connectedPoints[boxIndex].add(pointIndex);
                        if (connectedPoints[boxIndex].size === 5) {
                            console.log(`Cuadro ${boxIndex + 1} completo!`);
                        }
                    }
                });
            });
        });

        currentCanvas.addEventListener('mouseup', function () {
            drawing = false;
        });

        currentCanvas.addEventListener('mouseleave', function () {
            drawing = false;
        });
    });

    function isNearPoint(x1, y1, x2, y2, radius = 5) {
        const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        return dist <= radius;
    }

    function downloadCanvas(canvas, fileName) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = fileName;
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function startPracticeRecording() {
        const stream = practiceCanvas.captureStream(30); // 30 fps
        practiceMediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm; codecs=vp9'
        });

        practiceMediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
                practiceRecordedChunks.push(e.data);
            }
        };

        practiceMediaRecorder.start();
    }

    function stopPracticeRecording() {
        practiceMediaRecorder.stop();
    }

    function startRecording() {
        const stream = canvas.captureStream(30); // 30 fps
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm; codecs=vp9'
        });

        mediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        };

        mediaRecorder.start();

        setTimeout(() => {
            document.getElementById('finishButton').style.display = 'block';
        }, 2000); // 60 segundos
    }

    function stopRecording() {
        mediaRecorder.stop();
    }

    function downloadPracticeVideo() {
        const blob = new Blob(practiceRecordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'practice-drawing-video.webm';
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function downloadVideo() {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'drawing-video.webm';
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
