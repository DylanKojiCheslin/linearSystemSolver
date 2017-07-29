import {findPivotColumn} from './findPivotColumn'
export function initializePivot( matrix ){
  const columnNumber = findPivotColumn( matrix );
  const system = {
    s : matrix,
    pivot : {
      row : 0,
      column : columnNumber
    }
  };
  return system
}
