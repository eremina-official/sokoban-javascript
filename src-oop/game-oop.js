import levels from '../levels.js';
import Board from './board-oop.js';
import Info from './info-oop.js';


class Game {
  constructor(currentLevel, levelNumber) {
    this.levelArray = [...currentLevel];
    this.board = new Board(this.levelArray);
    this.info = new Info(levelNumber);
    this.calculateDirection = this.calculateDirection.bind(this);
    this.init();
  }

  bindEvents() {
    document.addEventListener('keyup', this.calculateDirection);
  }

  unbindEvents() {
    document.removeEventListener('keyup', this.calculateDirection);
  }

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
  
  move(direction) {
    const personIndex = this.levelArray.findIndex(element => element === 'person');
    const nextPersonIndex = personIndex + direction;

    if (
      this.levelArray[nextPersonIndex] === 'space' 
      || this.levelArray[nextPersonIndex] === 'target'
    ) {
      this.updateLevelArray(personIndex, nextPersonIndex);
      this.board.receiveCommand('makeStep', personIndex, nextPersonIndex);
    }

    if (this.levelArray[nextPersonIndex] === 'box') {
      const nextBoxIndex = nextPersonIndex + direction;
      if (
        this.levelArray[nextBoxIndex] === 'space' 
        || this.levelArray[nextBoxIndex] === 'target'
      ) {
        this.updateLevelArray(personIndex, nextPersonIndex, nextBoxIndex);
        this.board.receiveCommand('pushBox', personIndex, nextPersonIndex, nextBoxIndex);
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


//select level from a list
//after selecting level create a new Game instance
//Game keeps state of levelArray (model), has eventListeners for moves with buttons and keyboard, passes commands to Board to update the view, keeps state and shows the number of moves, optionally timer, restart game (update the model and send command to Board to update the view)
//Game creates a new Board instance, Boards has a logic for updating the view

export default Game;