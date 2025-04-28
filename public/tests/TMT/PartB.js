document.addEventListener('DOMContentLoaded', function () {
    const fullscreenButton = document.getElementById('fullscreenButton');
    const show = document.getElementById('show');
    const show1 = document.getElementById('show1');

    const canvasPractice = document.getElementById('tmtCanvas');
    const canvasPartB = document.getElementById('tmtCanvasPartB2');
    const ctxPractice = canvasPractice.getContext('2d');
    const ctxPartB = canvasPartB.getContext('2d');

    const circleRadius = 30;

    let testStartTime = Date.now();
    let execStartTime = null;
    let execEndTime = null;
    let liftCount = 0;
    let liftTotalTime = 0;
    let liftStartTime = null;
    let correctLinesPartB = 0;
    let incorrectLinesPartB = 0;

    let mediaRecorder;
    let recordedChunks = [];


    const circleCoordinates = [
        { x: 398 - 70, y: 297 },
        { x: 530 - 70, y: 90 },
        { x: 650 - 70, y: 340 },
        { x: 550 - 70, y: 190 },
        { x: 520 - 70, y: 400 },
        { x: 200 - 70, y: 400 },
        { x: 180 - 70, y: 80 },
        { x: 360 - 70, y: 150 }
    ];

    const circleCoordinatesPartB = [
        { x: 422, y: 480 },
        { x: 590, y: 750 },
        { x: 251, y: 853 },
        { x: 364, y: 216 },
        { x: 383, y: 364 },
        { x: 560, y: 597 },
        { x: 461, y: 185 },
        { x: 667, y: 147 },
        { x: 664, y: 509 },
        { x: 690, y: 909 },
        { x: 380, y: 862 },
        { x: 180, y: 941 },
        { x: 269, y: 474 },
        { x: 180, y: 678 },
        { x: 146, y: 201 },
        { x: 180, y: 560 },
        { x: 265, y: 149 },
        { x: 546, y: 139 },
        { x: 763, y: 86 },
        { x: 705, y: 761 },
        { x: 756, y: 980 },
        { x: 94, y: 993 },
        { x: 101, y: 648 },
        { x: 143, y: 874 },
        { x: 101, y: 97 }
    ];

    function drawCircles(ctx, coordinates) {
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        coordinates.forEach((circle, index) => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circleRadius, 0, 2 * Math.PI);
            ctx.stroke();
    
            const label = index % 2 === 0
                ? Math.floor(index / 2) + 1 
                : String.fromCharCode(65 + Math.floor(index / 2));
            ctx.fillText(label, circle.x, circle.y);
    
            if (index === 0) {
                ctx.font = 'bold 18px Arial';
                ctx.fillText("Empezar", circle.x, circle.y - 50);
                ctx.font = '32px Arial'; 
            }

            if (index === coordinates.length - 1) {
                ctx.font = 'bold 18px Arial';
                ctx.fillText("Terminar", circle.x, circle.y + 50);
                ctx.font = '32px Arial'; 
            }
        });
    }
    

    drawCircles(ctxPractice, circleCoordinates);
    drawCircles(ctxPartB, circleCoordinatesPartB);

    function getCircleIndexAtPosition(x, y, coordinates) {
        for (let i = 0; i < coordinates.length; i++) {
            const circle = coordinates[i];
            const dx = x - circle.x;
            const dy = y - circle.y;
            if (Math.sqrt(dx * dx + dy * dy) <= circleRadius) {
                return i;
            }
        }
        return -1;
    }

    function drawCircleNormal(ctx, circle, index) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius + 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
        ctx.lineWidth = 1;
        ctx.font = '32px Arial';
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius, 0, 2 * Math.PI);
        ctx.stroke();
        const label = index % 2 === 0
            ? Math.floor(index / 2) + 1
            : String.fromCharCode(65 + Math.floor(index / 2));
        ctx.fillText(label, circle.x, circle.y);
    }

    function drawCircleBold(ctx, circle, index) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius + 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
        ctx.lineWidth = 4;
        ctx.font = 'bold 32px Arial';
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius, 0, 2 * Math.PI);
        ctx.stroke();
        const label = index % 2 === 0
            ? Math.floor(index / 2) + 1
            : String.fromCharCode(65 + Math.floor(index / 2));
        ctx.fillText(label, circle.x, circle.y);

        ctx.lineWidth = 1;
    }

    function drawCircleError(ctx, circle, index) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius + 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'red';
        ctx.font = '32px Arial';
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'red';
        const label = index % 2 === 0
            ? Math.floor(index / 2) + 1 
            : String.fromCharCode(65 + Math.floor(index / 2));
        ctx.fillText(label, circle.x, circle.y);

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
    }

    function enableDrawing(canvas, ctx) {
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        function getTouchPosRotated(canvas, touchEvent) {
            const rect = canvas.getBoundingClientRect();
            const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];

            const localX = touch.clientX - rect.left;
            const localY = touch.clientY - rect.top;

            const rotatedX = rect.height - localY;
            const rotatedY = localX;
            return { x: rotatedX, y: rotatedY };
        }

        let currentCircleIndex = 0;
        const coordinates = canvas === canvasPractice ? circleCoordinates : circleCoordinatesPartB;

        drawCircleNormal(ctx, coordinates[currentCircleIndex], currentCircleIndex);

        let hasError = false;
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const coords = getTouchPosRotated(canvas, e);
            const index = getCircleIndexAtPosition(coords.x, coords.y, coordinates);

            if (canvas === canvasPartB && liftStartTime !== null) {
                liftCount++;
                liftTotalTime += Date.now() - liftStartTime;
                liftStartTime = null;
            }

            if (hasError && index === currentCircleIndex - 1) {
                errorIndices.forEach((errIndex) => {
                    drawCircleNormal(ctx, coordinates[errIndex], errIndex);
                });
                errorIndices = [];
                hasError = false;
                isDrawing = true;
                lastX = coords.x;
                lastY = coords.y;
                return;
            }

            if (!hasError) {
                isDrawing = true;
                lastX = coords.x;
                lastY = coords.y;
            }
        });

        let errorIndices = [];

        canvas.addEventListener('touchmove', (e) => {
            if (!isDrawing || hasError) return;
            e.preventDefault();
            const coords = getTouchPosRotated(canvas, e);

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
            lastX = coords.x;
            lastY = coords.y;

            const index = getCircleIndexAtPosition(coords.x, coords.y, coordinates);

            if (index === currentCircleIndex) {
                if (errorIndices.length > 0) {
                    errorIndices.forEach((errIndex) => {
                        drawCircleNormal(ctx, coordinates[errIndex], errIndex);
                    });
                    errorIndices = [];
                }

                if (currentCircleIndex > 0) {
                    drawCircleNormal(ctx, coordinates[currentCircleIndex - 1], currentCircleIndex - 1);
                }

                drawCircleBold(ctx, coordinates[currentCircleIndex], currentCircleIndex);
                currentCircleIndex++;
                if (currentCircleIndex >= coordinates.length) {
                    isDrawing = false;
                    hasError = false;
                    return;
                }
                if (canvas === canvasPartB) {
                    correctLinesPartB++;
                }
            }
            else if (
                index !== -1 &&
                index !== currentCircleIndex &&
                index !== currentCircleIndex - 1 &&
                !errorIndices.includes(index)
            ) {
                drawCircleError(ctx, coordinates[index], index);
                errorIndices.push(index);
                hasError = true;
                isDrawing = false;
                if (canvas === canvasPartB) {
                    incorrectLinesPartB++;
                }
            }
        });

        canvas.addEventListener('touchend', () => {
            isDrawing = false;
            if (canvas === canvasPartB && liftStartTime === null) {
                liftStartTime = Date.now();
            }
        });

        canvas.addEventListener('touchcancel', () => {
            isDrawing = false;
            if (canvas === canvasPartB && liftStartTime === null) {
                liftStartTime = Date.now();
            }
        });

    }

    enableDrawing(canvasPractice, ctxPractice);
    enableDrawing(canvasPartB, ctxPartB);

    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenEnabled && !document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('imagenes/minimize.png')";
            document.documentElement.requestFullscreen();
        } else if (document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('imagenes/full-screen.png')";
            document.exitFullscreen();
        } else {
            console.log('El modo de pantalla completa no es soportado por tu navegador.');
        }
    });

    const audio = document.getElementById("instructionAudio");
    audio.addEventListener("ended", () => {
        execStartTime = Date.now();
        console.log('ExecTime: On', new Date(execStartTime).toLocaleString());

        const stream = canvasPartB.captureStream(30);
        mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

        mediaRecorder.ondataavailable = function (e) {
            if (e.data.size > 0) recordedChunks.push(e.data);
        };

        mediaRecorder.start();

        show1.style.backgroundImage = "url('imagenes/noeye.png')";

        if (typeof show1Timer !== 'undefined') {
            clearTimeout(show1Timer);
        }

        show1Timer = setTimeout(() => {
            show1.style.backgroundImage = "url('imagenes/noeye-red.png')";
            console.log("Ojo cambiado a rojo después de 3 minutos");
        }, 300000);

    });

    const endSequenceButton = document.getElementById('endSequenceButton');
    const endSequenceButtonPartB = document.getElementById('endSequenceButtonPartB');

    let arrowVisible = false;

    endSequenceButton.addEventListener('click', () => {
        document.getElementById('partB').style.display = 'none';
        document.getElementById('partB2').style.display = 'flex';
        document.getElementById('endSequenceButton').style.display = 'none';

        ctxPartB.fillStyle = "white";
        ctxPartB.fillRect(0, 0, canvasPartB.width, canvasPartB.height);

        ctxPartB.fillStyle = "black";
        ctxPartB.strokeStyle = "black";

        drawCircles(ctxPartB, circleCoordinatesPartB);
        resetArrowAndButton();
    });

    endSequenceButtonPartB.addEventListener('click', () => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
        }

        document.getElementById('partB2').style.display = 'none';
        document.getElementById('preEnd').style.display = 'block';
        document.getElementById('endSequenceButtonPartB').style.display = 'none';
        document.getElementById('show1').style.display = 'none';
        document.getElementById('show').style.display = 'none';
        execEndTime = Date.now();
    });

    function resetArrowAndButton() {
        arrowVisible = false;
    
        endSequenceButton.style.display = 'none';
        endSequenceButtonPartB.style.display = 'none';
    
        show.style.backgroundImage = "url('imagenes/noeye.png')";
        show1.style.backgroundImage = "url('imagenes/noeye.png')";
    }


    function toggleArrowVisibility(button) {
        arrowVisible = !arrowVisible;
    
        const inPractice = document.getElementById('partB').style.display !== 'none';
    
        endSequenceButton.style.display = (arrowVisible && inPractice) ? 'block' : 'none';
        endSequenceButtonPartB.style.display = (arrowVisible && !inPractice) ? 'block' : 'none';
    
        button.style.backgroundImage = arrowVisible
            ? "url('imagenes/eye.png')"
            : "url('imagenes/noeye.png')";
    }

    show.addEventListener('click', () => {
        toggleArrowVisibility(show);
    });

    show1.addEventListener('click', () => {
        toggleArrowVisibility(show1);
    });

    let selectedHand = "";
    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");
    const handInputs = document.getElementsByName('hand');
    handButton.addEventListener('click', confirmHandSelection);

    function validateInputs() {
        selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

        if (selectedHand) {
            handButton.style.display = 'block';
        }
    }

    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            validateInputs();
            selectedHand = e.target.value;
        });
    });

    function confirmHandSelection() {
        document.getElementById('preEnd').style.display = 'none';
        selectHandContainer.style.display = "none";
        handButton.style.display = "none";

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
            userInfo = data;
            console.log("Usuario autenticado:", userInfo);
        })
        .catch(error => {
            console.error('Error al obtener la información del usuario:', error);
        });

        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

    const idParticipante = getQueryParam('id_participante');

    async function confirmHandSelection() {

        const fechaActual = new Date();
        const options = { timeZone: 'America/Santiago', year: 'numeric', month: 'numeric', day: 'numeric' };
        const fechaHoraChilena = fechaActual.toLocaleString('es-CL', options);
        const [day, month, year] = fechaHoraChilena.split('-');
        const fechaFormateada = `${day}_${month}_${year}`;

        const zip = new JSZip();
        const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();
  
        const totTime = (execEndTime - testStartTime) / 1000;
        const execTime = execStartTime ? (execEndTime - execStartTime) / 1000 : 0;
        const liftTime = liftTotalTime / 1000;
        const csvContent = `TotTime;ExecTime;NoIncLines;NoCorrLines;NoLiftPen;ExecLiftTime;Hand\n` +
            `${totTime.toFixed(2)};${execTime.toFixed(2)};${incorrectLinesPartB};${correctLinesPartB};${liftCount};${liftTime.toFixed(2)};${selectedHand}\n`;
            zip.file("2_TMT_Part_B.csv", csvContent);

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvasPartB.width;
        tempCanvas.height = canvasPartB.height;
        const tempCtx = tempCanvas.getContext("2d");

        tempCtx.fillStyle = "white";
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        tempCtx.drawImage(canvasPartB, 0, 0);

        const imageDataUrl = tempCanvas.toDataURL("image/png");
        const imageBlob = await (await fetch(imageDataUrl)).blob();
        zip.file("2_TMT_Part_B_Canvas_Screenshot.png", imageBlob);

        const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
        zip.file("2_TMT_Part_B_Canvas_Recording.webm", videoBlob);

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipUrl = URL.createObjectURL(zipBlob);
        const link = document.createElement("a");
        link.href = zipUrl;
        link.download = `${idParticipante}_2_TMT_PartB_${inicialesExaminador}_${fechaFormateada}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        document.getElementById('preEnd').style.display = 'none';
        selectHandContainer.style.display = "none";
        handButton.style.display = "none";

        setTimeout(() => {
            window.close();
        }, 3000);
    }


});