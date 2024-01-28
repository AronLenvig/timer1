document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const continueButton = document.getElementById('continue');
    const resetButton = document.getElementById('reset');
    const timerText = document.getElementById('timer-text');
    const wakeUpSound = document.getElementById('wake-up-sound');
    const timerCircle = document.getElementById('timer-circle').querySelector('circle');
    const circumference = 2 * Math.PI * 40; // 40 is the radius of the circle

    let timeLeft;
    let timer;
    let isPaused = true;

    timerCircle.style.strokeDasharray = circumference;
    timerCircle.style.strokeDashoffset = circumference;

    const startTimer = (duration) => {
        if (!isPaused) return;
        
        isPaused = false;
        timeLeft = duration;

        timer = setInterval(() => {
            if (!isPaused) {
                timeLeft -= 1;
                const timeFraction = timeLeft / duration;
                timerCircle.style.strokeDashoffset = circumference * (1 - timeFraction);
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerText.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    if (duration === 60) {
                        alert("Time to sleep");
                        startTimer(12); // Start 12 seconds countdown
                    } else {
                        wakeUpSound.play();
                        setTimeout(() => startTimer(60), 1000); // Restart 1-minute countdown after 1 second
                    }
                }
            }
        }, 1000);
    };

    startButton.onclick = () => startTimer(20);
    stopButton.onclick = () => isPaused = true;
    continueButton.onclick = () => isPaused ? startTimer(timeLeft) : null;
    resetButton.onclick = () => {
        clearInterval(timer);
        isPaused = true;
        timerCircle.style.strokeDashoffset = circumference;
        timerText.textContent = "1:00";
    };
});
