window.onload = function () {
    startPartB();
    begining = new Date();
    mediaRecorderCanvas = startRecording(canvasPartB, recordedChunksCanvasB);
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
let drawingCompletedB = false;

let circleRadius = 50;
const circlesToCorrectB = [];
const recordedChunksCanvasB = [];

let mediaRecorderCanvas;

const data = [];
let erroresComision = 0;
let correctLines = 0;
let liftPenCount = 0;
let penAirTime = 0;
let airStartTime = null;

const circleCoordinatesPartB = [
    { x: 498, y: 497 },
    { x: 653, y: 237 },
    { x: 847, y: 494 },
    { x: 671, y: 364 },
    { x: 670, y: 619 },
    { x: 272, y: 621 },
    { x: 209, y: 253 },
    { x: 433, y: 335 }
];

const firstCircleLabelB = "Empezar";
const lastCircleLabelB = "Terminar";

function drawCircleWithLabel(ctx, x, y, label, circlesArray, name = "", circleRadius) {
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
    ctx.fillText(label, x, y);

    if (name) {
        ctx.font = 'bold 19px Arial';
        ctx.fillText(name, x, y - circleRadius - 20);
    }

    circlesArray.push({ x, y, label });
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
        drawCircleWithLabel(ctxPartB, coord.x, coord.y, label, circlesPartB, name, 50);
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
        if (distance < 50 && circle.label === currentCirclePartB) {
            isDrawingPartB = true;
            lastCirclePartB = circle;
            ctxPartB.beginPath();
            ctxPartB.moveTo(circle.x, circle.y);
        }
    });
}

function drawMove(x, y) {
    if (!isDrawingPartB) return;
    ctxPartB.lineTo(x, y);
    ctxPartB.stroke();

    let validDrop = false;

    circlesPartB.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < 50 && circle.label != getNextLabel(currentCirclePartB) && circle.label != lastCirclePartB.label) {
            highlightCircle(ctxPartB, circle, 'red', x, y);
            incorrectPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x, y }]);
            circlesToCorrectB.push({ x: circle.x, y: circle.y, number: circle.number });
            isDrawingPartB = false;
        } else if (distance < 50 && circle.label === getNextLabel(currentCirclePartB)) {
            highlightCircle(ctxPartB, circle, 'black', x, y);
            correctPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x: circle.x, y: circle.y }]);
            currentCirclePartB = getNextLabel(currentCirclePartB);
            lastCirclePartB = circle;
            validDrop = true;

            if (circlesToCorrectB.length > 0) {
                circlesToCorrectB.forEach(circle => {
                    highlightCircle(ctxPartB, circle, 'black', x, y);
                });
                circlesToCorrectB.length = 0;
            }
        }
    });

    if (typeof currentCirclePartB === 'string' && currentCirclePartB === 'D') {
        drawingCompletedB = true;
    }
}

function endDrawing(x, y) {
    let validDrop = false;

    circlesPartB.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < 50 && circle.label === getNextLabel(currentCirclePartB)) {
            highlightCircle(ctxPartB, circle, 'black', x, y);
            correctPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x: circle.x, y: circle.y }]);
            currentCirclePartB = getNextLabel(currentCirclePartB);
            lastCirclePartB = circle;
            validDrop = true;
        }
    });

    const distance = Math.sqrt((x - lastCirclePartB.x) ** 2 + (y - lastCirclePartB.y) ** 2);

    if (!validDrop && lastCirclePartB && distance > circleRadius) {
        incorrectPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x, y }]);
    }

    if (typeof currentCirclePartB === 'string' && currentCirclePartB === 'D') {
        drawingCompletedB = true;
    }

    isDrawingPartB = false;
}

canvasPartB.addEventListener('mousedown', function (event) {
    if (drawingCompletedB) return;
    startDrawing(event.offsetX, event.offsetY);
});

canvasPartB.addEventListener('mousemove', function (event) {
    if (drawingCompletedB) return;
    drawMove(event.offsetX, event.offsetY);
});

canvasPartB.addEventListener('mouseup', function (event) {
    if (drawingCompletedB) return;
    endDrawing(event.offsetX, event.offsetY);
});

