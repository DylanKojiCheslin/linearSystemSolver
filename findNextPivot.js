import {findNextPivotColumn} from "./findNextPivotColumn"
export function findNextPivot(system) {

  const nextSystem = {...system};
  const pivot = nextSystem.pivot;
  const nextPivotColumn = findNextPivotColumn(nextSystem);
  if (nextPivotColumn == -1) {
    nextSystem.lastLeadingEntryFound = true;
  }else {
  const nextPivotRow = nextSystem.pivot.row + 1;
  nextSystem.pivot.row = nextPivotRow;
  nextSystem.pivot.column = nextPivotColumn;
  }
  return nextSystem;
}
