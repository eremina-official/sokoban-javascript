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

  /**
   * Receive the keyup event from the main game instance
   * @param {number} personIndex - index of current person position in the levelArray model
   * @param {number} nextPersonIndex - index to which person should be positioned
   * @param {string} type - type of move (make a step or push a box)
   */
  receiveCommand(personIndex, nextPersonIndex, type) {
    if (type === 'makeStep') {
      const nextPersonPosition = document.querySelector(`.js-${nextPersonIndex}`);
      document.querySelector(`.js-${personIndex}`).textContent = '';
      nextPersonPosition.textContent = 'p';
    }
  }

  init() {
    this.renderBoard();
    this.renderPerson();
  }
}


export default Board;
