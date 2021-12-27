import {
  replaceTargetsWithSpaces,
  replaceSpacesWithOuterInRows,
  replaceSpacesWithOuterInColumns,
  getTargets,
  getPersonPosition,
  getDeepCopy,
} from '../src-oop/js/process-level.js';

describe('replaceTargetsWithSpaces', () => {
  test('should map level correctly', () => {
    const level = [
      ['wall', 'person', 'space', 'target', 'space', 'box'],
      ['wall', 'space', 'space', 'space', 'space', 'wall'],
    ];

    const expectedResult = [
      ['wall', 'person', 'space', 'space', 'space', 'box'],
      ['wall', 'space', 'space', 'space', 'space', 'wall'],
    ];

    const result = replaceTargetsWithSpaces(level);
    expect(result).toEqual(expectedResult);
  });
});

//integration test
describe('replaceSpacesWithOuterInRows', () => {
  test('should replace spaces outside the walls with outer', () => {
    const level = [
      ['wall', 'wall', 'wall', 'space', 'wall', 'space'],
      ['space', 'wall', 'wall', 'space', 'wall', 'space'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'space', 'wall', 'wall', 'space', 'space'],
      ['space', 'space', 'wall', 'wall', 'wall', 'wall'],
      ['space', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['space', 'wall', 'space', 'wall', 'wall', 'wall'],
    ];

    const expectedResult = [
      ['wall', 'wall', 'wall', 'space', 'wall', 'outer'],
      ['outer', 'wall', 'wall', 'space', 'wall', 'outer'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'outer', 'wall', 'wall', 'outer', 'outer'],
      ['outer', 'outer', 'wall', 'wall', 'wall', 'wall'],
      ['outer', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['outer', 'wall', 'space', 'wall', 'wall', 'wall'],
    ];

    const result = replaceSpacesWithOuterInRows(level);
    expect(result).toEqual(expectedResult);
  });
});

//integration test
describe('replaceSpacesWithOuterInColumns', () => {
  test('should return level array with spaces mapped to outer in columns', () => {
    const level = [
      ['wall', 'space', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'space', 'space', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'space', 'space', 'wall', 'space', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'space', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'space', 'wall', 'wall', 'wall'],
    ];

    const expectedResult = [
      ['wall', 'outer', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'outer', 'outer', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'space', 'space', 'wall', 'space', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'outer', 'wall', 'wall', 'wall'],
      ['wall', 'wall', 'outer', 'wall', 'wall', 'wall'],
    ];

    let result = replaceSpacesWithOuterInColumns(0)(level);
    result = replaceSpacesWithOuterInColumns(level.length - 1)(level);
    expect(result).toEqual(expectedResult);
  });
});

describe('getTargets', () => {
  test('should return coordinates of all targets', () => {
    const level = [
      ['wall', 'person', 'space', 'target', 'space', 'box'],
      ['wall', 'space', 'space', 'space', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'box', 'target', 'target', 'wall'],
    ];

    const expectedResult = ['0-3', '3-2', '3-3'];

    const result = level.reduce(getTargets, []);
    expect(result).toEqual(expectedResult);
  });
});

describe('getPersonPosition', () => {
  test('should return person position', () => {
    const level = [
      ['wall', 'space', 'space', 'target', 'space', 'box'],
      ['wall', 'space', 'space', 'person', 'wall'],
      ['wall', 'space', 'space', 'space', '', 'wall'],
      ['wall', 'box', 'target', 'target', 'wall'],
    ];

    const expectedResult = { personY: 1, personX: 3 };

    const result = getPersonPosition(level);
    expect(result).toEqual(expectedResult);
  });
});

describe('getDeepCopy', () => {
  test('should return a deep copy of an array', () => {
    const level = [
      ['wall', 'space', 'space', 'target', 'space', 'box'],
      ['wall', 'space', 'space', 'person', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'box', 'target', 'target', 'wall'],
    ];
    const exp = level;
    const expectedResult = [
      ['wall', 'space', 'space', 'target', 'space', 'box'],
      ['wall', 'space', 'space', 'person', 'wall'],
      ['wall', 'space', 'space', 'space', 'space', 'wall'],
      ['wall', 'box', 'target', 'target', 'wall'],
    ];

    const result = getDeepCopy(level);
    expect(result).toStrictEqual(expectedResult);
    expect(result).toEqual(expectedResult);
    console.log(level[0] === exp[0]);
    console.log(level[0] === result[0]);
  });
});
