// IMPORTANTE! SI SE CAMBIA LA RUTA DE LAS IMAGENES, ADEMAS DE CAMBIARLAS EN const imagenes (linea 5)
// HAY QUE VERIFICAR LA RUTA USADA EN LA FUNCION function verificarRespuesta(event) (linea 602)
// DE LO CONTRARIO NO SE GENERARA EL CSV CORRECTAMENTE

const imagenes = [
    {
        src: "imagenes/mcct_target_pr1.png",
        textoDistintivo: "P1",
        item: "",
        options: [
            { src: "imagenes/mcct_comp1_pr1.png", correct: true , item: ""},
            { src: "imagenes/mcct_comp2_pr1.png", correct: false, item: "" },
            { src: "imagenes/mcct_comp3_pr1.png", correct: false, item: "" },
            { src: "imagenes/mcct_comp4_pr1.png", correct: false, item: "" }
        ]
    },
    {
        src: "imagenes/mcct_target_pr2.png",
        textoDistintivo: "P2",
        item: "",
        options: [
            { src: "imagenes/mcct_comp1_pr2.png", correct: false, item: "" },
            { src: "imagenes/mcct_comp2_pr2.png", correct: false, item: "" },
            { src: "imagenes/mcct_comp3_pr2.png", correct: true, item: "" },
            { src: "imagenes/mcct_comp4_pr2.png", correct: false, item: "" }
        ]
    },
    {
        src: "imagenes/mcct_target_pr3.png",
        textoDistintivo: "P3",
        item: "",
        options: [
            { src: "imagenes/mcct_comp1_pr3.png", correct: true, item: "" },
            { src: "imagenes/mcct_comp2_pr3.png", correct: false, item: "" },
            { src: "imagenes/mcct_comp3_pr3.png", correct: false, item: "" },
            { src: "imagenes/mcct_comp4_pr3.png", correct: false, item: "" }
        ]
    },
    {
        src: "imagenes/mcct_target_t1.png",
        textoDistintivo: "E1",
        item: "Piso",
        options: [
            { src: "imagenes/mcct_comp1_t1.png", correct: true, item: "Vaca" },
            { src: "imagenes/mcct_comp2_t1.png", correct: false, item: "Caballo" },
            { src: "imagenes/mcct_comp3_t1.png", correct: false, item: "Chancho" },
            { src: "imagenes/mcct_comp4_t1.png", correct: false, item: "Gallina" }
        ]
    },

    {
        src: "imagenes/mcct_target_t2.png",
        textoDistintivo: "E2",
        item: "Enchufe",
        options: [
            { src: "imagenes/mcct_comp1_t2.png", correct: false, item: "Vela" },
            { src: "imagenes/mcct_comp2_t2.png", correct: false, item: "Linterna" },
            { src: "imagenes/mcct_comp3_t2.png", correct: false, item: "Lampara a gas" },
            { src: "imagenes/mcct_comp4_t2.png", correct: true, item: "Ampolleta" }
        ]
    },

    {
        src: "imagenes/mcct_target_t3.png",
        textoDistintivo: "E3",
        item: "Tren",
        options: [
            { src: "imagenes/mcct_comp1_t3.png", correct: false, item: "Motocicleta" },
            { src: "imagenes/mcct_comp2_t3.png", correct: false, item: "Tractor" },
            { src: "imagenes/mcct_comp3_t3.png", correct: false, item: "Camion" },
            { src: "imagenes/mcct_comp4_t3.png", correct: true, item: "Bus" }
        ]
    },

    {
        src: "imagenes/mcct_target_t4.png",
        textoDistintivo: "E4",
        item: "Naranja",
        options: [
            { src: "imagenes/mcct_comp1_t4.png", correct: true, item: "Vaso de jugo" },
            { src: "imagenes/mcct_comp2_t4.png", correct: false, item: "Botella de agua" },
            { src: "imagenes/mcct_comp3_t4.png", correct: false, item: "Botella de leche" },
            { src: "imagenes/mcct_comp4_t4.png", correct: false, item: "Copa de vino" }
        ]
    },

    {
        src: "imagenes/mcct_target_t5.png",
        textoDistintivo: "E5",
        item: "Caballo",
        options: [
            { src: "imagenes/mcct_comp1_t5.png", correct: false, item: "Carro de supermercado" },
            { src: "imagenes/mcct_comp2_t5.png", correct: false, item: "Coche" },
            { src: "imagenes/mcct_comp3_t5.png", correct: false, item: "Carretilla" },
            { src: "imagenes/mcct_comp4_t5.png", correct: true, item: "Carruaje" }
        ]
    },
    {
        src: "imagenes/mcct_target_t6.png",
        textoDistintivo: "E6",
        item: "Pato",
        options: [
            { src: "imagenes/mcct_comp1_t6.png", correct: false, item: "Montaña" },
            { src: "imagenes/mcct_comp2_t6.png", correct: true, item: "Lago" },
            { src: "imagenes/mcct_comp3_t6.png", correct: false, item: "Desierto" },
            { src: "imagenes/mcct_comp4_t6.png", correct: false, item: "Iceberg" }
        ]
    },
    {
        src: "imagenes/mcct_target_t7.png",
        textoDistintivo: "E7",
        item: "Avion",
        options: [
            { src: "imagenes/mcct_comp1_t7.png", correct: false, item: "Pez" },
            { src: "imagenes/mcct_comp2_t7.png", correct: true, item: "Pajaro" },
            { src: "imagenes/mcct_comp3_t7.png", correct: false, item: "Serpiente" },
            { src: "imagenes/mcct_comp4_t7.png", correct: false, item: "Perro" }
        ]
    },
    {
        src: "imagenes/mcct_target_t8.png",
        textoDistintivo: "E8",
        item: "Canasta",
        options: [
            { src: "imagenes/mcct_comp1_t8.png", correct: false, item: "Fusilli" },
            { src: "imagenes/mcct_comp2_t8.png", correct: false, item: "Hamburguesa" },
            { src: "imagenes/mcct_comp3_t8.png", correct: true, item: "Huevos" },
            { src: "imagenes/mcct_comp4_t8.png", correct: false, item: "Helado" }
        ]
    },
    {
        src: "imagenes/mcct_target_t9.png",
        textoDistintivo: "E9",
        item: "Cocodrilo",
        options: [
            { src: "imagenes/mcct_comp1_t9.png", correct: false, item: "Canasta" },
            { src: "imagenes/mcct_comp2_t9.png", correct: false, item: "Maleta" },
            { src: "imagenes/mcct_comp3_t9.png", correct: true, item: "Cartera" },
            { src: "imagenes/mcct_comp4_t9.png", correct: false, item: "Bolsa" }
        ]
    },
    {
        src: "imagenes/mcct_target_t10.png",
        textoDistintivo: "E10",
        item: "Rana",
        options: [
            { src: "imagenes/mcct_comp1_t10.png", correct: false, item: "Girasol" },
            { src: "imagenes/mcct_comp2_t10.png", correct: true, item: "Nenufar" },
            { src: "imagenes/mcct_comp3_t10.png", correct: false, item: "Narciso" },
            { src: "imagenes/mcct_comp4_t10.png", correct: false, item: "Rosa" }
        ]
    },
    {
        src: "imagenes/mcct_target_t11.png",
        textoDistintivo: "E11",
        item: "Cepillo de Dientes",
        options: [
            { src: "imagenes/mcct_comp1_t11.png", correct: false, item: "Nariz" },
            { src: "imagenes/mcct_comp2_t11.png", correct: true, item: "Boca" },
            { src: "imagenes/mcct_comp3_t11.png", correct: false, item: "Oreja" },
            { src: "imagenes/mcct_comp4_t11.png", correct: false, item: "Ojo" }
        ]
    },
    {
        src: "imagenes/mcct_target_t12.png",
        textoDistintivo: "E12",
        item: "Trineo",
        options: [
            { src: "imagenes/mcct_comp1_t12.png", correct: false, item: "Raqueta" },
            { src: "imagenes/mcct_comp2_t12.png", correct: false, item: "Paraguas" },
            { src: "imagenes/mcct_comp3_t12.png", correct: false, item: "Palos de golf" },
            { src: "imagenes/mcct_comp4_t12.png", correct: true, item: "Bastones de esqui" }
        ]
    },
    {
        src: "imagenes/mcct_target_t13.png",
        textoDistintivo: "E13",
        item: "Buho",
        options: [
            { src: "imagenes/mcct_comp1_t13.png", correct: false, item: "Pato" },
            { src: "imagenes/mcct_comp2_t13.png", correct: false, item: "Pavo" },
            { src: "imagenes/mcct_comp3_t13.png", correct: false, item: "Pinguino" },
            { src: "imagenes/mcct_comp4_t13.png", correct: true, item: "Murcielago" }
        ]
    },
    {
        src: "imagenes/mcct_target_t14.png",
        textoDistintivo: "E14",
        item: "Tijeras",
        options: [
            { src: "imagenes/mcct_comp1_t14.png", correct: false, item: "Alambre pua" },
            { src: "imagenes/mcct_comp2_t14.png", correct: false, item: "Cuerda" },
            { src: "imagenes/mcct_comp3_t14.png", correct: true, item: "Papel" },
            { src: "imagenes/mcct_comp4_t14.png", correct: false, item: "Madera" }
        ]
    },
    {
        src: "imagenes/mcct_target_t15.png",
        textoDistintivo: "E15",
        item: "Pinguino",
        options: [
            { src: "imagenes/mcct_comp1_t15.png", correct: false, item: "Desierto" },
            { src: "imagenes/mcct_comp2_t15.png", correct: false, item: "Lago" },
            { src: "imagenes/mcct_comp3_t15.png", correct: true, item: "Iceberg" },
            { src: "imagenes/mcct_comp4_t15.png", correct: false, item: "Playa" }
        ]
    },
    {
        src: "imagenes/mcct_target_t16.png",
        textoDistintivo: "E16",
        item: "Maleta",
        options: [
            { src: "imagenes/mcct_comp1_t16.png", correct: true, item: "Silla de playa" },
            { src: "imagenes/mcct_comp2_t16.png", correct: false, item: "Mecedora" },
            { src: "imagenes/mcct_comp3_t16.png", correct: false, item: "Silla" },
            { src: "imagenes/mcct_comp4_t16.png", correct: false, item: "Sillon" }
        ]
    },
    {
        src: "imagenes/mcct_target_t17.png",
        textoDistintivo: "E17",
        item: "Camello",
        options: [
            { src: "imagenes/mcct_comp1_t17.png", correct: false, item: "Arbol" },
            { src: "imagenes/mcct_comp2_t17.png", correct: false, item: "Girasol" },
            { src: "imagenes/mcct_comp3_t17.png", correct: true, item: "Cactus" },
            { src: "imagenes/mcct_comp4_t17.png", correct: false, item: "Rosa" }
        ]
    },
    {
        src: "imagenes/mcct_target_t18.png",
        textoDistintivo: "E18",
        item: "Llave",
        options: [
            { src: "imagenes/mcct_comp1_t18.png", correct: false, item: "Ventana" },
            { src: "imagenes/mcct_comp2_t18.png", correct: false, item: "Mesa" },
            { src: "imagenes/mcct_comp3_t18.png", correct: true, item: "Puerta" },
            { src: "imagenes/mcct_comp4_t18.png", correct: false, item: "Espejo" }
        ]
    },
    {
        src: "imagenes/mcct_target_t19.png",
        textoDistintivo: "E19",
        item: "Manzana",
        options: [
            { src: "imagenes/mcct_comp1_t19.png", correct: true, item: "Gusano" },
            { src: "imagenes/mcct_comp2_t19.png", correct: false, item: "Hormiga" },
            { src: "imagenes/mcct_comp3_t19.png", correct: false, item: "Escarabajo" },
            { src: "imagenes/mcct_comp4_t19.png", correct: false, item: "Mosca" }
        ]
    },
    {
        src: "imagenes/mcct_target_t20.png",
        textoDistintivo: "E20",
        item: "Basurero",
        options: [
            { src: "imagenes/mcct_comp1_t20.png", correct: false, item: "Brocha" },
            { src: "imagenes/mcct_comp2_t20.png", correct: false, item: "Cepillo de pelo" },
            { src: "imagenes/mcct_comp3_t20.png", correct: false, item: "Cepillo de dientes" },
            { src: "imagenes/mcct_comp4_t20.png", correct: true, item: "Escoba" }
        ]
    },
    {
        src: "imagenes/mcct_target_t21.png",
        textoDistintivo: "E21",
        item: "Cepillo",
        options: [
            { src: "imagenes/mcct_comp1_t21.png", correct: false, item: "Cinta adhesiva" },
            { src: "imagenes/mcct_comp2_t21.png", correct: true, item: "Cinta de pelo" },
            { src: "imagenes/mcct_comp3_t21.png", correct: false, item: "Hilo" },
            { src: "imagenes/mcct_comp4_t21.png", correct: false, item: "Alambre pua" }
        ]
    },
    {
        src: "imagenes/mcct_target_t22.png",
        textoDistintivo: "E22",
        item: "Hacha",
        options: [
            { src: "imagenes/mcct_comp1_t22.png", correct: false, item: "Pasto" },
            { src: "imagenes/mcct_comp2_t22.png", correct: true, item: "Arbol" },
            { src: "imagenes/mcct_comp3_t22.png", correct: false, item: "Flor" },
            { src: "imagenes/mcct_comp4_t22.png", correct: false, item: "Raices" }
        ]
    },
    {
        src: "imagenes/mcct_target_t23.png",
        textoDistintivo: "E23",
        item: "Serrucho",
        options: [
            { src: "imagenes/mcct_comp1_t23.png", correct: true, item: "Madera" },
            { src: "imagenes/mcct_comp2_t23.png", correct: false, item: "Alambre pua" },
            { src: "imagenes/mcct_comp3_t23.png", correct: false, item: "Cuerda" },
            { src: "imagenes/mcct_comp4_t23.png", correct: false, item: "Papel" }
        ]
    },
    {
        src: "imagenes/mcct_target_t24.png",
        textoDistintivo: "E24",
        item: "Aguila",
        options: [
            { src: "imagenes/mcct_comp1_t24.png", correct: true, item: "Montaña" },
            { src: "imagenes/mcct_comp2_t24.png", correct: false, item: "Playa" },
            { src: "imagenes/mcct_comp3_t24.png", correct: false, item: "Rio" },
            { src: "imagenes/mcct_comp4_t24.png", correct: false, item: "Cascada" }
        ]
    },
    {
        src: "imagenes/mcct_target_t25.png",
        textoDistintivo: "E25",
        item: "Rinoceronte",
        options: [
            { src: "imagenes/mcct_comp1_t25.png", correct: true, item: "Leon" },
            { src: "imagenes/mcct_comp2_t25.png", correct: false, item: "Gato" },
            { src: "imagenes/mcct_comp3_t25.png", correct: false, item: "Perro" },
            { src: "imagenes/mcct_comp4_t25.png", correct: false, item: "Zorro" }
        ]
    },
    {
        src: "imagenes/mcct_target_t26.png",
        textoDistintivo: "E26",
        item: "Gato",
        options: [
            { src: "imagenes/mcct_comp1_t26.png", correct: true, item: "Raton" },
            { src: "imagenes/mcct_comp2_t26.png", correct: false, item: "Topo" },
            { src: "imagenes/mcct_comp3_t26.png", correct: false, item: "Conejo" },
            { src: "imagenes/mcct_comp4_t26.png", correct: false, item: "Huron" }
        ]
    },
    {
        src: "imagenes/mcct_target_t27.png",
        textoDistintivo: "E27",
        item: "Motocicleta",
        options: [
            { src: "imagenes/mcct_comp1_t27.png", correct: false, item: "Impermeable" },
            { src: "imagenes/mcct_comp2_t27.png", correct: false, item: "Abrigo" },
            { src: "imagenes/mcct_comp3_t27.png", correct: false, item: "Blazer" },
            { src: "imagenes/mcct_comp4_t27.png", correct: true, item: "Chaqueta de cuero" }
        ]
    },
    {
        src: "imagenes/mcct_target_t28.png",
        textoDistintivo: "E28",
        item: "Destornillador",
        options: [
            { src: "imagenes/mcct_comp1_t28.png", correct: false, item: "Serrucho" },
            { src: "imagenes/mcct_comp2_t28.png", correct: false, item: "Avion" },
            { src: "imagenes/mcct_comp3_t28.png", correct: false, item: "Brocha" },
            { src: "imagenes/mcct_comp4_t28.png", correct: true, item: "Taladro" }
        ]
    },
    {
        src: "imagenes/mcct_target_t29.png",
        textoDistintivo: "E29",
        item: "Tomate",
        options: [
            { src: "imagenes/mcct_comp1_t29.png", correct: false, item: "Coliflor" },
            { src: "imagenes/mcct_comp2_t29.png", correct: false, item: "Zanahoria" },
            { src: "imagenes/mcct_comp3_t29.png", correct: false, item: "Brocoli" },
            { src: "imagenes/mcct_comp4_t29.png", correct: true, item: "Lechuga" }
        ]
    },
    {
        src: "imagenes/mcct_target_t30.png",
        textoDistintivo: "E30",
        item: "Tortuga",
        options: [
            { src: "imagenes/mcct_comp1_t30.png", correct: true, item: "20" },
            { src: "imagenes/mcct_comp2_t30.png", correct: false, item: "50" },
            { src: "imagenes/mcct_comp3_t30.png", correct: false, item: "70" },
            { src: "imagenes/mcct_comp4_t30.png", correct: false, item: "30" }
        ]
    },
    {
        src: "imagenes/mcct_target_t31.png",
        textoDistintivo: "E31",
        item: "Pera",
        options: [
            { src: "imagenes/mcct_comp1_t31.png", correct: false, item: "Raices" },
            { src: "imagenes/mcct_comp2_t31.png", correct: true, item: "Arbol" },
            { src: "imagenes/mcct_comp3_t31.png", correct: false, item: "Flor" },
            { src: "imagenes/mcct_comp4_t31.png", correct: false, item: "Pasto" }
        ]
    },
    {
        src: "imagenes/mcct_target_t32.png",
        textoDistintivo: "E32",
        item: "Ardilla",
        options: [
            { src: "imagenes/mcct_comp1_t32.png", correct: false, item: "Zanahoria" },
            { src: "imagenes/mcct_comp2_t32.png", correct: true, item: "Bellota" },
            { src: "imagenes/mcct_comp3_t32.png", correct: false, item: "Pasto" },
            { src: "imagenes/mcct_comp4_t32.png", correct: false, item: "Choclo" }
        ]
    },

];


