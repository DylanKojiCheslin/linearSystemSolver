import {switchRows} from './switchRows';
export function partialPivoting(system){
  const newSystem = { ...system};
  const rowsOffSetNumber = newSystem.pivot.row;
  const columnNumber = newSystem.pivot.column;
  let largestValue = 0;
  let indexOfLargestValue = undefined;
  const columnArray = newSystem.s.map(function(value) {
    return Number(value[columnNumber]);
  });
  columnArray.forEach(function(value, index){
    if (index >= rowsOffSetNumber) {
      if (Math.abs(value) > largestValue) {
        largestValue = Math.abs(value);
        indexOfLargestValue = index;
      }
    }
  });
  const updatedSystem = switchRows(
    newSystem, system.pivot.row, indexOfLargestValue
  );
  return updatedSystem;
}
