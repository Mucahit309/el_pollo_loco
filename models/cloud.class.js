/**
 * Represents a background cloud object that drifts slowly across the sky.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /**
     * Initializes a new instance of the Cloud class, loads its image from the provided path, 
     * sets a random initial horizontal position, and starts the movement animation.
     * @param {string} imagePath - The file path to the cloud image.
     */
    constructor(imagePath) {
        super();
        this.loadImage(imagePath);

        this.x = Math.random() * 720;
        this.animate();
    }

    /**
     * Starts the cloud animation by triggering the leftward movement loop.
     * @returns {void}
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Continuously moves the cloud to the left at a steady frame rate.
     * @returns {void}
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}