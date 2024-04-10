const imagenes = [
    {
        src: "imagenes/mcct_target_pr1.png",
        title: "Practica 1: Con qué imagen se empareja? ",
        options: [
            { src: "imagenes/mcct_comp1_pr1.png", correct: true },
            { src: "imagenes/mcct_comp2_pr1.png", correct: false },
            { src: "imagenes/mcct_comp3_pr1.png", correct: false },
            { src: "imagenes/mcct_comp4_pr1.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_pr2.png",
        title: "Practica 2: Con qué imagen se empareja?",
        options: [
            { src: "imagenes/mcct_comp1_pr2.png", correct: false },
            { src: "imagenes/mcct_comp2_pr2.png", correct: false },
            { src: "imagenes/mcct_comp3_pr2.png", correct: true },
            { src: "imagenes/mcct_comp4_pr2.png", correct: false }
        ]
    },

    {
        src: "imagenes/mcct_target_pr3.png",
        title: "Practica 3: Con qué imagen se empareja?",
        options: [
            { src: "imagenes/mcct_comp1_pr3.png", correct: true },
            { src: "imagenes/mcct_comp2_pr3.png", correct: false },
            { src: "imagenes/mcct_comp3_pr3.png", correct: false },
            { src: "imagenes/mcct_comp4_pr3.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t1.png",
        title: "Item 1",
        options: [
            { src: "imagenes/mcct_comp1_t1.png", correct: true },
            { src: "imagenes/mcct_comp2_t1.png", correct: false },
            { src: "imagenes/mcct_comp3_t1.png", correct: false },
            { src: "imagenes/mcct_comp4_t1.png", correct: false }
        ]
    },

    {
        src: "imagenes/mcct_target_t2.png",
        title: "Item 2",
        options: [
            { src: "imagenes/mcct_comp1_t2.png", correct: false },
            { src: "imagenes/mcct_comp2_t2.png", correct: false },
            { src: "imagenes/mcct_comp3_t2.png", correct: false },
            { src: "imagenes/mcct_comp4_t2.png", correct: true }
        ]
    },

    {
        src: "imagenes/mcct_target_t3.png",
        title: "Item 3",
        options: [
            { src: "imagenes/mcct_comp1_t3.png", correct: false },
            { src: "imagenes/mcct_comp2_t3.png", correct: false },
            { src: "imagenes/mcct_comp3_t3.png", correct: false },
            { src: "imagenes/mcct_comp4_t3.png", correct: true }
        ]
    },

    {
        src: "imagenes/mcct_target_t4.png",
        title: "Item 4",
        options: [
            { src: "imagenes/mcct_comp1_t4.png", correct: true },
            { src: "imagenes/mcct_comp2_t4.png", correct: false },
            { src: "imagenes/mcct_comp3_t4.png", correct: false },
            { src: "imagenes/mcct_comp4_t4.png", correct: false }
        ]
    },

    {
        src: "imagenes/mcct_target_t5.png",
        title: "Item 5",
        options: [
            { src: "imagenes/mcct_comp1_t5.png", correct: false },
            { src: "imagenes/mcct_comp2_t5.png", correct: false },
            { src: "imagenes/mcct_comp3_t5.png", correct: false },
            { src: "imagenes/mcct_comp4_t5.png", correct: true }
        ]
    },
    {
        src: "imagenes/mcct_target_t6.png",
        title: "Item 6",
        options: [
            { src: "imagenes/mcct_comp1_t6.png", correct: false },
            { src: "imagenes/mcct_comp2_t6.png", correct: true },
            { src: "imagenes/mcct_comp3_t6.png", correct: false },
            { src: "imagenes/mcct_comp4_t6.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t7.png",
        title: "Item 7",
        options: [
            { src: "imagenes/mcct_comp1_t7.png", correct: false },
            { src: "imagenes/mcct_comp2_t7.png", correct: true },
            { src: "imagenes/mcct_comp3_t7.png", correct: false },
            { src: "imagenes/mcct_comp4_t7.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t8.png",
        title: "Item 8",
        options: [
            { src: "imagenes/mcct_comp1_t8.png", correct: false },
            { src: "imagenes/mcct_comp2_t8.png", correct: false },
            { src: "imagenes/mcct_comp3_t8.png", correct: true },
            { src: "imagenes/mcct_comp4_t8.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t9.png",
        title: "Item 9",
        options: [
            { src: "imagenes/mcct_comp1_t9.png", correct: false },
            { src: "imagenes/mcct_comp2_t9.png", correct: false },
            { src: "imagenes/mcct_comp3_t9.png", correct: true },
            { src: "imagenes/mcct_comp4_t9.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t10.png",
        title: "Item 10",
        options: [
            { src: "imagenes/mcct_comp1_t10.png", correct: false },
            { src: "imagenes/mcct_comp2_t10.png", correct: true },
            { src: "imagenes/mcct_comp3_t10.png", correct: false },
            { src: "imagenes/mcct_comp4_t10.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t11.png",
        title: "Item 11",
        options: [
            { src: "imagenes/mcct_comp1_t11.png", correct: false },
            { src: "imagenes/mcct_comp2_t11.png", correct: true },
            { src: "imagenes/mcct_comp3_t11.png", correct: false },
            { src: "imagenes/mcct_comp4_t11.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t12.png",
        title: "Item 12",
        options: [
            { src: "imagenes/mcct_comp1_t12.png", correct: false },
            { src: "imagenes/mcct_comp2_t12.png", correct: false },
            { src: "imagenes/mcct_comp3_t12.png", correct: false },
            { src: "imagenes/mcct_comp4_t12.png", correct: true }
        ]
    },
    {
        src: "imagenes/mcct_target_t13.png",
        title: "Item 13",
        options: [
            { src: "imagenes/mcct_comp1_t13.png", correct: false },
            { src: "imagenes/mcct_comp2_t13.png", correct: false },
            { src: "imagenes/mcct_comp3_t13.png", correct: false },
            { src: "imagenes/mcct_comp4_t13.png", correct: true }
        ]
    },
    {
        src: "imagenes/mcct_target_t14.png",
        title: "Item 14",
        options: [
            { src: "imagenes/mcct_comp1_t14.png", correct: false },
            { src: "imagenes/mcct_comp2_t14.png", correct: false },
            { src: "imagenes/mcct_comp3_t14.png", correct: true },
            { src: "imagenes/mcct_comp4_t14.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t15.png",
        title: "Item 15",
        options: [
            { src: "imagenes/mcct_comp1_t15.png", correct: false },
            { src: "imagenes/mcct_comp2_t15.png", correct: false },
            { src: "imagenes/mcct_comp3_t15.png", correct: true },
            { src: "imagenes/mcct_comp4_t15.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t16.png",
        title: "Item 16",
        options: [
            { src: "imagenes/mcct_comp1_t16.png", correct: false },
            { src: "imagenes/mcct_comp2_t16.png", correct: false },
            { src: "imagenes/mcct_comp3_t16.png", correct: true },
            { src: "imagenes/mcct_comp4_t16.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t17.png",
        title: "Item 17",
        options: [
            { src: "imagenes/mcct_comp1_t17.png", correct: false },
            { src: "imagenes/mcct_comp2_t17.png", correct: false },
            { src: "imagenes/mcct_comp3_t17.png", correct: true },
            { src: "imagenes/mcct_comp4_t17.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t18.png",
        title: "Item 18",
        options: [
            { src: "imagenes/mcct_comp1_t18.png", correct: false },
            { src: "imagenes/mcct_comp2_t18.png", correct: false },
            { src: "imagenes/mcct_comp3_t18.png", correct: true },
            { src: "imagenes/mcct_comp4_t18.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t19.png",
        title: "Item 19",
        options: [
            { src: "imagenes/mcct_comp1_t19.png", correct: true },
            { src: "imagenes/mcct_comp2_t19.png", correct: false },
            { src: "imagenes/mcct_comp3_t19.png", correct: false },
            { src: "imagenes/mcct_comp4_t19.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t20.png",
        title: "Item 20",
        options: [
            { src: "imagenes/mcct_comp1_t20.png", correct: false },
            { src: "imagenes/mcct_comp2_t20.png", correct: false },
            { src: "imagenes/mcct_comp3_t20.png", correct: false },
            { src: "imagenes/mcct_comp4_t20.png", correct: true }
        ]
    },
    {
        src: "imagenes/mcct_target_t21.png",
        title: "Item 21",
        options: [
            { src: "imagenes/mcct_comp1_t21.png", correct: false },
            { src: "imagenes/mcct_comp2_t21.png", correct: true },
            { src: "imagenes/mcct_comp3_t21.png", correct: false },
            { src: "imagenes/mcct_comp4_t21.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t22.png",
        title: "Item 22",
        options: [
            { src: "imagenes/mcct_comp1_t22.png", correct: false },
            { src: "imagenes/mcct_comp2_t22.png", correct: true },
            { src: "imagenes/mcct_comp3_t22.png", correct: false },
            { src: "imagenes/mcct_comp4_t22.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t23.png",
        title: "Item 23",
        options: [
            { src: "imagenes/mcct_comp1_t23.png", correct: true },
            { src: "imagenes/mcct_comp2_t23.png", correct: false },
            { src: "imagenes/mcct_comp3_t23.png", correct: false },
            { src: "imagenes/mcct_comp4_t23.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t24.png",
        title: "Item 24",
        options: [
            { src: "imagenes/mcct_comp1_t24.png", correct: true },
            { src: "imagenes/mcct_comp2_t24.png", correct: false },
            { src: "imagenes/mcct_comp3_t24.png", correct: false },
            { src: "imagenes/mcct_comp4_t24.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t25.png",
        title: "Item 25",
        options: [
            { src: "imagenes/mcct_comp1_t25.png", correct: true },
            { src: "imagenes/mcct_comp2_t25.png", correct: false },
            { src: "imagenes/mcct_comp3_t25.png", correct: false },
            { src: "imagenes/mcct_comp4_t25.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t26.png",
        title: "Item 26",
        options: [
            { src: "imagenes/mcct_comp1_t26.png", correct: true },
            { src: "imagenes/mcct_comp2_t26.png", correct: false },
            { src: "imagenes/mcct_comp3_t26.png", correct: false },
            { src: "imagenes/mcct_comp4_t26.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t27.png",
        title: "Item 27",
        options: [
            { src: "imagenes/mcct_comp1_t27.png", correct: false },
            { src: "imagenes/mcct_comp2_t27.png", correct: false },
            { src: "imagenes/mcct_comp3_t27.png", correct: false },
            { src: "imagenes/mcct_comp4_t27.png", correct: true }
        ]
    },
    {
        src: "imagenes/mcct_target_t28.png",
        title: "Item 28",
        options: [
            { src: "imagenes/mcct_comp1_t28.png", correct: false },
            { src: "imagenes/mcct_comp2_t28.png", correct: false },
            { src: "imagenes/mcct_comp3_t28.png", correct: false },
            { src: "imagenes/mcct_comp4_t28.png", correct: true }
        ]
    },
    {
        src: "imagenes/mcct_target_t29.png",
        title: "Item 29",
        options: [
            { src: "imagenes/mcct_comp1_t29.png", correct: false },
            { src: "imagenes/mcct_comp2_t29.png", correct: false },
            { src: "imagenes/mcct_comp3_t29.png", correct: false },
            { src: "imagenes/mcct_comp4_t29.png", correct: true }
        ]
    },
    {
        src: "imagenes/mcct_target_t30.png",
        title: "Item 30",
        options: [
            { src: "imagenes/mcct_comp1_t30.png", correct: true },
            { src: "imagenes/mcct_comp2_t30.png", correct: false },
            { src: "imagenes/mcct_comp3_t30.png", correct: false },
            { src: "imagenes/mcct_comp4_t30.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t31.png",
        title: "Item 31",
        options: [
            { src: "imagenes/mcct_comp1_t31.png", correct: false },
            { src: "imagenes/mcct_comp2_t31.png", correct: true },
            { src: "imagenes/mcct_comp3_t31.png", correct: false },
            { src: "imagenes/mcct_comp4_t31.png", correct: false }
        ]
    },
    {
        src: "imagenes/mcct_target_t32.png",
        title: "Item 32",
        options: [
            { src: "imagenes/mcct_comp1_t32.png", correct: false },
            { src: "imagenes/mcct_comp2_t32.png", correct: true },
            { src: "imagenes/mcct_comp3_t32.png", correct: false },
            { src: "imagenes/mcct_comp4_t32.png", correct: false }
        ]
    },

];

let indiceActual = 0;
let presentacionIniciada = false;

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

function mostrarFinalizacion() {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = 'El test ha finalizado. ¡Gracias por sus respuestas!';
    imageContainer.style.textAlign = 'center';
    imageContainer.style.fontSize = '35px';
    imageContainer.style.marginTop = '13px';
    imageContainer.style.display = 'flex';
    imageContainer.style.backgroundColor = 'transparent';
    document.getElementById('pageTitle').textContent = '';
    fullscreenButton.style.display = 'none';

}

function iniciarPresentacion() {
    presentacionIniciada = true;
    const imageContainer = document.getElementById('imageContainer');
    const instructionText = document.getElementById('instructionText');
    const pageTitle = document.getElementById('pageTitle');
    const startButton = document.getElementById('startButton');
    const fullscreenButton = document.getElementById('fullscreenButton');

    imageContainer.style.display = 'block';
    instructionText.style.display = 'none';
    pageTitle.textContent = 'Story';
    startButton.style.display = 'none';
    fullscreenButton.style.display = 'none'; // Ocultar el botón al iniciar la presentación

    mostrarImagen(indiceActual);
}

function mostrarImagen(indice) {
    const imagenInfo = imagenes[indice];
    const storyImage = document.getElementById('storyImage');
    const optionsContainer = document.getElementById('optionsContainer');

    // Ocultar la imagen principal antes de iniciar la carga de la nueva imagen
    storyImage.style.display = 'none';

    // Limpiar contenedor de opciones antes de mostrar nuevas imágenes
    optionsContainer.innerHTML = '';

    // Crear una nueva imagen para cargar la imagen principal
    const nuevaImagen = new Image();
    nuevaImagen.src = imagenInfo.src;
    nuevaImagen.onload = function() {
        // Mostrar la imagen principal una vez que se ha cargado completamente la nueva imagen
        storyImage.src = nuevaImagen.src;
        storyImage.style.display = 'block';
    };

    document.getElementById('pageTitle').textContent = imagenInfo.title;

    // Mostrar las opciones
    imagenInfo.options.forEach((option, index) => {
        const optionImg = document.createElement('img');
        optionImg.src = option.src;
        optionImg.alt = `Opción ${index + 1}`;
        optionImg.classList.add('option');
        optionImg.setAttribute('data-correct', option.correct);
        optionImg.addEventListener('click', verificarRespuesta);
        optionsContainer.appendChild(optionImg);
    });
}


let cambioHabilitado = true; // Variable para controlar si se puede cambiar de imagen
let respuestaSeleccionada = false; // Variable para verificar si se seleccionó una respuesta

function verificarRespuesta(event) {
    event.stopPropagation(); // Evitar que el evento se propague

    if (!cambioHabilitado || respuestaSeleccionada) {
        return; // Si no se puede cambiar de imagen o ya se seleccionó una respuesta, no hacer nada
    }

    respuestaSeleccionada = true; // Marcar que se ha seleccionado una respuesta

    cambioHabilitado = false; // Deshabilitar el cambio de imagen temporalmente

    const isCorrect = event.target.getAttribute('data-correct') === 'true';
    const notification = document.getElementById('notification');

    if (isCorrect) {
        notification.textContent = '¡Respuesta correcta!';
    } else {
        notification.textContent = 'Respuesta incorrecta.';
    }

    // Mostrar la notificación durante un tiempo y luego borrarla
    setTimeout(() => {
        notification.textContent = '';
    }, 1300); // Duración de la notificación en milisegundos (en este caso, 3 segundos)

    setTimeout(() => {
        cambioHabilitado = true; // Habilitar el cambio de imagen después de un tiempo
        cambiarImagen();
    }, 1300); // Esperar 2 segundos antes de permitir el cambio de imagen
}

function cambiarImagen() {
    if (!respuestaSeleccionada) {
        return; // Si no se ha seleccionado una respuesta, no cambiar de imagen
    }

    indiceActual++;
    respuestaSeleccionada = false; // Restablecer la bandera de respuesta seleccionada
    if (indiceActual === imagenes.length) {
        mostrarFinalizacion();
    } else {
        mostrarImagen(indiceActual);
    }
}

document.getElementById('startButton').addEventListener('click', iniciarPresentacion);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && presentacionIniciada && cambioHabilitado && !respuestaSeleccionada) {
        cambiarImagen();
    }
});
