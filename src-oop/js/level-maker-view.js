/**
 * Renders the view according to a model.
 * 
 * @property {object} boardRowSelectElement - select DOM element
 * @property {object} boardColumnSelectElement - select DOM element
 * @property {object} selectOptionsRange - range of board rows and columns amount
 * @property {object} levelMakerBoardElement - board DOM element
 */
class LevelMakerView {
  constructor() {
    this.boardRowSelectElement = document.querySelector('#board-row');
    this.boardColumnSelectElement = document.querySelector('#board-column');
    this.selectOptionsRange = {bottom: 6, top: 18};
    this.levelMakerBoardElement = document.querySelector('.js-level-maker-board');
    this.renderSelectOptions(this.selectOptionsRange, this.boardRowSelectElement);
    this.renderSelectOptions(this.selectOptionsRange, this.boardColumnSelectElement);
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
   * Renders board to the DOM.
   * 
   * @param {object} levelArray - array representing sokoban board
   */
  renderLevelMakerBoard(levelArray) {
    const fragment = document.createDocumentFragment();
  
    levelArray.forEach(row => {
      const rowElement = document.createElement('div');
      rowElement.setAttribute('class', 'board__row js-board-row');
  
      row.forEach(item => {
        const squareElement = document.createElement('div');
        squareElement.setAttribute('class', `square js-level-maker-square`);
        squareElement.setAttribute('data-square', `${item}`)
        rowElement.appendChild(squareElement);
      });
  
      fragment.appendChild(rowElement);
    });
  
    this.levelMakerBoardElement.appendChild(fragment);
  }

  clearBoardContent() {
    this.levelMakerBoardElement.textContent = '';
  }
}


export default LevelMakerView;
