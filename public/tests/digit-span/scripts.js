let mediaRecorder;
let chunks = [];
const downloadLinks = [];
let audioStream = null;
let recordingStartTime;
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    requestMicrophonePermission();
});

function requestMicrophonePermission() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Tu navegador no soporta grabación de audio.');
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioStream = stream;
            document.getElementById('permission-message').classList.add('hidden');
        })
        .catch(err => {
            console.error('Error al solicitar permisos de micrófono:', err);
            document.getElementById('permission-message').classList.remove('hidden');
        });
}

function startTest(type) {
    const testItemsContainer = type === 'forward' ? document.getElementById('test-items-forward') : document.getElementById('test-items-backward');
    testItemsContainer.innerHTML = '';

    const forwardTitles = ['S3-1', 'S3-2', 'S4-1', 'S4-2', 'S5-1', 'S5-2', 'S6-1', 'S6-2', 'S7-1', 'S7-2', 'S8-1', 'S8-2', 'S9-1', 'S9-2'];
    const backwardTitles = ['S2-1', 'S2-2', 'S3-1', 'S3-2', 'S4-1', 'S4-2', 'S5-1', 'S5-2', 'S6-1', 'S6-2', 'S7-1', 'S7-2', 'S8-1', 'S8-2'];

    const titles = type === 'forward' ? forwardTitles : backwardTitles;

    titles.forEach((title, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('test-item');

        const titleElement = document.createElement('div');
        titleElement.classList.add('imageText');
        titleElement.textContent = title;

        const audio = document.createElement('audio');
        audio.src = `audio/${type}/${index + 1}.mp3`;
        audio.controls = true;

        audio.addEventListener('ended', () => {
            playBeepAndShowButtons(itemDiv, titleElement, index + 1);
        });

        const timerDiv = document.createElement('div');
        timerDiv.classList.add('timer-container');

        const timerSpan = document.createElement('span');
        timerSpan.classList.add('timer');
        timerSpan.textContent = '00:00';

        timerDiv.appendChild(timerSpan);

        const stopImg = document.createElement('img');
        stopImg.src = 'img/detenerr1.png';
        stopImg.classList.add('img-button', 'stop-img', 'hidden');
        stopImg.addEventListener('click', () => {
            stopRecording(timerSpan, index + 1, itemDiv, type);
            stopAllAudios();
        });
    

        const nextButton = document.createElement('button');
        nextButton.textContent = '';
        nextButton.classList.add('hidden', 'next-button');
        nextButton.addEventListener('click', () => {
            stopRecording(timerSpan, index + 1, itemDiv, type);
            stopAllAudios();
        });

        itemDiv.appendChild(titleElement);
        itemDiv.appendChild(audio);
        itemDiv.appendChild(stopImg);
        itemDiv.appendChild(timerDiv);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(nextButton);
        itemDiv.appendChild(buttonContainer);

        if (index !== 0) itemDiv.classList.add('hidden');

        testItemsContainer.appendChild(itemDiv);
    });
}

function playBeepAndShowButtons(itemDiv, titleElement, index) {
    const beep = new Audio('audio/beep.wav');
    beep.play();
    beep.addEventListener('ended', () => {
        if (!itemDiv.querySelector('.new-button')) {
            startRecording(itemDiv, titleElement, index);
        }
    });
}

function startRecording(itemDiv, titleElement, index) {
    if (!audioStream) {
        alert('No se puede acceder al micrófono. Por favor, revisa los permisos.');
        return;
    }

    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
    chunks = [];

    mediaRecorder = new MediaRecorder(audioStream);
    mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) {
            chunks.push(e.data);
        }
    };
    mediaRecorder.onstop = () => {
        console.log('Grabación detenida. Chunks:', chunks);
        if (chunks.length > 0) {
            const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            const audioURL = window.URL.createObjectURL(blob);
            const recordingTime = new Date();
            const duration = recordingTime - recordingStartTime;
            downloadLinks.push({ url: audioURL, title: titleElement.textContent, index: index, blob: blob, duration: duration });

            console.log(`Grabación ${index} finalizada. Duración: ${duration} ms`);
            console.log(downloadLinks);

            const stopImg = itemDiv.querySelector('.stop-img');
            stopImg.classList.add('hidden');
            const nextButton = itemDiv.querySelector('.next-button');
            nextButton.classList.remove('hidden');
        } else {
            console.warn('No se encontraron datos en los chunks.');
        }
    };

    mediaRecorder.onerror = (event) => {
        console.error('Error en la grabación:', event.error);
    };

    mediaRecorder.start();
    recordingStartTime = new Date();

    const stopImg = itemDiv.querySelector('.stop-img');
    stopImg.classList.remove('hidden');

    const newButton = document.createElement('div');
    newButton.classList.add('img-button', 'new-button');
    newButton.style.backgroundImage = "url('img/boton-rec.png')";

    const existingNewButton = itemDiv.querySelector('.new-button');
    if (existingNewButton) {
        existingNewButton.parentNode.removeChild(existingNewButton);
    }

    stopImg.parentNode.insertBefore(newButton, stopImg);

    const nextButton = itemDiv.querySelector('.next-button');
    nextButton.classList.remove('hidden');

    startTimer(itemDiv.querySelector('.timer'));
}

