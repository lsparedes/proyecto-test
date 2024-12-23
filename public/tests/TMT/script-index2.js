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
let drawingCompletedB = false;

let circleRadius = 30;
const circlesToCorrectB = [];
const recordedChunksCanvasB = [];

let mediaRecorderCanvas;

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
    { x: 498 - 70, y: 497 },
    { x: 653 - 70, y: 237 },
    { x: 847 - 70, y: 494 },
    { x: 671 - 70, y: 364 },
    { x: 670 - 70, y: 619 },
    { x: 272 - 70, y: 621 },
    { x: 209 - 70, y: 253 },
    { x: 433 - 70, y: 335 }
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
        drawCircleWithLabel(ctxPartB, coord.x, coord.y, label, circlesPartB, name, circleRadius);
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
        if (distance < circleRadius && circle.label === currentCirclePartB) {
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
        if (distance < circleRadius && circle.label != getNextLabel(currentCirclePartB) && circle.label != lastCirclePartB.label) {
            highlightCircle(ctxPartB, circle, 'red', x, y);
            incorrectPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x, y }]);
            circlesToCorrectB.push({ x: circle.x, y: circle.y, number: circle.number });
            isDrawingPartB = false;
        } else if (distance < circleRadius && circle.label === getNextLabel(currentCirclePartB)) {
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


canvasPartB.addEventListener('pointerdown', function (event) {
    if (drawingCompletedB || event.pointerType !== 'pen') return; // Solo acepta lápiz.
    event.preventDefault();
    const rect = canvasPartB.getBoundingClientRect();
    startDrawing(event.clientX - rect.left, event.clientY - rect.top);
});

canvasPartB.addEventListener('pointermove', function (event) {
    if (drawingCompletedB || event.pointerType !== 'pen') return; // Solo acepta lápiz.
    if (event.pressure > 0) { // Asegúrate de que el lápiz esté presionando.
        event.preventDefault();
        const rect = canvasPartB.getBoundingClientRect();
        drawMove(event.clientX - rect.left, event.clientY - rect.top);
    }
});

canvasPartB.addEventListener('pointerup', function (event) {
    if (drawingCompletedB || event.pointerType !== 'pen') return; // Solo acepta lápiz.
    event.preventDefault();
    const rect = canvasPartB.getBoundingClientRect();
    endDrawing(event.clientX - rect.left, event.clientY - rect.top);
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

const circlesToCorrectB2 = [];

const recordedChunksCanvasPartB2 = [];
let mediaRecorderCanvasPartB2;

const circleCoordinatesPartB2 = [
    { x: 452, y: 480 },
    { x: 619, y: 750 },
    { x: 281, y: 853 },
    { x: 394, y: 216 },
    { x: 413, y: 364 },
    { x: 590, y: 597 },
    { x: 491, y: 185 },
    { x: 697, y: 147 },
    { x: 694, y: 509 },
    { x: 724, y: 909 },
    { x: 404, y: 862 },
    { x: 213, y: 941 },
    { x: 299, y: 474 },
    { x: 210, y: 678 },
    { x: 176, y: 201 },
    { x: 209, y: 560 },
    { x: 295, y: 149 },
    { x: 576, y: 139 },
    { x: 793, y: 86 },
    { x: 735, y: 761 },
    { x: 786, y: 980 },
    { x: 124, y: 993 },
    { x: 131, y: 648 },
    { x: 173, y: 874 },
    { x: 141, y: 97 }
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


// canvasPartB2.addEventListener('touchstart', function (event) {
//     if (drawingCompletedB2) return;
//     const touch = event.touches[0];
//     const rect = canvasPartB2.getBoundingClientRect();
//     startDrawingPartB2(touch.clientX - rect.left, touch.clientY - rect.top);
//     if (airStartTime) {
//         let airEndTime = new Date();
//         let airTime = (airEndTime - airStartTime) / 1000;
//         penAirTime += airTime;
//         airStartTime = null;
//     }

//     if (!isRecordingStarted) {
//         mediaRecorderCanvasPartB2 = startRecording(canvasPartB2, recordedChunksCanvasPartB2);
//         isRecordingStarted = true; // Actualiza la variable de control
//         inicio = new Date();
//         reiniciarTemporizador();
//     }
// });

// canvasPartB2.addEventListener('touchmove', function (event) {
//     if (drawingCompletedB2) return;
//     const touch = event.touches[0];
//     const rect = canvasPartB2.getBoundingClientRect();
//     drawMovePartB2(touch.clientX - rect.left, touch.clientY - rect.top);
// });

// canvasPartB2.addEventListener('touchend', function (event) {
//     if (drawingCompletedB2) return;
//     const touch = event.changedTouches[0];
//     const rect = canvasPartB2.getBoundingClientRect();
//     endDrawingPartB2(touch.clientX - rect.left, touch.clientY - rect.top);
//     liftPenCount++;
//     airStartTime = new Date();
// });

canvasPartB2.addEventListener('pointerdown', function (event) {
    if (drawingCompletedB2 || event.pointerType !== 'pen') return; // Solo acepta lápiz.
    event.preventDefault();
    const rect = canvasPartB2.getBoundingClientRect();
    startDrawingPartB2(event.clientX - rect.left, event.clientY - rect.top);

    if (airStartTime) {
        let airEndTime = new Date();
        let airTime = (airEndTime - airStartTime) / 1000;
        penAirTime += airTime;
        airStartTime = null;
    }

    if (!isRecordingStarted) {
        mediaRecorderCanvasPartB2 = startRecording(canvasPartB2, recordedChunksCanvasPartB2);
        isRecordingStarted = true; // Actualiza la variable de control.
        inicio = new Date();
        reiniciarTemporizador();
    }
});

canvasPartB2.addEventListener('pointermove', function (event) {
    if (drawingCompletedB2 || event.pointerType !== 'pen') return; // Solo acepta lápiz.
    if (event.pressure > 0) { // Asegúrate de que el lápiz esté presionando.
        event.preventDefault();
        const rect = canvasPartB2.getBoundingClientRect();
        drawMovePartB2(event.clientX - rect.left, event.clientY - rect.top);
    }
});

canvasPartB2.addEventListener('pointerup', function (event) {
    if (drawingCompletedB2 || event.pointerType !== 'pen') return; // Solo acepta lápiz.
    event.preventDefault();
    const rect = canvasPartB2.getBoundingClientRect();
    endDrawingPartB2(event.clientX - rect.left, event.clientY - rect.top);
    liftPenCount++;
    airStartTime = new Date();
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
                    }, 100); // Ajusta el tiempo de espera según sea necesario
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
    let csvContent = "TotTime;NoCommErr;NoCorrLines;NoLiftPen;ExecLiftTime;ExecTime;Hand\n";

    data.forEach(row => {
        let linea = `${row.executionTime};${row.commissionErrors};${row.correctLines};${row.liftPenCount};${row.penAirTime};${row.taskTime};${selectedHand}\n`;
        csvContent += linea;
    });

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
