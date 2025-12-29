const imageCanvas = document.getElementById('imageCanvas');
const ctx = imageCanvas.getContext('2d');
const practiceCanvas = document.getElementById('imageCanvasPractice');
const ctxPractice = practiceCanvas.getContext('2d');

const reviewScreen = document.getElementById('reviewScreen');
const reviewCanvas = document.getElementById('reviewCanvas');
const reviewCtx = reviewCanvas.getContext('2d');
const confirmReviewButton = document.getElementById('confirmReviewButton');

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
let recorder;
let chunks = [];
let practiceClicks = [];
let startItemTime, endTime, totalStartTime;
let originalCanvasSize = { width: 2105, height: 1489 };

let clickResults = [];
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
// Coordenadas de las otras letras en la resolución de la imagen
let otrasLetras = [

    { x: 60, y: 63 },
    { x: 123, y: 104 },
    { x: 145, y: 148 },
    { x: 130, y: 211 },
    { x: 78, y: 247 },
    { x: 203, y: 271 },
    { x: 239, y: 252 },
    { x: 291, y: 165 },
    { x: 222, y: 129 },
    { x: 211, y: 72 },
    { x: 363, y: 121 },
    { x: 411, y: 51 },
    { x: 494, y: 94 },
    { x: 387, y: 232 },
    { x: 355, y: 302 },
    { x: 58, y: 354 },
    { x: 106, y: 412 },
    { x: 97, y: 497 },
    { x: 48, y: 515 },
    { x: 75, y: 591 },
    { x: 99, y: 702 },
    { x: 97, y: 789 },
    { x: 94, y: 920 },
    { x: 63, y: 974 },
    { x: 148, y: 1003 },
    { x: 145, y: 1092 },
    { x: 85, y: 1152 },
    { x: 128, y: 1257 },
    { x: 172, y: 1271 },
    { x: 184, y: 1346 },
    { x: 169, y: 1382 },
    { x: 119, y: 1423 },
    { x: 271, y: 1382 },
    { x: 283, y: 1429 },
    { x: 336, y: 1324 },
    { x: 419, y: 1370 },
    { x: 469, y: 1424 },
    { x: 547, y: 1382 },
    { x: 581, y: 1288 },
    { x: 539, y: 1256 },
    { x: 493, y: 1184 },
    { x: 433, y: 1152 },
    { x: 402, y: 1194 },
    { x: 305, y: 1240 },
    { x: 266, y: 1252 },
    { x: 228, y: 1094 },
    { x: 203, y: 405 },
    { x: 227, y: 470 },
    { x: 285, y: 526 },
    { x: 182, y: 540 },
    { x: 184, y: 639 },
    { x: 302, y: 630 },
    { x: 297, y: 710 },
    { x: 276, y: 782 },
    { x: 210, y: 854 },
    { x: 218, y: 988 },
    { x: 262, y: 1038 },
    { x: 326, y: 1119 },
    { x: 324, y: 961 },
    { x: 319, y: 874 },
    { x: 421, y: 917 },
    { x: 435, y: 983 },
    { x: 496, y: 1039 },
    { x: 435, y: 1095 },
    { x: 551, y: 974 },
    { x: 464, y: 833 },
    { x: 518, y: 821 },
    { x: 535, y: 756 },
    { x: 537, y: 717 },
    { x: 513, y: 675 },
    { x: 458, y: 641 },
    { x: 399, y: 567 },
    { x: 394, y: 494 },
    { x: 310, y: 375 },
    { x: 399, y: 359 },
    { x: 419, y: 392 },
    { x: 464, y: 446 },
    { x: 528, y: 518 },
    { x: 404, y: 721 },
    { x: 401, y: 755 },
    { x: 554, y: 1141 },
    { x: 615, y: 1061 },
    { x: 701, y: 1078 },
    { x: 758, y: 1193 },
    { x: 694, y: 1213 },
    { x: 632, y: 1245 },
    { x: 663, y: 1356 },
    { x: 753, y: 1331 },
    { x: 770, y: 1279 },
    { x: 816, y: 1361 },
    { x: 770, y: 1394 },
    { x: 890, y: 1412 },
    { x: 910, y: 1346 },
    { x: 871, y: 1274 },
    { x: 890, y: 1186 },
    { x: 915, y: 1121 },
    { x: 799, y: 1119 },
    { x: 774, y: 981 },
    { x: 835, y: 952 },
    { x: 908, y: 990 },
    { x: 733, y: 894 },
    { x: 707, y: 828 },
    { x: 617, y: 787 },
    { x: 607, y: 700 },
    { x: 666, y: 663 },
    { x: 719, y: 579 },
    { x: 801, y: 528 },
    { x: 753, y: 479 },
    { x: 685, y: 390 },
    { x: 586, y: 405 },
    { x: 523, y: 349 },
    { x: 476, y: 313 },
    { x: 508, y: 235 },
    { x: 554, y: 181 },
    { x: 602, y: 223 },
    { x: 649, y: 262 },
    { x: 743, y: 279 },
    { x: 738, y: 204 },
    { x: 714, y: 140 },
    { x: 709, y: 82 },
    { x: 612, y: 118 },
    { x: 776, y: 688 },
    { x: 784, y: 801 },
    { x: 881, y: 886 },
    { x: 885, y: 779 },
    { x: 873, y: 692 },
    { x: 868, y: 583 },
    { x: 900, y: 462 },
    { x: 787, y: 349 },
    { x: 873, y: 354 },
    { x: 866, y: 286 },
    { x: 825, y: 191 },
    { x: 787, y: 119 },
    { x: 861, y: 56 },
    { x: 893, y: 129 },
    { x: 920, y: 215 },
    { x: 929, y: 283 },
    { x: 989, y: 315 },
    { x: 1018, y: 397 },
    { x: 972, y: 451 },
    { x: 995, y: 533 },
    { x: 1053, y: 601 },
    { x: 960, y: 678 },
    { x: 1019, y: 719 },
    { x: 961, y: 777 },
    { x: 1036, y: 842 },
    { x: 1023, y: 942 },
    { x: 992, y: 1015 },
    { x: 1041, y: 1048 },
    { x: 1130, y: 1058 },
    { x: 1181, y: 1020 },
    { x: 1236, y: 1024 },
    { x: 1157, y: 946 },
    { x: 1103, y: 903 },
    { x: 1132, y: 811 },
    { x: 1106, y: 750 },
    { x: 1115, y: 663 },
    { x: 1176, y: 692 },
    { x: 1186, y: 775 },
    { x: 1268, y: 767 },
    { x: 1273, y: 695 },
    { x: 1365, y: 688 },
    { x: 1358, y: 775 },
    { x: 1452, y: 789 },
    { x: 1520, y: 779 },
    { x: 1580, y: 734 },
    { x: 1537, y: 693 },
    { x: 1495, y: 671 },
    { x: 1437, y: 586 },
    { x: 1336, y: 530 },
    { x: 1251, y: 584 },
    { x: 1130, y: 533 },
    { x: 1168, y: 451 },
    { x: 1237, y: 446 },
    { x: 1091, y: 407 },
    { x: 1139, y: 317 },
    { x: 1197, y: 298 },
    { x: 1260, y: 278 },
    { x: 1214, y: 221 },
    { x: 1091, y: 194 },
    { x: 1033, y: 174 },
    { x: 995, y: 118 },
    { x: 965, y: 77 },
    { x: 1137, y: 135 },
    { x: 1166, y: 85 },
    { x: 1234, y: 121 },
    { x: 1258, y: 60 },
    { x: 1352, y: 133 },
    { x: 1300, y: 194 },
    { x: 1406, y: 215 },
    { x: 1413, y: 285 },
    { x: 1461, y: 295 },
    { x: 1427, y: 155 },
    { x: 1422, y: 104 },
    { x: 1338, y: 341 },
    { x: 1273, y: 365 },
    { x: 1393, y: 477 },
    { x: 1468, y: 392 },
    { x: 1539, y: 409 },
    { x: 1669, y: 445 },
    { x: 1720, y: 407 },
    { x: 1716, y: 363 },
    { x: 1667, y: 303 },
    { x: 1623, y: 327 },
    { x: 1558, y: 239 },
    { x: 1614, y: 240 },
    { x: 1585, y: 193 },
    { x: 1548, y: 121 },
    { x: 1633, y: 85 },
    { x: 1723, y: 65 },
    { x: 1771, y: 140 },
    { x: 1829, y: 193 },
    { x: 1882, y: 245 },
    { x: 1914, y: 259 },
    { x: 2008, y: 213 },
    { x: 2042, y: 250 },
    { x: 1982, y: 172 },
    { x: 2018, y: 107 },
    { x: 2076, y: 77 },
    { x: 1900, y: 129 },
    { x: 1914, y: 75 },
    { x: 2061, y: 354 },
    { x: 2004, y: 409 },
    { x: 2008, y: 480 },
    { x: 2073, y: 540 },
    { x: 2039, y: 613 },
    { x: 1933, y: 547 },
    { x: 1885, y: 463 },
    { x: 1935, y: 423 },
    { x: 1827, y: 382 },
    { x: 1769, y: 308 },
    { x: 1750, y: 235 },
    { x: 1728, y: 511 },
    { x: 1742, y: 583 },
    { x: 1812, y: 641 },
    { x: 1817, y: 520 },
    { x: 1912, y: 646 },
    { x: 2016, y: 702 },
    { x: 2016, y: 763 },
    { x: 1822, y: 709 },
    { x: 1832, y: 750 },
    { x: 1921, y: 804 },
    { x: 2049, y: 847 },
    { x: 2059, y: 940 },
    { x: 2003, y: 954 },
    { x: 2003, y: 1039 },
    { x: 2059, y: 1095 },
    { x: 2049, y: 1206 },
    { x: 2006, y: 1223 },
    { x: 2006, y: 1325 },
    { x: 2025, y: 1368 },
    { x: 2074, y: 1400 },
    { x: 1928, y: 1375 },
    { x: 1902, y: 1324 },
    { x: 1843, y: 1274 },
    { x: 1880, y: 1220 },
    { x: 1906, y: 1203 },
    { x: 1924, y: 1041 },
    { x: 1892, y: 985 },
    { x: 1798, y: 935 },
    { x: 1810, y: 835 },
    { x: 1728, y: 1411 },
    { x: 1781, y: 1327 },
    { x: 1740, y: 1223 },
    { x: 1771, y: 1155 },
    { x: 1721, y: 1109 },
    { x: 1730, y: 1061 },
    { x: 1831, y: 1065 },
    { x: 1740, y: 934 },
    { x: 1732, y: 891 },
    { x: 1686, y: 808 },
    { x: 1716, y: 748 },
    { x: 1681, y: 642 },
    { x: 1621, y: 668 },
    { x: 1606, y: 528 },
    { x: 1629, y: 782 },
    { x: 1609, y: 934 },
    { x: 1647, y: 992 },
    { x: 1420, y: 886 },
    { x: 1248, y: 882 },
    { x: 1340, y: 951 },
    { x: 1386, y: 983 },
    { x: 1561, y: 1049 },
    { x: 1624, y: 1123 },
    { x: 1669, y: 1141 },
    { x: 1614, y: 1208 },
    { x: 1587, y: 1266 },
    { x: 1543, y: 1230 },
    { x: 1447, y: 1203 },
    { x: 1404, y: 1189 },
    { x: 1433, y: 1073 },
    { x: 1362, y: 1118 },
    { x: 1287, y: 1112 },
    { x: 1246, y: 1194 },
    { x: 1147, y: 1147 },
    { x: 1029, y: 1145 },
    { x: 965, y: 1194 },
    { x: 961, y: 1249 },
    { x: 1031, y: 1278 },
    { x: 1120, y: 1279 },
    { x: 1207, y: 1249 },
    { x: 1312, y: 1264 },
    { x: 1398, y: 1261 },
    { x: 1425, y: 1327 },
    { x: 1410, y: 1370 },
    { x: 1340, y: 1336 },
    { x: 1282, y: 1400 },
    { x: 1236, y: 1337 },
    { x: 1169, y: 1392 },
    { x: 1140, y: 1336 },
    { x: 1016, y: 1337 },
    { x: 995, y: 1388 },
    { x: 1539, y: 1348 },
    { x: 1635, y: 1377 },
];
let promedio = [];
let image = new Image();
image.src = 'A2letter.png';
image.onload = function () {
    resizeCanvas(imageCanvas, ctx, image);
};
let practiceImage = new Image();
practiceImage.src = 'A2letter_muestra.png';

