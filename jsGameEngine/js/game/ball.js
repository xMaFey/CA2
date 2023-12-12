import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';
import Platform from './platform.js';
import Player from './player.js';
import Player2 from './player2.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';

// Defining a class Ball that extends GameObject
class Ball extends GameObject {
    // Constructor initializes the game object and add necessary components
    constructor(x, y) {
      super(x, y); // Call parent's constructor
      this.renderer = new Renderer('blue', 30, 30); // Add renderer
      this.addComponent(this.renderer);
      this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
      this.addComponent(new Input()); // Add input for handling user input
      // Initialize all the ball specific properties
      this.velocity = 300;
      this.inAir = false;
      this.isOnPlatform = false;
      this.isGamepadMovement = false;
      this.isGamepadJump = false;
    }
  
    // The update function runs every frame and contains game logic
    update(deltaTime) {
      const physics = this.getComponent(Physics); // Get physics component
      const input = this.getComponent(Input); // Get input component
  
      this.handleGamepadInput(input);
      

       // Handle collisions with player2
       const player = this.game.gameObjects.filter((obj) => obj instanceof Player2);
       for (const player2 of player){
         if(physics.isColliding(player2.getComponent(Physics))){
             this.x = player2.x + player2.renderer.width;
         }
       }

       // Handle collisions with player
       const players = this.game.gameObjects.filter((obj) => obj instanceof Player);
       for (const player of players){
         if(physics.isColliding(player.getComponent(Physics))){
             this.x = player.x - this.renderer.width;
             this.velocity = 300;
         }
       }

        // Handle collisions with platforms
        this.isOnPlatform = false;  // Reset this before checking collisions with platforms
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for (const platform of platforms) {
            if (physics.isColliding(platform.getComponent(Physics))) {
            if (!this.inAir) {
                physics.velocity.y = 0;
                physics.acceleration.y = 0;
                this.y = platform.y - this.renderer.height;
                this.isOnPlatform = true;
        }
      }
    }

    //   // Check if the ball is in the Players net
    //   if(this.x > this.canvas.width - 20){
    //     this.resetBallState();
    //   }
  
      super.update(deltaTime);
    }
  
    handleGamepadInput(input){
      const gamepad = input.getGamepad(); // Get the gamepad input
      const physics = this.getComponent(Physics); // Get physics component

      if (gamepad) {
        // Reset the gamepad flags
        this.isGamepadMovement = false;
        this.isGamepadJump = false;
  
        // Handle movement
        const horizontalAxis = gamepad.axes[0];
        // Move right
        if (horizontalAxis > 0.1) {
          this.isGamepadMovement = true;
          physics.velocity.x = 200;
          this.direction = -1;
        } 
        // Move left
        else if (horizontalAxis < -0.1) {
          this.isGamepadMovement = true;
          physics.velocity.x = -200;
          this.direction = 1;
        } 
        // Stop
        else {
          physics.velocity.x = 0;
        }
        
        // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
        if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
          this.isGamepadJump = true;
          this.startJump();
        }
      }
    }
  
    collect(collectible) {
      // Handle collectible pickup
      this.score += collectible.value;
      console.log(`Score: ${this.score}`);
      this.emitCollectParticles(collectible);
    }
  
    emitCollectParticles() {
      // Create a particle system at the player's position when a collectible is collected
      const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
      this.game.addGameObject(particleSystem);
    }
  
    resetBallState() {
      // Reset the player's state, repositioning it and nullifying movement
      this.x = this.game.canvas.width / 2;
      this.y = this.game.canvas.height / 2;
      this.getComponent(Physics).velocity = { x: 0, y: 0 };
      this.getComponent(Physics).acceleration = { x: 0, y: 0 };
      this.isOnPlatform = false;
    }
  
    resetGame() {
      // Reset the game state, which includes the player's state
      this.lives = 3;
      this.score = 0;
      this.resetPlayerState();
    }
  }
  
  export default Ball;
  