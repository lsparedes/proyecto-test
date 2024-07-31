document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen3');
    const finishScreen = document.getElementById('finishScreen');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const startButton = document.getElementById('startButton');
    const audioContainer = document.getElementById('audio-container');
    const audioItems = document.querySelectorAll('.audio-item');
    const NXButton = document.getElementById('nxbutton');
    let answers = {};
    let currentAudioIndex = 0;
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
        audioContainer.style.display = 'block';
        
    });

    

    NXButton.addEventListener('click', () => {
        audioContainer.style.display = 'none';
        finishScreen.style.display = 'block';
        finishTime = new Date();
        console.log(`${finishTime}`);
        downloadZip();
    });

    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Obtener el índice del audio actual
            const audioIndex = parseInt(e.target.getAttribute('data-audio'));
            const answer = e.target.getAttribute('data-answer');
            answers[audioIndex] = answer; // Usar audioIndex en lugar de audioItems
            // Ocultar el audio y las opciones actuales
            audioItems[audioIndex - 1].style.display = 'none';
            
            // Mostrar el siguiente audio si existe
            if (audioIndex < audioItems.length) {
                audioItems[audioIndex].style.display = 'block';
            } else{
                finishScreen.style.display = 'block';
                finishTime = new Date();
                console.log(`${finishTime}`);
                downloadZip();
            }
            console.log(answer);
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
        return csvContent;
    }

    function downloadZip() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }

        const zip = new JSZip();
        


        // Agregar el archivo CSV al zip
        const csvContent = createCSV();
        zip.file('HVLT-R_Reconocimiento.csv', csvContent);

        // Generar y descargar el zip
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'HVLT-R Reconocimiento.zip';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }


});
