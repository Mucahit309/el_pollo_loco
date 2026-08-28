/**
 * Represents a standard normal chicken enemy in the game.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  offset = {
    top: 5,
    left: 10,
    right: 10,
    bottom: 5
  };

  height = 60;
  width = 60;
  y = 365;
  
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
  
  dead_sound = new Audio('sounds/chicken/chickenDead.mp3');
  soundPlayed = false;

  /**
   * Initializes a new instance of the Chicken class, loads walking images, 
   * sets random horizontal positioning and movement speed, and starts the animation intervals.
   */
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 250 + Math.random() * 3000;
    this.speed = 0.15 + Math.random() * 0.35;

    this.energy = 25;

    this.animate();
  }

  /**
   * Starts the intervals for continuous movement to the left and rendering walking or dead animations/sounds.
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
        if (!this.soundPlayed) {
          let playPromise = this.dead_sound.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {});
          }
          this.soundPlayed = true;
        }
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}