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
        { "top": 540, "left": 320 },
        { "top": 490, "left": 700 },
        { "top": 400, "left": 130 },
        { "top": 360, "left": 560 },
        { "top": 280, "left": 280 },
        { "top": 170, "left": 80 },
        { "top": 160, "left": 730 },
        { "top": 50, "left": 540 },
        { "top": 70, "left": 300 }
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
        highestCount = 0;
        totalCorrectBlocks = 0;
        sequenceCount = 0;
        repeatCount = 0;
        errorCount = 0;
        indicator.style.display = 'block';
        if (isPractice) {
            createBlocks();
            indicator.textContent = `P${sequenceCount + 1}`;
        } else {
            indicator.textContent = `S${count}-${repeatCount + 1}`;
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
        if (!sequenceDisplaying) return null;
        if (index < sequence.length) {
            const block = blocksContainer.children[sequence[index]];
            block.style.backgroundColor = 'yellow';
            setTimeout(() => {
                block.style.backgroundColor = 'rgb(29, 63, 255)';
                setTimeout(() => displaySequence(index + 1), 300);
            }, 500);
            if (index === sequence.length - 1) {
                setTimeout(() => playBeep(), 500);
            }
        } else {
            sequenceDisplaying = false;
            continueTest = true;
            endSequenceButton.style.cursor = 'pointer';
            startTimer();
        }
    }

    function checkSequence() {
        let correct = true;

        if (playerSequence.length === 0) {
            correct = false;
        } else {
            for (let i = 0; i < sequence.length; i++) {
                if (sequence[i] !== playerSequence[i]) {
                    correct = false;
                    break;
                }
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
            indicator.textContent = `P${sequenceCount + 1}`;
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
                indicator.textContent = `S${count}-${repeatCount + 1}`;
                setTimeout(resetBlocks, 500);
                setTimeout(() => {
                    startSequenceButton.style.visibility = 'visible';
                }, 500);
            }
        }
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Obtener el id_participante de la URL
    const idParticipante = getQueryParam('id_participante');

    function resetBlocks() {
        const blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            block.classList.remove('selected');
            block.style.backgroundColor = 'rgb(29, 63, 255)';
        });
    }

    async function endGame() {
        console.log("Descargando ZIP...");
        await downloadResultsAsZip(testData, startTime, selectedHand);
    }
    

    function endPractice() {
        instructionsAudio.src = 'sonidos/Directo_2.wav';
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
        sequenceDisplaying = false;
        resetBlocks();
    }

    startTestButton.addEventListener('click', async () => {
        if (isPractice) {
            startTime = new Date();
            console.log('Inicio');
        }
        var audioContainer = instructionsAudio.parentNode;
        audioContainer.pause();
        if (!isPractice) {
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
            if (!isPractice) {
                const exerciseData = {
                    exerciseTitle: fixedTitles[sequenceCount],
                    correctAnswer: sequence,
                    userResponse: playerSequence,
                    responseTime: milliseconds / 1000,
                };
                testData.push(exerciseData);
            }
            checkSequence();
        } else if (sequenceDisplaying) {
            sequenceDisplaying = false;
            continueTest = false;
            stopTimer();
            resetBlocks();
            checkSequence();
        } else {
            stopTimer();
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
        const audioUrl = 'sonidos/beep.wav';

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


    document.getElementById('handButton').addEventListener('click', confirmHandSelection);

    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

        if (selectedHand) {
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

    function generateCSV(results) {
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return {
                content: "",
                filename: ""
            };
        }

        const initials = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase(); // Obtener iniciales
        const headers = ["Trial", "CorrResp", "PartResp", "Acc", "RT", "Examinador"];
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
                initials // Agregar iniciales
            ];
        });

        const desiredRowCount = fixedSequences.length;
        const currentRowCount = rows.length;
        const rowsToFill = desiredRowCount - currentRowCount;

        for (let i = 0; i < rowsToFill; i++) {
            rows.push([
                fixedTitles[currentRowCount + i],
                fixedSequences[currentRowCount + i].map(num => num + 1).join(""),
                "",
                0,
                "",
                initials // Agregar iniciales también en las filas faltantes
            ]);
        }

        const csvContent = headers.join(";") + "\n" + rows.map(e => e.join(";")).join("\n");
        return {
            content: csvContent,
            filename: `${idParticipante}_10_Span_Visuoespacial_Directo_${getCurrentDate()}.csv`
        };
    }


    function generateCSV2(startTimeTotal, selectedHand) {
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return {
                content: "",
                filename: ""
            };
        }

        const initials = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase(); // Obtener iniciales
        const headers = ["TotTime", "Hand", "Examinador"];
        const totalTimeSeconds = ((new Date() - startTimeTotal) / 1000).toFixed(3).replace('.', ',');

        const data = [
            totalTimeSeconds,
            selectedHand,
            initials
        ];

        const txtContent = [headers, data].map(row => row.join(";")).join("\n");

        return {
            content: txtContent,
            filename: `${idParticipante}_10_Span_Visuoespacial_Directo_Unival_${getCurrentDate()}.csv`
        };
    }



    async function downloadZip(csvFile, txtFile) {
        const zip = new JSZip();
        zip.file(csvFile.filename, csvFile.content);
        zip.file(txtFile.filename, txtFile.content);
        
        const videoBlob = await stopScreenRecording();
        console.log("Video Blob:", videoBlob); // Verifica si el Blob del video se genera correctamente.
    
        if (!videoBlob || videoBlob.size === 0) {
            console.error("Error: No se grabó el video o está vacío.");
        } else {
            zip.file(`${idParticipante}_10_Span_Visuoespacial_Directo_${getCurrentDate()}.webm`, videoBlob);
        }
    
        const zipContent = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(zipContent);
        link.setAttribute("download", `${idParticipante}_10_Span_Visuoespacial_Directo_${getCurrentDate()}.zip`);
        document.body.appendChild(link);
    
        link.click();
        document.body.removeChild(link);
    
        setTimeout(() => {
            window.close();
        }, 3000);
    }
    


    async function downloadResultsAsZip(results, startTimeTotal, selectedHand) {
        const csvFile = generateCSV(results);
        const txtFile = generateCSV2(startTimeTotal, selectedHand);
        await downloadZip(csvFile, txtFile);
    }
});
