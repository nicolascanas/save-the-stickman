const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const wordDisplay = document.getElementById("word-display");

// Lista de palavras
const words = ["JAVASCRIPT", "PROGRAMACAO", "DESENVOLVIMENTO", "COMPUTADOR"];

// Estado do jogo
let selectedWord = "";
let revealedLetters = [];

// Iniciar jogo
startBtn.addEventListener("click", () => {
  homeScreen.classList.remove("active");
  gameScreen.classList.add("active");

  startGame();
});

function startGame() {
  // Escolher palavra aleatória
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // Criar array de underscores
  revealedLetters = selectedWord.split("").map(() => "_");

  renderWord();
}

function renderWord() {
  wordDisplay.textContent = revealedLetters.join(" ");
}