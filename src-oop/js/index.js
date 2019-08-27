import levels from '../../levels.js';
import Game from './game-oop.js';
import levelsMenu from './levels-menu-oop.js';


/**
 * Sokoban game
 * Handles new game instance creation, game reset, navigation with buttons, winner screen, levels menu.
 * 
 * @property {number} currentIndex - index of the current level
 * @property {object} board - board DOM element
 * @property {object} resetButton - reset button DOM element
 * @property {object} winnerScreen - winner screen DOM element
 * @property {object} winnerScreenButton - next game button DOM element
 * @property {Game} newGame - a game instance
 */
class Sokoban {
  constructor() {
    this.currentIndex = 0;
    this.board = document.querySelector('.js-board');
    this.resetButton = document.querySelector('.js-reset');
    this.winnerScreen = document.querySelector('.js-winner-screen');
    this.winnerScreenButton = document.querySelector('.js-winner-screen__button');
    this.newGame = new Game(levels[this.currentIndex], this.currentIndex + 1);
    this.levelsMenu = new levelsMenu(levels, this);
    this.moveWithNavButtons = this.moveWithNavButtons.bind(this);
    this.playNextGame = this.playNextGame.bind(this);
    this.playNextGameEnter = this.playNextGameEnter.bind(this);
    this.reset = this.reset.bind(this);
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('click', this.moveWithNavButtons);
    document.addEventListener('click', this.playNextGame);
    document.addEventListener('keyup', this.playNextGameEnter);
    document.addEventListener('click', this.reset);
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
  
    const direction = {y: 0, x: 0};
    const navButton = +event.target.dataset.nav;

    switch (navButton) {
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
    
    this.newGame.move(direction);
  }

  /**
   * Clear the current game and open a new one.
   */
  openNewGame() {
    this.newGame.unbindEvents();
    this.newGame.board.clearBoard();
    if (!this.winnerScreen.classList.contains('winner-screen-is-hidden')) {
      this.winnerScreen.classList.add('winner-screen-is-hidden');
    }
    this.newGame = new Game(levels[this.currentIndex], this.currentIndex + 1);
  }
  
  /**
   * Open a new game with the Next Game button click 
   * and save current game index in the state. 
   *
   * @param {event} event - DOM event instance
   */
  playNextGame(event) {
    if (
      event.target === this.winnerScreenButton
      && this.currentIndex < levels.length - 1
    ) {
      this.currentIndex += 1;
      this.openNewGame();
    }
  }
  
 /**
  * Open next game on enter keypress when the Next Game button of the winner screen is in focus.
  * 
  * @param {event} event - DOM event instance
  */
  playNextGameEnter(event) {
    if (event.which === 13) {
      this.playNextGame(event);
    }
  }
  
  /**
   * Reset the current game.
   * 
   * @param {event} event - DOM event instance
   */
  reset(event) {
    if (event.target === this.resetButton) {
      this.openNewGame();
    }
  }

  /**
   * Receives a number of a level that should be opened from a levelsMenu instance, 
   * saves the current game index in the state.
   * 
   * @param {number} levelNumber - number of the level that should be opened.
   */
  goToLevel(levelNumber) {
    this.currentIndex = levelNumber;
    this.levelsMenu.closeLevelsListOnSelection();
    this.openNewGame();
  }
}

const sokoban = new Sokoban();
