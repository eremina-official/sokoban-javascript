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
    this.history = this.replaceTargetsWithSpaces(currentLevel);
    this.targets = currentLevel.reduce(this.getTargets, []);
    this.board = new Board(this.history[0], this.targets);
    this.info = new Info(levelNumber);
    this.stepNumber = 0;
    this.undoButton = document.querySelector('.js-undo');
    this.getDirection = this.getDirection.bind(this);
    this.preventPageScroll = this.preventPageScroll.bind(this);
    this.moveWithNavButtons = this.moveWithNavButtons.bind(this);
    this.undo = this.undo.bind(this);
    this.init();
  }

  bindEvents() {
    document.addEventListener('keyup', this.getDirection);
    document.addEventListener('keydown', this.preventPageScroll);
    document.addEventListener('click', this.moveWithNavButtons);
    document.addEventListener('click', this.undo);
  }

  unbindEvents() {
    document.removeEventListener('keyup', this.getDirection);
    document.removeEventListener('keydown', this.preventPageScroll);
    document.removeEventListener('click', this.moveWithNavButtons);
    document.removeEventListener('click', this.undo);
  }

  preventPageScroll(event) {
    if (
      event.keyCode !== 39 &&
      event.keyCode !== 37 &&
      event.keyCode !== 38 &&
      event.keyCode !== 40 
    ) {
      return;
    }
    event.preventDefault();
  }

  replaceTargetsWithSpaces(currentLevel) {
    return currentLevel.map(row => row.map(element => {
      return element = (element === 'target') 
        ? 'space' 
        : element;
    }));
  }

  replaceSpacesWithOuterInRows(currentLevel) {
    return currentLevel.map((row, rowIndex) => {
      if (rowIndex === 0 || rowIndex === currentLevel.length - 1) {
        return row;
      } else {
        const leftWallIndex = row.findIndex(element => element === 'wall');
        const rightWallIndex = row.lastIndexOf('wall');
        return row.map((element, elementIndex) => {
          return element = (elementIndex < leftWallIndex || elementIndex > rightWallIndex)
            ? 'outer'
            : element;
        });
      }
    });

    result = this.mapColumns(result, 0, 1);
    result = this.mapColumns(result, result.length -1, -1);

    return result;
  }

  mapColumns(currentLevel, rowIndex, increment) {
    const spaceIndex = currentLevel[rowIndex].findIndex(element => element === 'space');
    if (spaceIndex !== -1) {
      currentLevel[rowIndex][spaceIndex] = 'outer';
      let nextRowIndex = rowIndex + increment;
      while (currentLevel[nextRowIndex][spaceIndex] === 'space') {
        currentLevel[nextRowIndex][spaceIndex] = 'outer';
        nextRowIndex += increment;
      }
      return this.mapColumns(currentLevel, rowIndex, increment);
    } else {
      return currentLevel;
    }
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
  getDirection(event) {
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

    event.preventDefault();
    const direction = this.calculateDirection(event.keyCode);

    this.move(direction);
  }

  /**
   * Calculate direction of person's moves when the navigation buttons are pressed.
   * 
   * @param {event} event - DOM event instance
   */
  moveWithNavButtons(event) {
    if (!event.target.classList.contains('js-nav-button')) {
      return;
    }
  
    const navButton = +event.target.dataset.nav;
    const direction = this.calculateDirection(navButton);
    
    this.move(direction);
  }

  /**
   * 
   * @param {number} expr - expression to check against cases
   * @returns {object} - values to calculate person's next position
   */
  calculateDirection(expr) {
    const direction = {y: 0, x: 0};

    switch (expr) {
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

    return direction;
  }
  
  /**
   * Handles person's moving logic.
   * 
   * @param {object} direction - values to calculate the person's next position
   */
  move(direction) {
    const levelArray = this.getDeepCopy(this.history[this.history.length - 1]);
    const currentPersonPosition = this.getPersonPosition(this.history[this.history.length - 1]);
    const {personY, personX} = currentPersonPosition;
    const {y, x} = direction;
    const nextPersonPosition = {nextPersonY: personY + y, nextPersonX: personX + x};
    const {nextPersonY, nextPersonX} = nextPersonPosition;
    const nextBoxPosition = {nextBoxY: nextPersonY + y, nextBoxX: nextPersonX + x};
    const {nextBoxY, nextBoxX} = nextBoxPosition;

    /* 
      This block is needed in case there is no wall on the edge of the warehouse 
      and the current person position is on the first or last element or row of level array. 
      In this case nextPerson[nextPersonY] evaluates to undefined and reading its x property gives TypeError.
      Todo: extract to a separate function
    */
    if (
      nextPersonY < 0 ||
      nextPersonY > levelArray.length - 1 ||
      nextBoxY < 0 ||
      nextBoxY > levelArray.length - 1
    ) {
      return;
    }

    if (levelArray[nextPersonY][nextPersonX] === 'space') {
      this.makeMove(levelArray, 'makeStep', currentPersonPosition, nextPersonPosition);
    }

    if (
      levelArray[nextPersonY][nextPersonX] === 'box' &&
      levelArray[nextBoxY][nextBoxX] === 'space'
    ) {
      this.makeMove(levelArray, 'pushBox', currentPersonPosition, nextPersonPosition, nextBoxPosition);
      this.checkWin();
    }
  }

  /**
   * 
   * @param {object} levelArray - array representation of the current level
   * @param {string} moveType - type of move (make a step or push a box)
   * @param {object} currentPersonPosition - coordinates of the current person position
   * @param {object} nextPersonPosition - coordinates of the next person position
   * @param {object} nextBoxPosition - coordinates of the next box position
   */
  makeMove(levelArray, moveType, currentPersonPosition, nextPersonPosition, nextBoxPosition) {
    this.updateLevelArray(levelArray, currentPersonPosition, nextPersonPosition, nextBoxPosition);
    this.board.receiveCommand(moveType, currentPersonPosition, nextPersonPosition, nextBoxPosition);
    this.calculateStep();
  }

  /**
   * Updates level model according to the coordinates calculated in getDirection and move methods.
   * 
   * @param {object} levelArray - array representation of the current level
   * @param {object} currentPersonPosition - coordinates of the current person position
   * @param {object} nextPersonPosition - coordinates of the next person position
   * @param {object} nextBoxPosition - coordinates of the next box position
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
