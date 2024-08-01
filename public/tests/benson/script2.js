document.addEventListener('DOMContentLoaded', () => {
    const fullscreenButton = document.getElementById('fullscreen-button');
    const finishDrawingWithFigureButton = document.getElementById('finish-drawing-with-figure');
    const container2 = document.querySelector('.container2');
    const instruccionesDespues = document.getElementById('instruccionesdespues');
    const selectHandContainer = document.getElementById("selectHand");
    const handButton = document.getElementById("handButton");

    let startTime1, endTime1, startTimeExecution;

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

    function finishresponse1() {
        endTime1 = new Date();
        console.log("Tiempo de finalización de tarea: ", endTime1);
    }

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
            } else {
                handButton.style.display = 'none';
            }
            finishresponse1();
        });
    }

    initCanvas('drawing-canvas', 'clear-canvas-button', 'download-canvas-button');
    startCanvasRecording('drawing-canvas');
});
