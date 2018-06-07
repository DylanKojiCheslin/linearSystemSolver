import {findNextPivotColumn} from "./findNextPivotColumn"
export function findNextPivot(system) {

  const nextSystem = {...system};
  const pivot = nextSystem.pivot;
  nextSystem.leadingValues.push(pivot);
  const nextPivotColumn = findNextPivotColumn(nextSystem);
  nextSystem.pivot = {
    row :  pivot.row + 1,
    column : nextPivotColumn
  };
  return nextSystem;
}
