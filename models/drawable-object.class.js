/**
 * Represents a basic drawable object on the canvas.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 250;
  height = 150;
  width = 100;

  /**
   * Loads a single image from a given path.
   * @param {string} path - The relative path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws a frame around the object for debugging collision detection.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.stroke();
    }
  }

  /**
   * Draws the object onto the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads multiple images into the image cache for animations.
   * @param {string[]} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
