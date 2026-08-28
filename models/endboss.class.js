/**
 * Represents the Endboss enemy at the end of the level.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    y = 100;
    height = 350;
    width = 250;
    hadFirstContact = false;
    speed = 0.5;
    isDeadTriggered = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    approach_sound = new Audio('sounds/endboss/endbossApproach.wav');
    dead_sound = new Audio('sounds/chicken/chickenDead.mp3');

    /**
     * Initializes a new instance of the Endboss class, loads alert images, 
     * caches all other animation frames, sets horizontal spawn position, energy, and starts the loops.
     */
    constructor() {
        super();
        this.loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.energy = 100;
        this.animate();
    }

  /**
   * Starts the Endboss logic, handling movement and animation intervals.
   * @returns {void}
   */
  animate() {
    setInterval(() => this.handleMovement(), 300 / 60);
    setInterval(() => this.handleAnimation(), 200);
  }

  /**
   * Manages movement logic for the Endboss, checking proximity to the character and moving left when active.
   * @returns {void}
   */
  handleMovement() {
    this.checkFirstContact();
    if (this.hadFirstContact && !this.isDead()) {
      this.moveLeft();
      this.otherDirection = false;
    }
  }

  /**
   * Checks if the main character is close enough to trigger the boss fight and play the approach sound.
   * @returns {void}
   */
  checkFirstContact() {
    if (world && world.character && this.x - world.character.x < 500 && !this.isDead()) {
      if (!this.hadFirstContact) {
        this.approach_sound.play();
      }
      this.hadFirstContact = true;
    }
  }

  /**
   * Manages animation states for the Endboss based on its current health and contact status.
   * @returns {void}
   */
  handleAnimation() {
    if (this.isDead()) {
      this.handleDead();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.hadFirstContact) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.playAnimation(this.IMAGES_ALERT); 
    }
  }

  /**
   * Handles the death sequence of the Endboss, playing the death animation, sound effect, and triggering the win screen.
   * @returns {void}
   */
  handleDead() {
    this.playAnimation(this.IMAGES_DEAD);
    if (!this.isDeadTriggered) {
      this.dead_sound.play();
      this.isDeadTriggered = true;
      setTimeout(() => showWinScreen(), 1000);
    }
  }
}