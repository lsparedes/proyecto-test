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
let showCampanas = false;

// Coordenadas de ejemplo de las campanas en la resolución 2105x1489
let campanas = [
    {x: 126, y: 142},
    {x: 550, y: 66},
    {x: 910, y: 168},
    {x: 1325, y: 220},
    {x: 1525, y: 205},
    {x: 1882, y: 142},
    {x: 1928, y: 282},
    {x: 1716, y: 470},
    {x: 2008, y: 600},
    {x: 1550, y: 822},
    {x: 1654, y: 1098},
    {x: 1904, y: 1256},
    {x: 1658, y: 1312},
    {x: 1998, y: 1048},
    {x: 1372, y: 1424},
    {x: 1462, y: 980},
    {x: 1168, y: 1036},
    {x: 1048, y: 1070},
    {x: 874, y: 1350},
    {x: 368, y: 1392},
    {x: 88, y: 1266},
    {x: 566, y: 1104},
    {x: 150, y: 934},
    {x: 258, y: 658},
    {x: 58, y: 502},
    {x: 324, y: 308},
    {x: 762, y: 1004},
    {x: 930, y: 808},
    {x: 620, y: 698},
    {x: 762, y: 564},
    {x: 866, y: 354},
    {x: 1174, y: 378},
    {x: 1392, y: 632},
    {x: 1468, y: 700},
    {x: 556, y: 820}
];

// Cargar la imagen
let image = new Image();
image.src = 'A2bells.png';  // Cambia la ruta a la imagen correcta
image.onload = function() {
    resizeCanvas();
    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
};

window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    const aspectRatio = 2105 / 1489;
    const windowAspectRatio = window.innerWidth / window.innerHeight;

    if (windowAspectRatio > aspectRatio) {
        imageCanvas.height = window.innerHeight;
        imageCanvas.width = window.innerHeight * aspectRatio;
    } else {
        imageCanvas.width = window.innerWidth;
        imageCanvas.height = window.innerWidth / aspectRatio;
    }

    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
    if (showCampanas) {
        drawCampanas();
    }
}

imageCanvas.addEventListener('click', handleClick, false);
validateButton.addEventListener('click', validateClicks, false);
showButton.addEventListener('click', () => {
    showCampanas = true;
    drawCampanas();
});
hideButton.addEventListener('click', () => {
    showCampanas = false;
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

function drawCampanas() {
    campanas.forEach(campana => {
        drawCircle(campana.x * (imageCanvas.width / 2105), campana.y * (imageCanvas.height / 1489), 'red');
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
    if (showCampanas) drawCampanas();
    clicks.forEach((click, index) => {
        let isCorrect = false;
        campanas.forEach(campana => {
            const dx = click.x - campana.x;
            const dy = click.y - campana.y;
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
        <p>Campanas encontradas: ${correctClicks} de ${campanas.length}</p>
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
