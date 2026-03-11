window.onload = function () {
    startPartB();
    begining = new Date();
};

const canvasPartB = document.getElementById('tmtCanvasPartB');
const ctxPartB = canvasPartB.getContext('2d');
const circlesPartB = [];
let currentCirclePartB = 1;
let isDrawingPartB = false;
let lastCirclePartB = null;
const correctPathsPartB = [];
const incorrectPathsPartB = [];
const incorrectPathsPartB2 = [];
let lastIncorrectCircleB2 = null;

let drawingCompletedB = false;

let circleRadius = 30;
const circlesToCorrectB = [];
const recordedChunksCanvasB = [];

let mediaRecorderCanvas;
let lastIncorrectCircle = null;
const data = [];
let erroresComision = 0;
let correctLines = 0;
let liftPenCount = 0;
let penAirTime = 0;
let airStartTime = null;

const show = document.getElementById('show');
const show1 = document.getElementById('show1');


show1.style.display = 'none';

const circleCoordinatesPartB = [
    { x: 398 - 70, y: 297 },
    { x: 530 - 70, y: 90 },
    { x: 650 - 70, y: 340 },
    { x: 550 - 70, y: 190 },
    { x: 520 - 70, y: 400 },
    { x: 200 - 70, y: 400 },
    { x: 180 - 70, y: 80 },
    { x: 360 - 70, y: 150 }
];

const firstCircleLabelB = "Empezar";
const lastCircleLabelB = "Terminar";

function drawCircleWithLabel(ctx, x, y, label, circlesArray, name = "", circleRadius, bold = false) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, circleRadius, 0, Math.PI * 2, true);
    ctx.fill();

    const circle = circlesArray.find(c => c.label === label);
    const isError = circle?.isError || false;

    ctx.lineWidth = isError ? 3 : 1;
    ctx.strokeStyle = isError ? 'red' : 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = (bold ? 'bold ' : '') + '36px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);

    if (name) {
        ctx.font = 'bold 18px Arial';
        ctx.fillText(name, x, y - circleRadius - 20);
    }

    if (!circlesArray.some(c => c.label === label)) {
        circlesArray.push({ x, y, label, isError });
    }
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

function startPartB() {
    canvasPartB.style.display = 'block';
    ctxPartB.clearRect(0, 0, canvasPartB.width, canvasPartB.height);
    ctxPartB.fillStyle = 'white'; // Fondo blanco
    ctxPartB.fillRect(0, 0, canvasPartB.width, canvasPartB.height);
    circlesPartB.length = 0;
    currentCirclePartB = 1;
    lastCirclePartB = null;
    correctPathsPartB.length = 0;
    incorrectPathsPartB.length = 0;
    drawingCompletedB = false;

    circleCoordinatesPartB.forEach((coord, index) => {
        const label = index % 2 === 0 ? (index / 2) + 1 : String.fromCharCode(65 + (index - 1) / 2);
        const name = index === 0 ? firstCircleLabelB : (index === circleCoordinatesPartB.length - 1 ? lastCircleLabelB : "");
        circlesPartB.push({ x: coord.x, y: coord.y, label, name });
        const isFirst = index === 0;
        drawCircleWithLabel(ctxPartB, coord.x, coord.y, label, [], name, circleRadius, isFirst);


    });
    drawNextButtonB();
}

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

