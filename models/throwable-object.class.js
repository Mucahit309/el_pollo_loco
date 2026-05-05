class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    constructor(x, y) {
        super();
        this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.damage = 35;
        this.throw();
    }

    throw() {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}