import {rowReplacement} from "./rowReplacement";
  // zeros out the entry using _rowReplacement and the _pivot
export function rowReplacementRemover(system, rowNumber){
  let newSystem = {...system};
  const rowValue = Number(newSystem.s[rowNumber][newSystem.pivot.column]);
  const pivotValue = Number(newSystem.s[newSystem.pivot.row][newSystem.pivot.column]);
  if (pivotValue != 0) {
    const scale = (rowValue / pivotValue)  * -1;
    newSystem = rowReplacement(newSystem, rowNumber, system.pivot.row, scale);
  }
  return newSystem;
}
