let countdownTime = 1 * 60; // 1 minuto en segundos
let countdownInterval;

function startCountdown() {
    countdownInterval = setInterval(() => {
        countdownTime--;
        if (countdownTime <= 0) {
            self.postMessage({ type: 'timerFinished' });
            clearInterval(countdownInterval);
        } else {
            self.postMessage({ type: 'updateTimer', time: countdownTime });
        }
    }, 1000);
}

self.addEventListener('message', (event) => {
    if (event.data === 'startCountdown') {
        startCountdown();
    }
});
