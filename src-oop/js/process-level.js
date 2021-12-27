/**
 * Level processing logic.
 */


function pipe(...fns) {
  return (arg) => fns.reduce((acc, currentFn) => currentFn(acc), arg);
}

function replaceTargetsWithSpaces(currentLevel) {
  return currentLevel.map(row => row.map(element => (element === 'target') ? 'space' : element));
}

function replaceSpacesWithOuterInRows(currentLevel) {
  return currentLevel.reduce((acc, currentRow, rowIndex) => {
    const colIndices = [0, currentRow.length - 1];
    colIndices.forEach(colIndex => {
      if (currentRow[colIndex] === 'space') {
        acc[rowIndex][colIndex] = 'outer';
        acc = mapOuter()(acc, rowIndex, colIndex);
      }
    });
    return acc;
  }, getDeepCopy(currentLevel));
}

function replaceSpacesWithOuterInColumns(rowIndex) {
  return function inner(currentLevel) {
    const spaceIndex = currentLevel[rowIndex].findIndex(element => element === 'space');
    if (spaceIndex !== -1) {
      currentLevel[rowIndex][spaceIndex] = 'outer';
      mapOuter()(currentLevel, rowIndex, spaceIndex);
      return inner(currentLevel);
    } else {
      return currentLevel;
    }
  }
}

function mapOuter() {
  return function inner(currentLevel, rowIndex, colIndex) {
    const prevRowIndex = (rowIndex <= 1) ? 1 : (rowIndex - 1);
    const nextRowIndex = (rowIndex >= currentLevel.length - 2) ? (currentLevel.length - 2) : (rowIndex + 1);
    const prevColIndex = (colIndex <= 1) ? 1 : (colIndex - 1);
    const nextColIndex = (colIndex >= currentLevel[0].length - 2) ? (currentLevel[0].length - 2) : (colIndex + 1);

    const coords = [
      [prevRowIndex, prevColIndex],
      [prevRowIndex, colIndex],
      [prevRowIndex, nextColIndex],
      [rowIndex, prevColIndex],
      [rowIndex, nextColIndex],
      [nextRowIndex, prevColIndex],
      [nextRowIndex, colIndex],
      [nextRowIndex, nextColIndex]
    ];

    coords.forEach(coord => {
      if (currentLevel[coord[0]][coord[1]] === 'space') {
        currentLevel[coord[0]][coord[1]] = 'outer';
        return inner(currentLevel, coord[0], coord[1]);
      }
    });

    return currentLevel;
  }
}

function transformLevelArrayForRendering(currentLevel) {
  return pipe(
    replaceTargetsWithSpaces, 
    replaceSpacesWithOuterInRows, 
    replaceSpacesWithOuterInColumns(0),
    replaceSpacesWithOuterInColumns(currentLevel.length - 1)
  )(currentLevel);
}

function getTargets(accRow, currentRow, currentRowIndex) {
  const rowTargets = currentRow.reduce((accValue, currentValue, currentValueIndex) => {
    if (currentValue === 'target') {
      accValue = [...accValue, `${currentRowIndex}-${currentValueIndex}`];
    }
    return accValue;
  }, []);
  
  accRow = [...accRow, ...rowTargets];
  return accRow;
}

function getPersonPosition(currentLevel) {
  return currentLevel.reduce((acc, currentValue, currentValueIndex) => {
    const personIndex = currentValue.findIndex(item => item === 'person');
    if (personIndex !== -1) {
      acc.personY = currentValueIndex;
      acc.personX = personIndex;
    }
    return acc;
  }, {});
}

function getDeepCopy(levelArray) {
  return levelArray.map(row => [...row]);
}


export { 
         transformLevelArrayForRendering,
         getTargets,
         getPersonPosition,
         getDeepCopy,
         replaceTargetsWithSpaces,
         replaceSpacesWithOuterInRows,
         replaceSpacesWithOuterInColumns
       };
