document.addEventListener('DOMContentLoaded', () => {
    const instructions = document.getElementById('instructions');
    const practiceContainer = document.getElementById('practiceContainer');
    const practiceFinishScreen = document.getElementById('practiceFinishScreen');
    const questionScreen = document.getElementById('questionScreen');
    const feedbackScreen = document.getElementById('feedbackScreen');
    const confidenceScreen = document.getElementById('confidenceScreen');
    const testContainer = document.getElementById('testContainer');
    const blockFinishScreen = document.getElementById('blockFinishScreen');
    const endScreen = document.getElementById('endScreen');
  
    const practiceCanvas = document.getElementById('practiceCanvas');
    const testCanvas = document.getElementById('testCanvas');
    const practiceCtx = practiceCanvas.getContext('2d');
    const testCtx = testCanvas.getContext('2d');
  
    const practiceTrialIndicator = document.getElementById('practiceTrialIndicator');
    const testTrialIndicator = document.getElementById('testTrialIndicator');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const pauseTimeDisplay = document.getElementById('pauseTime');
    const confidenceSlider = document.getElementById('confidenceSlider');
    const submitConfidenceButton = document.getElementById('submitConfidenceButton');
  
    let trialCount = 0;
    let blockCount = 0;
    let maxTrials = 20;
    let maxBlocks = 3;
    let maxTime = 180; // 3 minutes for practice block, 3.5 minutes for test blocks
    let trialTimeout;
    let blockTimeout;
    let correctColor;
    let results = [];
    let pauseStartTime;
  
    function startPracticeBlock() {
      trialCount = 0;
      blockCount = 0;
      maxTime = 180;
      startBlock(practiceCtx, 'practica');
    }
  
    function startTestBlock() {
      trialCount = 0;
      blockCount++;
      if (blockCount === 1) {
        maxTime = 210;
      } else {
        maxTime = 210;
      }
      startBlock(testCtx, 'test');
    }
  
    function startBlock(ctx, type) {
      clearTimeout(blockTimeout);
      blockTimeout = setTimeout(() => {
        endBlock(type);
      }, maxTime * 1000);
  
      startTrial(ctx, type);
    }
  
    function endBlock(type) {
      clearTimeout(trialTimeout);
      if (type === 'practica') {
        practiceContainer.style.display = 'none';
        questionScreen.style.display = 'none';
        confidenceScreen.style.display = 'none';
        practiceFinishScreen.style.display = 'block';
      } else {
        testContainer.style.display = 'none';
        questionScreen.style.display = 'none';
        confidenceScreen.style.display = 'none';
        if (blockCount < maxBlocks) {
          blockFinishScreen.style.display = 'block';
          pauseStartTime = Date.now();
        } else {
          endScreen.style.display = 'block';
        }
      }
      // Completa los resultados faltantes con "no respondida"
      for (let i = trialCount + 1; i <= maxTrials; i++) {
        results.push({ block: blockCount, trial: i, answer: "no respondida", confidence: "N/A", isCorrect: false, time: new Date().toISOString() });
      }
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
          practiceTrialIndicator.innerText = `P${trialCount}`;
        } else {
          testTrialIndicator.innerText = `E${trialCount}`;
        }
      }
      
  
    function generateDots(ctx) {
      const numRedDots = Math.floor(Math.random() * 50) + 50; // Between 50 and 100
      const numBlueDots = 100 - numRedDots;
      const totalDots = numRedDots + numBlueDots;
      const colors = [];
  
      for (let i = 0; i < numRedDots; i++) {
        colors.push('red');
      }
      for (let i = 0; i < numBlueDots; i++) {
        colors.push('blue');
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
  
      correctColor = numRedDots > numBlueDots ? 'red' : 'blue';
    }
  
    function recordAnswer(answer) {
      const isCorrect = answer === correctColor;
      const confidence = confidenceSlider.value;
      results.push({ block: blockCount, trial: trialCount, answer, confidence, isCorrect, time: new Date().toISOString() });
    }
  
    function downloadResults() {
      const csvContent = "data:text/csv;charset=utf-8,"
        + "Item,Respuesta seleccionada,Seguridad,Evaluación,Tiempo\n"
        + results.map(e => `${e.trial},${e.answer},${e.confidence},${e.isCorrect ? 'Correcta' : 'Incorrecta'},${e.time}`).join("\n");
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "test_results.csv");
      document.body.appendChild(link);
      link.click();
    }
  
    function showFeedback(answer) {
      const isCorrect = answer === correctColor;
      feedbackMessage.innerText = isCorrect ? "¡Correcto!" : "Incorrecto";
      feedbackScreen.style.display = 'block';
      setTimeout(() => {
        feedbackScreen.style.display = 'none';
        if (trialCount < maxTrials) {
          startTrial(practiceCtx, 'practica');
        } else {
          endBlock('practica');
        }
      }, 2000);
    }
  
    document.getElementById('startDemoButton').addEventListener('click', () => {
      instructions.style.display = 'none';
      startPracticeBlock();
    });
  
    document.getElementById('nextPracticeButton').addEventListener('click', () => {
      practiceFinishScreen.style.display = 'none';
      blockCount = 1;
      startTestBlock();
    });
  
    document.getElementById('restartPracticeButton').addEventListener('click', () => {
      practiceContainer.style.display = 'none';
      practiceFinishScreen.style.display = 'none';
      questionScreen.style.display = 'none';
      feedbackScreen.style.display = 'none';
      confidenceScreen.style.display = 'none';
      trialCount = 0;
      startPracticeBlock();
    });
  
    document.getElementById('redButton').addEventListener('click', () => {
      questionScreen.style.display = 'none';
      confidenceScreen.style.display = 'block';
      recordAnswer('red');
    });
  
    document.getElementById('blueButton').addEventListener('click', () => {
      questionScreen.style.display = 'none';
      confidenceScreen.style.display = 'block';
      recordAnswer('blue');
    });
  
    confidenceSlider.addEventListener('input', () => {
      submitConfidenceButton.disabled = false;
    });
  
    document.getElementById('submitConfidenceButton').addEventListener('click', () => {
      confidenceScreen.style.display = 'none';
      showFeedback(correctColor);
    });
  
    document.getElementById('continueToNextBlockButton').addEventListener('click', () => {
      const pauseTime = (Date.now() - pauseStartTime) / 1000;
      results.push({ block: blockCount, trial: 'pausa', answer: 'N/A', confidence: 'N/A', isCorrect: 'N/A', time: `${pauseTime} segundos` });
      blockFinishScreen.style.display = 'none';
      if (blockCount < maxBlocks) {
        startTestBlock();
      } else {
        endScreen.style.display = 'block';
      }
    });
  
    document.getElementById('downloadResultsButton').addEventListener('click', () => {
      downloadResults();
    });
  
    document.getElementById('fullscreenButton').addEventListener('click', () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    });
  });
  