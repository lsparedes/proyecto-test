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
    const endSequenceButton = document.createElement('button'); // Crear el botón "Terminar"
    endSequenceButton.id = 'endSequenceButton'; // Asignar el id para aplicar estilos CSS
    endSequenceButton.style.margin = '20px';
    endSequenceButton.style.display = 'none'; // Ocultar el botón inicialmente
    game.appendChild(endSequenceButton);
    const indicator = document.createElement('div');
    indicator.classList.add('imageText');
    indicator.style.display = 'none';
    game.appendChild(indicator);

    let isPractice = true;
    let sequence = [];
    let playerSequence = [];
    let count = 3;
    let errorCount = 0;
    let sequenceDisplaying = false;
    let highestCount = 0;
    let totalCorrectBlocks = 0;
    let sequenceCount = 0;
    let startTime;
    let endTime;
    let repeatCount = 0; // Contador de repeticiones de la secuencia actual
    let testData = [];
    let timer;
    let milliseconds = 0;

    // Posiciones fijas de los cuadrados
    // const fixedPositions = [
    //     { "top": "9%", "left": "51%" },
    //     { "top": "13%", "left": "28%" },
    //     { "top": "24.5%", "left": "62.7%" },
    //     { "top": "29%", "left": "37.5%" },
    //     { "top": "38%", "left": "53.5%" },
    //     { "top": "51.5%", "left": "66%" },
    //     { "top": "56%", "left": "24.7%" },
    //     { "top": "69.5%", "left": "38.5%" },
    //     { "top": "65%", "left": "52%" }
    // ];
    const fixedPositions = [
        { "top": 590, "left": 400 },
        { "top": 548, "left": 825 },
        { "top": 440, "left": 188 },
        { "top": 397, "left": 656 },
        { "top": 312, "left": 358 },
        { "top": 185, "left": 125 },
        { "top": 145, "left": 890 },
        { "top": 20, "left": 632 },
        { "top": 58, "left": 380 }
    ];

    const practiceSequences = [
        [0, 7, 6],
        [1, 8, 7]
    ]

    // Secuencias fijas de bloques
    const fixedSequences = [
        [3, 6, 1],
        [7, 0, 4],
        [2, 3, 0, 6],
        [5, 0, 4, 7],
        [4, 1, 0, 7, 5],
        [3, 1, 6, 2, 0],
        [2, 8, 1, 3, 7, 6],
        [2, 6, 7, 1, 8, 3],
        [4, 8, 0, 6, 3, 1, 7],
        [4, 6, 8, 1, 7, 3, 5],
        [4, 7, 0, 8, 1, 5, 3, 6],
        [4, 8, 2, 5, 6, 1, 3, 2],
        [4, 2, 7, 6, 0, 1, 3, 5, 8],
        [3, 1, 5, 7, 0, 6, 8, 2, 4]
    ];

    const fixedTitles = [
        "S3-1",
        "S3-2",
        "S4-1",
        "S4-2",
        "S5-1",
        "S5-2",
        "S6-1",
        "S6-2",
        "S7-1",
        "S7-2",
        "S8-1",
        "S8-2",
        "S9-1",
        "S9-2"
    ]

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
            indicator.textContent = `S${count}-${repeatCount+1}`;
        }
    }

    function startSequence() {
        playerSequence = [];
        if (isPractice) {
            createSequence(practiceSequences)
        } else{
            createSequence(fixedSequences);
            startTime = new Date(); // Registrar la hora de inicio
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
                block.style.backgroundColor = 'rgb(29, 63, 255)';
                setTimeout(() => displaySequence(index + 1), 300);
            }, 500);
        } else {
            sequenceDisplaying = false;
            endSequenceButton.style.display = 'inline-block'; // Mostrar el botón "Terminar" después de mostrar la secuencia
            playBeep(); // Llamar a playBeep aquí para reproducir el sonido después de la secuencia
            startTimer();
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
                game.style.display = 'none';
                showHandSelection();
            } else {
                repeatCount++; // Incrementar el contador de repeticiones
                if (repeatCount === 2) {
                    count++; // Incrementar la longitud de la secuencia después de 2 repeticiones
                    repeatCount = 0; // Reiniciar el contador de repeticiones
                    errorCount = 0; // Reiniciar el contador de errores
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
            block.style.backgroundColor = 'rgb(29, 63, 255);';
        });
    }

    function endGame() {
        endTime = new Date(); // Registrar la hora de finalización
        const duration = (endTime - startTime) / 1000; // Duración en segundos
        console.log(`Tu mayor Corsi span es ${highestCount} ítems. Total de bloques correctos seleccionados: ${totalCorrectBlocks}. Tiempo total: ${duration.toFixed(2)} segundos.`);
        game.style.display = 'none';
        resultScreen.style.display = 'block';
        count = 2;
        errorCount = 0;
        resetBlocks();
        generateCSV(highestCount, totalCorrectBlocks, duration, sequenceCount); // Generar el CSV al final del juego
    }

    function endPractice() {
        instructionsAudio.src = 'corsi-forward-2.mp3';
        var audioContainer = instructionsAudio.parentNode;
        audioContainer.load();
        instructions.innerHTML = 'La longitud de las secuencias que tendrá que memorizar aumentará gradualmente. Un sonido de alarma le indicará que es momento de iniciar su respuesta. Por favor, responda tan rápido como pueda.';
        isPractice = false;
        introScreen.style.display = 'block';
        document.getElementById('fullscreenButton').style.display = 'none';
        game.style.display = 'none';
        endSequenceButton.style.display = 'none';
        indicator.style.display = 'none';
        startTestButton.style.display = 'inline-block';
        sequenceDisplaying = true;
        resetBlocks();
    }

    function generateCSV(corsiSpan, totalCorrectBlocks, duration, sequenceCount) {
        const headers = ["Ejercicio", "Respuesta Correcta", "Respuesta Participante", "Precision", "Tiempo de Respuesta (s)","Tiempo Total (s)", "Mano Utilizada"];
        const rows = testData.map(data => {
            const correctAnswerIncremented = data.correctAnswer.map(num => num + 1);
            const userResponseIncremented = data.userResponse.map(num => num + 1);
            const precision = data.correctAnswer.join("") === data.userResponse.join("") ? 1 : 0;
            return [
                data.exerciseTitle,
                correctAnswerIncremented.join(""),
                userResponseIncremented.join(""),
                precision,
                data.responseTime,
                duration.toFixed(2),
                selectedHand,
            ];
        });

        const desiredRowCount = fixedSequences.length;
        const currentRowCount = rows.length;
        const rowsToFill = desiredRowCount - currentRowCount;
    
        for (let i = 0; i < rowsToFill; i++) {
            // Puedes reemplazar los valores vacíos con cualquier valor predeterminado que desees
            rows.push([fixedTitles[currentRowCount+i],fixedSequences[currentRowCount + i].map(num => num + 1).join(""), "", 0, "", "", ""]);
        }

        let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(";") + "\n"
        + rows.map(e => e.join(";")).join("\n");
        const date = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });
        const fileName = `CorsiForwardTest_${date.replace(/[:\/, ]/g, "_")}.csv`;
        saveAs(csvContent, fileName);
        // const csvContent = `Corsi Span,Total Bloques Correctos,Tiempo (segundos)\n${corsiSpan},${totalCorrectBlocks},${duration.toFixed(2)}`;
        // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        // saveAs(blob, fileName);
    }

    startTestButton.addEventListener('click', () => {
        startTest();
    });

    startSequenceButton.addEventListener('click', () => {
        startSequence();
    });

    endSequenceButton.addEventListener('click', () => {
        if (!isPractice) {
            stopTimer();

            const exerciseData = {
                exerciseTitle: fixedTitles[sequenceCount],
                correctAnswer: sequence,
                userResponse: playerSequence,
                responseTime: (milliseconds / 1000).toFixed(2),
            };
            testData.push(exerciseData);
        }
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

    function startTimer() {
        stopTimer(); // Reiniciar el timer si ya está corriendo
        milliseconds = 0; // Reiniciar los milisegundos
        timer = setInterval(updateTimer, 10); // Actualizar cada 10 ms
    }
    
    function stopTimer() {
        clearInterval(timer);
    }

    function updateTimer() {
        milliseconds += 10; // Incrementar en 10 ms
        let seconds = milliseconds / 1000; // Convertir a segundos
    }

    // createBlocks();
    
    // SELECCION DE MANO JS

    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");
    const handInputs = document.getElementsByName('hand');

    // Variable con la mano seleccionada
    let selectedHand = "";

    // Funcion para mostrar la pantalla de seleccion de mano
    function showHandSelection() {
        selectHandContainer.style.display = "block";
    }

    // Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
    // En este caso fue mostrarFinalizacion()
    function confirmHandSelection() {
        selectHandContainer.style.display = "none";
        endGame();
    }

    // Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            handButton.style.display = "block";
            selectedHand = e.target.value;
        });
    });

    window.confirmHandSelection = confirmHandSelection;
});