canvasPartB.addEventListener('touchstart', function (event) {
    if (drawingCompletedB) return;
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvasPartB.addEventListener('touchmove', function (event) {
    if (drawingCompletedB) return;
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    drawMove(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvasPartB.addEventListener('touchend', function (event) {
    if (drawingCompletedB) return;
    const touch = event.changedTouches[0];
    const rect = canvas.getBoundingClientRect();
    endDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
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
        canvasPartB.style.display = 'none';
        document.getElementById('partB').style.display = 'none';
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

const circlesToCorrectB2 = [];

const recordedChunksCanvasPartB2 = [];
let mediaRecorderCanvasPartB2;

const circleCoordinatesPartB2 = [
    { x: 452, y: 580 },
    { x: 619, y: 850 },
    { x: 281, y: 953 },
    { x: 394, y: 316 },
    { x: 413, y: 464 },
    { x: 590, y: 697 },
    { x: 491, y: 285 },
    { x: 697, y: 247 },
    { x: 694, y: 609 },
    { x: 724, y: 1009 },
    { x: 404, y: 962 },
    { x: 213, y: 1041 },
    { x: 299, y: 574 },
    { x: 210, y: 778 },
    { x: 176, y: 301 },
    { x: 209, y: 660 },
    { x: 295, y: 249 },
    { x: 576, y: 239 },
    { x: 793, y: 186 },
    { x: 735, y: 861 },
    { x: 786, y: 1080 },
    { x: 124, y: 1093 },
    { x: 131, y: 748 },
    { x: 173, y: 974 },
    { x: 141, y: 197 }
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

instructionAudio.addEventListener('ended', function () {
    playBeep();
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
    mediaRecorderCanvasPartB2 = startRecording(canvasPartB2, recordedChunksCanvasPartB2);
    drawNextButtonB2();
}

function startDrawingPartB2(x, y) {
    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < circleRadius && circle.label === currentCirclePartB2) {
            isDrawingPartB2 = true;
            lastCirclePartB2 = circle;
            ctxPartB2.beginPath();
            ctxPartB2.moveTo(circle.x, circle.y);
        }
    });
}

function drawMovePartB2(x, y) {
    if (!isDrawingPartB2) return;
    ctxPartB2.lineTo(x, y);
    ctxPartB2.stroke();

    let validDrop = false;

    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < circleRadius && circle.label != getNextLabel(currentCirclePartB2) && circle.label != lastCirclePartB2.label) {
            highlightCircle(ctxPartB2, circle, 'red', x, y);
            erroresComision++;
            circlesToCorrectB2.push({ x: circle.x, y: circle.y, number: circle.number });
            incorrectPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x, y }]);
            isDrawingPartB2 = false;
        } else if (distance < circleRadius && circle.label === getNextLabel(currentCirclePartB2)) {
            highlightCircle(ctxPartB2, circle, 'black', x, y);
            correctPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x: circle.x, y: circle.y }]);
            currentCirclePartB2 = getNextLabel(currentCirclePartB2);
            lastCirclePartB2 = circle;
            validDrop = true;
            correctLines++;

            if (circlesToCorrectB2.length > 0) {
                circlesToCorrectB2.forEach(circle => {
                    highlightCircle(ctxPartB2, circle, 'black', x, y);
                });
                circlesToCorrectB2.length = 0;
            }
        }
    });

    if (currentCirclePartB2 === 13) {
        drawingCompletedB2 = true;
    }
}

function endDrawingPartB2(x, y) {
    let validDrop = false;

    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < circleRadius && circle.label === getNextLabel(currentCirclePartB2)) {
            highlightCircle(ctxPartB2, circle, 'black', x, y);
            correctPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x: circle.x, y: circle.y }]);
            currentCirclePartB2 = getNextLabel(currentCirclePartB2);
            lastCirclePartB2 = circle;
            validDrop = true;
        }
    });

    const distance = Math.sqrt((x - lastCirclePartB2.x) ** 2 + (y - lastCirclePartB2.y) ** 2);

    if (!validDrop && lastCirclePartB2 && distance > circleRadius) {
        incorrectPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x, y }]);
    }

    if (currentCirclePartB2 === 13) {
        drawingCompletedB2 = true;
    }

    isDrawingPartB2 = false;
}

canvasPartB2.addEventListener('mousedown', function (event) {
    if (isDrawingPartB2) return;
    startDrawingPartB2(event.offsetX, event.offsetY);
    if (airStartTime) {
        const airEndTime = new Date();
        const airTime = (airEndTime - airStartTime) / 1000;
        penAirTime += airTime;
        airStartTime = null;
    }
});

canvasPartB2.addEventListener('mousemove', function (event) {
    if (drawingCompletedB2) return;
    drawMovePartB2(event.offsetX, event.offsetY);
});

