// Event listeners for the continue buttons
document.getElementById('continueButtonB').addEventListener('click', () => {
    startPartB();
});

document.getElementById('continueButtonB2').addEventListener('click', () => {
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
let drawingCompletedB = false;

const circleCoordinatesPartB = [
    { x: 500, y: 500 },
    { x: 700, y: 170 },
    { x: 900, y: 500 },
    { x: 720, y: 370 },
    { x: 700, y: 650 },
    { x: 300, y: 650 },
    { x: 190, y: 180 },
    { x: 450, y: 310 }
];

const firstCircleLabelB = "Inicio";
const lastCircleLabelB = "Fin";

function drawCircleWithLabel(ctx, x, y, label, circlesArray, name = "") {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, 29, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = '27px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);

    if (name) {
        ctx.font = '15px Arial';
        ctx.fillText(name, x, y + 35);
    }

    circlesArray.push({ x, y, label });
}

function startPartB() {
    document.getElementById('partB').style.display = 'none';
    canvasPartB.style.display = 'block';
    ctxPartB.clearRect(0, 0, canvasPartB.width, canvasPartB.height);
    circlesPartB.length = 0;
    currentCirclePartB = 1;
    lastCirclePartB = null;
    correctPathsPartB.length = 0;
    drawingCompletedB = false;

    circleCoordinatesPartB.forEach((coord, index) => {
        const label = index % 2 === 0 ? (index / 2) + 1 : String.fromCharCode(65 + (index - 1) / 2);
        const name = index === 0 ? firstCircleLabelB : (index === circleCoordinatesPartB.length - 1 ? lastCircleLabelB : "");
        drawCircleWithLabel(ctxPartB, coord.x, coord.y, label, circlesPartB, name);
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
        if (distance < 20 && circle.label === currentCirclePartB) {
            isDrawingPartB = true;
            lastCirclePartB = circle;
            ctxPartB.beginPath();
            ctxPartB.moveTo(circle.x, circle.y);
        }
    });
});

canvasPartB.addEventListener('mousemove', function (event) {
    if (!isDrawingPartB) return;
    ctxPartB.lineTo(event.offsetX, event.offsetY);
    ctxPartB.stroke();
});

canvasPartB.addEventListener('mouseup', function (event) {
    if (drawingCompletedB) return;
    const x = event.offsetX;
    const y = event.offsetY;
    let validDrop = false;

    circlesPartB.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < 20 && circle.label === getNextLabel(currentCirclePartB)) {
            ctxPartB.lineTo(circle.x, circle.y);
            ctxPartB.stroke();
            correctPathsPartB.push([{ x: lastCirclePartB.x, y: lastCirclePartB.y }, { x: circle.x, y: circle.y }]);
            currentCirclePartB = getNextLabel(currentCirclePartB);
            lastCirclePartB = circle;
            validDrop = true;
        }
    });

    if (!validDrop && lastCirclePartB) {
        drawInvalidLine(ctxPartB, lastCirclePartB.x, lastCirclePartB.y, x, y);
    }

    if (typeof currentCirclePartB === 'string' && currentCirclePartB === 'D') {
        drawNextButtonB();
        drawingCompletedB = true;
    }

    isDrawingPartB = false;
});

