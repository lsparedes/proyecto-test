let mediaRecorder;
let chunks = [];
let timerInterval;
const downloadLinks = [];
let audioStream = null; // Guardar el stream de audio

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
            audioStream = stream; // Guardar el stream de audio
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

    for (let i = 1; i <= 14; i++) {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('test-item');

        const title = document.createElement('h3');
        title.textContent = titles[i - 1];

        const audio = document.createElement('audio');
        const beep = document.createElement('audio');

        beep.src = 'alarm.mp3';
        audio.src = `audio/${type}/${i}.mp3`;
        audio.controls = true;

        // Añadir evento para iniciar la reproducción del beep al terminar el audio de explicación
        audio.addEventListener('ended', () => {
            beep.play();
        });

        // Añadir evento para iniciar la grabación automáticamente al terminar la reproducción del beep
        beep.addEventListener('play', () => {
            setTimeout(() => {
                startRecording(itemDiv, title);
            }, beep.duration * 1000 - 600); 
        });

        const timerDiv = document.createElement('div');
        timerDiv.classList.add('timer-container');

        const timerSpan = document.createElement('span');
        timerSpan.classList.add('timer');
        timerSpan.textContent = '00:00';

        timerDiv.appendChild(timerSpan);

        const stopImg = document.createElement('img');
        stopImg.src = 'detenerr.png';
        stopImg.classList.add('img-button', 'stop-img', 'hidden');
        stopImg.addEventListener('click', () => stopRecording(timerSpan, i, itemDiv));

        const nextButton = document.createElement('button');
        nextButton.textContent = '';
        nextButton.classList.add('hidden', 'next-button');
        nextButton.addEventListener('click', () => {
            clearInterval(timerInterval);
            updateTimerDisplay(timerSpan, 0);
            itemDiv.classList.add('hidden');
            if (itemDiv.nextSibling) {
                itemDiv.nextSibling.classList.remove('hidden');
            } else {
                document.getElementById('test-items-' + type).classList.add('hidden');
                showDownloadLinks();
            }
        });

        itemDiv.appendChild(title);
        itemDiv.appendChild(audio);
        itemDiv.appendChild(stopImg);
        itemDiv.appendChild(timerDiv);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(nextButton);
        itemDiv.appendChild(buttonContainer);

        if (i !== 1) itemDiv.classList.add('hidden');

        testItemsContainer.appendChild(itemDiv);
    }
}

function startRecording(itemDiv, title) {
    if (!audioStream) {
        alert('No se puede acceder al micrófono. Por favor, revisa los permisos.');
        return;
    }

    mediaRecorder = new MediaRecorder(audioStream);
    mediaRecorder.ondataavailable = e => {
        chunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        downloadLinks.push({ url: audioURL, title: title });

        // Ocultar el botón de grabación y mostrar el botón de siguiente
        const stopImg = itemDiv.querySelector('.stop-img');
        stopImg.classList.add('hidden');
        const nextButton = itemDiv.querySelector('.next-button');
        nextButton.classList.remove('hidden');

        const message = document.createElement('div');
        message.textContent = 'Grabación creada';
        message.classList.add('recording-message');
        itemDiv.appendChild(message);
    };
    mediaRecorder.start();

    // Mostrar el botón de detener y el nuevo botón al iniciar la grabación
    const stopImg = itemDiv.querySelector('.stop-img');
    stopImg.classList.remove('hidden');

    const newButton = document.createElement('div');
    newButton.classList.add('img-button', 'new-button');
    newButton.style.backgroundImage = "url('boton-rec.png')";

    // Insertar el nuevo botón justo antes de stopImg
    stopImg.parentNode.insertBefore(newButton, stopImg);

    startTimer(itemDiv.querySelector('.timer'));
}

function stopRecording(timerSpan, index, itemDiv) {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        clearInterval(timerInterval);

        // Mostrar el botón de siguiente y ocultar el nuevo botón si existe
        const nextButton = itemDiv.querySelector('.next-button');
        nextButton.classList.remove('hidden');

        const newButton = itemDiv.querySelector('.new-button');
        if (newButton) {
            newButton.parentNode.removeChild(newButton);
        }
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

function showDownloadLinks() {
    const completionMessage = document.getElementById('completion-message');
    const downloadList = document.createElement('ul');

    downloadLinks.forEach((linkData, index) => {
        const listItem = document.createElement('li');
        const downloadLink = document.createElement('a');
        downloadLink.href = linkData.url;
        downloadLink.download = `respuesta_${index + 1}.wav`;
        downloadLink.textContent = `Descargar Respuesta ${index + 1}`;
        listItem.appendChild(downloadLink);
        downloadList.appendChild(listItem);
    });

    completionMessage.appendChild(downloadList);
    completionMessage.classList.remove('hidden');
}