let indiceActual = 0;
let presentacionIniciada = false;
let interaccionHabilitada = false;
let respuestasSeleccionadas = [];
const fullscreenButton = document.getElementById('fullscreenButton');
const nextButton = document.getElementById('nextButton');
let respuestaSeleccionada = false; // Variable para verificar si se seleccionó una respuesta
let respuesta = {}; // Variable para almacenar la respuesta seleccionada
let startTime;
let endTime;
let startTimeE;
let endTimeE;
let timer;
let milliseconds = 0;

function requestFullscreen() {
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
}

fullscreenButton.addEventListener('click', requestFullscreen);

function mostrarFinalizacion() {
    const imageContainer = document.getElementById('imageContainer');

    imageContainer.innerHTML = '<h1> ¡Ha completado esta tarea con éxito! </h1> <br> <h1> ¡Muchas gracias!</h1>';

    // Ajustes de estilo
    imageContainer.style.textAlign = 'center';
    imageContainer.style.fontSize = '37px';
    imageContainer.style.display = 'flex';
    imageContainer.style.alignItems = 'center'; // Centra el texto verticalmente
    imageContainer.style.justifyContent = 'center'; // Centra el texto horizontalmente
    imageContainer.style.flexDirection = 'column'; // Asegura que el contenido esté en una columna
    imageContainer.style.height = '100vh'; // Asegura que el contenedor ocupe toda la altura de la pantalla
    imageContainer.style.width = 'auto';
    fullscreenButton.style.display = 'none';

    document.getElementById('nextButton').style.display = 'none'; // Ocultar el botón "Next"
    const previousImageText = document.querySelector('.imageText');
    if (previousImageText) {
        previousImageText.remove();
    }

    downloadResultsAsZip(respuestasSeleccionadas, startTime, selectedHand, participantID)
}

