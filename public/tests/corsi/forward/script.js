document.addEventListener('DOMContentLoaded', () => {
    const blocksContainer = document.getElementById('blocks');
    const instructionsAudio = document.getElementById('instructionAudio');
    const instructions = document.getElementById('instructionText');
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

    let isPractice = true;
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
        { "top": 185, "left": 125 },
        { "top": 58, "left": 380 },
        { "top": 20, "left": 632 },
        { "top": 440, "left": 188 },
        { "top": 312, "left": 358 },
        { "top": 145, "left": 890 },
        { "top": 590, "left": 400 },
        { "top": 397, "left": 656 },
        { "top": 548, "left": 825 }
    ];

    const practiceSequences = [
        [2, 3],
        [4, 5]
    ]

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
        introScreen.style.display = 'none';
        game.style.display = 'block';
        startSequenceButton.style.visibility = 'visible';
        startSequenceButton.style.display = 'inline-block';
        endSequenceButton.style.display = 'none'; // Ocultar el botón "Terminar" al iniciar el test
        highestCount = 0;
        totalCorrectBlocks = 0;
        sequenceCount = 0;
        repeatCount = 0; // Reiniciar el contador de repeticiones
        errorCount = 0;
        if (isPractice) {
            createBlocks();
            indicator.textContent = `P${sequenceCount+1}`;
        } else {
            startTime = new Date(); // Registrar la hora de inicio
            indicator.textContent = `S${count}-${repeatCount+1}`;
        }
    }

    function startSequence() {
        playerSequence = [];
        if (isPractice) {
            createSequence(practiceSequences)
        } else{
            createSequence(fixedSequences);
        }
        sequenceDisplaying = true;
        displaySequence(0);
        startSequenceButton.style.visibility = 'hidden';
        indicator.style.display = 'block';
    }

    function createSequence(currentSequences) {
        sequence = currentSequences[sequenceCount % currentSequences.length];
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

        if (isPractice) {
            indicator.textContent = `P${sequenceCount+1}`;
            if (sequenceCount < practiceSequences.length) {
                setTimeout(resetBlocks, 500);
                setTimeout(() => {
                    endSequenceButton.style.display = 'none'; // Ocultar el botón "Terminar" después de que se presione
                    startSequence();
                }, 2000); // Retraso de 2 segundos antes de comenzar la siguiente secuencia
            } else {
                endPractice();
            }
        } else {
            if (errorCount === 2 || sequenceCount === fixedSequences.length) {
                endGame();
            } else {
                repeatCount++; // Incrementar el contador de repeticiones
                if (repeatCount === 2) {
                    count++; // Incrementar la longitud de la secuencia después de 2 repeticiones
                    repeatCount = 0; // Reiniciar el contador de repeticiones
                }
                indicator.textContent = `S${count}-${repeatCount+1}`;
                setTimeout(resetBlocks, 500);
                setTimeout(() => {
                    endSequenceButton.style.display = 'none'; // Ocultar el botón "Terminar" después de que se presione
                    startSequence();
                }, 2000); // Retraso de 2 segundos antes de comenzar la siguiente secuencia
            }
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
        resultText.innerHTML = `¡Has completado esta tarea con éxito! <br> ¡Muchas gracias!`
        console.log(`Tu mayor Corsi span es ${highestCount} ítems. Total de bloques correctos seleccionados: ${totalCorrectBlocks}. Tiempo total: ${duration.toFixed(2)} segundos.`);
        game.style.display = 'none';
        resultScreen.style.display = 'block';
        count = 2;
        errorCount = 0;
        resetBlocks();
        generateCSV(highestCount, totalCorrectBlocks, duration, sequenceCount); // Generar el CSV al final del juego
    }

    function endPractice() {
        instructionsAudio.src = 'beep.wav';
        var audioContainer = instructionsAudio.parentNode;
        audioContainer.load();
        instructions.innerHTML = 'Instrucciones despues de la practica'
        isPractice = false;
        introScreen.style.display = 'block';
        game.style.display = 'none';
        endSequenceButton.style.display = 'none';
        indicator.style.display = 'none';
        startTestButton.style.display = 'inline-block';
        resetBlocks();
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

    function setCanvasBackground(canvas, color) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    async function startCanvasRecording(canvasId) {
        const canvas = document.getElementById(canvasId);
        const stream = canvas.captureStream(30); // 30 FPS
    
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm;codecs=vp9'
        });
    
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
    
        mediaRecorder.start();
    }
    
    function stopCanvasRecording() {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm'
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'canvas-recording.webm';
            link.click();
            URL.revokeObjectURL(url);
            recordedChunks = []; // Clear recorded chunks
        };
    }

    function playBeep() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioUrl = 'beep.wav';
    
        fetch(audioUrl)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                source.start();
            })
            .catch(e => console.error('Error al cargar el archivo de audio:', e));
    }

    // createBlocks();
});
