import Game from './game-oop.js';


class LevelMakerPlay extends Game {
  constructor(levelArray) {
    super(levelArray, 0);
    this.levelArray = levelArray;
  }
}


export default LevelMakerPlay;