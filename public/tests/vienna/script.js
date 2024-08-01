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

    const resizeCanvas = (canvas) => {
        if (canvas && canvas.parentElement) {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        } else {
            console.error('Canvas or its parent element not found:', canvas);
        }
    };

    const drawImageScaled = (canvas, img) => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
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
                correcto: [{ x: 390, y: 170 }],
                error_rotacion: [{ x: 310, y: 170 }],
                error_actualizacion: [{ x: 390, y: 235 }, { x: 390, y: 85 }],
            },
            indicator: 'E1',
            imageSrc: 'img/1.png'
        },
        {
            src: 'videos/Test_2.mp4',
            items: {
                correcto: [{ x: 335, y: 70 }],
                error_rotacion: [{ x: 404, y: 65 }],
                error_actualizacion: [{ x: 335, y: 35 },{ x: 335, y: 99 }],
            },
            indicator: 'E2',
            imageSrc: 'img/2.png'
        },
        {
            src: 'videos/Test_3.mp4',
            items: {
                correcto: [{ x: 382, y: 69 }],
                error_rotacion: [{ x: 316, y: 69 }],
                error_actualizacion: [{ x: 382, y: 30 },{ x: 382, y: 109 }],
            },
            indicator: 'E3',
            imageSrc: 'img/3.png'
        },
        {
            src: 'videos/Test_4.mp4',
            items: {
                correcto: [{ x: 192, y: 122 }],
                error_rotacion: [{ x: 508, y: 122 }],
                error_actualizacion: [],
            },
            indicator: 'E4',
            imageSrc: 'img/4.png'
        },
        {
            src: 'videos/Test_5.mp4',
            items: {
                correcto: [{ x: 263, y: 108 }],
                error_rotacion: [{ x: 263, y: 188 }],
                error_actualizacion: [{ x: 225, y: 108 },{ x: 309, y: 108 }],
            },
            indicator: 'E5',
            imageSrc: 'img/5.png'
        },
        {
            src: 'videos/Test_5a.mp4',
            items: {
                correcto: [{ x: 461, y: 101 }],
                error_rotacion: [{ x: 459, y: 15 },{ x: 232, y: 15 }],
                error_actualizacion: [{ x: 408, y: 101 },{ x: 513, y: 101 },{ x: 461, y: 281 }],
            },
            indicator: 'E6',
            imageSrc: 'img/6.png'
        },
        {
            src: 'videos/Test_6.mp4',
            items: {
                correcto: [{ x: 583, y: 243 }],
                error_rotacion: [{ x: 664, y: 243 }],
                error_actualizacion: [{ x: 455, y: 243 },{ x: 609, y: 287 }],
            },
            indicator: 'E7',
            imageSrc: 'img/7.png'
        },
        {
            src: 'videos/Test_7.mp4',
            items: {
                correcto: [{ x: 123, y: 117 }],
                error_rotacion: [{ x: 123, y: 263 },{ x: 589, y: 263 }],
                error_actualizacion: [{ x: 77, y: 143 },{ x: 312, y: 117 }],
            },
            indicator: 'E8',
            imageSrc: 'img/8.png'
        },
        {
            src: 'videos/Test_7a.mp4',
            items: {
                correcto: [{ x: 377, y: 217 }],
                error_rotacion: [{ x: 445, y: 217 },{ x: 445, y: 50 }],
                error_actualizacion: [{ x: 377, y: 181 },{ x: 250, y: 217 }],
            },
            indicator: 'E9',
            imageSrc: 'img/9.png'
        },
        {
            src: 'videos/Test_8.mp4',
            items: {
                correcto: [{ x: 273, y: 249 }],
                error_rotacion: [{ x: 415, y: 246 }],
                error_actualizacion: [{ x: 273, y: 130 }],
            },
            indicator: 'E10',
            imageSrc: 'img/10.png'
        },
        {
            src: 'videos/Test_9.mp4',
            items: {
                correcto: [{ x: 226, y: 203 }],
                error_rotacion: [{ x: 470, y: 203 }],
                error_actualizacion: [{ x: 273, y: 146 },{ x: 273, y: 264 }],
            },
            indicator: 'E11',
            imageSrc: 'img/11.png'
        },
        {
            src: 'videos/Test_10.mp4',
            items: {
                correcto: [{ x: 304, y: 173 }],
                error_rotacion: [{ x: 399, y: 173 }],
                error_actualizacion: [{ x: 304, y: 109 },{ x: 304, y: 234 }],
            },
            indicator: 'E12',
            imageSrc: 'img/12.png'
        }
    ];

    const loadImageForCanvas = (canvas, videoIndex) => {
        const img = new Image();
        img.src = videos[videoIndex].imageSrc; // Obtener la imagen directamente del objeto videos
    
        img.onload = function () {
            resizeCanvas(canvas);
            drawImageScaled(canvas, img);
        };
    
        img.onerror = function () {
            console.error(`Failed to load image: ${videos[videoIndex].imageSrc}`);
        };
    };
    
    const showScreen = (index) => {
        screens.forEach((screen, i) => {
            if (screen) {
                screen.style.display = i === index ? 'flex' : 'none';
            } else {
                console.error(`Screen with index ${i} not found`);
            }
        });
    
        updateTrialIndicator();
    
        // Cargar la imagen correspondiente para cada pantalla al mostrarla
        if (index === 4) { // I1
            loadImageForCanvas(instructionCanvas, 0);
        } else if (index === 5) { // P1
            loadImageForCanvas(practiceCanvas1, 1);
        } else if (index === 6) { // P2
            loadImageForCanvas(practiceCanvas2, 2);
        } else if (index >= 7 && index <= 18) { // E1 a E12
            loadImageForCanvas(imageCanvas, index - 5); // Ajustar índice para E1 a E12
        }
    };

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

    const incrementScreenIndex = (event) => {
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
        currentScreenIndex = 7; // Ajustar al índice correcto de la pantalla PreTestInstruction
        showScreen(currentScreenIndex);
    };

    const showTestScreen = () => {
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

    const drawCircle = (canvas, x, y, color) => {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.stroke();
    };

    const handleClick = (e) => {
        const canvas = e.target;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const scaleX = 700 / canvas.width;
        const scaleY = 400 / canvas.height;
        const click = { x: x * scaleX, y: y * scaleY };

        if (canvas === instructionCanvas) {
            clicksByImage[0].push(click);
        } else if (canvas === practiceCanvas1) {
            clicksByImage[1].push(click);
        } else if (canvas === practiceCanvas2) {
            clicksByImage[2].push(click);
        } else {
            clicksByImage[contador].push(click);
        }

        drawCircle(canvas, x, y, 'blue');
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
                    if (Math.sqrt(dx * dx + dy * dy) < 20) {
                        isCorrect = true;
                        correctClicks++;
                    }
                });

                videos[videoIndex].items.error_rotacion.forEach(item => {
                    const dx = click.x - item.x;
                    const dy = click.y - item.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 20) {
                        isRotationError = true;
                        rotationErrors++;
                    }
                });

                videos[videoIndex].items.error_actualizacion.forEach(item => {
                    const dx = click.x - item.x;
                    const dy = click.y - item.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 20) {
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
                <p>Total de clics: ${clicksByImage[videoIndex].length}</p>
                <p>Puntaje total: ${results.reduce((sum, r) => sum + r.score, 0)}</p>
                <p>Clics correctos: ${correctClicks}</p>
                <p>Errores de rotación: ${rotationErrors}</p>
                <p>Errores de actualización: ${updateErrors}</p>
                <p>Puertas correctas encontradas: ${correctClicks} de ${videos[videoIndex].items.correcto.length}</p>
                <p>Coordenadas de los puntos clickeados:</p>
                <ul>
                    ${results.map(r => `<li>Orden: ${r.orden}, Coordenadas: (${r.coords.x.toFixed(2)}, ${r.coords.y.toFixed(2)})</li>`).join('')}
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

    const downloadCSV = () => {
        const csvData = [];
        resultsByImage.forEach((results, imageIndex) => {
            results.forEach(result => {
                csvData.push({
                    image: videos[imageIndex].src,
                    orden: result.orden,
                    score: result.score
                });
            });
        });

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'results.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const showCompletionScreen = () => {
        const testScreen = document.getElementById('testScreen');
        const completionScreen = document.getElementById('completionScreen');
        if (testScreen) {
            testScreen.style.display = 'none';
        } else {
            console.error('testScreen element not found');
        }
        if (completionScreen) {
            completionScreen.style.display = 'flex';
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
        console.log(`Mostrando video: ${videos[contador].src}`);
    };

    if (imageCanvas && testVideo) {
        fullScreenButton.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
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
            const questionText = document.createElement('h2');
            questionText.textContent = '¿Qué puerta eligió la persona?';
            questionText.style.textAlign = 'center';
            questionText.style.fontSize = '32px';
            questionText.id = 'questionText'; // Add an ID for easier removal
            const currentScreen = screens[currentScreenIndex];
            currentScreen.appendChild(questionText);
        };

        [testVideo, practiceVideo1, practiceVideo2, practiceVideo3].forEach(video => {
            video.addEventListener('ended', showQuestion);
        });

        nextButtonTest.addEventListener('click', () => {
            console.log('Current Test Index (contador): ', contador);
            if (contador < videos.length - 1) {
                contador++;
                loadCurrentVideo(contador);
                clicksByImage[contador] = [];
                resultsDiv.innerHTML = '';
                console.log('New Test Index (contador): ', contador);
                updateTrialIndicator();
            } else {
                console.log('End of videos reached');
                showCompletionScreen();
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

    // Inicializar la primera carga de video e imagen
    showScreen(currentScreenIndex);
});
