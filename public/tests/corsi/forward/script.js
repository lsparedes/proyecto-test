document.addEventListener('DOMContentLoaded', () => {
    const blocksContainer = document.getElementById('blocks');
    const startTestButton = document.getElementById('startTestButton');
    const startSequenceButton = document.getElementById('startSequenceButton');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const introScreen = document.getElementById('introScreen');
    const game = document.getElementById('game');
    const resultScreen = document.getElementById('resultScreen');
    const resultText = document.getElementById('resultText');
    const endSequenceButton = document.createElement('button'); // Crear el botón "Terminar"
    endSequenceButton.id = 'endSequenceButton'; // Asignar el id para aplicar estilos CSS
    endSequenceButton.style.display = 'none'; // Ocultar el botón inicialmente
    game.appendChild(endSequenceButton);
    const indicator = document.createElement('div');
    indicator.classList.add('imageText');
    indicator.style.display = 'none';
    game.appendChild(indicator);

    let sequence = [];
    let playerSequence = [];
    let count = 2;
    let errorCount = 0;
    let sequenceDisplaying = false;
    let highestCount = 0;
    let totalCorrectBlocks = 0;
    let sequenceCount = 0;
    let startTime;
    let endTime;
    let repeatCount = 0; // Contador de repeticiones de la secuencia actual

    // Posiciones fijas de los cuadrados
    const fixedPositions = [
        { top: 150, left: 80 },
        { top: 50, left: 360 },
        { top: 30, left: 650 },
        { top: 400, left: 170 },
        { top: 280, left: 360 },
        { top: 150, left: 950 },
        { top: 550, left: 400 },
        { top: 350, left: 750 },
        { top: 500, left: 900 }
    ];

    // Secuencias fijas de bloques
    const fixedSequences = [
        [2, 4],
        [0, 7],
        [7, 5, 8],
        [2, 6, 4],
        [8, 0, 7, 8],
        [3, 7, 6, 5],
        [4, 8, 6, 2, 0],
        [7, 8, 5, 5, 6],
        [3, 1, 8, 7, 2, 5],
        [3, 5, 2, 8, 1, 7],
        [4, 1, 6, 5, 7, 8, 2],
        [4, 5, 1, 8, 2, 7, 0],
        [4, 2, 6, 1, 8, 0, 7, 5],
        [4, 1, 3, 0, 5, 8, 7, 3],
        [4, 3, 2, 5, 6, 8, 7, 0, 1],
        [7, 8, 0, 2, 6, 6, 1, 3, 4]
    ];

    function createBlocks() {
        blocksContainer.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const block = document.createElement('div');
            block.classList.add('block');
            block.dataset.index = i;
            block.style.top = fixedPositions[i].top + 'px';
            block.style.left = fixedPositions[i].left + 'px';
            blocksContainer.appendChild(block);
            block.addEventListener('click', handleBlockClick);
        }

        // Rotar el container de los bloques
        blocksContainer.style.transform = 'rotate(180deg)';
    }

    function handleBlockClick(event) {
        if (sequenceDisplaying) return;

        const index = parseInt(event.target.dataset.index);
        if (playerSequence.length < sequence.length) {
            resetBlocks(); // Desmarcar todos los bloques antes de marcar el actual
            playerSequence.push(index);
            event.target.classList.add('selected');
        }
    }

    function startTest() {
        playerSequence = [];
        createBlocks();
        introScreen.style.display = 'none';
        game.style.display = 'block';
        startSequenceButton.style.display = 'inline-block';
        endSequenceButton.style.display = 'none'; // Ocultar el botón "Terminar" al iniciar el test
        indicator.textContent = `P${sequenceCount+1}`;
        highestCount = 0;
        totalCorrectBlocks = 0;
        sequenceCount = 0;
        repeatCount = 0; // Reiniciar el contador de repeticiones
        startTime = new Date(); // Registrar la hora de inicio
    }

    function startSequence() {
        playerSequence = [];
        createSequence();
        sequenceDisplaying = true;
        displaySequence(0);
        startSequenceButton.style.display = 'none';
        indicator.style.display = 'block';
    }

    function createSequence() {
        sequence = fixedSequences[sequenceCount % fixedSequences.length];
    }

    function displaySequence(index) {
        if (index < sequence.length) {
            const block = blocksContainer.children[sequence[index]];
            block.style.backgroundColor = 'yellow';
            setTimeout(() => {
                block.style.backgroundColor = 'blue';
                setTimeout(() => displaySequence(index + 1), 300);
            }, 500);
        } else {
            sequenceDisplaying = false;
            endSequenceButton.style.display = 'inline-block'; // Mostrar el botón "Terminar" después de mostrar la secuencia
            playBeep(); // Llamar a playBeep aquí para reproducir el sonido después de la secuencia
        }
    }

    function playBeep() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
    
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
    
        oscillator.frequency.value = 1000; // Frecuencia en Hz
        gainNode.gain.value = 0.1; // Volumen
    
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1); // Duración del sonido en segundos
    }

    function checkSequence() {
        let correct = true;
        for (let i = 0; i < sequence.length; i++) {
            if (sequence[i] !== playerSequence[i]) {
                correct = false;
                break;
            }
        }

        if (correct) {
            highestCount = Math.max(highestCount, count);
            totalCorrectBlocks += playerSequence.length;
            errorCount = 0;
        } else {
            errorCount++;
        }

        sequenceCount++; // Incrementar la cuenta de secuencias
        indicator.textContent = `P${sequenceCount+1}`;

        if (errorCount === 2 || count > 9) {
            endGame();
        } else {
            repeatCount++; // Incrementar el contador de repeticiones
            if (repeatCount === 2) {
                count++; // Incrementar la longitud de la secuencia después de 2 repeticiones
                repeatCount = 0; // Reiniciar el contador de repeticiones
            }
            setTimeout(resetBlocks, 500);
            setTimeout(() => {
                endSequenceButton.style.display = 'none'; // Ocultar el botón "Terminar" después de que se presione
                startSequence();
            }, 2000); // Retraso de 2 segundos antes de comenzar la siguiente secuencia
        }
    }

    function resetBlocks() {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            block.classList.remove('selected');
            block.style.backgroundColor = 'blue';
        });
    }

    function endGame() {
        endTime = new Date(); // Registrar la hora de finalización
        const duration = (endTime - startTime) / 1000; // Duración en segundos
        resultText.innerHTML = `El test ha finalizado. ¡Gracias por sus respuestas! <br>`
        console.log(`Tu mayor Corsi span es ${highestCount} ítems. Total de bloques correctos seleccionados: ${totalCorrectBlocks}. Tiempo total: ${duration.toFixed(2)} segundos.`);
        game.style.display = 'none';
        resultScreen.style.display = 'block';
        count = 2;
        errorCount = 0;
        resetBlocks();
        generateCSV(highestCount, totalCorrectBlocks, duration, sequenceCount); // Generar el CSV al final del juego
    }

    function generateCSV(corsiSpan, totalCorrectBlocks, duration, sequenceCount) {
        const date = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });
        const fileName = `CorsiForwardTest_${date.replace(/[:\/, ]/g, "_")}.csv`;
        const csvContent = `Corsi Span,Total Bloques Correctos,Tiempo (segundos)\n${corsiSpan},${totalCorrectBlocks},${duration.toFixed(2)}`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, fileName);
    }

    startTestButton.addEventListener('click', () => {
        startTest();
    });

    startSequenceButton.addEventListener('click', () => {
        startSequence();
    });

    endSequenceButton.addEventListener('click', () => {
        checkSequence(); // Llamar a checkSequence cuando se presione "Terminar"
        endSequenceButton.style.display = 'none'; // Ocultar el botón "Terminar" después de que se presione
    });

    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenEnabled) {
            document.documentElement.requestFullscreen();
        } else {
            console.log('El modo de pantalla completa no es soportado por tu navegador.');
        }
    });

    createBlocks();
});
