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

  throw() {
    this.speedY = 15;
    this.applyGravity();
    this.movementInterval = setInterval(() => {
      if (!this.isSplashed) {
        this.x += 10;
      }
    }, 25);
  }

  splash() {
    this.isSplashed = true;
    this.speedY = 0;
  }

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