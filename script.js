const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const wordDisplay = document.getElementById("word-display");
const bottomBar = document.getElementById("bottom-bar");
const lettersList = document.getElementById("letters-list");

// Lista de palavras
const words = ["JAVASCRIPT", "PROGRAMACAO", "DESENVOLVIMENTO", "COMPUTADOR"];

// Estado do jogo
let selectedWord = "";
let revealedLetters = [];
let usedLetters = [];
let wrongGuesses = 0;

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

  renderWord();
  renderKeyboard();
  renderUsedLetters();
}

function renderWord() {
  wordDisplay.textContent = revealedLetters.join(" ");
}

function renderUsedLetters() {
  lettersList.textContent = usedLetters.join(" ");
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
  if (usedLetters.includes(letter)) return;

  usedLetters.push(letter);
  keyElement.classList.add("used");

  if (selectedWord.includes(letter)) {
    // Acerto → revelar letras
    selectedWord.split("").forEach((char, index) => {
      if (char === letter) {
        revealedLetters[index] = letter;
      }
    });

    renderWord();
  } else {
    // Erro
    wrongGuesses++;
    console.log("Erros:", wrongGuesses);
  }

  renderUsedLetters();
}