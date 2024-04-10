const imagenes = [
    { src: "img/estimulos.png", title: "", hasInput: false, hasSubmitButton: false },
    { src: "img/P1.png", title: "Practica 1", hasInput: true, hasSubmitButton: true },
    { src: "img/P2.png", title: "Practica 2", hasInput: true, hasSubmitButton: true },
    { src: "img/1.png", title: "Item 1", hasInput: true, hasSubmitButton: true },
    { src: "img/2.png", title: "Item 2", hasInput: true, hasSubmitButton: true },
    { src: "img/3.png", title: "Item 3 ", hasInput: true, hasSubmitButton: true },
    { src: "img/4.png", title: "Item 4 ", hasInput: true, hasSubmitButton: true },
    { src: "img/5.png", title: "Item 5 ", hasInput: true, hasSubmitButton: true },
    { src: "img/6.png", title: "Item 6 ", hasInput: true, hasSubmitButton: true },
    { src: "img/7.png", title: "Item 7", hasInput: true, hasSubmitButton: true },
    { src: "img/8.png", title: "Item 8 ", hasInput: true, hasSubmitButton: true },
    { src: "img/9.png", title: "Item 9 ", hasInput: true, hasSubmitButton: true },
    { src: "img/10.png", title: "Item 10 ", hasInput: true, hasSubmitButton: true },
];

let indiceActual = 0;

let presentacionIniciada = false; // Variable de control

document.getElementById('startButton').addEventListener('click', iniciarPresentacion);

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
    imageContainer.style.fontSize = '35px';
    imageContainer.style.marginTop = '13px';
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
    const fullscreenButton = document.getElementById('fullscreenButton'); // Obtener el botón de pantalla completa

    imageContainer.style.display = 'block';
    instructionText.style.display = 'none';
    pageTitle.textContent = 'Story';
    startButton.style.display = 'none';

    mostrarImagen(indiceActual);

    // Mostrar el input solo si la imagen tiene la clase 'inputImage'
    const inputImages = document.querySelectorAll('.inputImage');
    inputImages.forEach(image => {
        if (image.style.display !== 'none') {
            document.getElementById('userInput').style.display = 'block';
        }
    });

    // Ocultar el botón de pantalla completa una vez que la presentación ha comenzado
    fullscreenButton.style.display = 'none';
}

function cambiarImagen() {
    indiceActual++;
    if (indiceActual >= imagenes.length) {
        mostrarFinalizacion();
    } else {
        mostrarImagen(indiceActual);
        // Restablecer el valor del input a una cadena vacía
        document.getElementById('userInput').value = "";
    }
}



function mostrarImagen(indice) {
    const imagenInfo = imagenes[indice];
    const storyImage = document.getElementById('storyImage');
    const pageTitle = document.getElementById('pageTitle');
    const userInput = document.getElementById('userInput');
    const submitButton = document.getElementById('submitButton'); // Obtener el botón de enviar

    // Asignar la imagen y el título correspondiente
    storyImage.src = imagenInfo.src;
    pageTitle.textContent = imagenInfo.title;

    // Mostrar u ocultar el input según la propiedad hasInput
    if (imagenInfo.hasInput) {
        userInput.style.display = 'block';
    } else {
        userInput.style.display = 'none';
    }

    // Mostrar u ocultar el botón de enviar según la propiedad hasSubmitButton
    if (imagenInfo.hasSubmitButton) {
        submitButton.style.display = 'block';
    } else {
        submitButton.style.display = 'none';
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && presentacionIniciada) {
        // Verificar si la imagen actual tiene un botón de envío asociado
        if (imagenes[indiceActual].hasSubmitButton) {
            // Si tiene un botón de envío, ignorar la tecla de flecha derecha
            return;
        }
        // Si no tiene un botón de envío, cambiar la imagen
        cambiarImagen();
    }
});

// Event listener para el botón de enviar  -incompleto-
document.getElementById('submitButton').addEventListener('click', function () {
    // Obtener el valor del input de texto
    const userInputValue = document.getElementById('userInput').value;

    // Aquí puedes realizar alguna acción con la respuesta ingresada, como validarla o procesarla

    // Por ejemplo, puedes mostrar la respuesta en la consola
    console.log('Respuesta ingresada:', userInputValue);

    // Luego, puedes hacer algo más, como avanzar a la siguiente imagen
    cambiarImagen();
});
