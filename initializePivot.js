import {findNextPivotColumn} from './findNextPivotColumn'
export function initializePivot( matrix ){
  const columnNumber = findNextPivotColumn( matrix );
  const system = {
    s : matrix,
    pivot : {
      row : 0,
      column : columnNumber
    }
  };
  return system
}
