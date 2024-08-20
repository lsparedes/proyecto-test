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
    let startTime = 0;
    let endTime;
    let repeatCount = 0; // Contador de repeticiones de la secuencia actual
    let testData = [];
    let timer;
    let milliseconds = 0;
    let continueTest = false;

    let mediaRecorder;
    let recordedChunks = [];

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
    ];

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

        blocksContainer.style.transform = 'rotate(180deg)';
    }

    function handleBlockClick(event) {
        if (sequenceDisplaying) return;

        const index = parseInt(event.target.dataset.index);
        if (playerSequence.length < sequence.length) {
            if (playerSequence.length == 0 && !isPractice) {
                stopTimer();
                console.log(milliseconds);
            }
            resetBlocks();
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
        endSequenceButton.style.display = 'inline-block';
        endSequenceButton.style.cursor = 'not-allowed';
        highestCount = 0;
        totalCorrectBlocks = 0;
        sequenceCount = 0;
        repeatCount = 0;
        errorCount = 0;
        indicator.style.display = 'block';
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
        } else {
            createSequence(fixedSequences);
        }
        sequenceDisplaying = true;
        displaySequence(0);
        startSequenceButton.style.visibility = 'hidden';
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
            continueTest = true;
            endSequenceButton.style.cursor = 'pointer';
            playBeep();
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

        sequenceCount++;

        if (isPractice) {
            indicator.textContent = `P${sequenceCount+1}`;
            if (sequenceCount < practiceSequences.length) {
                setTimeout(resetBlocks, 500);
                setTimeout(() => {
                    startSequenceButton.style.visibility = 'visible';
                }, 500);
            } else {
                endPractice();
            }
        } else {
            if (errorCount === 2 || sequenceCount === fixedSequences.length) {
                game.style.display = 'none';
                showHandSelection();
            } else {
                repeatCount++;
                if (repeatCount === 2) {
                    count++;
                    repeatCount = 0;
                    errorCount = 0;
                }
                indicator.textContent = `S${count}-${repeatCount+1}`;
                setTimeout(resetBlocks, 500);
                setTimeout(() => {
                    startSequenceButton.style.visibility = 'visible';
                }, 500);
            }
        }
    }

    function resetBlocks() {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            block.classList.remove('selected');
            block.style.backgroundColor = 'rgb(29, 63, 255)';
        });
    }

    async function endGame() {
        downloadResultsAsZip(testData, startTime, selectedHand, participantID)
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

    startTestButton.addEventListener('click', async () => {
        if (isPractice) {
            startTime = new Date();
            console.log('Inicio');
        }
        var audioContainer = instructionsAudio.parentNode;
        audioContainer.pause();
        if (isPractice) {
            await startScreenRecording();
        }
        startTest();
    });

    startSequenceButton.addEventListener('click', () => {
        startSequence();
    });

    endSequenceButton.addEventListener('click', () => {
        if (continueTest) {
            continueTest = false;
            endSequenceButton.style.cursor = 'not-allowed';
            if (!isPractice) {
                const exerciseData = {
                    exerciseTitle: fixedTitles[sequenceCount],
                    correctAnswer: sequence,
                    userResponse: playerSequence,
                    responseTime: milliseconds,
                };
                testData.push(exerciseData);
            }
            checkSequence();
        }
    });

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

    async function startScreenRecording() {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
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

    function stopScreenRecording() {
        return new Promise((resolve) => {
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                resolve(blob);
            };
            mediaRecorder.stop();
        });
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
        stopTimer();
        milliseconds = 0;
        timer = setInterval(updateTimer, 10);
    }
    
    function stopTimer() {
        clearInterval(timer);
    }

    function updateTimer() {
        milliseconds += 10;
        let seconds = milliseconds / 1000;
    }

    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");
    const handInputs = document.getElementsByName('hand');

    let selectedHand = "";
    let participantID = 0;

    function showHandSelection() {
        document.getElementById("preEnd").style.display = 'block';
        selectHandContainer.style.display = "block";
    }
    
    function confirmHandSelection() {
        document.getElementById("preEnd").style.display = 'none';
        selectHandContainer.style.display = "none";
        endGame();
    }

    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            validateInputs();
            selectedHand = e.target.value;
        });
    });

    document.getElementById('participantID').addEventListener('input', validateInputs);

    document.getElementById('handButton').addEventListener('click', confirmHandSelection);
    
    function validateInputs() {
        participantID = document.getElementById('participantID').value;
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
    
        if (participantID && selectedHand) {
            handButton.style.display = 'block';
        }
    }

    window.confirmHandSelection = confirmHandSelection;

    function getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}_${month}_${year}`;
    }

    function generateCSV(results, participantID) {
        const headers = ["en", "rp_c", "rp", "pc", "tr"];
        const rows = results.map(data => {
            const correctAnswerIncremented = data.correctAnswer.map(num => num + 1);
            const userResponseIncremented = data.userResponse.map(num => num + 1);
            const precision = data.correctAnswer.join("") === data.userResponse.join("") ? 1 : 0;
            return [
                data.exerciseTitle,
                correctAnswerIncremented.join(""),
                userResponseIncremented.join(""),
                precision,
                data.responseTime,
            ];
        });
        const desiredRowCount = fixedSequences.length;
        const currentRowCount = rows.length;
        const rowsToFill = desiredRowCount - currentRowCount;
        for (let i = 0; i < rowsToFill; i++) {
            rows.push([fixedTitles[currentRowCount+i],fixedSequences[currentRowCount + i].map(num => num + 1).join(""), "", 0, ""]);
        }
        const csvContent = headers.join(";") + "\n" + rows.map(e => e.join(";")).join("\n");
        return {
            content: csvContent,
            filename: `${participantID}_corsi_directo_${getCurrentDate()}.csv`
        };
    }

    function generateTxt(startTimeTotal, selectedHand, participantID) {
        const txtContent = "Tiempo total(s): " + (new Date() - startTimeTotal) / 1000 + "\n"
            + "Mano Utilizada: " + selectedHand;
        return {
            content: txtContent,
            filename: `${participantID}_corsi_directo_${getCurrentDate()}.txt`
        };
    }

    async function downloadZip(csvFile, txtFile, participantID) {
        const zip = new JSZip();
        zip.file(csvFile.filename, csvFile.content);
        zip.file(txtFile.filename, txtFile.content);
        const videoBlob = await stopScreenRecording();
        zip.file(`${participantID}_corsi_directo_${getCurrentDate()}.webm`, videoBlob);
        
        const zipContent = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(zipContent);
        link.setAttribute("download", `${participantID}_corsi_directo_${getCurrentDate()}.zip`);
        document.body.appendChild(link);
        link.click();
    }
    
    async function downloadResultsAsZip(results, startTimeTotal, selectedHand, participantID) {
        const csvFile = generateCSV(results, participantID);
        const txtFile = generateTxt(startTimeTotal, selectedHand, participantID);
        await downloadZip(csvFile, txtFile, participantID);
    }
});
