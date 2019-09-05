class LevelMaker {
  constructor() {
    this.boardRowSelectElement = document.querySelector('#board-row');
    this.boardColumnSelectElement = document.querySelector('#board-column');
    this.boardSizeSubmitButtonElement = document.querySelector('.js-board-size-submit');
    this.levelMakerBoardElement = document.querySelector('.js-level-maker-board');
    this.radioInputElement = document.querySelectorAll('input[name="board-square-input"]');
    this.handleBoardSize = this.handleBoardSize.bind(this);
    this.bindEvents();
    console.log(this.radioInputElement)
  }

  bindEvents() {
    document.addEventListener('click', this.handleBoardSize);
  }

  handleBoardSize(event) {
    if (event.target !== this.boardSizeSubmitButtonElement) { return; };

    const rowsNumber = +this.boardRowSelectElement.value;
    const columnsNumber = +this.boardColumnSelectElement.value;
    this.getLevelArray(rowsNumber, columnsNumber);

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

}

const newLevelMaker = new LevelMaker();


export default LevelMaker;