function getNextLabel(currentLabel) {
    const isNumber = !isNaN(currentLabel);
    if (isNumber) {
        return String.fromCharCode(65 + (currentLabel - 1));
    } else {
        return parseInt(currentLabel.charCodeAt(0) - 64 + 1);
    }
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

let drawingCompleted = false;

function startDrawing(x, y) {
    circlesPartB.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);

        if (distance < circleRadius) {
            // Caso 1: empezar desde el círculo correcto
            if (circle.label === currentCirclePartB) {
                isDrawingPartB = true;
                lastCirclePartB = circle;
                ctxPartB.beginPath();
                const edgeStart = getEdgePoint(circle, { x, y }, circleRadius);
                ctxPartB.moveTo(edgeStart.x, edgeStart.y);
                currentPathPoints = [{ x: edgeStart.x, y: edgeStart.y }];
            }

            
            if (lastIncorrectCircle && circle.label === lastCirclePartB.label) {
                
                incorrectPathsPartB.pop();
                incorrectNodes.delete(lastIncorrectCircle.label);
                lastIncorrectCircle = null;

                
                ctxPartB.clearRect(0, 0, canvasPartB.width, canvasPartB.height);
                ctxPartB.fillStyle = 'white';
                ctxPartB.fillRect(0, 0, canvasPartB.width, canvasPartB.height);

               
                circlesPartB.forEach(c => {
                    const isCurrent = c.label === currentCirclePartB;
                    drawCircleWithLabel(ctxPartB, c.x, c.y, c.label, [], c.name || "", circleRadius, isCurrent);
                });

                // Redibuja los trazos correctos
                correctPathsPartB.forEach(path => {
                    ctxPartB.beginPath();
                    ctxPartB.moveTo(path[0].x, path[0].y);
                    for (let i = 1; i < path.length; i++) {
                        ctxPartB.lineTo(path[i].x, path[i].y);
                    }
                    ctxPartB.strokeStyle = 'black';
                    ctxPartB.lineWidth = 2;
                    ctxPartB.stroke();
                });

                // Redibuja los trazos incorrectos restantes
                incorrectPathsPartB.forEach(path => {
                    ctxPartB.beginPath();
                    ctxPartB.moveTo(path.points[0].x, path.points[0].y);
                    for (let i = 1; i < path.points.length; i++) {
                        ctxPartB.lineTo(path.points[i].x, path.points[i].y);
                    }
                    ctxPartB.strokeStyle = 'red';
                    ctxPartB.lineWidth = 2;
                    ctxPartB.stroke();
                });
            }
        }
    });
}


const incorrectNodes = new Set(); // Guarda nodos que fueron marcados como error
let currentPathPoints = [];
const correctNodesPartB = new Set();

function drawMove(x, y) {
    if (!isDrawingPartB) return;

    ctxPartB.lineTo(x, y);
    ctxPartB.stroke();
    currentPathPoints.push({ x, y });

    circlesPartB.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        const expectedLabel = getNextLabel(currentCirclePartB);

        if (distance < circleRadius) {
            if (circle.label !== expectedLabel && circle.label !== lastCirclePartB.label) {
                highlightCircle(ctxPartB, circle, 'red', x, y);
                incorrectNodes.add(circle.label);
                incorrectPathsPartB.push({
                    from: lastCirclePartB.label,
                    to: circle.label,
                    points: [...currentPathPoints]
                });
                lastIncorrectCircle = circle;
                isDrawingPartB = false;
            } else if (circle.label === expectedLabel) {

                correctPathsPartB.push([...currentPathPoints]);

                currentCirclePartB = getNextLabel(currentCirclePartB);
                lastCirclePartB = circle;

                ctxPartB.clearRect(0, 0, canvasPartB.width, canvasPartB.height);
                ctxPartB.fillStyle = 'white';
                ctxPartB.fillRect(0, 0, canvasPartB.width, canvasPartB.height);

                circlesPartB.forEach(c => {
                    const isCurrent = c.label === currentCirclePartB;
                    drawCircleWithLabel(ctxPartB, c.x, c.y, c.label, [], c.name || "", circleRadius, isCurrent);
                });


                correctPathsPartB.forEach(path => {
                    ctxPartB.beginPath();
                    ctxPartB.moveTo(path[0].x, path[0].y);
                    for (let i = 1; i < path.length; i++) {
                        ctxPartB.lineTo(path[i].x, path[i].y);
                    }
                    ctxPartB.strokeStyle = 'black';
                    ctxPartB.lineWidth = 2;
                    ctxPartB.stroke();
                });

                redrawCircle(ctxPartB, circle);

                currentPathPoints = [];
                incorrectPathsPartB.length = 0;
                incorrectNodes.clear();
            }
        }
    });
}


function endDrawing(x, y) {
    let validDrop = false;

    circlesPartB.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);

        if (distance < circleRadius && circle.label === getNextLabel(currentCirclePartB)) {
            if (incorrectNodes.has(circle.label)) {
                // Si el nodo antes tenía error, sigue rojo
                highlightCircle(ctxPartB, circle, 'red', x, y);
            } else {
                highlightCircle(ctxPartB, circle, 'black', x, y);
            }

            correctPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x: circle.x, y: circle.y }]);
            currentCirclePartB = getNextLabel(currentCirclePartB);
            lastCirclePartB = circle;
            validDrop = true;
        }
    });

    if (!validDrop) {
        incorrectPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x, y }]);
        incorrectNodes.add(currentCirclePartB); // Guarda que este nodo tuvo un error
    }

    if (typeof currentCirclePartB === 'string' && currentCirclePartB === 'D') {
        drawingCompletedB = true;
    }

    isDrawingPartB = false;
}
function getEdgePoint(from, to, radius) {
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    return {
        x: from.x + radius * Math.cos(angle),
        y: from.y + radius * Math.sin(angle)
    };
}