canvasPartB2.addEventListener('mouseup', function (event) {
    if (drawingCompletedB2) return;
    endDrawingPartB2(event.offsetX, event.offsetY);
    liftPenCount++;
    airStartTime = new Date();
});

canvasPartB2.addEventListener('touchstart', function (event) {
    if (drawingCompletedB2) return;
    const touch = event.touches[0];
    const rect = canvasPartB2.getBoundingClientRect();
    startDrawingPartB2(touch.clientX - rect.left, touch.clientY - rect.top);
    if (airStartTime) {
        const airEndTime = new Date();
        const airTime = (airEndTime - airStartTime) / 1000;
        penAirTime += airTime;
        airStartTime = null;
    }
});

canvasPartB2.addEventListener('touchmove', function (event) {
    if (drawingCompletedB2) return;
    const touch = event.touches[0];
    const rect = canvasPartB2.getBoundingClientRect();
    drawMovePartB2(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvasPartB2.addEventListener('touchend', function (event) {
    if (drawingCompletedB2) return;
    const touch = event.changedTouches[0];
    const rect = canvasPartB2.getBoundingClientRect();
    endDrawingPartB2(touch.clientX - rect.left, touch.clientY - rect.top);
    liftPenCount++;
    airStartTime = new Date();
});

function drawNextButtonB2() {
    const nextButtonB2 = document.createElement('button');
    nextButtonB2.id = 'endSequenceButton';
    nextButtonB2.style.display = 'inline-block';

    nextButtonB2.addEventListener('click', () => {
        document.getElementById('instructionAudio').pause();
        document.getElementById('partB2').style.display = 'none';
        canvasPartB2.style.display = 'none';
        nextButtonB2.remove();
        const fin = new Date();
        let executionTime = 0;
        if (inicio) {
            executionTime = (fin - inicio); // Tiempo de ejecución de la tarea
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
    });

    document.body.appendChild(nextButtonB2);
}

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

    mediaRecorderCanvas.stop();
    mediaRecorderCanvasPartB2.stop();

    mediaRecorderCanvas.onstop = () => {
        const blob = new Blob(recordedChunksCanvasB, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
    };

    mediaRecorderCanvasPartB2.onstop = () => {
        const blob = new Blob(recordedChunksCanvasPartB2, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
    };

    setTimeout(() => {
        const zip = new JSZip();
        zip.file("canvasBRecording.webm", new Blob(recordedChunksCanvasB, { type: 'video/webm' }));
        zip.file("canvasPartB2Recording.webm", new Blob(recordedChunksCanvasPartB2, { type: 'video/webm' }));
        const csvContent = generateCSV(data);
        zip.file("test_result_TMT_part_B.csv", csvContent);

        canvasPartB.toBlob(function (blob) {
            zip.file("canvasBScreenshot.png", blob);

            canvasPartB2.toBlob(function (blobPartB2) {
                zip.file("canvasPartB2Screenshot.png", blobPartB2);

                zip.generateAsync({ type: 'blob' }).then(function (content) {
                    saveAs(content, `${participantID}_TMTPartB_${fechaFormateada}.zip`);
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

function generateCSV(data) {
    let csvContent = "Tiempo de ejecucion de la tarea (desde el beep a la flecha);Numero de errores de comision;Numero de lineas correctas;Numero de veces en que el participante levanto el lápiz de la pantalla;Tiempo de ejecucion de la tarea;Tiempo total de lápiz en el aire desde la primera respuesta en el canvas;Tiempo dedicado a la tarea(s); mano utilizada\n";

    data.forEach(row => {
        let linea = `${row.executionTime};${row.commissionErrors};${row.correctLines};${row.liftPenCount};${row.executionTime};${row.penAirTime};${row.taskTime};${selectedHand}\n`;
        csvContent += linea;
    });

    return new Blob([csvContent], { type: 'text/csv' });
}

const selectHandContainer = document.getElementById("selectHand");
const handButton = document.getElementById("handButton");
const handInputs = document.getElementsByName('hand');
const enterIDContainer = document.getElementById("enterID");

let selectedHand = "";

function showHandSelection() {
    document.getElementById('preEnd').style.display = 'block';
    document.getElementById('fin').style.display = 'block';
    selectHandContainer.style.display = "block";
    enterIDContainer.style.display = "block";
}

handButton.addEventListener('click', confirmHandSelection);

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
