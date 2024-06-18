document.getElementById('start-button').addEventListener('click', startTest);
document.getElementById('fullscreen-button').addEventListener('click', toggleFullscreen);
document.getElementById('next-button').addEventListener('click', nextImage);

const images = [
    // Lista de 40 imágenes. Cada imagen es un objeto con las propiedades `src`, `numero` y `isSame`.
    { src: 'same/76b.png', numero: 'I1', isSame: true },
    { src: 'same/55a.png', numero: 'I2', isSame: true },
    { src: 'different/24b.png', numero: 'I3', isSame: false },
    { src: 'different/29b.png', numero: 'I4', isSame: false },
    { src: 'same/84a.png', numero: 'I5', isSame: true },
    { src: 'different/31b.png', numero: 'I6', isSame: false },
    { src: 'same/64b.png', numero: 'I7', isSame: true },
    { src: 'same/58a.png', numero: 'I8', isSame: true },
    { src: 'different/3c.png', numero: 'I9', isSame: false },
    { src: 'different/18a.png', numero: 'I10', isSame: false },
    { src: 'same/69c.png', numero: 'I11', isSame: true },
    { src: 'same/56a.png', numero: 'I12', isSame: true },
    { src: 'same/79a.png', numero: 'I13', isSame: true },
    { src: 'same/89a.png', numero: 'I14', isSame: true },
    { src: 'different/40b.png', numero: 'I15', isSame: false },
    { src: 'different/35b.png', numero: 'I16', isSame: false },
    { src: 'different/21a.png', numero: 'I17', isSame: false },
    { src: 'same/63a.png', numero: 'I18', isSame: true },
    { src: 'different/28b.png', numero: 'I19', isSame: false },
    { src: 'same/82a.png', numero: 'I20', isSame: true },
    { src: 'different/25a.png', numero: 'I21', isSame: false },
    { src: 'different/11b.png', numero: 'I22', isSame: false },
    { src: 'same/88b.png', numero: 'I23', isSame: true },
    { src: 'same/73a.png', numero: 'I24', isSame: true },
    { src: 'different/19b.png', numero: 'I25', isSame: false },
    { src: 'same/74a.png', numero: 'I26', isSame: true },
    { src: 'different/17a.png', numero: 'I27', isSame: false },
    { src: 'different/27b.png', numero: 'I28', isSame: false },
    { src: 'same/78a.png', numero: 'I29', isSame: true },
    { src: 'same/59a.png', numero: 'I30', isSame: true },
    { src: 'different/26b.png', numero: 'I31', isSame: false },
    { src: 'different/7c.png', numero: 'I32', isSame: false },
    { src: 'different/36c.png', numero: 'I33', isSame: false },
    { src: 'same/81b.png', numero: 'I34', isSame: true },
    { src: 'same/75c.png', numero: 'I35', isSame: true },
    { src: 'same/57c.png', numero: 'I36', isSame: true },
    { src: 'same/98a.png', numero: 'I37', isSame: true },
    { src: 'different/4a.png', numero: 'I38', isSame: false },
    { src: 'different/22a.png', numero: 'I39', isSame: false },
    { src: 'different/32c.png', numero: 'I40', isSame: false },
];

let currentImageIndex = 0;
let responses = [];
let currentResponse = null;
let startTime;

function startTest() {
    document.getElementById('instruction-screen').style.display = 'none';
    document.getElementById('test-screen').style.display = 'block';
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
        document.getElementById('imagenNumero').textContent = image.numero;
        document.getElementById('imagenNumero').style.display = 'block';  // Mostrar el número de imagen
        currentResponse = null;  // Reset current response
        document.getElementById('next-button').style.display = 'none';  // Ocultar el botón Next
        startTime = new Date();  // Record start time
    } else {
        endTest();
    }
}

document.getElementById('same-button').addEventListener('click', () => {
    currentResponse = 'same';
    document.getElementById('next-button').style.display = 'block'; // Mostrar el botón Next
    document.getElementById('same-button').classList.add('selected');
    document.getElementById('different-button').classList.remove('selected');
});

document.getElementById('different-button').addEventListener('click', () => {   
    currentResponse = 'different';
    document.getElementById('next-button').style.display = 'block'; // Mostrar el botón Next
    document.getElementById('different-button').classList.add('selected');
    document.getElementById('same-button').classList.remove('selected');
});

function nextImage() {
    if (currentResponse !== null) {
        const endTime = new Date();  // Record end time
        const responseTime = (endTime - startTime) / 1000;  // Calculate response time in seconds

        responses.push({ 
            imageIndex: currentImageIndex, 
            imageSrc: images[currentImageIndex].src, 
            isSame: images[currentImageIndex].isSame, 
            response: currentResponse,
            responseTime: responseTime.toFixed(2)  // Round to 2 decimal places
        });

        // Reiniciar el botón seleccionado
        document.getElementById('same-button').classList.remove('selected');
        document.getElementById('different-button').classList.remove('selected');

        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            showImage();
        } else {
            endTest();
        }
    } else {
        alert('Por favor selecciona una respuesta antes de continuar.');
    }
}

function endTest() {
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    generarCSV();
}

function generarCSV() {
    // Obtener la fecha y hora actual
    const fechaActual = new Date();
    const options = { timeZone: 'America/Santiago' };
    const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
    const fechaFormateada = fechaHoraChilena.replace(/[\/\s,:]/g, '-');

    // Crear una matriz para almacenar los datos del CSV
    const csvData = [['Numero de Imagen', 'Ruta de Imagen', 'Es Igual', 'Respuesta del Usuario', 'Tiempo de Respuesta (segundos)']];

    // Iterar sobre las respuestas y los datos de las imágenes
    responses.forEach((response) => {
        const numeroImagen = response.imageIndex + 1; 
        const rutaImagen = response.imageSrc;
        const esIgual = response.isSame ? 'Si' : 'No';
        const respuestaUsuario = response.response === 'same' ? 'Iguales' : 'Diferentes';
        const tiempoRespuesta = response.responseTime;

        // Agregar los datos de la imagen actual al CSV
        csvData.push([numeroImagen, rutaImagen, esIgual, respuestaUsuario, tiempoRespuesta]);
    });

    // Convertir la matriz de datos en formato CSV
    const csvContent = csvData.map(row => row.join(',')).join('\n');

    // Crear un objeto Blob para el contenido CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Crear un enlace de descarga para el archivo CSV
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
