document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    showNextImage();
});
document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);
document.getElementById('submit-btn').addEventListener('click', submitAnswer);
document.getElementById('next-button').addEventListener('click', () => {
    submitAnswer(); // Guardar la respuesta actual antes de mostrar la siguiente imagen
    showNextImage(); // Mostrar la siguiente imagen
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



function showNextImage() {
    currentImageIndex++;
    if (currentImageIndex < images.length) {
        startTime = new Date(); // Iniciar el temporizador para este ítem
        const imageInfo = images[currentImageIndex];
        document.getElementById('test-image').src = imageInfo.src;
        document.getElementById('item-indicator').textContent = imageInfo.title;
        document.getElementById('number-input').value = '';
        document.getElementById('number-input').style.backgroundColor = ''; // Resetear el color de fondo
        document.getElementById('test-screen').style.display = 'block';
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
        generateCSV();
    }
}

function submitAnswer() {
    const userAnswer = document.getElementById('number-input').value;
    const correctAnswer = images[currentImageIndex].answer;
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000; // Tiempo transcurrido en segundos
    
    answers.push({
        title: images[currentImageIndex].title,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        timeTaken: timeTaken
    });
    
    if (currentImageIndex < 2) { // Si es uno de los ítems de práctica
        if (userAnswer === correctAnswer) {
            document.getElementById('number-input').style.backgroundColor = 'green';
            document.getElementById('next-button').style.display = 'block';
            document.getElementById('submit-btn').style.display = 'none';
        } else {
            document.getElementById('number-input').style.backgroundColor = 'red';
            setTimeout(() => {
                document.getElementById('number-input').style.backgroundColor = '';
            }, 1200); // Resetear el color de fondo después de 2 segundos
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

function generateCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Ensayo;Respuesta correcta;Respuesta participante;Precision;Tiempo respuesta ingreso dato;Tiempo duracion tarea\n";
    
    answers.forEach(answer => {
        csvContent += `${answer.title};${answer.userAnswer};${answer.correctAnswer};;${(answer.timeTaken * 1000)} milisegundos;\n`;
    });

    const dateTime = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }).replace(/:/g, "-").replace(/\//g, "_");
    const filename = `respuestas_number_location_${dateTime}.csv`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
}