function stopRecording(timerSpan, index, itemDiv, type) {

    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        clearInterval(timerInterval);
        updateTimerDisplay(timerSpan, 0);

        // Añadimos un pequeño retraso solo al final del proceso
        if (itemDiv.nextElementSibling === null) {
            itemDiv.classList.add('hidden');

            document.getElementById('test-items-' + type).classList.add('hidden');
            mostrarFinalizacion(type);
        } else {
            // Si no es el último ítem, avanzamos inmediatamente al siguiente ítem
            itemDiv.classList.add('hidden');

            let nextItem = itemDiv.nextElementSibling;
            if (nextItem) {
                nextItem.classList.remove('hidden');
            }

            console.log(`Ítem ${index} grabado y oculto.`);
            console.log(`Mostrando siguiente ítem.`);
        }

        console.log("Contenido de downloadLinks:", downloadLinks);
    } else {
        console.log("No se está grabando en este momento.");
    }
}


function startTimer(displayElement) {
    let time = 0;
    displayElement.textContent = formatTime(time);
    timerInterval = setInterval(() => {
        time++;
        displayElement.textContent = formatTime(time);
    }, 1000);
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function updateTimerDisplay(displayElement, time) {
    displayElement.textContent = formatTime(time);
}
const finalButton = document.getElementById('final-button');
let participantID = 0;

function mostrarFinalizacion(type) {
    console.log("Mostrando mensaje de finalización...");
    const completionMessage = document.getElementById('completion-message');
    completionMessage.classList.remove('hidden');  // Asegúrate de eliminar la clase 'hidden'
    const fin = document.getElementById('fin');
    const enterID = document.getElementById('enterID');
    fin.style.display = 'block';
    enterID.style.display = 'block';
    document.getElementById('final-button').addEventListener('click', () => {
        const participantID = document.getElementById('participantID').value.trim();
        crearZip(type,participantID);
    });
}




document.getElementById('participantID').addEventListener('input', () => {
    const participantID = document.getElementById('participantID').value.trim();
    const finalButton = document.getElementById('final-button');
    if (participantID) {
        finalButton.style.display = 'block';
    } else {
        finalButton.style.display = 'none';
    }
});


function generarCSV() {
    let csvContent = "Prueba;Tiempo Dedicado en milisegundos\n";

    downloadLinks.forEach(linkData => {
        if (linkData.title && linkData.duration) {
            const row = `${linkData.title};${linkData.duration}`;
            csvContent += row + "\n";
        }
    });

    return csvContent;
}

function crearZip(type,participantID) {
    document.getElementById('enterID').style.display = 'none';
    document.getElementById('final-button').style.display = 'none';
    if (!downloadLinks.length) {
        console.error("No hay datos en downloadLinks.");
        return;
    }

    const zip = new JSZip();
    const audioFolder = zip.folder('audios');

    if (!audioFolder) {
        console.error("No se pudo crear la carpeta 'audios' en el archivo ZIP.");
        return;
    }

    console.log("Contenido de downloadLinks:", downloadLinks);

    downloadLinks.forEach(linkData => {
        if (linkData.title && linkData.blob) {
            const fileName = `${type}_${linkData.title}.ogg`;
            audioFolder.file(fileName, linkData.blob);
            console.log(`Archivo añadido al ZIP: ${fileName}`);
        } else {
            console.warn("Datos incompletos en linkData:", linkData);
        }
    });

    const csvContent = generarCSV();
    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    console.log("Contenido del CSV:", csvContent);

    const fechaActual = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Santiago' };
    const fechaFormateada = fechaActual.toLocaleDateString('es-CL', opciones).replace(/[/\s:]/g, '_');

    zip.file(`ID_${participantID}_respuestas_digital_span_${type}_${fechaFormateada}.csv`, csvBlob);

    zip.generateAsync({ type: "blob" })
        .then(content => {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(content);
            downloadLink.download = `ID_${participantID}_respuestas_digital_span_${type}_${fechaFormateada}.zip`;
            downloadLink.textContent = 'Descargar todas las grabaciones';
            document.body.appendChild(downloadLink);

            downloadLink.click();
            document.body.removeChild(downloadLink);

            const completionMessage = document.getElementById('completion-message');
            if (completionMessage) {
                completionMessage.classList.remove('hidden');
            }
        })
        .catch(err => {
            console.error("Error generando el archivo ZIP:", err);
        });
}

function stopAllAudios() {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => audio.pause());
  }
