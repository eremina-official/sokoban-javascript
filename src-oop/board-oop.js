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

  receiveCommand() {

  }

  init() {
    this.renderBoard();
    this.renderPerson();
  }
}


export default Board;
