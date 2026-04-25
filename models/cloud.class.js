class Cloud extends MovableObject {
        y = 20;
        width = 500;
        height = 250;

    constructor(imagePath) {
        super();
        this.loadImage(imagePath);

        this.x = Math.random() * 720;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}