document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen3');
    const finishScreen = document.getElementById('finishScreen');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const startButton = document.getElementById('startButton');
    const audioGrid = document.getElementById('audio-grid');
    const audios = document.querySelectorAll('audio');
    const NXButton = document.getElementById('nxbutton');
    let answers = {};
    let startTime = new Date();  // Guardar la hora de inicio automáticamente al cargar la página
    let finishTime;
    const correctAnswers = {
        1: 'si', 2: 'no', 3: 'si', 4: 'no', 5: 'no', 6: 'no', 7: 'si', 8: 'si', 9: 'si', 10: 'no', 11: 'no', 12: 'si',
        13: 'si', 14: 'no', 15: 'si', 16: 'no', 17: 'si', 18: 'no', 19: 'no', 20: 'si', 21: 'no', 22: 'si', 23: 'si', 24: 'no'
    };

    const words = {
        1: 'TENIS', 2: 'voleibol', 3: 'PROFESOR', 4: 'espinaca', 5: 'abogado', 6: 'submarino', 7: 'GOLF', 8: 'DENTISTA', 9: 'LECHUGA',
        10: 'araña', 11: 'agua', 12: 'FRIJOL', 13: 'BALONCESTO', 14: 'doctor', 15: 'MAIZ', 16: 'béisbol', 17: 'MAESTRO', 18: 'culebra',
        19: 'zanahoria', 20: 'INGENIERO', 21: 'guante', 22: 'FUTBOL', 23: 'PAPA', 24: 'tulipán'
    };

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    console.log(`${startTime}`);

    startButton.addEventListener('click', () => {
        mainScreen.style.display = 'none';
        audioGrid.style.display = 'flex';
    });

    audios.forEach((audio, index) => {
        audio.addEventListener('ended', () => {
            const options = document.getElementById(`options${index + 0}`);
            options.style.display = 'flex';
            audios.disabled = true; // Deshabilitar el audio después de que se termine de reproducir
        });
    });

    NXButton.addEventListener('click', () => {
        audioGrid.style.display = 'none';
        finishScreen.style.display = 'block';
        finishTime = new Date();
        console.log(`${finishTime}`);
        createCSV();
    });

    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const audioNumber = e.target.getAttribute('data-audio');
            const answer = e.target.getAttribute('data-answer');
            answers[audioNumber] = answer;

            // Deshabilitar todos los botones de opciones para el audio actual
            document.querySelectorAll(`#options${audioNumber} .option-btn`).forEach(btn => {
                btn.disabled = true;
            });

            // Ocultar las opciones una vez seleccionada una respuesta
            const options = document.getElementById(`options${audioNumber}`);
            options.style.display = 'none';

            console.log(`Audio ${audioNumber}: ${answer}`);
        });
    });

    function createCSV() {
        const total = Object.keys(correctAnswers).length;
        let csvContent = 'nro,palabra,respuesta_correcta,respuesta_participante,precisión\n';

        for (let i = 1; i <= total; i++) {
            const word = words[i];
            const correctAnswer = correctAnswers[i];
            const participantAnswer = answers[i] || 'no';
            const isCorrect = correctAnswer === participantAnswer ? 1 : 0;

            csvContent += `${i},${word},${correctAnswer},${participantAnswer},${isCorrect}\n`;
        }

        const endTime = new Date(); // Obtener la hora de finalización
        const timeSpentInSeconds = (endTime - startTime) / 1000; // Calcular el tiempo en segundos
        
        // Convertir los segundos a minutos y segundos
        const minutes = Math.floor(timeSpentInSeconds / 60);
        const seconds = Math.floor(timeSpentInSeconds % 60);
        
        // Formatear el tiempo en mm:ss
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        csvContent += `\nTiempo dedicado a la tarea:,${formattedTime}\n`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'Respuestas HVLT-R Reconocimiento.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});
