class Bottle extends MovableObject {
    width = 60;
    height = 80;
    collect_sound = new Audio('sounds/collectibles/bottleCollectSound.wav');

    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
    }
}