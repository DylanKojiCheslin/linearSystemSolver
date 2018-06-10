import {findNextPivotColumn} from "./findNextPivotColumn"
export function findNextPivot(system) {

  const nextSystem = {...system};
  const pivot = nextSystem.pivot;
  const nextPivotColumn = findNextPivotColumn(nextSystem);
  const nextPivotRow = nextSystem.pivot.row + 1;
  nextSystem.pivot.row = nextPivotRow;
  nextSystem.pivot.column = nextPivotColumn;
  return nextSystem;
}
