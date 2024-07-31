const imageCanvas = document.getElementById('imageCanvas');
const ctx = imageCanvas.getContext('2d');
const practiceCanvas = document.getElementById('imageCanvasPractice');
const ctxPractice = practiceCanvas.getContext('2d');


const startButton = document.getElementById('startButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const nextButton = document.getElementById('next-button');
const nextButtonP = document.getElementById('next-button-practice');
const instructionsScreen = document.getElementById('instructionsScreen');
const instructionsScreenP = document.getElementById('instructionsScreenPractice');
const testButton = document.getElementById('test-button');
const mainScreenP = document.getElementById('mainScreenPractice');
const mainScreen = document.getElementById('mainScreen');
const endScreen = document.getElementById('end-screen');
const clearButton = document.getElementById('clear-canvas-button');
let clicks = [];
let practiceClicks = [];
let recorder, chunks = [];
let startItemTime, endTime, totalStartTime;

// Coordenadas de las letras "A" en la resolución de la imagen
let letrasA = [
    { x: 334, y: 78 },
    { x: 56, y: 166 },
    { x: 526, y: 158 },
    { x: 816, y: 70 },
    { x: 150, y: 328 },
    { x: 342, y: 422 },
    { x: 156, y: 584 },
    { x: 260, y: 664 },
    { x: 266, y: 818 },
    { x: 178, y: 1172 },
    { x: 76, y: 1328 },
    { x: 358, y: 1412 },
    { x: 446, y: 1248 },
    { x: 166, y: 924 },
    { x: 436, y: 250 },
    { x: 534, y: 584 },
    { x: 636, y: 482 },
    { x: 544, y: 922 },
    { x: 364, y: 1084 },
    { x: 646, y: 1008 },
    { x: 652, y: 1172 },
    { x: 552, y: 1320 },
    { x: 638, y: 322 },
    { x: 820, y: 402 },
    { x: 922, y: 658 },
    { x: 924, y: 818 },
    { x: 830, y: 1084 },
    { x: 828, y: 1416 },
    { x: 1024, y: 1242 },
    { x: 1112, y: 1242 },
    { x: 1008, y: 242 },
    { x: 1098, y: 240 },
    { x: 1300, y: 70 },
    { x: 1290, y: 396 },
    { x: 1482, y: 310 },
    { x: 1666, y: 228 },
    { x: 1576, y: 146 },
    { x: 1800, y: 78 },
    { x: 2052, y: 144 },
    { x: 1952, y: 308 },
    { x: 1484, y: 468 },
    { x: 1770, y: 386 },
    { x: 1940, y: 574 },
    { x: 1870, y: 654 },
    { x: 1870, y: 812 },
    { x: 1942, y: 910 },
    { x: 1938, y: 1160 },
    { x: 2064, y: 1304 },
    { x: 1768, y: 1402 },
    { x: 1578, y: 1310 },
    { x: 1682, y: 1234 },
    { x: 1762, y: 1070 },
    { x: 1574, y: 912 },
    { x: 1580, y: 578 },
    { x: 1208, y: 656 },
    { x: 1208, y: 814 },
    { x: 1308, y: 1078 },
    { x: 1492, y: 998 },
    { x: 1494, y: 1166 },
    { x: 1312, y: 1408 },
];

let image = new Image();
image.src = 'A2letter.png';


let practiceImage = new Image();
practiceImage.src = 'A2letter_muestra.png';

image.onload = function () {
    resizeCanvas(imageCanvas, ctx, image);
};

practiceImage.onload = function () {
    resizeCanvas(practiceCanvas, ctxPractice, practiceImage);
};

window.addEventListener('resize', () => {
    resizeCanvas(imageCanvas, ctx, image);
    resizeCanvas(practiceCanvas, ctxPractice, practiceImage);
});


// Modificar la función resizeCanvas para aceptar un porcentaje
function resizeCanvas(canvas, ctx, image, percentage = 100) {
    const aspectRatio = image.width / image.height;
    const windowAspectRatio = window.innerWidth / window.innerHeight;

    if (windowAspectRatio > aspectRatio) {
        canvas.height = window.innerHeight * (percentage / 100);
        canvas.width = canvas.height * aspectRatio;
    } else {
        canvas.width = window.innerWidth * (percentage / 100);
        canvas.height = canvas.width / aspectRatio;
    }

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Redefinir el tamaño de los canvas con el porcentaje adecuado
image.onload = function () {
    resizeCanvas(imageCanvas, ctx, image);
};

practiceImage.onload = function () {
    resizeCanvas(practiceCanvas, ctxPractice, practiceImage, 17); // Ajusta el canvas de práctica al 70%
};

window.addEventListener('resize', () => {
    resizeCanvas(imageCanvas, ctx, image);
    resizeCanvas(practiceCanvas, ctxPractice, practiceImage, 17); // Ajusta el canvas de práctica al 70%
});



imageCanvas.addEventListener('click', handleClick, false);
practiceCanvas.addEventListener('click', handleClickPractice, false);

startButton.addEventListener('click', () => {
    document.getElementById('instructionAudio1').pause();
    instructionsScreenP.style.display = 'none';
    mainScreenP.style.display = 'block';
    testButton.style.display = 'block';  // Asegura que el botón 'next' esté visible
    totalStartTime = new Date(); // Registro del tiempo de inicio total
});

nextButtonP.addEventListener('click', () => {
    mainScreenP.style.display = 'none';
    instructionsScreen.style.display = 'block';
    nextButtonP.style.display = 'block';  // Asegura que el botón 'next' esté visible

});

testButton.addEventListener('click', () => {
    document.getElementById('instructionAudio2').pause();
    instructionsScreen.style.display = 'none';
    mainScreen.style.display = 'block';
    nextButton.style.display = 'block';  // Asegura que el botón 'next' esté visible
    startRecording();
    startItemTime = new Date();
});

fullscreenButton.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
});

