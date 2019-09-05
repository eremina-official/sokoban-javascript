import LevelMaker from '../src-oop/js/level-maker.js';


describe('getLevelArray', () => {
  test('fills level array correctly', () => {
    const expectedResult = [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall']
    ];

    const result = LevelMaker.prototype.getLevelArray(8, 8);
    expect(result).toEqual(expectedResult);
  });
});