function iniciarPresentacion() {
    startTime = new Date(); // Registrar la hora de inicio

    presentacionIniciada = true;
    const imageContainer = document.getElementById('imageContainer');
    const instructionText = document.getElementById('instructionText');
    const startButton = document.getElementById('startButton');
    const fullscreenButton = document.getElementById('fullscreenButton');

    imageContainer.style.display = 'block';
    instructionText.style.display = 'none';
    startButton.style.display = 'none';
    nextButton.style.display = 'block'; // Mostrar el botón "Next"
    fullscreenButton.style.display = 'none'; // Ocultar el botón al iniciar la presentación

    document.getElementById('instructionAudio').pause();

    interaccionHabilitada = true;
    mostrarImagen(indiceActual);
}

function mostrarImagen(indice) {
    const imagenInfo = imagenes[indice];
    const storyImage = document.getElementById('storyImage');
    const optionsContainer = document.getElementById('optionsContainer');

    // Limpiar contenedor de opciones antes de mostrar nuevas imágenes
    optionsContainer.innerHTML = '';

    // Ocultar la imagen principal antes de cargarla
    storyImage.style.opacity = '0';

    // Eliminar el texto distintivo anterior si existe
    const previousImageText = document.querySelector('.imageText');
    if (previousImageText) {
        previousImageText.remove();
    }

    // Crear un preloader para la imagen principal
    const preloader = new Image();
    preloader.onload = function () {
        // Asignar la nueva imagen y mostrarla
        storyImage.src = preloader.src;

        // Iniciar todas las transiciones de opacidad simultáneamente
        setTimeout(() => {
            storyImage.style.opacity = '1';
            agregarTextoYOpciones(imagenInfo);
        }, 0); // Sincronizar el tiempo según sea necesario
    };
    preloader.src = imagenInfo.src; // Iniciar la carga de la imagen
}

