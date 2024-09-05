document.getElementById('next-button').addEventListener('click', cambiarImagen);

const imagenes = [
    {
        src: "Emociones/Alegria/alegria1.png",
        emocionCorrecta: "Alegria",
        numero: 'E1'
    },
    {
        src: "Emociones/Miedo/miedo2.png",
        emocionCorrecta: "Miedo",
        numero: 'E2'
    },
    {
        src: "Emociones/Asco/asco3.png",
        emocionCorrecta: "Asco",
        numero: 'E3'
    },
    {
        src: "Emociones/Neutro/neutro4.png",
        emocionCorrecta: "Neutro",
        numero: 'E4'
    },
    {
        src: "Emociones/Enojo/enojo5.png",
        emocionCorrecta: "Enojo",
        numero: 'E5'
    },
    {
        src: "Emociones/Sorpresa/sorpresa6.png",
        emocionCorrecta: "Sorpresa",
        numero: 'E6'
    },
    {
        src: "Emociones/Tristeza/tristeza7.png",
        emocionCorrecta: "Tristeza",
        numero: 'E7'
    },
    {
        src: "Emociones/Miedo/miedo8.png",
        emocionCorrecta: "Miedo",
        numero: 'E8'
    },
    {
        src: "Emociones/Enojo/enojo9.png",
        emocionCorrecta: "Enojo",
        numero: 'E9'
    },
    {
        src: "Emociones/Asco/asco10.png",
        emocionCorrecta: "Asco",
        numero: 'E10'
    },
    {
        src: "Emociones/Tristeza/tristeza11.png",
        emocionCorrecta: "Tristeza",
        numero: 'E11'
    },
    {
        src: "Emociones/Alegria/alegria12.png",
        emocionCorrecta: "Alegria",
        numero: 'E12'
    },
    {
        src: "Emociones/Neutro/neutro13.png",
        emocionCorrecta: "Neutro",
        numero: 'E13'
    },
    {
        src: "Emociones/Sorpresa/sorpresa14.png",
        emocionCorrecta: "Sorpresa",
        numero: 'E14'
    },
    {
        src: "Emociones/Tristeza/tristeza15.png",
        emocionCorrecta: "Tristeza",
        numero: 'E15'
    },
    {
        src: "Emociones/Sorpresa/sorpresa16.png",
        emocionCorrecta: "Sorpresa",
        numero: 'E16'
    },
    {
        src: "Emociones/Neutro/neutro17.png",
        emocionCorrecta: "Neutro",
        numero: 'E17'
    },
    {
        src: "Emociones/Alegria/alegria18.png",
        emocionCorrecta: "Alegria",
        numero: 'E18'
    },
    {
        src: "Emociones/Miedo/miedo19.png",
        emocionCorrecta: "Miedo",
        numero: 'E19'
    },
    {
        src: "Emociones/Enojo/enojo20.png",
        emocionCorrecta: "Enojo",
        numero: 'E20'
    },
    {
        src: "Emociones/Asco/asco21.png",
        emocionCorrecta: "Asco",
        numero: 'E21'
    },
    {
        src: "Emociones/Sorpresa/sorpresa22.png",
        emocionCorrecta: "Sorpresa",
        numero: 'E22'
    },
    {
        src: "Emociones/Asco/asco23.png",
        emocionCorrecta: "Asco",
        numero: 'E23'
    },
    {
        src: "Emociones/Alegria/alegria24.png",
        emocionCorrecta: "Alegria",
        numero: 'E24'
    },
    {
        src: "Emociones/Tristeza/tristeza25.png",
        emocionCorrecta: "Tristeza",
        numero: 'E25'
    },
    {
        src: "Emociones/Neutro/neutro26.png",
        emocionCorrecta: "Neutro",
        numero: 'E26'
    },
    {
        src: "Emociones/Miedo/miedo27.png",
        emocionCorrecta: "Miedo",
        numero: 'E27'
    },
    {
        src: "Emociones/Enojo/enojo28.png",
        emocionCorrecta: "Enojo",
        numero: 'E28'
    },
    {
        src: "Emociones/Enojo/enojo29.png",
        emocionCorrecta: "Enojo",
        numero: 'E29'
    },
    {
        src: "Emociones/Miedo/miedo30.png",
        emocionCorrecta: "Miedo",
        numero: 'E30'
    },
    {
        src: "Emociones/Tristeza/tristeza31.png",
        emocionCorrecta: "Tristeza",
        numero: 'E31'
    },
    {
        src: "Emociones/Sorpresa/sorpresa32.png",
        emocionCorrecta: "Sorpresa",
        numero: 'E32'
    },
    {
        src: "Emociones/Alegria/alegria33.png",
        emocionCorrecta: "Alegria",
        numero: 'E33'
    },
    {
        src: "Emociones/Asco/asco34.png",
        emocionCorrecta: "Asco",
        numero: 'E34'
    },
    {
        src: "Emociones/Neutro/neutro35.png",
        emocionCorrecta: "Neutro",
        numero: 'E35'
    },

];

