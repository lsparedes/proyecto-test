document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('instrucciones').pause();
    document.getElementById('start-screen').style.display = 'none';
    startTime = new Date(); // Registrar el tiempo de inicio del test
    showNextImage();
});

document.getElementById('submit-btn').addEventListener('click', submitAnswer);
document.getElementById('next-button').addEventListener('click', () => {
    submitAnswer();
    showNextImage();
});

const images = [
    { src: "img/P1.png", title: 'P1', answer: '1' },
    { src: "img/P2.png", title: 'P2', answer: '5' },
    { src: "img/1.png", title: 'E1', answer: '7' },
    { src: "img/2.png", title: 'E2', answer: '4' },
    { src: "img/3.png", title: 'E3', answer: '3' },
    { src: "img/4.png", title: 'E4', answer: '7' },
    { src: "img/5.png", title: 'E5', answer: '8' },
    { src: "img/6.png", title: 'E6', answer: '2' },
    { src: "img/7.png", title: 'E7', answer: '6' },
    { src: "img/8.png", title: 'E8', answer: '4' },
    { src: "img/9.png", title: 'E9', answer: '8' },
    { src: "img/10.png", title: 'E10', answer: '5' },
];

let currentImageIndex = -1;
let startTime;
let answers = [];
let itemStartTime;

const finalButton = document.getElementById('final-button');

document.getElementById('final-button').addEventListener('click', () => {
    generateCSV();
});

function showNextImage() {
    currentImageIndex++;
    if (currentImageIndex < images.length) {
        itemStartTime = new Date(); // Iniciar el temporizador para este ítem
        const imageInfo = images[currentImageIndex];
        document.getElementById('test-image').src = imageInfo.src;
        document.getElementById('item-indicator').textContent = imageInfo.title;
        const numberInput = document.getElementById('number-input');
        numberInput.value = '';
        numberInput.style.backgroundColor = ''; // Resetear el color de fondo
        document.getElementById('test-screen').style.display = 'block';
        numberInput.focus(); // Enfocar el campo de entrada

        if (currentImageIndex < 2) {
            document.getElementById('submit-btn').style.display = 'block';
            document.getElementById('next-button').style.display = 'block';
        } else {
            document.getElementById('submit-btn').style.display = 'none';
            document.getElementById('next-button').style.display = 'block';
        }
    } else {
        document.getElementById('test-screen').style.display = 'none';
        document.getElementById('end-screen').style.display = 'block';
        finalButton.style.display = 'block';
    }
}

function submitAnswer() {
    const numberInput = document.getElementById('number-input');
    let userAnswer = numberInput.value.trim();
    if (userAnswer === '') {
        userAnswer = '';
    }
    const correctAnswer = images[currentImageIndex].answer;
    const itemEndTime = new Date();
    const timeTaken = (itemEndTime - itemStartTime) / 1000;
    const precision = userAnswer === correctAnswer ? 1 : 0;

    answers.push({
        title: images[currentImageIndex].title,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        precision: precision,
        timeTaken: timeTaken
    });

    if (currentImageIndex < 2) { // Si es uno de los ítems de práctica
        if (userAnswer === correctAnswer) {
            numberInput.style.backgroundColor = 'green';
            document.getElementById('next-button').style.display = 'block';
            document.getElementById('submit-btn').style.display = 'none';
        } else {
            numberInput.style.backgroundColor = 'red';
            setTimeout(() => {
                numberInput.style.backgroundColor = '';
                numberInput.focus(); // Asegurarse de que el foco se mantenga en el campo
            }, 1200); // Resetear el color de fondo después de 1.2 segundos
        }
    }
}

const fullscreenButton = document.getElementById('fullscreen-btn');
fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
        fullscreenButton.style.backgroundImage = "url('img/minimize.png')"; // Cambiar la imagen del botón a 'minimize'
        document.documentElement.requestFullscreen();
    } else if (document.fullscreenElement) {
        fullscreenButton.style.backgroundImage = "url('img/full-screen.png')"; // Cambiar la imagen del botón a 'full-screen'
        document.exitFullscreen();
    } else {
        console.log('El modo de pantalla completa no es soportado por tu navegador.');
    }
});

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


    function generateCSV() {
        document.getElementById('final-button').style.display = 'none';
        const endTime = new Date();
        const totalTestTime = (endTime - startTime); // Tiempo total en milisegundos
    
        // Asegurarse de que userInfo esté disponible
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return; // Salir si userInfo no está disponible
        }
    
        // Obtener las iniciales del examinador
        const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();
    
        // Contenido del primer CSV
        let csvContent1 = "Trial;CorrResp;PartResp;Acc;RT;Examinador\n";
        answers.forEach(answer => {
            csvContent1 += `${answer.title};${answer.correctAnswer};${answer.userAnswer};${answer.precision};${(answer.timeTaken).toFixed(3).replace('.', ',')};${inicialesExaminador}\n`;
        });
    
        // Calcular el tiempo dedicado en segundos
        const tiempoDedicadoSegundos = (totalTestTime / 1000).toFixed(3).replace('.', ',');
    
        // Contenido del segundo CSV
        let csvContent2 = `TotTime;Examinador\n${tiempoDedicadoSegundos};${inicialesExaminador}\n`;
    
        const options = { timeZone: 'America/Santiago' };
        const fechaActual = new Date(); // Obtener la fecha actual
        const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
        const [day, month, year] = fechaHoraChilena.split('-');
        const fechaFormateada = `${day}_${month}_${year}`;
    
        // Obtener la fecha y la hora actuales
        const año = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        // Formatear la fecha y la hora
        const fechaHoraFormateada = `${dia}_${mes}_${año}`;
    
        const csvFilename1 = `${idParticipante}_5_VOSP_Number_Location_${fechaHoraFormateada}.csv`;
        const csvFilename2 = `${idParticipante}_5_VOSP_Number_Location_Metricas_${fechaHoraFormateada}.csv`;
    
        const csvBlob1 = new Blob([csvContent1], { type: 'text/csv;charset=utf-8;' });
        const csvBlob2 = new Blob([csvContent2], { type: 'text/csv;charset=utf-8;' });
    
        const zip = new JSZip();
        zip.file(csvFilename1, csvBlob1);
        zip.file(csvFilename2, csvBlob2);
    
        zip.generateAsync({ type: "blob" })
            .then(content => {
                const link = document.createElement('a');
                if (link.download !== undefined) {
                    const url = URL.createObjectURL(content);
                    const zipFilename = `${idParticipante}_5_VOSP_Number_Location_${fechaHoraFormateada}.zip`;
    
                    link.setAttribute('href', url);
                    link.setAttribute('download', zipFilename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    setTimeout(() => {
                        window.close();
                    }, 3000);
                }
            })
            .catch(err => {
                console.error("Error generando el archivo ZIP:", err);
            });
    }
    


function validateInput(input) {
    let value = input.value;
    if (!/^[1-9]$/.test(value)) {
        input.value = '';
    }
}