clearButton.addEventListener('click', () => {
    ctxPractice.clearRect(0, 0, practiceCanvas.width, practiceCanvas.height);
    ctxPractice.drawImage(practiceImage, 0, 0, practiceCanvas.width, practiceCanvas.height);
    practiceClicks = [];
});

function drawCircle(ctx, x, y, color) {
    if (!ctx || typeof ctx.beginPath !== 'function') {
        console.error('Contexto no válido para dibujar');
        return;
    }
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function handleClick(e) {
    const rect = imageCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (2105 / imageCanvas.width);
    const y = (e.clientY - rect.top) * (1489 / imageCanvas.height);
    clicks.push({ x, y });
    drawCircle(ctx, e.clientX - rect.left, e.clientY - rect.top, 'blue');
}

function handleClickPractice(e) {
    const rect = practiceCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (2105 / practiceCanvas.width);
    const y = (e.clientY - rect.top) * (1489 / practiceCanvas.height);
    practiceClicks.push({ x, y });
    drawCircle(ctxPractice, e.clientX - rect.left, e.clientY - rect.top, 'blue');
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function downloadCSV(content) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    return blob;
}

function downloadCanvas(callback) {
    imageCanvas.toBlob(function (blob) {
        callback(blob);
    }, 'image/png');
}

function downloadVideo(callback) {
    const videoBlob = new Blob(chunks, { type: 'video/webm' });
    callback(videoBlob);
}

function validateClicks() {
    let correctClicks = 0;
    let totalErrors = 0;
    let leftClicks = 0;
    let rightClicks = 0;

    const imageWidth = 2105; // Ancho de la imagen original
    const halfWidth = imageWidth / 2; // Punto de referencia para dividir la imagen

    const results = [];
    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
    clicks.forEach((click, index) => {
        let isCorrect = false;
        letrasA.forEach(letra => {
            const dx = click.x - letra.x;
            const dy = click.y - letra.y;
            if (Math.sqrt(dx * dx + dy * dy) < 20) {
                isCorrect = true;
                correctClicks++;
            }
        });
        drawCircle(
            click.x * (imageCanvas.width / 2105),
            click.y * (imageCanvas.height / 1489),
            isCorrect ? 'green' : 'red'
        );
        results.push({ orden: index + 1, x: click.x, y: click.y, correcto: isCorrect ? 'Si' : 'No' });
        if (!isCorrect) {
            totalErrors++;
        }
        if (click.x < halfWidth) {
            leftClicks++;
        } else {
            rightClicks++;
        }
        if (index > 0) {
            drawLine(
                clicks[index - 1].x * (imageCanvas.width / 2105),
                clicks[index - 1].y * (imageCanvas.height / 1489),
                click.x * (imageCanvas.width / 2105),
                click.y * (imageCanvas.height / 1489)
            );
        }
    });


    endTime = new Date();
    const testDuration = (endTime - startItemTime) / 1000;
    const totalDuration = (endTime - totalStartTime) / 1000;

    const fechaActual = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Santiago' };
    const fechaFormateada = fechaActual.toLocaleDateString('es-CL', opciones).replace(/[/\s:]/g, '_'); // Reemplaza caracteres no válidos en nombres de archivo
    const baseFileName = `resultados_letter_A_${fechaFormateada}`;

    let csvContent = 'Descripcion;Valor\n';
    csvContent += `Tiempo dedicado Tarea;${totalDuration}\n`;
    csvContent += `Tiempo respuesta;${testDuration}\n`;
    csvContent += `Mano Utilizada;${selectedHand}\n`;
    csvContent += `Aciertos;${correctClicks}\n`;
    csvContent += `Errores de omision;${totalErrors}\n`;
    csvContent += `Clics Izquierda;${leftClicks}\n`;
    csvContent += `Clics Derecha;${rightClicks}\n`;
    csvContent += `Total Clics;${clicks.length}\n`;

    const csvBlob = downloadCSV(csvContent);
    downloadCanvas(canvasBlob => {
        downloadVideo(videoBlob => {
            const zip = new JSZip();
            zip.file(`${baseFileName}.csv`, csvBlob);
            zip.file(`${baseFileName}.png`, canvasBlob);
            zip.file(`${baseFileName}.webm`, videoBlob);
            zip.generateAsync({ type: 'blob' }).then(content => {
                // Define la fecha actual y la formateas
                const url = URL.createObjectURL(content);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${baseFileName}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

            });
        });
    });

    clicks = [];
    chunks = [];
}


function startRecording() {
    const stream = imageCanvas.captureStream();
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = event => {
        if (event.data.size > 0) {
            chunks.push(event.data);
        }
    };
    recorder.start();
}

function stopRecording() {
    if (recorder) {
        recorder.stop();
    }
}



// SELECCION DE MANO JS

const selectHandContainer = document.getElementById("selectHand");
const handButton = document.getElementById("handButton");
const handInputs = document.getElementsByName('hand');

// Variable con la mano seleccionada
let selectedHand = "";

// Funcion para mostrar la pantalla de seleccion de mano
function showHandSelection() {
    selectHandContainer.style.display = "block";
    mainScreen.style.display = 'none';

}

// Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
// En este caso fue mostrarFinalizacion()
function confirmHandSelection() {
    selectHandContainer.style.display = "none";
    endScreen.style.display = 'block';
    stopRecording(); // Asegúrate de detener la grabación antes de procesar
    validateClicks(); // Mueve la validación de clics aquí para asegurar que el ZIP se genere después de parar la grabación

}

// Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
handInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        handButton.style.display = "block";
        selectedHand = e.target.value;
    });
});

window.confirmHandSelection = confirmHandSelection;

nextButton.addEventListener('click', () => {
    showHandSelection();
});