function agregarTextoYOpciones(imagenInfo) {
    const storyImage = document.getElementById('storyImage');
    const optionsContainer = document.getElementById('optionsContainer');

    // Agregar el texto distintivo
    const imageText = document.createElement('div');
    imageText.classList.add('imageText');
    imageText.textContent = imagenInfo.textoDistintivo;

    // Mostrar el texto distintivo con una transición suave de opacidad
    imageText.style.opacity = '0';
    document.body.appendChild(imageText); // Añadir el texto distintivo al body

    // Mostrar las opciones
    imagenInfo.options.forEach((option, index) => {
        const optionImg = document.createElement('img');
        optionImg.src = option.src;
        optionImg.alt = `Opción ${index + 1}`;
        optionImg.classList.add('option');
        optionImg.setAttribute('data-correct', option.correct);
        optionImg.addEventListener('click', verificarRespuesta);
        optionsContainer.appendChild(optionImg);

        // Inicialmente ocultar cada opción
        optionImg.style.opacity = '0';
    });

    // Iniciar las transiciones de opacidad simultáneamente
    setTimeout(() => {
        imageText.style.opacity = '1';
        const options = optionsContainer.querySelectorAll('.option');
        options.forEach(option => {
            option.style.opacity = '1';
        });
    }, 0); // Ajusta el tiempo según sea necesario
}


