document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen3');
    const finishScreen = document.getElementById('finishScreen');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const startButton = document.getElementById('startButton');
    const audioContainer = document.getElementById('audio-container');
    const audioItems = document.querySelectorAll('.audio-item');
    const NXButton = document.getElementById('nxbutton');
    const DownloadButton = document.getElementById('download');
    const selectHand = document.getElementById('selectHand')

    let answers = {};
    let currentAudioIndex = 0;
    let startTime = new Date();  // Guardar la hora de inicio automáticamente al cargar la página
    let finishTime;
    let audioEndTimes = {};
    let lastOptionPointerEventTime = 0;
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();

    const correctAnswers = {
        1: 'si', 2: 'no', 3: 'si', 4: 'no', 5: 'no', 6: 'no', 7: 'si', 8: 'si', 9: 'si', 10: 'no', 11: 'no', 12: 'si',
        13: 'si', 14: 'no', 15: 'si', 16: 'no', 17: 'si', 18: 'no', 19: 'no', 20: 'si', 21: 'no', 22: 'si', 23: 'si', 24: 'no'
    };

    const words = {
        1: 'TENIS', 2: 'voleibol', 3: 'PROFESOR', 4: 'espinaca', 5: 'abogado', 6: 'submarino', 7: 'GOLF', 8: 'DENTISTA', 9: 'LECHUGA',
        10: 'araña', 11: 'agua', 12: 'FRIJOL', 13: 'BALONCESTO', 14: 'doctor', 15: 'MAIZ', 16: 'béisbol', 17: 'MAESTRO', 18: 'culebra',
        19: 'zanahoria', 20: 'INGENIERO', 21: 'guante', 22: 'FUTBOL', 23: 'PAPA', 24: 'tulipán'
    };

    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenEnabled && !document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('minimize.png')"; // Cambiar la imagen del botón a 'minimize'
            document.documentElement.requestFullscreen();
        } else if (document.fullscreenElement) {
            fullscreenButton.style.backgroundImage = "url('full-screen.png')"; // Cambiar la imagen del botón a 'full-screen'
            document.exitFullscreen();
        } else {
            console.log('El modo de pantalla completa no es soportado por tu navegador.');
        }
    });

    console.log(`${startTime}`);

    startButton.addEventListener('click', () => {
        pauseAudios();
        mainScreen.style.display = 'none';
        audioContainer.style.display = 'block';
        NXButton.style.display = 'none';

        // ✅ Asegura que solo el primer audio se vea
        audioItems.forEach((item, i) => item.style.display = (i === 0 ? 'block' : 'none'));
        currentAudioIndex = 0;

        // ✅ Botones del audio 1 ocultos mientras suena
        setOptionButtonsVisible(1, false);
    });

    audioItems.forEach((audioItem) => {
        const audioElement = audioItem.querySelector('audio');
        const idx = parseInt(
            audioElement.dataset.audio ||
            audioElement.getAttribute('data-audio') ||
            audioElement.dataset.index ||
            audioElement.getAttribute('data-index'),
            10
        );

        const audioIndex = Number.isFinite(idx)
            ? idx
            : ([...audioItems].indexOf(audioItem) + 1);

        audioElement.addEventListener('play', () => {
            NXButton.style.display = 'block';
        });

        audioElement.addEventListener('ended', () => {
            audioEndTimes[audioIndex] = new Date();

            // ✅ hacer visibles y habilitar
            document
                .querySelectorAll(`.option-btn[data-audio="${audioIndex}"]`)
                .forEach(btn => {
                    btn.style.display = 'inline-block'; // ✅ visibles al terminar audio
                    btn.disabled = false;
                    btn.classList.remove('disabled');
                });
        });

    });


    NXButton.addEventListener('click', () => {
        pauseAudios();
        NXButton.style.display = 'none';

        // 🔹 DESHABILITAR BOTONES DEL AUDIO ACTUAL
        const currentIndexForButtons = currentAudioIndex + 1; // Ojo: depende de cómo numeraste data-audio
        if (!answers[currentIndexForButtons]?.answer) {
            NXButton.style.display = 'block';
            return;
        }

        document
            .querySelectorAll(`.option-btn[data-audio="${currentIndexForButtons}"]`)
            .forEach(btn => {
                btn.disabled = true;
                btn.classList.add('disabled');
            });

        // Ocultar el audio actual
        audioItems[currentAudioIndex].style.display = 'none';

        // Avanzar al siguiente audio
        currentAudioIndex++;

        if (currentAudioIndex < audioItems.length) {
            const nextAudioIndexForButtons = currentAudioIndex + 1;

            // ✅ ocultar botones del audio que viene (mientras suena)
            setOptionButtonsVisible(nextAudioIndexForButtons, false);
            audioItems[currentAudioIndex].style.display = 'block';
        } else {
            audioContainer.style.display = 'none';
            selectHand.style.display = 'inline-block';
            finishScreen.style.display = 'block';

            finishTime = new Date();
            console.log(`${finishTime}`);
        }
    });


    const handInputs = document.getElementsByName('hand');

    handInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            DownloadButton.style.display = 'block';
        });
    });

    DownloadButton.addEventListener('click', () => {
        downloadZip();
    });



    const optionButtons = document.querySelectorAll('.option-btn');

    optionButtons.forEach(button => {
        button.disabled = true;
        button.classList.add('disabled');
        button.style.display = 'none'; // ✅ ocultos al inicio

        const saveAnswer = (e) => {
            if (button.disabled) return;

            const btn = e.currentTarget;
            const audioIndex = parseInt(btn.dataset.audio, 10);
            const answer = btn.dataset.answer;
            const responseTime = new Date();

            let RT = '';
            if (audioEndTimes[audioIndex] instanceof Date) {
                const diffMs = responseTime - audioEndTimes[audioIndex];
                if (diffMs >= 0) RT = (diffMs / 1000).toFixed(3).replace('.', ',');
            }

            answers[audioIndex] = { answer, RT };

            document.querySelectorAll(`.option-btn[data-audio="${audioIndex}"]`).forEach(b => {
                b.disabled = true;
                b.classList.add('disabled');
                b.classList.toggle('selected-answer', b === btn);
                // (opcional) podrías ocultarlos tras responder:
                // b.style.display = 'none';
            });

        };

        button.addEventListener('pointerup', (e) => {
            lastOptionPointerEventTime = Date.now();
            saveAnswer(e);
        }, false);

        button.addEventListener('click', (e) => {
            if (Date.now() - lastOptionPointerEventTime < 500) return;
            saveAnswer(e);
        });
    });


    function setOptionButtonsVisible(audioIndex, visible) {
        document
            .querySelectorAll(`.option-btn[data-audio="${audioIndex}"]`)
            .forEach(btn => {
                btn.style.display = visible ? 'inline-block' : 'none';
                btn.classList.remove('selected-answer');
            });
    }

    function hideAllOptionButtons() {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.display = 'none';
        });
    }


    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Obtener el id_participante de la URL
    const idParticipante = getQueryParam('id_participante');

    let userInfo;

    fetch('/api/user-info')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la información del usuario');
            }
            return response.json();
        })
        .then(data => {
            userInfo = data; // Asignar los datos al objeto global
            console.log("Usuario autenticado:", userInfo);
        })
        .catch(error => {
            console.error('Error al obtener la información del usuario:', error);
        });


    function createCSV() {
        if (!userInfo || !userInfo.name || !userInfo.last_name) {
            console.error("Error: userInfo no está definido correctamente.");
            return;
        }

        const inicialesExaminador = userInfo?.initials || `${userInfo?.name || ""} ${userInfo?.last_name || ""}`.trim().split(/\s+/).filter(Boolean).map(part => part.charAt(0).toUpperCase()).join("") || "EX";
        const total = Object.keys(correctAnswers).length;

        let mainCsvContent = 'Trial;Word;CorrResp;PartResp;RT;Acc\n';

        for (let i = 1; i <= total; i++) {
            const word = words[i];
            const correctAnswer = (correctAnswers[i] || '').toString().trim();     // 'si' | 'no'
            const participantAnswer = (answers[i]?.answer || '').toString().trim(); // '' | 'si' | 'no'

            // RT: ya lo guardamos como string "x,xxx" arriba; si no está, dejar vacío
            const RT = (answers[i]?.RT ?? '');

            // Acc: vacío si no hubo respuesta; si hubo, 1/0
            let Acc = '';
            if (participantAnswer !== '') {
                Acc = (participantAnswer === correctAnswer) ? 1 : 0;
            }

            mainCsvContent += `${i};${word};${correctAnswer};${participantAnswer};${RT};${Acc}\n`;
        }

        let selectedHandElement = document.querySelector('input[name="hand"]:checked');
        let selectedHand = selectedHandElement ? selectedHandElement.value : 'No seleccionado';

        const endTime = new Date();
        const timeSpentInSeconds = (endTime - startTime) / 1000;
        const timeSpentFormatted = timeSpentInSeconds.toFixed(3).replace('.', ',');

        let additionalCsvContent = 'Hand;TotTime;Iniciales Examinador\n';
        additionalCsvContent += `${selectedHand};${timeSpentFormatted};${inicialesExaminador}\n`;

        return { mainCsvContent, additionalCsvContent };
    }

    let diaStr = dia.toString().padStart(2, '0');
    let mesStr = mes.toString().padStart(2, '0');
    let añoStr = año.toString().padStart(4, '0');
    let fechaStr = `${diaStr}${mesStr}${añoStr.slice(-2)}`;

    function downloadZip() {
        if (typeof JSZip === 'undefined') {
            console.error('JSZip is not loaded.');
            return;
        }

        const zip = new JSZip();

        const { mainCsvContent, additionalCsvContent } = createCSV();
        // Agregar los archivos CSV al ZIP
        const inicialesExaminador = userInfo?.initials || `${userInfo?.name || ""} ${userInfo?.last_name || ""}`.trim().split(/\s+/).filter(Boolean).map(part => part.charAt(0).toUpperCase()).join("") || "EX";
        zip.file(`${idParticipante}_HVLT-R_recog.csv`, mainCsvContent);
        zip.file(`${idParticipante}_HVLT-R_recog_unival.csv`, additionalCsvContent);
        // // Agregar el archivo CSV al zip
        // const csvContent = createCSV();
        // zip.file('HVLT-R_Reconocimiento_.csv', csvContent);

        // Generar y descargar el zip
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = `${idParticipante}_HVLT_recog_${fechaStr}_${inicialesExaminador}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => {
                window.close();
            }, 3000);

        });

    }

    function pauseAudios() {
        document.getElementById('audio1_ejercicio3').pause();
        document.getElementById('audio1').pause();
        document.getElementById('audio2').pause();
        document.getElementById('audio3').pause();
        document.getElementById('audio4').pause();
        document.getElementById('audio5').pause();
        document.getElementById('audio6').pause();
        document.getElementById('audio7').pause();
        document.getElementById('audio8').pause();
        document.getElementById('audio9').pause();
        document.getElementById('audio10').pause();
        document.getElementById('audio11').pause();
        document.getElementById('audio12').pause();
        document.getElementById('audio13').pause();
        document.getElementById('audio14').pause();
        document.getElementById('audio15').pause();
        document.getElementById('audio16').pause();
        document.getElementById('audio17').pause();
        document.getElementById('audio18').pause();
        document.getElementById('audio19').pause();
        document.getElementById('audio20').pause();
        document.getElementById('audio21').pause();
        document.getElementById('audio22').pause();
        document.getElementById('audio23').pause();
        document.getElementById('audio24').pause();
    }

});
