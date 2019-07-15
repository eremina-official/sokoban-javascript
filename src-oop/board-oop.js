/**
 * Renders the view according to a model.
 * Receives the keyup event from the main game instance and updates the view.
 * 
 * @property {object} levelArray = array representation of the current level
 */
class Board {

  /**
   * Create a board instance.
   * 
   * @param {object} levelArray - array representation of the current level 
   */
  constructor(levelArray) {
    this.levelArray = levelArray;
    this.init();
  }

  renderBoard() {
    const board = document.querySelector('.js-board');

    this.levelArray.forEach((item, itemIndex) => {
      const square = document.createElement('div');
      square.setAttribute('class', `square ${item} js-${item} js-${itemIndex}`);
      board.appendChild(square);
    });
  }

  renderTarget() {
    const targets = document.querySelectorAll('.js-target');
    targets.forEach(target => {
      const targetSign = document.createElement('div');
      targetSign.setAttribute('class', 'styled-target');
      target.appendChild(targetSign);
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
    const nextPersonPosition = document.querySelector(`.js-${nextPersonIndex}`);
    document.querySelector(`.js-${personIndex}`).classList.replace('person', 'space');

    if (type === 'makeStep') {
      nextPersonPosition.classList.replace('space', 'person');
      nextPersonPosition.classList.replace('target', 'person');
    }

    if (type === 'pushBox') {
      nextPersonPosition.classList.replace('box', 'person');
      const nextBoxPosition = document.querySelector(`.js-${nextBoxIndex}`);
      nextBoxPosition.classList.replace('space', 'box');
      nextBoxPosition.classList.replace('target', 'box');
    }
  }

  init() {
    this.renderBoard();
    this.renderTarget();
  }
}


export default Board;
