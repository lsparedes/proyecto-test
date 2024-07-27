document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    let currentScreenIndex = 0;
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

    const ctx = imageCanvas.getContext('2d');

    const resizeCanvas = (canvas) => {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    };

    const drawImageScaled = (canvas, img) => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const loadCanvasContent = (index) => {
        if (index === 5) {
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
        { src: 'videos/Test_1.mp4', items: [{ x: 450, y: 380 }], indicator: 'E1' },
        { src: 'videos/Test_2.mp4', items: [{ x: 310, y: 225 }], indicator: 'E2' },
        { src: 'videos/Test_3.mp4', items: [{ x: 546, y: 185 }], indicator: 'E3' },
        { src: 'videos/Test_4.mp4', items: [{ x: 135, y: 246 }], indicator: 'E4' },
        { src: 'videos/Test_5.mp4', items: [{ x: 230, y: 220 }], indicator: 'E5' },
        { src: 'videos/Test_5a.mp4', items: [{ x: 631, y: 265 }], indicator: 'E6' },
        { src: 'videos/Test_6.mp4', items: [{ x: 2210, y: 720 }], indicator: 'E7' },
        { src: 'videos/Test_7.mp4', items: [{ x: 356, y: 365 }], indicator: 'E8' },
        { src: 'videos/Test_7a.mp4', items: [{ x: 701, y: 483 }], indicator: 'E9' },
        { src: 'videos/Test_8.mp4', items: [{ x: 206, y: 500 }], indicator: 'E10' },
        { src: 'videos/Test_9.mp4', items: [{ x: 99, y: 454 }], indicator: 'E11' },
        { src: 'videos/Test_10.mp4', items: [{ x: 193, y: 425 }], indicator: 'E12' },
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

    document.getElementById('startButton').addEventListener('click', incrementScreenIndex);
    document.getElementById('nextButton1').addEventListener('click', incrementScreenIndex);
    document.getElementById('nextButton2').addEventListener('click', incrementScreenIndex);
    document.getElementById('nextButton3').addEventListener('click', incrementScreenIndex);
    document.getElementById('nextButtonPracticeInstruction').addEventListener('click', incrementScreenIndex);
    document.getElementById('nextButtonPractice1').addEventListener('click', incrementScreenIndex);
    document.getElementById('nextButtonPractice2').addEventListener('click', goToPreTestInstruction);
    document.getElementById('nextButtonPreTestInstruction').addEventListener('click', () => {
        incrementScreenIndex();
        showTestScreen();
    });

    const testVideo = document.getElementById('testVideo');
    const nextButtonTest = document.getElementById('nextButtonTest');
    const questionRow = document.getElementById('questionRow');
    const resultsDiv = document.getElementById('results');
    const validateButton = document.getElementById('validateButton');
    const showButton = document.getElementById('showButton');
    const hideButton = document.getElementById('hideButton');
    const prevButton = document.getElementById('prevButton');
    const downloadCSVButton = document.getElementById('downloadCSVButton');
    const fullScreenButton = document.getElementById('fullScreenButton');
    const completionScreen = document.getElementById('completionScreen');
    const testScreen = document.getElementById('testScreen');

    if (imageCanvas && testVideo) {
        let clicks = [];
        let clicksByImage = [];
        let resultsByImage = [];
        let showCorrectDoors = false;

        const images = [
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

        clicksByImage = videos.map(() => []);
        resultsByImage = videos.map(() => []);

        const image = new Image();
        image.onload = function () {
            resizeCanvas(imageCanvas);
            drawImageScaled(imageCanvas, image);
            if (showCorrectDoors) {
                drawCorrectDoors();
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
            image.src = images[contador + 2]; // Offset by 2 to account for practice images
            console.log(`Mostrando video: ${videos[contador].src} y imagen: ${images[contador + 2]}`);
            updateTrialIndicator(); // Actualizar el indicador de prueba
        }

        function handleClick(e) {
            const rect = imageCanvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (image.width / imageCanvas.width);
            const y = (e.clientY - rect.top) * (image.height / imageCanvas.height);
            clicks.push({ x, y });
            clicksByImage[contador] = clicks;
            drawCircle(imageCanvas, e.clientX - rect.left, e.clientY - rect.top, 'blue');
        }

        function drawCircle(canvas, x, y, color) {
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        function drawCorrectDoors() {
            videos[contador].items.forEach(item => {
                drawCircle(imageCanvas, item.x * (imageCanvas.width / image.width), item.y * (imageCanvas.height / image.height), 'red');
            });
        }

        function validateClicks() {
            let correctClicks = 0;
            const results = [];
            drawImageScaled(imageCanvas, image);
            if (showCorrectDoors) drawCorrectDoors();
            clicks.forEach((click, index) => {
                let isCorrect = false;
                videos[contador].items.forEach(item => {
                    const dx = click.x - item.x;
                    const dy = click.y - item.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 20) {
                        isCorrect = true;
                        correctClicks++;
                    }
                });
                drawCircle(imageCanvas,
                    click.x * (imageCanvas.width / image.width),
                    click.y * (imageCanvas.height / image.height),
                    isCorrect ? 'green' : 'red'
                );
                results.push({ orden: index + 1, correcto: isCorrect ? 'Si' : 'No' });
            });

            resultsDiv.innerHTML = `
                <p>Total de clics: ${clicks.length}</p>
                <p>Clics correctos: ${correctClicks}</p>
                <p>Puertas correctas encontradas: ${correctClicks} de ${videos[contador].items.length}</p>
            `;

            resultsByImage[contador] = results;
            clicks = [];
        }

        function downloadCSV() {
            const csvData = [];
            resultsByImage.forEach((results, imageIndex) => {
                results.forEach(result => {
                    csvData.push({
                        image: videos[imageIndex].src,
                        orden: result.orden,
                        correcto: result.correcto
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

        function showTestScreen() {
            contador = 0;
            loadCurrentVideo(contador);
            showScreen(currentScreenIndex); // Muestra la primera ventana de test
            updateTrialIndicator(); // Actualiza el indicador al mostrar la primera ventana de test
        }

        // Inicializar la primera carga de video e imagen
        showScreen(currentScreenIndex);

        nextButtonTest.addEventListener('click', () => {
            console.log('Current Test Index (contador): ', contador);
            if (contador < videos.length - 1) {
                contador++; // Incrementar el índice antes de cargar el video y la imagen
                loadCurrentVideo(contador);
                clicks = clicksByImage[contador];
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
    } else {
        console.error('Canvas element not found');
    }
});
