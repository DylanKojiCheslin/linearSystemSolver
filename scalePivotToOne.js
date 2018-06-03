import {getRowScaledBy} from './getRowScaledBy'
import {pivotValueIsOne} from './pivotValueIsOne'

export function scalePivotToOne(system){
  // a = ((a/b) * b)
  let newSystem = { ...system};
  const pivotValue = Number(newSystem.s[system.pivot.row][newSystem.pivot.column]);
  const pivotIsOne = pivotValueIsOne(newSystem);
  if ( ! pivotIsOne ) {
  const deleteCount = 1;
  const rowNumber = newSystem.pivot.row;
    const scale = 1 / pivotValue;
    const rowPivotScaledToOne = getRowScaledBy(newSystem.s[rowNumber], scale);
    newSystem.s.splice(rowNumber, deleteCount, rowPivotScaledToOne);
  }
  return newSystem;
}
