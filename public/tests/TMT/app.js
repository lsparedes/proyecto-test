// Event listeners for the continue buttons
document.getElementById('continueButtonB').addEventListener('click', () => {
    startPartB();
});

document.getElementById('continueButtonB2').addEventListener('click', () => {
    reiniciarTemporizador();
    startPartB2();
});

// PART 2.1 NUMBERS AND LETTERS
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

function startPartB() {
    document.getElementById('partB').style.display = 'none';
    // document.getElementById('instructions').style.marginTop = '0';
    canvasPartB.style.display = 'block';
    ctxPartB.clearRect(0, 0, canvasPartB.width, canvasPartB.height);
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
}

function getNextLabel(currentLabel) {
    const isNumber = !isNaN(currentLabel);
    if (isNumber) {
        return String.fromCharCode(65 + (currentLabel - 1));
    } else {
        return parseInt(currentLabel.charCodeAt(0) - 64 + 1);
    }
}

function drawInvalidLine(ctx, startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = 'black';
}

canvasPartB.addEventListener('mousedown', function (event) {
    if (drawingCompletedB) return;
    const x = event.offsetX;
    const y = event.offsetY;

    circlesPartB.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < 50 && circle.label === currentCirclePartB) {
            isDrawingPartB = true;
            lastCirclePartB = circle;
            ctxPartB.beginPath();
            ctxPartB.moveTo(circle.x, circle.y);
        }
    });
});

canvasPartB.addEventListener('mousemove', function (event) {
    if (drawingCompletedB) return;
    if (!isDrawingPartB) return;

    const x = event.offsetX;
    const y = event.offsetY;

    ctxPartB.lineTo(x, y);
    ctxPartB.stroke();

    let validDrop = false;

    circlesPartB.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < 50 && circle.label != getNextLabel(currentCirclePartB) && circle.label != lastCirclePartB.label) {
            drawInvalidLine(ctxPartB, lastCirclePartB.x, lastCirclePartB.y, x, y);
            incorrectPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x, y }]);
            isDrawingPartB = false;
        } else {
            if (distance < 50 && circle.label === getNextLabel(currentCirclePartB)) {
                // ctxPartB.lineTo(circle.x, circle.y);
                // ctxPartB.stroke();
                correctPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x: circle.x, y: circle.y }]);
                currentCirclePartB = getNextLabel(currentCirclePartB);
                lastCirclePartB = circle;
                validDrop = true;
            }
        }
    });

    if (typeof currentCirclePartB === 'string' && currentCirclePartB === 'D') {
        drawingCompletedB = true;
    }

    if (document.getElementById('endSequenceButton') === null || drawingCompletedB) {
        drawNextButtonB();
    }
});

canvasPartB.addEventListener('mouseup', function (event) {
    if (drawingCompletedB) return;
    const x = event.offsetX;
    const y = event.offsetY;
    let validDrop = false;

    circlesPartB.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < 50 && circle.label === getNextLabel(currentCirclePartB)) {
            ctxPartB.lineTo(circle.x, circle.y);
            ctxPartB.stroke();
            correctPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x: circle.x, y: circle.y }]);
            currentCirclePartB = getNextLabel(currentCirclePartB);
            lastCirclePartB = circle;
            validDrop = true;
        }
    });
    const distance = Math.sqrt((x - lastCirclePartB.x) ** 2 + (y - lastCirclePartB.y) ** 2);

    if (!validDrop && lastCirclePartB && distance >= 50) {
        drawInvalidLine(ctxPartB, lastCirclePartB.x, lastCirclePartB.y, x, y);
        incorrectPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x, y }]);
    }

    if (typeof currentCirclePartB === 'string' && currentCirclePartB === 'D') {
        drawingCompletedB = true;
    }

    isDrawingPartB = false;

    if (document.getElementById('endSequenceButton') === null || drawingCompletedB) {
        drawNextButtonB();
    }
});

function drawNextButtonB() {
    const nextButtonB = document.createElement('button');
    nextButtonB.id = 'endSequenceButton';
    nextButtonB.style.display = 'inline-block';

    nextButtonB.addEventListener('click', () => {
        canvasPartB.style.display = 'none';
        document.getElementById('partB2').style.display = 'flex';
        document.getElementById('continueButtonB2').style.display = 'block';
        nextButtonB.remove();
    });

    document.body.appendChild(nextButtonB);
}

// PART 2.2 NUMBERS AND LETTERS
const canvasPartB2 = document.getElementById('tmtCanvasPartB2');
const ctxPartB2 = canvasPartB2.getContext('2d');
const circlesPartB2 = [];
let currentCirclePartB2 = 1;
let isDrawingPartB2 = false;
let lastCirclePartB2 = null;
const correctPathsPartB2 = [];
let drawingCompletedB2 = false;
let temporizador = null;

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
    temporizador = setTimeout(completeTest, 300000); // Cambia después de 300 segundos
    // temporizador = setTimeout(completeTest, 3000); // Cambia después de 3 segundos
}

