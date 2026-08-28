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
   * Applies gravity to the object, pulling it down over time at regular intervals.
   * @returns {void}
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
   * Checks if the object is currently in the air (above the ground).
   * @returns {boolean} True if the object is above ground or a throwable object, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 135;
    }
  }

  /**
   * Checks for an axis-aligned bounding box collision with another movable object using custom offsets.
   * @param {MovableObject} mo - The other object to check collision against.
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
   * Inflicts damage on the object, reducing its energy and updating the last hit timestamp.
   * @param {number} [damage=20] - The amount of damage to inflict.
   * @returns {void}
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
   * Checks if the object was recently hurt within the last 1 second.
   * @returns {boolean} True if hurt in the last 1 second, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (its energy has reached 0).
   * @returns {boolean} True if energy is 0, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Cycles through an array of image paths to animate the object frame by frame.
   * @param {string[]} images - The array of image paths for the animation sequence.
   * @returns {void}
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object continuously to the right and sets facing direction to normal.
   * @returns {void}
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * Moves the object continuously to the left and sets facing direction to flipped.
   * @returns {void}
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * Initiates a standard jump by setting an upward vertical speed.
   * @returns {void}
   */
  jump() {
    this.speedY = 15;
  }
}