function verificarRespuesta(event) {
    event.stopPropagation();

    const optionImg = event.target;
    const esCorrecta = optionImg.getAttribute('data-correct') === 'true';

    // Deseleccionar todas las opciones previamente seleccionadas
    const opciones = document.querySelectorAll('.option');
    opciones.forEach(opcion => opcion.classList.remove('selected'));

    // Marcar la opción actual como seleccionada
    optionImg.classList.add('selected');

    respuesta = {
        textoDistintivo: imagenes[indiceActual].textoDistintivo,
        imagen: imagenes[indiceActual].item,
        respuestaCorrecta: imagenes[indiceActual].options.find(option => option.correct).item,
        respuestaSeleccion: imagenes[indiceActual].options.find(option => option.src === "imagenes"+optionImg.src.split('imagenes')[1]).item,
        esCorrecta: esCorrecta,
    };

    respuestaSeleccionada = true;
}

// Al hacer clic en "Next", avanzar a la siguiente imagen
nextButton.addEventListener('click', function () {
    if(respuestaSeleccionada){
        endTimeE = new Date(); // Registrar la hora de finalización
        respuesta['tiempoDedicado'] = endTimeE - startTimeE;
        respuestasSeleccionadas.push(respuesta);
        startTimeE = new Date(); // Registrar la hora de inicio
        cambioHabilitado = true; // Permitir cambiar de imagen
        cambiarImagen();
    } else {
        endTimeE = new Date(); // Registrar la hora de finalización
        respuesta = {
            textoDistintivo: imagenes[indiceActual].textoDistintivo,
            imagen: imagenes[indiceActual].item,
            respuestaCorrecta: imagenes[indiceActual].options.find(option => option.correct).item,
            respuestaSeleccion: "",
            esCorrecta: 0,
        };
        respuesta['tiempoDedicado'] = endTimeE - startTimeE;
        respuestasSeleccionadas.push(respuesta);
        startTimeE = new Date(); // Registrar la hora de inicio
        cambioHabilitado = true; // Permitir cambiar de imagen
        cambiarImagen();
    }
});

