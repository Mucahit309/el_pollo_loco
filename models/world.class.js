/**
 * Represents the game world, orchestrating the level, character, enemies, and UI.
 */
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

  /**
   * Creates the game world.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
   * @param {Keyboard} keyboard - The keyboard handler for user input.
   */
  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Links the world instance to the main character.
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop checking for collisions, throwables, game over conditions, and collectibles.
   * @returns {void}
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkGameOver();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
    }, 200);
  }

  /**
   * Checks for all collisions between the character and enemies (stomping or taking damage).
   * @returns {void}
   */
  checkCollisions() {
    let stompedEnemy = false;
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead()) {
        if (this.tryStompEnemy(enemy)) {
          stompedEnemy = true;
        } else {
          this.tryDamageCharacter(enemy);
        }
      }
    });
    if (stompedEnemy) this.character.jump();
  }

  /**
   * Attempts to stomp an enemy if the character is falling with momentum and colliding appropriately.
   * @param {MovableObject} enemy - The enemy object to check.
   * @returns {boolean} True if the enemy was successfully stomped, false otherwise.
   */
  tryStompEnemy(enemy) {
    let isFallingWithMomentum = this.character.isAboveGround() && this.character.speedY < -1;
    if (isFallingWithMomentum && this.isStompingEnemy(enemy)) {
      this.stompEnemy(enemy);
      return true;
    }
    return false;
  }

  /**
   * Attempts to damage the character if colliding with an active enemy and not currently hurt.
   * @param {MovableObject} enemy - The enemy object to check.
   * @returns {void}
   */
  tryDamageCharacter(enemy) {
    if (this.character.isColliding(enemy) && !this.character.isHurt()) {
      this.characterTakeDamage();
    }
  }

  /**
   * Checks if the character's landing position qualifies as stomping an enemy from above.
   * @param {MovableObject} enemy - The enemy object to check against.
   * @returns {boolean} True if the stomp conditions are met, false otherwise.
   */
  isStompingEnemy(enemy) {
    if (enemy instanceof Endboss) return false;

    let characterBottom = this.character.y + this.character.height - this.character.offset.bottom;
    let enemyTop = enemy.y + enemy.offset.top;

    let isSmall = enemy instanceof SmallChicken;
    let frontPadding = isSmall ? 35 : 45;
    let backPadding = 15;

    let topLimit = isSmall ? (enemyTop - 10) : (enemyTop - 5);
    let bottomLimit = isSmall ? 35 : 30;

    let isTouchingTopOrFront = characterBottom >= topLimit && characterBottom <= (enemyTop + bottomLimit);
    let isOverlappingX = this.isStompingOverlappingX(enemy, frontPadding, backPadding);

    return isTouchingTopOrFront && isOverlappingX;
  }

  /**
   * Checks horizontal overlap ranges between the character and enemy during a stomp attempt.
   * @param {MovableObject} enemy - The enemy object.
   * @param {number} frontPadding - Horizontal padding for the front.
   * @param {number} backPadding - Horizontal padding for the back.
   * @returns {boolean} True if overlapping horizontally within limits, false otherwise.
   */
  isStompingOverlappingX(enemy, frontPadding, backPadding) {
    let characterObject = this.character;
    return (
      characterObject.x + characterObject.width - characterObject.offset.right + frontPadding > enemy.x + enemy.offset.left &&
      characterObject.x + characterObject.offset.left - backPadding < enemy.x + enemy.width - enemy.offset.right
    );
  }

  /**
   * Checks standard bounding box collisions between the character and an enemy.
   * @param {MovableObject} enemy - The enemy object.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isCharacterCollidingWithEnemy(enemy) {
    let character = this.character;
    return (character.x + character.width - character.offset.right) > (enemy.x + enemy.offset.left) &&
           (character.y + character.height - character.offset.bottom) > (enemy.y + enemy.offset.top) &&
           (character.x + character.offset.left) < (enemy.x + enemy.width - enemy.offset.right) &&
           (character.y + character.offset.top) < (enemy.y + enemy.height - enemy.offset.bottom);
  }

  /**
   * Inflicts fatal damage to a stomped enemy and schedules its removal from the level.
   * @param {MovableObject} enemy - The enemy object being stomped.
   * @returns {void}
   */
  stompEnemy(enemy) {
    enemy.hit(100);
    setTimeout(() => this.removeEnemy(enemy), 2000);
  }

  /**
   * Removes an enemy from the level's enemy array.
   * @param {MovableObject} enemy - The enemy object to remove.
   * @returns {void}
   */
  removeEnemy(enemy) {
    let index = this.level.enemies.indexOf(enemy);
    if (index > -1) {
      this.level.enemies.splice(index, 1);
    }
  }

  /**
   * Applies damage to the character and updates the health status bar.
   * @returns {void}
   */
  characterTakeDamage() {
    this.character.hit(20);
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Checks all bottle-related collisions (collection and throwable impacts).
   * @returns {void}
   */
  checkBottleCollisions() {
    this.checkBottleCollection();
    this.checkThrowableCollisions();
  }

  /**
   * Checks if the character collects any ground salsa bottles.
   * @returns {void}
   */
  checkBottleCollection() {
    if (!this.level.bottles) return;
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(bottle, index);
      }
    });
  }

  /**
   * Handles collecting a salsa bottle, updating counts, status bar, audio, and removing it from the level.
   * @param {Bottle} bottle - The collected bottle object.
   * @param {number} index - The index of the bottle in the level array.
   * @returns {void}
   */
  collectBottle(bottle, index) {
    bottle.collect_sound.muted = isMuted;
    let playPromise = bottle.collect_sound.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {});
    }
    if (!this.character.collectedBottles) this.character.collectedBottles = 0;
    this.character.collectedBottles += 20;
    if (this.character.collectedBottles > 100) this.character.collectedBottles = 100;
    this.statusBarBottles.setPercentage(this.character.collectedBottles);
    this.level.bottles.splice(index, 1);
  }

  /**
   * Checks collisions between active throwable objects and level enemies.
   * @returns {void}
   */
  checkThrowableCollisions() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        this.checkSingleThrowableHit(bottle, enemy);
      });
    });
  }

  /**
   * Checks if a single throwable bottle hits an active enemy.
   * @param {ThrowableObject} bottle - The throwable bottle object.
   * @param {MovableObject} enemy - The enemy object.
   * @returns {void}
   */
  checkSingleThrowableHit(bottle, enemy) {
    if (bottle.isColliding(enemy) && !enemy.isDead() && !bottle.isSplashed) {
      bottle.break_sound.muted = isMuted;
      bottle.splash();
      this.applyDamageAndRemove(bottle, enemy);
    }
  }

  /**
   * Applies damage from a thrown bottle to an enemy, updates boss status bar if applicable, and schedules bottle removal.
   * @param {ThrowableObject} bottle - The throwable bottle object.
   * @param {MovableObject} enemy - The damaged enemy object.
   * @returns {void}
   */
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

  /**
   * Checks if the user threw a bottle (key D) and instantiates a throwable object.
   * @returns {void}
   */
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

  /**
   * Checks if the character has died and triggers the game over screen after a delay.
   * @returns {void}
   */
  checkGameOver() {
    if (this.character.isDead()) {
      setTimeout(() => {
        showGameOverScreen();
      }, 1000);
    }
  }

  /**
   * Checks collisions between the character and collectible coins in the level.
   * @returns {void}
   */
  checkCoinCollisions() {
    if (this.level.coins) {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          coin.collect_sound.muted = isMuted;
          let playPromise = coin.collect_sound.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {});
          }
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

  /**
   * Clears the canvas and recursively draws the background, game objects, and status bars using requestAnimationFrame.
   * @returns {void}
   */
  draw() {
    if (this.ctx === null) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawGameObjects();
    this.drawStatusBars();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws background objects taking camera translation into account.
   * @returns {void}
   */
  drawBackground() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws UI status bars on the screen (health, bottles, coins, and conditional Endboss health).
   * @returns {void}
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.coinBar);
    let endboss = this.level.enemies.find(enemyObject => enemyObject instanceof Endboss);
    if (endboss && endboss.hadFirstContact) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  /**
   * Draws all active game objects (character, enemies, clouds, throwables, bottles, coins) with camera translation.
   * @returns {void}
   */
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

  /**
   * Adds an array of objects to the map to be drawn.
   * @param {DrawableObject[]} objects - Array of objects to draw.
   * @returns {void}
   */
  addObjectToMap(objects) {
    if (objects) {
      objects.forEach((objectItem) => {
        this.addToMap(objectItem);
      });
    }
  }

  /**
   * Draws a single movable or drawable object onto the canvas, handling image flipping if necessary.
   * @param {DrawableObject} movableObject - The object to draw.
   * @returns {void}
   */
  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);
    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  /**
   * Horizontally flips the canvas context to render an object facing the opposite direction.
   * @param {DrawableObject} movableObject - The object being flipped.
   * @returns {void}
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  /**
   * Restores the canvas context and object coordinates after drawing a flipped image.
   * @param {DrawableObject} movableObject - The object that was flipped.
   * @returns {void}
   */
  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }
}