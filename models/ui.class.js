class UIManager {
    constructor() {
        this.startScreen = document.getElementById("start-screen");
        this.controlsScreen = document.getElementById("controls-screen");
        this.gameOverScreen = document.getElementById("game-over-screen");

        this.btnStart = document.getElementById("btn-start");
        this.btnControls = document.getElementById("btn-controls");
        this.btnCloseControls = document.getElementById("btn-close-controls");

        this.bindEvents();
    }

    bindEvents() {
        this.btnStart.onclick = () => this.handleStartGame();
        this.btnControls.onclick = () => this.showControls();
        this.btnCloseControls.onclick = () => this.hideControls();
    }

    handleStartGame() {
        this.startScreen.classList.add("hidden");
        this.startScreen.style.display = "none";
        startGame();
    }

    showControls() {
        this.startScreen.classList.add("hidden");
        this.startScreen.style.display = "none";
        this.controlsScreen.classList.remove("hidden");
        this.controlsScreen.style.display = "flex";
    }

    hideControls() {
        this.controlsScreen.classList.add("hidden");
        this.controlsScreen.style.display = "none";
        this.startScreen.classList.remove("hidden");
        this.startScreen.style.display = "flex";
    }
}