function redrawCircle(ctx, circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circleRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(circle.label, circle.x, circle.y);
}


function getTouchPosRotatedPartB(canvas, touchEvent) {
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

// Evento touchstart (inicia el dibujo)
canvasPartB.addEventListener('touchstart', function (event) {
    event.preventDefault();
    const { x, y } = getTouchPosRotatedPartB(canvasPartB, event);
    startDrawing(x, y);
});

// Evento touchmove (dibuja mientras se mueve el dedo)
canvasPartB.addEventListener('touchmove', function (event) {
    if (event.touches.length > 0) {
        event.preventDefault();
        const { x, y } = getTouchPosRotatedPartB(canvasPartB, event);
        drawMove(x, y);
    }
});

// Evento touchend (finaliza el trazo)
canvasPartB.addEventListener('touchend', function (event) {
    event.preventDefault();
    const { x, y } = getTouchPosRotatedPartB(canvasPartB, event);
    endDrawing(x, y);
});



function drawInvalidLine(ctx, startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = 'black';
}

function drawNextButtonB() {
    const nextButtonB = document.createElement('button');
    nextButtonB.id = 'endSequenceButton';
    nextButtonB.style.display = 'inline-block';

    nextButtonB.addEventListener('click', () => {
        document.getElementById('instructionAudio1').pause();
        document.getElementById('instructionAudio1').style.display = 'none';
        document.getElementById('fullscreenButton').style.display = 'none';
        document.getElementById('partB').style.display = 'none';
        canvasPartB.style.display = 'none';
        show.style.display = 'none';
        show1.style.display = 'block';
        document.getElementById('partB2').style.display = 'flex';
        startPartB2();
        nextButtonB.remove();
    });

    document.body.appendChild(nextButtonB);
}

const canvasPartB2 = document.getElementById('tmtCanvasPartB2');
const ctxPartB2 = canvasPartB2.getContext('2d');
const circlesPartB2 = [];
let currentCirclePartB2 = 1;
let isDrawingPartB2 = false;
let lastCirclePartB2 = null;
const correctPathsPartB2 = [];
let drawingCompletedB2 = false;
let temporizador = null;
let currentPathPointsPartB2 = [];


const circlesToCorrectB2 = [];

const recordedChunksCanvasPartB2 = [];
let mediaRecorderCanvasPartB2;

const circleCoordinatesPartB2 = [
    { x: 422, y: 480 },
    { x: 590, y: 750 },
    { x: 251, y: 853 },
    { x: 364, y: 216 },
    { x: 383, y: 364 },
    { x: 560, y: 597 },
    { x: 461, y: 185 },
    { x: 667, y: 147 },
    { x: 664, y: 509 },
    { x: 690, y: 909 },
    { x: 380, y: 862 },
    { x: 180, y: 941 },
    { x: 269, y: 474 },
    { x: 180, y: 678 },
    { x: 146, y: 201 },
    { x: 180, y: 560 },
    { x: 265, y: 149 },
    { x: 546, y: 139 },
    { x: 763, y: 86 },
    { x: 705, y: 761 },
    { x: 756, y: 980 },
    { x: 94, y: 993 },
    { x: 101, y: 648 },
    { x: 143, y: 874 },
    { x: 101, y: 97 }
];

const firstCircleLabelB2 = "Empezar";
const lastCircleLabelB2 = "Terminar";



function reiniciarTemporizador() {
    clearTimeout(temporizador);
    temporizador = setTimeout(arrowToRed, 300000);
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
        mediaRecorderCanvasPartB2 = startRecording(canvasPartB2, recordedChunksCanvasPartB2);
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

function startPartB2() {
    circleRadius = 30;
    canvasPartB2.style.display = 'block';
    ctxPartB2.clearRect(0, 0, canvasPartB2.width, canvasPartB2.height);
    ctxPartB2.fillStyle = 'white'; // Fondo blanco
    ctxPartB2.fillRect(0, 0, canvasPartB2.width, canvasPartB2.height);
    circlesPartB2.length = 0;
    currentCirclePartB2 = 1;
    lastCirclePartB2 = null;
    correctPathsPartB2.length = 0;
    incorrectPathsPartB2.length = 0;
    drawingCompletedB2 = false;

    circleCoordinatesPartB2.forEach((coord, index) => {
        const label = index % 2 === 0 ? (index / 2) + 1 : String.fromCharCode(65 + (index - 1) / 2);
        const name = index === 0 ? firstCircleLabelB2 : (index === circleCoordinatesPartB2.length - 1 ? lastCircleLabelB2 : "");
        drawCircleWithLabel(ctxPartB2, coord.x, coord.y, label, circlesPartB2, name, 30);
    });
    drawNextButtonB2();
}

function startDrawingPartB2(x, y) {
    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < circleRadius) {
            // Caso normal: comenzar trazo desde el círculo correcto
            if (circle.label === currentCirclePartB2) {
                isDrawingPartB2 = true;
                lastCirclePartB2 = circle;
                ctxPartB2.beginPath();
                ctxPartB2.moveTo(circle.x, circle.y);
                currentPathPointsPartB2 = [{ x: circle.x, y: circle.y }];
            }

            // Caso de corrección: volver al círculo anterior después de un error
            if (lastIncorrectCircleB2 && circle.label === lastCirclePartB2.label) {

                for (let i = incorrectPathsPartB2.length - 1; i >= 0; i--) {
                    if (incorrectPathsPartB2[i].to === lastIncorrectCircleB2.label) {
                        incorrectPathsPartB2.splice(i, 1);
                    }
                }

                incorrectNodesPartB2.delete(lastIncorrectCircleB2.label);
                lastIncorrectCircleB2 = null;

                ctxPartB2.clearRect(0, 0, canvasPartB2.width, canvasPartB2.height);
                ctxPartB2.fillStyle = 'white';
                ctxPartB2.fillRect(0, 0, canvasPartB2.width, canvasPartB2.height);

                circlesPartB2.forEach(c => {
                    const isCurrent = c.label === currentCirclePartB2;
                    drawCircleWithLabel(ctxPartB2, c.x, c.y, c.label, [], c.name || "", circleRadius, isCurrent);
                });

                correctPathsPartB2.forEach(path => {
                    ctxPartB2.beginPath();
                    ctxPartB2.moveTo(path[0].x, path[0].y);
                    for (let i = 1; i < path.length; i++) {
                        ctxPartB2.lineTo(path[i].x, path[i].y);
                    }
                    ctxPartB2.strokeStyle = 'black';
                    ctxPartB2.lineWidth = 2;
                    ctxPartB2.stroke();
                });

                incorrectPathsPartB2.forEach(path => {
                    if (!path.points || path.points.length === 0) return;
                    ctxPartB2.beginPath();
                    ctxPartB2.moveTo(path.points[0].x, path.points[0].y);
                    for (let i = 1; i < path.points.length; i++) {
                        ctxPartB2.lineTo(path.points[i].x, path.points[i].y);
                    }
                    ctxPartB2.strokeStyle = 'red';
                    ctxPartB2.lineWidth = 2;
                    ctxPartB2.stroke();
                });
            }
        }

    });
}

