document.addEventListener('DOMContentLoaded', function () {
    // const startButton = document.getElementById('startButton');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const canvas = document.getElementById('tmtCanvas');
    const canvasPartA = document.getElementById('tmtCanvasPartA');
    const ctx = canvas.getContext('2d');
    const ctxPartA = canvasPartA.getContext('2d');
    const circles = [];
    const circlesPartA = [];
    let currentCircle = 1; // El siguiente número que debe ser seleccionado
    let currentCirclePartA = 1; // El siguiente número que debe ser seleccionado en la parte B
    let isDrawing = false;
    let isDrawingPartA = false;
    let lastCircle = null;
    let lastCirclePartA = null;
    const correctPaths = []; // Para almacenar caminos correctos
    const correctPathsPartA = []; // Para almacenar caminos correctos en la parte B
    const incorrectPaths = []; // Para almacenar caminos incorrectos
    const incorrectPathsPartA = []; // Para almacenar caminos incorrectos en la parte B
    let temporizador = null;
    const circlesToCorrect = []; // Para almacenar los círculos que se deben corregir
    const circlesToCorrectA = []; // Para almacenar los círculos que se deben corregir
    const recordedChunksCanvas = [];
    const recordedChunksCanvasPartA = [];

    let mediaRecorderCanvas;
    let mediaRecorderCanvasPartA;


    const data = []; // Para almacenar los datos de la tarea
    let erroresComision = 0; // Contador para errores de comisión
    let correctLines = 0; // Contador para líneas correctas
    let liftPenCount = 0; // Contador para veces que el participante levantó el lápiz de la pantalla
    let penAirTime = 0; // Tiempo total de lápiz en el aire desde la primera respuesta en el canvas
    let airStartTime = null;

    const endSequenceButton = document.createElement('button'); // Crear el botón "Terminar"
    endSequenceButton.id = 'endSequenceButton'; // Asignar el id para aplicar estilos CSS
    document.body.appendChild(endSequenceButton);

    const redLinesCount = 0; // Contador para líneas incorrectas 

    function drawCircle(ctx, x, y, number, circlesArray, name = "", circleRadius) {
        ctx.fillStyle = 'white'; // Fondo blanco
        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.lineWidth = 1; // Grosor del borde
        ctx.strokeStyle = 'black'; // Color del borde
        ctx.stroke();

        ctx.fillStyle = 'black'; // Texto negro
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(number, x, y);

        if (name) {
            ctx.font = 'bold 18px Arial';
            ctx.fillText(name, x, y - circleRadius - 20); // Mostrar el nombre debajo del círculo
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
        ctx.lineWidth = 3; // Aumentar el grosor del borde
        ctx.strokeStyle = color; // Color para el borde resaltado
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.strokeStyle = 'black'; // Restablecer el color para futuras líneas correctas
        ctx.lineWidth = 1; // Restablecer el grosor del borde
        ctx.moveTo(lastX, lastY); // mueve el cursor desde el ultimo punto que se dibujo el arco hasta donde se encuentra el mouse
    }

    function drawLineToCircleEdge(ctx, startX, startY, endX, endY) {
        const angle = Math.atan2(endY - startY, endX - startX);
        const edgeX = endX - circleRadius * Math.cos(angle);
        const edgeY = endY - circleRadius * Math.sin(angle);
        ctx.lineTo(edgeX, edgeY);
        ctx.stroke();
    }

    function startRecording(canvas, recordedChunks) {
        const stream = canvas.captureStream();
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.start();
        return mediaRecorder;
    }

    // PRIMER CANVAS

    function startTest() {
        document.getElementById('instructions').style.display = 'flex';
        canvas.style.display = 'block';
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
        circles.length = 0;
        currentCircle = 1;
        lastCircle = null;
        correctPaths.length = 0;
        incorrectPaths.length = 0;
        circleRadius = 40;
        circlesToCorrect.length = 0;

        // Coordenadas predefinidas de los círculos
        const circleCoordinates = [
            { x: 450, y: 460 },
            { x: 600, y: 200 },
            { x: 840, y: 470 },
            { x: 650, y: 350 },
            { x: 670, y: 580 },
            { x: 180, y: 610 },
            { x: 130, y: 320 },
            { x: 400, y: 250 }
        ];

        // Dibujar círculos con las coordenadas predefinidas
        circleCoordinates.forEach((coord, index) => {
            const name = index === 0 ? "Empezar" : (index === circleCoordinates.length - 1 ? "Terminar" : "");
            drawCircle(ctx, coord.x, coord.y, index + 1, circles, name, circleRadius);
        });
        drawNextButton();
    }
    let begining = null;
    window.onload = function () {
        startTest();
        begining = new Date();
        // Iniciar grabación para el primer canvas
        mediaRecorderCanvas = startRecording(canvas, recordedChunksCanvas);
    }

    let drawingCompleted = false; // Bandera para indicar si se completó el dibujo

    function startDrawing(x, y) {
        circles.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance < circleRadius && circle.number === currentCircle) {
                isDrawing = true;
                lastCircle = circle;
                ctx.beginPath();
                ctx.moveTo(circle.x, circle.y);
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
                circlesToCorrect.push({ x: circle.x, y: circle.y, number: circle.number });
                isDrawing = false;
            } else if (distance < circleRadius && circle.number === currentCircle + 1) {
                highlightCircle(ctx, circle, 'black', x, y); // Restablecer el borde correcto
                drawLineToCircleEdge(ctx, lastCircle.x, lastCircle.y, circle.x, circle.y);
                correctPaths.push([{ x: lastCircle.x, y: lastCircle.y }, { x: circle.x, y: circle.y }]);
                currentCircle++;
                lastCircle = circle;
                validDrop = true;

                if (circlesToCorrect.length > 0) {
                    circlesToCorrect.forEach(circle => {
                        highlightCircle(ctx, circle, 'black', x, y);
                    });
                    circlesToCorrect = [];
                }
            }
        });

        if (currentCircle === 8) {

            drawingCompleted = true; // Establecer la bandera en true cuando se complete el dibujo
        }
    }

    function endDrawing(x, y) {
        let validDrop = false;

        circles.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance < circleRadius && circle.number === currentCircle + 1) {
                drawLineToCircleEdge(ctx, lastCircle.x, lastCircle.y, circle.x, circle.y);
                highlightCircle(ctx, circle, 'black', x, y); // Restablecer el borde correcto
                correctPaths.push([{ x: lastCircle.x, y: lastCircle.y }, { x: circle.x, y: circle.y }]);
                currentCircle++;
                lastCircle = circle;
                validDrop = true;
            }
        });

        const distance = Math.sqrt((x - lastCircle.x) ** 2 + (y - lastCircle.y) ** 2);

        if (!validDrop && lastCircle && distance > circleRadius) {
            incorrectPaths.push([{ x: lastCircle.x, y: lastCircle.y }, { x, y }]);
        }

        if (currentCircle === 8) {
            drawNextButton();
            drawingCompleted = true; // Establecer la bandera en true cuando se complete el dibujo
        }

        isDrawing = false;
    }



    canvas.addEventListener('mousedown', function (event) {
        if (drawingCompleted) return; // Si el dibujo está completo, no hacer nada
        startDrawing(event.offsetX, event.offsetY);
    });

    canvas.addEventListener('mousemove', function (event) {
        if (drawingCompleted) return; // Si el dibujo está completo, no hacer nada
        drawMove(event.offsetX, event.offsetY);
    });

    canvas.addEventListener('mouseup', function (event) {
        if (drawingCompleted) return; // Si el dibujo está completo, no hacer nada
        endDrawing(event.offsetX, event.offsetY);
    });

    canvas.addEventListener('touchstart', function (event) {
        if (drawingCompleted) return; // Si el dibujo está completo, no hacer nada
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
    });

    canvas.addEventListener('touchmove', function (event) {
        if (drawingCompleted) return; // Si el dibujo está completo, no hacer nada
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        drawMove(touch.clientX - rect.left, touch.clientY - rect.top);
    });

    canvas.addEventListener('touchend', function (event) {
        if (drawingCompleted) return; // Si el dibujo está completo, no hacer nada
        const touch = event.changedTouches[0];
        const rect = canvas.getBoundingClientRect();
        endDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
        airStartTime = new Date();
    });

    // BOTON SIGUIENTE LUEGO DE DIBUJAR TODAS LAS LINEAS PRIMER CANVAS
    function drawNextButton() {
        const nextButton = document.createElement('button');
        nextButton.id = 'endSequenceButton'; // Asignar el id para aplicar estilos CSS
        nextButton.style.display = 'inline-block';

        nextButton.addEventListener('click', () => {
            document.getElementById('instructionAudio1').pause();
            document.getElementById('instructions').style.display = 'none';
            canvas.style.display = 'none'; // Ocultar el canvas actual
            document.getElementById('partA').style.display = 'flex'; // Mostrar instrucciones para la Parte B
            // document.getElementById('continueButton').style.display = 'block'; // Mostrar botón de continuar
            nextButton.remove(); // Eliminar el botón "Siguiente" después de hacer clic
            startPartA();
        });

        document.body.appendChild(nextButton);
    }

    // SEGUNDO CANVAS

    function reiniciarTemporizador() {
        clearTimeout(temporizador);
        temporizador = setTimeout(arrowToRed, 150000); // Cambia después de 150 segundos
        // temporizador = setTimeout(testFinalizado, 3000); // Cambia después de 3 segundos
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

    });

    let inicio = null;
    function playBeep() {
        const beep = new Audio('sonidos/beep.wav'); // Asegúrate de tener un archivo beep.mp3
        beep.play();
        inicio = new Date();
        startRecording(canvasPartA);
        reiniciarTemporizador();
    }

    function startPartA() {
        // document.getElementById('partA').style.display = 'none';
        canvasPartA.style.display = 'block';
        ctxPartA.clearRect(0, 0, canvasPartA.width, canvasPartA.height); // Limpiar el lienzo
        circlesPartA.length = 0;
        currentCirclePartA = 1;
        lastCirclePartA = null;
        correctPathsPartA.length = 0;
        incorrectPathsPartA.length = 0;
        circleRadius = 30;

        // Coordenadas predefinidas de los círculos
        const circleCoordinatesPartA = [
            { x: 610, y: 800 },
            { x: 431, y: 937 },
            { x: 684, y: 981 },
            { x: 651, y: 590 },
            { x: 397, y: 626 },
            { x: 518, y: 717 },
            { x: 373, y: 811 },
            { x: 234, y: 979 },
            { x: 288, y: 1099 },
            { x: 351, y: 975 },

            { x: 567, y: 1137 },
            { x: 160, y: 1186 },
            { x: 230, y: 704 },
            { x: 134, y: 841 },
            { x: 142, y: 300 },
            { x: 232, y: 465 },
            { x: 465, y: 266 },
            { x: 439, y: 495 },
            { x: 697, y: 355 },
            { x: 549, y: 347 },

            { x: 774, y: 248 },
            { x: 764, y: 564 },
            { x: 791, y: 1160 },
            { x: 741, y: 766 },
            { x: 702, y: 1123 }
        ];

        // Dibujar círculos con las coordenadas predefinidas
        circleCoordinatesPartA.forEach((coord, index) => {
            const name = index === 0 ? "Empezar" : (index === circleCoordinatesPartA.length - 1 ? "Terminar" : "");
            drawCircle(ctxPartA, coord.x, coord.y, index + 1, circlesPartA, name, circleRadius);
        });
        // reiniciarTemporizador(); // Iniciar temporizador
        drawNextButtonA();

        // Iniciar grabación para el segundo canvas
        mediaRecorderCanvasPartA = startRecording(canvasPartA, recordedChunksCanvasPartA);
    }

    let drawingCompletedA = false; // Bandera para indicar si se completó el dibujo

    function startDrawingPartA(x, y) {
        circlesPartA.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance < circleRadius && circle.number === currentCirclePartA) {
                isDrawingPartA = true;
                lastCirclePartA = circle;
                ctxPartA.beginPath();
                ctxPartA.moveTo(circle.x, circle.y);
            }
        });
    }

    function drawMovePartA(x, y) {
        if (!isDrawingPartA) return;
        ctxPartA.lineTo(x, y);
        ctxPartA.stroke();

        let validDrop = false;

        circlesPartA.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance < circleRadius && circle.number != currentCirclePartA + 1 && lastCirclePartA.number != circle.number) {
                highlightCircle(ctxPartA, circle, 'red', x, y);
                erroresComision++;
                // drawInvalidLine(ctxPartA, circle.x, circle.y, circle.number);
                circlesToCorrectA.push({ x: circle.x, y: circle.y, number: circle.number });
                console.log(circlesToCorrectA);
                incorrectPathsPartA.push([{ x: lastCirclePartA.x, y: lastCirclePartA.y }, { x, y }]);
                isDrawingPartA = false;
            } else if (distance < circleRadius && circle.number === currentCirclePartA + 1) {
                highlightCircle(ctxPartA, circle, 'black', x, y); // Restablecer el borde correcto
                drawLineToCircleEdge(ctxPartA, lastCirclePartA.x, lastCirclePartA.y, circle.x, circle.y);
                correctPathsPartA.push([{ x: lastCirclePartA.x, y: lastCirclePartA.y }, { x: circle.x, y: circle.y }]);
                currentCirclePartA++;
                lastCirclePartA = circle;
                validDrop = true;
                correctLines++;
                if (circlesToCorrectA.length > 0) {
                    circlesToCorrectA.forEach(circle => {
                        console.log('Círculos a corregir:', circlesToCorrectA.number);
                        highlightCircle(ctxPartA, circle, 'black', x, y);
                    });
                    circlesToCorrectA = [];
                }
            }
        });

        if (currentCirclePartA === 25) {

            drawingCompletedA = true; // Establecer la bandera en true cuando se complete el dibujo
        }
    }

    function endDrawingPartA(x, y) {
        let validDrop = false;

        circlesPartA.forEach(circle => {
            const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
            if (distance < circleRadius && circle.number === currentCirclePartA + 1) {
                drawLineToCircleEdge(ctxPartA, lastCirclePartA.x, lastCirclePartA.y, circle.x, circle.y);
                highlightCircle(ctxPartA, circle, 'black', x, y); // Restablecer el borde correcto
                correctPathsPartA.push([{ x: lastCirclePartA.x, y: lastCirclePartA.y }, { x: circle.x, y: circle.y }]);
                currentCirclePartA++;
                lastCirclePartA = circle;
                validDrop = true;
            }
        });

        const distance = Math.sqrt((x - lastCirclePartA.x) ** 2 + (y - lastCirclePartA.y) ** 2);

        if (!validDrop && lastCirclePartA && distance > circleRadius) {
            incorrectPathsPartA.push([{ x: lastCirclePartA.x, y: lastCirclePartA.y }, { x, y }]);
        }

        if (currentCirclePartA === 25) {
            // drawNextButtonA();
            drawingCompletedA = true; // Establecer la bandera en true cuando se complete el dibujo
        }

        isDrawingPartA = false;
    }

    canvasPartA.addEventListener('mousedown', function (event) {
        if (drawingCompletedA) return; // Si el dibujo está completo, no hacer nada
        startDrawingPartA(event.offsetX, event.offsetY);
        if (airStartTime) {
            const airEndTime = new Date();
            const airTime = (airEndTime - airStartTime) / 1000; // Tiempo de lápiz en el aire en segundos
            penAirTime += airTime;
            airStartTime = null;
        }
    });

    canvasPartA.addEventListener('mousemove', function (event) {
        if (drawingCompletedA) return; // Si el dibujo está completo, no hacer nada
        drawMovePartA(event.offsetX, event.offsetY);
    });

    canvasPartA.addEventListener('mouseup', function (event) {
        if (drawingCompletedA) return; // Si el dibujo está completo, no hacer nada
        endDrawingPartA(event.offsetX, event.offsetY);
        liftPenCount++;
        airStartTime = new Date();
    });

    canvasPartA.addEventListener('touchstart', function (event) {
        if (drawingCompletedA) return; // Si el dibujo está completo, no hacer nada
        const touch = event.touches[0];
        const rect = canvasPartA.getBoundingClientRect();
        startDrawingPartA(touch.clientX - rect.left, touch.clientY - rect.top);
        if (airStartTime) {
            const airEndTime = new Date();
            const airTime = (airEndTime - airStartTime) / 1000; // Tiempo de lápiz en el aire en segundos
            penAirTime += airTime;
            airStartTime = null;
        }
    });

    canvasPartA.addEventListener('touchmove', function (event) {
        if (drawingCompletedA) return; // Si el dibujo está completo, no hacer nada
        const touch = event.touches[0];
        const rect = canvasPartA.getBoundingClientRect();
        drawMovePartA(touch.clientX - rect.left, touch.clientY - rect.top);
    });

    canvasPartA.addEventListener('touchend', function (event) {
        if (drawingCompletedA) return; // Si el dibujo está completo, no hacer nada
        const touch = event.changedTouches[0];
        const rect = canvasPartA.getBoundingClientRect();
        endDrawingPartA(touch.clientX - rect.left, touch.clientY - rect.top);
        liftPenCount++;
    });

    //BOTON SIGUIENTE LUEGO DE DIBUJAR TODAS LAS LINEAS SEGUNDO CANVAS
    function drawNextButtonA() {
        const nextButtonA = document.createElement('button');
        nextButtonA.id = 'endSequenceButton';
        nextButtonA.style.display = 'inline-block';

        nextButtonA.addEventListener('click', () => {
            document.getElementById('instructionAudio').pause();
            document.getElementById('partA').style.display = 'none';
            canvasPartA.style.display = 'none'; // Ocultar el canvas actual
            nextButtonA.remove(); // Eliminar el botón "Siguiente" después de hacer clic
            const fin = new Date();
            let executionTime = 0;
            if (inicio) {
                executionTime = (fin - inicio) / 1000; // Tiempo de ejecución de la tarea en segundos
            }
            const taskTime = (fin - begining) / 1000; // Tiempo total de la tarea en segundos
            console.log('Tiempo de ejecución de la tarea:', executionTime, 'segundos');
            // data.push([{ executionTime: executionTime}]);
            data.push({
                executionTime: executionTime,
                commissionErrors: erroresComision,
                correctLines: correctLines,
                liftPenCount: liftPenCount,
                penAirTime: penAirTime,
                taskTime: taskTime
            });
            showHandSelection();
        });

        document.body.appendChild(nextButtonA);
    }

    function testFinalizado() {
        const fechaActual = new Date();
        const options = { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' };
        const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
        const [day, month, year] = fechaHoraChilena.split('-');
        const fechaFormateada = `${day}_${month}_${year}`;

        // Detener las grabaciones
        mediaRecorderCanvas.stop();
        mediaRecorderCanvasPartA.stop();

        mediaRecorderCanvas.onstop = () => {
            const blob = new Blob(recordedChunksCanvas, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
        };

        mediaRecorderCanvasPartA.onstop = () => {
            const blob = new Blob(recordedChunksCanvasPartA, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
        };

        setTimeout(() => {
            const zip = new JSZip();
            zip.file("canvasRecording.webm", new Blob(recordedChunksCanvas, { type: 'video/webm' }));
            zip.file("canvasPartARecording.webm", new Blob(recordedChunksCanvasPartA, { type: 'video/webm' }));
            const csvContent = generateCSV(data);
            zip.file("test_result_TMT_part_A.csv", csvContent);


            // Capturas de pantalla
            canvas.toBlob(function (blob) {
                zip.file("canvasScreenshot.png", blob);

                canvasPartA.toBlob(function (blobPartA) {
                    zip.file("canvasPartAScreenshot.png", blobPartA);

                    zip.generateAsync({ type: 'blob' }).then(function (content) {
                        saveAs(content, `${participantID}_TMTPartA_${fechaFormateada}.zip`);
                    });
                });
            });

        }, 1000); // Ajustar tiempo si es necesario
        // Mostrar mensaje de finalización
        const instructions = document.getElementById('instructions');
        instructions.style.display = 'flex';
        instructions.style.justifyContent = 'center'; // Centrar contenido horizontalmente
        instructions.style.alignItems = 'center'; // Centrar contenido verticalmente
        instructions.style.height = '100vh'; // Altura del viewport para permitir el centrado vertical
        instructions.innerHTML = '¡Ha completado esta tarea con éxito! <br> ¡Muchas gracias!';
        instructions.style.textAlign = 'center';
        instructions.style.fontSize = '40px';
        instructions.style.marginTop = '0'; // Asegúrate de resetear el marginTop si ya no es necesario
    }

    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenEnabled && !document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('imagenes/minimize.png')"; // Cambiar la imagen del botón a 'minimize'
            document.documentElement.requestFullscreen();
        } else if (document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('imagenes/full-screen.png')"; // Cambiar la imagen del botón a 'full-screen'
            document.exitFullscreen();
        } else {
            console.log('El modo de pantalla completa no es soportado por tu navegador.');
        }
    });

    function generateCSV(data) {
        let csvContent = "Tiempo de ejecucion de la tarea (desde el beep a la flecha);Numero de errores de comision;Numero de lineas correctas;Numero de veces en que el participante levanto el lápiz de la pantalla;Tiempo de ejecucion de la tarea;Tiempo total de lápiz en el aire desde la primera respuesta en el canvas;Tiempo dedicado a la tarea(s); mano utilizada\n";

        data.forEach(row => {
            let linea = `${row.executionTime};${row.commissionErrors};${row.correctLines};${row.liftPenCount};${row.executionTime};${row.penAirTime};${row.taskTime};${selectedHand}\n`;
            csvContent += linea;
        });

        return new Blob([csvContent], { type: 'text/csv' });
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
        document.getElementById('preEnd').style.display = 'block';
        document.getElementById('fin').style.display = 'block';
        selectHandContainer.style.display = "block";
        enterIDContainer.style.display = "block";
    }

    handButton.addEventListener('click', confirmHandSelection);

    // Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
    // En este caso fue testFinalizado()

    document.getElementById('participantID').addEventListener('input', validateInputs);
    let participantID = 0;

    function validateInputs() {
        participantID = document.getElementById('participantID').value;
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

        if (participantID && selectedHand) {
            handButton.style.display = 'block';
        }
    }

    document.getElementById('handButton').addEventListener('click', confirmHandSelection);

    function confirmHandSelection() {
        selectHandContainer.style.display = "none";
        document.getElementById('preEnd').style.display = 'none';
        handButton.style.display = "none";
        testFinalizado();
    }

    // Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            validateInputs();
            selectedHand = e.target.value;
        });
    });
});