practiceImage.onload = function () {
    resizeCanvas(practiceCanvas, ctxPractice, practiceImage, 17, 17); // Ajusta el canvas de práctica al 70%
};

window.addEventListener('resize', () => {
    resizeCanvas(imageCanvas, ctx, image, 100, 100);
    resizeCanvas(practiceCanvas, ctxPractice, practiceImage, 17, 17); // Ajusta el canvas de práctica al 70%
});

function isTablet() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /ipad|tablet|android(?!.*mobi)/i.test(userAgent);
}

// Ajustar las coordenadas del click
function adjustClickCoordinates(e, canvas, originalSize) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (originalSize.width / canvas.width);
    const y = (e.clientY - rect.top) * (originalSize.height / canvas.height);
    return { x, y };
}

function resizeCanvas(canvas, ctx, image, desktopPercentage = 95, tabletPercentage = 80) {
    const isTabletDevice = isTablet();
    const percentage = isTabletDevice ? tabletPercentage : desktopPercentage;
    const aspectRatio = image.width / image.height;
    const windowAspectRatio = window.innerWidth / window.innerHeight;

    let newWidth, newHeight;

    // Ajustar dimensiones del canvas según la relación de aspecto
    if (windowAspectRatio > aspectRatio) {
        newHeight = window.innerHeight * (percentage / 100);
        newWidth = newHeight * aspectRatio;
    } else {
        newWidth = window.innerWidth * (percentage / 100);
        newHeight = newWidth / aspectRatio;
    }

    // Ajustar el tamaño del canvas
    canvas.width = newWidth;
    canvas.height = newHeight;

    console.log(`Canvas size on ${isTabletDevice ? 'tablet' : 'desktop'}: ${newWidth}px x ${newHeight}px`);

    // Limpiar el canvas antes de redibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redibujar la imagen
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;

}


