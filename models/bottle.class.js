/**
 * Represents a collectible salsa bottle object placed on the ground in the game level.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    width = 60;
    height = 80;
    collect_sound = new Audio('sounds/collectibles/bottleCollectSound.wav');

    /**
     * Initializes a new instance of the Bottle class, loads its ground image, 
     * and sets its initial 2D coordinates.
     * @param {number} x - The initial horizontal position of the bottle.
     * @param {number} y - The initial vertical position of the bottle.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = x;
        this.y = y;
    }
}