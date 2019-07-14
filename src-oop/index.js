import './game-oop.js';
import levels from '../levels.js';
import Game from './game-oop.js';


let currentIndex = 0;
const board = document.querySelector('.js-board');
const winnerScreen = document.querySelector('.js-winner-screen');
let newGame = new Game(levels[currentIndex]);

document.addEventListener('click', moveWithNavButtons);
document.addEventListener('click', playNextGame);
document.addEventListener('keyup', playNextGameEnter);


function moveWithNavButtons(event) {
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
  
  newGame.move(direction);
}

function playNextGame(event) {
  if (
    event.target === document.querySelector('.js-winner-screen__button')
    && currentIndex < levels.length - 1
  ) {
    currentIndex += 1;
    board.textContent = '';
    winnerScreen.classList.remove('is-visible');
    newGame = new Game(levels[currentIndex]);
  }
}

/* 
  Open next game on enter keypress when the Next Game button is focused
*/
function playNextGameEnter(event) {
  if (
    event.target === document.querySelector('.js-winner-screen__button')
    && currentIndex < levels.length - 1
    && event.which === 13
  ) {
    playNextGame(event);
  }
}