imageCanvas.addEventListener('pointerdown', handleClick, false);
practiceCanvas.addEventListener('pointerdown', handleClickPractice, false);

practiceCanvas.addEventListener('', (e) => {
    const { x, y } = adjustClickCoordinates(e, practiceCanvas, originalCanvasSize);
    practiceClicks.push({ x, y });
    drawCirclePractice(e.clientX - practiceCanvas.getBoundingClientRect().left, e.clientY - practiceCanvas.getBoundingClientRect().top, 'blue');
});


startButton.addEventListener('click', () => {
    document.getElementById('instructionAudio1').pause();
    instructionsScreenP.style.display = 'none';
    mainScreenP.style.display = 'block';
    testButton.style.display = 'block';
    totalStartTime = new Date(); // Registro del tiempo de inicio total
});

nextButtonP.addEventListener('click', () => {
    mainScreenP.style.display = 'none';
    instructionsScreen.style.display = 'flex';
    nextButtonP.style.display = 'none';

});

testButton.addEventListener('click', () => {
    document.getElementById('instructionAudio2').pause();
    instructionsScreen.style.display = 'none';
    mainScreen.style.display = 'block';
    startRecording();
    startItemTime = new Date();
});

nextButton.addEventListener('click', () => {
    fin.style.display = 'block';
    selectHandContainer.style.display = "block";
    mainScreen.style.display = 'none';
    showHandSelection();
});


fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
        fullscreenButton.style.backgroundImage = "url('minimize.png')"; // Cambiar la imagen del botón a 'minimize'
        document.documentElement.requestFullscreen();
    } else if (document.fullscreenElement) {
        fullscreenButton.style.backgroundImage = "url('full-screen.png')"; // Cambiar la imagen del botón a 'full-screen'
        document.exitFullscreen();
    } else {
        console.log('El modo de pantalla completa no es soportado por tu navegador.');
    }
});

clearButton.addEventListener('click', () => {
    ctxPractice.clearRect(0, 0, practiceCanvas.width, practiceCanvas.height);
    ctxPractice.drawImage(practiceImage, 0, 0, practiceCanvas.width, practiceCanvas.height);
    practiceClicks = [];
});


function handleClick(e) {
    // Verifica que el evento provenga de un lápiz
    if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;

    const { x, y } = adjustClickCoordinates(e, imageCanvas, originalCanvasSize);

    clicks.push({ x, y });
    drawCircle(
        x * (imageCanvas.width / originalCanvasSize.width),
        y * (imageCanvas.height / originalCanvasSize.height),
        'blue'
    );

}
function handleClickPractice(e) {
    if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;

    const { x, y } = adjustClickCoordinates(e, practiceCanvas, originalCanvasSize);

    practiceClicks.push({ x, y });
    drawCirclePractice(
        x * (practiceCanvas.width / originalCanvasSize.width),
        y * (practiceCanvas.height / originalCanvasSize.height),
        'blue'
    );

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

function drawCirclePractice(x, y, color) {
    ctxPractice.beginPath();
    ctxPractice.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctxPractice.fillStyle = color;
    ctxPractice.fill();
    ctxPractice.lineWidth = 1;
    ctxPractice.strokeStyle = color;
    ctxPractice.stroke();
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

function prepararResultadosParaRevision() {
    const umbral = 20;
    const imageWidth = 2105;
    const halfWidth = imageWidth / 2;

    clickResults = clicks.map((click, index) => {
        let nearestAIndex = -1;
        let minDistA = Infinity;

        // Buscar la A más cercana
        letrasA.forEach((letra, idx) => {
            const dx = click.x - letra.x;
            const dy = click.y - letra.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDistA) {
                minDistA = dist;
                nearestAIndex = idx;
            }
        });

        const isNearA = minDistA < umbral;

        // ¿Está cerca de alguna otra letra? (para error de comisión)
        let isCommission = false;
        otrasLetras.forEach(letra => {
            const dx = click.x - letra.x;
            const dy = click.y - letra.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < umbral) {
                isCommission = true;
            }
        });

        const isCorrectInitial = isNearA; // criterio original

        return {
            index: index + 1,
            x: click.x,
            y: click.y,
            targetIndex: isNearA ? nearestAIndex : null, // índice de la A asociada
            isCommission: isCommission,
            isCorrectInitial: isCorrectInitial,
            isCorrect: isCorrectInitial
        };
    });
}

