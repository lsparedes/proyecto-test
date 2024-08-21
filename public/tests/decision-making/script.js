document.addEventListener('DOMContentLoaded', () => {
    let currentTrial = 0;
    const cantidad_ensayos_prueba = 10; // Ajusta este valor según sea necesario
    const cantidad_ensayos_bloque_1 = 20;
    const cantidad_ensayos_bloque_2 = 20;
    const cantidad_ensayos_bloque_3 = 20;
    let trials = [];
    let startTime;
    let results = [];
    let practiceMode = true;
    let selectionMade = false;
    let score = 0; // Puntaje inicializado
    let currentBlock = 0; // Track the current block
    let selectionTimeout;
    let caseOption; // Variable to track which case (A or B) is selected
    let totalStartTime; // To track total time from start to thank you screen

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
        totalStartTime = Date.now(); // Start the total time counter
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
        startTime = Date.now();
        scoreAmount.style.display = 'none'; // Ocultar el puntaje en la práctica
        instructions.style.display = 'none';
        practiceTrial.style.display = 'block';
        showNextTrial();
    }

    function startTestBlock() {
        practiceMode = false;
        currentTrial = 0;
        score = 0; // Reiniciar puntaje al comenzar el Bloque 1
        scoreAmount.innerText = `$${score}`;
        scoreAmount.style.color = 'black';
        scoreAmount.style.display = 'block'; // Mostrar el puntaje a partir del Bloque 1
        trials = generateTestTrials(currentBlock);
        startTime = Date.now();
        practiceTrial.style.display = 'block';
        showNextTrial();
    }

    function showNextTrial() {
        selectionMade = false;
        const trial = trials[currentTrial];
        trialIndicator.innerText = practiceMode ? `P${currentTrial + 1}` : `E${currentTrial + 1}`;
        feedbackScreen.style.display = 'none';
        skippedScreen.style.display = 'none';
        endScreen.style.display = 'none';
        resetSlotMachines();
        practiceTrial.style.display = 'block';

        // Log the probabilities applied for each trial
        console.log(`Trial ${currentTrial + 1}: Left - ${trial.leftReward ? 'Win' : 'Lose'}, Right - ${trial.rightReward ? 'Win' : 'Lose'}`);

        // Start the timeout for auto-skip if no selection is made
        selectionTimeout = setTimeout(() => {
            if (!selectionMade) {
                handleSkippedTrial();
            }
        }, 5000); // 5 seconds
    }

    function selectMachine(side) {
        const responseTime = Date.now() - startTime;
        if (side === 'Izquierda') {
            leftSlot.src = 'img/slot-machine-left-down.png';
        } else {
            rightSlot.src = 'img/slot-machine-right-down.png';
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
        feedbackImage2.src = reward ? 'img/5000.png' : 'img/1000.png';
        feedbackMessage.innerText = reward ? '¡Ganaste!' : '¡Perdiste!';

        if (!practiceMode) { // Solo actualizar el puntaje si no es el modo de práctica
            score += reward ? 5000 : -1000;
            scoreAmount.innerText = `Ganancia: $${score}`;
            scoreAmount.style.color = score < 0 ? 'red' : score === 0 ? 'black' : 'blue';
        }

        results.push([
            practiceMode ? 'Práctica' : currentBlock,
            currentTrial + 1,
            trial.rightReward ? 'Ganancia' : 'Pérdida',
            trial.leftReward ? 'Ganancia' : 'Pérdida',
            side,
            reward ? 'Ganancia' : 'Pérdida',
            responseTime,
        ]);

        practiceTrial.style.display = 'none';
        feedbackScreen.style.display = 'block';
        currentTrial++;

        setTimeout(() => {
            if (currentTrial < trials.length) {
                showNextTrial();
            } else {
                finishBlock();
            }
        }, 3000);
    }

    function handleSkippedTrial() {
        practiceTrial.style.display = 'none';
        skippedScreen.style.display = 'block';
        results.push([
            practiceMode ? 'Práctica' : currentBlock,
            currentTrial + 1,
            trials[currentTrial].rightReward ? 'Ganancia' : 'Pérdida',
            trials[currentTrial].leftReward ? 'Ganancia' : 'Pérdida',
            'omitido',
            '',
            '',
            ''
        ]);
        currentTrial++;

        setTimeout(() => {
            if (currentTrial < trials.length) {
                showNextTrial();
            } else {
                finishBlock();
            }
        }, 1000); // Display "omitido" screen for 3 seconds
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
                    startTestBlock();
                    break;
                case 2:
                    console.log("Bloque 2 completado");
                    currentBlock = 3;
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
        setTimeout(() => {
            downloadResults(); // Automatically download results
        }, 1000); // Give a slight delay for user to see the message
    }

    function generatePracticeTrials() {
        const practiceTrials = [];
        const halfTrials = Math.floor(cantidad_ensayos_prueba / 2);

        // Generate half trials with left machine winning
        for (let i = 0; i < halfTrials; i++) {
            practiceTrials.push({
                leftReward: true,
                rightReward: false
            });
        }

        // Generate half trials with right machine winning
        for (let i = 0; i < halfTrials; i++) {
            practiceTrials.push({
                leftReward: false,
                rightReward: true
            });
        }

        // Shuffle the trials to ensure randomness
        for (let i = practiceTrials.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [practiceTrials[i], practiceTrials[j]] = [practiceTrials[j], practiceTrials[i]];
        }

        return practiceTrials;
    }

    function generateTestTrials(block) {
        const testTrials = [];
        let blockTrialsCount;
        let leftRewardChance, rightRewardChance;

        if (caseOption === 'A') {
            // Case A: Set probabilities for each block
            switch (block) {
                case 1:
                    blockTrialsCount = cantidad_ensayos_bloque_1;
                    leftRewardChance = 0.75;
                    rightRewardChance = 0.25;
                    break;
                case 2:
                    blockTrialsCount = cantidad_ensayos_bloque_2;
                    leftRewardChance = 0.25;
                    rightRewardChance = 0.75;
                    break;
                case 3:
                    blockTrialsCount = cantidad_ensayos_bloque_3;
                    leftRewardChance = 0.75;
                    rightRewardChance = 0.25;
                    break;
                default:
                    return [];
            }
        } else {
            // Case B: Set probabilities for each block
            switch (block) {
                case 1:
                    blockTrialsCount = cantidad_ensayos_bloque_1;
                    leftRewardChance = 0.25;
                    rightRewardChance = 0.75;
                    break;
                case 2:
                    blockTrialsCount = cantidad_ensayos_bloque_2;
                    leftRewardChance = 0.75;
                    rightRewardChance = 0.25;
                    break;
                case 3:
                    blockTrialsCount = cantidad_ensayos_bloque_3;
                    leftRewardChance = 0.25;
                    rightRewardChance = 0.75;
                    break;
                default:
                    return [];
            }
        }

        for (let i = 0; i < blockTrialsCount; i++) {
            const isLeftWin = Math.random() < leftRewardChance;
            testTrials.push({
                leftReward: isLeftWin,
                rightReward: !isLeftWin
            });
        }

        return testTrials;
    }

    function resetSlotMachines() {
        leftSlot.src = 'img/slot-machine-left-up.png';
        rightSlot.src = 'img/slot-machine-right-up.png';
    }

    async function downloadResults() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }

        const zip = new JSZip();

        let csvContent = "bq;en;rp_derecha;rp_izquierda;rp;resultado;tr\n";
        csvContent += results.map(e => e.join(";")).join("\n");

        const totalTaskTime = (Date.now() - totalStartTime) / 1000;
        let txtContent = `Tiempo Dedicado a la Tarea: ${totalTaskTime} s\n`;
        txtContent += `Mano Utilizada: ${selectedHand}\n`;

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const date = `${day}_${month}_${year}`;

        // Añadir archivos al ZIP
        zip.file(`${idParticipante}_decision_making_${date}.csv`, csvContent);
        zip.file(`${idParticipante}_decision_making_${date}.txt`, txtContent);
        const fileName = `${idParticipante}_decision_making_${date}.zip`;

        // Generar y descargar el archivo ZIP
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.close();
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
