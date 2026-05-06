let canvas;
let world;
let keyboard = new Keyboard();
let uiManager;

function init() {
  canvas = document.getElementById("canvas");
  uiManager = new UIManager();
}

function startGame() {
  initLevel();
  world = new World(canvas, keyboard);
}

function showGameOverScreen() {
  document.getElementById("game-over-screen").classList.remove("d-none");
  document.getElementById("game-over-screen").style.display = "flex";
  clearAllIntervals();
}

function showWinScreen() {
  document.getElementById("win-screen").classList.remove("d-none");
  document.getElementById("win-screen").style.display = "flex";
  clearAllIntervals();
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

function restartGame() {
  document.getElementById("game-over-screen").classList.add("d-none");
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").classList.add("d-none");
  document.getElementById("win-screen").style.display = "none";
  startGame();
}

function mainMenu() {
  window.location.reload();
}

function toggleFullscreen() {
  let container = document.getElementById("fullscreen-container");

  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") keyboard.LEFT = true;
  if (e.key == "ArrowRight") keyboard.RIGHT = true;
  if (e.key == "ArrowUp") keyboard.UP = true;
  if (e.key == "ArrowDown") keyboard.DOWN = true;
  if (e.key == " ") keyboard.SPACE = true;
  if (e.key == "d" || e.key == "D") keyboard.D = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key == "ArrowLeft") keyboard.LEFT = false;
  if (e.key == "ArrowRight") keyboard.RIGHT = false;
  if (e.key == "ArrowUp") keyboard.UP = false;
  if (e.key == "ArrowDown") keyboard.DOWN = false;
  if (e.key == " ") keyboard.SPACE = false;
  if (e.key == "d" || e.key == "D") keyboard.D = false;
});