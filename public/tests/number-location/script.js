document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('instrucciones').pause();
    document.getElementById('start-screen').style.display = 'none';
    startTime = new Date(); // Registrar el tiempo de inicio del test
    showNextImage();
});

document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);
document.getElementById('submit-btn').addEventListener('click', submitAnswer);
document.getElementById('next-button').addEventListener('click', () => {
    submitAnswer();
    showNextImage();
});

const images = [
    { src: "img/P1.png", title: 'P1', answer: '1' },
    { src: "img/P2.png", title: 'P2', answer: '5' },
    { src: "img/1.png", title: 'I1', answer: '7' },
    { src: "img/2.png", title: 'I2', answer: '4' },
    { src: "img/3.png", title: 'I3', answer: '3' },
    { src: "img/4.png", title: 'I4', answer: '7' },
    { src: "img/5.png", title: 'I5', answer: '8' },
    { src: "img/6.png", title: 'I6', answer: '2' },
    { src: "img/7.png", title: 'I7', answer: '6' },
    { src: "img/8.png", title: 'I8', answer: '4' },
    { src: "img/9.png", title: 'I9', answer: '8' },
    { src: "img/10.png", title: 'I10', answer: '5' },
];

let currentImageIndex = -1;
let startTime;
let answers = [];
let itemStartTime;
let participantID = '';

document.getElementById('final-button').addEventListener('click', () => {
    const participantID = document.getElementById('participantID').value.trim();
    generateCSV(participantID);
});

document.getElementById('participantID').addEventListener('input', () => {
    const participantID = document.getElementById('participantID').value.trim();
    const finalButton = document.getElementById('final-button');
    if (participantID) {
        finalButton.style.display = 'block';
    } else {
        finalButton.style.display = 'none';
    }
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

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

function generateCSV(participantID) {
    document.getElementById('enterID').style.display = 'none';
    document.getElementById('final-button').style.display = 'none';
    const endTime = new Date();
    const totalTestTime = (endTime - startTime); // Tiempo total en milisegundos

    let csvContent = "en;rp_c;rp;pc;tr\n";

    answers.forEach(answer => {
        csvContent += `${answer.title};${answer.correctAnswer};${answer.userAnswer};${answer.precision};${(answer.timeTaken * 1000).toFixed(3).replace('.', ',')}\n`;
    });

    const tiempoDedicadoSegundos = (totalTestTime / 1000).toFixed(3).replace('.', ',');

    const txtContent = `Tiempo dedicado (Segundos): ${tiempoDedicadoSegundos}`;

    const options = { timeZone: 'America/Santiago' };
    const fechaActual = new Date(); // Declarar e inicializar la variable fechaActual
    const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
    const [day, month, year] = fechaHoraChilena.split('-');
    const fechaFormateada = `${day}_${month}_${year}`;

    // Obtener la fecha y la hora actuales
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    // Formatear la fecha y la hora
    const fechaHoraFormateada = `${dia}_${mes}_${año}`;
    const csvFilename = `${participantID}_VisualObjectSpacePerception_${fechaHoraFormateada}.csv`;
    const txtFilename = `${participantID}_VisualObjectSpacePerception_${fechaHoraFormateada}.txt`;

    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const txtBlob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });

    const zip = new JSZip();
    zip.file(csvFilename, csvBlob);
    zip.file(txtFilename, txtBlob);

    zip.generateAsync({ type: "blob" })
        .then(content => {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(content);
                const zipFilename = `${participantID}_VisualObjectSpacePerception_${fechaHoraFormateada}.zip`;

                link.setAttribute('href', url);
                link.setAttribute('download', zipFilename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
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
