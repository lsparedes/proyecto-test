document.addEventListener('DOMContentLoaded', () => {

    let startTimeExecution = null; 
    let endTimeExecution = null; 
    let correctAnswer = "figura2-3";
    let participantAnswer = "";
    let selectedFigure = null;
    let selectedHand = "";
    let participantID = "";
    let accuracy = null;
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    const fullscreenButton = document.getElementById('fullscreen-button');
    const finishIdentifyingFigureButton = document.getElementById('finish-identifying-figure');

    const container2 = document.getElementById('container2');
    const finishScreen = document.getElementById('finishScreen');
    const enterID = document.getElementById('enterID');
    const selectHandContainer = document.getElementById("selectHand");
    const selectableImages = document.querySelectorAll('.selectable');
    const handInputs = document.querySelectorAll('input[name="hand"]');

    enterContainer2();

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    finishIdentifyingFigureButton.addEventListener('click', () => {
        document.getElementById('audio3').pause();
        container2.style.display = 'none';
        finishScreen.style.display = 'block';
        endTimeExecution = new Date(); 
        console.log("Tiempo de Termino: ", endTimeExecution);
        selectHandContainer.style.display = 'inline-block';
        enterID.style.display = 'inline-block';
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

    document.getElementById('participantID').addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            validateInputs();
            GenerateZIP();
        }
    });

    handInputs.forEach(input => {
        input.addEventListener('change', () => {
            selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
            console.log("Mano seleccionada: ", selectedHand);
            validateInputs(); 
        });
    });

    function enterContainer2() {
        container2.style.display = 'flex';
        startTimeExecution = new Date();
        console.log("Tiempo de inicio: ", startTimeExecution);
    }

    function validateInputs() {
        participantID = document.getElementById('participantID').value;
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
        console.log("ID del participante: ", participantID);
        console.log("Mano seleccionada: ", selectedHand);
    }

    function calculateAccuracy() {
        accuracy = (participantAnswer === correctAnswer) ? 1 : 0;
        console.log("Precision: ", accuracy);
    }

    function generateCSV() {
        if (!startTimeExecution || !endTimeExecution || !selectedHand || !participantID) {
            console.error("Datos incompletos para generar CSV");
            return;
        }

        let csvContent = "Actividad,Tiempo de inicio,Tiempo de Termino,Mano Seleccionada, FiguraCorrecta, FiguraSeleccionada, Precision\n";
        csvContent += `IdentifyFigure,${formatDate(startTimeExecution)},${formatDate(endTimeExecution)},${selectedHand},${correctAnswer},${participantAnswer},${accuracy}\n`;

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
        zip.file(`Benson_Identifying_Figure.csv`, csvContent);

        // Crear el archivo zip y forzar la descarga
        zip.generateAsync({ type: 'blob' })
            .then(function(content) {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = `ID-${participantID}-Benson_Identifying_Figure-${diaStr}-${mesStr}-${añoStr}.zip`;
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
