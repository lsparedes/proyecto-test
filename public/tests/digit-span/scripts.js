let mediaRecorder;
let chunks = [];
const downloadLinks = [];
let audioStream = null;
let recordingStartTime;
let timerInterval;
let taskTimeStart;
let taskTime;

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
            const permissionMessage = document.getElementById('permission-message');
            if (permissionMessage) {
                permissionMessage.classList.add('hidden');
            }
        })
        .catch(err => {
            console.error('Error al solicitar permisos de micrófono:', err);
            const permissionMessage = document.getElementById('permission-message');
            if (permissionMessage) {
                permissionMessage.classList.remove('hidden');
            }
        });
}

const fullscreenButton = document.getElementById('fullscreen-button');
fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenEnabled && !document.fullscreenElement) {
        fullscreenButton.style.backgroundImage = "url('img/minimize.png')"; // Cambiar la imagen del botón a 'minimize'
        document.documentElement.requestFullscreen();
    } else if (document.fullscreenElement) {
        fullscreenButton.style.backgroundImage = "url('img/full-screen.png')"; // Cambiar la imagen del botón a 'full-screen'
        document.exitFullscreen();
    } else {
        console.log('El modo de pantalla completa no es soportado por tu navegador.');
    }
});

function startTest(type) {
    taskTimeStart = new Date();
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
        audio.src = `audio/${type}/${index + 1}.wav`;
        audio.controls = true;

        // Iniciar la grabación 2 segundos antes de que termine el audio
        audio.addEventListener('play', () => {
            const remainingTime = audio.duration - audio.currentTime;
            if (remainingTime > 2) {
                setTimeout(() => {
                    startRecording(itemDiv, titleElement, index + 1);
                }, (remainingTime - 2) * 1000); 
            } else {
                startRecording(itemDiv, titleElement, index + 1);
            }
        });

        // Reproducir el beep solo al finalizar el audio
        audio.addEventListener('ended', () => {
            const beep = new Audio('audio/beep.wav');
            beep.play();
        
            // Registrar el tiempo en que suena el beep
            const beepTime = Date.now();
            itemDiv.dataset.beepTime = beepTime; // Guardar en el dataset del elemento
        
            setTimeout(() => {
                playBeepAndShowButtons(itemDiv, titleElement, index + 1);
            }, 600); // Espera 600 milisegundos
        });
        

        // Mostrar el botón "next-button" cuando el audio se cargue completamente
        audio.addEventListener('loadeddata', () => {
            const nextButton = itemDiv.querySelector('.next-button');
            nextButton.classList.remove('hidden');
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
        
            stopImg.src = 'img/detenerr1rojo.png';
        
            const newButton = itemDiv.querySelector('.new-button');
            if (newButton) {
                newButton.style.backgroundImage = "url('img/boton-recnegro.png')";
            }
        });
        

        const nextButton = document.createElement('button');
        nextButton.textContent = '';
        nextButton.classList.add('hidden', 'next-button');
        nextButton.addEventListener('click', () => {
            avanzarSinGrabar(itemDiv, type, index + 1); 
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


function avanzarSinGrabar(itemDiv, type, index) {
    // Verificar si está grabando algo
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        // Detener la grabación y guardar el contenido
        const timerSpan = itemDiv.querySelector('.timer');
        stopRecording(timerSpan, index, itemDiv, type);
    } else {
        // Si no está grabando, avanzar al siguiente ítem
        itemDiv.classList.add('hidden');

        let nextItem = itemDiv.nextElementSibling;
        if (nextItem) {
            nextItem.classList.remove('hidden');
        } else {
            document.getElementById('test-items-' + type).classList.add('hidden');
            mostrarFinalizacion(type);
        }

        console.log(`Avanzando al siguiente ítem sin grabar.`);
    }
}


function playBeepAndShowButtons(itemDiv, titleElement, index) {
    startRecording(itemDiv, titleElement, index);
}

function startRecording(itemDiv, titleElement, index) {
    if (!audioStream) {
        alert('No se puede acceder al micrófono. Por favor, revisa los permisos.');
        return;
    }

    // Detener la grabación actual si está en curso
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop(); // Detenemos la grabación actual
    }

    // Inicializar un nuevo array de chunks para la nueva grabación
    let chunks = [];

    // Crear una nueva instancia de MediaRecorder
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
           
            const nextButton = itemDiv.querySelector('.next-button');
            nextButton.classList.remove('hidden');
        } else {
            console.warn('No se encontraron datos en los chunks.');
        }
    };

    mediaRecorder.onerror = (event) => {
        console.error('Error en la grabación:', event.error);
    };

    // Iniciar la grabación
    mediaRecorder.start();
    recordingStartTime = new Date();


    const stopImg = itemDiv.querySelector('.stop-img');
    stopImg.classList.remove('hidden');

    // Crear y agregar el botón "new-button"
    const newButton = document.createElement('div');
    newButton.classList.add('img-button', 'new-button');
    newButton.style.backgroundImage = "url('img/boton-rec.png')";

    const existingNewButton = itemDiv.querySelector('.new-button');
    if (existingNewButton) {
        existingNewButton.parentNode.removeChild(existingNewButton);
    }
    

    stopImg.parentNode.insertBefore(newButton, stopImg);

    // Mostrar el botón "next-button"
    const nextButton = itemDiv.querySelector('.next-button');
    nextButton.classList.remove('hidden');

    // Iniciar el temporizador
    startTimer(itemDiv.querySelector('.timer'));
}


