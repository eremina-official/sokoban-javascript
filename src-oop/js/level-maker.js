/**
 * Creates an instance of a sokoban levels contructor.
 * 
 * @property {object} boardRowSelectElement - select DOM element
 * @property {object} boardColumnSelectElement - select DOM element
 * @property {object} boardSizeSubmitButtonElement - button DOM element
 * @property {object} levelMakerBoardElement - board DOM element
 * @property {object} iframeContainerElement - iframe DOM element
 * @property {object} selectOptionsRange - range of board rows and columns amount
 * @property {string} squareInputCheckedValue - value of currently selected radio input with name="board-square-input"
 */

class LevelMaker {
  constructor() {
    this.boardRowSelectElement = document.querySelector('#board-row');
    this.boardColumnSelectElement = document.querySelector('#board-column');
    this.boardSizeSubmitButtonElement = document.querySelector('.js-board-size-submit');
    this.levelMakerBoardElement = document.querySelector('.js-level-maker-board');
    this.selectOptionsRange = {bottom: 6, top: 30};
    this.squareInputCheckedValue = 'wall';
    this.handleBoardSize = this.handleBoardSize.bind(this);
    this.handleSquareInputChange = this.handleSquareInputChange.bind(this);
    this.handleSquareChange = this.handleSquareChange.bind(this);
    this.bindEvents();
    this.renderSelectOptions(this.selectOptionsRange, this.boardRowSelectElement);
    this.renderSelectOptions(this.selectOptionsRange, this.boardColumnSelectElement);
  }

  bindEvents() {
    document.addEventListener('click', this.handleBoardSize);
    document.addEventListener('change', this.handleSquareInputChange);
    document.addEventListener('click', this.handleSquareChange);
  }

  /**
   * Renders options for select elements.
   * 
   * @param {object} - range of options
   * @param {object} - select DOM element
   */
  renderSelectOptions(range, DOMelement) {
    const fragment = document.createDocumentFragment();
    let i = range.bottom;
    while (i <= range.top) {
      const option = document.createElement('option');
      option.setAttribute('value', i);
      option.textContent = i;
      fragment.appendChild(option);
      i++;
    }
    fragment.firstChild.setAttribute('selected', true);
    DOMelement.appendChild(fragment);
  }

  /**
   * Handle user input of rows and columns number and create a new sokoban board accordingly 
   * to entered values.
   */
  handleBoardSize(event) {
    if (event.target !== this.boardSizeSubmitButtonElement) { return; };

    const rowsNumber = +this.boardRowSelectElement.value;
    const columnsNumber = +this.boardColumnSelectElement.value;
    const levelArray = this.getLevelArray(rowsNumber, columnsNumber);
    this.makeNewLevelMakerBoard(levelArray);
  }

  /**
   * Creates an array structure representing a sokoban board with selected 
   * number of rows and columns.
   * 
   * @param {number} - number of rows
   * @param {number} - number of columns
   * @returns {object} - array representing a structure of sokoban board
   */
  getLevelArray(rowsNumber, columnsNumber) {
    /* levelArray is filled with spaces first and then with walls 
    to make it easier to refactor in case it should not be filled or 
    should be filled with other values. */
    const levelArray = Array(+rowsNumber).fill(Array(+columnsNumber).fill('space'));
    const mappedLevelArray = levelArray.map((row, rowIndex) => {
      return row.map((item, itemIndex) => {
        if (
          rowIndex === 0 || 
          rowIndex === levelArray.length - 1 ||
          itemIndex === 0 ||
          itemIndex === row.length - 1
        ) {
          return 'wall';
        }

        return item;
      });
    });

    return mappedLevelArray;
  }

  /**
   * Clear the previous board and create a new one.
   */
  makeNewLevelMakerBoard(levelArray) {
    this.clearLevelMakerBoard();
    this.renderLevelMakerBoard(levelArray);
  }

  clearLevelMakerBoard() {
    this.levelMakerBoardElement.textContent = '';
  }

  /**
   * Render board to the DOM.
   */
  renderLevelMakerBoard(levelArray) {
    const fragment = document.createDocumentFragment();
  
    levelArray.forEach(row => {
      const rowElement = document.createElement('div');
      rowElement.setAttribute('class', 'board__row');
  
      row.forEach(item => {
        const squareElement = document.createElement('div');
        squareElement.setAttribute('class', `square`);
        squareElement.setAttribute('data-square', `${item}`)
        rowElement.appendChild(squareElement);
      });
  
      fragment.appendChild(rowElement);
    });
  
    this.levelMakerBoardElement.appendChild(fragment);
  }

  /**
   * Handles user input. Captures the value of a currently selected radio input of a board square type.
   */
  handleSquareInputChange(event) {
    if (event.target.name !== 'board-square-input') { return; }

    this.squareInputCheckedValue = event.target.value;
  }

  /**
   * Handles user actions. Changes the type of a board squares according to a currently selected 
   * radio input value.
   */
  handleSquareChange(event) {
    if (!event.target.classList.contains('square')) { return; }

    if (event.target.dataset.square === this.squareInputCheckedValue) {
      event.target.dataset.square = 'space';
    } else {
      event.target.dataset.square = this.squareInputCheckedValue;
    }
  }

}

const newLevelMaker = new LevelMaker();


export default LevelMaker;
