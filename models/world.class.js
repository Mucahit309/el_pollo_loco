class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  throwableObjects = [];
  statusBarBottles = new StatusBarBottle();
  coinBar = new CoinBar();

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkGameOver();
      this.checkCoinCollisions();
    }, 200);
  }

  checkCollisions() {
    if (this.level.enemies) {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      });
    }
    this.checkBottleCollisions();
  }

  checkBottleCollisions() {
    if (this.level.bottles) {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          if (!this.character.collectedBottles) {
            this.character.collectedBottles = 0;
          }
          this.character.collectedBottles += 20;
          if (this.character.collectedBottles > 100) {
            this.character.collectedBottles = 100;
          }
          this.statusBarBottles.setPercentage(this.character.collectedBottles);
          this.level.bottles.splice(index, 1);
        }
      });
    }
  }

  checkThrowObjects() {
    if (
      this.keyboard.D &&
      this.character.collectedBottles > 0 &&
      !this.isThrowing
    ) {
      this.isThrowing = true;
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);

      this.character.collectedBottles -= 20;
      this.statusBarBottles.setPercentage(this.character.collectedBottles);

      setTimeout(() => {
        this.isThrowing = false;
      }, 800);
    }
  }

  checkGameOver() {
    if (this.character.isDead()) {
      setTimeout(() => {
        showGameOverScreen();
      }, 1000);
    }
  }

  checkCoinCollisions() {
    if (this.level.coins) {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          if (!this.character.collectedCoins) {
            this.character.collectedCoins = 0;
          }
          this.character.collectedCoins += 20;
          if (this.character.collectedCoins > 100) {
            this.character.collectedCoins = 100;
          }
          this.coinBar.setPercentage(this.character.collectedCoins);
          this.level.coins.splice(index, 1);
        }
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    
    // Space for fixed objects (statusbar)
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.coinBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.throwableObjects);
    this.addObjectToMap(this.level.bottles);
    this.addObjectToMap(this.level.coins);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectToMap(objects) {
    if (objects) {
      objects.forEach((o) => {
        this.addToMap(o);
      });
    }
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}