function drawNextButtonB() {
    const nextButtonB = document.createElement('button');
    //nextButtonB.textContent = 'Siguiente';
    // nextButtonB.style.position = 'absolute';
    // nextButtonB.style.bottom = '20px';
    // nextButtonB.style.right = '20px';
    // nextButtonB.style.padding = '10px 20px';
    // nextButtonB.style.fontSize = '16px';
    // nextButtonB.style.color = 'white';
    // nextButtonB.style.backgroundColor = 'blue';
    // nextButtonB.style.border = 'none';
    // nextButtonB.style.borderRadius = '5px';
    // nextButtonB.style.cursor = 'pointer';
    nextButtonB.id = 'endSequenceButton';
    nextButtonB.style.display = 'inline-block';

    nextButtonB.addEventListener('click', () => {
        canvasPartB.style.display = 'none';
        document.getElementById('partB2').style.display = 'block';
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

const circleCoordinatesPartB2 = [
    { x: 500, y: 570 },
    { x: 700, y: 820 },
    { x: 280, y: 910 },
    { x: 450, y: 270 },
    { x: 480, y: 430 },
    { x: 650, y: 630 },
    { x: 570, y: 170 },
    { x: 740, y: 140 },
    { x: 760, y: 570 },
    { x: 790, y: 1090 },
    { x: 450, y: 960 },
    { x: 200, y: 1080 },
    { x: 400, y: 560 },
    { x: 190, y: 740 },
    { x: 220, y: 200 },
    { x: 270, y: 630 },
    { x: 350, y: 130 },
    { x: 650, y: 120 },
    { x: 850, y: 100 },
    { x: 820, y: 850 },
    { x: 850, y: 1170 },
    { x: 80, y: 1200 },
    { x: 80, y: 700 },
    { x: 150, y: 1000 },
    { x: 120, y: 80 }
];

const firstCircleLabelB2 = "Inicio";
const lastCircleLabelB2 = "Fin";

function startPartB2() {
    document.getElementById('partB2').style.display = 'none';
    canvasPartB2.style.display = 'block';
    ctxPartB2.clearRect(0, 0, canvasPartB2.width, canvasPartB2.height);
    circlesPartB2.length = 0;
    currentCirclePartB2 = 1;
    lastCirclePartB2 = null;
    correctPathsPartB2.length = 0;
    drawingCompletedB2 = false;

    circleCoordinatesPartB2.forEach((coord, index) => {
        const label = index % 2 === 0 ? (index / 2) + 1 : String.fromCharCode(65 + (index - 1) / 2);
        const name = index === 0 ? firstCircleLabelB2 : (index === circleCoordinatesPartB2.length - 1 ? lastCircleLabelB2 : "");
        drawCircleWithLabel(ctxPartB2, coord.x, coord.y, label, circlesPartB2, name);
    });
}

canvasPartB2.addEventListener('mousedown', function (event) {
    if (drawingCompletedB2) return;
    const x = event.offsetX;
    const y = event.offsetY;

    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < 20 && circle.label === currentCirclePartB2) {
            isDrawingPartB2 = true;
            lastCirclePartB2 = circle;
            ctxPartB2.beginPath();
            ctxPartB2.moveTo(circle.x, circle.y);
        }
    });
});

canvasPartB2.addEventListener('mousemove', function (event) {
    if (!isDrawingPartB2) return;
    ctxPartB2.lineTo(event.offsetX, event.offsetY);
    ctxPartB2.stroke();
});

canvasPartB2.addEventListener('mouseup', function (event) {
    if (drawingCompletedB2) return;
    const x = event.offsetX;
    const y = event.offsetY;
    let validDrop = false;

    circlesPartB2.forEach(circle => {
        const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
        if (distance < 20 && circle.label === getNextLabel(currentCirclePartB2)) {
            ctxPartB2.lineTo(circle.x, circle.y);
            ctxPartB2.stroke();
            correctPathsPartB2.push([{ x: lastCirclePartB2.x, y: lastCirclePartB2.y }, { x: circle.x, y: circle.y }]);
            currentCirclePartB2 = getNextLabel(currentCirclePartB2);
            lastCirclePartB2 = circle;
            validDrop = true;
        }
    });

    if (!validDrop && lastCirclePartB2) {
        drawInvalidLine(ctxPartB2, lastCirclePartB2.x, lastCirclePartB2.y, x, y);
    }

    // Actualización de la condición para mostrar el botón "Siguiente"
    if (currentCirclePartB2 === 13) {
        drawNextButtonB2();
        drawingCompletedB2 = true;
    }

    isDrawingPartB2 = false;
});

function drawNextButtonB2() {
    const nextButtonB2 = document.createElement('button');
    // nextButtonB2.textContent = 'Siguiente';
    // nextButtonB2.style.position = 'absolute';
    // nextButtonB2.style.bottom = '20px';
    // nextButtonB2.style.right = '20px';
    // nextButtonB2.style.padding = '10px 20px';
    // nextButtonB2.style.fontSize = '16px';
    // nextButtonB2.style.color = 'white';
    // nextButtonB2.style.backgroundColor = 'blue';
    // nextButtonB2.style.border = 'none';
    // nextButtonB2.style.borderRadius = '5px';
    // nextButtonB2.style.cursor = 'pointer';
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

    downloadButton.addEventListener('click', downloadAllCanvasImages);

    document.body.appendChild(downloadButton);
}

// Llamar a esta función cuando se complete la prueba
function completeTest() {
    // Aquí puedes agregar cualquier otra lógica necesaria al completar la prueba
    showDownloadButton();
}
