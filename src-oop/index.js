import './game-oop.js';
import levels from '../levels.js';
import Game from './game-oop.js';


let currentIndex = 0;
const board = document.querySelector('.js-board');
const winnerScreen = document.querySelector('.js-winner-screen');
let newGame = new Game(levels[currentIndex]);

document.addEventListener('click', playNextGame);
document.addEventListener('keyup', playNextGameEnter);

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
  Automatically focuse the Next Game button when Winner screen appears
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
