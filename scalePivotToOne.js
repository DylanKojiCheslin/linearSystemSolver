import {getRowScaledBy} from './getRowScaledBy'
export function scalePivotToOne(system){
  // a = ((a/b) * b)
  let newSystem = { ...system};
  const deleteCount = 1;
  const rowNumber = newSystem.pivot.row;
  const pivotValue = Number(newSystem.s[system.pivot.row][newSystem.pivot.column]);
  if (pivotValue != 1) {
    const scale = 1 / pivotValue;
    const rowPivotScaledToOne = getRowScaledBy(newSystem.s[rowNumber], scale);
    newSystem.s.splice(rowNumber, deleteCount, rowPivotScaledToOne);
  }
  return newSystem;
}
