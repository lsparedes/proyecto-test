document.getElementById('start-button').addEventListener('click', startTest);

const images = [
    { src: 'same/76b.png', numero: 'E1', isSame: true },
    { src: 'same/55a.png', numero: 'E2', isSame: true },
    { src: 'different/24b.png', numero: 'E3', isSame: false },
    { src: 'different/29b.png', numero: 'E4', isSame: false },
    { src: 'same/84a.png', numero: 'E5', isSame: true },
    { src: 'different/31b.png', numero: 'E6', isSame: false },
    { src: 'same/64b.png', numero: 'E7', isSame: true },
    { src: 'same/58a.png', numero: 'E8', isSame: true },
    { src: 'different/3c.png', numero: 'E9', isSame: false },
    { src: 'different/18a.png', numero: 'E10', isSame: false },
    { src: 'same/69c.png', numero: 'E11', isSame: true },
    { src: 'same/56a.png', numero: 'E12', isSame: true },
    { src: 'same/79a.png', numero: 'E13', isSame: true },
    { src: 'same/89a.png', numero: 'E14', isSame: true },
    { src: 'different/40b.png', numero: 'E15', isSame: false },
    { src: 'different/35b.png', numero: 'E16', isSame: false },
    { src: 'different/21a.png', numero: 'E17', isSame: false },
    { src: 'same/63a.png', numero: 'E18', isSame: true },
    { src: 'different/28b.png', numero: 'E19', isSame: false },
    { src: 'same/82a.png', numero: 'E20', isSame: true },
    { src: 'different/25a.png', numero: 'E21', isSame: false },
    { src: 'different/11b.png', numero: 'E22', isSame: false },
    { src: 'same/88b.png', numero: 'E23', isSame: true },
    { src: 'same/73a.png', numero: 'E24', isSame: true },
    { src: 'different/19b.png', numero: 'E25', isSame: false },
    { src: 'same/74a.png', numero: 'E26', isSame: true },
    { src: 'different/17a.png', numero: 'E27', isSame: false },
    { src: 'different/27b.png', numero: 'E28', isSame: false },
    { src: 'same/78a.png', numero: 'E29', isSame: true },
    { src: 'same/59a.png', numero: 'E30', isSame: true },
    { src: 'different/26b.png', numero: 'E31', isSame: false },
    { src: 'different/7c.png', numero: 'E32', isSame: false },
    { src: 'different/36c.png', numero: 'E33', isSame: false },
    { src: 'same/81b.png', numero: 'E34', isSame: true },
    { src: 'same/75c.png', numero: 'E35', isSame: true },
    { src: 'same/57c.png', numero: 'E36', isSame: true },
    { src: 'same/98a.png', numero: 'E37', isSame: true },
    { src: 'different/4a.png', numero: 'E38', isSame: false },
    { src: 'different/22a.png', numero: 'E39', isSame: false },
    { src: 'different/32c.png', numero: 'E40', isSame: false },
];

let currentImageIndex = 0;
let responses = [];
let currentResponse = null;
let startTime;
let endTime;
let optionSelected = false;
let startTimeTotal;
let endTimeTotal;
let isAdvancing = false;
let lastOptionPointerEventTime = 0;

function startTest() {
    document.getElementById('instruction-screen').style.display = 'none';
    document.getElementById('test-screen').style.display = 'block';
    document.getElementById('instrucciones').pause();
    startTimeTotal = new Date();
    console.log(startTimeTotal);
    showImage();
}

const fullscreenButton = document.getElementById('fullscreen-button');
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


function showImage() {
    if (currentImageIndex < images.length) {
        const image = images[currentImageIndex];
        document.getElementById('image').src = image.src;
        document.getElementById('trialIndicator').textContent = image.numero;
        document.getElementById('next-button').style.display = 'none';
        currentResponse = null;
        optionSelected = false;
        startTime = new Date();
    } else {
        endTest();
    }
}

function selectResponse(response) {
    if (!optionSelected) {
        endTime = new Date();
        optionSelected = true;
    }
    currentResponse = response;
    document.getElementById('same-button').classList.toggle('selected', response === 'same');
    document.getElementById('different-button').classList.toggle('selected', response === 'different');
    document.getElementById('next-button').style.display = 'block';
}

function bindResponseButton(buttonId, response) {
    const button = document.getElementById(buttonId);
    button.addEventListener('pointerup', () => {
        lastOptionPointerEventTime = Date.now();
        selectResponse(response);
    }, false);
    button.addEventListener('click', () => {
        if (Date.now() - lastOptionPointerEventTime < 500) return;
        selectResponse(response);
    });
}

bindResponseButton('same-button', 'same');
bindResponseButton('different-button', 'different');

document.getElementById('next-button').addEventListener('click', nextImage);

function nextImage() {
    if (isAdvancing) return;
    if (currentResponse === null) return;
    isAdvancing = true;

    if (currentResponse !== null) {
        responses.push({
            imageIndex: currentImageIndex,
            imageSrc: images[currentImageIndex].src,
            isSame: images[currentImageIndex].isSame,
            response: currentResponse,
            responseTime: (endTime - startTime)
        });
    } else {
        responses.push({
            imageIndex: currentImageIndex,
            imageSrc: images[currentImageIndex].src,
            isSame: images[currentImageIndex].isSame, // mejor guarda el valor real
            response: '',
            responseTime: null // <- sin tiempo
        });
    }


    document.getElementById('same-button').classList.remove('selected');
    document.getElementById('different-button').classList.remove('selected');

    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        showImage();
        isAdvancing = false;
    } else {
        document.getElementById('test-screen').style.display = 'none';
        endTimeTotal = new Date();
        showHandSelection();
        isAdvancing = false;
    }
}

