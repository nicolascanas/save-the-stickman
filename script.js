const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const wordDisplay = document.getElementById("word-display");
const bottomBar = document.getElementById("bottom-bar");
const lettersList = document.getElementById("letters-list");
const hangman = document.getElementById("hangman");

// Lista de palavras
const words = ["JAVASCRIPT", "PROGRAMACAO", "DESENVOLVIMENTO", "COMPUTADOR"];

// Estado do jogo
let selectedWord = "";
let revealedLetters = [];
let usedLetters = [];
let wrongGuesses = 0;
let gameOver = false;

// Estados visuais da forca
const hangmanStages = [
  `
  
  
  
  
  
  `,
  `
   O
  
  
  
  
  `,
  `
   O
   |
  
  
  
  `,
  `
   O
  /|
  
  
  
  `,
  `
   O
  /|\\
  
  
  
  `,
  `
   O
  /|\\
  /
  
  
  `,
  `
   O
  /|\\
  / \\
  
  
  `
];

// Iniciar jogo
startBtn.addEventListener("click", () => {
  homeScreen.classList.remove("active");
  gameScreen.classList.add("active");

  startGame();
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
    selectedWord.split("").forEach((char, index) => {
      if (char === letter) {
        revealedLetters[index] = letter;
      }
    });

    renderWord();

    checkWin();
  } else {
    wrongGuesses++;
    renderHangman();

    checkLoss();
  }

  renderUsedLetters();
}

function checkWin() {
  if (!revealedLetters.includes("_")) {
    gameOver = true;
    setTimeout(() => alert("Você venceu!"), 100);
  }
}

function checkLoss() {
  if (wrongGuesses === 6) {
    gameOver = true;
    setTimeout(() => alert(`Game Over! A palavra era: ${selectedWord}`), 100);
  }
}