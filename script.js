const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const wordDisplay = document.getElementById("word-display");
const bottomBar = document.getElementById("bottom-bar");
const lettersList = document.getElementById("letters-list");
const hangman = document.getElementById("hangman");
const categoryTitle = document.getElementById("category-title");

const scoreDisplay = document.getElementById("score-display");
const scoreDisplayGame = document.getElementById("score-display-game");
const finalScore = document.getElementById("final-score");

const gameOverScreen = document.getElementById("game-over-screen");
const gameResult = document.getElementById("game-result");
const finalWord = document.getElementById("final-word");
const resetBtn = document.getElementById("reset-btn");
const homeBtn = document.getElementById("home-btn");

const categoryButtons = document.querySelectorAll("#category-buttons button");

const categories = {
  tecnologia: ["JAVASCRIPT", "COMPUTADOR", "ALGORITMO", "INTERNET"],
  animais: ["ELEFANTE", "GIRAFA", "CACHORRO", "TIGRE"],
  paises: ["BRASIL", "CANADA", "JAPAO", "ALEMANHA"]
};

let selectedCategory = "";
let selectedWord = "";
let revealedLetters = [];
let usedLetters = [];
let wrongGuesses = 0;
let gameOver = false;

// 🎯 NOVO: pontuação
let score = Number(localStorage.getItem("hangmanScore")) || 0;

const hangmanStages = [
  ``,
  ` O`,
  ` O\n |`,
  ` O\n/|`,
  ` O\n/|\\`,
  ` O\n/|\\\n/`,
  ` O\n/|\\\n/ \\`
];

// Atualiza score na UI
function updateScoreDisplay() {
  scoreDisplay.textContent = `Pontuação: ${score}`;
  scoreDisplayGame.textContent = `Pontuação: ${score}`;
}

// Salvar score
function saveScore() {
  localStorage.setItem("hangmanScore", score);
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    homeScreen.classList.remove("active");
    gameScreen.classList.add("active");
    startGame();
  });
});

resetBtn.addEventListener("click", () => {
  hideOverlay();
  startGame();
});

homeBtn.addEventListener("click", () => {
  hideOverlay();
  gameScreen.classList.remove("active");
  homeScreen.classList.add("active");
  updateScoreDisplay();
});

function startGame() {
  const words = categories[selectedCategory];
  selectedWord = words[Math.floor(Math.random() * words.length)];

  revealedLetters = selectedWord.split("").map(() => "_");
  usedLetters = [];
  wrongGuesses = 0;
  gameOver = false;

  categoryTitle.textContent = `Categoria: ${selectedCategory.toUpperCase()}`;

  renderWord();
  renderKeyboard();
  renderUsedLetters();
  renderHangman();
  updateScoreDisplay();
}

function renderWord() {
  wordDisplay.textContent = revealedLetters.join(" ");
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
    key.dataset.letter = letter;

    key.addEventListener("click", () => handleLetterClick(letter, key));
    keyboard.appendChild(key);
  });

  bottomBar.appendChild(keyboard);
}

document.addEventListener("keydown", (event) => {
  if (gameOver) return;

  const letter = event.key.toUpperCase();
  if (!/^[A-Z]$/.test(letter)) return;

  const keyElement = document.querySelector(`.key[data-letter="${letter}"]`);
  if (!keyElement) return;

  handleLetterClick(letter, keyElement);
});

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
    score = Math.max(0, score - 1); // penalidade
    saveScore();

    renderHangman();
    updateScoreDisplay();
    checkLoss();
  }

  renderUsedLetters();
}

function checkWin() {
  if (!revealedLetters.includes("_")) {
    gameOver = true;
    score += 10;
    saveScore();
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

  finalScore.textContent = `Pontuação atual: ${score}`;

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

// inicializar score na home
updateScoreDisplay();