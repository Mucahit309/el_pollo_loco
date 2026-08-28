/**
 * Represents a small chicken enemy in the game.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
  offset = {
    top: -5,
    left: -5,
    right: -5,
    bottom: -5
  };

  height = 40;
  width = 40;
  y = 385;
  
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  /**
   * Initializes a new instance of the SmallChicken class, loads walking images, 
   * sets random horizontal positioning and movement speed, and starts the animation intervals.
   */
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 250 + Math.random() * 3000;
    this.speed = 0.05 + Math.random() * 0.15;

    this.energy = 25;

    this.animate();
  }

  /**
   * Starts the intervals for continuous movement to the left and rendering walking or dead animations.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      if (!this.isDead()) {
        this.moveLeft();
        this.otherDirection = false;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.loadImage(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}