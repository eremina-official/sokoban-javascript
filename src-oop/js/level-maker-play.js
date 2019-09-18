import Game from './game-oop.js';


class LevelMakerPlay extends Game {
  constructor(levelArray) {
    super(levelArray, 0);
    this.levelArray = levelArray;
  }
}

const newLevelMakerPlay = new LevelMakerPlay(levelArray);

export default LevelMakerPlay;
