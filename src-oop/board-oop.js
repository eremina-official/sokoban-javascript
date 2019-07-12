/**
 * Renders the view according to a model.
 * Receives the keyup event from the main game instance and updates the view.
 */
class Board {
  constructor(levelArray) {
    this.levelArray = levelArray;
    this.init();
  }

  renderBoard() {
    const board = document.querySelector('.js-board');

    this.levelArray.forEach((item, itemIndex) => {
      const square = document.createElement('div');
      square.setAttribute('class', `square js-square ${item} js-${item} js-${itemIndex}`);
      board.appendChild(square);
    });
  }

  renderPerson() {
    const person = document.querySelector('.js-person');
    person.textContent = 'p';
  }

  renderTarget() {
    const target = document.querySelector('.js-target');
    const targetSign = document.createElement('div');
    target.appendChild(targetSign);
  }

  /**
   * Receive the keyup event from the main game instance
   * @param {number} personIndex - index of current person position in the levelArray model
   * @param {number} nextPersonIndex - index to which person should be positioned
   * @param {string} type - type of move (make a step or push a box)
   */
  receiveCommand(type, personIndex, nextPersonIndex, nextBoxIndex) {
    const nextPersonPosition = document.querySelector(`.js-${nextPersonIndex}`);
    document.querySelector(`.js-${personIndex}`).textContent = '';
    document.querySelector(`.js-${personIndex}`).classList.replace('person', 'space');

    if (type === 'makeStep') {
      nextPersonPosition.textContent = 'O';
      nextPersonPosition.classList.replace('space', 'person');
    }

    if (type === 'pushBox') {
      nextPersonPosition.textContent = 'O';
      nextPersonPosition.classList.replace('box', 'person');
      const nextBoxPosition = document.querySelector(`.js-${nextBoxIndex}`);
      nextBoxPosition.classList.replace('space', 'box');
    }
  }

  init() {
    this.renderBoard();
    this.renderPerson();
  }
}


export default Board;