function abrirPantallaRevision() {
    // Preparar estructura de resultados
    prepararResultadosParaRevision();

    // Ocultar todo lo anterior
    fin.style.display = 'none';
    selectHandContainer.style.display = "none";
    mainScreen.style.display = 'none';

    // Mostrar pantalla de revisión
    reviewScreen.style.display = 'block';

    // 👉 Ajustar el tamaño del canvas de revisión SIN usar resizeCanvas
    reviewCanvas.width = imageCanvas.width;
    reviewCanvas.height = imageCanvas.height;

    // Dibujar sobre el reviewCanvas
    dibujarPuntosRevision();
}

function dibujarPuntosRevision() {
    // Limpiar y dibujar la imagen de fondo
    reviewCtx.clearRect(0, 0, reviewCanvas.width, reviewCanvas.height);
    reviewCtx.drawImage(image, 0, 0, reviewCanvas.width, reviewCanvas.height);

    const scaleX = reviewCanvas.width / originalCanvasSize.width;
    const scaleY = reviewCanvas.height / originalCanvasSize.height;

    clickResults.forEach(c => {
        const sx = c.x * scaleX;
        const sy = c.y * scaleY;

        reviewCtx.beginPath();
        reviewCtx.arc(sx, sy, 10, 0, 2 * Math.PI);
        reviewCtx.lineWidth = 3;
        reviewCtx.strokeStyle = c.isCorrect ? 'green' : 'red';
        // solo contorno, sin fill
        reviewCtx.stroke();
    });
}

