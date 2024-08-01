document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    let currentScreenIndex = 0; // Iniciar en la pantalla correcta
    let contador = 0; // Nuevo índice para los tests
    const trialIndicator = document.getElementById('trialIndicator');
    const indicador = document.getElementById('indicador'); // Selecciona el elemento span con id indicador

    if (!trialIndicator) {
        console.error('trialIndicator element not found');
        return;
    }

    const imageCanvas = document.getElementById('imageCanvas');
    const practiceCanvas1 = document.getElementById('practiceCanvas1');
    const practiceCanvas2 = document.getElementById('practiceCanvas2');
    const instructionCanvas = document.getElementById('instructionCanvas');

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

    const loadCanvasContent = (index) => {
        if (index === 4) {
            const instructionImage = new Image();
            instructionImage.src = 'img/instrucciones.png';
            instructionImage.onload = function () {
                resizeCanvas(instructionCanvas);
                drawImageScaled(instructionCanvas, instructionImage);
                console.log('Mostrando imagen: img/instrucciones.png en instructionCanvas');
            };
        } else if (index === 5) {
            const practiceImage1 = new Image();
            practiceImage1.src = 'img/practica_1.png';
            practiceImage1.onload = function () {
                resizeCanvas(practiceCanvas1);
                drawImageScaled(practiceCanvas1, practiceImage1);
                console.log('Mostrando imagen: img/practica_1.png en practiceCanvas1');
            };
        } else if (index === 6) {
            const practiceImage2 = new Image();
            practiceImage2.src = 'img/practica_2.png';
            practiceImage2.onload = function () {
                resizeCanvas(practiceCanvas2);
                drawImageScaled(practiceCanvas2, practiceImage2);
                console.log('Mostrando imagen: img/practica_2.png en practiceCanvas2');
            };
        }
    };

    const videos = [
        {
            src: 'videos/Test_1.mp4',
            items: {
                correcto: [{ x: 390, y: 170 }],
                error_rotacion: [{ x: 310, y: 170 }],
                error_actualizacion: [{ x: 390, y: 235 }, { x: 390, y: 85 }],
            },
            indicator: 'E1'
        },
        {
            src: 'videos/Test_2.mp4',
            items: {
                correcto: [{ x: 335, y: 70 }],
                error_rotacion: [{ x: 404, y: 65 }],
                error_actualizacion: [{ x: 335, y: 35 },{ x: 335, y: 99 }],
            },
            indicator: 'E2'
        },
        {
            src: 'videos/Test_3.mp4',
            items: {
                correcto: [{ x: 382, y: 69 }],
                error_rotacion: [{ x: 316, y: 69 }],
                error_actualizacion: [{ x: 382, y: 30 },{ x: 382, y: 109 }],
            },
            indicator: 'E3'
        },
        {
            src: 'videos/Test_4.mp4',
            items: {
                correcto: [{ x: 192, y: 122 }],
                error_rotacion: [{ x: 508, y: 122 }],
                error_actualizacion: [],
            },
            indicator: 'E4'
        },
        {
            src: 'videos/Test_5.mp4',
            items: {
                correcto: [{ x: 263, y: 108 }],
                error_rotacion: [{ x: 263, y: 188 }],
                error_actualizacion: [{ x: 225, y: 108 },{ x: 309, y: 108 }],
            },
            indicator: 'E5'
        },
        {
            src: 'videos/Test_5a.mp4',
            items: {
                correcto: [{ x: 461, y: 101 }],
                error_rotacion: [{ x: 459, y: 15 },{ x: 232, y: 15 }],
                error_actualizacion: [{ x: 408, y: 101 },{ x: 513, y: 101 },{ x: 461, y: 281 }],
            },
            indicator: 'E6'
        },
        {
            src: 'videos/Test_6.mp4',
            items: {
                correcto: [{ x: 583, y: 243 }],
                error_rotacion: [{ x: 664, y: 243 }],
                error_actualizacion: [{ x: 455, y: 243 },{ x: 609, y: 287 }],
            },
            indicator: 'E7'
        },
        {
            src: 'videos/Test_7.mp4',
            items: {
                correcto: [{ x: 123, y: 117 }],
                error_rotacion: [{ x: 123, y: 263 },{ x: 589, y: 263 }],
                error_actualizacion: [{ x: 77, y: 143 },{ x: 312, y: 117 }],
            },
            indicator: 'E8'
        },
        {
            src: 'videos/Test_7a.mp4',
            items: {
                correcto: [{ x: 377, y: 217 }],
                error_rotacion: [{ x: 445, y: 217 },{ x: 445, y: 50 }],
                error_actualizacion: [{ x: 377, y: 181 },{ x: 250, y: 217 }],
            },
            indicator: 'E9'
        },
        {
            src: 'videos/Test_8.mp4',
            items: {
                correcto: [{ x: 273, y: 249 }],
                error_rotacion: [{ x: 415, y: 246 }],
                error_actualizacion: [{ x: 273, y: 130 }],
            },
            indicator: 'E10'
        },
        {
            src: 'videos/Test_9.mp4',
            items: {
                correcto: [{ x: 226, y: 203 }],
                error_rotacion: [{ x: 470, y: 203 }],
                error_actualizacion: [{ x: 273, y: 146 },{ x: 273, y: 264 }],
            },
            indicator: 'E11'
        },
        {
            src: 'videos/Test_10.mp4',
            items: {
                correcto: [{ x: 304, y: 173 }],
                error_rotacion: [{ x: 399, y: 173 }],
                error_actualizacion: [{ x: 304, y: 109 },{ x: 304, y: 234 }],
            },
            indicator: 'E12'
        }
    ];


    const showScreen = (index) => {
        screens.forEach((screen, i) => {
            if (screen) {
                screen.style.display = i === index ? 'flex' : 'none';
            } else {
                console.error(`Screen with index ${i} not found`);
            }
        });
        updateTrialIndicator();
        loadCanvasContent(index);
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
        showScreen(currentScreenIndex);
        loadCurrentVideo(contador);
        updateTrialIndicator();
    };

    // Añadir event listeners solo si los elementos existen
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', incrementScreenIndex);
    }
    const nextButton1 = document.getElementById('nextButton1');
    if (nextButton1) {
        nextButton1.addEventListener('click', incrementScreenIndex);
    }
    const nextButton2 = document.getElementById('nextButton2');
    if (nextButton2) {
        nextButton2.addEventListener('click', incrementScreenIndex);
    }
    const nextButton3 = document.getElementById('nextButton3');
    if (nextButton3) {
        nextButton3.addEventListener('click', incrementScreenIndex);
    }
    const nextButtonPracticeInstruction = document.getElementById('nextButtonPracticeInstruction');
    if (nextButtonPracticeInstruction) {
        nextButtonPracticeInstruction.addEventListener('click', incrementScreenIndex);
    }
    const nextButtonPractice1 = document.getElementById('nextButtonPractice1');
    if (nextButtonPractice1) {
        nextButtonPractice1.addEventListener('click', incrementScreenIndex);
    }
    const nextButtonPractice2 = document.getElementById('nextButtonPractice2');
    if (nextButtonPractice2) {
        nextButtonPractice2.addEventListener('click', goToPreTestInstruction);
    }
    const nextButtonPreTestInstruction = document.getElementById('nextButtonPreTestInstruction');
    if (nextButtonPreTestInstruction) {
        nextButtonPreTestInstruction.addEventListener('click', showTestScreen);
    }

    const testVideo = document.getElementById('testVideo');
    const nextButtonTest = document.getElementById('nextButtonTest');
    const questionRow = document.getElementById('questionRow');
    const resultsDiv = document.getElementById('results');
    const validateButton = document.getElementById('validateButton');
    const showButton = document.getElementById('showButton');
    const hideButton = document.getElementById('hideButton');
    const prevButton = document.getElementById('prevButton');
    const showRotationErrorButton = document.getElementById('showRotationErrorButton');
    const hideRotationErrorButton = document.getElementById('hideRotationErrorButton');
    const showUpdateErrorButton = document.getElementById('showUpdateErrorButton');
    const hideUpdateErrorButton = document.getElementById('hideUpdateErrorButton');
    const downloadCSVButton = document.getElementById('downloadCSVButton');
    const fullScreenButton = document.getElementById('fullScreenButton');
    const completionScreen = document.getElementById('completionScreen');
    const testScreen = document.getElementById('testScreen');

    if (imageCanvas && testVideo) {
        let clicks = [];
        let clicksByImage = [];
        let resultsByImage = [];
        let showCorrectDoors = false;
        let showRotationErrors = false; // Estado para mostrar errores de rotación
        let showUpdateErrors = false; // Estado para mostrar errores de actualización

        const images = [
            'img/instrucciones.png',
            'img/practica_1.png',
            'img/practica_2.png',
            'img/1.png',
            'img/2.png',
            'img/3.png',
            'img/4.png',
            'img/5.png',
            'img/6.png',
            'img/7.png',
            'img/8.png',
            'img/9.png',
            'img/10.png',
            'img/11.png',
            'img/12.png',
        ];

        clicksByImage = images.map(() => []);
        resultsByImage = images.map(() => []);

        const image = new Image();
        image.onload = function () {
            resizeCanvas(imageCanvas);
            drawImageScaled(imageCanvas, image);
            if (showCorrectDoors) {
                drawCorrectDoors();
            }
            if (showRotationErrors) {
                drawRotationErrors();
            }
            if (showUpdateErrors) {
                drawUpdateErrors();
            }
        };

        fullScreenButton.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        });

        window.addEventListener('resize', () => {
            resizeCanvas(imageCanvas);
            drawImageScaled(imageCanvas, image);
            if (showCorrectDoors) {
                drawCorrectDoors();
            }
            if (showRotationErrors) {
                drawRotationErrors();
            }
            if (showUpdateErrors) {
                drawUpdateErrors();
            }
        });

        testVideo.addEventListener('ended', () => {
            if (questionRow) {
                questionRow.style.display = 'flex';
            } else {
                console.error('questionRow element not found');
            }
        });

        function loadCurrentVideo(contador) {
            testVideo.src = videos[contador].src;
            image.src = images[contador + 3]; // Offset by 3 to account for instruction and practice images
            console.log(`Mostrando video: ${videos[contador].src} y imagen: ${images[contador + 3]}`);
            updateTrialIndicator(); // Actualizar el indicador de prueba
        }

        function handleClick(e) {
            const canvas = e.target;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const scaleX = 700 / canvas.width; // Ancho original de la imagen
            const scaleY = 400 / canvas.height; // Alto original de la imagen
            const click = { x: x * scaleX, y: y * scaleY };

            if (canvas === instructionCanvas) {
                clicksByImage[4].push(click); // Guardar clics para I1
            } else if (canvas === practiceCanvas1) {
                clicksByImage[5].push(click); // Guardar clics para P1
            } else if (canvas === practiceCanvas2) {
                clicksByImage[6].push(click); // Guardar clics para P2
            } else {
                clicksByImage[contador].push(click); // Guardar clics para las demás pantallas
            }

            drawCircle(canvas, x, y, 'blue');
        }

        function drawCircle(canvas, x, y, color) {
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, 2 * Math.PI, false); // Ajusta el tamaño del círculo según sea necesario
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        function drawCorrectDoors() {
            videos[contador].items.correcto.forEach(item => {
                const x = item.x * (imageCanvas.width / 700);
                const y = item.y * (imageCanvas.height / 400);
                drawCircle(imageCanvas, x, y, 'red');
            });
        }

        function drawRotationErrors() {
            videos[contador].items.error_rotacion.forEach(item => {
                const x = item.x * (imageCanvas.width / 700);
                const y = item.y * (imageCanvas.height / 400);
                drawCircle(imageCanvas, x, y, 'orange');
            });
        }

        function drawUpdateErrors() {
            videos[contador].items.error_actualizacion.forEach(item => {
                const x = item.x * (imageCanvas.width / 700);
                const y = item.y * (imageCanvas.height / 400);
                drawCircle(imageCanvas, x, y, 'purple');
            });
        }

        function validateClicks() {
            let correctClicks = 0;
            let rotationErrors = 0;
            let updateErrors = 0;
            const results = [];
            drawImageScaled(imageCanvas, image);
            if (showCorrectDoors) drawCorrectDoors();
            if (showRotationErrors) drawRotationErrors();
            if (showUpdateErrors) drawUpdateErrors();
            clicksByImage[contador].forEach((click, index) => {
                let isCorrect = false;
                let isRotationError = false;
                let isUpdateError = false;

                videos[contador].items.correcto.forEach(item => {
                    const dx = click.x - item.x;
                    const dy = click.y - item.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 20) {
                        isCorrect = true;
                        correctClicks++;
                    }
                });

                videos[contador].items.error_rotacion.forEach(item => {
                    const dx = click.x - item.x;
                    const dy = click.y - item.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 20) {
                        isRotationError = true;
                        rotationErrors++;
                    }
                });

                videos[contador].items.error_actualizacion.forEach(item => {
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
                    drawCircle(imageCanvas, click.x * (imageCanvas.width / 700), click.y * (imageCanvas.height / 400), 'green');
                } else if (isRotationError || isUpdateError) {
                    score = 1;
                    drawCircle(imageCanvas, click.x * (imageCanvas.width / 700), click.y * (imageCanvas.height / 400), 'orange');
                } else {
                    drawCircle(imageCanvas, click.x * (imageCanvas.width / 700), click.y * (imageCanvas.height / 400), 'red');
                }

                results.push({ orden: index + 1, score, coords: { x: click.x, y: click.y } }); // Agregar coordenadas
            });

            resultsDiv.innerHTML = `
                <p>Total de clics: ${clicksByImage[contador].length}</p>
                <p>Puntaje total: ${results.reduce((sum, r) => sum + r.score, 0)}</p>
                <p>Clics correctos: ${correctClicks}</p>
                <p>Errores de rotación: ${rotationErrors}</p>
                <p>Errores de actualización: ${updateErrors}</p>
                <p>Puertas correctas encontradas: ${correctClicks} de ${videos[contador].items.correcto.length}</p>
                <p>Coordenadas de los puntos clickeados:</p>
                <ul>
                    ${results.map(r => `<li>Orden: ${r.orden}, Coordenadas: (${r.coords.x.toFixed(2)}, ${r.coords.y.toFixed(2)})</li>`).join('')}
                </ul>
            `;

            resultsByImage[contador] = results;
            clicksByImage[contador] = [];
        }

        function downloadCSV() {
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
        }

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
        

        function showCompletionScreen() {
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
        }

        // Inicializar la primera carga de video e imagen
        showScreen(currentScreenIndex);

        nextButtonTest.addEventListener('click', () => {
            console.log('Current Test Index (contador): ', contador);
            if (contador < videos.length - 1) {
                contador++; // Incrementar el índice antes de cargar el video y la imagen
                loadCurrentVideo(contador);
                clicksByImage[contador] = [];
                resultsDiv.innerHTML = '';
                if (questionRow) {
                    questionRow.style.display = 'none';
                }
                console.log('New Test Index (contador): ', contador);
                updateTrialIndicator(); // Actualiza el indicador en el click del botón
            } else {
                console.log('End of videos reached');
                showCompletionScreen();
            }
        });

        imageCanvas.addEventListener('click', handleClick, false); // Asegúrate de añadir el evento click aquí
        instructionCanvas.addEventListener('click', handleClick, false); // Asegúrate de añadir el evento click aquí
        practiceCanvas1.addEventListener('click', handleClick, false); // Asegúrate de añadir el evento click aquí
        practiceCanvas2.addEventListener('click', handleClick, false); // Asegúrate de añadir el evento click aquí
        validateButton.addEventListener('click', validateClicks, false);
        showButton.addEventListener('click', () => {
            showCorrectDoors = true;
            drawCorrectDoors();
        });
        hideButton.addEventListener('click', () => {
            showCorrectDoors = false;
            drawImageScaled(imageCanvas, image);
        });
        showRotationErrorButton.addEventListener('click', () => {
            showRotationErrors = true;
            drawRotationErrors();
        });
        hideRotationErrorButton.addEventListener('click', () => {
            showRotationErrors = false;
            drawImageScaled(imageCanvas, image);
            if (showCorrectDoors) drawCorrectDoors();
            if (showUpdateErrors) drawUpdateErrors();
        });
        showUpdateErrorButton.addEventListener('click', () => {
            showUpdateErrors = true;
            drawUpdateErrors();
        });
        hideUpdateErrorButton.addEventListener('click', () => {
            showUpdateErrors = false;
            drawImageScaled(imageCanvas, image);
            if (showCorrectDoors) drawCorrectDoors();
            if (showRotationErrors) drawRotationErrors();
        });
        prevButton.addEventListener('click', () => {
            contador = (contador - 1 + videos.length) % videos.length;
            loadCurrentVideo(contador);
            clicksByImage[contador] = [];
            resultsDiv.innerHTML = '';
        });
        downloadCSVButton.addEventListener('click', downloadCSV, false);

        window.dispatchEvent(new Event('resize')); // Forzar el redimensionamiento inicial
    } else {
        console.error('Canvas element not found');
    }
});
