document.addEventListener('DOMContentLoaded', () => {
    const fullscreenButton = document.getElementById('fullscreen-button');
    const finishScreen = document.getElementById('finishScreen');
    const container2 = document.querySelector('.container2');

    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");
    const handInputs = document.getElementsByName('hand');
    
    // Pantalla de dibujo con figura
    const finishDrawingWithFigureButton = document.getElementById('finish-drawing-with-figure');
    const instruccionesDespues = document.getElementById('instruccionesdespues');
    const finishRememberingFigureButton = document.getElementById("finalize-button");

    // Pantalla de dibujo desde memoria
    const drawFromMemoryScreen = document.getElementById('draw-from-memory-screen');
    const finishDrawingFromMemoryButton = document.getElementById('finish-drawing-from-memory');

    // Pantalla de identificación de figura
    const identifyFigureScreen = document.getElementById('identify-figure-screen');
    const finishIdentifyingFigureButton = document.getElementById('finish-identifying-figure');
    const selectableImages = document.querySelectorAll('.selectable');

    let selectedFigure = null;
    let mediaRecorder;
    let recordedChunks = [];
    let countdownInterval;
    let startTime1, endTime1, responseTime1;
    let startTime2, endTime2, responseTime2;
    let startTime3, endTime3, responseTime3;
    let correctAnswer = "figura2-3", participantAnswer = "", accuracy = 0;
    let selectedHand = "";
    let startTimeExecution, endTimeExecution;
    let executionStartTime;

    initAudioContext();



    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    function enterContainer2() {
        startTimeExecution = new Date();
        console.log("Tiempo de inicio: ", startTimeExecution); // Debugging
    }

    function finishScreenReached() {
        endTimeExecution = new Date();
        console.log("Tiempo de finalización: ", endTimeExecution); // Debugging
        const executionTime = (endTimeExecution - startTimeExecution) / 1000; // Tiempo en segundos
        console.log("Tiempo de ejecución: ", executionTime); // Debugging
    }

    container2.addEventListener('transitionend', enterContainer2); // Ejemplo de evento que podrías usar
    finishScreen.addEventListener('transitionend', finishScreenReached); // Ejemplo de evento que podrías usar
    
    // Audio
    const audioElement1 = document.getElementById('audio1');
    const audioElement2 = document.getElementById('audio2');
    const audioElement3 = document.getElementById('audio3');

    // Guardar el tiempo total desde el inicio de la página
    const pageLoadTime = new Date();

    if (audioElement1) {
        audioElement1.addEventListener('ended', () => {
            setTimeout(() => {
                finishDrawingWithFigureButton.classList.add('red-arrow');
            }, 5000); // 5 segundos
            responseTime1 = new Date();
        });
    }
    
    if (audioElement2) {
        audioElement2.addEventListener('ended', () => {
            responseTime2 = new Date();
        });
    }
    
    if (audioElement3) {
        audioElement3.addEventListener('ended', () => {
            responseTime3 = new Date();
        });
    }
    

    const beepAudio = new Audio('beep.wav');

    if (drawFromMemoryScreen || identifyFigureScreen) {
        const firstTestEndTime = localStorage.getItem('firstTestEndTime');
        const secondTestEndTime = localStorage.getItem('secondTestEndTime');
        if (firstTestEndTime) {
            const now = new Date().getTime();
            const endTime = new Date(parseInt(firstTestEndTime)).getTime();
            const timeLeft = endTime + 0.05 * 60 * 1000 - now;
            if (timeLeft > 0) {
                disableStartButton(timeLeft);
            }
        }
        if (secondTestEndTime) {
            const now = new Date().getTime();
            const endTime = new Date(parseInt(secondTestEndTime)).getTime();
            const timeLeft = endTime + 0.05 * 60 * 1000 - now;
            if (timeLeft > 0) {
                disableStartButton(timeLeft);
            }
        }
    }

    // Practica 1
    if (finishDrawingWithFigureButton) {
        enterContainer2();
        finishDrawingWithFigureButton.addEventListener('click', () => {
            if (container2.style.display === 'none') {
                container2.style.display = 'block';

                instruccionesDespues.style.display = 'none';
            } else if (instruccionesDespues.style.display === 'none') {
                container2.style.display = 'none';
                instruccionesDespues.style.display = 'block';
            } else if (selectHandContainer.style.display === 'none') {
                instruccionesDespues.style.display = 'none';
                handButton.style.display = 'block';
            } else{
                handButton.style.display = 'none';
                finishScreen.style.display = 'block';
                
            }

            if (finishRememberingFigureButton) {
                finishRememberingFigureButton.addEventListener('click', () => {
                    instruccionesDespues.style.display = 'none';
                    selectHandContainer.style.display = "block";
                });
            }
            stopCanvasRecording('DrawWithFigure');
            downloadCanvas('drawing-canvas', 'DrawWithFigure.png');
            endTime1 = new Date();
            localStorage.setItem('firstTestEndTime', endTime1.getTime().toString());
        });
        initCanvas('drawing-canvas', 'clear-canvas-button', 'download-canvas-button');
        startCanvasRecording('drawing-canvas');
    }


    // Practica 2
    if (finishDrawingFromMemoryButton) {
        enterContainer2();
        finishDrawingFromMemoryButton.addEventListener('click', () => {
            if (container2.style.display === 'none') {
                container2.style.display = 'block';
                selectHandContainer.style.display = 'none';
            } else if (selectHandContainer.style.display === 'none'){
                container2.style.display = 'none';
                selectHandContainer.style.display = 'block';
            } else{
                selectHandContainer.style.display = 'none';
                finishScreen.style.display = 'none';
            }
            stopCanvasRecording('DrawFromMemory');
            downloadCanvas('memory-canvas', 'DrawFromMemory.png');
            endTime2 = new Date();
            localStorage.setItem('secondTestEndTime', endTime2.getTime().toString());
        });
        initCanvas('memory-canvas', 'clear-memory-canvas-button', 'download-memory-canvas-button');
        startCanvasRecording('memory-canvas');
    }
    
    // Practica 3
    if (finishIdentifyingFigureButton) {
        enterContainer2();
        finishIdentifyingFigureButton.addEventListener('click', () => {
            if (selectedFigure) {
                if (container2.style.display === 'none') {
                    container2.style.display = 'block';
                    selectHandContainer.style.display = 'none';
                } else if (selectHandContainer.style.display === 'none') {
                    container2.style.display = 'none';
                    selectHandContainer.style.display = 'block';
                }
                const link = document.createElement('a');
                link.href = selectedFigure.src;
                link.download = 'Respuesta.png';
                link.click();
                endTime3 = new Date();
                responseTime3 = (endTime3 - startTime3) / 1000; // en segundos

                participantAnswer = selectedFigure.alt;
                accuracy = (correctAnswer === participantAnswer) ? 1 : 0;
                localStorage.setItem('thirdTestEndTime', endTime3.getTime().toString());
                stopCanvasRecording('IdentifyFigure');
            } else {
                alert('Por favor, selecciona una figura antes de continuar.');
            }
        });
        selectableImages.forEach(image => {
            image.addEventListener('click', (event) => {
                if (selectedFigure) {
                    selectedFigure.classList.remove('selected');
                }
                selectedFigure = event.target;
                selectedFigure.classList.add('selected');
                participantAnswer = selectedFigure.dataset.figure;
            });
        });
    }

    document.getElementById('handButton').addEventListener('click', () => {
        selectedHand = document.querySelector('input[name="hand"]:checked').value;
    });

    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            selectedHand = e.target.value;
        });
    }); 

    if (handButton) {
        handButton.addEventListener('click', () => {
            if (finishRememberingFigureButton) {
                finishScreenReached();
                saveResultsToCSV('DibujoConFigura', pageLoadTime, endTime1, selectedHand, "", "", "", responseTime1);
                
            }
            if (finishDrawingFromMemoryButton) {
                finishScreenReached();
                saveResultsToCSV('DibujoDesdeMemoria', pageLoadTime, endTime2, selectedHand, "", "", "", responseTime2);
                
            }
            if (finishIdentifyingFigureButton) {
                finishScreenReached();
                saveResultsToCSV('IdentificacionDeFigura', pageLoadTime, endTime3, selectedHand, correctAnswer, participantAnswer, accuracy, responseTime3);
            }
    
            // Ocultar todos los otros elementos
            container2.style.display = 'none';
            selectHandContainer.style.display = 'none';
    
            // Mostrar solo la pantalla de finalización
            finishScreen.style.display = 'block';
        });
    }

    function startCountdown(duration) {
        let timeLeft = duration;
        countdownInterval = setInterval(() => {
            timeLeft--;
        }, 1000);
    }

    function updateCountdown(timeLeft) {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        const countdownElement = document.getElementById('contador');
    }

    function setCanvasBackground(canvas, color) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function initCanvas(canvasId, clearButtonId, downloadButtonId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');

        setCanvasBackground(canvas, 'white');
        ctx.strokeStyle = 'black';

        let drawing = false;
        let x = 0;
        let y = 0;

        canvas.addEventListener('mousedown', (e) => {
            x = e.offsetX;
            y = e.offsetY;
            drawing = true;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (drawing) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                x = e.offsetX;
                y = e.offsetY;
            }
        });

        canvas.addEventListener('mouseup', () => {
            drawing = false;
        });

        canvas.addEventListener('mouseleave', () => {
            drawing = false;
        });

        document.getElementById(clearButtonId).addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setCanvasBackground(canvas, 'white');
        });

        document.getElementById(downloadButtonId).addEventListener('click', () => {
            downloadCanvas(canvasId, canvasId + '.png');
        });
    }

    function downloadCanvas(canvasId, filename) {
        const canvas = document.getElementById(canvasId);
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    async function startCanvasRecording(canvasId) {
        const canvas = document.getElementById(canvasId);
        const stream = canvas.captureStream(30);

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

    function stopCanvasRecording(activity) {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, {
                    type: 'video/webm'
                });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${activity}-recording.webm`;
                link.click();
                URL.revokeObjectURL(url);
                recordedChunks = [];
            };
        }
    }

    function initAudioContext() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    function saveResultsToCSV(activity, startTime, endTime, hand, correctAnswer, participantAnswer, accuracy, responseTime, executionTime) {
        const totalTime = (endTime - startTime) / 1000; // en segundos
        const rows = [
            ["Actividad", "Tiempo de Inicio", "Tiempo de Fin", "Tiempo Total (s)", "Tiempo de Respuesta (s)", "Mano Utilizada", "Respuesta Correcta", "Respuesta Participante", "Precisión", "Tiempo de Ejecución (s)"],
            [activity, formatDate(startTime), formatDate(endTime), totalTime, responseTime, hand, correctAnswer, participantAnswer, accuracy, executionTime]
        ];

        let csvContent = "data:text/csv;charset=utf-8," 
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${activity}-resultados.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }
});
