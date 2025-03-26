document.addEventListener('DOMContentLoaded', () => {
  const instructions = document.getElementById('instructions');
  const instructionsText = document.getElementById('instructionsText');
  const instructionsAudio = document.getElementById('instructionsAudio');
  const instructionsAudioB = document.getElementById('instructionsAudioB');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const practiceContainer = document.getElementById('practiceContainer');
  const practiceFinishScreen = document.getElementById('practiceFinishScreen');
  const demoFinishScreen = document.getElementById('demoFinishScreen');
  const questionScreen = document.getElementById('questionScreen');
  const feedbackScreen = document.getElementById('feedbackScreen');
  const confidenceScreen = document.getElementById('confidenceScreen');
  const testContainer = document.getElementById('testContainer');
  const blockFinishScreen = document.getElementById('blockFinishScreen');
  const endScreen = document.getElementById('endScreen');

  const sliderPractice = document.getElementById('sliderPractice');
  const confidenceSliderPractice = document.getElementById('confidenceSliderPractice');
  const submitConfidenceButtonPractice = document.getElementById('submitConfidenceButtonPractice');

  const practiceCanvas = document.getElementById('practiceCanvas');
  const testCanvas = document.getElementById('testCanvas');
  const practiceCtx = practiceCanvas.getContext('2d');
  const testCtx = testCanvas.getContext('2d');

  const practiceTrialIndicator = document.getElementById('practiceTrialIndicator');
  const testTrialIndicator = document.getElementById('testTrialIndicator');
  const feedbackMessage = document.getElementById('feedbackMessage');
  const cronometro = document.getElementById('pauseTime');
  const pauseButtonP = document.getElementById('iniciarPausaP');
  const pauseButton = document.getElementById('iniciarPausa');
  const confidenceSlider = document.getElementById('confidenceSlider');
  const submitConfidenceButton = document.getElementById('submitConfidenceButton');

  let trialCount = 0;
  let blockCount = 1;
  let maxTrials = 2;
  let maxBlocks = 2;
  let maxTime = 180; // 3 minutes for practice block, 3.5 minutes for test blocks
  let trialTimeout;
  let trialInTimeout = false;
  let blockTimeout;
  let correctColor;
  let lastColorAnswer;
  let results = [];
  let pauseStartTime;
  let instructionsPhase = 0;
  let blockType = 'demo';
  let RedDotSide = "izquierda";

  let diferenciaInicial = 15;
  let ajusteDificultad = 1;
  let diferenciaAjustada = 0;
  let correctStreak = 0; // Variable global para contar respuestas correctas consecutivas
  let startTimeTotal = new Date();
  let startTime;
  let timeColor;
  let timeConfidence;

  function startDemoScreen() {
    practiceContainer.style.display = 'block';
    practiceCtx.clearRect(0, 0, practiceCtx.canvas.width, practiceCtx.canvas.height);
    generateDots(practiceCtx);
    practiceTrialIndicator.innerText = `P1`;
    const demoButton = document.getElementById('demoButton');
    demoButton.style.display = 'none';

    setTimeout(() => {
      demoButton.click();
    }, 3000);
  }

  function endDemoScreen() {
    practiceContainer.style.display = 'none';
    questionScreen.style.display = 'none';
    confidenceScreen.style.display = 'none';
    demoFinishScreen.style.display = 'block';
    document.getElementById('restartPracticeButton').style.display = 'none';
    blockType = 'practica';
  }

  function startPracticeBlock() {
    trialCount = 0;
    // blockCount = 0;
    maxTime = 180;
    blockType = 'practica';
    startBlock(practiceCtx, 'practica');
  }

  function startTestBlock() {
    trialCount = 0;
    blockCount++;
    maxTime = 210;
    blockType = 'test';
    startBlock(testCtx, 'test');
  }

  function startBlock(ctx, type) {
    clearTimeout(blockTimeout);
    trialInTimeout = false;
    blockTimeout = setTimeout(() => {
      // endBlock(type);
      trialInTimeout = true;
    }, maxTime * 1000);

    startTrial(ctx, type);
  }

  function endBlock(type) {
    clearTimeout(trialTimeout);
    // Completa los resultados faltantes con "no respondida"
    for (let i = trialCount + 1; i <= maxTrials; i++) {
      results.push({ block: blockCount, trial: i, correctColor: "N/A", answer: "", confidence: "N/A", isCorrect: false, diferencia: "N/A", timeCol: "N/A", timeConf: "N/A", timeP: "N/A" });
    }
    if (type === 'practica') {
      practiceContainer.style.display = 'none';
      questionScreen.style.display = 'none';
      confidenceScreen.style.display = 'none';
      practiceFinishScreen.style.display = 'block';
      pauseButtonP.style.display = 'inline-block';
      blockType = 'test';
    } else {
      document.getElementById('textoPausa').innerHTML = `¡Bloque Completado!`;
      testContainer.style.display = 'none';
      questionScreen.style.display = 'none';
      confidenceScreen.style.display = 'none';
      if (blockCount < maxBlocks) {
        blockFinishScreen.style.display = 'block';
        pauseButton.style.display = 'inline-block';
      } else {
        showHandSelection();
      }
    }
  }

  function endGame() {
    endScreen.style.display = 'block';
    document.getElementById('downloadResultsButton').click();
  }

  function startTrial(ctx, type) {
    trialCount++;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    generateDots(ctx);
    updateTrialIndicator(type);
    if (type === 'practica') {
      practiceContainer.style.display = 'block';
    } else {
      testContainer.style.display = 'block';
    }
    trialTimeout = setTimeout(() => {
      startTime = new Date();
      if (type === 'practica') {
        practiceContainer.style.display = 'none';
      } else {
        testContainer.style.display = 'none';
      }
      questionScreen.style.display = 'block';
    }, 3000);
  }

  function updateTrialIndicator(type) {
    if (type === 'practica') {
      practiceTrialIndicator.innerText = `E${trialCount}`;
    } else {
      testTrialIndicator.innerText = `E${trialCount}`;
    }
  }

  function ajustarDificultad(respuesta) {
    if (respuesta === true) { // Respuesta correcta
      correctStreak++;
      if (correctStreak >= 2) { // Aumenta la dificultad si hay 2 respuestas correctas consecutivas
        if (diferenciaAjustada < 7) {
          diferenciaAjustada += 1;
          diferenciaInicial -= 2;
        }
        correctStreak = 0; // Reinicia el contador después de aumentar la dificultad
      }
    } else { // Respuesta incorrecta
      if (diferenciaAjustada > -24) {
        diferenciaAjustada -= 1;
        diferenciaInicial += 2;
      }
      correctStreak = 0; // Reinicia el contador
    }
  }

  function generateDots(ctx) {
    const totalDots = 65;
    let numPuntosMayor = 40 - diferenciaAjustada;
    let numPuntosMenor = totalDots - numPuntosMayor;
    const colors = [];
    let colorMayor = Math.random() < 0.5 ? 'red' : 'blue';


    if (colorMayor === 'red') {
      RedDotSide = "izquierda"; // Rojo a la izquierda
      for (let i = 0; i < numPuntosMayor; i++) {
        colors.push('red');
      }
      for (let i = 0; i < numPuntosMenor; i++) {
        colors.push('blue');
      }
    } else {
      RedDotSide = "derecha"; // Rojo a la derecha
      for (let i = 0; i < numPuntosMayor; i++) {
        colors.push('blue');
      }
      for (let i = 0; i < numPuntosMenor; i++) {
        colors.push('red');
      }
    }

    let numRedDots = 0;
    let numBlueDots = 0;

    if (colorMayor === 'red') {
      numRedDots = numPuntosMayor;
      numBlueDots = numPuntosMenor;
    } else {
      numRedDots = numPuntosMenor;
      numBlueDots = numPuntosMayor;
    }

    const dots = [];
    const dotRadius = 5;
    const minDistance = dotRadius * 8;

    for (let i = 0; i < totalDots; i++) {
      let x, y, validPosition;
      do {
        x = Math.random() * (ctx.canvas.width - 2 * dotRadius) + dotRadius;
        y = Math.random() * (ctx.canvas.height - 2 * dotRadius) + dotRadius;
        validPosition = true;
        for (const dot of dots) {
          const distance = Math.sqrt((x - dot.x) ** 2 + (y - dot.y) ** 2);
          if (distance < minDistance) {
            validPosition = false;
            break;
          }
        }
      } while (!validPosition);
      dots.push({ x, y, color: colors[i] });
      ctx.beginPath();
      ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = colors[i];
      ctx.fill();
    }

    correctColor = numRedDots > numBlueDots ? 'Rojo' : 'Azul';
    console.log(`Correct color is ${correctColor}. Rojo: ${numRedDots}, Azul: ${numBlueDots}, diferencia: ${diferenciaInicial}, puntos mayor: ${numPuntosMayor}, puntos menor: ${numPuntosMenor}`);
  }

  function recordAnswer(answer) {
    const isCorrect = answer === correctColor;
    const confidence = confidenceSlider.value;
    const timeColFormatted = (timeColor / 1000).toFixed(3).replace('.', ',');
    const timeConfFormatted = (timeConfidence / 1000).toFixed(3).replace('.', ',');
    results.push({ block: blockCount, trial: trialCount, correctColor, answer, confidence, isCorrect, diferencia: diferenciaInicial, timeCol: timeColFormatted, timeConf: timeConfFormatted, timeP: 'N/A' });
    ajustarDificultad(isCorrect);
  }

  function showFeedback(answer) {
    const lastResult = results[results.length - 1];
    const isCorrect = lastResult.isCorrect;
    feedbackMessage.innerText = isCorrect ? "" : "";
    feedbackScreen.style.display = 'block';
    setTimeout(() => {
      feedbackScreen.style.display = 'none';
      if (trialCount < maxTrials && !trialInTimeout) {
        if (blockType === 'practica') {
          startTrial(practiceCtx, 'practica');
        } else {
          startTrial(testCtx, 'test');
        }
      } else {
        if (blockType === 'practica') {
          endBlock('practica');
        } else {
          endBlock('test');
        }
      }
    }, 500);
  }

  document.getElementById('startDemoButton').addEventListener('click', () => {
    if (instructionsPhase === 0) {
      var audioContainer = instructionsAudio.parentNode;
      var audioContainerB = instructionsAudioB.parentNode;
      audioContainerB.style.display = 'block';
      audioContainer.pause();
      audioContainerB.pause();
      instructionsText.innerHTML = 'A lo largo de la tarea se utiliza una \
      escala de calificación como la que se muestra aquí. Podrá calificar cuan seguro esta de sus decisiones posicionando \
      el cursor en distintas partes de esta escala. <br>\
      Si usted está muy seguro(a) de haber tomado la decisión correcta, debería mover el cursor a la posición <b>TOTALMENTE SEGURO</b>.<br>\
      Si usted está muy inseguro(a) de haber tomado la decisión correcta, debería mover el cursor a la posición <b>TOTALMENTE INSEGURO</b>.<br>\
      Una posición intermedia en la escala indica que usted no está ni completamente seguro(a) ni completamente inseguro(a) de haber tomado la decisión correcta.<br>\
      Por favor, mueva el cursor a la posición deseada en la escala y presione <b>LISTO</b> para continuar.';
      instructionsText.style.fontSize = '24px';
      instructionsPhase++;
      fullscreenButton.style.display = 'none';
      document.getElementById('startDemoButton').style.display = 'block';
      sliderPractice.style.display = 'block';
      instructionsAudio.src = 'audios/2_femenino.wav'
      instructionsAudioB.src = 'audios/2_masculino.wav'
      audioContainer.load();
      audioContainerB.load();
    } else if (instructionsPhase === 1) {
      var audioContainer = instructionsAudio.parentNode;
      var audioContainerB = instructionsAudioB.parentNode;
      audioContainer.pause();
      audioContainerB.pause();
      document.getElementById('startDemoButton').style.display = 'block';
      sliderPractice.style.display = 'none';
      instructionsText.style.fontSize = '37px';
      instructionsText.innerHTML = 'Ahora usted realizará una ronda de práctica. Por favor, indique si el recuadro contiene más puntos de color rojo o azul.<br>\
      Posteriormente mueva el cursor a lo largo de la escala de calificación para expresar que tan seguro(a) o inseguro(a) se siente acerca de su decisión y presione <b>LISTO</b> para continuar.<br>';
      instructionsPhase++;
      instructionsAudio.src = 'audios/3_femenino.wav'
      instructionsAudioB.src = 'audios/3_masculino.wav'
      audioContainer.load();
      audioContainerB.load();
    } else {
      var audioContainer = instructionsAudio.parentNode;
      audioContainer.pause();
      instructions.style.display = 'none';
      startDemoScreen();
    }
  });

  document.getElementById('nextDemoButton').addEventListener('click', () => {
    demoFinishScreen.style.display = 'none';
    document.getElementById('instructionsAudio2').pause();
    startPracticeBlock();
  });

  document.getElementById('nextPracticeButton').addEventListener('click', () => {
    pausarCronometro();
    const pauseTime = (Date.now() - pauseStartTime) / 1000;
    results.push({ block: blockCount, trial: 'pausa', correctColor: 'N/A', answer: 'N/A', confidence: 'N/A', isCorrect: 'N/A', diferencia: 'N/A', timeCol: 'N/A', timeConf: 'N/A', timeP: `${pauseTime} segundos` });
    practiceFinishScreen.style.display = 'none';
    // blockCount = 1;
    startTestBlock();
  });

  document.getElementById('restartPracticeButton').addEventListener('click', () => {
    if (blockType === 'demo') {
      practiceCtx.clearRect(0, 0, practiceCtx.canvas.width, practiceCtx.canvas.height);
      generateDots(practiceCtx);
    } else if (blockType === 'practica') {
      practiceContainer.style.display = 'none';
      practiceFinishScreen.style.display = 'none';
      questionScreen.style.display = 'none';
      feedbackScreen.style.display = 'none';
      confidenceScreen.style.display = 'none';
      trialCount = 0;
      startPracticeBlock();
    }
  });

  document.getElementById('redContainer').addEventListener('click', () => {
    questionScreen.style.display = 'none';
    confidenceScreen.style.display = 'block';
    if (blockType === 'practica' || blockType === 'test') {
      lastColorAnswer = 'Rojo';
      timeColor = new Date() - startTime;
      startTime = new Date();
      document.getElementById('resetDemoButton').style.display = 'none';
    } else {
      document.getElementById('demoButton2').style.display = 'block';
    }
    resetConfidenceSlider();
  });

  document.getElementById('blueContainer').addEventListener('click', () => {
    questionScreen.style.display = 'none';
    confidenceScreen.style.display = 'block';
    if (blockType === 'practica' || blockType === 'test') {
      lastColorAnswer = 'Azul';
      timeColor = new Date() - startTime;
      startTime = new Date();
      document.getElementById('resetDemoButton').style.display = 'none';
    } else {
      document.getElementById('demoButton2').style.display = 'block';
    }
    resetConfidenceSlider();
  });

  function resetConfidenceSlider() {
    confidenceSlider.value = 0;
    submitConfidenceButton.disabled = true;
    submitConfidenceButton.classList.remove('btn-primary');
  }

  confidenceSlider.addEventListener('input', () => {
    submitConfidenceButton.disabled = false;
    submitConfidenceButton.classList.remove('btn-light');
    submitConfidenceButton.classList.add('btn-primary');
  });

  document.getElementById('submitConfidenceButton').addEventListener('click', () => {
    confidenceScreen.style.display = 'none';
    document.getElementById('demoButton2').style.display = 'none';
    if (blockType === 'demo') {
      endDemoScreen();
    } else {
      timeConfidence = new Date() - startTime;
      recordAnswer(lastColorAnswer);
      const lastResult = results[results.length - 1];
      showFeedback(lastResult.answer);
    }
  });

  confidenceSliderPractice.addEventListener('input', () => {
    submitConfidenceButtonPractice.disabled = false;
    submitConfidenceButtonPractice.classList.remove('btn-light');
    submitConfidenceButtonPractice.classList.add('btn-primary');
  });

  document.getElementById('submitConfidenceButtonPractice').addEventListener('click', () => {
    document.getElementById('startDemoButton').click();
  });

  document.getElementById('continueToNextBlockButton').addEventListener('click', () => {
    pausarCronometro();
    const pauseTime = (Date.now() - pauseStartTime) / 1000;
    results.push({ block: blockCount, trial: 'pausa', correctColor: 'N/A', answer: 'N/A', confidence: 'N/A', isCorrect: 'N/A', diferencia: 'N/A', timeCol: 'N/A', timeConf: 'N/A', timeP: `${pauseTime} segundos` });
    blockFinishScreen.style.display = 'none';
    if (blockCount < maxBlocks) {
      startTestBlock();
    } else {
      endScreen.style.display = 'block';
    }
  });

  let tiempo = 0;
  let intervalo;
  let pausado = true;

  function actualizarCronometro() {
    const horas = Math.floor(tiempo / 3600);
    const minutos = Math.floor((tiempo % 3600) / 60);
    const segundos = tiempo % 60;

    const tiempoFormateado =
      `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    // Mostrar el tiempo en el cronometro en pantalla
    cronometro.textContent = tiempoFormateado;
    // Mostrar el tiempo en la consola
    console.log(tiempoFormateado);
    document.getElementById('textoPausaP').innerHTML = tiempoFormateado;
    document.getElementById('textoPausa').innerHTML = tiempoFormateado;
  }

  function iniciarCronometro() {
    // cronometro.style.display = 'block';
    if (pausado) {
      pausado = false;
      intervalo = setInterval(() => {
        tiempo++;
        actualizarCronometro();
      }, 1000);
    }
  }

  function pausarCronometro() {
    // cronometro.style.display = 'none';
    if (!pausado) {
      pausado = true;
      clearInterval(intervalo);
    }
  }

  function reiniciarCronometro() {
    pausado = true;
    clearInterval(intervalo);
    tiempo = 0;
    actualizarCronometro();
  }

  document.getElementById('demoButton').addEventListener('click', () => {
    practiceContainer.style.display = 'none';
    document.getElementById('demoButton').style.display = 'none';
    questionScreen.style.display = 'block';
  });

  document.getElementById('demoButton2').addEventListener('click', () => {
    document.getElementById('demoButton2').style.display = 'none';
    endDemoScreen();
  });

  document.getElementById('resetDemoButton').addEventListener('click', () => {
    confidenceScreen.style.display = 'none';
    document.getElementById('demoButton2').style.display = 'none';
    resetConfidenceSlider();
    startDemoScreen();
  });

  document.getElementById('downloadResultsButton').addEventListener('click', () => {
    downloadResultsAsZip(results, startTimeTotal, selectedHand);
  });

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
  pauseButtonP.addEventListener('click', () => {
    reiniciarCronometro();
    iniciarCronometro();
    pauseStartTime = Date.now();
    pauseButtonP.style.display = 'none';
  });

  pauseButton.addEventListener('click', () => {
    reiniciarCronometro();
    iniciarCronometro();
    pauseStartTime = Date.now();
    pauseButton.style.display = 'none';
  });

  // SELECCION DE MANO JS

  const selectHandContainer = document.getElementById("selectHand");
  const handButton = document.getElementById("handButton");
  const handInputs = document.getElementsByName('hand');

  // Variable con la mano seleccionada
  let selectedHand = "";

  // Funcion para mostrar la pantalla de seleccion de mano
  function showHandSelection() {
    document.getElementById("preEnd").style.display = 'block';
    selectHandContainer.style.display = "block";
  }

  // Funcion unida al boton de flecha para hacer la seleccion, debe llevar a la funcion de termino.
  // En este caso fue mostrarFinalizacion()
  function confirmHandSelection() {
    document.getElementById("preEnd").style.display = 'none';
    selectHandContainer.style.display = "none";
    endGame();
  }

  // Se asigna el valor seleccionado a la variable selectedHand para su uso en csv
  handInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
      validateInputs();
      selectedHand = e.target.value;
    });
  });


  document.getElementById('handButton').addEventListener('click', confirmHandSelection);

  function validateInputs() {
    selectedHand = document.querySelector('input[name="hand"]:checked')?.value;

    if (selectedHand) {
      handButton.style.display = 'block';
    }
  }

  window.confirmHandSelection = confirmHandSelection;

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Obtener el id_participante de la URL
  const idParticipante = getQueryParam('id_participante');

  function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}_${month}_${year}`;
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
      userInfo = data; // Asignar los datos al objeto global
      console.log("Usuario autenticado:", userInfo);
    })
    .catch(error => {
      console.error('Error al obtener la información del usuario:', error);
    });


    function generateCSV(results) {
      // Asegurarse de que userInfo esté disponible
      if (!userInfo || !userInfo.name || !userInfo.last_name) {
          console.error("Error: userInfo no está definido correctamente.");
          return; // Salir si userInfo no está disponible
      }
  
      // Obtener las iniciales del examinador
      const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();
  
      // Definir los encabezados del CSV
      const csvData = [["Block", "Trial", "CorrResp", "PartResp", "ConfRa", "Acc", "DiffLvl", "RTDecision", "RTConfRa", "PauseTime", "RedDotSide", "Examinador"]]; // Agregar columna Examinador
  
      // Recorrer los resultados y agregar los datos junto con las iniciales del examinador
      results.forEach((e) => {
          const isCorrect = e.isCorrect === 'N/A' ? 'N/A' : (e.isCorrect ? '1' : '0');
          const redDotSide = e.RedDotSide || ''; // Asegúrate de que la variable esté correctamente definida si es necesario
  
          // Agregar los datos de la prueba junto con las iniciales del examinador
          csvData.push([e.block, e.trial, e.correctColor, e.answer, e.confidence, isCorrect, e.diferencia, e.timeCol, e.timeConf, e.timeP, redDotSide, inicialesExaminador]);
      });
  
      // Crear el contenido del CSV
      const csvContent = csvData.map(row => row.join(';')).join('\n');
  
      // Retornar el archivo CSV con el nombre adecuado
      return {
          content: csvContent,
          filename: `${idParticipante}_15_Discriminacion_Perceptua_${getCurrentDate()}.csv`
      };
  }
  
  function generateCSV2(startTimeTotal, selectedHand) {
      // Asegurarse de que userInfo esté disponible
      if (!userInfo || !userInfo.name || !userInfo.last_name) {
          console.error("Error: userInfo no está definido correctamente.");
          return; // Salir si userInfo no está disponible
      }
  
      // Obtener las iniciales del examinador
      const inicialesExaminador = userInfo.name[0].toUpperCase() + userInfo.last_name[0].toUpperCase();
  
      // Crear el contenido del archivo de métricas
      const totalTime = ((new Date() - startTimeTotal) / 1000).toFixed(3).replace('.', ',');

      const txtContent = [
          ["TotTime", "Hand", "Examinador"],
          [totalTime, selectedHand, inicialesExaminador]
      ].map(row => row.join(';')).join('\n');
  
      // Retornar el archivo de métricas con el nombre adecuado
      return {
          content: txtContent,
          filename: `${idParticipante}_15_Discriminacion_Perceptua_Metricas_${getCurrentDate()}.csv`
      };
  }
  

  async function downloadZip(csvFile, txtFile) {
    const zip = new JSZip();
    zip.file(csvFile.filename, csvFile.content);
    zip.file(txtFile.filename, txtFile.content);

    const zipContent = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipContent);
    link.setAttribute("download", `${idParticipante}_15_Discriminacion_Perceptua_${getCurrentDate()}.zip`);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.close();
  }, 3000);
  }

  async function downloadResultsAsZip(results, startTimeTotal, selectedHand) {
    const csvFile = generateCSV(results);
    const txtFile = generateCSV2(startTimeTotal, selectedHand);
    await downloadZip(csvFile, txtFile);
  }
});
