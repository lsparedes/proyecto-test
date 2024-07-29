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
    let temporizador = null;

    const points = [
        // Agregar las coordenadas de los puntos de cada cuadro
        [{ x: 50, y: 50 }, { x: 70, y: 50 }, { x: 50, y: 70 }, { x: 70, y: 70 }, { x: 60, y: 60 }],
        // Añadir más cuadros aquí
    ];
    const connectedPoints = points.map(() => new Set());

    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', function () {
        // instructions.style.display = 'none';
        practiceContainer.style.display = 'block';
        practiceImage.src = 'image.png';
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
    startButton.click();

    const practiceNextButton = document.getElementById('practiceNextButton');
    practiceNextButton.addEventListener('click', function () {
        instructions.style.display = 'none';
        // stopPracticeRecording(); // REVISAR (debe ir al final la descarga)
        practiceContainer.style.display = 'none';
        practiceFinishScreen.style.display = 'block';
        // downloadCanvas(practiceCanvas, 'practice-drawing.png'); // REVISAR (debe ir al final la descarga)
        // downloadPracticeVideo(); // REVISAR (debe ir al final la descarga)
        practiceNextButton.style.display = 'none';
    });

    document.getElementById('toMainTestButton').addEventListener('click', function () {
        document.getElementById('instructionsE1').style.display = 'flex';
        practiceFinishScreen.style.display = 'none';
        canvasContainer.style.display = 'block';
        image.src = 'imagen2.png';
        image.onload = function () {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        startRecording('designCanvas');
        reiniciarTemporizador();
    });

    document.getElementById('finishButton').addEventListener('click', function () {
        document.getElementById('instructionsE1').style.display = 'none';
        stopRecording();
        canvasContainer.style.display = 'none';
        showHandSelection();
        
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

    function reiniciarTemporizador() {
        clearTimeout(temporizador);
        temporizador = setTimeout(arrowToRed, 60000); // Cambia después de 60 segundos
        // temporizador = setTimeout(arrowToRed, 3000); // Cambia después de 3 segundos
    }

    function arrowToRed() {
        const arrow = document.getElementById('finishButton');
        arrow.style.backgroundImage = "url('flecha4.png')";

    }

    // SELECCION DE MANO JS

    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");
    const handInputs = document.getElementsByName('hand');

    // Variable con la mano seleccionada
    let selectedHand = "";

    // Funcion para mostrar la pantalla de seleccion de mano
    function showHandSelection() {
        document.getElementById('finishButton').style.display = 'none';
        selectHandContainer.style.display = "block";
    }

    document.getElementById('handButton').addEventListener('click', function () {
        confirmHandSelection();
        document.getElementById('endTestButton').style.display = 'none';
    });

    // Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
    // En este caso fue mostrarFinalizacion()
    function confirmHandSelection() {
        console.log('holi holi holi' + selectedHand);
        selectHandContainer.style.display = "none";
        handButton.style.display = "none";
        document.getElementById('finishButton').style.display = 'block';
        
        finishScreen.style.display = 'block';
        downloadCanvas(canvas, 'drawing.png');
        downloadVideo();
    }

    // Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            handButton.style.display = "block";
            selectedHand = e.target.value;
        });
    });
};
