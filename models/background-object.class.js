/**
 * Represents a static background object (such as layers, scenery, or environment tiles) in the game world.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Initializes a new instance of the BackgroundObject class, loads its image from the provided path, 
     * and sets its initial 2D coordinates.
     * @param {string} imagePath - The file path to the background image.
     * @number {number} x - The initial horizontal position of the background object.
     * @number {number} y - The initial vertical position of the background object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}