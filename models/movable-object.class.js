/**
 * Represents a movable object that can be affected by gravity and detect collisions.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the object, pulling it down over time.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is currently in the air.
   * @returns {boolean} True if the object is above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 135;
    }
  }

  /**
   * Checks for a collision with another movable object.
   * @param {MovableObject} mo - The other object to check against.
   * @returns {boolean} True if colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Inflicts damage on the object, reducing its energy.
   * @param {number} damage - The amount of damage to inflict.
   */
  hit(damage = 20) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object was recently hurt.
   * @returns {boolean} True if hurt in the last 1 second, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (energy reached 0).
   * @returns {boolean} True if energy is 0, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Cycles through an array of images to animate the object.
   * @param {string[]} images - The array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right continuously.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object to the left continuously.
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Initiates a jump by setting the vertical speed.
   */
  jump() {
    this.speedY = 15;
  }
}
