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
    let practiceDrawing = false;
    let practiceStartX = 0;
    let practiceStartY = 0;
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
        };
        startPracticeRecording('practiceCanvas');
        document.getElementById('practiceNextButton').style.display = 'block';
    });

    document.getElementById('practiceNextButton').addEventListener('click', function () {
        stopPracticeRecording();
        practiceContainer.style.display = 'none';
        practiceFinishScreen.style.display = 'block';
        downloadCanvas(practiceCanvas, 'practice-drawing.png');
        downloadPracticeVideo();
    });

    document.getElementById('toMainTestButton').addEventListener('click', function () {
        practiceFinishScreen.style.display = 'none';
        canvasContainer.style.display = 'block';
        image.src = 'imagen2.png';
        image.onload = function () {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        startRecording('designCanvas');
    });

    document.getElementById('finishButton').addEventListener('click', function () {
        stopRecording();
        canvasContainer.style.display = 'none';
        
        finishScreen.style.display = 'block';
        downloadCanvas(canvas, 'drawing.png');
        downloadVideo();
    });

    document.getElementById('finishButton').style.display = 'block';

    document.getElementById('endTestButton').addEventListener('click', function () {
        finishScreen.style.display = 'none';
        endScreen.style.display = 'block';
    });


    async function startPracticeRecording(canvasId) {
        const canvas = document.getElementById(canvasId);
        const stream = canvas.captureStream(30); // 30 FPS

        practiceMediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9'
        });

        practiceMediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                practiceRecordedChunks.push(event.data);
            }
        };

        practiceMediaRecorder.start();
    }

    function stopPracticeRecording() {
        practiceMediaRecorder.stop();
        practiceMediaRecorder.onstop = () => {
            const blob = new Blob(practiceRecordedChunks, { 
                type: 'video/webm' 

            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'canvasPractice-recording.webm';
            link.style.visibility = 'hidden';
            link.click();
            URL.revokeObjectURL(url);
            practiceRecordedChunks = [];

        };
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

    async function startRecording(canvasId) {
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

    function stopRecording() {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { 
                type: 'video/webm' 

            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'canvas-recording.webm';
            link.style.visibility = 'hidden';
            link.click();
            URL.revokeObjectURL(url);
            recordedChunks = [];
        };
    }

    practiceCanvas.addEventListener('mousedown', function (e) {
        practiceDrawing = true;
        practiceStartX = e.offsetX;
        practiceStartY = e.offsetY;
    });

    practiceCanvas.addEventListener('mousemove', function (e) {
        if (practiceDrawing) {
            practiceCtx.beginPath();
            practiceCtx.moveTo(practiceStartX, practiceStartY);
            practiceCtx.lineTo(e.offsetX, e.offsetY);
            practiceCtx.stroke();
            practiceStartX = e.offsetX;
            practiceStartY = e.offsetY;
        }
    });

    practiceCanvas.addEventListener('mouseup', function () {
        practiceDrawing = false;
    });

    practiceCanvas.addEventListener('mouseleave', function () {
        practiceDrawing = false;
    });

    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        startX = e.offsetX;
        startY = e.offsetY;
    });

    canvas.addEventListener('mousemove', function (e) {
        if (drawing) {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            startX = e.offsetX;
            startY = e.offsetY;
        }
    });

    canvas.addEventListener('mouseup', function () {
        drawing = false;
    });

    canvas.addEventListener('mouseleave', function () {
        drawing = false;
    });
};
