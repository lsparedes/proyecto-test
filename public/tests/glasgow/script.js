document.getElementById('start-button').addEventListener('click', startTest);

document.getElementById('next-button').addEventListener('click', nextImage);

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
        currentResponse = null;
        optionSelected = false;
        startTime = new Date();
    } else {
        endTest();
    }
}

document.getElementById('same-button').addEventListener('click', () => {
    if (!optionSelected) {
        endTime = new Date();
        optionSelected = true;
    }
    currentResponse = 'same';
    document.getElementById('same-button').classList.add('selected');
    document.getElementById('different-button').classList.remove('selected');
});

document.getElementById('different-button').addEventListener('click', () => {
    if (!optionSelected) {
        endTime = new Date();
        optionSelected = true;
    }
    currentResponse = 'different';
    document.getElementById('different-button').classList.add('selected');
    document.getElementById('same-button').classList.remove('selected');
});

document.getElementById('next-button').addEventListener('click', nextImage);

function nextImage() {

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
            isSame: 'N/A',
            response: '',
            responseTime: (new Date() - startTime)
        });
    }

    document.getElementById('same-button').classList.remove('selected');
    document.getElementById('different-button').classList.remove('selected');

    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        showImage();
    } else {
        document.getElementById('test-screen').style.display = 'none';
        endTimeTotal = new Date();
        showHandSelection();
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
    const year = now.getFullYear();
    return `${day}_${month}_${year}`;
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
    // Asegurarse de que userInfo esté disponible
    if (!userInfo || !userInfo.name || !userInfo.last_name) {
        console.error("Error: userInfo no está definido correctamente.");
        return; // Salir si userInfo no está disponible
    }

    // Obtener las iniciales del examinador
    const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();

    const csvData = [['Trial', 'CorrResp', 'PartResp', 'Acc', 'RT', 'Examinador']]; // Agregar columna Examinador
    results.forEach((response) => {
        const numeroImagen = response.imageIndex + 1;
        const rutaImagen = response.imageSrc;
        const esIgual = response.isSame ? 'Misma' : 'Diferentes';
        const respuestaUsuario = response.response === '' ? '' : (response.response === 'same' ? 'Misma' : 'Diferentes');
        const precision = response.isSame === (response.response === 'same') ? 1 : 0;
        const tiempoRespuesta = (response.responseTime).toFixed(3).replace('.', ',');

        // Agregar las iniciales del examinador a cada fila
        csvData.push([numeroImagen, esIgual, respuestaUsuario, precision, tiempoRespuesta, inicialesExaminador]);
    });

    const csvContent = csvData.map(row => row.join(';')).join('\n');
    return {
        content: csvContent,
        filename: `${idParticipante}_14_GFMT2_Low_${getCurrentDate()}.csv`
    };
}

function generateCSV2(startTimeTotal, selectedHand) {
    // Obtener las iniciales del examinador
    if (!userInfo || !userInfo.name || !userInfo.last_name) {
        console.error("Error: userInfo no está definido correctamente.");
        return; // Salir si userInfo no está disponible
    }

    const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();

    const totalTime = ((new Date() - startTimeTotal) / 1000).toFixed(3).replace('.', ',');

    const txtContent = [
        ["TotTime", "Hand", "Examinador"],
        [totalTime, selectedHand, inicialesExaminador]
    ].map(row => row.join(';')).join('\n');

    return {
        content: txtContent,
        filename: `${idParticipante}_14_GFMT2_Low_Unival_${getCurrentDate()}.csv`
    };
}


async function downloadZip(csvFile, txtFile) {
    const zip = new JSZip();
    zip.file(csvFile.filename, csvFile.content);
    zip.file(txtFile.filename, txtFile.content);

    const zipContent = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipContent);
    link.setAttribute("download", `${idParticipante}_14_GFMT2_Low_${getCurrentDate()}.zip`);
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