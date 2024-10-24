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
let recorder;
let chunks = [];
let practiceClicks = [];
let startItemTime, endTime, totalStartTime;
let originalCanvasSize = { width: 2105, height: 1489 };

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
}


imageCanvas.addEventListener('click', handleClick, false);

practiceCanvas.addEventListener('click', (e) => {
    const { x, y } = adjustClickCoordinates(e, practiceCanvas, originalCanvasSize);
    practiceClicks.push({ x, y });
    drawCirclePractice(e.clientX - practiceCanvas.getBoundingClientRect().left, e.clientY - practiceCanvas.getBoundingClientRect().top, 'blue');
});
function showHandSelection() {
    fin.style.display = 'block';
    selectHandContainer.style.display = "block";
    mainScreen.style.display = 'none';
    handButton.addEventListener('click', function () {
        stopRecording();
        validateClicks();
    });
}

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
    const rect = imageCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (2105 / imageCanvas.width);
    const y = (e.clientY - rect.top) * (1489 / imageCanvas.height);
    clicks.push({ x, y });
    drawCircle(e.clientX - rect.left, e.clientY - rect.top, 'blue');
}
function handleClickPractice(e) {
    const rect = practiceCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (2105 / practiceCanvas.width);
    const y = (e.clientY - rect.top) * (1489 / practiceCanvas.height);
    practiceClicks.push({ x, y });
    drawCirclePractice(e.clientX - rect.left, e.clientY - rect.top, 'blue');
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

function validateClicks() {
    fin.style.display = 'block';
    selectHandContainer.style.display = "none";
    mainScreen.style.display = 'none';
    handButton.style.display = 'none';
    let correctClicks = 0;
    let totalErrors = 0;
    let leftClicks = 0;
    let rightClicks = 0;
    let erroresComision = 0;
    let searchDistance = 0;  // Variable para almacenar la distancia total

    const imageWidth = 2105; // Ancho de la imagen original
    const halfWidth = imageWidth / 2; // Punto de referencia para dividir la imagen
    const results = [];
    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);

    let lastCorrectClick = null;  // Variable para almacenar el último clic correcto
    let sumX = 0;
    let sumY = 0;

    clicks.forEach((click, index) => {
        let isCorrect = false;

        letrasA.forEach(letra => {
            const dx = click.x - letra.x;
            const dy = click.y - letra.y;
            if (Math.sqrt(dx * dx + dy * dy) < 20) {
                isCorrect = true;
                correctClicks++;
                promedio.push({ x: click.x, y: click.y });
                sumX += click.x;
                sumY += click.y;

                // Si hay un clic correcto anterior, calcular la distancia y sumarla
                if (lastCorrectClick) {
                    const distance = Math.sqrt(Math.pow(click.x - lastCorrectClick.x, 2) + Math.pow(click.y - lastCorrectClick.y, 2));
                    searchDistance += distance;
                }

                // Actualizar el último clic correcto
                lastCorrectClick = { x: click.x, y: click.y };
            }
        });

        otrasLetras.forEach(letra => {
            const dx = click.x - letra.x;
            const dy = click.y - letra.y;
            if (Math.sqrt(dx * dx + dy * dy) < 20) {
                erroresComision++;
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
    const centerX = sumX / correctClicks;
    const centerY = sumY / correctClicks;

    const normalizedCenterX = (centerX - (2105 / 2)) / (2105 / 2);
    const normalizedCenterY = (centerY - (1489 / 2)) / (1489 / 2);

    console.log(sumX, sumY, correctClicks);
    endTime = new Date();
    const testDuration = (endTime - startItemTime);
    const totalDuration = (endTime - totalStartTime) / 1000;
    const totalDurationFormatted = totalDuration.toLocaleString('es-CL');
    const testDurationFormatted = testDuration.toLocaleString('es-CL');
    const fechaActual = new Date();
    const options = { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' };
    const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
    const [day, month, year] = fechaHoraChilena.split('-');
    const fechaFormateada = `${day}_${month}_${year}`;
    const baseFileName = `4_Cancelación_Letras_A_${fechaFormateada}`;
    const searchDistanceFormatted = (searchDistance / promedio.length).toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    let searchSpeed = (correctClicks / testDuration) * 1000;

    let csvContent = 'variable;valor\n';
    csvContent += `TotTime;${totalDurationFormatted}\n`;
    csvContent += `ExecTime;${testDurationFormatted}\n`;
    csvContent += `Hand;${selectedHand}\n`;
    csvContent += `NoTargets;${correctClicks}\n`;
    csvContent += `NoOmiErr;${totalErrors}\n`;
    csvContent += `NoCommErr;${erroresComision}\n`;
    csvContent += `clics_izquierda;${leftClicks}\n`;
    csvContent += `clics_derecha;${rightClicks}\n`;
    csvContent += `clics_totales;${clicks.length}\n`;
    csvContent += `SSpeed;${searchSpeed}\n`;

    csvContent += `SDistance;${searchDistanceFormatted} px\n`;
    // csvContent += `center_of_cancelation_px;(${centerX.toFixed(2)}, ${centerY.toFixed(2)})\n`;
    // csvContent += `center_of_cancelation_norm;(${normalizedCenterX.toFixed(2)}, ${normalizedCenterY.toFixed(2)})\n`;
    csvContent += `CoC;${Math.abs(normalizedCenterX.toFixed(2))}\n`;
    // csvContent += `center_of_cancelation_side;${Math.sign(normalizedCenterX.toFixed(2)) === -1 ? `Izquierda` : `Derecha`}\n`

    const csvBlob = downloadCSV(csvContent);
    downloadCanvas(canvasBlob => {
        downloadVideo(videoBlob => {
            const zip = new JSZip();
            zip.file(`${idParticipante}_${baseFileName}.csv`, csvBlob);
            zip.file(`${idParticipante}_${baseFileName}.png`, canvasBlob);
            zip.file(`${idParticipante}_${baseFileName}.mp4`, videoBlob);
            zip.generateAsync({ type: 'blob' }).then(content => {
                // Define la fecha actual y la formateas
                const url = URL.createObjectURL(content);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${idParticipante}_${baseFileName}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                window.close();
            });

        });
    });

    clicks = [];
    chunks = [];
}
let stream;

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


// SELECCION DE MANO JS
const fin = document.getElementById('fin');
const selectHandContainer = document.getElementById("selectHand");
const handButton = document.getElementById("handButton");
const handInputs = document.getElementsByName('hand');

// Variable con la mano seleccionada

// Funcion para mostrar la pantalla de seleccion de mano
function showHandSelection() {
    fin.style.display = 'block';
    selectHandContainer.style.display = "block";
    mainScreen.style.display = 'none';
    handButton.addEventListener('click', function () {
        stopRecording();
        validateClicks();
    });
}

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

nextButton.addEventListener('click', () => {
    showHandSelection();
});