const incorrectNodesPartB2 = new Set();

function drawMovePartB2(x, y) {
    if (!isDrawingPartB2) return;
    ctxPartB2.lineTo(x, y);
    ctxPartB2.stroke();
    currentPathPointsPartB2.push({ x, y });

    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        const expectedLabel = getNextLabel(currentCirclePartB2);

        if (distance < circleRadius) {
            if (circle.label !== expectedLabel && circle.label !== lastCirclePartB2?.label) {
                highlightCircle(ctxPartB2, circle, 'red', x, y);
                incorrectNodesPartB2.add(circle.label);
            
                let originalCircle = circlesPartB2.find(c => c.label === circle.label);
                if (originalCircle) originalCircle.isError = true;
            
                // ⚠️ Prevención del bug: asegúrate de que `lastCirclePartB2` está definido
                if (lastCirclePartB2) {
                    incorrectPathsPartB2.push({
                        from: lastCirclePartB2.label,
                        to: circle.label,
                        points: [...currentPathPointsPartB2]
                    });
                }
            
                lastIncorrectCircleB2 = circle;
                isDrawingPartB2 = false;
                setTimeout(() => {
                   
                }, 150); 
        } else if (circle.label === expectedLabel) {
            correctPathsPartB2.push([...currentPathPointsPartB2]);
            correctLines++;
            currentCirclePartB2 = getNextLabel(currentCirclePartB2);
            lastCirclePartB2 = circle;

            currentPathPointsPartB2 = [];


            circlesPartB2.forEach(c => {
                const isCurrent = c.label === currentCirclePartB2;
                drawCircleWithLabel(ctxPartB2, c.x, c.y, c.label, [], c.name || "", circleRadius, isCurrent);
            });


            redrawCircle(ctxPartB2, circle);

            // Redibuja los trazos correctos como se hicieron
            correctPathsPartB2.forEach(path => {
                ctxPartB2.beginPath();
                ctxPartB2.moveTo(path[0].x, path[0].y);
                for (let i = 1; i < path.length; i++) {
                    ctxPartB2.lineTo(path[i].x, path[i].y);
                }
                ctxPartB2.strokeStyle = 'black';
                ctxPartB2.lineWidth = 2;
                ctxPartB2.stroke();
            });

            incorrectNodesPartB2.clear();
        }
    }
    });

