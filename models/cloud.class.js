class Cloud extends MovableObject {
        y = 20;
        width = 500;
        height = 250;

    constructor(imagePath) {
        super();
        this.loadImage(imagePath);

        this.x = -200 + Math.random() * 720;
    }
}