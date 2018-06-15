import {findNextPivotColumn} from './findNextPivotColumn'
export function initializeSystem( matrix ){
  const system = {
    s : matrix,
    pivot : {
      row : -1,
      column : -1
    },
    leadingValues : []
  };
  const nextPivotColumn = findNextPivotColumn( system );
  if ( nextPivotColumn == -1 ){
    throw 'sets with no pivot column have no solutions';
  }else{
    system.pivot.column = nextPivotColumn;
    system.pivot.row = system.pivot.row + 1;
  }
  return system
}
