let canvas;
let world;
let keyboard = new Keyboard();
let uiManager;
let gameStartSound = new Audio('sounds/game/gameStart.mp3');
let backgroundTheme = new Audio('sounds/game/backgoundtheme.wav');
let isMuted = localStorage.getItem('muted') === 'true';

/**
 * Initializes the basic setup when the page loads.
 * Sets up touch events, audio properties, mute states, and starts the background theme.
 * @returns {void}
 */
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

/**
 * Toggles the global mute state for all game sounds, updates local storage, 
 * refreshes the button UI, and applies the mute state to the active world.
 * @returns {void}
 */
function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem('muted', isMuted);
  updateMuteButton();
  backgroundTheme.muted = isMuted;
  gameStartSound.muted = isMuted;
  if (world) muteWorldSounds(isMuted);
}

/**
 * Updates the text or appearance of the mute button based on the current mute state.
 * @returns {void}
 */
function updateMuteButton() {
  let muteButton = document.getElementById('mute-btn');
  if (muteButton) {
    muteButton.innerHTML = isMuted ? 'Unmute' : 'Mute';
  }
}

/**
 * Mutes or unmutes all specific audio elements across the entire active game world.
 * @param {boolean} status - True to mute all sounds, false to unmute them.
 * @returns {void}
 */
function muteWorldSounds(status) {
  if (!world) return;
  muteCharacterSounds(status);
  muteEnemySounds(status);
  muteCollectibleSounds(status);
  muteThrowableSounds(status);
}

/**
 * Mutes or unmutes all sound effects associated with the character.
 * @param {boolean} status - True to mute, false to unmute.
 * @returns {void}
 */
function muteCharacterSounds(status) {
  if (!world.character) return;
  let character = world.character;
  if (character.walking_sound) character.walking_sound.muted = status;
  if (character.jumping_sound) character.jumping_sound.muted = status;
  if (character.dead_sound) character.dead_sound.muted = status;
  if (character.hurt_sound) character.hurt_sound.muted = status;
  if (character.snoring_sound) character.snoring_sound.muted = status;
}

/**
 * Mutes or unmutes all sound effects associated with enemies in the current level.
 * @param {boolean} status - True to mute, false to unmute.
 * @returns {void}
 */
function muteEnemySounds(status) {
  if (!world.level || !world.level.enemies) return;
  world.level.enemies.forEach(enemy => {
    if (enemy.dead_sound) enemy.dead_sound.muted = status;
    if (enemy.approach_sound) enemy.approach_sound.muted = status;
  });
}

/**
 * Mutes or unmutes collection sound effects for coins and bottles in the current level.
 * @param {boolean} status - True to mute, false to unmute.
 * @returns {void}
 */
function muteCollectibleSounds(status) {
  if (!world.level) return;
  if (world.level.coins) {
    world.level.coins.forEach(coin => { if (coin.collect_sound) coin.collect_sound.muted = status; });
  }
  if (world.level.bottles) {
    world.level.bottles.forEach(bottle => { if (bottle.collect_sound) bottle.collect_sound.muted = status; });
  }
}

/**
 * Mutes or unmutes sound effects associated with throwable objects (e.g., salsa bottles).
 * @param {boolean} status - True to mute, false to unmute.
 * @returns {void}
 */
function muteThrowableSounds(status) {
  if (!world.throwableObjects) return;
  world.throwableObjects.forEach(bottle => {
    if (bottle.break_sound) bottle.break_sound.muted = status;
  });
}

/**
 * Starts the game, plays start and theme sounds, hides the start screen, 
 * displays mobile controls, initializes the level, and creates a new game world instance.
 * @returns {void}
 */
function startGame() {
  gameStartSound.play();
  backgroundTheme.play();
  document.getElementById("start-screen").classList.add("d-none");
  document.getElementById("mobile-controls").classList.remove("d-none");
  initLevel();
  world = new World(canvas, keyboard);
  muteWorldSounds(isMuted);
}

/**
 * Displays the game over screen, hides mobile controls, pauses background music, and clears all intervals.
 * @returns {void}
 */
