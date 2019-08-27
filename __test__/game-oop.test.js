import Game from '../src-oop/js/game-oop.js';


describe('mapLevel', () => {
  test('should map level correctly', () => {
    const level = [
      ['wall', 'person', 'space', 'target', 'space', 'box'],
      ['wall', 'space', 'space', 'space', 'space', 'wall']
    ];

    const expectedResult = [
      [
        ['wall', 'person', 'space', 'space', 'space', 'box'],
        ['wall', 'space', 'space', 'space', 'space', 'wall']
      ]
    ];

    const result = Game.prototype.mapLevel(level);
    expect(result).toEqual(expectedResult);
  });
});


describe('getTargets', () => {
  test('should return coordinates of all targets', () => {
    const level = [
      ['wall', 'person', 'space', 'target', 'space', 'box'],
      ['wall', 'space', 'space', 'space', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'box', 'target', 'target', 'wall']
    ];

    const expectedResult = ['0-3', '3-2', '3-3'];

    const result = level.reduce(Game.prototype.getTargets, []);
    expect(result).toEqual(expectedResult);
  });
});


describe('getPersonPosition', () => {
  test('should return person position', () => {
    const level = [
      ['wall', 'space', 'space', 'target', 'space', 'box'],
      ['wall', 'space', 'space', 'person', 'wall'],
      ['wall', 'space', 'space', 'space', '', 'wall'],
      ['wall', 'box', 'target', 'target', 'wall']
    ];

    const expectedResult = {personY: 1, personX: 3};

    const result = Game.prototype.getPersonPosition(level);
    expect(result).toEqual(expectedResult);
  });
});


describe('getDeepCopy', () => {
  test('should return a deep copy of an array', () => {
    const level = [
      ['wall', 'space', 'space', 'target', 'space', 'box'],
      ['wall', 'space', 'space', 'person', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'box', 'target', 'target', 'wall']
    ];
    const exp = level;
    const expectedResult = [
      ['wall', 'space', 'space', 'target', 'space', 'box'],
      ['wall', 'space', 'space', 'person', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'box', 'target', 'target', 'wall']
    ];

    const result = Game.prototype.getDeepCopy(level);
    expect(result).toStrictEqual(expectedResult);
    expect(result).toEqual(expectedResult);
    console.log(level[0] === exp[0]);
    console.log(level[0] === result[0])
  });
});
