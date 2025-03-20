document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    let currentScreenIndex = 0; // Iniciar en la pantalla correcta
    let contador = 0; // Nuevo índice para los tests
    const trialIndicator = document.getElementById('trialIndicator');
    const indicador = document.getElementById('indicador'); // Selecciona el elemento span con id indicador

    const imageCanvas = document.getElementById('imageCanvas');
    const practiceCanvas1 = document.getElementById('practiceCanvas1');
    const practiceCanvas2 = document.getElementById('practiceCanvas2');
    const instructionCanvas = document.getElementById('instructionCanvas');

    const startButton = document.getElementById('startButton');
    const nextButton1 = document.getElementById('nextButton1');
    const nextButton2 = document.getElementById('nextButton2');
    const nextButton3 = document.getElementById('nextButton3');
    const nextButtonPracticeInstruction = document.getElementById('nextButtonPracticeInstruction');
    const nextButtonPractice1 = document.getElementById('nextButtonPractice1');
    const nextButtonPractice2 = document.getElementById('nextButtonPractice2');
    const nextButtonPreTestInstruction = document.getElementById('nextButtonPreTestInstruction');

    const testVideo = document.getElementById('testVideo');
    const practiceVideo1 = document.getElementById('practiceVideo1');
    const practiceVideo2 = document.getElementById('practiceVideo2');
    const practiceVideo3 = document.getElementById('practiceVideo3');
    const nextButtonTest = document.getElementById('nextButtonTest');
    const resultsDiv = document.getElementById('results');

    const validateButton = document.getElementById('validateButton');
    const showButton = document.getElementById('showButton');
    const hideButton = document.getElementById('hideButton');
    const showRotationErrorButton = document.getElementById('showRotationErrorButton');
    const hideRotationErrorButton = document.getElementById('hideRotationErrorButton');

    const showUpdateErrorButton = document.getElementById('showUpdateErrorButton');
    const hideUpdateErrorButton = document.getElementById('hideUpdateErrorButton');
    const downloadCSVButton = document.getElementById('downloadCSVButton');
    const fullScreenButton = document.getElementById('fullScreenButton');
    const resetButtonI1 = document.getElementById('resetButtonI1');



    // Botones específicos para I1, P1, P2
    const validateButtonI1 = document.getElementById('validateButtonI1');
    const showButtonI1 = document.getElementById('showButtonI1');
    const hideButtonI1 = document.getElementById('hideButtonI1');
    const showRotationErrorButtonI1 = document.getElementById('showRotationErrorButtonI1');
    const hideRotationErrorButtonI1 = document.getElementById('hideRotationErrorButtonI1');
    const showUpdateErrorButtonI1 = document.getElementById('showUpdateErrorButtonI1');
    const hideUpdateErrorButtonI1 = document.getElementById('hideUpdateErrorButtonI1');
    const resultsDivI1 = document.getElementById('resultsI1');

    const validateButtonP1 = document.getElementById('validateButtonP1');
    const showButtonP1 = document.getElementById('showButtonP1');
    const hideButtonP1 = document.getElementById('hideButtonP1');
    const showRotationErrorButtonP1 = document.getElementById('showRotationErrorButtonP1');
    const hideRotationErrorButtonP1 = document.getElementById('hideRotationErrorButtonP1');
    const showUpdateErrorButtonP1 = document.getElementById('showUpdateErrorButtonP1');
    const hideUpdateErrorButtonP1 = document.getElementById('hideUpdateErrorButtonP1');
    const resultsDivP1 = document.getElementById('resultsP1');

    const validateButtonP2 = document.getElementById('validateButtonP2');
    const showButtonP2 = document.getElementById('showButtonP2');
    const hideButtonP2 = document.getElementById('hideButtonP2');
    const showRotationErrorButtonP2 = document.getElementById('showRotationErrorButtonP2');
    const hideRotationErrorButtonP2 = document.getElementById('hideRotationErrorButtonP2');
    const showUpdateErrorButtonP2 = document.getElementById('showUpdateErrorButtonP2');
    const hideUpdateErrorButtonP2 = document.getElementById('hideUpdateErrorButtonP2');
    const resultsDivP2 = document.getElementById('resultsP2');

    const clicksByImage = Array(15).fill().map(() => []);
    const resultsByImage = Array(15).fill().map(() => []);
    let showCorrectDoors = false;
    let showRotationErrors = false;
    let showUpdateErrors = false;
    let images = [];

    const resetVideoI1 = () => {
        practiceVideo1.currentTime = 0; // Reiniciar el tiempo del video al inicio
        practiceVideo1.play(); // Reproducir el video
    };

    // Añadir el event listener al botón de reinicio
    resetButtonI1.addEventListener('click', resetVideoI1);




    function stopAllAudios() {
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => audio.pause());
    }

    const resizeCanvas = (canvas) => {
        if (canvas && canvas.parentElement) {
            const container = canvas.parentElement;

        } else {
            console.error('Canvas or its parent element not found:', canvas);
        }
    };

    const drawImageScaled = (canvas, img) => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calcular el escalado adecuado para ajustar la imagen al canvas
        const scaleWidth = canvas.width / img.width;
        const scaleHeight = canvas.height / img.height;
        const scale = Math.min(scaleWidth, scaleHeight);

        // Calcular la posición centralizada de la imagen dentro del canvas
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };


    const videos = [
        {
            src: 'videos/Instructions.mp4',
            items: {
                correcto: [{ x: 303, y: 138 }],
                error_rotacion: [],
                error_actualizacion: [],
            },
            indicator: 'I1',
            imageSrc: 'img/instrucciones.png'
        },
        {
            src: 'videos/Practice_1.mp4',
            items: {
                correcto: [{ x: 315, y: 187 }],
                error_rotacion: [],
                error_actualizacion: [],
            },
            indicator: 'P1',
            imageSrc: 'img/practica_1.png'
        },
        {
            src: 'videos/Practice_2.mp4',
            items: {
                correcto: [{ x: 399, y: 232 }],
                error_rotacion: [],
                error_actualizacion: [],
            },
            indicator: 'P2',
            imageSrc: 'img/practica_2.png'
        },
        {
            src: 'videos/Test_1.mp4',
            items: {
                correcto: [{ x: 280, y: 105 }],


                error_rotacion: [{ x: 220 , y: 105 }],
                
                error_actualizacion: [
                    { x: 280, y: 105 - 50 }, 
                    { x: 280, y: 105 + 50 }  
                ],
            },
            indicator: 'E1',
            imageSrc: 'img/1.png'
        },
        {
            src: 'videos/Test_2.mp4',
            items: {
                correcto: [{ x: 238, y: 62 }],
                error_rotacion: [{ x: 288, y: 62 }],
                error_actualizacion: [
                    { x: 238, y: 62 - 50 },
                    { x: 238, y: 62 + 50 }
                ],
            },
            indicator: 'E2',
            imageSrc: 'img/2.png'
        },
        {
            src: 'videos/Test_3.mp4',
            items: {
                correcto: [{ x: 273, y: 43 }],
                error_rotacion: [{ x: 228, y: 38}],
                error_actualizacion: [
                    { x: 273, y: 43 - 26 },
                    { x: 273, y: 43 + 24 }
                ],
            },
            indicator: 'E3',
            imageSrc: 'img/3.png'
        },
        {
            src: 'videos/Test_4.mp4',
            items: {
                correcto: [{ x: 144, y: 76 }],
                error_rotacion: [{ x: 360, y:78 }],
                error_actualizacion: [],
            },
            indicator: 'E4',
            imageSrc: 'img/4.png'
        },
        {
            src: 'videos/Test_5.mp4',
            items: {
                correcto: [{ x: 192, y: 64 }],
                error_rotacion: [{ x: 192, y: 115 }],
                error_actualizacion: [
                    { x: 192 - 30, y: 64 },
                    { x: 192 + 30, y: 64 }
                ],
            },
            indicator: 'E5',
            imageSrc: 'img/5.png'
        },
        {
            src: 'videos/Test_5a.mp4',
            items: {
                correcto: [{ x: 324, y: 62 }],
                error_rotacion: [
                    { x: 168, y: 8 },
                    { x: 324, y: 11 }
                ],
                error_actualizacion: [
                    { x: 288, y: 63 },
                    { x: 358, y: 63 },
                    { x: 325, y: 174 }
                ],
            },
            indicator: 'E6',
            imageSrc: 'img/6.png'
        },
        {
            src: 'videos/Test_6.mp4',
            items: {
                correcto: [{ x: 402, y: 150 }],
                error_rotacion: [{ x: 454, y: 150 }],
                error_actualizacion: [
                    { x: 419, y: 176 },
                    { x: 318, y: 150 }
                ],
            },
            indicator: 'E7',
            imageSrc: 'img/7.png'
        },
        {
            src: 'videos/Test_7.mp4',
            items: {
                correcto: [{ x: 103, y: 74 }],
                error_rotacion: [
                    { x: 103, y: 161 },
                    { x: 402, y: 163 }
                ],
                error_actualizacion: [
                    { x: 226, y: 73 },
                    { x: 74, y: 89 }
                ],
            },
            indicator: 'E8',
            imageSrc: 'img/8.png'
        },
        {
            src: 'videos/Test_7a.mp4',
            items: {
                correcto: [{ x: 270, y: 137 }],
                error_rotacion: [
                    { x: 310, y: 30 },
                    { x: 310, y: 140}
                ],
                error_actualizacion: [
                    { x: 267, y: 113 },
                    { x: 187, y: 135 }
                ],
            },
            indicator: 'E9',
            imageSrc: 'img/9.png'
        },
        {
            src: 'videos/Test_8.mp4',
            items: {
                correcto: [{ x: 250, y: 152 }],
                error_rotacion: [{ x: 290, y: 157}],
                error_actualizacion: [{ x: 202, y: 86}],
            },
            indicator: 'E10',
            imageSrc: 'img/10.png'
        },
        {
            src: 'videos/Test_9.mp4',
            items: {
                correcto: [{ x: 170, y: 129 }],
                error_rotacion: [{ x: 328, y: 125 }],
                error_actualizacion: [
                    { x: 203, y: 90 },
                    { x: 201, y: 164 }
                ],
            },
            indicator: 'E11',
            imageSrc: 'img/11.png'
        },
        {
            src: 'videos/Test_10.mp4',
            items: {
                correcto: [{ x: 222, y: 108 }],
                error_rotacion: [{ x: 280, y: 105 }],
                error_actualizacion: [
                    { x: 221, y: 67 },
                    { x: 221, y: 148 }
                ],
            },
            indicator: 'E12',
            imageSrc: 'img/12.png'
        }
    ];

    const loadImageForCanvas = (canvas, videoIndex) => {
        const img = new Image();
        img.src = videos[videoIndex].imageSrc;

        img.onload = function () {
            canvas.width = 500;
            canvas.height = 250;
            drawImageScaled(canvas, img);
        };

        img.onerror = function () {
            console.error(`Error al cargar la imagen: ${videos[videoIndex].imageSrc}`);
        };
    };

    // Función para actualizar el indicador de prueba
    const updateTrialIndicator = () => {
        if (currentScreenIndex === 4) {
            trialIndicator.textContent = 'I1';
        } else if (currentScreenIndex === 5) {
            trialIndicator.textContent = 'P1';
        } else if (currentScreenIndex === 6) {
            trialIndicator.textContent = 'P2';
        } else if (currentScreenIndex >= 7 && currentScreenIndex <= 18) {
            trialIndicator.textContent = videos[contador].indicator; // Usar el indicador del video
        } else {
            trialIndicator.textContent = '';
        }
        console.log('Updated trialIndicator:', trialIndicator.textContent); // Log para depuración

        // Actualizar el contenido del span con id indicador
        if (indicador) {
            indicador.textContent = trialIndicator.textContent;
        }
    };

    // Función para retrasar y mostrar videos después de 2 segundos
    const delayVideoStart = (videoElement) => {
        if (videoElement) {
            videoElement.style.display = 'none'; // Ocultar el video inicialmente
            videoElement.pause(); // Pausar el video
            videoElement.currentTime = 0; // Reiniciar el video al inicio

            setTimeout(() => {
                videoElement.style.display = 'block'; // Mostrar el video después del retraso
                videoElement.play(); // Reproducir el video
            }, 2000); // Retraso de 2 segundos
        } else {
            console.error('El elemento de video no fue encontrado.');
        }
    };

    // Mostrar pantalla específica y cargar sus elementos
    const showScreen = (index) => {
        screens.forEach((screen, i) => {
            if (screen) {
                screen.style.display = i === index ? 'flex' : 'none';
            } else {
                console.error(`Screen with index ${i} not found`);
            }
        });

        updateTrialIndicator();

        // Configurar videos para los indicadores I1, P1 y P2
        if (index === 4) { // I1
            loadImageForCanvas(instructionCanvas, 0);
            delayVideoStart(practiceVideo1); // Retrasar y mostrar video para I1
        } else if (index === 5) { // P1
            loadImageForCanvas(practiceCanvas1, 1);
            delayVideoStart(practiceVideo2); // Retrasar y mostrar video para P1
        } else if (index === 6) { // P2
            loadImageForCanvas(practiceCanvas2, 2);
            delayVideoStart(practiceVideo3); // Retrasar y mostrar video para P2
        } else if (index >= 7 && index <= 18) { // E1 a E12
            loadImageForCanvas(imageCanvas, index - 5); // Ajustar índice para E1 a E12
        }
    };


    // Incrementar el índice de la pantalla al hacer clic en "Next"
    const incrementScreenIndex = (event) => {
        stopAllAudios();
        hideQuestion();
        console.log('Current Screen Index: ', currentScreenIndex);
        if (currentScreenIndex < screens.length - 1) {
            currentScreenIndex++;
            showScreen(currentScreenIndex);
            console.log('New Screen Index: ', currentScreenIndex);
        } else {
            console.log('End of screens reached');
        }
    };


    const goToPreTestInstruction = () => {
        hideQuestion();
        currentScreenIndex = 7; // Ajustar al índice correcto de la pantalla PreTestInstruction
        showScreen(currentScreenIndex);
    };

    const showTestScreen = () => {
        hideQuestion();
        currentScreenIndex = 8; // Ajustar al índice correcto de la primera pantalla de test
        contador = 3; // Iniciar en el índice correcto para E1
        showScreen(currentScreenIndex);
        loadCurrentVideo(contador);
        updateTrialIndicator();
    };


    // Añadir event listeners solo si los elementos existen
    if (startButton) {
        startButton.addEventListener('click', incrementScreenIndex);
    }
    if (nextButton1) {
        nextButton1.addEventListener('click', incrementScreenIndex);
    }
    if (nextButton2) {
        nextButton2.addEventListener('click', incrementScreenIndex);
    }
    if (nextButton3) {
        nextButton3.addEventListener('click', incrementScreenIndex);
    }
    if (nextButtonPracticeInstruction) {
        nextButtonPracticeInstruction.addEventListener('click', incrementScreenIndex);
    }
    if (nextButtonPractice1) {
        nextButtonPractice1.addEventListener('click', incrementScreenIndex);
    }
    if (nextButtonPractice2) {
        nextButtonPractice2.addEventListener('click', goToPreTestInstruction);
    }
    if (nextButtonPreTestInstruction) {
        nextButtonPreTestInstruction.addEventListener('click', showTestScreen);
    }

    //Cambiar tamaño del circulo
    const drawCircle = (canvas, x, y, color) => {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.stroke();
    };

    const responses = []; // Array para almacenar las respuestas de los ensayos
    let trialStartTime = Date.now(); // Tiempo de inicio de la prueba
    let clickStartTime = 0; // Tiempo de inicio para calcular el tiempo de respuesta

    const handleClick = (e) => {
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();

        // Obtener las coordenadas del clic relativas al canvas
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        // Guardar el clic ajustado
        const click = { x: x, y: y };

        let videoIndex;
        if (canvas === instructionCanvas) {
            clicksByImage[0].push(click);
            videoIndex = 0;
        } else if (canvas === practiceCanvas1) {
            clicksByImage[1].push(click);
            videoIndex = 1;
        } else if (canvas === practiceCanvas2) {
            clicksByImage[2].push(click);
            videoIndex = 2;
        } else {
            clicksByImage[contador].push(click);
            videoIndex = contador;
        }

        // Registrar la respuesta con las coordenadas ajustadas
        const responseTime = Date.now() - clickStartTime;
        recordResponse(videoIndex, click, responseTime);

        // Dibujar el círculo en las coordenadas del clic ajustado
        drawCircle(canvas, x, y, 'blue');
    };


    const recordResponse = (videoIndex, click, responseTime) => {
        const videoData = videos[videoIndex];
        const response = {
            ensayo: videoData.indicator,
            respuestaCorrecta: videoData.items.correcto.map(c => `(${c.x}, ${c.y})`).join('; '),
            errorActualizacion: '',
            errorRotacion: '',
            respuestaParticipante: `(${click.x.toFixed(2)}, ${click.y.toFixed(2)})`,
            precision: 0,
            tiempoRespuesta: responseTime,
            resp0puntos: 0, // Inicializa el contador de respuestas con 0 puntos
            manoUtilizada: ''
        };

        videoData.items.error_actualizacion.forEach(item => {
            const dx = click.x - item.x;
            const dy = click.y - item.y;
            if (Math.sqrt(dx * dx + dy * dy) < 5) {
                response.errorActualizacion = `(${item.x}, ${item.y})`;
            }
        });

        videoData.items.error_rotacion.forEach(item => {
            const dx = click.x - item.x;
            const dy = click.y - item.y;
            if (Math.sqrt(dx * dx + dy * dy) < 5) {
                response.errorRotacion = `(${item.x}, ${item.y})`;
            }
        });

        videoData.items.correcto.forEach(item => {
            const dx = click.x - item.x;
            const dy = click.y - item.y;
            if (Math.sqrt(dx * dx + dy * dy) < 5) {
                response.precision = 2;
            }
        });

        if (response.precision === 0 && (response.errorActualizacion || response.errorRotacion)) {
            response.precision = 1;
        }

        // Si precisión sigue siendo 0, se considera una respuesta con 0 puntos
        if (response.precision === 0) {
            response.resp0puntos = 1;
        }

        responses.push(response);
    };


    const validateClicksForCanvas = (canvas, videoIndex, resultsDiv) => {
        const img = new Image();
        img.src = videos[videoIndex].imageSrc; // Obtener la imagen directamente del objeto videos

        img.onload = function () {
            resizeCanvas(canvas);
            drawImageScaled(canvas, img);

            let correctClicks = 0;
            let rotationErrors = 0;
            let updateErrors = 0;
            const results = [];
            clicksByImage[videoIndex].forEach((click, index) => {
                let isCorrect = false;
                let isRotationError = false;
                let isUpdateError = false;

                videos[videoIndex].items.correcto.forEach(item => {
                    const dx = click.x - item.x;
                    const dy = click.y - item.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 5) {
                        isCorrect = true;
                        correctClicks++;
                    }
                });

                videos[videoIndex].items.error_rotacion.forEach(item => {
                    const dx = click.x - item.x;
                    const dy = click.y - item.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 5) {
                        isRotationError = true;
                        rotationErrors++;
                    }
                });

                videos[videoIndex].items.error_actualizacion.forEach(item => {
                    const dx = click.x - item.x;
                    const dy = click.y - item.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 5) {
                        isUpdateError = true;
                        updateErrors++;
                    }
                });

                let score = 0;
                if (isCorrect) {
                    score = 2;
                    drawCircle(canvas, click.x * (canvas.width / 700), click.y * (canvas.height / 400), 'green');
                } else if (isRotationError || isUpdateError) {
                    score = 1;
                    drawCircle(canvas, click.x * (canvas.width / 700), click.y * (canvas.height / 400), 'orange');
                } else {
                    drawCircle(canvas, click.x * (canvas.width / 700), click.y * (canvas.height / 400), 'red');
                }

                results.push({ orden: index + 1, score, coords: { x: click.x, y: click.y } });
            });

            resultsDiv.innerHTML = `
                <p>clics_total: ${clicksByImage[videoIndex].length}</p>
                <p>puntaje_total: ${results.reduce((sum, r) => sum + r.score, 0)}</p>
                <p>clics_correctos: ${correctClicks}</p>
                <p>errores_rotacion: ${rotationErrors}</p>
                <p>errores_actualizacion: ${updateErrors}</p>
                <p>puertas_correctas: ${correctClicks} de ${videos[videoIndex].items.correcto.length}</p>
                <p>clics_coordenadas:</p>
                <ul>
                    ${results.map(r => `<li>orden: ${r.orden}, coordenadas: (${r.coords.x.toFixed(2)}, ${r.coords.y.toFixed(2)})</li>`).join('')}
                </ul>
            `;

            resultsByImage[videoIndex] = results;
            clicksByImage[videoIndex] = [];
        };

        img.onerror = function () {
            console.error(`Failed to load image: ${videos[videoIndex].imageSrc}`);
        };
    };

    const drawCorrectDoorsOnCanvas = (canvas, videoIndex) => {
        videos[videoIndex].items.correcto.forEach(item => {
            const x = item.x * (canvas.width / 700);
            const y = item.y * (canvas.height / 400);
            drawCircle(canvas, x, y, 'red');
        });
    };

    const drawRotationErrorsOnCanvas = (canvas, videoIndex) => {
        videos[videoIndex].items.error_rotacion.forEach(item => {
            const x = item.x * (canvas.width / 700);
            const y = item.y * (canvas.height / 400);
            drawCircle(canvas, x, y, 'orange');
        });
    };

    const drawUpdateErrorsOnCanvas = (canvas, videoIndex) => {
        videos[videoIndex].items.error_actualizacion.forEach(item => {
            const x = item.x * (canvas.width / 700);
            const y = item.y * (canvas.height / 400);
            drawCircle(canvas, x, y, 'purple');
        });
    };

    const clearCanvas = (canvas) => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const generarTxt = (tiempoTotal, selectedHand, inicialesExaminador) => {
        let txtContent = `Tiempo Total: ${tiempoTotal} segundos\n`;
        txtContent += `Mano seleccionada: ${selectedHand}\n`;
        txtContent += `Examinador: ${inicialesExaminador}\n`;

        // Agregar detalles de errores y respuestas
        responses.forEach((response, index) => {
            txtContent += `Ensayo ${index + 1}:\n`;
            txtContent += `  - NoUpdErr: ${response.errorActualizacion}\n`;
            txtContent += `  - NoRotErr: ${response.errorRotacion}\n`;
            txtContent += `  - No0Ans: ${response.resp0puntos}\n`;
        });

        return new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
    };

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

    const downloadCSV = () => {
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return;
        }

        const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();

        const csvData = responses.map(response => ({
            Trial: response.ensayo,
            CorrResp: response.respuestaCorrecta,
            PartResp: response.respuestaParticipante,
            Acc: response.precision,
            RT: response.tiempoRespuesta,
        }));

        let csv = Papa.unparse(csvData, { delimiter: ';' });

        const tiempoTotalSegundos = (Date.now() - trialStartTime) / 1000;
        const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        const txtBlob = generarTxt(tiempoTotalSegundos, selectedHand, inicialesExaminador);

        const zip = new JSZip();
        const date = new Date();
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}_${String(date.getMonth() + 1).padStart(2, '0')}_${date.getFullYear()}`;

        const csvFileName = `${idParticipante}_VIENNA_13_${inicialesExaminador}_${formattedDate}.csv`;
        const txtFileName = `${idParticipante}_VIENNA_13_Metricas_${inicialesExaminador}_${formattedDate}.csv`;

        zip.file(csvFileName, csvBlob);
        zip.file(txtFileName, txtBlob);

        const imgFolder = zip.folder("imagenes");

        images.forEach((dataURL, index) => {
            const imgBlob = dataURLtoBlob(dataURL);
            const imgFileName = `E${index + 1}.png`;
            imgFolder.file(imgFileName, imgBlob);
        });

        zip.generateAsync({ type: "blob" })
            .then(content => {
                const link = document.createElement('a');
                if (link.download !== undefined) {
                    const url = URL.createObjectURL(content);
                    const zipFileName = `${idParticipante}_13_VIENNA_${inicialesExaminador}_${formattedDate}.zip`;

                    link.setAttribute('href', url);
                    link.setAttribute('download', zipFileName);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    setTimeout(() => {
                        window.close();
                    }, 3000);
                }
            })
            .catch(err => {
                console.error("Error generando el archivo ZIP:", err);
            });
    };
    // Función para convertir dataURL a Blob
    function dataURLtoBlob(dataURL) {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }


    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Obtener el id_participante de la URL
    const idParticipante = getQueryParam('id_participante');

    const showCompletionScreen = () => {
        const preEndScreen = document.getElementById('preEnd');
        const completionScreen = document.getElementById('completionScreen');
        if (preEndScreen) {
            preEndScreen.style.display = 'none';
        } else {
            console.error('preEndScreen element not found');
        }
        if (completionScreen) {
            completionScreen.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            downloadCSV(); // Descargar automáticamente el CSV al mostrar la pantalla de finalización
        } else {
            console.error('completionScreen element not found');
        }
    };

    const loadCurrentVideo = (contador) => {
        testVideo.src = videos[contador].src;
        const img = new Image();
        img.src = videos[contador].imageSrc; // Obtener la imagen directamente del objeto videos

        img.onload = function () {
            resizeCanvas(imageCanvas);
            drawImageScaled(imageCanvas, img);
        };

        // Configurar los eventos para controlar la visibilidad del video
        testVideo.addEventListener('pause', () => {
            testVideo.style.display = 'none'; // Ocultar el video al pausar
        });

        testVideo.addEventListener('play', () => {
            testVideo.style.display = 'block'; // Mostrar el video al reproducir
        });

        // Pausar el video y configurarlo para la reproducción después de 2 segundos
        testVideo.style.display = 'none'; // Asegurarse de que esté oculto al cargar
        testVideo.pause(); // Pausar el video inicialmente
        console.log(`Mostrando video: ${videos[contador].src}`);
        clickStartTime = Date.now(); // Reiniciar el tiempo de inicio para calcular el tiempo de respuesta

        setTimeout(() => {
            testVideo.play(); // Reproducir el video después de 2 segundos
        }, 2000); // 2000 milisegundos = 2 segundos
    };

    if (imageCanvas && testVideo) {
        fullScreenButton.addEventListener('click', () => {
            if (document.fullscreenEnabled && !document.fullscreenElement) {
                fullScreenButton.style.backgroundImage = "url('minimize.png')"; // Cambiar la imagen del botón a 'minimize'
                document.documentElement.requestFullscreen();
            } else if (document.fullscreenElement) {
                fullScreenButton.style.backgroundImage = "url('full-screen.png')"; // Cambiar la imagen del botón a 'full-screen'
                document.exitFullscreen();
            } else {
                console.log('El modo de pantalla completa no es soportado por tu navegador.');
            }
        });


        window.addEventListener('resize', () => {
            resizeCanvas(imageCanvas);
            drawImageScaled(imageCanvas, videos[contador].imageSrc);
            if (showCorrectDoors) drawCorrectDoorsOnCanvas(imageCanvas, contador);
            if (showRotationErrors) drawRotationErrorsOnCanvas(imageCanvas, contador);
            if (showUpdateErrors) drawUpdateErrorsOnCanvas(imageCanvas, contador);
        });

        const showQuestion = () => {
            document.getElementById('questionContainer').style.display = 'block';
        };

        [testVideo, practiceVideo1, practiceVideo2, practiceVideo3].forEach(video => {
            video.addEventListener('ended', showQuestion);
        });

        nextButtonTest.addEventListener('click', () => {
            hideQuestion();
            console.log('Current Test Index (contador): ', contador);
            images.push(imageCanvas.toDataURL('image/png'));
            if (contador < videos.length - 1) {
                contador++;
                loadCurrentVideo(contador);
                clicksByImage[contador] = [];
                resultsDiv.innerHTML = '';
                console.log('New Test Index (contador): ', contador);
                updateTrialIndicator();
            } else {
                console.log('End of videos reached');
                showPreEnd();
            }
        });

        imageCanvas.addEventListener('click', handleClick, false);
        instructionCanvas.addEventListener('click', handleClick, false);
        practiceCanvas1.addEventListener('click', handleClick, false);
        practiceCanvas2.addEventListener('click', handleClick, false);

        validateButton.addEventListener('click', () => validateClicksForCanvas(imageCanvas, contador, resultsDiv), false);
        showButton.addEventListener('click', () => {
            showCorrectDoors = true;
            drawCorrectDoorsOnCanvas(imageCanvas, contador);
        });
        hideButton.addEventListener('click', () => {
            showCorrectDoors = false;
            drawImageScaled(imageCanvas, videos[contador].imageSrc);
        });
        showRotationErrorButton.addEventListener('click', () => {
            showRotationErrors = true;
            drawRotationErrorsOnCanvas(imageCanvas, contador);
        });
        hideRotationErrorButton.addEventListener('click', () => {
            showRotationErrors = false;
            drawImageScaled(imageCanvas, videos[contador].imageSrc);
            if (showCorrectDoors) drawCorrectDoorsOnCanvas(imageCanvas, contador);
            if (showUpdateErrors) drawUpdateErrorsOnCanvas(imageCanvas, contador);
        });
        showUpdateErrorButton.addEventListener('click', () => {
            showUpdateErrors = true;
            drawUpdateErrorsOnCanvas(imageCanvas, contador);
        });
        hideUpdateErrorButton.addEventListener('click', () => {
            showUpdateErrors = false;
            drawImageScaled(imageCanvas, videos[contador].imageSrc);
            if (showCorrectDoors) drawCorrectDoorsOnCanvas(imageCanvas, contador);
            if (showRotationErrors) drawRotationErrorsOnCanvas(imageCanvas, contador);
        });
        downloadCSVButton.addEventListener('click', downloadCSV, false);

        // Funcionalidades para los botones I1, P1 y P2
        if (validateButtonI1) {
            validateButtonI1.addEventListener('click', () => validateClicksForCanvas(instructionCanvas, 0, resultsDivI1));
        }
        if (showButtonI1) {
            showButtonI1.addEventListener('click', () => drawCorrectDoorsOnCanvas(instructionCanvas, 0));
        }
        if (hideButtonI1) {
            hideButtonI1.addEventListener('click', () => clearCanvas(instructionCanvas));
        }
        if (showRotationErrorButtonI1) {
            showRotationErrorButtonI1.addEventListener('click', () => drawRotationErrorsOnCanvas(instructionCanvas, 0));
        }
        if (hideRotationErrorButtonI1) {
            hideRotationErrorButtonI1.addEventListener('click', () => clearCanvas(instructionCanvas));
        }
        if (showUpdateErrorButtonI1) {
            showUpdateErrorButtonI1.addEventListener('click', () => drawUpdateErrorsOnCanvas(instructionCanvas, 0));
        }
        if (hideUpdateErrorButtonI1) {
            hideUpdateErrorButtonI1.addEventListener('click', () => clearCanvas(instructionCanvas));
        }

        if (validateButtonP1) {
            validateButtonP1.addEventListener('click', () => validateClicksForCanvas(practiceCanvas1, 1, resultsDivP1));
        }
        if (showButtonP1) {
            showButtonP1.addEventListener('click', () => drawCorrectDoorsOnCanvas(practiceCanvas1, 1));
        }
        if (hideButtonP1) {
            hideButtonP1.addEventListener('click', () => clearCanvas(practiceCanvas1));
        }
        if (showRotationErrorButtonP1) {
            showRotationErrorButtonP1.addEventListener('click', () => drawRotationErrorsOnCanvas(practiceCanvas1, 1));
        }
        if (hideRotationErrorButtonP1) {
            hideRotationErrorButtonP1.addEventListener('click', () => clearCanvas(practiceCanvas1));
        }
        if (showUpdateErrorButtonP1) {
            showUpdateErrorButtonP1.addEventListener('click', () => drawUpdateErrorsOnCanvas(practiceCanvas1, 1));
        }
        if (hideUpdateErrorButtonP1) {
            hideUpdateErrorButtonP1.addEventListener('click', () => clearCanvas(practiceCanvas1));
        }

        if (validateButtonP2) {
            validateButtonP2.addEventListener('click', () => validateClicksForCanvas(practiceCanvas2, 2, resultsDivP2));
        }
        if (showButtonP2) {
            showButtonP2.addEventListener('click', () => drawCorrectDoorsOnCanvas(practiceCanvas2, 2));
        }
        if (hideButtonP2) {
            hideButtonP2.addEventListener('click', () => clearCanvas(practiceCanvas2));
        }
        if (showRotationErrorButtonP2) {
            showRotationErrorButtonP2.addEventListener('click', () => drawRotationErrorsOnCanvas(practiceCanvas2, 2));
        }
        if (hideRotationErrorButtonP2) {
            hideRotationErrorButtonP2.addEventListener('click', () => clearCanvas(practiceCanvas2));
        }
        if (showUpdateErrorButtonP2) {
            showUpdateErrorButtonP2.addEventListener('click', () => drawUpdateErrorsOnCanvas(practiceCanvas2, 2));
        }
        if (hideUpdateErrorButtonP2) {
            hideUpdateErrorButtonP2.addEventListener('click', () => clearCanvas(practiceCanvas2));
        }
    } else {
        console.error('Canvas element not found');
    }

    // SELECCION DE MANO JS

    let selectedHand = "";
    const handInputs = document.getElementsByName('hand');

    document.getElementById('handButton').addEventListener('click', showCompletionScreen);

    const showPreEnd = () => {
        const testScreen = document.getElementById('testScreen');
        const preEndScreen = document.getElementById('preEnd');
        if (testScreen) {
            testScreen.style.display = 'none';
        } else {
            console.error('testScreen element not found');
        }
        if (preEndScreen) {
            preEndScreen.style.display = 'flex';
        } else {
            console.error('preEndScreen element not found');
        }
    };

    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            validateInputs();
            selectedHand = e.target.value;
        });
    });

    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

        if (selectedHand) {
            handButton.style.display = 'block';
        }
    }
    // Inicializar la primera carga de video e imagen
    showScreen(currentScreenIndex);

    function hideQuestion() {
        document.getElementById('questionContainer').style.display = 'none';
    };
});

