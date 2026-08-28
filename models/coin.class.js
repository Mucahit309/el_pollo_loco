/**
 * Represents a collectible coin object placed in the game level.
 * @extends MovableObject
 */
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
  collect_sound = new Audio('sounds/collectibles/collectSound.wav');

  /**
   * Initializes a new instance of the Coin class, loads coin images, 
   * sets its initial 2D coordinates, and starts the animation loop.
   * @param {number} x - The initial horizontal position of the coin.
   * @param {number} y - The initial vertical position of the coin.
   */
  constructor(x, y) {
    super();
    this.loadImage('img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Starts the animation interval to cycle through the coin frames.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 300);
  }
}