document.addEventListener('DOMContentLoaded', function () {
    const fullscreenButton = document.getElementById('fullscreenButton');
    const canvas = document.getElementById('tmtCanvas');
    const canvasPartA = document.getElementById('tmtCanvasPartA');
    const ctx = canvas.getContext('2d');
    const ctxPartA = canvasPartA.getContext('2d');
    const circles = [];
    const circlesPartA = [];
    let currentCircle = 1;
    let currentCirclePartA = 1;
    let isDrawing = false;
    let isDrawingPartA = false;
    let lastCircle = null;
    let lastCirclePartA = null;
    const correctPaths = [];
    const correctPathsPartA = [];
    const incorrectPaths = [];
    const incorrectPathsPartA = [];
    let temporizador = null;
    let circlesToCorrect = [];
    let circlesToCorrectA = [];
    const recordedChunksCanvas = [];
    const recordedChunksCanvasPartA = [];
    let mediaRecorderCanvas;
    let mediaRecorderCanvasPartA;
    const data = [];
    let erroresComision = 0;
    let correctLines = 0;
    let liftPenCount = 0;
    let penAirTime = 0;
    let airStartTime = null;
    let correctLinesPartA = 0;
    let errorRegistradoPartA = false;
    const show = document.getElementById('show');
    const show1 = document.getElementById('show1');
    const endSequenceButton = document.createElement('button');
    endSequenceButton.id = 'endSequenceButton';
    document.body.appendChild(endSequenceButton);

    let circleRadius = 30; // Cambiado de const a let para permitir reasignación


    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenEnabled && !document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('imagenes/minimize.png')";
            document.documentElement.requestFullscreen();
        } else if (document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('imagenes/full-screen.png')";
            document.exitFullscreen();
        } else {
            console.log('El modo de pantalla completa no es soportado por tu navegador.');
        }
    });


    function drawCircle(ctx, x, y, number, circlesArray, name = "", circleRadius) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();

        ctx.fillStyle = 'black';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(number, x, y);

        if (name) {
            ctx.font = 'bold 18px Arial';
            ctx.fillText(name, x, y - circleRadius - 20);
        }

        circlesArray.push({ x, y, number });
    }

    function getTouchPos(canvasDom, touchEvent) {
        const rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    function highlightCircle(ctx, circle, color, lastX, lastY) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.moveTo(lastX, lastY);
    }

    function drawLineToCircleEdge(ctx, startX, startY, endX, endY) {
        const angle = Math.atan2(endY - startY, endX - startX);
        const edgeX = endX - circleRadius * Math.cos(angle);
        const edgeY = endY - circleRadius * Math.sin(angle);
        ctx.lineTo(edgeX, edgeY);
        ctx.stroke();
    }

    function startRecording(canvas, recordedChunks) {
        const stream = canvas.captureStream(30); // 30 FPS
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.start();
        return mediaRecorder;
    }

    function startTest() {
        canvas.style.display = 'block';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white'; // Fondo blanco
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        circles.length = 0;
        currentCircle = 1;
        lastCircle = null;
        correctPaths.length = 0;
        incorrectPaths.length = 0;
        circlesToCorrect.length = 0;

        const circleCoordinates = [
            { x: 350 - 70, y: 310 },
            { x: 470 - 70, y: 100 },
            { x: 640 - 70, y: 320 },
            { x: 500 - 70, y: 220 },
            { x: 530 - 70, y: 370 },
            { x: 160 - 70, y: 400 },
            { x: 140 - 70, y: 190 },
            { x: 300 - 70, y: 150 }
        ];

        circleCoordinates.forEach((coord, index) => {
            const name = index === 0 ? "Empezar" : (index === circleCoordinates.length - 1 ? "Terminar" : "");
            drawCircle(ctx, coord.x, coord.y, index + 1, circles, name, circleRadius);
        });

        drawNextButton();
        show.style.display = 'block';
        show1.style.display = 'none';
    }
    let begining = null;
    window.onload = function () {
        startTest();
        begining = new Date();
    }

    let drawingCompleted = false;

    function startDrawing(x, y) {
        circles.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            console.log('distancia: ' + distance);
            if (distance < circleRadius && circle.number === currentCircle) {
                isDrawing = true;
                lastCircle = circle;
                ctx.beginPath();
                ctx.moveTo(circle.x, circle.y);

                // Aplicar negrita visual con borde negro al presionar el 1
                if (circle.number === 1) {
                    highlightCircle(ctx, circle, 'black', circle.x, circle.y);
                }
            }

        });
    }

    function drawMove(x, y) {
        if (!isDrawing) return;
        ctx.lineTo(x, y);
        ctx.stroke();

        let validDrop = false;

        circles.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance <= circleRadius && circle.number != currentCircle + 1 && lastCircle.number != circle.number) {
                highlightCircle(ctx, circle, 'red', x, y);
                incorrectPaths.push([{ x: lastCircle.x, y: lastCircle.y }, { x, y }]);

                // Añadir el círculo a una lista de círculos incorrectos para mantener el color rojo

                isDrawing = false;
            } else if (distance < circleRadius && circle.number === currentCircle + 1) {
                highlightCircle(ctx, circle, 'black', x, y);
                correctPaths.push([{ x: lastCircle.x, y: lastCircle.y }, { x: circle.x, y: circle.y }]);
                currentCircle++;
                lastCircle = circle;
                validDrop = true;
                correctLines++;

                if (circlesToCorrect.length > 0) {
                    resetIncorrectCircles(ctx, circlesToCorrect, circleRadius);
                }
            }
        });

        if (currentCircle === 8) {
            drawingCompleted = true;
        }
    }

    function resetIncorrectCircles(ctx, circlesToReset, radius) {
        const padding = 2;
        circlesToReset.forEach(circle => {


            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2, true);
            ctx.fill();

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.stroke();

            ctx.fillStyle = 'black';
            ctx.font = '32px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(circle.number, circle.x, circle.y);
        });

        circlesToReset.length = 0;
    }



    function endDrawing(x, y) {
        let validDrop = false;

        circles.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance < circleRadius && circle.number === currentCircle + 1) {
                // drawLineToCircleEdge(ctx, lastCircle.x, lastCircle.y, circle.x, circle.y);
                highlightCircle(ctx, circle, 'black', x, y);
                correctPaths.push([{ x: lastCircle.x, y: lastCircle.y }, { x: circle.x, y: circle.y }]);
                currentCircle++;
                lastCircle = circle;
                validDrop = true;
            }
        });

        if (!validDrop) {
            const distance = Math.sqrt((x - lastCircle.x) ** 2 + (y - lastCircle.y) ** 2);
            if (distance > circleRadius) {
                incorrectPaths.push([{ x: lastCircle.x, y: lastCircle.y }, { x, y }]);
                // erroresComision++;
            }
        }

        isDrawing = false;
    }

    function getTouchPosRotated(canvas, touchEvent) {
        const rect = canvas.getBoundingClientRect();
        const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];

        // Coordenadas originales respecto al canvas
        const localX = touch.clientX - rect.left;
        const localY = touch.clientY - rect.top;

        // Transformación para la rotación de -90°
        const rotatedX = rect.height - localY;
        const rotatedY = localX;

        return { x: rotatedX, y: rotatedY };
    }

    // Evento touchstart
    canvas.addEventListener('touchstart', function (event) {
        event.preventDefault();
        const { x, y } = getTouchPosRotated(canvas, event);
        startDrawing(x, y);
    });

    // Evento touchmove
    canvas.addEventListener('touchmove', function (event) {
        if (event.touches.length > 0) {
            event.preventDefault();
            const { x, y } = getTouchPosRotated(canvas, event);
            drawMove(x, y);
        }
    });

    // Evento touchend
    canvas.addEventListener('touchend', function (event) {
        event.preventDefault();
        const { x, y } = getTouchPosRotated(canvas, event);
        endDrawing(x, y);
    });


    function drawNextButton() {
        const nextButton = document.createElement('button');
        nextButton.id = 'endSequenceButton';
        nextButton.style.display = 'inline-block';

        nextButton.addEventListener('click', () => {
            document.getElementById('instructionAudio1').pause();
            document.getElementById('show').style.display = 'none';
            document.getElementById('fullscreenButton').style.display = 'none';
            document.getElementById('instructionAudio1').style.display = 'none';
            document.getElementById('instructions').style.display = 'none';
            canvas.style.display = 'none';
            document.getElementById('partA').style.display = 'flex';
            document.getElementById('show1').style.display = 'flex';
            nextButton.remove();
            startPartA();
            show1.style.display = 'block';
        });

        document.body.appendChild(nextButton);
    }

    function reiniciarTemporizador() {
        clearTimeout(temporizador);
        temporizador = setTimeout(arrowToRed, 150000);

    }

    function arrowToRed() {
        console.log('Cambio de flecha a rojo');
        const arrow = document.getElementById('endSequenceButton');
        arrow.style.display = 'block';
        arrow.style.backgroundImage = "url('imagenes/flecha4.png')";
    }

    const instructionAudio = document.getElementById('instructionAudio');


    instructionAudio.addEventListener('ended', function () {
        playBeep();
        if (!isRecordingStarted) {
            mediaRecorderCanvasPartA = startRecording(canvasPartA, recordedChunksCanvasPartA);
            isRecordingStarted = true;
        }
    });

    let inicio = null;
    function playBeep() {
        const beep = new Audio('sonidos/beep.wav');
        beep.play();
        inicio = new Date();
        reiniciarTemporizador();
    }

    function startPartA() {
        canvasPartA.style.display = 'block';
        ctxPartA.clearRect(0, 0, canvasPartA.width, canvasPartA.height);
        ctxPartA.fillStyle = 'white'; // Fondo blanco
        ctxPartA.fillRect(0, 0, canvasPartA.width, canvasPartA.height);
        circlesPartA.length = 0;
        currentCirclePartA = 1;
        lastCirclePartA = null;
        correctPathsPartA.length = 0;
        incorrectPathsPartA.length = 0;
        circleRadius = 30; // Cambiado de const a let para permitir reasignación

        const circleCoordinatesPartA = [
            { x: 580, y: 700 },
            { x: 400, y: 837 },
            { x: 654, y: 881 },
            { x: 621, y: 490 },
            { x: 367, y: 526 },
            { x: 490, y: 617 },
            { x: 343, y: 711 },
            { x: 204, y: 879 },
            { x: 258, y: 999 },
            { x: 321, y: 875 },
            { x: 537, y: 1037 },
            { x: 130, y: 1086 },
            { x: 200, y: 604 },
            { x: 104, y: 741 },
            { x: 112, y: 200 },
            { x: 202, y: 365 },
            { x: 435, y: 166 },
            { x: 409, y: 395 },
            { x: 667, y: 255 },
            { x: 519, y: 247 },
            { x: 744, y: 148 },
            { x: 734, y: 464 },
            { x: 761, y: 1060 },
            { x: 711, y: 666 },
            { x: 670, y: 1023 }
        ];

        circleCoordinatesPartA.forEach((coord, index) => {
            const name = index === 0 ? "Empezar" : (index === circleCoordinatesPartA.length - 1 ? "Terminar" : "");
            drawCircle(ctxPartA, coord.x, coord.y, index + 1, circlesPartA, name, circleRadius);
        });
        drawNextButtonA();

    }

    let drawingCompletedA = false;

    function startDrawingPartA(x, y) {
        circlesPartA.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance < circleRadius && circle.number === currentCirclePartA) {
                isDrawingPartA = true;
                lastCirclePartA = circle;
                ctxPartA.beginPath();
                ctxPartA.moveTo(circle.x, circle.y);

                if (circle.number === 1) {
                    highlightCircle(ctxPartA, circle, 'black', circle.x, circle.y);
                }
            }
        });
    }

    function drawMovePartA(x, y) {
        if (!isDrawingPartA) return;
        if (!errorRegistradoPartA) {
            ctxPartA.lineTo(x, y);
            ctxPartA.stroke();
        }

        let validDrop = false;

        circlesPartA.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance <= circleRadius && circle.number != currentCirclePartA + 1 && lastCirclePartA.number != circle.number) {
                
                highlightCircle(ctxPartA, circle, 'red', x, y);
                incorrectPathsPartA.push([{ x: lastCirclePartA.x, y: lastCirclePartA.y }, { x, y }]);

                if (!circlesToCorrectA.some(c => c.number === circle.number)) {
                    circlesToCorrectA.push({ x: circle.x, y: circle.y, number: circle.number });
                }

                if (!errorRegistradoPartA) {
                    erroresComision++; // 
                    errorRegistradoPartA = true;
                }
                isDrawingPartA = false;
                ctxPartA.beginPath();
            } else if (
                distance < circleRadius &&
                circle.number === currentCirclePartA + 1 &&
                lastCirclePartA.number === currentCirclePartA
            ) {
                highlightCircle(ctxPartA, circle, 'black', x, y);
                correctPathsPartA.push([{ x: lastCirclePartA.x, y: lastCirclePartA.y }, { x: circle.x, y: circle.y }]);
                currentCirclePartA++;
                lastCirclePartA = circle;
                validDrop = true;
                correctLinesPartA++;

                if (circlesToCorrectA.length > 0) {
                    resetIncorrectCircles(ctxPartA, circlesToCorrectA, circleRadius);
                }

                ctxPartA.beginPath();
                ctxPartA.moveTo(circle.x, circle.y);
            }

        });

        if (currentCirclePartA === 25) {
            drawingCompletedA = true;
        }
    }

    function endDrawingPartA(x, y) {
        let validDrop = false;

        circlesPartA.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance < circleRadius && circle.number === currentCirclePartA + 1) {
                // drawLineToCircleEdge(ctxPartA, lastCirclePartA.x, lastCirclePartA.y, circle.x, circle.y);
                highlightCircle(ctxPartA, circle, 'black', x, y);
                correctPathsPartA.push([{ x: lastCirclePartA.x, y: lastCirclePartA.y }, { x: circle.x, y: circle.y }]);
                currentCirclePartA++;
                lastCirclePartA = circle;
                validDrop = true;
            }
        });

        if (!validDrop) {
            const distance = Math.sqrt((x - lastCirclePartA.x) ** 2 + (y - lastCirclePartA.y) ** 2);
            if (distance > circleRadius) {
                incorrectPathsPartA.push([{ x: lastCirclePartA.x, y: lastCirclePartA.y }, { x, y }]);
                // erroresComision++;
            }
        }

        isDrawingPartA = false;
    }

    function getTouchPosRotatedPartA(canvas, touchEvent) {
        const rect = canvas.getBoundingClientRect();
        const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];

        // Coordenadas originales respecto al canvas
        const localX = touch.clientX - rect.left;
        const localY = touch.clientY - rect.top;

        // Transformación para la rotación de -90°
        const rotatedX = rect.height - localY;
        const rotatedY = localX;

        return { x: rotatedX, y: rotatedY };
    }

    // Evento touchstart
    let isRecordingStarted = false;

    canvasPartA.addEventListener('touchstart', function (event) {
        event.preventDefault();

        // Iniciar grabación si aún no ha empezado
        if (!isRecordingStarted) {
            mediaRecorderCanvasPartA = startRecording(canvasPartA, recordedChunksCanvasPartA);
            isRecordingStarted = true;
            console.log('Grabación iniciada al tocar el canvas');
        }

        const { x, y } = getTouchPosRotatedPartA(canvasPartA, event);
        startDrawingPartA(x, y);

        if (airStartTime) {
            const airEndTime = new Date();
            penAirTime += (airEndTime - airStartTime) / 1000;
            airStartTime = null;
        }
        errorRegistradoPartA = false;
    });


    // Evento touchmove
    canvasPartA.addEventListener('touchmove', function (event) {
        if (event.touches.length > 0) {
            event.preventDefault();
            const { x, y } = getTouchPosRotatedPartA(canvasPartA, event);
            drawMovePartA(x, y);
        }
    });

    // Evento touchend
    canvasPartA.addEventListener('touchend', function (event) {
        event.preventDefault();
        const { x, y } = getTouchPosRotatedPartA(canvasPartA, event);
        endDrawingPartA(x, y);

        if (isDrawingPartA) {
            liftPenCount++;
            airStartTime = new Date();
        }

        isDrawingPartA = false;
    });




    function drawNextButtonA() {
        const nextButtonA = document.createElement('button');
        nextButtonA.id = 'endSequenceButton';
        nextButtonA.style.display = 'inline-block';

        nextButtonA.addEventListener('click', () => {
            clearTimeout(temporizador); // Detener temporizador para evitar que se ejecute la función arrowToRed
            document.getElementById('instructionAudio').pause();
            document.getElementById('partA').style.display = 'none';
            canvasPartA.style.display = 'none';
            nextButtonA.remove();
            const fin = new Date();
            let executionTime = 0;
            if (inicio) {
                executionTime = (fin - inicio) / 1000; // Tiempo de ejecución de la tarea en milisegundos
            }
            const taskTime = (fin - begining) / 1000; // Tiempo total de la tarea en segundos
            console.log('Tiempo de ejecución de la tarea:', executionTime, 'segundos');
            data.push({
                executionTime: executionTime,
                commissionErrors: erroresComision,
                correctLines: correctLinesPartA,
                liftPenCount: liftPenCount,
                penAirTime: penAirTime,
                taskTime: taskTime
            });
            showHandSelection();
            show1.style.display = 'none';
        });

        document.body.appendChild(nextButtonA);
    }


    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Obtener el id_participante de la URL
    const idParticipante = getQueryParam('id_participante');

    function testFinalizado() {
        const fechaActual = new Date();
        const options = { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' };
        const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
        const [day, month, year] = fechaHoraChilena.split('-');
        const fechaFormateada = `${day}_${month}_${year}`;

        // mediaRecorderCanvas.stop();
        if (isRecordingStarted) {
            mediaRecorderCanvasPartA.stop();

            mediaRecorderCanvasPartA.onstop = () => {
                const blob = new Blob(recordedChunksCanvasPartA, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
            };
        }




        setTimeout(() => {
            const zip = new JSZip();
            // zip.file("canvasRecording.webm", new Blob(recordedChunksCanvas, { type: 'video/webm' }));
            zip.file("2_TMT_Part_A_Canvas_Recording.webm", new Blob(recordedChunksCanvasPartA, { type: 'video/webm' }));
            const csvContent = generateCSV(data);
            zip.file("2_TMT_Part_A.csv", csvContent);

            canvas.toBlob(function (blob) {
                // zip.file("canvasScreenshot.png", blob);

                canvasPartA.toBlob(function (blobPartA) {
                    zip.file("2_TMT_Part_A_Canvas_Screenshot.png", blobPartA);

                    zip.generateAsync({ type: 'blob' }).then(function (content) {
                        saveAs(content, `${idParticipante}_2_TMT_Part_A_${fechaFormateada}.zip`);
                        // cerrar ventana al descargar
                        setTimeout(() => {
                            window.close();
                        }, 3000);
                    });
                });
            });


        }, 1000);
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
        // Obtener las iniciales del examinador
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return; // Salir si userInfo no está disponible
        }

        const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();

        // Comienza con los encabezados, agregando la columna para el Examinador
        let csvContent = "ExecTime;NoIncLines;NoCorrLines;NoLiftPen;ExecLiftTime;TotTime;Hand;Examinador\n";

        // Agregar cada fila de datos, incluyendo las iniciales del examinador
        data.forEach(row => {
            let linea = `${row.executionTime.toFixed(3).replace('.', ',')};${row.commissionErrors};${row.correctLines};${row.liftPenCount};${row.penAirTime.toFixed(3).replace('.', ',')};${row.taskTime.toFixed(3).replace('.', ',')};${selectedHand};${inicialesExaminador}\n`;
            csvContent += linea;
        });

        // Crear el Blob con el contenido CSV
        return new Blob([csvContent], { type: 'text/csv' });
    }


    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");
    const handInputs = document.getElementsByName('hand');

    let selectedHand = "";

    function showHandSelection() {
        document.getElementById('preEnd').style.display = 'block';
        document.getElementById('fin').style.display = 'block';
        selectHandContainer.style.display = "block";
    }

    handButton.addEventListener('click', confirmHandSelection);



    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

        if (selectedHand) {
            handButton.style.display = 'block';
        }
    }

    // document.getElementById('handButton').addEventListener('click', confirmHandSelection);

    function confirmHandSelection() {
        document.getElementById('preEnd').style.display = 'none';
        selectHandContainer.style.display = "none";
        handButton.style.display = "none";
        testFinalizado();
    }

    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            validateInputs();
            selectedHand = e.target.value;
        });
    });
});
