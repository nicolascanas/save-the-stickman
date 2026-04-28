const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const wordDisplay = document.getElementById("word-display");
const bottomBar = document.getElementById("bottom-bar");
const lettersList = document.getElementById("letters-list");
const hangman = document.getElementById("hangman");

const gameOverScreen = document.getElementById("game-over-screen");
const gameResult = document.getElementById("game-result");
const finalWord = document.getElementById("final-word");
const resetBtn = document.getElementById("reset-btn");
const homeBtn = document.getElementById("home-btn");

const words = ["JAVASCRIPT", "PROGRAMACAO", "DESENVOLVIMENTO", "COMPUTADOR"];

let selectedWord = "";
let revealedLetters = [];
let usedLetters = [];
let wrongGuesses = 0;
let gameOver = false;

const hangmanStages = [
  ``,
  ` O`,
  ` O\n |`,
  ` O\n/|`,
  ` O\n/|\\`,
  ` O\n/|\\\n/`,
  ` O\n/|\\\n/ \\`
];

startBtn.addEventListener("click", () => {
  homeScreen.classList.remove("active");
  gameScreen.classList.add("active");
  startGame();
});

resetBtn.addEventListener("click", () => {
  hideOverlay();
  startGame();
});

homeBtn.addEventListener("click", () => {
  hideOverlay();
  gameScreen.classList.remove("active");
  homeScreen.classList.add("active");
});

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  revealedLetters = selectedWord.split("").map(() => "_");
  usedLetters = [];
  wrongGuesses = 0;
  gameOver = false;

  renderWord();
  renderKeyboard();
  renderUsedLetters();
  renderHangman();
}

function renderWord() {
  wordDisplay.textContent = revealedLetters.join(" ");
  wordDisplay.classList.add("reveal");

  setTimeout(() => wordDisplay.classList.remove("reveal"), 200);
}

function renderUsedLetters() {
  lettersList.textContent = usedLetters.join(" ");
}

function renderHangman() {
  hangman.textContent = hangmanStages[wrongGuesses];
}

function renderKeyboard() {
  bottomBar.innerHTML = "";
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  alphabet.split("").forEach(letter => {
    const key = document.createElement("div");
    key.textContent = letter;
    key.classList.add("key");

    key.addEventListener("click", () => handleLetterClick(letter, key));

    keyboard.appendChild(key);
  });

  bottomBar.appendChild(keyboard);
}

function handleLetterClick(letter, keyElement) {
  if (usedLetters.includes(letter) || gameOver) return;

  usedLetters.push(letter);
  keyElement.classList.add("used");

  if (selectedWord.includes(letter)) {
    keyElement.classList.add("correct");

    selectedWord.split("").forEach((char, index) => {
      if (char === letter) revealedLetters[index] = letter;
    });

    renderWord();
    checkWin();
  } else {
    keyElement.classList.add("wrong");

    wrongGuesses++;
    renderHangman();

    // animação de erro
    hangman.classList.add("shake");
    setTimeout(() => hangman.classList.remove("shake"), 200);

    checkLoss();
  }

  renderUsedLetters();
}

function checkWin() {
  if (!revealedLetters.includes("_")) {
    gameOver = true;
    showGameOver(true);
  }
}

function checkLoss() {
  if (wrongGuesses === 6) {
    gameOver = true;
    showGameOver(false);
  }
}

function showGameOver(win) {
  gameOverScreen.classList.remove("hidden");

  setTimeout(() => {
    gameOverScreen.classList.add("show");
  }, 10);

  if (win) {
    gameResult.textContent = "Você venceu!";
    finalWord.textContent = "";
  } else {
    gameResult.textContent = "Game Over!";
    finalWord.textContent = `Palavra: ${selectedWord}`;
  }
}

function hideOverlay() {
  gameOverScreen.classList.remove("show");
  setTimeout(() => {
    gameOverScreen.classList.add("hidden");
  }, 400);
}