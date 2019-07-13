import levels from '../levels.js';
import Board from './board-oop.js';


class Game {
  constructor(levelArray) {
    this.levelArray = [...levelArray];
    this.board = new Board(this.levelArray);
    this.move = this.move.bind(this);
    this.init();
  }

  bindEvents() {
    document.addEventListener('keyup', this.move);
  }

  unbindEvents() {
    document.removeEventListener('keyup', this.move);
  }

  move(event) {
    const personIndex = this.levelArray.findIndex(element => element === 'person');
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

    const nextPersonIndex = personIndex + direction;

    if (this.levelArray[nextPersonIndex] === 'space') {
      this.updateLevelArray(personIndex, nextPersonIndex);
      this.board.receiveCommand('makeStep', personIndex, nextPersonIndex);
    }

    if (this.levelArray[nextPersonIndex] === 'box') {
      const nextBoxIndex = nextPersonIndex + direction;
      if (this.levelArray[nextBoxIndex] === 'space') {
        this.updateLevelArray(personIndex, nextPersonIndex, nextBoxIndex);
        this.board.receiveCommand('pushBox', personIndex, nextPersonIndex, nextBoxIndex)
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

  init() {
    this.bindEvents();
  }
}

const levelOne = new Game(levels[0]);
console.log(levelOne);

//select level from a list
//after selecting level create a new Game instance
//Game keeps state of levelArray (model), has eventListeners for moves with buttons and keyboard, passes commands to Board to update the view, keeps state and shows the number of moves, optionally timer, restart game (update the model and send command to Board to update the view)
//Game creates a new Board instance, Boards has a logic for updating the view

export default Game;