// Agregar evento click a todas las opciones
const opciones = document.querySelectorAll('.option');
opciones.forEach(opcion => {
    opcion.addEventListener('click', verificarRespuesta);
});

function cambiarImagen() {
    // if (!respuestaSeleccionada) {
    //     return; // Si no se ha seleccionado una respuesta, no cambiar de imagen
    // }

    indiceActual++;
    respuestaSeleccionada = false; // Restablecer la bandera de respuesta seleccionada
    if (indiceActual === imagenes.length) {
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.style.display = 'none';
        document.getElementById('nextButton').style.display = 'none'; // Ocultar el botón "Next"
        const previousImageText = document.querySelector('.imageText');
        if (previousImageText) {
            previousImageText.remove();
        }
        showHandSelection();
    } else {
        mostrarImagen(indiceActual);
    }
}

document.getElementById('startButton').addEventListener('click', iniciarPresentacion);

// SELECCION DE MANO JS

const selectHandContainer = document.getElementById("selectHand");
const handButton = document.getElementById("handButton");
const handInputs = document.getElementsByName('hand');

// Variable con la mano seleccionada
let selectedHand = "";
let participantID = 0;

// Funcion para mostrar la pantalla de seleccion de mano
function showHandSelection() {
    document.getElementById("preEnd").style.display = 'block';
    selectHandContainer.style.display = "block";
}

// Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
// En este caso fue mostrarFinalizacion()
function confirmHandSelection() {
    document.getElementById("preEnd").style.display = 'none';
    selectHandContainer.style.display = "none";
    mostrarFinalizacion();
    handButton.style.display = "none";
}

// Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
handInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        validateInputs();
        selectedHand = e.target.value;
    });
});

document.getElementById('participantID').addEventListener('input', validateInputs);

document.getElementById('handButton').addEventListener('click', confirmHandSelection);

function validateInputs() {
    participantID = document.getElementById('participantID').value;
    selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
    if (participantID && selectedHand) {
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

  function generateCSV(results, participantID) {
    // Crear el encabezado del CSV
    let csvContent = "ensayo;item;rp_c;rp;prec;tr\n";

    // Recorrer las respuestas seleccionadas
    results.forEach(respuesta => {
        if (respuesta.textoDistintivo !== 'P1' && respuesta.textoDistintivo !== 'P2' && respuesta.textoDistintivo !== 'P3') {
            // Construir una línea del CSV con los datos de la respuesta
            const lineaCSV = `${respuesta.textoDistintivo};${respuesta.imagen};${respuesta.respuestaCorrecta};${respuesta.respuestaSeleccion};${respuesta.esCorrecta ? 1 : 0};${respuesta.tiempoDedicado}\n`;
            // Agregar la línea al contenido del CSV
            csvContent += lineaCSV;
        }
    });
    return {
      content: csvContent,
      filename: `${participantID}_modified_camel_and_cactus_${getCurrentDate()}.csv`
    };
  }

  function generateTxt(startTimeTotal, selectedHand, participantID) {
    const txtContent = "Tiempo total(s): " + (new Date() - startTimeTotal) / 1000 + "\n"
      + "Mano Utilizada: " + selectedHand;
    return {
      content: txtContent,
      filename: `${participantID}_modified_camel_and_cactus_${getCurrentDate()}.txt`
    };
  }

  async function downloadZip(csvFile, txtFile, participantID) {
    const zip = new JSZip();
    zip.file(csvFile.filename, csvFile.content);
    zip.file(txtFile.filename, txtFile.content);
  
    const zipContent = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipContent);
    link.setAttribute("download", `${participantID}_modified_camel_and_cactus_${getCurrentDate()}.zip`);
    document.body.appendChild(link);
    link.click();
  }
  
  async function downloadResultsAsZip(results, startTimeTotal, selectedHand, participantID) {
    const csvFile = generateCSV(results, participantID);
    const txtFile = generateTxt(startTimeTotal, selectedHand, participantID);
    await downloadZip(csvFile, txtFile, participantID);
  }