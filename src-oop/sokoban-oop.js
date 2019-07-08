const level = [
  
    'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall',
  
    'wall', 'person', 'space', 'space', 'space','space', 'space', 'wall',

    'wall', 'space', 'space', 'space', 'space', 'space', 'space', 'wall',

    'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'
];

//render game board according to level array: define class Board, constructor takes level array as parameter, render method creates squares divs for rows and assigns class names to identify with level array elements and paints walls according to level array elements
//add event listener with delegation, how to detect a single square?
//moving logic: 0 are walls, if 0 in level array person can not move, if 1 it is changed to person and board is updated accordingly


class Board {
  constructor(levelArray) {
    this.levelArray = levelArray;
    this.move = this.move.bind(this);
  }

  renderBoard() {
    const board = document.querySelector('.js-board');

    this.levelArray.forEach((item, itemIndex) => {
      const square = document.createElement('div');
      square.setAttribute('class', `square js-square ${item} js-${itemIndex}`);
      board.appendChild(square);
    });
  }

  renderPerson() {
    const person = document.querySelector('.person');
    person.textContent = 'p';
  }

  bindEvents() {
    document.addEventListener('keyup', this.move);
  }

  unbindEvents() {
    document.removeEventListener('keyup', this.move);
  }

  move(event) {
    if (event.keyCode === 39) {
      const personIndex = this.levelArray.findIndex(element => element === 'person');
      
      if (this.levelArray[personIndex + 1] === '') {
        //box
      }
      
      if (this.levelArray[personIndex + 1] === 'space') {
        this.levelArray.splice(personIndex, 1, 'space');
        this.levelArray.splice(personIndex + 1, 1, 'person');
        const currentPersonPosition = document.querySelector(`.js-${personIndex}`);
        const nextPersonPosition = currentPersonPosition.nextElementSibling;
        currentPersonPosition.textContent = '';
        nextPersonPosition.textContent = 'p';
      } 
      else  {
        return;
      }
    }
  }

  init() {
    this.renderBoard();
    this.renderPerson();
    this.bindEvents();
  }
}

const levelOne = new Board(level);
console.log(levelOne.levelArray);
levelOne.init();
