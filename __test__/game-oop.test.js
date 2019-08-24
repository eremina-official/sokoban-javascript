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
