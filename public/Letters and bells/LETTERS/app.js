



const imageCanvas = document.getElementById('imageCanvas');
const validateButton = document.getElementById('validateButton');
const showButton = document.getElementById('showButton');
const hideButton = document.getElementById('hideButton');
const resultsDiv = document.getElementById('results');
const ctx = imageCanvas.getContext('2d');
const startButton = document.getElementById('startButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const instructionsScreen = document.getElementById('instructionsScreen');
const mainScreen = document.getElementById('mainScreen');
let clicks = [];
let showLetrasA = false;

// Coordenadas de las letras "A" en la resolución de la imagen
let letrasA = [
    // Aquí coloca las coordenadas obtenidas del script de Python
    {x: 334, y: 78},
    {x: 56, y: 166},
    {x: 526, y: 158},
    {x: 816, y: 70},
    {x: 150, y: 328},
    {x: 342, y: 422},
    {x: 156, y: 584},
    {x: 260, y: 664},
    {x: 266, y: 818},
    {x: 178, y: 1172},
    {x: 76, y: 1328},
    {x: 358, y: 1412},
    {x: 446, y: 1248},
    {x: 166, y: 924},
    {x: 436, y: 250},
    {x: 534, y: 584},
    {x: 636, y: 482},
    {x: 544, y: 922},
    {x: 364, y: 1084},
    {x: 646, y: 1008},
    {x: 652, y: 1172},
    {x: 552, y: 1320},
    {x: 638, y: 322},
    {x: 820, y: 402},
    {x: 922, y: 658},
    {x: 924, y: 818},
    {x: 830, y: 1084},
    {x: 828, y: 1416},
    {x: 1024, y: 1242},
    {x: 1112, y: 1242},
    {x: 1008, y: 242},
    {x: 1098, y: 240},
    {x: 1300, y: 70},
    {x: 1290, y: 396},
    {x: 1482, y: 310},
    {x: 1666, y: 228},
    {x: 1576, y: 146},
    {x: 1800, y: 78},
    {x: 2052, y: 144},
    {x: 1952, y: 308},
    {x: 1484, y: 468},
    {x: 1770, y: 386},
    {x: 1940, y: 574},
    {x: 1870, y: 654},
    {x: 1870, y: 812},
    {x: 1942, y: 910},
    {x: 1938, y: 1160},
    {x: 2064, y: 1304},
    {x: 1768, y: 1402},
    {x: 1578, y: 1310},
    {x: 1682, y: 1234},
    {x: 1762, y: 1070},
    {x: 1574, y: 912},
    {x: 1580, y: 578},
    {x: 1208, y: 656},
    {x: 1208, y: 814},
    {x: 1308, y: 1078},
    {x: 1492, y: 998},
    {x: 1494, y: 1166},
    {x: 1312, y: 1408},
    // Agrega todas las coordenadas obtenidas
];

// Cargar la imagen
let image = new Image();
image.src = 'A2letter.png';  // Cambia la ruta a la imagen correcta
image.onload = function() {
    resizeCanvas();
    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
};

window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    const aspectRatio = 2105 / 1489;  // Ajusta la proporción de la imagen
    const windowAspectRatio = window.innerWidth / window.innerHeight;

    if (windowAspectRatio > aspectRatio) {
        imageCanvas.height = window.innerHeight;
        imageCanvas.width = window.innerHeight * aspectRatio;
    } else {
        imageCanvas.width = window.innerWidth;
        imageCanvas.height = window.innerWidth / aspectRatio;
    }

    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
    if (showLetrasA) {
        drawLetrasA();
    }
}

imageCanvas.addEventListener('click', handleClick, false);
validateButton.addEventListener('click', validateClicks, false);
showButton.addEventListener('click', () => {
    showLetrasA = true;
    drawLetrasA();
});
hideButton.addEventListener('click', () => {
    showLetrasA = false;
    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
});

startButton.addEventListener('click', () => {
    instructionsScreen.style.display = 'none';
    mainScreen.style.display = 'block';
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


function handleClick(e) {
    const rect = imageCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (2105 / imageCanvas.width);
    const y = (e.clientY - rect.top) * (1489 / imageCanvas.height);
    clicks.push({x, y});
    drawCircle(e.clientX - rect.left, e.clientY - rect.top, 'blue');
}

function drawCircle(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawLetrasA() {
    letrasA.forEach(letra => {
        drawCircle(letra.x * (imageCanvas.width / 2105), letra.y * (imageCanvas.height / 1489), 'red');
    });
}

function downloadCSV(content, fileName) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
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

function validateClicks() {
    let correctClicks = 0;
    const results = [];
    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);  // Redibujar la imagen para eliminar círculos anteriores
    if (showLetrasA) drawLetrasA();
    clicks.forEach((click, index) => {
        let isCorrect = false;
        letrasA.forEach(letra => {
            const dx = click.x - letra.x;
            const dy = click.y - letra.y;
            if (Math.sqrt(dx * dx + dy * dy) < 20) {  // Ajusta el umbral según sea necesario
                isCorrect = true;
                correctClicks++;
            }
        });
        drawCircle(
            click.x * (imageCanvas.width / 2105),
            click.y * (imageCanvas.height / 1489),
            isCorrect ? 'green' : 'red'
        );
        results.push({ orden: index + 1, x: click.x, y: click.y, correcto: isCorrect ? 'Sí' : 'No' });
        // Dibujar la línea hacia el próximo clic
        if (index > 0) {
            drawLine(
                clicks[index - 1].x * (imageCanvas.width / 2105),
                clicks[index - 1].y * (imageCanvas.height / 1489),
                click.x * (imageCanvas.width / 2105),
                click.y * (imageCanvas.height / 1489)
            );
        }
    });

    // Mostrar los resultados
    resultsDiv.innerHTML = `
        <p>Total de clics: ${clicks.length}</p>
        <p>Clics correctos: ${correctClicks}</p>
        <p>Letras A encontradas: ${correctClicks} de ${letrasA.length}</p>
        <button id="downloadCSV">Descargar CSV</button>
        <button id="downloadPNG">Descargar Imagen</button>
    `;

    // Generar CSV
    let csvContent = 'Orden,X,Y,Correcto\n';
    results.forEach(result => {
        csvContent += `${result.orden},${result.x},${result.y},${result.correcto}\n`;
    });

    document.getElementById('downloadCSV').addEventListener('click', () => downloadCSV(csvContent, 'resultados.csv'));
    document.getElementById('downloadPNG').addEventListener('click', () => downloadCanvas(imageCanvas, 'resultados.png'));

    // Reiniciar los clics
    clicks = [];
}
