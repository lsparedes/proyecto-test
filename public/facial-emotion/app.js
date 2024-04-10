const imagenes = [
    "Emociones/Alegria/alegria1.png",
    "Emociones/Miedo/miedo2.png",
    "Emociones/Asco/asco3.png",
    "Emociones/Neutro/neutro4.png",
    "Emociones/Enojo/enojo5.png",
    "Emociones/Sorpresa/sorpresa6.png",
    "Emociones/Tristeza/tristeza7.png",
    "Emociones/Miedo/miedo8.png",
    "Emociones/Enojo/enojo9.png",
    "Emociones/Asco/asco10.png",
    "Emociones/Tristeza/tristeza11.png",
    "Emociones/Alegria/alegria12.png",
    "Emociones/Neutro/neutro13.png",
    "Emociones/Sorpresa/sorpresa14.png",
    "Emociones/Tristeza/tristeza15.png",
    "Emociones/Sorpresa/sorpresa16.png",
    "Emociones/Neutro/neutro17.png",
    "Emociones/Alegria/alegria18.png",
    "Emociones/Miedo/miedo19.png",
    "Emociones/Enojo/enojo20.png",
    "Emociones/Asco/asco21.png",
    "Emociones/Sorpresa/sorpresa22.png",
    "Emociones/Asco/asco23.png",
    "Emociones/Alegria/alegria24.png",
    "Emociones/Tristeza/tristeza25.png",
    "Emociones/Neutro/neutro26.png",
    "Emociones/Miedo/miedo27.png",
    "Emociones/Enojo/enojo28.png",
    "Emociones/Enojo/enojo29.png",
    "Emociones/Miedo/miedo30.png",
    "Emociones/Tristeza/tristeza31.png",
    "Emociones/Sorpresa/sorpresa32.png",
    "Emociones/Alegria/alegria33.png",
    "Emociones/Asco/asco34.png",
    "Emociones/Neutro/neutro35.png",

];

let indiceActual = 0;
let temporizador = null;
let presentacionIniciada = false; // Variable de control

const emocionesDisponibles = ['alegria', 'asco', 'enojo', 'miedo', 'neutro', 'sorpresa', 'tristeza'];

function mostrarEmociones() {
    const listaEmociones = document.getElementById('emotionsList');
    listaEmociones.innerHTML = ''; // Limpiar la lista antes de agregar las emociones

    emocionesDisponibles.forEach(emocion => {
        const listItem = document.createElement('li');
        listItem.textContent = emocion;
        listItem.style.cursor = 'pointer';
        listItem.addEventListener('click', function() {
            guardarSeleccion(emocion);
        });
        listaEmociones.appendChild(listItem);
    });
}

document.getElementById('fullscreenButton').addEventListener('click', function () {
    const element = document.documentElement; // Elemento raíz de la página
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
    }
});

function mostrarFinalizacion() {
    clearTimeout(temporizador);
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.textContent = 'El test ha finalizado. ¡Gracias por sus respuestas!';
    imageContainer.style.textAlign = 'center';
    imageContainer.style.fontSize = '26px';
    imageContainer.style.marginTop = '20px';
    imageContainer.style.display = 'flex';

    // Eliminar el fondo del texto de finalización
    imageContainer.style.backgroundColor = 'transparent';
    // Ocultar el botón de pantalla completa al finalizar la presentación
    document.getElementById('fullscreenButton').style.display = 'none';
    // Cambiar el mensaje del título
    document.getElementById('pageTitle').textContent = '';
}

function iniciarPresentacion() {
    presentacionIniciada = true; // Habilitar la navegación de la presentación
    const startButton = document.getElementById('startButton');
    const imageContainer = document.getElementById('imageContainer');
    const instructionText = document.getElementById('instructionText');
    const pageTitle = document.getElementById('pageTitle');

    imageContainer.style.display = 'none';
    startButton.style.display = 'none';
    startButton.addEventListener('click', () => {
        imageContainer.style.display = 'block';
        instructionText.style.display = 'none';
        pageTitle.textContent = 'Emociones';
        startButton.style.display = 'none';
        mostrarImagen(indiceActual);
        mostrarEmociones();
        reiniciarTemporizador();
    });
    if (imagenes.length > 0) {
        startButton.style.display = 'block';
    }
}

function cambiarImagen() {
    indiceActual++;
    if (indiceActual === imagenes.length) {
        mostrarFinalizacion();
    } else {
        mostrarImagen(indiceActual);
        reiniciarTemporizador();
        mostrarEmociones();
    }
}

function reiniciarTemporizador() {
    clearTimeout(temporizador);
    temporizador = setTimeout(cambiarImagen, 12000); // Cambia después de 12 segundos
}

function mostrarImagen(indice) {
    const imagenSrc = imagenes[indice];
    document.getElementById('emotionImage').src = imagenSrc;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && presentacionIniciada) {
        cambiarImagen();
    }
});

window.onload = function () {
    iniciarPresentacion();
};



