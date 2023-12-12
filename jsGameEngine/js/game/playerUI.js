import GameObject from '../engine/gameobject.js';
import UI from '../engine/ui.js';
import Player from './player.js';
import Player2 from './player.js';

// The PlayerUI class extends GameObject.
class PlayerUI extends GameObject {
  constructor(x, y) {
    super(x, y); // Call the constructor of the GameObject class.

    // Create a new UI component with initial text and add it to this object's components.
    this.uiComponent = new UI('Score: 0 Score: 0', x, y);
    this.addComponent(this.uiComponent);
  }

  // The update method is called every frame.
  update(deltaTime) {
    // Find the player object in the game's gameObjects array.
    const player = this.game.gameObjects.find((obj) => obj instanceof Player);
    const player2 = this.game.gameObjects.find((obj) => obj instanceof Player2);

    // Update the text of the UI component to reflect the player's current lives and score.
    this.uiComponent.setText(`Score: ${player.score} Score: ${player2.score}`);
  }
}

export default PlayerUI; // Export the PlayerUI class for use in other modules.
