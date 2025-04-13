document.addEventListener('DOMContentLoaded', () => {
    let currentTrial = 0;
    const cantidad_ensayos_prueba = 10;
    const cantidad_ensayos_bloque_1 = 20;
    const cantidad_ensayos_bloque_2 = 20;
    const cantidad_ensayos_bloque_3 = 20;
    let trials = [];
    let startTime;
    let results = [];
    let practiceMode = true;
    let selectionMade = false;
    let scoreBuffer = 0;
    let score = 0;
    let currentBlock = 0;
    let selectionTimeout;
    let totalStartTime = Date.now(); // Start the total time counter
    let globalTrialCount = 0; // nuevo contador continuo para E1...E60

    let caseOption = Math.random() < 0.5 ? 'A' : 'B';
    let caseImage = Math.random() < 0.5 ? 'C' : 'D';
    console.log(`Casos definidos: Recompensa -> ${caseOption}, Imágenes -> ${caseImage}`);


    const trialIndicator = document.getElementById('trialIndicator');
    const practiceTrial = document.getElementById('practiceTrial');
    const feedbackScreen = document.getElementById('feedbackScreen');
    const feedbackImage1 = document.getElementById('feedbackImage1');
    const feedbackImage2 = document.getElementById('feedbackImage2');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const intermediateScreen = document.getElementById('intermediateScreen');
    const skippedScreen = document.getElementById('skippedScreen');
    const endScreen = document.getElementById('endScreen');
    const leftSlot = document.getElementById('leftSlot');
    const rightSlot = document.getElementById('rightSlot');
    const instructions = document.getElementById('instructions');
    const scoreAmount = document.getElementById('scoreAmount'); // Elemento del puntaje

    document.getElementById('startPracticeButton').addEventListener('click', () => {

        startPractice();
        stopAllAudios();
    });

    const fullscreenButton = document.getElementById('fullscreenButton');
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

    leftSlot.addEventListener('click', () => {
        if (!selectionMade) {
            selectionMade = true;
            clearTimeout(selectionTimeout); // Clear the timeout if selection is made
            selectMachine('Izquierda');
        }
    });

    rightSlot.addEventListener('click', () => {
        if (!selectionMade) {
            selectionMade = true;
            clearTimeout(selectionTimeout); // Clear the timeout if selection is made
            selectMachine('Derecha');
        }
    });

    document.getElementById('startBlock1Button').addEventListener('click', () => {
        intermediateScreen.style.display = 'none';
        currentBlock = 1;
        caseOption = Math.random() < 0.5 ? 'A' : 'B'; // Randomly assign case A or B
        
        console.log(`Caso seleccionado: ${caseOption}`); // Log the selected case
        startTestBlock();
        stopAllAudios();
    });

    function startPractice() {
        practiceMode = true;
        currentTrial = 0;
        trials = generatePracticeTrials();
        scoreAmount.style.display = 'none';
        instructions.style.display = 'none';
        practiceTrial.style.display = 'block';
        showNextTrial();
    }

    function startTestBlock() {
        practiceMode = false;
        currentTrial = 0;
        scoreBuffer = score + scoreBuffer; // Guardar el puntaje actual antes de comenzar el Bloque 1
        score = 0; // Reiniciar puntaje al comenzar el Bloque 1
        scoreAmount.innerText = `$${(score + scoreBuffer).toLocaleString('es-CL')}`; // Mostrar el puntaje total con formato de saldo
        scoreAmount.style.color = (score + scoreBuffer) < 0 ? 'red' : (score + scoreBuffer) === 0 ? 'black' : 'blue';
        scoreAmount.style.display = 'block'; // Mostrar el puntaje a partir del Bloque 1
        trials = generateTestTrials(currentBlock);
        practiceTrial.style.display = 'block';
        showNextTrial();
    }

    function showNextTrial() {
        selectionMade = false;
        startTime = Date.now();

        const trial = trials[currentTrial];
        if (!trial) {
            console.error("No trial data found at index:", currentTrial);
            return;
        }

        if (practiceMode) {
            trialIndicator.innerText = `P${currentTrial + 1}`;
        } else {
            globalTrialCount++;
            trialIndicator.innerText = `E${globalTrialCount}`;
        }


        // Asignar imágenes según el caso C o D
        if (caseImage === 'C') {
            leftSlot.src = 'img/slot-machine-left-up.png';
            rightSlot.src = 'img/slot-machine-right-up.png';
        } else {
            leftSlot.src = 'img/slot-machine-right-up.png';
            rightSlot.src = 'img/slot-machine-left-up.png';
        }

        feedbackScreen.style.display = 'none';
        practiceTrial.style.display = 'block';

        console.log(`Trial ${currentTrial + 1}: StartTime registrado -> ${startTime}`);
        console.log(`Trial ${currentTrial + 1}: Left - ${trial.leftReward ? 'Win' : 'Lose'}, Right - ${trial.rightReward ? 'Win' : 'Lose'}, Case: ${trial.caseOption}, Image Order: ${trial.caseImage}`);

        selectionTimeout = setTimeout(() => {
            if (!selectionMade) {
                handleSkippedTrial();
            }
        }, 5000);
    }

    let slotsInverted = false;



    function selectMachine(side) {
        const responseTime = (Date.now() - startTime) / 1000;
        console.log(`Trial ${currentTrial + 1}: Tiempo de respuesta -> ${responseTime} ms`);
        // Verificar qué imagen está en el lado izquierdo y derecho
        const leftImage = leftSlot.src; // Imagen actual del lado izquierdo
        const rightImage = rightSlot.src; // Imagen actual del lado derecho

        // Determinar cuál animación usar según el lado seleccionado y la imagen actual
        if (side === 'Izquierda') {
            if (leftImage.includes('slot-machine-left-up.png')) {
                leftSlot.src = 'img/slot-machine-left-down.png';
            } else if (leftImage.includes('slot-machine-right-up.png')) {
                leftSlot.src = 'img/slot-machine-right-down.png';
            }
        } else if (side === 'Derecha') {
            if (rightImage.includes('slot-machine-right-up.png')) {
                rightSlot.src = 'img/slot-machine-right-down.png';
            } else if (rightImage.includes('slot-machine-left-up.png')) {
                rightSlot.src = 'img/slot-machine-left-down.png';
            }
        }

        setTimeout(() => {
            showFeedback(side, responseTime);
        }, 1000);
    }


    function showFeedback(side, responseTime) {
        const trial = trials[currentTrial];
        if (!trial) {
            console.error("No trial found for current index:", currentTrial);
            return;
        }

        let reward;
        if (side === 'Izquierda') {
            reward = trial.leftReward;
        } else if (side === 'Derecha') {
            reward = trial.rightReward;
        } else {
            console.error("Invalid side selected:", side);
            return;
        }

        feedbackImage1.src = reward ? 'img/win.jpg' : 'img/lose.jpg';
        feedbackImage2.src = reward ? 'img/2000.png' : 'img/1000.png';
        feedbackMessage.innerText = reward ? '¡Ganaste!' : '¡Perdiste!';

        if (!practiceMode) { // Solo actualizar el puntaje si no es el modo de práctica
            score += reward ? 2000 : -1000;
            scoreAmount.innerText = `Saldo: $${(score + scoreBuffer).toLocaleString('es-CL')}`;
            scoreAmount.style.color = (score + scoreBuffer) < 0 ? 'red' : (score + scoreBuffer) === 0 ? 'black' : 'blue';
        }

        results.push([
            practiceMode ? 'Practica' : currentBlock,
            practiceMode ? currentTrial + 1 : globalTrialCount + 1,
            trial.rightReward ? 'Ganancia' : 'Perdida',
            trial.leftReward ? 'Ganancia' : 'Perdida',
            side,
            reward ? 1 : 0,
            responseTime.toFixed(3).replace('.', ','),
        ]);

        practiceTrial.style.display = 'none';
        feedbackScreen.style.display = 'block';
        currentTrial++;
        if (!practiceMode) globalTrialCount++;

        setTimeout(() => {
            if (currentTrial < trials.length) {
                showNextTrial();
            } else {
                finishBlock();
            }
        }, 2000);
    }

    function handleSkippedTrial() {
        practiceTrial.style.display = 'none';
        skippedScreen.style.display = 'block';

        // Registrar el ensayo omitido
        results.push([
            practiceMode ? 'Practica' : currentBlock,
            currentTrial + 1,
            trials[currentTrial].rightReward ? 'Ganancia' : 'Perdida',
            trials[currentTrial].leftReward ? 'Ganancia' : 'Perdida',
            'Omitido',
            '',
            ''
        ]);

        currentTrial++; // Avanzar al siguiente ensayo antes de mostrar el siguiente

        setTimeout(() => {
            skippedScreen.style.display = 'none'; // Ocultar "omitido" después de 1 segundo
            if (currentTrial < trials.length) {
                showNextTrial();
            } else {
                finishBlock();
            }
        }, 1000);
    }


    function finishBlock() {
        practiceTrial.style.display = 'none';
        feedbackScreen.style.display = 'none';
        skippedScreen.style.display = 'none';

        if (practiceMode) {
            console.log("Práctica completada");
            intermediateScreen.style.display = 'block';
        } else {
            switch (currentBlock) {
                case 1:
                    console.log("Bloque 1 completado");
                    currentBlock = 2;
                    trials = generateTestTrials(currentBlock); // Asegurar la correcta generación del bloque
                    startTestBlock();
                    break;
                case 2:
                    console.log("Bloque 2 completado");
                    currentBlock = 3;
                    trials = generateTestTrials(currentBlock);
                    startTestBlock();
                    break;
                case 3:
                    console.log("Bloque 3 completado");
                    showHandSelection();
                    break;
            }
        }
    }


    function endGame() {
        endScreen.style.display = 'block';
        downloadResults(); // Automatically download results
    }

    function generatePracticeTrials() {
        const practiceTrials = [];
        const halfTrials = Math.floor(cantidad_ensayos_prueba / 2);

        for (let i = 0; i < halfTrials; i++) {
            practiceTrials.push({
                leftReward: true,
                rightReward: false,
                caseOption: caseOption,
                caseImage: caseImage
            });
        }

        for (let i = 0; i < halfTrials; i++) {
            practiceTrials.push({
                leftReward: false,
                rightReward: true,
                caseOption: caseOption,
                caseImage: caseImage
            });
        }

        return practiceTrials;
    }

    function generateTestTrials(block) {
        const testTrials = [];
        let blockTrialsCount;
        let leftRewardChance, rightRewardChance;

        if (block === 1) {
            blockTrialsCount = cantidad_ensayos_bloque_1;
            if (caseOption === 'A') {
                leftRewardChance = 0.25;
                rightRewardChance = 0.75;
            } else {
                leftRewardChance = 0.75;
                rightRewardChance = 0.25;
            }
        } else if (block === 2) {
            blockTrialsCount = cantidad_ensayos_bloque_2;
            if (caseOption === 'A') {
                leftRewardChance = 0.75;
                rightRewardChance = 0.25;
            } else {
                leftRewardChance = 0.25;
                rightRewardChance = 0.75;
            }
        } else if (block === 3) {
            blockTrialsCount = cantidad_ensayos_bloque_3;
            if (caseOption === 'A') {
                leftRewardChance = 0.25;
                rightRewardChance = 0.75;
            } else {
                leftRewardChance = 0.75;
                rightRewardChance = 0.25;
            }
        } else {
            return [];
        }

        for (let trial = 1; trial <= blockTrialsCount; trial++) {
            const randomValue = Math.random();
            let leftReward = randomValue < leftRewardChance;
            let rightReward = !leftReward;

            testTrials.push({
                trialNumber: trial,
                leftReward: leftReward,
                rightReward: rightReward,
                leftRewardChance: leftRewardChance,
                rightRewardChance: rightRewardChance,
                caseOption: caseOption,
                caseImage: caseImage
            });
        }

        return testTrials;
    }


    function resetSlotMachines() {
        leftSlot.src = 'img/slot-machine-left-up.png';
        rightSlot.src = 'img/slot-machine-right-up.png';
    }

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

    async function downloadResults() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }

        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return;
        }

        const initials = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase(); // Obtener iniciales

        const zip = new JSZip();

        // Filtrar los resultados para excluir los ensayos de práctica
        const filteredResults = results.filter(e => e[0] !== 'Practica');

        // Generar el contenido del primer archivo CSV sin los ensayos de práctica
        let csvContent = "Block;Trial;ORSltMach;OLSltMach;PartResp;Acc;RT;Examinador\n";
        csvContent += filteredResults.map(e => [...e, initials].join(";")).join("\n"); // Añadir iniciales en cada fila

        // Generar el contenido del archivo TXT
        const totalTaskTime = ((Date.now() - totalStartTime) / 1000).toFixed(3).replace('.', ',');
        let txtContent = [["TotTime", "Hand", "Examinador"], [totalTaskTime, selectedHand, initials]].map(e => e.join(";")).join("\n");

        // Obtener la fecha actual para el nombre del archivo
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const date = `${day}_${month}_${year}`;

        // Añadir archivos al ZIP
        zip.file(`${idParticipante}_16_Dos_Maquinas_Tragamonedas_${date}.csv`, csvContent);
        zip.file(`${idParticipante}_16_Dos_Maquinas_Tragamonedas_Metricas_${date}.csv`, txtContent);

        const fileName = `${idParticipante}_16_Dos_Maquinas_Tragamonedas_${date}.zip`;

        // Generar y descargar el archivo ZIP
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => {
                window.close();
            }, 3000);
        });
    }



    function stopAllAudios() {
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => audio.pause());
    }

    // SELECCION DE MANO JS

    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");
    const handInputs = document.getElementsByName('hand');

    // Variable con la mano seleccionada
    let selectedHand = "";

    // Funcion para mostrar la pantalla de seleccion de mano
    function showHandSelection() {
        document.getElementById("preEnd").style.display = 'block';
        selectHandContainer.style.display = "block";
    }

    // Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
    // En este caso fue mostrarFinalizacion()
    function confirmHandSelection() {
        document.getElementById("preEnd").style.display = 'none';
        selectHandContainer.style.display = "none";
        endGame();
    }

    // Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            validateInputs();
            selectedHand = e.target.value;
        });
    });

    document.getElementById('handButton').addEventListener('click', confirmHandSelection);

    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

        if (selectedHand) {
            handButton.style.display = 'block';
        }
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Obtener el id_participante de la URL
    const idParticipante = getQueryParam('id_participante');

    window.confirmHandSelection = confirmHandSelection;
});
