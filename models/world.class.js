class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  statusBarBottles = new StatusBarBottle();
  coinBar = new CoinBar();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];

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
      this.checkBottleCollisions();
    }, 200);
  }

checkCollisions() {
    let stompedEnemy = false;
    this.level.enemies.forEach((enemy) => {
      if (this.isEnemyColliding(enemy)) {
        stompedEnemy = this.processCollision(enemy, stompedEnemy);
      }
    });
    if (stompedEnemy) this.character.jump();
  }

  isEnemyColliding(enemy) {
    return this.character.isColliding(enemy) && !enemy.isDead();
  }

  processCollision(enemy, stompedEnemy) {
    if (this.canStomp(enemy)) {
      this.stompEnemy(enemy);
      return true;
    } else if (!this.character.isHurt() && !stompedEnemy) {
      this.characterTakeDamage();
    }
    return stompedEnemy;
  }

  canStomp(enemy) {
    return this.character.isAboveGround() && 
           this.character.speedY < 0 && 
           !(enemy instanceof Endboss);
  }

  stompEnemy(enemy) {
    enemy.hit(100);
    setTimeout(() => this.removeEnemy(enemy), 2000);
  }

  removeEnemy(enemy) {
    let index = this.level.enemies.indexOf(enemy);
    if (index > -1) {
      this.level.enemies.splice(index, 1);
    }
  }

  characterTakeDamage() {
    this.character.hit(20);
    this.statusBar.setPercentage(this.character.energy);
  }


checkBottleCollisions() {
    this.checkBottleCollection();
    this.checkThrowableCollisions();
  }

  checkBottleCollection() {
    if (!this.level.bottles) return;
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(bottle, index);
      }
    });
  }

  collectBottle(bottle, index) {
    bottle.collect_sound.muted = isMuted;
    bottle.collect_sound.play();
    if (!this.character.collectedBottles) this.character.collectedBottles = 0;
    this.character.collectedBottles += 20;
    if (this.character.collectedBottles > 100) this.character.collectedBottles = 100;
    this.statusBarBottles.setPercentage(this.character.collectedBottles);
    this.level.bottles.splice(index, 1);
  }

  checkThrowableCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        this.checkSingleThrowableHit(bottle, enemy);
      });
    });
  }

  checkSingleThrowableHit(bottle, enemy) {
    if (bottle.isColliding(enemy) && !enemy.isDead() && !bottle.isSplashed) {
      bottle.break_sound.muted = isMuted;
      bottle.splash();
      this.applyDamageAndRemove(bottle, enemy);
    }
  }

  applyDamageAndRemove(bottle, enemy) {
    enemy.hit(bottle.damage);
    if (enemy instanceof Endboss) {
      this.statusBarEndboss.setPercentage(enemy.energy);
    }
    setTimeout(() => {
      let index = this.throwableObjects.indexOf(bottle);
      if (index > -1) this.throwableObjects.splice(index, 1);
    }, 400);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.character.collectedBottles > 0 && !this.isThrowing) {
      this.isThrowing = true;
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
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
          coin.collect_sound.muted = isMuted;
          coin.collect_sound.play();
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
    this.drawBackground();
    this.drawStatusBars();
    this.drawGameObjects();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.coinBar);
    let endboss = this.level.enemies.find(e => e instanceof Endboss);
    if (endboss && endboss.hadFirstContact) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  drawGameObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.throwableObjects);
    this.addObjectToMap(this.level.bottles);
    this.addObjectToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);
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