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
    let startTime1, endTime1;
    let startTime2, endTime2, responseTime2;
    let startTime3, endTime3, responseTime3;
    let correctAnswer = "figura2-3", participantAnswer = "", accuracy = 0;
    let selectedHand = "";
    let startTimeExecution, endTimeExecution;
    let executionStartTime;



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
        console.log("Tiempo de inicio: ", formatDate(startTimeExecution));
    }

    function finishScreenReached() {
        endTimeExecution = new Date();
        console.log("Tiempo de finalización: ", formatDate(endTimeExecution));
        const executionTime = (endTimeExecution - startTimeExecution) / 1000; // Tiempo en segundos
        console.log("Tiempo de ejecución: ", executionTime); 
    }

    function finishresponse1() {
        endTime1 = new Date();
        console.log("Tiempo de finalización de tarea: ", formatDate(endTime1));
    }
    function finishresponse2() {
        endTime2 = new Date();
        console.log("Tiempo de finalización de tarea: ", formatDate(endTime2)); 
       
    }
    function finishresponse3() {
        endTime3 = new Date();
        console.log("Tiempo de finalización de tarea: ", formatDate(endTime3)); 
    }

    // Audio

    // Guardar el tiempo total desde el inicio de la página
    const pageLoadTime = new Date();

    const audioElement1 = document.getElementById('audio1');
    if (audioElement1) {
        audioElement1.addEventListener('ended', () => {
            console.log("El audio ha terminado."); // Verificación de evento de audio
            setTimeout(() => {
                finishDrawingWithFigureButton.classList.add('red-arrow');
            }, 4 * 60 * 1000); // 10 segundos
            startTime1 = new Date();
            console.log("Tiempo de inicio Tarea: ", formatDate(startTime1));
        });
    }

    const audioElement2 = document.getElementById('audio2');
    if (audioElement2) {
        audioElement2.addEventListener('ended', () => {
            console.log("El audio ha terminado."); // Verificación de evento de audio
            startTime2 = new Date();
            console.log("Tiempo de inicio Tarea: ", formatDate(startTime2));
        });
    }

    const audioElement3 = document.getElementById('audio3');
    if (audioElement3) {
        audioElement3.addEventListener('ended', () => {
            console.log("El audio ha terminado."); // Verificación de evento de audio
            startTime3 = new Date();
            console.log("Tiempo de inicio Tarea: ", formatDate(startTime3));
        });
    }

    

    const beepAudio = new Audio('beep.wav');

    function startCountdown(duration) {
        let timeLeft = duration;
        const countdownElement = document.getElementById('contador');

        countdownInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                beepAudio.play(); // Reproduce el beep cuando el tiempo llega a 0
            } else {
                timeLeft -= 1000; // Disminuye el tiempo en 1 segundo (1000 ms)
                updateCountdown(timeLeft);
            }
        }, 1000);
    }

    function enterFinishScreen() {
        finishScreen.style.display = 'block';
        startCountdown(10 * 60 * 1000); // 10 minutos en milisegundos
    }

    function finishScreenReached() {
        endTimeExecution = new Date();
        console.log("Tiempo de finalización: ", formatDate(endTimeExecution));
        const executionTime = (endTimeExecution - startTimeExecution) / 1000; // Tiempo en segundos
        console.log("Tiempo de ejecución: ", executionTime);
        enterFinishScreen(); // Muestra la pantalla de finalización y comienza el temporizador
    }



    function updateCountdown(timeLeft) {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        const countdownElement = document.getElementById('contador');

        if (countdownElement) {
            countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
                finishScreenReached();
            }
            if (finishRememberingFigureButton) {
                finishRememberingFigureButton.addEventListener('click', () => {
                    instruccionesDespues.style.display = 'none';
                    selectHandContainer.style.display = "block";
                });
            }


            finishresponse1();
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

            endTime2 = new Date();
            localStorage.setItem('secondTestEndTime', endTime2.getTime().toString());
            finishresponse2();
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
                participantAnswer = selectedFigure.alt;
                accuracy = (correctAnswer === participantAnswer) ? 1 : 0;

                finishresponse3();
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
            let executionTime; // Definimos la variable executionTime
    
            if (finishRememberingFigureButton) {
                finishScreenReached(); // Calcula endTimeExecution y executionTime
                executionTime = (endTimeExecution - startTimeExecution) / 1000; // Calcula el tiempo de ejecución
                saveResultsToCSV('DibujoConFigura', pageLoadTime, endTimeExecution, startTime1, endTime1, selectedHand, "", "", "");
                stopCanvasRecording('DrawWithFigure');
                downloadCanvas('drawing-canvas', 'DrawWithFigure.png');
            }
            if (finishDrawingFromMemoryButton) {
                finishScreenReached();
                executionTime = (endTimeExecution - startTimeExecution) / 1000; // Calcula el tiempo de ejecución
                saveResultsToCSV('DibujoDesdeMemoria', pageLoadTime, endTimeExecution, startTime2, endTime2, selectedHand, "", "", "");
                stopCanvasRecording('DrawFromMemory');
                downloadCanvas('memory-canvas', 'DrawFromMemory.png');
            }
            if (finishIdentifyingFigureButton) {
                finishScreenReached();
                executionTime = (endTimeExecution - startTimeExecution) / 1000; // Calcula el tiempo de ejecución
                saveResultsToCSV('IdentificacionDeFigura', pageLoadTime, endTimeExecution, startTime3, endTime2, selectedHand, correctAnswer, participantAnswer, accuracy);
                stopCanvasRecording('IdentifyFigure');
            }



            // Ocultar todos los otros elementos
            container2.style.display = 'none';
            selectHandContainer.style.display = 'none';
    
            // Mostrar solo la pantalla de finalización
            finishScreen.style.display = 'block';
        });
    }
    


    function setCanvasBackground(canvas, color) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function initCanvas(canvasId, clearButtonId, downloadButtonId) {
        const canvas = document.getElementById(canvasId);
        const clearButton = document.getElementById(clearButtonId);
        const ctx = canvas.getContext('2d');
    
        setCanvasBackground(canvas, 'white');
        ctx.strokeStyle = 'black';
    
        let drawing = false;
        let x = 0;
        let y = 0;
    
        function getTouchPos(canvas, touchEvent) {
            const rect = canvas.getBoundingClientRect();
            const touch = touchEvent.touches[0];
    
            // Ajustar para la rotación de 270 grados
            const rotatedX = rect.bottom - touch.clientY;
            const rotatedY = touch.clientX - rect.left;
    
            return {
                x: rotatedX,
                y: rotatedY
            };
        }
    
        canvas.addEventListener('mousedown', (e) => {
            x = e.offsetX;
            y = e.offsetY;
            drawing = true;
        });
    
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touchPos = getTouchPos(canvas, e);
            x = touchPos.x;
            y = touchPos.y;
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
    
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (drawing) {
                const touchPos = getTouchPos(canvas, e);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(touchPos.x, touchPos.y);
                ctx.stroke();
                x = touchPos.x;
                y = touchPos.y;
            }
        });
    
        canvas.addEventListener('mouseup', () => {
            drawing = false;
        });
    
        canvas.addEventListener('touchend', () => {
            drawing = false;
        });
    
        canvas.addEventListener('mouseleave', () => {
            drawing = false;
        });
    
        canvas.addEventListener('touchleave', () => {
            drawing = false;
        });
    
        clearButton.addEventListener('click', () => {
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

    function saveResultsToCSV(activity, startTime, endTime, taskStartTime, taskEndTime, hand, correctAnswer, participantAnswer, accuracy, executionTime) {
        const totalTime = (endTime - startTime) / 1000; // en segundos
        const rows = [
            ["Actividad", "Tiempo de Inicio", "Tiempo de Fin", "Tiempo Total (s)", "Tiempo Inicio de Tarea (s)", "Tiempo de Finalizacion de Tarea (s)", "Mano Utilizada", "Respuesta Correcta", "Respuesta Participante", "Precisión"],
            [activity, formatDate(startTime), formatDate(endTime), totalTime, formatDate(taskStartTime), formatDate(taskEndTime), hand, correctAnswer, participantAnswer, accuracy]
        ];
    
        let csvContent = "data:text/csv;charset=utf-8," 
            + rows.map(e => e.join(";")).join("\n");
    
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
