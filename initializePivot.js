import {findNextPivotColumn} from './findNextPivotColumn'
export function initializePivot( matrix ){
  const system = {
    s : matrix,
    pivot : {
      row : 0,
      column : 0
    },
    leadingValues : []
  };
  const nextPivotColumn = findNextPivotColumn( system );
  if ( nextPivotColumn == -1 ){
    throw 'sets with no pivot column have no solutions';
  }else{
    system.pivot.column = nextPivotColumn;
  }
  return system
}
