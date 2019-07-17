import Board from './board-oop.js';
import Info from './info-oop.js';


/**
 * Creates a game instance with a current level.
 * Handles game logic.
 * 
 * @property {object} history - record of all game states
 * @property {object} targets - an array with indices of targets
 * @property {Board} board - a board instance
 * @property {Info} info - a info instance
 * @property {number} stepNumber - number of steps made in a current game
 * @property {object} undoButton - undo button DOM element
 * 
 */
class Game {

  /**
   * Create the game instance.
   * 
   * @param {object} currentLevel - array representation of the current level and target indices
   * @param {number} levelNumber - number of the current level
   */
  constructor(currentLevel, levelNumber) {
    this.history = [currentLevel[0]];
    this.targets = currentLevel[1];
    this.board = new Board(this.history[0], this.targets);
    this.info = new Info(levelNumber);
    this.stepNumber = 0;
    this.undoButton = document.querySelector('.js-undo');
    this.calculateDirection = this.calculateDirection.bind(this);
    this.undo = this.undo.bind(this);
    this.init();
  }

  bindEvents() {
    document.addEventListener('keyup', this.calculateDirection);
    document.addEventListener('click', this.undo);
  }

  unbindEvents() {
    document.removeEventListener('keyup', this.calculateDirection);
    document.removeEventListener('click', this.undo);
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
    const levelArray = [...this.history[this.history.length - 1]];
    const personIndex = levelArray.findIndex(element => element === 'person');
    const nextPersonIndex = personIndex + direction;

    if (levelArray[nextPersonIndex] === 'space') {
      this.updateLevelArray(levelArray, personIndex, nextPersonIndex);
      this.board.receiveCommand('makeStep', personIndex, nextPersonIndex);
      this.calculateStep();
    }

    if (levelArray[nextPersonIndex] === 'box') {
      const nextBoxIndex = nextPersonIndex + direction;
      if (levelArray[nextBoxIndex] === 'space') {
        this.updateLevelArray(levelArray, personIndex, nextPersonIndex, nextBoxIndex);
        this.board.receiveCommand('pushBox', personIndex, nextPersonIndex, nextBoxIndex);
        this.calculateStep();
        this.checkWin();
      }
    }
  }

  updateLevelArray(levelArray, personIndex, nextPersonIndex, nextBoxIndex) {
    levelArray.splice(personIndex, 1, 'space');
    levelArray.splice(nextPersonIndex, 1, 'person');
    if (nextBoxIndex) {
      levelArray.splice(nextBoxIndex, 1, 'box');
    }
    this.history.push(levelArray);
  }

  /**
   * Calculate the number of steps made and send command to Info instance to update the screen.
   */
  calculateStep() {
    this.stepNumber += 1;
    this.info.updateStep(this.stepNumber);
  }

  undo(event) {
    if (
      event.target === document.querySelector('.js-undo')
      && this.history.length > 1
    ) {
      this.history.pop();
      this.board.clearBoard();
      this.board = new Board(this.history[this.history.length - 1], this.targets);
      this.calculateStep();
    }
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