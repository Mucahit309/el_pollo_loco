let canvas;
let world;
let keyboard = new Keyboard();
let uiManager;
let gameStartSound = new Audio('sounds/game/gameStart.mp3');
let backgroundTheme = new Audio('sounds/game/backgoundtheme.wav');
let isMuted = localStorage.getItem('muted') === 'true';

function init() {
  canvas = document.getElementById("canvas");
  uiManager = new UIManager();
  bindTouchEvents();
  backgroundTheme.loop = true;
  backgroundTheme.volume = 0.2;
  backgroundTheme.muted = isMuted;
  gameStartSound.muted = isMuted;
  updateMuteButton();
  backgroundTheme.play().catch(() => {});
}

function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem('muted', isMuted);
  updateMuteButton();
  backgroundTheme.muted = isMuted;
  gameStartSound.muted = isMuted;
  if (world) muteWorldSounds(isMuted);
}

function updateMuteButton() {
  let btn = document.getElementById('mute-btn');
  if (btn) {
    btn.innerHTML = isMuted ? 'Unmute' : 'Mute';
  }
}

function muteWorldSounds(status) {
  if (world && world.character) {
    if (world.character.walking_sound) world.character.walking_sound.muted = status;
    if (world.character.jumping_sound) world.character.jumping_sound.muted = status;
    if (world.character.dead_sound) world.character.dead_sound.muted = status;
    if (world.character.hurt_sound) world.character.hurt_sound.muted = status;
    if (world.character.snoring_sound) world.character.snoring_sound.muted = status;
  }
  
  if (world && world.level) {
    if (world.level.enemies) {
      world.level.enemies.forEach(enemy => {
        if(enemy.dead_sound) enemy.dead_sound.muted = status;
        if(enemy.approach_sound) enemy.approach_sound.muted = status;
      });
    }
    if (world.level.coins) {
      world.level.coins.forEach(coin => {
        if(coin.collect_sound) coin.collect_sound.muted = status;
      });
    }
    if (world.level.bottles) {
      world.level.bottles.forEach(bottle => {
        if(bottle.collect_sound) bottle.collect_sound.muted = status;
      });
    }
  }

  if (world && world.throwableObjects) {
    world.throwableObjects.forEach(bottle => {
      if(bottle.break_sound) bottle.break_sound.muted = status;
    });
  }
}

function startGame() {
  gameStartSound.play();
  backgroundTheme.play();
  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("mobile-controls").classList.remove("d-none");
  initLevel();
  world = new World(canvas, keyboard);
  muteWorldSounds(isMuted);
}

function showGameOverScreen() {
  document.getElementById("game-over-screen").classList.remove("d-none");
  document.getElementById("game-over-screen").style.display = "flex";
  document.getElementById("mobile-controls").classList.add("d-none");
  backgroundTheme.pause();
  clearAllIntervals();
}

function showWinScreen() {
  document.getElementById("win-screen").classList.remove("d-none");
  document.getElementById("win-screen").style.display = "flex";
  document.getElementById("mobile-controls").classList.add("d-none");
  backgroundTheme.pause();
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
  document.getElementById("mobile-controls").classList.remove("d-none");
  backgroundTheme.currentTime = 0;
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

function bindTouchEvents() {
  document.getElementById('btn-left').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById('btn-left').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });
  document.getElementById('btn-right').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById('btn-right').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });
  document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById('btn-jump').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
  document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
  });
  document.getElementById('btn-throw').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
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