import levels from '../../levels.js';
import Game from './game-oop.js';
import LevelsMenu from './levels-menu-oop.js';


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
 * @property {LevelsMenu} levelsMenu - a levelsMenu instance
 */
class Sokoban {
  constructor() {
    this.currentIndex = 0;
    this.board = document.querySelector('.js-board');
    this.resetButton = document.querySelector('.js-reset');
    this.winnerScreen = document.querySelector('.js-winner-screen');
    this.winnerScreenButton = document.querySelector('.js-winner-screen__button');
    this.newGame = new Game(levels[this.currentIndex], this.currentIndex + 1);
    this.levelsMenu = new LevelsMenu(levels, this);
    this.moveWithNavButtons = this.moveWithNavButtons.bind(this);
    this.playNextGame = this.playNextGame.bind(this);
    this.reset = this.reset.bind(this);
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('click', this.moveWithNavButtons);
    document.addEventListener('click', this.playNextGame);
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
  
    const navButton = +event.target.dataset.nav;
    const direction = this.newGame.calculateDirection(navButton);
    
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
