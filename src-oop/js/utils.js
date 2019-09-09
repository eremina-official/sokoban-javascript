/** 
 * renderBoard function is used in board-oop.js and level-maker.js modules
 * @param {object} levelArray - array representation of a current level
 * @param {object} boardElement - DOM element that is used to append rendered board
 */
const renderBoard = (levelArray, boardElement) => {
  const fragment = document.createDocumentFragment();

  levelArray.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('class', 'board__row');

    row.forEach((item, itemIndex) => {
      const squareElement = document.createElement('div');
      /* .js-rowIndex-itemIndex class is used in game.checkWin(), this.receiveCommand methods */
      squareElement.setAttribute('class', `square ${item} js-${rowIndex}-${itemIndex}`);
      rowElement.appendChild(squareElement);
    });

    fragment.appendChild(rowElement);
  });

  boardElement.appendChild(fragment);
}


export { renderBoard };