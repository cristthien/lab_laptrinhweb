const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById('submitGuess').addEventListener('click', guessNumber);
document.getElementById('guess').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    guessNumber();
  }
});

function guessNumber() {
  const guess = parseInt(document.getElementById('guess').value);
  attempts++;

  if (guess === secretNumber) {
    document.getElementById('feedback').textContent = `Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`;
    resetGame();
  } else if (guess < secretNumber) {
    document.getElementById('feedback').textContent = 'Too low. Try again.';
  } else {
    document.getElementById('feedback').textContent = 'Too high. Try again.';
  }
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById('guess').value = '';
  document.getElementById('feedback').textContent = '';
}