import Board from './board-oop.js';
import Info from './info-oop.js';


/**
 * Creates a game instance with a current level.
 * Handles game logic.
 * 
 * @property {object} levelArray - array representing current level
 * @property {Board} board - a board instance
 * @property {Info} info - a info instance
 * @property {number} stepNumber - number of steps made in a current game
 * 
 */
class Game {

  /**
   * Create the game instance.
   * 
   * @param {object} currentLevel - array representation of the current level 
   * @param {number} levelNumber - number of the current level
   */
  constructor(currentLevel, levelNumber) {
    this.levelArray = [...currentLevel];
    this.board = new Board(this.levelArray);
    this.info = new Info(levelNumber);
    this.stepNumber = 0;
    this.calculateDirection = this.calculateDirection.bind(this);
    this.init();
  }

  bindEvents() {
    document.addEventListener('keyup', this.calculateDirection);
  }

  unbindEvents() {
    document.removeEventListener('keyup', this.calculateDirection);
  }

  /**
   * Find out which position in the current level array model should be updated.
   * 
   * @param {Event} event - current DOM event instance
   */
  calculateDirection(event) {
    let direction;

    switch (event.keyCode) {
      case 39:
        direction = 1;
        break;
      case 37:
        direction = -1;
        break;
      case 38:
        direction = -8;
        break;
      case 40:
        direction = 8;
        break;
    }

    this.move(direction)
  }
  
  /**
   * Handles person's moving logic.
   * 
   * @param {number} direction - a value to calculate the person's next position
   */
  move(direction) {
    const personIndex = this.levelArray.findIndex(element => element === 'person');
    const nextPersonIndex = personIndex + direction;

    if (
      this.levelArray[nextPersonIndex] === 'space' 
      || this.levelArray[nextPersonIndex] === 'target'
    ) {
      this.updateLevelArray(personIndex, nextPersonIndex);
      this.board.receiveCommand('makeStep', personIndex, nextPersonIndex);
      this.calculateStep();
    }

    if (this.levelArray[nextPersonIndex] === 'box') {
      const nextBoxIndex = nextPersonIndex + direction;
      if (
        this.levelArray[nextBoxIndex] === 'space' 
        || this.levelArray[nextBoxIndex] === 'target'
      ) {
        this.updateLevelArray(personIndex, nextPersonIndex, nextBoxIndex);
        this.board.receiveCommand('pushBox', personIndex, nextPersonIndex, nextBoxIndex);
        this.calculateStep();
        this.checkWin();
      }
    }
  }

  updateLevelArray(personIndex, nextPersonIndex, nextBoxIndex) {
    this.levelArray.splice(personIndex, 1, 'space');
    this.levelArray.splice(nextPersonIndex, 1, 'person');
    if (nextBoxIndex) {
      this.levelArray.splice(nextBoxIndex, 1, 'box');
    }
  }

  /**
   * Calculate the number of steps made and send command to Info instance to update the screen.
   */
  calculateStep() {
    this.stepNumber += 1;
    this.info.updateStep(this.stepNumber);
  }

  checkWin() {
    const targets = Array.from(document.querySelectorAll('.js-target'));
    if (targets.every(target => target.classList.contains('box'))) {
      this.unbindEvents();
      const winnerScreen = document.querySelector('.js-winner-screen');
      winnerScreen.classList.add('is-visible');
      document.querySelector('.js-winner-screen__button').focus();
    }
  }

  init() {
    this.bindEvents();
  }
}


export default Game;