if (typeof currentCirclePartB2 === 'string' && currentCirclePartB2 === '13') {
    drawingCompletedB2 = true;
}

}

function endDrawingPartB2(x, y) {
    let validDrop = false;

    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);

        if (distance < circleRadius && circle.label === getNextLabel(currentCirclePartB2)) {
            if (incorrectNodesPartB2.has(circle.label)) {
                // Si el nodo fue erróneo antes, sigue en rojo
                highlightCircle(ctxPartB2, circle, 'red', x, y);
            } else {
                highlightCircle(ctxPartB2, circle, 'black', x, y);
            }

            correctPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x: circle.x, y: circle.y }]);
            correctLines++;
            currentCirclePartB2 = getNextLabel(currentCirclePartB2);
            lastCirclePartB2 = circle;
            validDrop = true;
        }
    });

    if (!validDrop) {
        const distance = Math.sqrt((x - lastCirclePartB2.x) ** 2 + (y - lastCirclePartB2.y) ** 2);
        if (distance > circleRadius) {
            incorrectPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x, y }]);
            incorrectNodesPartB2.add(currentCirclePartB2); // Guardar que este nodo tuvo un error
            erroresComision++;
        }
    }

    isDrawingPartB2 = false;
}


function getTouchPosRotatedPartB2(canvas, touchEvent) {
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

// Evento touchstart (inicia el dibujo)
canvasPartB2.addEventListener('touchstart', function (event) {
    event.preventDefault();
    const { x, y } = getTouchPosRotatedPartB2(canvasPartB2, event);
    startDrawingPartB2(x, y);

    if (airStartTime && !drawingCompletedB2) {
        const airEndTime = new Date();
        const airTime = (airEndTime - airStartTime) / 1000;
        penAirTime += airTime;
        console.log(`Tiempo en el aire: ${airTime.toFixed(3)}s | Total acumulado: ${penAirTime.toFixed(3)}s`);
        airStartTime = null;
    }



    if (!isRecordingStarted) {
        mediaRecorderCanvasPartB2 = startRecording(canvasPartB2, recordedChunksCanvasPartB2);
        isRecordingStarted = true; // Actualiza la variable de control.
        inicio = new Date();
        reiniciarTemporizador();
    }
});

// Evento touchmove (dibuja mientras se mueve el dedo)
canvasPartB2.addEventListener('touchmove', function (event) {
    if (event.touches.length > 0) {
        event.preventDefault();
        const { x, y } = getTouchPosRotatedPartB2(canvasPartB2, event);
        drawMovePartB2(x, y);
    }
});

// Evento touchend (finaliza el trazo)
canvasPartB2.addEventListener('touchend', function (event) {
    event.preventDefault();
    const { x, y } = getTouchPosRotatedPartB2(canvasPartB2, event);
    endDrawingPartB2(x, y);

    if (drawingCompletedB2) {
        console.log("Test finalizado. No se cuenta levantamiento de lápiz.");
        return;
    }

    airStartTime = new Date();
    liftPenCount++;
    console.log(`Lápiz levantado. Total lifts: ${liftPenCount} - Hora: ${airStartTime.toLocaleTimeString()}`);
});

function drawNextButtonB2() {
    const nextButtonB2 = document.createElement('button');
    nextButtonB2.id = 'endSequenceButton';
    nextButtonB2.style.display = 'inline-block';

    nextButtonB2.addEventListener('click', () => {
        clearTimeout(temporizador); // Detiene el temporizador para que la flecha no se ponga roja en la pantalla final
        document.getElementById('instructionAudio').pause();
        document.getElementById('partB2').style.display = 'none';
        canvasPartB2.style.display = 'none';
        nextButtonB2.remove();
        const fin = new Date();
        let executionTime = 0;
        if (inicio) {
            executionTime = (fin - inicio) / 1000; // Tiempo de ejecución de la tarea
        }
        const taskTime = (fin - begining) / 1000; // Tiempo total dedicado a la tarea
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

    document.body.appendChild(nextButtonB2);
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Obtener el id_participante de la URL
const idParticipante = getQueryParam('id_participante');

function downloadCanvasImage(canvas, fileName) {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = fileName;
    link.click();
}

function downloadAllCanvasImages() {
    downloadCanvasImage(canvasPartB, 'canvasPartB.png');
    downloadCanvasImage(canvasPartB2, 'canvasPartB2.png');
}

function showDownloadButton() {
    const downloadButton = document.createElement('button');

    downloadButton.addEventListener('click', function () {
        downloadAllCanvasImages();
        document.body.removeChild(downloadButton);
    });

    document.body.appendChild(downloadButton);
    downloadButton.click();
}

function testFinalizado() {
    const fechaActual = new Date();
    const options = { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' };
    const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
    const [day, month, year] = fechaHoraChilena.split('-');
    const fechaFormateada = `${day}_${month}_${year}`;

    if (isRecordingStarted) {
        mediaRecorderCanvasPartB2.stop();

        mediaRecorderCanvasPartB2.onstop = () => {
            const blob = new Blob(recordedChunksCanvasPartB2, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
        };
    }

    setTimeout(() => {
        const zip = new JSZip();
        zip.file("2_TMT_Part_B_Canvas_Recording.webm", new Blob(recordedChunksCanvasPartB2, { type: 'video/webm' }));
        const csvContent = generateCSV(data);
        zip.file("2_TMT_Part_B.csv", csvContent);

        canvasPartB.toBlob(function (blob) {
            // zip.file("canvasBScreenshot.png", blob);

            canvasPartB2.toBlob(function (blobPartB2) {
                zip.file("2_TMT_Part_B_Canvas_Screenshot.png", blobPartB2);

                zip.generateAsync({ type: 'blob' }).then(function (content) {
                    saveAs(content, `${idParticipante}_2_TMT_Part_B_${fechaFormateada}.zip`);

                    // Cerrar la ventana después de que se haya descargado el ZIP
                    setTimeout(() => {
                        window.close();
                    }, 3000); // Ajusta el tiempo de espera según sea necesario
                });
            });
        });

        const instructions = document.getElementById('instructions');
        instructions.style.display = 'flex';
        instructions.style.rotate = '-90deg';
        instructions.style.justifyContent = 'center';
        instructions.style.alignItems = 'center';
        instructions.style.height = '100vh';
        instructions.innerHTML = '¡Ha completado esta tarea con éxito! <br> ¡Muchas gracias!';
        instructions.style.textAlign = 'center';
        instructions.style.fontSize = '40px';
        instructions.style.marginTop = '0';
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
    // Asegúrate de que userInfo esté disponible
    if (!userInfo || !userInfo.name || !userInfo.last_name) {
        console.error("Error: userInfo no está definido correctamente.");
        return; // Salir si userInfo no está disponible
    }

    // Obtener las iniciales del examinador
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

document.getElementById('handButton').addEventListener('click', confirmHandSelection);

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

// Timer para cambiar a ojo rojo
let show1Timer = null;

// Botón #show ya no controla flecha (pero si quieres que siga funcionando, déjalo activado)
document.getElementById('show').addEventListener('click', () => {
    const arrow = document.getElementById('endSequenceButton');
    if (arrow) {
        arrow.style.display = (arrow.style.display === 'none' || arrow.style.display === '') ? 'inline-block' : 'none';
    }
});
document.getElementById('show1').addEventListener('click', () => {
    const arrow = document.getElementById('endSequenceButton');
    if (arrow) {
        arrow.style.display = (arrow.style.display === 'none' || arrow.style.display === '') ? 'inline-block' : 'none';
    }
});

instructionAudio.addEventListener('ended', () => {
    console.log("Audio terminado. Inicia conteo de 5 minutos para cambiar ojo.");

    // Restablece imagen a normal
    show1.style.backgroundImage = "url('imagenes/eye.png')";

    // Limpia cualquier temporizador previo
    clearTimeout(show1Timer);

    // Inicia temporizador para cambiar a rojo
    show1Timer = setTimeout(() => {
        show1.style.backgroundImage = "url('imagenes/eye-red.png')";
        console.log("Ojo cambiado a rojo después de 5 minutos.");
    }, 30000); // 5 minutos
});