let indiceActual = 0;
let temporizador = null;
let presentacionIniciada = false;
const emocionesSeleccionadas = [];
// const emocionesDisponibles = ['Alegria', 'Asco', 'Enojo', 'Miedo', 'Neutro', 'Sorpresa', 'Tristeza'];
const emocionesDisponibles = ['Alegria', 'Sorpresa', 'Neutro', 'Tristeza', 'Miedo', 'Asco', 'Enojo'];
const tiemposRespuesta = [];
let iniciaResp = null;
let tiempoInicio = null;
let tiempoFin = null;

function mostrarEmociones() {
    const listaEmociones = document.getElementById('emotionsList');
    listaEmociones.innerHTML = ''; // Limpiar la lista antes de agregar las emociones

    emocionesDisponibles.forEach(emocion => {
        const listItem = document.createElement('li');
        listItem.textContent = emocion;
        listItem.style.cursor = 'pointer';
        listItem.addEventListener('click', function () {
            guardarSeleccion(emocion);
            document.getElementById('next-button').style.display = 'block'; // Mostrar el botón "next-button"

            // Remover la clase 'selected' de todos los elementos
            const items = listaEmociones.getElementsByTagName('li');
            for (let item of items) {
                item.classList.remove('selected');
            }

            // Agregar la clase 'selected' al elemento clickeado
            listItem.classList.add('selected');

            // Calcular el tiempo de respuesta
            let ahora = new Date();
            time = responseTime(ahora);
            tiemposRespuesta[indiceActual] = time;
            console.log(`Tiempo de respuesta: ${time} segundos.`);

            emocionesSeleccionadas.forEach((emocion, index) => {
                console.log(`Ensayo ${index + 1}: ${emocion}`);
            });
        });
        listaEmociones.appendChild(listItem);
    });
}

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

fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
        fullscreenButton.style.backgroundImage = "url('imagenes/minimize.png')"; // Cambiar la imagen del botón a 'minimize'
        document.documentElement.requestFullscreen();
    } else if (document.fullscreenElement) {
        fullscreenButton.style.backgroundImage = "url('imagenes/full-screen.png')"; // Cambiar la imagen del botón a 'full-screen'
        document.exitFullscreen();
    } else {
        console.log('El modo de pantalla completa no es soportado por tu navegador.');
    }
});

function mostrarFinalizacion() {
    // const imagenNumero = document.getElementById('imagenNumero');
    document.getElementById('next-button').style.display = 'none';
    clearTimeout(temporizador);
    document.getElementById('fin').style.display = 'block'; // Ocultar el botón "next-button"

    // document.getElementById('fullscreenButton').style.display = 'none';

    tiempoFin = new Date(); // Guardar el tiempo de fin al finalizar la tarea
    const tiempoTranscurrido = (tiempoFin - tiempoInicio) / 1000; // Calcular el tiempo transcurrido de milisegundos a segundos

    console.log(`Tarea finalizada. Tiempo transcurrido: ${tiempoTranscurrido} segundos.`);

    // Aquí podrías hacer lo que necesites con el tiempo transcurrido, como guardar en un archivo CSV, etc.

    generarCSV(tiempoTranscurrido, tiemposRespuesta);
}

function iniciarPresentacion() {
    presentacionIniciada = true;
    const startButton = document.getElementById('startButton');
    const imageContainer = document.getElementById('imageContainer');
    const next_button = document.getElementById('next-button');
    const instructionText = document.getElementById('instructionText');
    const imagenNumero = document.getElementById('imagenNumero');
    document.getElementById('next-button').style.display = 'none';
    imagenNumero.style.display = 'none';
    imageContainer.style.display = 'none';
    startButton.style.display = 'none';
    startButton.addEventListener('click', () => {
        document.getElementById('instructionAudio').pause();
        imagenNumero.style.display = 'block';
        imageContainer.style.display = 'block';
        next_button.style.display = 'block';
        instructionText.style.display = 'none';
        startButton.style.display = 'none';
        mostrarImagen(indiceActual);
        mostrarEmociones();
        iniciaResp = new Date(); // Guardar el tiempo de inicio al iniciar la tarea
        reiniciarTemporizador();
        tiempoInicio = new Date(); // Guardar el tiempo de inicio al iniciar la tarea
    });
    if (imagenes.length > 0) {
        startButton.style.display = 'block';
    }
}

function guardarSeleccion(emocion) {
    emocionesSeleccionadas[indiceActual] = emocion;
}

