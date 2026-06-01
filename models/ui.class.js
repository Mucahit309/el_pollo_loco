/**
 * Manages the user interface screens and button interactions outside the canvas.
 */
class UIManager {
  /**
   * Initializes the UIManager and links the DOM elements for all game screens.
   */
  constructor() {
    this.startScreen = document.getElementById("start-screen");
    this.controlsScreen = document.getElementById("controls-screen");
    this.gameOverScreen = document.getElementById("game-over-screen");

    this.btnStart = document.getElementById("btn-start");
    this.btnControls = document.getElementById("btn-controls");
    this.btnCloseControls = document.getElementById("btn-close-controls");

    this.bindEvents();
  }

  /**
   * Binds click events to the UI buttons for starting the game and showing controls.
   */
  bindEvents() {
    this.btnStart.onclick = () => this.handleStartGame();
    this.btnControls.onclick = () => this.showControls();
    this.btnCloseControls.onclick = () => this.hideControls();
  }

  /**
   * Handles the start game action by hiding the start screen and calling startGame().
   */
  handleStartGame() {
    this.startScreen.classList.add("hidden");
    this.startScreen.style.display = "none";
    startGame();
  }

  /**
   * Hides the start screen and displays the controls screen.
   */
  showControls() {
    this.startScreen.classList.add("hidden");
    this.startScreen.style.display = "none";
    this.controlsScreen.classList.remove("hidden");
    this.controlsScreen.style.display = "flex";
  }

  /**
   * Hides the controls screen and returns to the start screen.
   */
  hideControls() {
    this.controlsScreen.classList.add("hidden");
    this.controlsScreen.style.display = "none";
    this.startScreen.classList.remove("hidden");
    this.startScreen.style.display = "flex";
  }
}
