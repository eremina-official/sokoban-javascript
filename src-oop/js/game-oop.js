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
 */
class Game {

  /**
   * Create the game instance.
   * 
   * @param {object} currentLevel - array representation of the current level
   * @param {number} levelNumber - number of the current level
   */
  constructor(currentLevel, levelNumber) {
    this.history = this.mapLevel(currentLevel);
    this.targets = currentLevel.reduce(this.getTargets, []);
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

  mapLevel(currentLevel) {
    const result = [ currentLevel.map(row => row.map(element => {
      return element = (element === 'target') 
      ? 'space' 
      : element;
    })) ];

    return result;
  }

  getTargets(accRow, currentRow, currentRowIndex) {
    const rowTargets = currentRow.reduce((accValue, currentValue, currentValueIndex) => {
      if (currentValue === 'target') {
        accValue = [...accValue, `${currentRowIndex}-${currentValueIndex}`];
      }
      return accValue;
    }, []);
    
    accRow = [...accRow, ...rowTargets];
    return accRow;
  }

  getPersonPosition(currentLevel) {
    let personPosition = {};

    currentLevel.forEach((row, rowIndex) => {
      const personIndex = row.findIndex(item => item === 'person');
      if (personIndex !== -1) {
        personPosition.personY = rowIndex;
        personPosition.personX = personIndex;
      }
    });

    return personPosition;
  }

  getDeepCopy(levelArray) {
    return levelArray.map(row => [...row]);
  }

  /**
   * Find out which position in the current level model should be updated.
   * 
   * @param {Event} event - current DOM event instance
   */
  calculateDirection(event) {
    /* This block is added because otherwise this.move is called on any keypress.
    Todo: refactor. */
    if (
      event.keyCode !== 39 &&
      event.keyCode !== 37 &&
      event.keyCode !== 38 &&
      event.keyCode !== 40 
    ) {
      return;
    }

    const direction = {y: 0, x: 0};

    switch (event.keyCode) {
      case 39:
        direction.x = 1;
        break;
      case 37:
        direction.x = -1;
        break;
      case 38:
        direction.y = -1;
        break;
      case 40:
        direction.y = 1;
        break;
    }

    this.move(direction);
  }
  
  /**
   * Handles person's moving logic.
   * 
   * @param {number} direction - a value to calculate the person's next position
   */
  move(direction) {
    const levelArray = this.getDeepCopy(this.history[this.history.length - 1]);
    const currentPersonPosition = this.getPersonPosition(this.history[this.history.length - 1]);
    const {personY, personX} = currentPersonPosition;
    const {y, x} = direction;
    const nextPersonPosition = {nextPersonY: personY + y, nextPersonX: personX + x};

    if (
      nextPersonPosition.nextPersonY < 0 ||
      nextPersonPosition.nextPersonY > levelArray.length - 1
    ) {
      return;
    }

    if (levelArray[personY + y][personX + x] === 'space') {
      this.updateLevelArray(levelArray, currentPersonPosition, nextPersonPosition);
      this.board.receiveCommand('makeStep', currentPersonPosition, nextPersonPosition);
      this.calculateStep();
    }

    if (levelArray[personY + y][personX + x] === 'box') {
      const {nextPersonY, nextPersonX} = nextPersonPosition;
      const nextBoxPosition = {nextBoxY: nextPersonY + y, nextBoxX: nextPersonX + x};
      const {nextBoxY, nextBoxX} = nextBoxPosition;

      if (levelArray[nextBoxY][nextBoxX] === 'space') {
        this.updateLevelArray(levelArray, currentPersonPosition, nextPersonPosition, nextBoxPosition);
        this.board.receiveCommand('pushBox', currentPersonPosition, nextPersonPosition, nextBoxPosition);
        this.calculateStep();
        this.checkWin();
      }
    }
  }

  /**
   * Updates level model according to the indices calcualted in calculateDirection and move methods.
   * 
   * @param {object} levelArray - array representaion of the current level
   * @param {number} personIndex - current index of the person
   * @param {number} nextPersonIndex - next index of the person
   * @param {number} nextBoxIndex - next index of the box
   */
  updateLevelArray(levelArray, currentPersonPosition, nextPersonPosition, nextBoxPosition) {
    const {personY, personX} = currentPersonPosition;
    const {nextPersonY, nextPersonX} = nextPersonPosition;

    levelArray[personY].splice(personX, 1, 'space');
    levelArray[nextPersonY].splice(nextPersonX, 1, 'person');
    if (nextBoxPosition) {
      const {nextBoxY, nextBoxX} = nextBoxPosition;
      levelArray[nextBoxY].splice(nextBoxX, 1, 'box');
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

  /**
   * Undo the pervious person's move.
   *  
   * @param {event} event - DOM event instance
   */
  undo(event) {
    if (
      event.target === this.undoButton
      && this.history.length > 1
    ) {
      this.history.pop();
      this.board.clearBoard();
      this.board = new Board(this.history[this.history.length - 1], this.targets);
      this.calculateStep();
    }
  }

  /**
   * It is not possible to add document.querySelectorAll('.js-target')
   * to the game instance properties, since document.querySelectorAll method returns a static node list
   * and the class names of the elements won't be updated when they are updated in the DOM.
   */
  checkWin() {
    const targets = Array.from(document.querySelectorAll('.js-target'));
    if (targets.every(target => target.classList.contains('box'))) {
      const winnerScreen = document.querySelector('.js-winner-screen');
      winnerScreen.classList.remove('winner-screen-is-hidden');
      document.querySelector('.js-winner-screen__button').focus();
    }
  }

  init() {
    this.bindEvents();
  }
}


export default Game;
