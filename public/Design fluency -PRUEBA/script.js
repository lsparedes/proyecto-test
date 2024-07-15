window.onload = function () {
    const canvasContainer = document.getElementById('canvasContainer');
    const canvas = document.getElementById('designCanvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    let drawing = false;
    let startX = 0;
    let startY = 0;

    const points = [
        // Agregar las coordenadas de los puntos de cada cuadro
        [{ x: 50, y: 50 }, { x: 70, y: 50 }, { x: 50, y: 70 }, { x: 70, y: 70 }, { x: 60, y: 60 }],
        // Añadir más cuadros aquí
    ];
    const connectedPoints = points.map(() => new Set());

    document.getElementById('startButton').addEventListener('click', function () {
        document.getElementById('instructions').style.display = 'none';
        canvasContainer.style.display = 'block';
        image.src = 'imagen2.png';
        image.onload = function () {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }

        setTimeout(function() {
            const finishButton = document.getElementById('finishButton');
            finishButton.style.backgroundImage = 'url("flecha4.png")';
            finishButton.classList.add('red-arrow'); // Añadir clase de flecha roja
        }, 60000);
    });

    document.getElementById('fullscreenButton').addEventListener('click', function () {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    });

    document.getElementById('finishButton').addEventListener('click', function () {
        downloadCanvas(canvas, 'Resultados Obtenidos.png');
        goToFinishScreen();
    });

    document.getElementById('downloadImage').addEventListener('click', function () {
        downloadCanvas(canvas, 'Resultados Obtenidos.png');
    });

    // Manejar el inicio del dibujo
    canvas.addEventListener('mousedown', function (e) {
        const rect = canvas.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        drawing = true;
    });

    // Manejar el dibujo
    canvas.addEventListener('mousemove', function (e) {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();

        startX = mouseX;
        startY = mouseY;

        // Verificar si se conectaron puntos
        points.forEach((boxPoints, boxIndex) => {
            boxPoints.forEach((point, pointIndex) => {
                if (isNearPoint(mouseX, mouseY, point.x, point.y)) {
                    connectedPoints[boxIndex].add(pointIndex);
                    if (connectedPoints[boxIndex].size === 5) {
                        console.log(`Cuadro ${boxIndex + 1} completo!`);
                    }
                }
            });
        });
    });

    // Manejar el final del dibujo
    canvas.addEventListener('mouseup', function () {
        drawing = false;
    });

    // Manejar el abandono del canvas (para finalizar el dibujo)
    canvas.addEventListener('mouseleave', function () {
        drawing = false;
    });

    function isNearPoint(x1, y1, x2, y2, radius = 5) {
        const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        return dist <= radius;
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

    function goToFinishScreen() {
        canvasContainer.style.display = 'none';
        document.getElementById('finishScreen').style.display = 'block';
    }
}
