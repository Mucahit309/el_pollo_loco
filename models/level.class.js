/**
 * Represents a game level containing enemies, clouds, background scenery, bottles, coins, and boundary settings.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = (720 * 4) - 300;

    /**
     * Initializes a new instance of the Level class with the specified game elements and collectibles.
     * @param {Array} enemies - List of enemy objects present in the level.
     * @param {Array} clouds - List of cloud objects in the background.
     * @param {Array} backgroundObjects - List of static background environment objects.
     * @param {Array} [bottles=[]] - Optional list of collectible salsa bottles.
     * @param {Array} [coins=[]] - Optional list of collectible coins.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles || []; 
        this.coins = coins || [];    
    }
}