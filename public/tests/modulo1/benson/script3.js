document.addEventListener('DOMContentLoaded', () => {

    let startTimeExecution = null; 
    let endTimeExecution = null; 
    let audioEndTime = null; // Tiempo cuando termina el audio3
    let selectionAnswer = null;
    let responseTime = "";
    let lastSelectablePointerEventTime = 0;
    let correctAnswer = "3";
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

    audio3.addEventListener('ended', () => {
        audioEndTime = new Date();
        console.log("Audio finalizado en: ", audioEndTime);
    });

    showinstruction.addEventListener('click', () => {
        const isVisible = finishIdentifyingFigureButton.style.display === 'block';
    
        if (isVisible) {
            finishIdentifyingFigureButton.style.display = 'none';
            showinstruction.style.backgroundImage = "url('noeye.png')";
        } else {
            finishIdentifyingFigureButton.style.display = 'block';
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

    function selectFigure(event) {
            if (selectedFigure) {
                selectedFigure.classList.remove('selected');
            }
            selectedFigure = event.target;
            selectedFigure.classList.add('selected');
            participantAnswer = selectedFigure.dataset.figure;
            console.log("Imagen Seleccionada: ", participantAnswer);

            if (audioEndTime) {
                responseTime = (new Date() - audioEndTime);
                console.log("Reaction Time (RT):", responseTime, "milisegundos");
            } else {
                console.warn("No se registró el tiempo final del audio.");
            }
    }

    selectableImages.forEach(image => {
        image.addEventListener('pointerup', (event) => {
            lastSelectablePointerEventTime = Date.now();
            selectFigure(event);
        }, false);

        image.addEventListener('click', (event) => {
            if (Date.now() - lastSelectablePointerEventTime < 500) return;
            selectFigure(event);
        });
    });


    DownloadButton.addEventListener('click', async ()  => {
        validateInputs();
        try {
            await GenerateZIP();
        } catch (error) {
            console.error("Error al generar el ZIP:", error);
        }
    
        setTimeout(() => {
            window.close();
        }, 3000);
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
    .catch(error => console.error('Error al cargar la información del usuario:', error));

    function generateCSV() {
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return ""; 
        }

        let timeTotal = (endTimeExecution - startTimeExecution) / 1000;
        const initials = userInfo?.initials || `${userInfo?.name || ""} ${userInfo?.last_name || ""}`.trim().split(/\s+/).filter(Boolean).map(part => part.charAt(0).toUpperCase()).join("") || "EX";

        // CSV principal (detallado, por ítem)
        let mainCsvContent = "TotTime;RT;Hand;CorrResp;PartResp;Acc;Examinador\n"; //Activity
        mainCsvContent += `${timeTotal.toFixed(3).replace('.', ',')};${responseTime};${selectedHand};${correctAnswer};${participantAnswer};${accuracy};${initials}\n`; //FiguraIdentificada

        // CSV univariado (resumen), requerido por la nomenclatura: ID_Benson_recog_unival
        let univalCsvContent = "Hand;TotTime;Examinador\n";
        univalCsvContent += `${selectedHand};${timeTotal.toFixed(3).replace('.', ',')};${initials}\n`;

        return { mainCsvContent, univalCsvContent };
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
        const csvData = generateCSV();
        if (!csvData) {
            console.error('No se puede generar el CSV');
            return;
        }
        zip.file(`${idParticipante}_Benson_recog.csv`, csvData.mainCsvContent);
        zip.file(`${idParticipante}_Benson_recog_unival.csv`, csvData.univalCsvContent);

        // Crear el archivo zip y forzar la descarga
        zip.generateAsync({ type: 'blob' })
            .then(function(content) {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                const fecha = `${diaStr}${mesStr}${String(añoStr).slice(-2)}`;
                const examinerName = String(userInfo?.initials || [userInfo?.name, userInfo?.last_name].filter(Boolean).join(' ')
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .map(part => part.charAt(0).toUpperCase())
                    .join('') || 'NAA')
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-zA-Z0-9-_]/g, '');
                a.download = `${idParticipante}_Benson_recog_${fecha}_${examinerName}.zip`;
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
