const imagenes = [
    "story/prueba1.jpg",
    "story/prueba2.jpg",
    "story/set-ia.jpg",
    "story/IA-1.jpg",
    "story/IA-1.1.jpg",
    "story/IA-2.jpg",
    "story/IA-2.1.jpg",
    "story/IA-3.jpg",
    "story/IA-3.1.jpg",
    "story/IA-4.jpg",
    "story/IA-4.1.jpg",
    "story/IA-5.jpg",
    "story/IA-5.1.jpg",
    "story/IA-6.jpg",
    "story/IA-6.1.jpg",
    "story/set-ci.jpg",
    "story/CI-1.jpg",
    "story/CI-1.1.jpg",
    "story/CI-2.jpg",
    "story/CI-2.1.jpg",
    "story/CI-3.jpg",
    "story/CI-3.1.jpg",
    "story/CI-4.jpg",
    "story/CI-4.1.jpg",
    "story/CI-5.jpg",
    "story/CI-5.1.jpg",
    "story/CI-6.jpg",
    "story/CI-6.1.jpg",
    "story/set-ea.jpg",
    "story/EA-1.jpg",
    "story/EA-1.1.jpg",
    "story/EA-2.jpg",
    "story/EA-2.1.jpg",
    "story/EA-3.jpg",
    "story/EA-3.1.jpg",
    "story/EA-4.jpg",
    "story/EA-4.1.jpg",
    "story/EA-5.jpg",
    "story/EA-5.1.jpg",
    "story/EA-6.jpg",
    "story/EA-6.1.jpg",
];

let indiceActual = 0;

let presentacionIniciada = false; // Variable de control

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
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.textContent = 'El test ha finalizado. ¡Gracias por sus respuestas!';
    imageContainer.style.textAlign = 'center';
    imageContainer.style.fontSize = '28px';
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
    const imageContainer = document.getElementById('imageContainer');
    const instructionText = document.getElementById('instructionText');
    const pageTitle = document.getElementById('pageTitle');
    const startButton = document.getElementById('startButton');

    imageContainer.style.display = 'block';
    instructionText.style.display = 'none';
    pageTitle.textContent = 'Story';
    startButton.style.display = 'none';

    mostrarImagen(indiceActual);
}

function cambiarImagen() {
    indiceActual++;
    if (indiceActual === imagenes.length) {
        mostrarFinalizacion();
    } else {
        mostrarImagen(indiceActual);
    }
}


document.getElementById('startButton').addEventListener('click', iniciarPresentacion);

function mostrarImagen(indice) {
    const imagenSrc = imagenes[indice];
    document.getElementById('storyImage').src = imagenSrc;

    // Condición para no mostrar título en índices específicos
    const pageTitle = document.getElementById('pageTitle');
    if (indice === 2 || indice === 15 || indice === 28) {
        pageTitle.textContent = ''; // Vaciar el contenido para índices 2 y 3
    } else if (indice === 0 || indice === 1) { 
        pageTitle.textContent = 'Historia de prueba';
    } else {
        pageTitle.textContent = 'Story based empathy task'; // Texto predeterminado para los demás
    }

}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && presentacionIniciada) {
        cambiarImagen();
    }
});

