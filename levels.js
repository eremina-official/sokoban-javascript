const rawLevels = [
  //1
  [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    0, 2, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 3, 1, 4, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0
  ],
  //2
  [
    1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 0, 0, 4, 0,
    0, 1, 2, 1, 1, 1, 1, 0,
    0, 1, 3, 0, 0, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1
  ],
  //3
  [
    0, 0, 0, 0, 0, 1, 1, 1,
    0, 1, 4, 1, 0, 0, 1, 1,
    0, 0, 1, 1, 1, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 0,
    1, 0, 0, 1, 1, 3, 1, 0,
    1, 1, 0, 0, 1, 1, 1, 0,
    1, 1, 1, 0, 1, 2, 1, 0,
    1, 1, 1, 0, 0, 0, 0, 0
  ],
  //4
  [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 4, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 1, 1, 0,
    0, 1, 0, 1, 1, 3, 1, 0,
    0, 1, 1, 1, 1, 2, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0
  ],
  //5
  []
];

const keys = {
  0: 'wall',
  1: 'space',
  2: 'person',
  3: 'box',
  4: 'target'
};

const levels = rawLevels.map(level => {
  return level.map(item => {
    switch (item) {
      case 0:
        return item = keys[0];
        break;
      case 1:
        return item = keys[1];
        break;
      case 2:
        return item = keys[2];
        break;
      case 3:
        return item = keys[3];
        break;
      case 4:
        return item = keys[4];
        break;
    }
  });
});


export default levels;