function cambiarImagen() {
    document.getElementById('next-button').style.display = 'block'; // Ocultar el botón "next-button"
    indiceActual++;
    if (indiceActual === imagenes.length) {
        document.getElementById('fin').style.display = 'block'; // Ocultar el botón "next-button"
        showHandSelection();
        // mostrarFinalizacion();
    } else {
        mostrarImagen(indiceActual);
        iniciaResp = new Date(); // Guardar el tiempo de inicio al cambiar
        reiniciarTemporizador();
        mostrarEmociones();

        // Remover la clase 'selected' de todos los elementos
        const listaEmociones = document.getElementById('emotionsList');
        const items = listaEmociones.getElementsByTagName('li');
        for (let item of items) {
            item.classList.remove('selected');
        }
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Obtener el id_participante de la URL
const idParticipante = getQueryParam('id_participante');
function generarCSV(tiempoTranscurrido, tiemposRespuesta) {
    const fechaActual = new Date();
    const options = { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' };
    const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
    const [day, month, year] = fechaHoraChilena.split('-');
    const fechaFormateada = `${day}_${month}_${year}`;

    const csvData = [['Trial', 'CorrResp', 'PartResp', 'Acc', 'RT']];

    imagenes.forEach((img, index) => {
        const numeroImagen = img.numero;
        const emocionCorrecta = img.emocionCorrecta;
        const emocionSeleccionada = emocionesSeleccionadas[index];
        const response = tiemposRespuesta[index];
        const precision = emocionSeleccionada === emocionCorrecta ? 1 : 0;

        csvData.push([numeroImagen, emocionCorrecta, emocionSeleccionada, precision, response]);
    });

    const csvContent = csvData.map(row => row.join(';')).join('\n');
    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // const txtContent = `TotTime: ${tiempoTranscurrido}\nHand: ${selectedHand}`;
    const txtContent = [['TotTime', 'Hand'], [tiempoTranscurrido, selectedHand]].map(row => row.join(';')).join('\n');
    const txtBlob = new Blob([txtContent], { type: 'text/csv;charset=utf-8;' });

    const zip = new JSZip();
    zip.file(`${idParticipante}_FacialEmotion_${fechaFormateada}.csv`, csvBlob);
    zip.file(`${idParticipante}_FacialEmotion_TH_${fechaFormateada}.csv`, txtBlob);

    zip.generateAsync({ type: "blob" })
        .then(content => {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const zipFilename = `${idParticipante}_FacialEmotion_${fechaFormateada}.zip`;
                const url = URL.createObjectURL(content);
                link.setAttribute('href', url);
                link.setAttribute('download', zipFilename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.close();
            }
        })
        .catch(err => {
            console.error("Error generando el archivo ZIP:", err);
        });
}

function reiniciarTemporizador() {
    console.log('Reiniciando temporizador...');
    const arrow = document.getElementById('next-button');
    arrow.style.backgroundImage = "url('imagenes/flecha3.png')";

    clearTimeout(temporizador);
    temporizador = setTimeout(arrowToRed, 12000); // Cambia después de 12 segundos
}

function responseTime(ahora) {
    return (ahora - iniciaResp); // Calcular el tiempo transcurrido en milisegundos
}

function arrowToRed() {
    const arrow = document.getElementById('next-button');
    arrow.style.backgroundImage = "url('imagenes/flecha4.png')";

}

function mostrarImagen(indice) {
    const imagenData = imagenes[indice];
    document.getElementById('imagenNumero').textContent = imagenData.numero;
    document.getElementById('emotionImage').src = imagenData.src;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && presentacionIniciada) {
        cambiarImagen();
    }
});

window.onload = function () {
    document.getElementById('next-button').style.display = 'block'; // Ocultar el botón "next-button" al cargar la página
    iniciarPresentacion();
};

// SELECCION DE MANO JS

const selectHandContainer = document.getElementById("selectHand");
const handButton = document.getElementById("handButton");
const handInputs = document.getElementsByName('hand');

// Variable con la mano seleccionada
let selectedHand = "";

// Funcion para mostrar la pantalla de seleccion de mano
function showHandSelection() {
    const imagenNumero = document.getElementById('imagenNumero');
    imagenNumero.style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('fullscreenButton').style.display = 'none';
    document.getElementById('imageContainer').style.display = 'none';
    document.getElementById('emotionsList').style.display = 'none';
    selectHandContainer.style.display = "block";
}

// Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
// En este caso fue mostrarFinalizacion()

function validateInputs() {
    selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
    
    if (selectedHand) {
        handButton.style.display = 'block';
    } 
}

// onclick="confirmHandSelection()"
document.getElementById('handButton').addEventListener('click', confirmHandSelection);

function confirmHandSelection() {
    console.log('holi holi holi'+selectedHand);
    selectHandContainer.style.display = "none";
    handButton.style.display = "none";
    document.getElementById('next-button').style.display = 'block';
    document.getElementById('fin').style.display = 'none';
    mostrarFinalizacion();
}

// Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
handInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        // handButton.style.display = "block";
        validateInputs();
        selectedHand = e.target.value;
    });
  });