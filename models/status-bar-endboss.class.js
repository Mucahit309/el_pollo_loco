/**
 * Represents the status bar for tracking and displaying the health of the Endboss on the user interface.
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {
  IMAGES = [
    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
  ];

  percentage = 100;

  /**
   * Initializes a new instance of the StatusBarEndboss class, loads status bar images, 
   * sets screen coordinates, dimensions, and initializes the percentage to 100.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = 60;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Updates the current Endboss health percentage and changes the displayed image accordingly.
   * @param {number} percentage - The current percentage value of the Endboss health (0 to 100).
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the correct array index for the status bar image based on the current percentage.
   * @returns {number} The index corresponding to the appropriate image level (0 to 5).
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}