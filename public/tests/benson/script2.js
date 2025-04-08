document.addEventListener('DOMContentLoaded', () => {
    let startDrawingTime = null;
    let endDrawingTime = null;
    let startTimeExecution = null;
    let endTimeExecution2 = null;
    let recordedChunks = [];
    let selectedHand = "";
    let mediaRecorder = null;
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    let audioEndedTime = null; // Marca de tiempo cuando el audio termina
    let execTime = null;

    //Botones
    const fullscreenButton = document.getElementById('fullscreen-button');
    const finishDrawingFromMemoryButton = document.getElementById('finish-drawing-from-memory');
    //Screen
    const container2 = document.getElementById('container2');
    const finishScreen = document.getElementById('finishScreen');
    const selectHandContainer = document.getElementById('selectHand');
    const handInputs = document.getElementsByName('hand');
    const DownloadButton = document.getElementById('download');
    const showinstruction = document.getElementById('showinstruction');
    const instruccion = document.getElementById('instruccion');


    enterContainer2();
    initCanvas('memory-canvas', 'clear-memory-canvas-button', 'download-memory-canvas-button');

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

    function enterContainer2() {
        container2.style.display = 'flex';
        startTimeExecution = new Date();
        console.log("Tiempo de inicio: ", startTimeExecution);
    }

    showinstruction.addEventListener('click', () => {
        if (instruccion.classList.contains('show')) {
            instruccion.classList.remove('show');
            showinstruction.style.backgroundImage = "url('noeye.png')";
        } else {
            instruccion.classList.add('show');
            showinstruction.style.backgroundImage = "url('eye.png')";
        }
    });

    finishDrawingFromMemoryButton.addEventListener('click', () => {
        document.getElementById('audio2').pause();
        container2.style.display = 'none';
        finishScreen.style.display = 'block';
        DownloadButton.style.display = 'none';
        endDrawingTime = new Date();
        console.log("Terminó de Dibujar: ", endDrawingTime);
        endTimeExecution2 = new Date();
        console.log("Tiempo de Termino: ", endTimeExecution2);
        selectHandContainer.style.display = 'block';
        if (audioEndedTime) {
            const timeElapsedMs = endDrawingTime - audioEndedTime; // en milisegundos
            execTime = Math.round(timeElapsedMs / 1000); // en segundos
            console.log(`Tiempo transcurrido desde que terminó el audio hasta el botón: ${execTime} segundos`);
        } else {
            console.log("El audio no ha terminado antes de presionar el botón.");
        }
        // Guardar en localStorage
        localStorage.setItem('endTimeExecution2', endTimeExecution2);

    });

    const audioElement2 = document.getElementById('audio2');

    if (audioElement2) {
        audioElement2.addEventListener('ended', () => {
            console.log("El audio ha terminado."); // Verificación de evento de audio
            audioEndedTime = new Date();
            console.log(`ExecTime: ${audioEndedTime}`);

            setTimeout(() => {
                clearInterval(intervalId);
                console.log("Cronómetro detenido después de 4 minutos.");
                finishdrawingwithfigure.classList.add('red-arrow');
            }, 4 * 60 * 1000); // Detener cronómetro después de 4 minutos
        });
    }

    DownloadButton.addEventListener('click', async ()  => {
        validateInputs();
        try {
            await GenerateZIP();
        } catch (error) {
            console.error("Error al generar el ZIP:", error);
        }
    
        setTimeout(() => {
            window.close();
        }, 3000);
    });


    handInputs.forEach(input => {
        input.addEventListener('change', () => {
            selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
            console.log("Mano seleccionada: ", selectedHand);
            validateInputs();
            DownloadButton.style.display = 'block';
        });
    });

    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;
        console.log("Mano seleccionada: ", selectedHand);
    }

    //Funcion para Canvas

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

        // canvas.addEventListener('mousedown', (e) => {
        //     if (!startDrawingTime) {
        //         startDrawingTime = new Date();
        //         console.log("Comenzó a dibujar: ", startDrawingTime);
        //         startCanvasRecording('memory-canvas');
        //     }
        //     x = e.offsetX;
        //     y = e.offsetY;
        //     drawing = true;
        // });

        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!startDrawingTime) {
                startDrawingTime = new Date();
                console.log("Comenzó a dibujar: ", startDrawingTime);
                startCanvasRecording('memory-canvas');
            }
            const touchPos = getTouchPos(canvas, e);
            x = touchPos.x;
            y = touchPos.y;
            drawing = true;
        });

        // canvas.addEventListener('mousemove', (e) => {
        //     if (drawing) {
        //         ctx.beginPath();
        //         ctx.moveTo(x, y);
        //         ctx.lineTo(e.offsetX, e.offsetY);
        //         ctx.stroke();
        //         x = e.offsetX;
        //         y = e.offsetY;
        //     }
        // });

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

        // canvas.addEventListener('mouseup', () => {
        //     drawing = false;
        // });

        canvas.addEventListener('touchend', () => {
            drawing = false;
        });

        // canvas.addEventListener('mouseleave', () => {
        //     drawing = false;
        // });

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

            // Una vez que userInfo está listo, habilitar el botón o acción que depende de él
            document.getElementById('download').addEventListener('click', () => {
                const csvContent = generateCSV();  // Generar el CSV antes de crear el ZIP
                if (csvContent) {
                    crearZip(csvContent);  // Pasar el contenido del CSV al crearZip
                }
            });
        })
        .catch(error => console.error('Error:', error));

    function generateCSV() {
        if (typeof userInfo === 'undefined' || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return ""; 
        }
    
        if (typeof startTimeExecution === 'undefined' || typeof endTimeExecution2 === 'undefined') {
            console.error("Error: las variables de tiempo de ejecución no están definidas.");
            return "";  
        }

        let csvContent = "TotTime;ExecTime;Hand;Examinador\n"; //Activity;RT;
    

        let timeTotal = (endTimeExecution2 - startTimeExecution) / 1000;

        let drawingTime = 0;
        if (typeof startDrawingTime !== 'undefined' && typeof endDrawingTime !== 'undefined') {
            drawingTime = (endDrawingTime - startDrawingTime);
        }
    
        const initials = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();
    
        csvContent += `${timeTotal.toFixed(3).replace('.', ',')};${execTime};${selectedHand};${initials}\n`;
    
        return csvContent;
    }
    

    let diaStr = dia.toString().padStart(2, '0');
    let mesStr = mes.toString().padStart(2, '0');
    let añoStr = año.toString().padStart(4, '0');


    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    // Obtener el id_participante de la URL
    const idParticipante = getQueryParam('id_participante');

    async function GenerateZIP() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }

        const zip = new JSZip();

        // Generar el contenido del CSV
        const csvContent = generateCSV();
        zip.file(`${idParticipante}_6_Benson_Recuerdo_${diaStr}_${mesStr}_${añoStr}.csv`, csvContent);

        // Añadir imagen del canvas al ZIP
        const canvas = document.getElementById('memory-canvas');
        const canvasImage = canvas.toDataURL('image/png').split(',')[1];
        zip.file('6_Benson_Recuerdo_Dibujo.png', canvasImage, { base64: true });

        // Añadir video del canvas al ZIP
        try {
            const blob = await stopCanvasRecording();
            const reader = new FileReader();
            reader.onloadend = () => {
                zip.file('_6_Benson_Recuerdo_Grabacion.webm', reader.result.split(',')[1], { base64: true });
                zip.generateAsync({ type: 'blob' }).then((content) => {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = `${idParticipante}_6_Benson_Recuerdo_${diaStr}_${mesStr}_${añoStr}.zip`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            };
            reader.readAsDataURL(blob);

        } catch (error) {
            console.warn(`No video available: ${error}`);
            // Generar el archivo ZIP sin el video
            zip.generateAsync({ type: 'blob' }).then((content) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                link.download = `${idParticipante}_6_Benson_Recuerdo_${diaStr}_${mesStr}_${añoStr}.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
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
