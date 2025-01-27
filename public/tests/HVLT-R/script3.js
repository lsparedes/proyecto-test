document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen3');
    const finishScreen = document.getElementById('finishScreen');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const startButton = document.getElementById('startButton');
    const audioContainer = document.getElementById('audio-container');
    const audioItems = document.querySelectorAll('.audio-item');
    const NXButton = document.getElementById('nxbutton');
    const DownloadButton = document.getElementById('download');
    const selectHand = document.getElementById('selectHand')

    let answers = {};
    let currentAudioIndex = 0;
    let startTime = new Date();  // Guardar la hora de inicio automáticamente al cargar la página
    let finishTime;
    let audioEndTimes = {};
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();

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
        if (document.fullscreenEnabled && !document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('minimize.png')"; // Cambiar la imagen del botón a 'minimize'
            document.documentElement.requestFullscreen();
        } else if (document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('full-screen.png')"; // Cambiar la imagen del botón a 'full-screen'
            document.exitFullscreen();
        } else {
            console.log('El modo de pantalla completa no es soportado por tu navegador.');
        }
    });

    console.log(`${startTime}`);

    startButton.addEventListener('click', () => {
        pauseAudios();
        mainScreen.style.display = 'none';
        audioContainer.style.display = 'block';
        
    });

    audioItems.forEach((audioItem, index) => {
        const audioElement = audioItem.querySelector('audio');
        audioElement.addEventListener('ended', () => {
            audioEndTimes[index + 1] = new Date(); // Registrar el tiempo exacto al terminar
            console.log(`Audio ${index + 1} terminó en: ${audioEndTimes[index + 1]}`);
        });
    });

    NXButton.addEventListener('click', () => {
        pauseAudios();
        
        // Ocultar el audio actual
        audioItems[currentAudioIndex].style.display = 'none';
        
        // Avanzar al siguiente audio
        currentAudioIndex++;
        
        // Si hay un siguiente audio, mostrarlo
        if (currentAudioIndex < audioItems.length) {
            audioItems[currentAudioIndex].style.display = 'block';
        } else {
            // Si no hay más audios, mostrar la pantalla final
            audioContainer.style.display = 'none';
            selectHand.style.display = 'inline-block';
            finishScreen.style.display = 'block';
            // DownloadButton.style.display = 'block';

            finishTime = new Date();
            console.log(`${finishTime}`);
        }
    });

    const handInputs = document.getElementsByName('hand');

    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            DownloadButton.style.display = 'block';
        });
    });
    
    DownloadButton.addEventListener('click', () => {
        downloadZip();
    });

  

    document.querySelectorAll('.option-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const audioIndex = parseInt(e.target.getAttribute('data-audio'));
            const answer = e.target.getAttribute('data-answer');
            const responseTime = new Date(); // Momento en que se hace clic

            // Calcular RT si existe el tiempo de finalización del audio
            let RT = audioEndTimes[audioIndex]
                ? (responseTime - audioEndTimes[audioIndex]) / 1000
                : null;

            // Guardar la respuesta y RT
            answers[audioIndex] = {
                answer: answer,
                RT: RT
            };

            console.log(`Audio ${audioIndex}, Respuesta: ${answer}, RT: ${RT} segundos`);
        });
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


    function createCSV() {
        // Asegurarse de que userInfo esté disponible para obtener las iniciales
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return; // Salir si userInfo no está disponible
        }
    
        // Obtener las iniciales del participante
        const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();
    
        const total = Object.keys(correctAnswers).length;
    
        // Generar el contenido del primer CSV (datos de ensayos)
        let mainCsvContent = 'Trial;Word;CorrResp;PartResp;RT;Acc\n';
        for (let i = 1; i <= total; i++) {
            const word = words[i];
            const correctAnswer = correctAnswers[i];
            const participantAnswer = answers[i]?.answer || ''; // Respuesta del participante
            const RT = answers[i]?.RT !== undefined ? answers[i].RT : ''; // Tiempo de respuesta
            const isCorrect = correctAnswer === participantAnswer ? 1 : 0;
    
            // Incluir las iniciales en cada fila del CSV principal
            mainCsvContent += `${i};${word};${correctAnswer};${participantAnswer};${RT};${isCorrect}\n`;
        }
    
        // Obtener el valor de la mano seleccionada
        let selectedHandElement = document.querySelector('input[name="hand"]:checked');
        let selectedHand = selectedHandElement ? selectedHandElement.value : 'No seleccionado';
    
        // Calcular el tiempo total dedicado
        const endTime = new Date(); // Obtener la hora de finalización
        const timeSpentInSeconds = (endTime - startTime) / 1000; // Calcular el tiempo en segundos
    
        // Generar el contenido del segundo CSV (información adicional)
        let additionalCsvContent = 'Hand;TotTime;Iniciales Examinador\n';
        additionalCsvContent += `${selectedHand};${timeSpentInSeconds};${inicialesExaminador}\n`;
    
        // Retornar ambos contenidos como un objeto
        return { mainCsvContent, additionalCsvContent };
    }
    


    let diaStr = dia.toString().padStart(2, '0');
    let mesStr = mes.toString().padStart(2, '0');
    let añoStr = año.toString().padStart(4, '0');
    
    function downloadZip() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }
    
        const zip = new JSZip();
        
        const { mainCsvContent, additionalCsvContent } = createCSV();
        // Agregar los archivos CSV al ZIP
        zip.file("1_HVLT-R_Reconocimiento.csv", mainCsvContent);
        zip.file("1_HVLT-R_Reconocimiento_Metricas.csv", additionalCsvContent);
        // // Agregar el archivo CSV al zip
        // const csvContent = createCSV();
        // zip.file('HVLT-R_Reconocimiento_.csv', csvContent);
    
        // Generar y descargar el zip
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = `${idParticipante}_1_HVLT-R_Reconocimiento_${diaStr}_${mesStr}_${añoStr}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => {
                window.close();
            }, 3000);
 
        });

    }

    function pauseAudios() {
        document.getElementById('audio1_ejercicio3').pause();
        document.getElementById('audio1').pause();
        document.getElementById('audio2').pause();
        document.getElementById('audio3').pause();
        document.getElementById('audio4').pause();
        document.getElementById('audio5').pause();
        document.getElementById('audio6').pause();
        document.getElementById('audio7').pause();
        document.getElementById('audio8').pause();
        document.getElementById('audio9').pause();
        document.getElementById('audio10').pause();
        document.getElementById('audio11').pause();
        document.getElementById('audio12').pause();
        document.getElementById('audio13').pause();
        document.getElementById('audio14').pause();
        document.getElementById('audio15').pause();
        document.getElementById('audio16').pause();
        document.getElementById('audio17').pause();
        document.getElementById('audio18').pause();
        document.getElementById('audio19').pause();
        document.getElementById('audio20').pause();
        document.getElementById('audio21').pause();
        document.getElementById('audio22').pause();
        document.getElementById('audio23').pause();
        document.getElementById('audio24').pause();
    }

});
