document.addEventListener('DOMContentLoaded', () => {

    let startTimeExecution = null; 
    let endTimeExecution = null; 
    let correctAnswer = "figura2-3";
    let participantAnswer = "";
    let selectedFigure = null;
    let selectedHand = "";
    let accuracy = null;
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    const fullscreenButton = document.getElementById('fullscreen-button');
    const finishIdentifyingFigureButton = document.getElementById('finish-identifying-figure');

    const container2 = document.getElementById('container2');
    const finishScreen = document.getElementById('finishScreen');
    const selectHandContainer = document.getElementById("selectHand");
    const selectableImages = document.querySelectorAll('.selectable');
    const handInputs = document.querySelectorAll('input[name="hand"]');
    const DownloadButton = document.getElementById('download');
    const showinstruction = document.getElementById('showinstruction');
    const instruccion = document.getElementById('instruccion');
    
    enterContainer2();

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

    showinstruction.addEventListener('click', () => {
        if (instruccion.classList.contains('show')) {
            instruccion.classList.remove('show');
            showinstruction.style.backgroundImage = "url('noeye.png')";
        } else {
            instruccion.classList.add('show');
            showinstruction.style.backgroundImage = "url('eye.png')";
        }
    });

    finishIdentifyingFigureButton.addEventListener('click', () => {
        document.getElementById('audio3').pause();
        container2.style.display = 'none';
        finishScreen.style.display = 'block';
        DownloadButton.style.display = 'none';
        endTimeExecution = new Date(); 
        console.log("Tiempo de Termino: ", endTimeExecution);
        selectHandContainer.style.display = 'block';
        calculateAccuracy(); // Calcular el accuracy cuando se termina de identificar la figura
    });

    selectableImages.forEach(image => {
        image.addEventListener('click', (event) => {
            if (selectedFigure) {
                selectedFigure.classList.remove('selected');
            }
            selectedFigure = event.target;
            selectedFigure.classList.add('selected');
            participantAnswer = selectedFigure.dataset.figure;
            console.log("Imagen Seleccionada: ", participantAnswer);
        });
    });


    DownloadButton.addEventListener('click', () => {
        validateInputs();
        GenerateZIP();
    });
    
    handInputs.forEach(input => {
        input.addEventListener('change', () => {
            selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
            console.log("Mano seleccionada: ", selectedHand);
            validateInputs(); 
            DownloadButton.style.display = 'block';
        });
    });

    function enterContainer2() {
        container2.style.display = 'flex';
        startTimeExecution = new Date();
        console.log("Tiempo de inicio: ", startTimeExecution);
    }

    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
        console.log("Mano seleccionada: ", selectedHand);
    }

    function calculateAccuracy() {
        accuracy = (participantAnswer === correctAnswer) ? 1 : 0;
        console.log("Precision: ", accuracy);
    }


    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    // Obtener el id_participante de la URL
    const idParticipante = getQueryParam('id_participante');
    function generateCSV() {

        let csvContent = "Activity;TotTime;RT;Hand;CorrResp;PartResp;Acc\n";
        let timeTotal = (endTimeExecution - startTimeExecution) / 1000; //tiempo total en segundos
        csvContent += `FiguraIdentificada;${timeTotal};${endTimeExecution - startTimeExecution};${selectedHand};${correctAnswer};${participantAnswer};${accuracy}\n`;

        return csvContent;
    }

    let diaStr = dia.toString().padStart(2, '0');
    let mesStr = mes.toString().padStart(2, '0');
    let añoStr = año.toString().padStart(4, '0');

    async function GenerateZIP() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }

        const zip = new JSZip();

        // Generar el contenido del CSV
        const csvContent = generateCSV();
        if (!csvContent) {
            console.error('No se puede generar el CSV');
            return;
        }
        zip.file(`${idParticipante}_6_Benson_Reconocimiento_${diaStr}_${mesStr}_${añoStr}.csv`, csvContent);

        // Crear el archivo zip y forzar la descarga
        zip.generateAsync({ type: 'blob' })
            .then(function(content) {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = `${idParticipante}_6_Benson_Reconocimiento_${diaStr}_${mesStr}_${añoStr}.zip`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
    }

    function formatDate(date) {
        if (!date) return '';
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false 
        };
        return date.toLocaleString('en-US', options).replace(',', '');
    }

});
