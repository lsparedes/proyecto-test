const startRecordingButton = document.getElementById('startRecording');
const stopRecordingButton = document.getElementById('stopRecording');
const audioPlayer = document.getElementById('player');

let mediaRecorder;
let audioChunks = [];
let audioContext;
let destination;
let micStream;
let audioElementStream;
let combinedStream;

startRecordingButton.addEventListener('click', async () => {
    // 1. Captura el audio del micrófono
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // 2. Carga y reproduce un archivo .wav
    const audio = new Audio('beep.wav');  // Reemplaza con tu archivo .wav
    audio.crossOrigin = "anonymous";  // Si es necesario para evitar problemas de CORS
    audio.play();

    // 3. Configura el contexto de audio para combinar los flujos
    audioContext = new AudioContext();

    // Crea un nodo de destino donde se mezclan los audios
    destination = audioContext.createMediaStreamDestination();

    // Conecta el micrófono al contexto de audio
    const micSource = audioContext.createMediaStreamSource(micStream);
    micSource.connect(destination);

    // Crea un nodo para el audio del archivo .wav
    const audioElementSource = audioContext.createMediaElementSource(audio);
    audioElementSource.connect(audioContext.destination);  // Para que suene en la página
    audioElementSource.connect(destination);  // Para que se grabe

    // 4. Combina ambos flujos de audio
    combinedStream = destination.stream;

    // 5. Graba el audio combinado
    mediaRecorder = new MediaRecorder(combinedStream);
    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.start();
});

stopRecordingButton.addEventListener('click', () => {
    // Detén la grabación
    mediaRecorder.stop();

    // Cuando la grabación se haya detenido
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlayer.src = audioUrl;
        audioPlayer.play();
    };

    // Limpia el contexto de audio
    audioContext.close();
});
