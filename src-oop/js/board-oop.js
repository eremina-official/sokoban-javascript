
import { renderBoard } from './utils.js';

/**
 * Renders the view according to a model.
 * Receives the keyup event from the main game instance and updates the view.
 * 
 * @property {object} levelArray - array representation of the current level
 * @property {object} targets - array list of target indices
 * @property {object} board - board DOM element
 */
class Board {

  /**
   * Create a board instance.
   * 
   * @param {object} levelArray - array representation of the current level
   * @param {object} targets - array with indices of targets
   */
  constructor(levelArray, targets) {
    this.levelArray = levelArray;
    this.targets = targets;
    this.board = document.querySelector('.js-board');
    this.renderBoard = renderBoard;
    this.init();
  }

  renderTarget() {
    this.targets.forEach(target => {
      const targetSquare = document.querySelector(`.js-${target}`);
      /* js-target class is required for the game.checkWin method to work */
      targetSquare.classList.add('target', 'js-target');
    });
  }

  /**
   * Receive the keyup event from the main game instance
   * 
   * @param {string} type - type of move (make a step or push a box)
   * @param {number} personIndex - index of current person position in the levelArray model
   * @param {number} nextPersonIndex - index to which person should be positioned
   * @param {number} nextBoxIndex - index to which box should be positioned
   */
  receiveCommand(type, personIndex, nextPersonIndex, nextBoxIndex) {
    const {personY, personX} = personIndex;
    const {nextPersonY, nextPersonX} = nextPersonIndex;

    this.replaceSquareClassName(personY, personX, 'person', 'space');
    
    if (type === 'makeStep') {
      this.replaceSquareClassName(nextPersonY, nextPersonX, 'space', 'person');
    }

    if (type === 'pushBox') {
      this.replaceSquareClassName(nextPersonY, nextPersonX, 'box', 'person');
      const {nextBoxY, nextBoxX} = nextBoxIndex;
      this.replaceSquareClassName(nextBoxY, nextBoxX, 'space', 'box');
    }
  }

  replaceSquareClassName(coordY, coordX, currentClassName, nextClassName) {
    const square = document.querySelector(`.js-${coordY}-${coordX}`);
    square.classList.replace(currentClassName, nextClassName);
  }

  clearBoard() {
    this.board.textContent = '';
  }

  init() {
    this.renderBoard(this.levelArray, this.board);
    this.renderTarget();
  }
}


export default Board;