function showGameOverScreen() {
  document.getElementById("game-over-screen").classList.remove("d-none");
  document.getElementById("game-over-screen").style.display = "flex";
  document.getElementById("mobile-controls").classList.add("d-none");
  backgroundTheme.pause();
  clearAllIntervals();
}

/**
 * Displays the win screen, hides mobile controls, pauses background music, and clears all intervals.
 * @returns {void}
 */
function showWinScreen() {
  document.getElementById("win-screen").classList.remove("d-none");
  document.getElementById("win-screen").style.display = "flex";
  document.getElementById("mobile-controls").classList.add("d-none");
  backgroundTheme.pause();
  clearAllIntervals();
}

/**
 * Clears all active interval timers to completely stop the game loop and background processes.
 * @returns {void}
 */
function clearAllIntervals() {
  for (let intervalId = 1; intervalId < 9999; intervalId++) {
    window.clearInterval(intervalId);
  }
}

/**
 * Restarts the game after a game over or win state by resetting screen visibility, 
 * resetting background music playback position, and invoking startGame().
 * @returns {void}
 */
function restartGame() {
  document.getElementById("game-over-screen").classList.add("d-none");
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").classList.add("d-none");
  document.getElementById("win-screen").style.display = "none";
  document.getElementById("mobile-controls").classList.remove("d-none");
  backgroundTheme.currentTime = 0;
  startGame();
}

/**
 * Returns the user to the main menu, hides end screens and mobile controls, 
 * stops music, clears all intervals, and completely resets the world and canvas context.
 * @returns {void}
 */
function mainMenu() {
  document.getElementById("game-over-screen").classList.add("d-none");
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("win-screen").classList.add("d-none");
  document.getElementById("win-screen").style.display = "none";
  document.getElementById("mobile-controls").classList.add("d-none");

  let startScreen = document.getElementById("start-screen");
  if (startScreen) {
    startScreen.classList.remove("d-none");
    startScreen.classList.remove("hidden"); 
    startScreen.style.display = "flex"; 
  }

  clearAllIntervals();
  backgroundTheme.pause();
  backgroundTheme.currentTime = 0;

  if (world) {
    world.ctx = null; 
  }
  world = null;

  let canvasElement = document.getElementById("canvas");
  if (canvasElement) {
    let context = canvasElement.getContext("2d");
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
  }
}

/**
 * Toggles fullscreen mode for the main game container across standard and vendor-prefixed implementations.
 * @returns {void}
 */
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

/**
 * Binds touch start and touch end event listeners to mobile on-screen control buttons, 
 * updating the global keyboard state accordingly.
 * @returns {void}
 */
function bindTouchEvents() {
  document.getElementById('btn-left').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById('btn-left').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.LEFT = false;
  });
  document.getElementById('btn-right').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById('btn-right').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.RIGHT = false;
  });
  document.getElementById('btn-jump').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById('btn-jump').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.SPACE = false;
  });
  document.getElementById('btn-throw').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.D = true;
  });
  document.getElementById('btn-throw').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.D = false;
  });
}

/**
 * Global keydown event listener to update keyboard states when physical keys are pressed.
 * @param {KeyboardEvent} event - The keydown event object.
 * @returns {void}
 */
window.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") keyboard.LEFT = true;
  if (event.key == "ArrowRight") keyboard.RIGHT = true;
  if (event.key == "ArrowUp") keyboard.UP = true;
  if (event.key == "ArrowDown") keyboard.DOWN = true;
  if (event.key == " ") keyboard.SPACE = true;
  if (event.key == "d" || event.key == "D") keyboard.D = true;
});

/**
 * Global keyup event listener to reset keyboard states when physical keys are released.
 * @param {KeyboardEvent} event - The keyup event object.
 * @returns {void}
 */
window.addEventListener("keyup", (event) => {
  if (event.key == "ArrowLeft") keyboard.LEFT = false;
  if (event.key == "ArrowRight") keyboard.RIGHT = false;
  if (event.key == "ArrowUp") keyboard.UP = false;
  if (event.key == "ArrowDown") keyboard.DOWN = false;
  if (event.key == " ") keyboard.SPACE = false;
  if (event.key == "d" || event.key == "D") keyboard.D = false;
});