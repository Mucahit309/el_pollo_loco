/**
 * Represents the main playable character (Pepe) in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
  offset = {
    top: 120,
    left: 40,
    right: 40,
    bottom: 15
  };

  height = 300;
  width = 150;
  y = 135;
  speed = 5;
  collectedBottles = 0;
  lastMoveTime = 0;
  acceleration = 4;
  currentJumpFrame = 0;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-42.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  walking_sound = new Audio("sounds/character/characterRun.mp3");
  jumping_sound = new Audio("sounds/character/characterJump.wav");
  dead_sound = new Audio("sounds/character/characterDead.wav");
  hurt_sound = new Audio("sounds/character/characterDamage.mp3");
  snoring_sound = new Audio("sounds/character/characterSnoring.mp3");

  /**
   * Initializes a new instance of the Character class, loads images, sets up gravity and animations.
   */
  constructor() {
    super();
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.resetIdleTimer();
    this.animate();
  }

  /**
   * Resets the idle timer to the current timestamp and pauses the snoring sound.
   * @returns {void}
   */
  resetIdleTimer() {
    this.lastMoveTime = new Date().getTime();
    if (this.snoring_sound) {
      this.snoring_sound.pause();
    }
  }

  /**
   * Starts the intervals for handling character movement and animations.
   * @returns {void}
   */
  animate() {
    setInterval(() => this.handleMovement(), 1000 / 60);
    setInterval(() => this.handleAnimation(), 1000 / 10);
  }

  /**
   * Handles ongoing movement logic, boundary checks, and camera tracking for the character.
   * @returns {void}
   */
  handleMovement() {
    this.walking_sound.pause();
    this.checkHorizontalMove();
    this.checkJump();
    if (this.y > 135) {
      this.y = 135;
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks keyboard input for moving right or left within level bounds.
   * @returns {void}
   */
  checkHorizontalMove() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveCharacterRight();
    } else if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveCharacterLeft();
    }
  }

  /**
   * Moves the character to the right, resets the idle timer, and plays walking sound if grounded.
   * @returns {void}
   */
  moveCharacterRight() {
    this.moveRight();
    this.resetIdleTimer();
    if (!this.isAboveGround()) {
      this.walking_sound.play();
    }
  }

  /**
   * Moves the character to the left, resets the idle timer, and plays walking sound if grounded.
   * @returns {void}
   */
  moveCharacterLeft() {
    this.moveLeft();
    this.resetIdleTimer();
    if (!this.isAboveGround()) {
      this.walking_sound.play();
    }
  }

  /**
   * Checks if the jump key (SPACE) is pressed and the character is grounded to trigger a jump.
   * @returns {void}
   */
  checkJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.jumping_sound.play();
      this.resetIdleTimer();
    }
  }

  /**
   * Triggers a vertical jump by setting an upward speed.
   * @returns {void}
   */
  jump() {
    this.speedY = 35;
  }

  /**
   * Manages the visual state and playback of animations based on health status (dead, hurt, or alive).
   * @returns {void}
   */
  handleAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.dead_sound.play();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.hurt_sound.play();
    } else {
      this.handleAliveAnimation();
    }
  }

  /**
   * Manages animations when the character is alive (jumping, walking, or idling).
   * @returns {void}
   */
  handleAliveAnimation() {
    if (this.isAboveGround()) {
      this.playJumpAnimation();
    } else {
      this.currentJumpFrame = 0;
      
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.handleIdleAnimation();
      }
    }
  }

  /**
   * Progresses through the custom jump animation frame by frame.
   * @returns {void}
   */
  playJumpAnimation() {
    let path = this.IMAGES_JUMPING[this.currentJumpFrame];
    this.img = this.imageCache[path];
    
    if (this.currentJumpFrame < this.IMAGES_JUMPING.length - 1) {
      this.currentJumpFrame++;
    }
  }

  /**
   * Handles standard idle or long idle (with snoring sound) animations based on inactivity duration.
   * @returns {void}
   */
  handleIdleAnimation() {
    let timePassed = new Date().getTime() - this.lastMoveTime;
    if (timePassed >= 15000) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      this.snoring_sound.play();
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Overrides gravity application to include a terminal falling velocity limit for the character.
   * @returns {void}
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        
        if (this.speedY < -20) {
          this.speedY = -20; 
        }
      }
    }, 1000 / 25);
  }
}