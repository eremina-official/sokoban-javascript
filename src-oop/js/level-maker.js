class LevelMaker {
  constructor() {
    this.boardRowSelectElement = document.querySelector('#board-row');
    this.boardColumnSelectElement = document.querySelector('#board-column');
    this.boardSizeSubmitButtonElement = document.querySelector('.js-board-size-submit');
    this.levelMakerBoardElement = document.querySelector('.js-level-maker-board');
    this.squareInputCheckedValue = 'wall';
    this.handleBoardSize = this.handleBoardSize.bind(this);
    this.handleSquareInputChange = this.handleSquareInputChange.bind(this);
    this.handleSquareChange = this.handleSquareChange.bind(this);
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('click', this.handleBoardSize);
    document.addEventListener('change', this.handleSquareInputChange);
    document.addEventListener('click', this.handleSquareChange);
  }

  handleBoardSize(event) {
    if (event.target !== this.boardSizeSubmitButtonElement) { return; };

    const rowsNumber = +this.boardRowSelectElement.value;
    const columnsNumber = +this.boardColumnSelectElement.value;
    const levelArray = this.getLevelArray(rowsNumber, columnsNumber);
    this.makeNewLevelMakerBoard(levelArray);
  }

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

  makeNewLevelMakerBoard(levelArray) {
    this.clearLevelMakerBoard();
    this.renderLevelMakerBoard(levelArray);
  }

  clearLevelMakerBoard() {
    this.levelMakerBoardElement.textContent = '';
  }

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

  handleSquareInputChange(event) {
    if (event.target.name !== 'board-square-input') { return; }

    this.squareInputCheckedValue = event.target.value;
  }

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
