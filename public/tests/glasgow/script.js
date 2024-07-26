document.getElementById('start-button').addEventListener('click', startTest);
document.getElementById('fullscreen-button').addEventListener('click', toggleFullscreen);
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
    startTimeTotal = new Date();
    console.log(startTimeTotal);
    showImage();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

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
        const responseTime = (endTime - startTime) / 1000;

        responses.push({ 
            imageIndex: currentImageIndex, 
            imageSrc: images[currentImageIndex].src, 
            isSame: images[currentImageIndex].isSame, 
            response: currentResponse,
            responseTime: responseTime.toFixed(2)
        });

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
    } else {
        alert('Por favor selecciona una respuesta antes de continuar.');
    }
}

function endTest() {
    document.getElementById('end-screen').style.display = 'block';
    generarCSV();
}

function generarCSV() {
    const duracionTest = (endTimeTotal - startTimeTotal) / 1000;

    const fechaActual = new Date();
    const options = { timeZone: 'America/Santiago' };
    const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
    const fechaFormateada = fechaHoraChilena.replace(/[\/\s,:]/g, '-');

    const csvData = [['Ensayo', 'Respuesta Correcta', 'Respuesta Participante', 'Precision', 'Tiempo de Respuesta (segundos)', 'Tiempo de Tarea (segundos)', 'Mano Utilizada']];
    responses.forEach((response) => {
        const numeroImagen = response.imageIndex + 1; 
        const rutaImagen = response.imageSrc;
        const esIgual = response.isSame ? 'Misma' : 'Diferentes';
        const respuestaUsuario = response.response === 'same' ? 'Misma' : 'Diferentes';
        const precision = response.isSame === (response.response === 'same') ? 1 : 0;
        const tiempoRespuesta = response.responseTime;

        csvData.push([numeroImagen, esIgual, respuestaUsuario, precision, tiempoRespuesta, duracionTest, selectedHand]);
    });

    const csvContent = csvData.map(row => row.join(';')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const nombreArchivo = `respuestas_glasgow_face_matching_${fechaFormateada}.csv`;
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', nombreArchivo);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
        handButton.style.display = "block";
        selectedHand = e.target.value;
    });
});