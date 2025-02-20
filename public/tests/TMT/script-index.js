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
            { x: 450 - 70, y: 460 },
            { x: 570 - 70, y: 250 },
            { x: 740 - 70, y: 470 },
            { x: 600 - 70, y: 400 },
            { x: 630 - 70, y: 520 },
            { x: 260 - 70, y: 550 },
            { x: 240 - 70, y: 340 },
            { x: 400 - 70, y: 300 }
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
            console.log('distancia: '+distance);
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
    
                // Añadir el círculo a una lista de círculos incorrectos para mantener el color rojo
                if (!circlesToCorrect.some(c => c.number === circle.number)) {
                    circlesToCorrect.push({ x: circle.x, y: circle.y, number: circle.number });
                }
    
                isDrawing = false;
            } else if (distance < circleRadius && circle.number === currentCircle + 1) {
                highlightCircle(ctx, circle, 'black', x, y);
                correctPaths.push([{ x: lastCircle.x, y: lastCircle.y }, { x: circle.x, y: circle.y }]);
                currentCircle++;
                lastCircle = circle;
                validDrop = true;
                correctLines++;
    
                // Mantener círculos incorrectos en rojo
                if (circlesToCorrect.length > 0) {
                    circlesToCorrect.forEach(circle => {
                        highlightCircle(ctx, circle, 'red', x, y);
                    });
                }
            }
        });
    
        if (currentCircle === 8) {
            drawingCompleted = true;
        }
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


    // canvas.addEventListener('touchstart', function (event) {
    //     if (drawingCompleted) return;
    //     const touch = event.touches[0];
    //     const rect = canvas.getBoundingClientRect();
    //     startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
    //     const touchPos = getTouchPos(canvas, e);
    //         x = touchPos.x;
    //         y = touchPos.y;
            
    // });

    // canvas.addEventListener('touchmove', function (event) {
    //     if (drawingCompleted) return;
    //     const touch = event.touches[0];
    //     const rect = canvas.getBoundingClientRect();
    //     drawMove(touch.clientX - rect.left, touch.clientY - rect.top);
    // });

    // canvas.addEventListener('touchend', function (event) {
    //     if (drawingCompleted) return;
    //     const touch = event.changedTouches[0];
    //     const rect = canvas.getBoundingClientRect();
    //     endDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
    //     liftPenCount++;
    //     airStartTime = new Date();
    // });


    canvas.addEventListener('pointerdown', function (event) {
        if (drawingCompleted || event.pointerType !== 'pen') return; // Solo acepta lápiz.
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        startDrawing(event.clientX - rect.left, event.clientY - rect.top);
    });
    
    canvas.addEventListener('pointermove', function (event) {
        if (drawingCompleted || event.pointerType !== 'pen') return; // Solo acepta lápiz.
        if (event.pressure > 0) { // Asegúrate de que el lápiz esté presionando.
            event.preventDefault();
            const rect = canvas.getBoundingClientRect();
            drawMove(event.clientX - rect.left, event.clientY - rect.top);
        }
    });
    
    canvas.addEventListener('pointerup', function (event) {
        if (drawingCompleted || event.pointerType !== 'pen') return; // Solo acepta lápiz.
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        endDrawing(event.clientX - rect.left, event.clientY - rect.top);
        liftPenCount++;
        airStartTime = new Date();
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
    let isRecordingStarted = false;

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
            { x: 610, y: 700 },
            { x: 431, y: 837 },
            { x: 684, y: 881 },
            { x: 651, y: 490 },
            { x: 397, y: 526 },
            { x: 518, y: 617 },
            { x: 373, y: 711 },
            { x: 234, y: 879 },
            { x: 288, y: 999 },
            { x: 351, y: 875 },
            { x: 567, y: 1037 },
            { x: 160, y: 1086 },
            { x: 230, y: 604 },
            { x: 134, y: 741 },
            { x: 142, y: 200 },
            { x: 232, y: 365 },
            { x: 465, y: 166 },
            { x: 439, y: 395 },
            { x: 697, y: 255 },
            { x: 549, y: 247 },
            { x: 774, y: 148 },
            { x: 764, y: 464 },
            { x: 791, y: 1060 },
            { x: 741, y: 666 },
            { x: 702, y: 1023 }
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
            if (distance <= circleRadius && circle.number != currentCirclePartA + 1 && lastCirclePartA.number != circle.number) {
                highlightCircle(ctxPartA, circle, 'red', x, y);
                incorrectPathsPartA.push([{ x: lastCirclePartA.x, y: lastCirclePartA.y }, { x, y }]);
    
                // Añadir el círculo a una lista de círculos incorrectos para mantener el color rojo
                if (!circlesToCorrectA.some(c => c.number === circle.number)) {
                    circlesToCorrectA.push({ x: circle.x, y: circle.y, number: circle.number });
                }
    
                isDrawingPartA = false;
                erroresComision++;
            } else if (distance < circleRadius && circle.number === currentCirclePartA + 1) {
                highlightCircle(ctxPartA, circle, 'black', x, y);
                correctPathsPartA.push([{ x: lastCirclePartA.x, y: lastCirclePartA.y }, { x: circle.x, y: circle.y }]);
                currentCirclePartA++;
                lastCirclePartA = circle;
                validDrop = true;
                correctLines++;
    
                // Mantener círculos incorrectos en rojo
                if (circlesToCorrectA.length > 0) {
                    circlesToCorrectA.forEach(circle => {
                        highlightCircle(ctxPartA, circle, 'red', x, y);
                    });
                }
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

    //MOUSE TOUCH
    // canvasPartA.addEventListener('mousedown', function (event) {
    //     if (drawingCompletedA) return;
    //     startDrawingPartA(event.offsetX, event.offsetY);
    //     if (airStartTime) {
    //         console.log('empezo'+ airStartTime);
    //         let airEndTime = new Date();
    //         console.log('termino'+ airEndTime);
    //         let airTime = (airEndTime - airStartTime) / 1000;
    //         console.log('tiempo en el aire'+ airTime);
    //         penAirTime += airTime;
    //         airStartTime = null;
    //     }

    //     if (!isRecordingStarted) {
    //         mediaRecorderCanvasPartA = startRecording(canvasPartA, recordedChunksCanvasPartA);
    //         isRecordingStarted = true; // Actualiza la variable de control
    //         inicio = new Date();
    //         reiniciarTemporizador();
    //     }
    // });

    // canvasPartA.addEventListener('mousemove', function (event) {
    //     if (!isDrawingPartA || drawingCompletedA) return;
    //     drawMovePartA(event.offsetX, event.offsetY);
    // });

    // canvasPartA.addEventListener('mouseup', function (event) {
    //     if (drawingCompletedA) return;
    //     endDrawingPartA(event.offsetX, event.offsetY);
    //     liftPenCount++;
    //     airStartTime = new Date();
    // });

    // canvasPartA.addEventListener('touchstart', function (event) {
    //     if (drawingCompletedA) return;
    //     const touch = event.touches[0];
    //     const rect = canvasPartA.getBoundingClientRect();
    //     startDrawingPartA(touch.clientX - rect.left, touch.clientY - rect.top);
    //     if (airStartTime) {
    //         let airEndTime = new Date();
    //         let airTime = (airEndTime - airStartTime) / 1000;
    //         penAirTime += airTime;
    //         airStartTime = null;
    //     }

    //     if (!isRecordingStarted) {
    //         mediaRecorderCanvasPartA = startRecording(canvasPartA, recordedChunksCanvasPartA);
    //         isRecordingStarted = true; // Actualiza la variable de control
    //         inicio = new Date();
    //         reiniciarTemporizador();
    //     }
    // });

    // canvasPartA.addEventListener('touchmove', function (event) {
    //     if (drawingCompletedA) return;
    //     const touch = event.touches[0];
    //     const rect = canvasPartA.getBoundingClientRect();
    //     drawMovePartA(touch.clientX - rect.left, touch.clientY - rect.top);
    // });

    // canvasPartA.addEventListener('touchend', function (event) {
    //     if (drawingCompletedA) return;
    //     const touch = event.changedTouches[0];
    //     const rect = canvasPartA.getBoundingClientRect();
    //     endDrawingPartA(touch.clientX - rect.left, touch.clientY - rect.top);
    //     liftPenCount++;
    //     airStartTime = new Date();
    // });

    canvasPartA.addEventListener('pointerdown', function (event) {
        if (drawingCompletedA || event.pointerType !== 'pen') return; // Solo acepta lápiz.
        event.preventDefault();
        const rect = canvasPartA.getBoundingClientRect();
        startDrawingPartA(event.clientX - rect.left, event.clientY - rect.top);
    
        if (airStartTime) {
            let airEndTime = new Date();
            let airTime = (airEndTime - airStartTime) / 1000;
            penAirTime += airTime;
            airStartTime = null;
        }
    
        if (!isRecordingStarted) {
            mediaRecorderCanvasPartA = startRecording(canvasPartA, recordedChunksCanvasPartA);
            isRecordingStarted = true; // Actualiza la variable de control
            inicio = new Date();
            reiniciarTemporizador();
        }
    });
    
    canvasPartA.addEventListener('pointermove', function (event) {
        if (drawingCompletedA || event.pointerType !== 'pen') return; // Solo acepta lápiz.
        if (event.pressure > 0) { // Asegúrate de que el lápiz esté presionando.
            event.preventDefault();
            const rect = canvasPartA.getBoundingClientRect();
            drawMovePartA(event.clientX - rect.left, event.clientY - rect.top);
        }
    });
    
    canvasPartA.addEventListener('pointerup', function (event) {
        if (drawingCompletedA || event.pointerType !== 'pen') return; // Solo acepta lápiz.
        event.preventDefault();
        const rect = canvasPartA.getBoundingClientRect();
        endDrawingPartA(event.clientX - rect.left, event.clientY - rect.top);
        liftPenCount++;
        airStartTime = new Date();
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
                correctLines: correctLines,
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
        if(isRecordingStarted){
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
            let linea = `${row.executionTime};${row.commissionErrors};${row.correctLines};${row.liftPenCount};${row.penAirTime};${row.taskTime};${selectedHand};${inicialesExaminador}\n`;
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
