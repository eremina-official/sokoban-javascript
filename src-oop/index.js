import './game-oop.js';
import levels from '../levels.js';
import Game from './game-oop.js';


/**
 * Sokoban game
 * Handles new game instance creation, game reset, navigation with buttons, winner screen, levels menu.
 * 
 * @property {number} currentIndex - index of the current level in the levels
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

  moveWithNavButtons(event) {
    if (!event.target.classList.contains('js-nav-button')) {
      return;
    }
  
    let direction;
  
    if (event.target.classList.contains('js-nav-button-left')) {
      direction = -1;
    }
    if (event.target.classList.contains('js-nav-button-up')) {
      direction = -8;
    }
    if (event.target.classList.contains('js-nav-button-right')) {
      direction = 1;
    }
    if (event.target.classList.contains('js-nav-button-down')) {
      direction = 8;
    }
    
    this.newGame.move(direction);
  }
  
  playNextGame(event) {
    if (
      event.target === this.winnerScreenButton
      && this.currentIndex < levels.length - 1
    ) {
      this.currentIndex += 1;
      this.board.textContent = '';
      this.winnerScreen.classList.remove('is-visible');
      this.newGame = new Game(levels[this.currentIndex], this.currentIndex + 1);
    }
  }
  
  /* 
    Open next game on enter keypress when the Next Game button is focused
  */
  playNextGameEnter(event) {
    if (
      event.target === this.winnerScreenButton
      && this.currentIndex < levels.length - 1
      && event.which === 13
    ) {
      this.playNextGame(event);
    }
  }
  
  reset(event) {
    if (event.target === this.resetButton) {
      this.newGame.unbindEvents();
      this.board.textContent = '';
      this.newGame = new Game(levels[this.currentIndex], this.currentIndex + 1);
    }
  }
}

const sokoban = new Sokoban();