function startPartB2() {
    document.getElementById('partB2').style.display = 'none';
    canvasPartB2.style.display = 'block';
    ctxPartB2.clearRect(0, 0, canvasPartB2.width, canvasPartB2.height);
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
}

canvasPartB2.addEventListener('mousedown', function (event) {
    if (drawingCompletedB2) return;
    const x = event.offsetX;
    const y = event.offsetY;

    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < 30 && circle.label === currentCirclePartB2) {
            isDrawingPartB2 = true;
            lastCirclePartB2 = circle;
            ctxPartB2.beginPath();
            ctxPartB2.moveTo(circle.x, circle.y);
        }
    });
});

canvasPartB2.addEventListener('mousemove', function (event) {
    if (drawingCompletedB2) return;
    if (!isDrawingPartB2) return;
    
    const x = event.offsetX;
    const y = event.offsetY;

    ctxPartB2.lineTo(x, y);
    ctxPartB2.stroke();

    let validDrop = false;

    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if(distance < 30 && circle.label != getNextLabel(currentCirclePartB2) && circle.label != lastCirclePartB2.label){
            drawInvalidLine(ctxPartB2, lastCirclePartB2.x, lastCirclePartB2.y, x, y);
            incorrectPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x, y }]);
            isDrawingPartB2 = false;
        }else{
            if (distance < 30 && circle.label === getNextLabel(currentCirclePartB2)) {
                // ctxPartB2.lineTo(circle.x, circle.y);
                // ctxPartB2.stroke();
                correctPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x: circle.x, y: circle.y }]);
                currentCirclePartB2 = getNextLabel(currentCirclePartB2);
                lastCirclePartB2 = circle;
                validDrop = true;
            }
        }
    });

    if (currentCirclePartB2 === 13) {
        drawingCompletedB2 = true;
    }
});

canvasPartB2.addEventListener('mouseup', function (event) {
    if (drawingCompletedB2) return;
    const x = event.offsetX;
    const y = event.offsetY;
    let validDrop = false;

    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < 30 && circle.label === getNextLabel(currentCirclePartB2)) {
            ctxPartB2.lineTo(circle.x, circle.y);
            ctxPartB2.stroke();
            correctPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x: circle.x, y: circle.y }]);
            currentCirclePartB2 = getNextLabel(currentCirclePartB2);
            lastCirclePartB2 = circle;
            validDrop = true;
        }
    });

    const distance = Math.sqrt((x - lastCirclePartB2.x) ** 2 + (y - lastCirclePartB2.y) ** 2);
    if (!validDrop && lastCirclePartB2 && distance >= 30) {
        drawInvalidLine(ctxPartB2, lastCirclePartB2.x, lastCirclePartB2.y, x, y);
        incorrectPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x, y }]);
    }

    // Actualización de la condición para mostrar el botón "Siguiente"
    if (currentCirclePartB2 === 13) {
        drawingCompletedB2 = true;
    }

    isDrawingPartB2 = false;
    if (document.getElementById('endSequenceButton') === null || drawingCompletedB2) {
        drawNextButtonB2();
    }
});

function drawNextButtonB2() {
    const nextButtonB2 = document.createElement('button');
    nextButtonB2.id = 'endSequenceButton';
    nextButtonB2.style.display = 'inline-block';

    nextButtonB2.addEventListener('click', () => {
        canvasPartB2.style.display = 'none';
        // Aquí puedes agregar la lógica para mostrar la siguiente sección o concluir la prueba
        nextButtonB2.remove();
        completeTest(); // Llamar a completeTest aquí para mostrar el botón de descarga
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
    //downloadCanvasImage(canvasPartA, 'canvasPartA.png');
    downloadCanvasImage(canvasPartB, 'canvasPartB.png');
    downloadCanvasImage(canvasPartB2, 'canvasPartB2.png');
}

// Función para mostrar el botón de descarga al final
function showDownloadButton() {
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Descargar Todas las Imágenes';
    downloadButton.style.position = 'absolute';
    downloadButton.style.bottom = '20px';
    downloadButton.style.left = '20px';
    downloadButton.style.padding = '10px 20px';
    downloadButton.style.fontSize = '16px';
    downloadButton.style.color = 'white';
    downloadButton.style.backgroundColor = 'blue';
    downloadButton.style.border = 'none';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.cursor = 'pointer';


    // Mostrar mensaje de finalización
    const instructions = document.getElementById('instructions');
    instructions.style.display = 'block';
    instructions.innerHTML = '¡Has completado esta tarea con éxito! <br> ¡Muchas gracias!';
    instructions.style.textAlign = 'center';
    instructions.style.fontSize = '40px';
    instructions.style.marginTop = '20px';
    instructions.style.display = 'flex';

    downloadButton.addEventListener('click', function() {
        downloadAllCanvasImages();
        document.body.removeChild(downloadButton);
    });

    document.body.appendChild(downloadButton);
    downloadButton.click();
}

// Llamar a esta función cuando se complete la prueba
function completeTest() {
    // Aquí puedes agregar cualquier otra lógica necesaria al completar la prueba
    showDownloadButton();
}