reviewCanvas.addEventListener('pointerdown', (e) => {
    const { x, y } = adjustClickCoordinates(e, reviewCanvas, originalCanvasSize);

    let nearestIndex = -1;
    let nearestDist = Infinity;

    clickResults.forEach((c, idx) => {
        const dx = x - c.x;
        const dy = y - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < nearestDist) {
            nearestDist = dist;
            nearestIndex = idx;
        }
    });

    // Si tocó cerca de algún punto (mismo umbral que antes)
    if (nearestDist < 20 && nearestIndex !== -1) {
        // Invertir estado
        clickResults[nearestIndex].isCorrect = !clickResults[nearestIndex].isCorrect;
        // Redibujar todo
        dibujarPuntosRevision();
    }
});

function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

function validateClicks() {
    fin.style.display = 'block';
    selectHandContainer.style.display = "none";
    mainScreen.style.display = 'none';
    handButton.style.display = 'none';

    if (!clickResults || clickResults.length === 0) {
        console.error("clickResults está vacío. Asegúrate de llamar a prepararResultadosParaRevision / revisión antes de validar.");
        return;
    }

    // 👉 1) Guardamos el estado ORIGINAL del canvas (sin corrección)
    const originalImageDataURL = imageCanvas.toDataURL('image/png');

    let correctClicks = 0;
    let totalErrors = 0;
    let leftClicks = 0;
    let rightClicks = 0;
    let erroresComision = 0;
    let searchDistance = 0;

    const imageWidth = 2105;
    const imageHeight = 1489;
    const halfWidth = imageWidth / 2;
    const results = [];

    // Redibujar imagen base en el canvas principal (para la versión corregida)
    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);

    let lastCorrectClick = null;
    let sumX = 0;
    let sumY = 0;

    const scaleX = imageCanvas.width / originalCanvasSize.width;
    const scaleY = imageCanvas.height / originalCanvasSize.height;

    clickResults.forEach((c, index) => {
        if (c.isCorrect) {
            correctClicks++;
            sumX += c.x;
            sumY += c.y;

            if (lastCorrectClick) {
                const distance = Math.sqrt(
                    Math.pow(c.x - lastCorrectClick.x, 2) +
                    Math.pow(c.y - lastCorrectClick.y, 2)
                );
                searchDistance += distance;
            }
            lastCorrectClick = { x: c.x, y: c.y };
        } else {
            totalErrors++;
        }

        if (c.isCommission && !c.isCorrect) {
            erroresComision++;
        }

        if (c.x < halfWidth) {
            leftClicks++;
        } else {
            rightClicks++;
        }

        const px = c.x * scaleX;
        const py = c.y * scaleY;

        ctx.beginPath();
        ctx.arc(px, py, 10, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = c.isCorrect ? 'green' : 'red';
        ctx.fillStyle = c.isCorrect ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)';
        ctx.fill();
        ctx.stroke();

        if (index > 0) {
            const prev = clickResults[index - 1];
            ctx.beginPath();
            ctx.moveTo(prev.x * scaleX, prev.y * scaleY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        results.push({
            orden: index + 1,
            x: c.x,
            y: c.y,
            correcto: c.isCorrect ? 'Si' : 'No'
        });
    });

    const centerX = correctClicks > 0 ? (sumX / correctClicks) : (imageWidth / 2);
    const centerY = correctClicks > 0 ? (sumY / correctClicks) : (imageHeight / 2);

    const promedio = clickResults
        .filter(c => c.isCorrect)
        .map(c => ({ x: c.x, y: c.y }));

    function detectarEstrategia(clicksPromedio) {
        if (!clicksPromedio || clicksPromedio.length < 2) return "No suficiente información";

        let xDiffs = [];
        let yDiffs = [];

        for (let i = 1; i < clicksPromedio.length; i++) {
            xDiffs.push(clicksPromedio[i].x - clicksPromedio[i - 1].x);
            yDiffs.push(clicksPromedio[i].y - clicksPromedio[i - 1].y);
        }

        const meanAbs = arr => arr.reduce((sum, val) => sum + Math.abs(val), 0) / arr.length;
        const meanSigned = arr => arr.reduce((sum, val) => sum + val, 0) / arr.length;

        const meanX = meanAbs(xDiffs);
        const meanY = meanAbs(yDiffs);

        const cambiosDeSigno = arr => {
            let cambios = 0;
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] * arr[i - 1] < 0) cambios++;
            }
            return cambios;
        };

        const zigzagX = cambiosDeSigno(xDiffs) > xDiffs.length / 3;
        const zigzagY = cambiosDeSigno(yDiffs) > yDiffs.length / 3;

        if (meanX > meanY) {
            return zigzagX
                ? "B. Zigzag Horizontal (fila a fila alternando)"
                : "A. Horizontal (fila a fila izquierda a derecha)";
        } else {
            return zigzagY
                ? "D. Zigzag Vertical (columna a columna alternando)"
                : "C. Vertical (columna a columna de arriba a abajo)";
        }
    }

    let strategy = detectarEstrategia(promedio);
    console.log("Estrategia detectada:", strategy);

    let omisionesDerecha = 0;
    let omisionesIzquierda = 0;
    const umbral = 20;

    letrasA.forEach((letra, idx) => {
        const fueSeleccionada = clickResults.some(c => {
            if (!c.isCorrect) return false;
            if (c.targetIndex === idx) return true;

            const dx = c.x - letra.x;
            const dy = c.y - letra.y;
            return Math.sqrt(dx * dx + dy * dy) < umbral;
        });

        if (!fueSeleccionada) {
            if (letra.x >= halfWidth) {
                omisionesDerecha++;
            } else {
                omisionesIzquierda++;
            }
        }
    });

    endTime = new Date();
    const rawTestDuration = (endTime - startItemTime);

    const testDuration = rawTestDuration.toFixed(3).replace('.', ',');
    let searchSpeed = rawTestDuration > 0 ? (correctClicks / rawTestDuration) * 1000 : 0;
    const searchSpeedFormatted = searchSpeed.toLocaleString('es-CL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const normalizedCenterX = (centerX - (imageWidth / 2)) / (imageWidth / 2);
    const CoC = Math.sign(normalizedCenterX) === -1 ? -1 : 1;

    const totalDuration = ((endTime - totalStartTime) / 1000).toFixed(3).replace('.', ',');

    const fechaActual = new Date();
    const options = { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' };
    const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
    const [day, month, year] = fechaHoraChilena.split('-');
    const fechaFormateada = `${day}_${month}_${year}`;

    const searchDistancePromedio = promedio.length > 0
        ? (searchDistance / promedio.length)
        : 0;

    const searchDistanceFormatted = searchDistancePromedio.toLocaleString('es-CL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let csvContent = 'ExecTime;NoTargets;NoCommErr;NoOmiErrR;NoOmiErrL;CoC;SSpeed;SDistance;SStrategy;Examinador\n';

    if (!userInfo || !userInfo.name || !userInfo.last_name) {
        console.error("Error: userInfo no está definido correctamente.");
        return;
    }

    const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();

    csvContent += `${testDuration};${correctClicks};${erroresComision};${omisionesDerecha};${omisionesIzquierda};${CoC};${searchSpeedFormatted};${searchDistanceFormatted};${strategy};${inicialesExaminador}\n`;

    let csv2 = 'TotTime;Hand;Examinador\n';
    csv2 += `${totalDuration};${selectedHand};${inicialesExaminador}\n`;

    const csvBlob = downloadCSV(csvContent);
    const csvunival = downloadCSV(csv2);

    // 👉 Convertimos la imagen original (sin corrección) a Blob
    const originalPngBlob = dataURLtoBlob(originalImageDataURL);

    // 👉 Video como webm
    const videoBlob = new Blob(chunks, { type: 'video/webm' });
    console.log("Tamaño del video (bytes):", videoBlob.size);

    // 👉 Ahora tomamos el canvas CORREGIDO como PNG
    imageCanvas.toBlob(function (correctedPngBlob) {
        const zip = new JSZip();
        const baseName = `${idParticipante}_4_Cancelación_Letras_A_${fechaFormateada}`;

        zip.file(`${baseName}.csv`, csvBlob);
        zip.file(`${baseName}_Unival.csv`, csvunival);
        zip.file(`${baseName}_SinCorrección.png`, originalPngBlob);
        zip.file(`${baseName}_Corregida.png`, correctedPngBlob);
        zip.file(`${baseName}.webm`, videoBlob);

        zip.generateAsync({ type: 'blob' }).then(content => {
            const url = URL.createObjectURL(content);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${baseName}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setTimeout(() => {
                window.close();
            }, 3000);
        });
    }, 'image/png');

    // Limpiar para un posible siguiente uso
    clicks = [];
    clickResults = [];
    chunks = [];
}


let stream;

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


function prepareRecording() {
    stream = imageCanvas.captureStream();
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = event => {
        if (event.data.size > 0) {
            chunks.push(event.data);
        }
    };
}

function startRecording() {
    if (recorder) {
        recorder.start();
    }
}

function stopRecording() {
    if (recorder) {
        recorder.stop();
    }
}

const show = document.getElementById('show');


function toggleArrowVisibilityAndImage() {
    const visible = nextButton.style.display !== 'none';

    // Alternar visibilidad de las flechas
    nextButton.style.display = visible ? 'none' : 'block';

    // Cambiar imagen del botón
    const newImage = visible ? "url('noeye.png')" : "url('eye.png')";
    show.style.backgroundImage = newImage;
}

// Asignar a ambos botones
show.addEventListener('click', toggleArrowVisibilityAndImage);


// SELECCION DE MANO JS
const fin = document.getElementById('fin');
const selectHandContainer = document.getElementById("selectHand");
const handButton = document.getElementById("handButton");
const handInputs = document.getElementsByName('hand');

// Variable con la mano seleccionada

// Funcion para mostrar la pantalla de seleccion de mano
function showHandSelection() {

    // Asignar UNA sola vez
    handButton.addEventListener('click', () => {
        // Detener grabación antes de pasar a corrección
        stopRecording();

        // Ocultar pantalla selección mano
        fin.style.display = 'none';
        selectHandContainer.style.display = "none";

        // Abrir pantalla de revisión/corrección
        abrirPantallaRevision();

        // IMPORTANTE: aquí el handButton ya no pinta nada
        handButton.style.display = 'none';
    });

}
confirmReviewButton.addEventListener('click', () => {
    // Ocultar pantalla de revisión
    reviewScreen.style.display = 'none';
    // Ahora sí generamos métricas, csv, zip, etc.
    validateClicks();
});


// Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
// En este caso fue mostrarFinalizacion()
function confirmHandSelection() {
    selectHandContainer.style.display = "none";
    fin.style.display = 'none';
    endScreen.style.display = 'block';
}
let selectedHand = "";

// Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
// Actualiza el participantID cuando se cambia el input
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Obtener el id_participante de la URL
const idParticipante = getQueryParam('id_participante');

// Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
handInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        selectedHand = e.target.value;
        validateHandSelection();
    });
});

// Valida que ambos campos estén llenos antes de mostrar el botón
function validateHandSelection() {
    if (selectedHand) {
        handButton.style.display = "block";
    } else {
        handButton.style.display = "none";
    }
}

window.confirmHandSelection = confirmHandSelection;

window.addEventListener('load', prepareRecording);

