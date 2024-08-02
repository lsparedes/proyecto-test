document.addEventListener('DOMContentLoaded', () => {
    let startDrawingTime = null; 
    let endDrawingTime = null; 
    let startTimeExecution = null; 
    let endTimeExecution = null; 
    let recordedChunks = []; 
    let selectedHand = ""; 
    let participantID = 0; 
    let mediaRecorder = null;

    const fullscreenButton = document.getElementById('fullscreen-button');
    const finishdrawingwithfigure = document.getElementById('finish-drawing-with-figure');
    const finishRememberingFigureButton = document.getElementById("finalize-button");
    const container2 = document.querySelector('.container2');
    const instruccionesDespues = document.getElementById('instruccionesdespues');
    const finishScreen = document.getElementById('finishScreen');
    const selectHandContainer = document.getElementById("selectHand");
    const handInputs = document.getElementsByName('hand');
    const enterID = document.getElementById('enterID');

    enterContainer2(); 
    initCanvas('drawing-canvas', 'clear-canvas-button', 'download-canvas-button');

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
        console.log("Tiempo de inicio: ", startTimeExecution);
    }

    finishdrawingwithfigure.addEventListener('click', () => {
        document.getElementById('audio1').pause();
        document.getElementById('audio1_2').pause();
        container2.style.display = 'none';
        instruccionesDespues.style.display = 'block';
        endDrawingTime = new Date();
        console.log("Terminó de dibujar: ", endDrawingTime)

    });

    const audioElement1 = document.getElementById('audio1');

    if (audioElement1) {
        audioElement1.addEventListener('ended', () => {
            console.log("El audio ha terminado."); // Verificación de evento de audio
            setTimeout(() => {
                finishdrawingwithfigure.classList.add('red-arrow');
            }, 4 * 60 * 1000); // 
        });
    }

    finishRememberingFigureButton.addEventListener('click', () => {
        document.getElementById('audio1').pause();
        document.getElementById('audio1_2').pause();
        instruccionesDespues.style.display = 'none';
        finishScreen.style.display = 'block';
        selectHandContainer.style.display = 'inline-block';
        enterID.style.display = 'inline-block';
        endTimeExecution = new Date(); 
        console.log("Tiempo de Termino: ", endTimeExecution);
        startFinishTimer();
    });

    document.getElementById('participantID').addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            validateInputs();
            GenerateZIP();
        }
    });
    
    handInputs.forEach(input => {
        input.addEventListener('change', () => {
            selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
            console.log("Mano seleccionada: ", selectedHand);
            validateInputs(); 
        });
    });

    function validateInputs() {
        participantID = document.getElementById('participantID').value;
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
        console.log("ID del participante: ", participantID);
        console.log("Mano seleccionada: ", selectedHand);
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
    
            const rotatedX = rect.bottom - touch.clientY;
            const rotatedY = touch.clientX - rect.left;
    
            return {
                x: rotatedX,
                y: rotatedY
            };
        }
    
        canvas.addEventListener('mousedown', (e) => {
            if (!startDrawingTime) {
                startDrawingTime = new Date(); 
                console.log("Comenzó a dibujar: ", startDrawingTime);
                startCanvasRecording('drawing-canvas'); 
            }
            x = e.offsetX;
            y = e.offsetY;
            drawing = true;
        });
    
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!startDrawingTime) {
                startDrawingTime = new Date(); 
                console.log("Comenzó a dibujar: ", startDrawingTime);
                startCanvasRecording('drawing-canvas'); 
            }
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

    function stopCanvasRecording() {
        return new Promise((resolve, reject) => {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.onstop = () => {
                    if (recordedChunks.length > 0) {
                        resolve(new Blob(recordedChunks, { type: 'video/webm' }));
                        recordedChunks = [];
                    } else {
                        reject('No recorded chunks available.');
                    }
                };
                mediaRecorder.stop();
            } else {
                reject('MediaRecorder is not active.');
            }
        });
    }
    

    function generateCSV() {
        if (!startTimeExecution || !endTimeExecution || !startDrawingTime || !endDrawingTime || !selectedHand) {
            console.error("Datos incompletos para generar CSV");
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Actividad,Tiempo de inicio,Tiempo de Termino,Comenzó a dibujar,Terminó de dibujar,Mano Seleccionada\n";
        csvContent += `DrawWithFigure,${formatDate(startTimeExecution)},${formatDate(endTimeExecution)},${formatDate(startDrawingTime)},${formatDate(endDrawingTime)},${selectedHand}\n`;

        return csvContent;
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

    function startFinishTimer() {
        setTimeout(() => {
            playBeepSound();
        }, 20 * 60 * 1000); // 20 minutos en milisegundos
    }
    
    function playBeepSound() {
        const beep = new Audio('beep.wav');
        beep.play();
    }

    async function GenerateZIP() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }
    
        const zip = new JSZip();
    
        // Generar el contenido del CSV
        const csvContent = generateCSV();
        zip.file(`Benson_Draw_With_figure.csv`, csvContent);
    
        // Añadir imagen del canvas al ZIP
        const canvas = document.getElementById('drawing-canvas');
        const canvasImage = canvas.toDataURL('image/png').split(',')[1];
        zip.file('Draw_With_figure.png', canvasImage, { base64: true });
    
        // Añadir video del canvas al ZIP
        try {
            const blob = await stopCanvasRecording();
            const reader = new FileReader();
            reader.onloadend = () => {
                zip.file('DrawWithFigure.webm', reader.result.split(',')[1], { base64: true });
                zip.generateAsync({ type: 'blob' }).then((content) => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = `Benson_Draw_With_Figure-${participantID}.zip`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error(`Error stopping canvas recording: ${error}`);
        }
    }
    
});
