// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Player2 from './player2.js';
import Ball from './ball.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Create a player object and add it to the game
    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);

    const player2 = new Player2(this.canvas.width / 2 - 225, this.canvas.height / 2 - 25);
    this.addGameObject(player2);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    //this.camera.target = player;

    // Define the platform's width and the gap between platforms

    // Create platforms and add them to the game
    const platforms = [
      new Platform(0, this.canvas.height - 80, this.canvas.width, 100),
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    // Create ball and add them to the game
    this.addGameObject(new Ball(this.canvas.height/2, this.canvas.width/2));
    

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(250, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(450, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
