class Chicken extends MovableObject {
  height = 60;
  width = 60;
  y = 365;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
  isDead = false;

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);

    this.x = 250 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.35;

    this.animate();
  }

  die() {
    this.isDead = true;
    this.loadImage(this.IMAGE_DEAD);
    this.speed = 0;
  }

  animate() {
    setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
