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
    const data = [];
    const beginingTime = new Date();


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
        stopAllAudios();
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
        stopAllAudios();
        instructions.style.display = 'none';
        document.getElementById('fullscreenButton').style.display = 'none';
        practiceContainer.style.display = 'none';
        practiceFinishScreen.style.display = 'block';
        // downloadCanvas(practiceCanvas, 'practice-drawing.png'); // REVISAR (debe ir al final la descarga)
        // downloadPracticeVideo(); // REVISAR (debe ir al final la descarga)
        practiceNextButton.style.display = 'none';
    });

    document.getElementById('toMainTestButton').addEventListener('click', function () {
        stopAllAudios();
        document.getElementById('instructionsE1').style.display = 'flex';
        document.getElementById('instructionAudio').style.display = 'block';
        practiceFinishScreen.style.display = 'none';
        canvasContainer.style.display = 'block';
        image.src = 'imagen2.png';
        image.onload = function () {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        startRecording('designCanvas');
    });
    
    const instructionAudio = document.getElementById('instructionAudio');
    instructionAudio.addEventListener('ended', function () {
        reiniciarTemporizador();
        startRecording('designCanvas');
    });

    document.getElementById('finishButton').addEventListener('click', function () {
        stopAllAudios();
        document.getElementById('instructionsE1').style.display = 'none';
        document.getElementById('instructionAudio').style.display = 'none';
        canvasContainer.style.display = 'none';
        showHandSelection();

    });

    document.getElementById('finishButton').style.display = 'block';

    document.getElementById('endTestButton').addEventListener('click', function () {
        stopAllAudios();
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
        console.log("grabando");



    }

    function stopRecording() {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm'

            });
        };
    }

    practiceCanvas.addEventListener('pointerdown', function (e) {
        
        practiceDrawing = true;
        practiceStartX = e.offsetX;
        practiceStartY = e.offsetY;
    });

    practiceCanvas.addEventListener('pointermove', function (e) {
        
        practiceCtx.beginPath();
        practiceCtx.moveTo(practiceStartX, practiceStartY);
        practiceCtx.lineTo(e.offsetX, e.offsetY);
        practiceCtx.stroke();
        practiceStartX = e.offsetX;
        practiceStartY = e.offsetY;
    });
    
    practiceCanvas.addEventListener('pointerup', function (e) {
    
        practiceDrawing = false;
    });
    
    practiceCanvas.addEventListener('pointerleave', function (e) {
        
        practiceDrawing = false;
    });

        // Obtén el rectángulo del lienzo y calcula el factor de escala
    function getCanvasCoordinates(canvas, clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width; // Relación entre el ancho real y el visual
        const scaleY = canvas.height / rect.height; // Relación entre el alto real y el visual
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;
        return { x, y };
    }

    canvas.addEventListener('pointerdown', function (e) {
        if (drawingCompletedB2 || event.pointerType !== 'pen') return; // Solo acepta lápiz.
        drawing = true;
        const { x, y } = getCanvasCoordinates(canvas, e.clientX, e.clientY);
        startX = x;
        startY = y;
    });

    canvas.addEventListener('pointermove', function (e) {
        if (drawingCompletedB2 || event.pointerType !== 'pen') return; // Solo acepta lápiz.
        if (!drawing) return;
        const { x, y } = getCanvasCoordinates(canvas, e.clientX, e.clientY);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();

        startX = x;
        startY = y;
    });

    canvas.addEventListener('pointerup', function () {
        if (drawingCompletedB2 || event.pointerType !== 'pen') return; // Solo acepta lápiz.
        drawing = false;
    });

    canvas.addEventListener('pointerleave', function () {
        if (drawingCompletedB2 || event.pointerType !== 'pen') return; // Solo acepta lápiz.
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

    function generateCSV(data) {
        let csvContent = `TotTime;Hand\n`;
    
        data.forEach(row => {
            let linea = ` ${row.taskTime};${selectedHand}\n`;
            csvContent += linea;
        });
    
        return new Blob([csvContent], { type: 'text/csv' });
    }
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    // Obtener el id_participante de la URL
    const idParticipante = getQueryParam('id_participante');

    function testFinalizado() {
        // Detener las grabaciones (ya se hace dentro de startPracticeRecording y startRecording)
        stopPracticeRecording();
        stopRecording();
    
        setTimeout(() => {
            const zip = new JSZip();
            const date = new Date();
    
            // Añadir los videos grabados al ZIP
            zip.file("3_Design_Fluency_Canvas_Recording.webm", new Blob(recordedChunks, { type: 'video/webm' }));
    
            // Generar y añadir el archivo TXT al ZIP
            const csvContent = generateCSV(data);
            zip.file(`${idParticipante}_3_Design_Fluency_${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}.csv`, csvContent);
    
            // Capturar las imágenes de los canvas y añadir al ZIP
            canvas.toBlob(function (blob) {
                zip.file("3_Design_Fluency_Canvas_Screenshot.png", blob);
    
                practiceCanvas.toBlob(function (blobPractice) {
                    // zip.file("canvasPracticeScreenshot.png", blobPractice);
    
                    // Generar el archivo ZIP y descargarlo
                    zip.generateAsync({ type: 'blob' }).then(function (content) {
                        saveAs(content, `${idParticipante}_3_Design_Fluency_Metricas_${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}.zip`);
                        
                        setTimeout(() => {
                            window.close();
                        }, 100);
                    });
                });
            });
        }, 1000);
    }
    


    // SELECCION DE MANO JS

    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");
    const handInputs = document.getElementsByName('hand');
    const enterIDContainer = document.getElementById("enterID");

    // Variable con la mano seleccionada
    let selectedHand = "";

    // Funcion para mostrar la pantalla de seleccion de mano
    function showHandSelection() {
        document.getElementById('finishButton').style.display = 'none';
        document.getElementById('fin').style.display = 'block';
        selectHandContainer.style.display = "block";
        // enterIDContainer.style.display = "block";
    }

    document.getElementById('handButton').addEventListener('click', function () {
        stopAllAudios();
        confirmHandSelection();
        document.getElementById('endTestButton').style.display = 'none';
        const now = new Date();
        const taskTime = (now - beginingTime) / 1000;
        data.push({
            taskTime: taskTime
        });
    });

    // Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
    // En este caso fue mostrarFinalizacion()

    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

        if (selectedHand) {
            handButton.style.display = 'block';
        }
    }

    function confirmHandSelection() {
        console.log('holi holi holi' + selectedHand);
        selectHandContainer.style.display = "none";
        handButton.style.display = "none";
        document.getElementById('fin').style.display = 'none';
        finishScreen.style.display = 'block';
        document.getElementById('fin').style.display = 'none';
        testFinalizado();
    }

    // Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            validateInputs();
            selectedHand = e.target.value;
        });
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

    function stopAllAudios() {
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => audio.pause());
    }
};