function endTest() {
    document.getElementById("preEnd").style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    downloadResultsAsZip(responses, startTimeTotal, selectedHand);
}

// SELECCION DE MANO JS

const selectHandContainer = document.getElementById("selectHand");
const handButton = document.getElementById("handButton");
const handInputs = document.getElementsByName('hand');

// Variable con la mano seleccionada
let selectedHand = "";

// Funcion para mostrar la pantalla de seleccion de mano
function showHandSelection() {
    document.getElementById("preEnd").style.display = 'block';
    selectHandContainer.style.display = "block";
}

// Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
// En este caso fue mostrarFinalizacion()
function confirmHandSelection() {
    selectHandContainer.style.display = "none";
    endTest();
}

// Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
handInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        validateInputs();
        selectedHand = e.target.value;
    });
});

document.getElementById('handButton').addEventListener('click', confirmHandSelection);

function validateInputs() {
    selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

    if (selectedHand) {
        handButton.style.display = 'block';
    }
}

function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    return `${day}${month}${year}`;
}

function sanitizePlatformName(value) {
    return String(value || '')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9-_ ]/g, '')
        .trim()
        .replace(/\s+/g, '_');
}

function examinerInitialsForFile() {
    const initials = userInfo?.initials || [userInfo?.name, userInfo?.last_name]
        .filter(Boolean)
        .join(' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase())
        .join('');
    return sanitizePlatformName(initials) || 'NAA';
}


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Obtener el id_participante de la URL
const idParticipante = getQueryParam('id_participante');

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


function generateCSV(results) {
    if (!userInfo || !userInfo.name || !userInfo.last_name) {
        console.error("Error: userInfo no está definido correctamente.");
        return;
    }

    const inicialesExaminador = userInfo?.initials || `${userInfo?.name || ""} ${userInfo?.last_name || ""}`.trim().split(/\s+/).filter(Boolean).map(part => part.charAt(0).toUpperCase()).join("") || "EX";

    const csvData = [['Trial', 'CorrResp', 'PartResp', 'Acc', 'RT', 'Examinador']];

    results.forEach((r) => {
        // Trial: usa el número del arreglo original
        const trial = (images[r.imageIndex]?.numero) || (r.imageIndex + 1);

        const corrResp = (r.isSame === true) ? 'Misma'
            : (r.isSame === false) ? 'Diferentes'
                : '';

        const huboRespuesta = r.response === 'same' || r.response === 'different';

        // PartResp
        const partResp = huboRespuesta ? (r.response === 'same' ? 'Misma' : 'Diferentes') : '';

        // Acc: vacío si no hubo respuesta; si hubo, 1/0
        let acc = '';
        if (huboRespuesta && (r.isSame === true || r.isSame === false)) {
            acc = (r.isSame === (r.response === 'same')) ? 1 : 0;
        }

        // RT: vacío si no hubo respuesta; si hubo, a segundos con 3 decimales (coma)
        const rt = (huboRespuesta && typeof r.responseTime === 'number')
            ? String(Math.round(r.responseTime))   // ms
            : '';


        csvData.push([trial, corrResp, partResp, acc, rt, inicialesExaminador]);
    });

    const csvContent = csvData.map(row => row.join(';')).join('\n');
    return {
        content: csvContent,
        filename: `${idParticipante}_GFMT2_low.csv`
    };
}


function generateCSV2(startTimeTotal, selectedHand) {
    // Obtener las iniciales del examinador
    if (!userInfo || !userInfo.name || !userInfo.last_name) {
        console.error("Error: userInfo no está definido correctamente.");
        return; // Salir si userInfo no está disponible
    }

    const inicialesExaminador = userInfo?.initials || `${userInfo?.name || ""} ${userInfo?.last_name || ""}`.trim().split(/\s+/).filter(Boolean).map(part => part.charAt(0).toUpperCase()).join("") || "EX";

    const totalTime = String(new Date() - startTimeTotal); // ms

    const txtContent = [
        ["TotTime", "Hand", "Examinador"],
        [totalTime, selectedHand, inicialesExaminador]
    ].map(row => row.join(';')).join('\n');

    return {
        content: txtContent,
        filename: `${idParticipante}_GFMT2_low_unival.csv`
    };
}


async function downloadZip(csvFile, txtFile) {
    const zip = new JSZip();
    zip.file(csvFile.filename, csvFile.content);
    zip.file(txtFile.filename, txtFile.content);

    const zipContent = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipContent);
    link.setAttribute("download", `${idParticipante}_GFMT2_Low_${getCurrentDate()}_${examinerInitialsForFile()}.zip`);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
        window.close();
    }, 2000);
}

async function downloadResultsAsZip(results, startTimeTotal, selectedHand) {
    const csvFile = generateCSV(results);
    const txtFile = generateCSV2(startTimeTotal, selectedHand);
    await downloadZip(csvFile, txtFile);
}