function stopRecording(timerSpan, index, itemDiv, type) {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        clearInterval(timerInterval);
        updateTimerDisplay(timerSpan, 0);

        // Calcular tiempo desde el beep hasta detener la grabación
        const beepTime = parseInt(itemDiv.dataset.beepTime, 10);
        const stopTime = Date.now();
        const beepToStopTime = stopTime - beepTime; // Tiempo en milisegundos

        // Añadir este tiempo a downloadLinks
        const linkData = downloadLinks.find(link => link.index === index);
        if (linkData) {
            linkData.beepToStopTime = beepToStopTime;
        }

        const nextButton = itemDiv.querySelector('.next-button');
        if (nextButton) {
            nextButton.classList.remove('hidden');
        }

        // Ocultar el botón stopImg al detener la grabación
        const stopImg = itemDiv.querySelector('.stop-img');
        if (stopImg) {
            stopImg.src = 'img/detenerr1rojo.png';
        }

        console.log(`Grabación del ítem ${index} detenida. Puedes avanzar manualmente.`);
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

function mostrarFinalizacion(type) {
    taskTime = (new Date() - taskTimeStart) / 1000;
    console.log("Mostrando mensaje de finalización...");
    const completionMessage = document.getElementById('completion-message');
    completionMessage.classList.remove('hidden');  // Asegúrate de eliminar la clase 'hidden'
    const fin = document.getElementById('fin');
    fin.style.display = 'block';
    finalButton.style.display = 'block';
    document.getElementById('final-button').addEventListener('click', () => {

        crearZip(type);
    });
}

let userInfo;
let initials = "";

fetch('/api/user-info')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener la información del usuario');
        }
        return response.json();
    })
    .then(data => {
        userInfo = data;
        initials = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();

        console.log("Usuario autenticado:", userInfo);

        document.getElementById('final-button').addEventListener('click', () => {
            crearZip(`${type}`);
        });
    })

    .catch(error => console.error('Error:', error));

    function generarCSV(taskTime) {
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return "";
        }
    
        const initials = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();
    
        let csvContent = "";
        csvContent += "Trial;RT;BeepToStopTime;Examinador\n";
    
        downloadLinks.forEach(linkData => {
            if (linkData.title && linkData.duration && linkData.beepToStopTime !== undefined) {
                const row = `${linkData.title};${linkData.duration};${linkData.beepToStopTime};${initials};`;
                csvContent += row + "\n";
            }
        });
    
        return csvContent;
    }

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Obtener el id_participante de la URL
const idParticipante = getQueryParam('id_participante');

function generarCSV2(taskTime) {
    const txtContent = `TotTime;Examinador\n${taskTime.toFixed(3).replace('.', ',')};${initials}\n`;
    
    return new Blob([txtContent], { type: 'text/csv;charset=utf-8' });
}


function crearZip(type) {
    document.getElementById('final-button').style.display = 'none';

    const zip = new JSZip();
    const audioFolder = zip.folder('audios');

    if (!audioFolder) {
        console.error("No se pudo crear la carpeta 'audios' en el archivo ZIP.");
        return;
    }

    if (downloadLinks.length > 0) {
        downloadLinks.forEach(linkData => {
            if (linkData.title && linkData.blob) {
                const fileName = `${type}_${linkData.title}.wav`;
                audioFolder.file(fileName, linkData.blob);
                console.log(`Archivo añadido al ZIP: ${fileName}`);
            } else {
                console.warn("Datos incompletos en linkData:", linkData);
            }
        });
    } else {
        console.log("No hay audios para añadir al ZIP.");
    }

    const csvContent = generarCSV();
    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    console.log("Contenido del CSV:", csvContent);

    const txtBlob = generarCSV2(taskTime);

    const fechaActual = new Date();
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const fechaFormateada = `${day}_${month}_${year}`;

    zip.file(`${idParticipante}_9_Span_Verbal_${type}_${fechaFormateada}.csv`, csvBlob);
    zip.file(`${idParticipante}_9_Span_Verbal_${type}_${fechaFormateada}_TotTime.csv`, txtBlob); // Agregar CSV2


    zip.generateAsync({ type: "blob" })
        .then(content => {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(content);
            downloadLink.download = `${idParticipante}_9_Span_Verbal_${type}_${fechaFormateada}.zip`;
            downloadLink.textContent = 'Descargar todas las grabaciones';
            document.body.appendChild(downloadLink);

            downloadLink.click();
            document.body.removeChild(downloadLink);
            setTimeout(() => {
                window.close();
            }, 100);

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
