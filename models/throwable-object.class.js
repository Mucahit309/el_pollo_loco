/**
 * Represents an object (bottle) that can be thrown by the character.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  isSplashed = false;
  splashIndex = 0;
  break_sound = new Audio('sounds/throwable/bottleBreak.mp3');

  /**
   * Creates a throwable object at a specific position, loads images, sets dimensions, and starts throwing and animation loops.
   * @param {number} x - The x-coordinate to spawn the object.
   * @param {number} y - The y-coordinate to spawn the object.
   */
  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.damage = 35;
    this.throw();
    this.animate();
  }

  /**
   * Handles the flying trajectory, gravity application, and horizontal movement of the bottle.
   * @returns {void}
   */
  throw() {
    this.speedY = 7;
    this.applyGravity();
    this.movementInterval = setInterval(() => {
      if (!this.isSplashed) {
        this.x += 10;
      }
    }, 25);
  }

  /**
   * Stops the bottle from moving, flags it as splashed, halts vertical speed, and plays the break sound.
   * @returns {void}
   */
  splash() {
    this.isSplashed = true;
    this.speedY = 0;
    let playPromise = this.break_sound.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {});
    }
  }

  /**
   * Manages the continuous animation loop, cycling through rotation frames in flight or splash frames upon impact.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      if (!this.isSplashed) {
        this.playAnimation(this.IMAGES_ROTATION);
      } else if (this.splashIndex < this.IMAGES_SPLASH.length) {
        let path = this.IMAGES_SPLASH[this.splashIndex];
        this.img = this.imageCache[path];
        this.splashIndex++;
      }
    }, 1000 / 15);
  }
}