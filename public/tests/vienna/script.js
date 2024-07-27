document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    let currentScreenIndex = 0;

    const showScreen = (index) => {
        screens.forEach((screen, i) => {
            screen.style.display = i === index ? 'flex' : 'none';
        });
    };

    showScreen(currentScreenIndex);

    document.getElementById('startButton').addEventListener('click', () => {
        currentScreenIndex++;
        showScreen(currentScreenIndex);
    });

    document.getElementById('nextButton1').addEventListener('click', () => {
        currentScreenIndex++;
        showScreen(currentScreenIndex);
    });

    document.getElementById('nextButton2').addEventListener('click', () => {
        currentScreenIndex++;
        showScreen(currentScreenIndex);
    });

    document.getElementById('nextButton3').addEventListener('click', () => {
        currentScreenIndex++;
        showScreen(currentScreenIndex);
    });

    document.getElementById('nextButtonPracticeInstruction').addEventListener('click', () => {
        currentScreenIndex++;
        showScreen(currentScreenIndex);
    });

    document.getElementById('nextButtonPractice1').addEventListener('click', () => {
        currentScreenIndex++;
        showScreen(currentScreenIndex);
    });

    document.getElementById('nextButtonPractice2').addEventListener('click', () => {
        currentScreenIndex++;
        showScreen(currentScreenIndex);
    });

    document.getElementById('nextButtonPreTestInstruction').addEventListener('click', () => {
        currentScreenIndex++;
        showScreen(currentScreenIndex);
    });

    const imageCanvas = document.getElementById('imageCanvas');
    if (imageCanvas) {
        const ctx = imageCanvas.getContext('2d');

        let clicks = [];
        let clicksByImage = [];
        let resultsByImage = [];
        let showCorrectDoors = false;
        let currentImageIndex = 0;

        const images = [
            { src: 'img/practice.png', items: [{ x: 221, y: 255 }, { x: 1150, y: 400 }, { x: 2300, y: 600 }] },
            { src: 'img/1.png', items: [{ x: 450, y: 380 }] },
            { src: 'img/2.png', items: [{ x: 310, y: 225 }] },
            { src: 'img/3.png', items: [{ x: 546, y: 185 }] },
            { src: 'img/4.png', items: [{ x: 135, y: 246 }] },
            { src: 'img/5.png', items: [{ x: 230, y: 220 }] },
            { src: 'img/6.png', items: [{ x: 631, y: 265 }] },
            { src: 'img/7.png', items: [{ x: 2210, y: 720 }] },
            { src: 'img/8.png', items: [{ x: 356, y: 365 }] },
            { src: 'img/9.png', items: [{ x: 701, y: 483 }] },
            { src: 'img/10.png', items: [{ x: 206, y: 500 }] },
            { src: 'img/11.png', items: [{ x: 99, y: 454 }] },
            { src: 'img/12.png', items: [{ x: 193, y: 425 }] },
        ];

        clicksByImage = images.map(() => []);
        resultsByImage = images.map(() => []);

        const image = new Image();
        image.onload = function() {
            resizeCanvas();
            drawImageScaled(image);
            if (showCorrectDoors) {
                drawCorrectDoors();
            }
        };

        startButton.addEventListener('click', () => {
            loadCurrentImage();
        });

        fullScreenButton.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        });

        window.addEventListener('resize', () => {
            resizeCanvas();
            drawImageScaled(image);
            if (showCorrectDoors) {
                drawCorrectDoors();
            }
        });

        testVideo.addEventListener('ended', () => {
            questionRow.style.display = 'flex';
        });

        function resizeCanvas() {
            const aspectRatio = image.width / image.height;
            const windowAspectRatio = window.innerWidth / window.innerHeight;

            if (windowAspectRatio > aspectRatio) {
                imageCanvas.height = window.innerHeight * 0.8;
                imageCanvas.width = imageCanvas.height * aspectRatio;
            } else {
                imageCanvas.width = window.innerWidth * 0.8;
                imageCanvas.height = imageCanvas.width / aspectRatio;
            }
        }

        function loadCurrentImage() {
            image.src = images[currentImageIndex].src;
            updateTrialIndicator();
        }

        function updateTrialIndicator() {
            if (currentImageIndex === 0) {
                trialIndicator.textContent = 'Instrucción';
            } else if (currentImageIndex === 1) {
                trialIndicator.textContent = 'P1';
            } else if (currentImageIndex === 2) {
                trialIndicator.textContent = 'P2';
            } else {
                trialIndicator.textContent = `E${currentImageIndex - 2}`;
            }
        }

        function drawImageScaled(img) {
            ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
        }

        imageCanvas.addEventListener('click', handleClick, false);
        validateButton.addEventListener('click', validateClicks, false);
        showButton.addEventListener('click', () => {
            showCorrectDoors = true;
            drawCorrectDoors();
        });
        hideButton.addEventListener('click', () => {
            showCorrectDoors = false;
            drawImageScaled(image);
        });
        nextButton.addEventListener('click', () => {
            currentImageIndex++;
            if (currentImageIndex >= images.length) {
                showCompletionScreen();
            } else {
                loadCurrentImage();
                clicks = clicksByImage[currentImageIndex];
                resultsDiv.innerHTML = '';
                questionRow.style.display = 'none'; // Hide the question row when moving to the next image
            }
        });
        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            loadCurrentImage();
            clicks = clicksByImage[currentImageIndex];
            resultsDiv.innerHTML = '';
        });

        downloadCSVButton.addEventListener('click', downloadCSV, false);

        function handleClick(e) {
            const rect = imageCanvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (image.width / imageCanvas.width);
            const y = (e.clientY - rect.top) * (image.height / imageCanvas.height);
            clicks.push({ x, y });
            clicksByImage[currentImageIndex] = clicks;
            drawCircle(e.clientX - rect.left, e.clientY - rect.top, 'blue');
        }

        function drawCircle(x, y, color) {
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        function drawCorrectDoors() {
            images[currentImageIndex].items.forEach(item => {
                drawCircle(item.x * (imageCanvas.width / image.width), item.y * (imageCanvas.height / image.height), 'red');
            });
        }

        function validateClicks() {
            let correctClicks = 0;
            const results = [];
            drawImageScaled(image);
            if (showCorrectDoors) drawCorrectDoors();
            clicks.forEach((click, index) => {
                let isCorrect = false;
                images[currentImageIndex].items.forEach(item => {
                    const dx = click.x - item.x;
                    const dy = click.y - item.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 20) {
                        isCorrect = true;
                        correctClicks++;
                    }
                });
                drawCircle(
                    click.x * (imageCanvas.width / image.width),
                    click.y * (imageCanvas.height / image.height),
                    isCorrect ? 'green' : 'red'
                );
                results.push({ orden: index + 1, correcto: isCorrect ? 'Si' : 'No' });
            });

            resultsDiv.innerHTML = `
                <p>Total de clics: ${clicks.length}</p>
                <p>Clics correctos: ${correctClicks}</p>
                <p>Puertas correctas encontradas: ${correctClicks} de ${images[currentImageIndex].items.length}</p>
            `;

            resultsByImage[currentImageIndex] = results;
            clicks = [];
        }

        function downloadCSV() {
            const csvData = [];
            resultsByImage.forEach((results, imageIndex) => {
                results.forEach(result => {
                    csvData.push({
                        image: images[imageIndex].src,
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
            testScreen.style.display = 'none';
            completionScreen.style.display = 'flex';
        }
    } else {
        console.error('Canvas element not found');
    }
});
