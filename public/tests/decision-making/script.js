document.addEventListener('DOMContentLoaded', () => {
  let currentTrial = 0;
  const cantidad_ensayos_prueba = 2;
  const cantidad_ensayos_bloque_1 = 2;
  const cantidad_ensayos_bloque_2 = 2;
  const cantidad_ensayos_bloque_3 = 2;
  let trials = [];
  let startTime;
  let results = [];
  let practiceMode = true;
  let selectionMade = false;
  let score = 0;
  let currentBlock = 0; // Track the current block

  const trialIndicator = document.getElementById('trialIndicator');
  const practiceTrial = document.getElementById('practiceTrial');
  const feedbackScreen = document.getElementById('feedbackScreen');
  const feedbackImage1 = document.getElementById('feedbackImage1');
  const feedbackImage2 = document.getElementById('feedbackImage2');
  const feedbackMessage = document.getElementById('feedbackMessage');
  const endScreen = document.getElementById('endScreen');
  const leftSlot = document.getElementById('leftSlot');
  const rightSlot = document.getElementById('rightSlot');
  const instructions = document.getElementById('instructions');
  const scoreAmount = document.getElementById('scoreAmount');

  document.getElementById('startPracticeButton').addEventListener('click', () => {
      startPractice();
  });

  document.getElementById('fullscreenButton').addEventListener('click', () => {
      if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
      }
  });

  leftSlot.addEventListener('click', () => {
      if (!selectionMade) {
          selectionMade = true;
          selectMachine('left');
      }
  });

  rightSlot.addEventListener('click', () => {
      if (!selectionMade) {
          selectionMade = true;
          selectMachine('right');
      }
  });

  document.getElementById('downloadResultsButton').addEventListener('click', () => {
      downloadResults();
  });

  function startPractice() {
      practiceMode = true;
      currentTrial = 0;
      trials = generatePracticeTrials();
      startTime = Date.now();
      instructions.style.display = 'none';
      practiceTrial.style.display = 'block';
      showNextTrial();
  }

  function startTestBlock() {
      practiceMode = false;
      currentTrial = 0;
      trials = generateTestTrials(currentBlock);
      startTime = Date.now();
      practiceTrial.style.display = 'block';
      showNextTrial();
  }

  function showNextTrial() {
      selectionMade = false;
      const trial = trials[currentTrial];
      trialIndicator.innerText = practiceMode ? `P${currentTrial + 1}` : `E${currentTrial + 1}`;
      feedbackScreen.style.display = 'none';
      endScreen.style.display = 'none';
      resetSlotMachines();
      practiceTrial.style.display = 'block';
  }

  function finishBlock() {
      practiceTrial.style.display = 'none';
      feedbackScreen.style.display = 'none';
      if (practiceMode) {
          console.log("Práctica completada");
          currentBlock = 1; // Ir al siguiente bloque
          startTestBlock();
      } else {
          switch (currentBlock) {
              case 1:
                  console.log("Bloque 1 completado");
                  currentBlock = 2;
                  startTestBlock();
                  break;
              case 2:
                  console.log("Bloque 2 completado");
                  currentBlock = 3;
                  startTestBlock();
                  break;
              case 3:
                  console.log("Bloque 3 completado");
                  endScreen.style.display = 'block';
                  break;
          }
      }
  }

  function generatePracticeTrials() {
      const practiceTrials = [];
      for (let i = 0; i < cantidad_ensayos_prueba; i++) {
          practiceTrials.push({
              leftReward: Math.random() < 0.5,
              rightReward: Math.random() < 0.5
          });
      }
      return practiceTrials;
  }

  function generateTestTrials(block) {
      const testTrials = [];
      let blockTrialsCount;
      let leftRewardChance, rightRewardChance;

      switch (block) {
          case 1:
              blockTrialsCount = cantidad_ensayos_bloque_1;
              leftRewardChance = 0.25;
              rightRewardChance = 0.75;
              break;
          case 2:
              blockTrialsCount = cantidad_ensayos_bloque_2;
              leftRewardChance = 0.75;
              rightRewardChance = 0.25;
              break;
          case 3:
              blockTrialsCount = cantidad_ensayos_bloque_3;
              leftRewardChance = 0.25;
              rightRewardChance = 0.75;
              break;
          default:
              return [];
      }

      for (let i = 0; i < blockTrialsCount; i++) {
          testTrials.push({
              leftReward: Math.random() < leftRewardChance,
              rightReward: Math.random() < rightRewardChance
          });
      }

      return testTrials;
  }

  function resetSlotMachines() {
      leftSlot.src = 'img/slot-machine-left-up.png';
      rightSlot.src = 'img/slot-machine-right-up.png';
  }

  function selectMachine(side) {
      if (side === 'left') {
          leftSlot.src = 'img/slot-machine-left-down.png';
      } else {
          rightSlot.src = 'img/slot-machine-right-down.png';
      }

      setTimeout(() => {
          showFeedback(side);
      }, 1000);
  }

  function showFeedback(side) {
      const trial = trials[currentTrial];
      const reward = trial[`${side}Reward`];
      feedbackImage1.src = reward ? 'img/win.jpg' : 'img/lose.jpg';
      feedbackImage2.src = reward ? 'img/5000.png' : 'img/1000.png';
      feedbackMessage.innerText = reward ? '¡Ganaste!' : '¡Perdiste!';
      score += reward ? 5000 : -1000;
      scoreAmount.innerText = `$${score}`;
      scoreAmount.style.color = score < 0 ? 'red' : score === 0 ? 'black' : 'blue';
      results.push([currentTrial + 1, side, reward ? 'correcto' : 'incorrecto', Date.now() - startTime]);
      practiceTrial.style.display = 'none';
      feedbackScreen.style.display = 'block';
      currentTrial++;

      setTimeout(() => {
          if (currentTrial < trials.length) {
              showNextTrial();
          } else {
              finishBlock();
          }
      }, 3000);
  }

  function downloadResults() {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "item,respuesta seleccionada (rojo o azul),seguridad (valor seleccionado en la barra),evaluacion (correcta o incorrecta),tiempo\n";
      csvContent += results.map(e => e.join(",")).join("\n");
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", "results.csv");
      document.body.appendChild(link);
      link.click();
  }
});
