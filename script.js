const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
  homeScreen.classList.remove("active");
  gameScreen.classList.add("active");
});