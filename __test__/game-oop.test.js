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
