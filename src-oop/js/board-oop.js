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
    this.init();
  }

  renderBoard() {
    const fragment = document.createDocumentFragment();

    this.levelArray.forEach((row, rowIndex) => {
      const rowElement = document.createElement('div');
      rowElement.setAttribute('class', 'board__row');

      row.forEach((item, itemIndex) => {
        const squareElement = document.createElement('div');
        /* .js-itemIndex class is used in game.checkWin(), this.receiveCommand methods */
        squareElement.setAttribute('class', `square ${item} js-${rowIndex}-${itemIndex}`);
        rowElement.appendChild(squareElement);
      });

      fragment.appendChild(rowElement);
    });

    this.board.appendChild(fragment);
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
    const nextPersonPosition = document.querySelector(`.js-${nextPersonIndex}`);
    document.querySelector(`.js-${personIndex}`).classList.replace('person', 'space');

    if (type === 'makeStep') {
      nextPersonPosition.classList.replace('space', 'person');
    }

    if (type === 'pushBox') {
      nextPersonPosition.classList.replace('box', 'person');
      const nextBoxPosition = document.querySelector(`.js-${nextBoxIndex}`);
      nextBoxPosition.classList.replace('space', 'box');
    }
  }

  clearBoard() {
    this.board.textContent = '';
  }

  init() {
    this.renderBoard();
    this.renderTarget();
  }
}


export default Board;
