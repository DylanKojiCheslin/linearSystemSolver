import {getRowScaledBy} from './getRowScaledBy';
export function rowReplacement(system, rowToBeReplaced, otherRow, scale){
  let newSystem = {...system};
  const deleteCount = 1;
  let otherRowScaled = getRowScaledBy(newSystem.s[otherRow], scale);
  let sumOfRows = otherRowScaled.map(function (num, idx) {
    let otherRowAtIndexValue = newSystem.s[rowToBeReplaced][idx];
    let value = num + otherRowAtIndexValue;
    return value;
  });
  newSystem.s[rowToBeReplaced] = sumOfRows;
  return newSystem;
}
