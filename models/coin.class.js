class Coin extends MovableObject {
  offset = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40
  };
  width = 100;
  height = 100;
  IMAGES_COIN = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  constructor(x, y) {
    super();
    this.loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 300);
  }
}