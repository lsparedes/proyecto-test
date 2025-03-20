let startTime;
window.onload = function () {
    const instructions = document.getElementById('instructions');
    const practiceContainer = document.getElementById('practiceContainer');
    const practiceCanvas = document.getElementById('practiceCanvas');
    const practiceCtx = practiceCanvas.getContext('2d');
    practiceCtx.strokeStyle = "black"; // Color de la línea
    practiceCtx.lineWidth = 2; // Grosor de la línea
    practiceCtx.lineCap = "round"; // Suaviza el trazo
    const practiceImage = new Image();
    const practiceFinishScreen = document.getElementById('practiceFinishScreen');

    const canvasContainer = document.getElementById('canvasContainer');
    const canvas = document.getElementById('designCanvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = "black"; // Color de la línea
    ctx.lineWidth = 2; // Grosor de la línea
    ctx.lineCap = "round"; // Suaviza el trazo
    const image = new Image();
    const finishScreen = document.getElementById('finishScreen');
    const endScreen = document.getElementById('endScreen');
    const data = [];
    const beginingTime = new Date();
    const Audio = document.getElementById('AudioPrueba');


    let drawingCompletedCanvas = false;
    let drawingCompletedpractice = false;
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
        
    });

    Audio.addEventListener('ended', function () {
        startTime = Date.now();  // Guardar el tiempo cuando termina el audio
        let formattedTime = new Date(startTime).toLocaleString(); // Convertir a fecha legible
        console.log("Tiempo de inicio (cuando termina el audio): ", formattedTime);
        reiniciarTemporizador();
        startRecording('designCanvas');  // Iniciar grabación después de que el audio termine
    });
    

    document.getElementById('finishButton').addEventListener('click', function () {
        stopAllAudios();
        document.getElementById('instructionsE1').style.display = 'none';
        document.getElementById('instructionAudio').style.display = 'none';
        canvasContainer.style.display = 'none';
        showHandSelection();
    
        if (startTime) {
            let endTime = Date.now();
            let ExecTime = (endTime - startTime) / 1000; // Tiempo en segundos
            console.log(`Tiempo de ejecución: ${ExecTime} segundos`);
    
            // Guardar ExecTime en data
            data.push({
                taskTime: (endTime - beginingTime) / 1000, // Tiempo total de la tarea
                ExecTime: ExecTime // Tiempo de ejecución desde el fin del audio
            });
    
        } else {
            console.log('startTime no está definido correctamente.');
        }
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
        try {
            const canvas = document.getElementById(canvasId);
            if (!canvas) {
                console.error("Canvas no encontrado:", canvasId);
                return;
            }
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
            console.log("grabando...");
        } catch (error) {
            console.error("Error al iniciar la grabación:", error);
        }
    }
    

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, {
                    type: 'video/webm'
                });
            };
        } else {
            console.warn("mediaRecorder no está inicializado o ya ha sido detenido.");
        }
    }
    
    function getpracticeCanvasCoordinates(practiceCanvas, clientX, clientY) {
        const rectpractice = practiceCanvas.getBoundingClientRect();
        const scaleX = practiceCanvas.width / rectpractice.width;
        const scaleY = practiceCanvas.height / rectpractice.height;
        const px = (clientX - rectpractice.left) * scaleX;
        const py = (clientY - rectpractice.top) * scaleY;
        return { px, py };
    }

    practiceCanvas.addEventListener('touchstart', function (e) {
        if (drawingCompletedpractice) return;
        const touch = e.touches[0];
        practiceDrawing = true;
        const { px, py } = getpracticeCanvasCoordinates(practiceCanvas, touch.clientX, touch.clientY);
        startX = px;
        startY = py;
        e.preventDefault(); // Evita el comportamiento predeterminado
    });

    practiceCanvas.addEventListener('touchmove', function (e) {
        if (drawingCompletedpractice || !practiceDrawing) return; // Solo si está dibujando
        e.preventDefault(); // Evita el comportamiento predeterminado
        const touch = e.touches[0];
        const { px, py } = getpracticeCanvasCoordinates(practiceCanvas, touch.clientX, touch.clientY);
        practiceCtx.beginPath();
        practiceCtx.moveTo(startX, startY);
        practiceCtx.lineTo(px, py);
        practiceCtx.stroke();
        startX = px;
        startY = py;
    });

    practiceCanvas.addEventListener('touchend', function (e) {
        if (drawingCompletedpractice) return; // Evita dibujar si ya se completó
        practiceDrawing = false;
    });

    practiceCanvas.addEventListener('touchcancel', function (e) {
        if (drawingCompletedpractice) return; // Evita dibujar si ya se completó
        practiceDrawing = false;
    });


    function getCanvasCoordinates(canvas, clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width; // Relación entre el ancho real y el visual
        const scaleY = canvas.height / rect.height; // Relación entre el alto real y el visual
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;
        return { x, y };

    }

    canvas.addEventListener('touchstart', function (e) {
        if (drawingCompletedCanvas) return;
        drawing = true;
        const touch = e.touches[0];
        const { x, y } = getCanvasCoordinates(canvas, touch.clientX, touch.clientY);
        startX = x;
        startY = y;
    });

    canvas.addEventListener('touchmove', function (e) {
        if (drawingCompletedCanvas || !drawing) return;
        e.preventDefault(); // Previene el desplazamiento de la página mientras se dibuja
        const touch = e.touches[0];
        const { x, y } = getCanvasCoordinates(canvas, touch.clientX, touch.clientY);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();

        startX = x;
        startY = y;
    });

    canvas.addEventListener('touchend', function () {
        if (drawingCompletedCanvas) return;
        drawing = false;
    });

    canvas.addEventListener('touchcancel', function () {
        if (drawingCompletedCanvas) return;
        drawing = false;
    });

    function reiniciarTemporizador() {
        clearTimeout(temporizador);
        temporizador = setTimeout(arrowToRed, 60000); // Cambia después de 60 segundos
    }

    function arrowToRed() {
        const arrow = document.getElementById('finishButton');
        arrow.style.backgroundImage = "url('flecha4.png')";
    }

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

        function generateCSV(data) {
            if (!userInfo || !userInfo.name || !userInfo.last_name) {
                console.error("Error: userInfo no está definido correctamente.");
                return new Blob([], { type: 'text/csv' });
            }
        
            const initials = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();
        
            let csvContent = `TotTime;ExecTime;Hand;Examinador\n`;
        
            data.forEach(entry => {
                const totTime = entry.taskTime ?? "";
                const execTime = entry.ExecTime ?? "";
                const hand = selectedHand ?? "";
                const examiner = initials;
                
                csvContent += `${totTime.toFixed(3).replace('.', ',')};${execTime.toFixed(3).replace('.', ',')};${hand};${examiner}\n`;
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
                        }, 3000);
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
    });

    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

        if (selectedHand) {
            handButton.style.display = 'block';
        }
    }

    function confirmHandSelection() {
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