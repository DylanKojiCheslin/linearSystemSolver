import {rowReplacementRemover} from './rowReplacementRemover'
export function zeroAllRowsUnderThePivot(system){
  let newSystem = { ...system };
  const column = newSystem.pivot.column;
  const row = newSystem.pivot.row;
  const rowUnderThePivot = row + 1;
  const limit = newSystem.s.length;
  // for each entries below the pivot,
  for (var i = rowUnderThePivot; i < limit; i++) {
    // if the row is non-zero
    if (newSystem.s[i][column] != 0) {
      //use  rowReplacementRemover on each
      newSystem = rowReplacementRemover(newSystem, i);
    }
  }
  return newSystem;
}
