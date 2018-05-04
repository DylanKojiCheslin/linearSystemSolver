import {largestAbsoluteMovedToTopOfColumn} from './largestAbsoluteMovedToTopOfColumn'
import {zeroAllRowsUnderThePivot} from './zeroAllRowsUnderThePivot'
export function changeToEtchlonForm(system){
  const newSystem = { ...system };
  if (newSystem.s.length - 1 == newSystem.pivot.row) {
    return newSystem
  }else {
    const systemLargestTop = largestAbsoluteMovedToTopOfColumn(newSystem);
    const zeroedUnderPivot = zeroAllRowsUnderThePivot(systemLargestTop);
    const { pivot, ...zeroedUnderPivotPostIteration } = zeroedUnderPivot;
    zeroedUnderPivotPostIteration.pivot = {
      row :  zeroedUnderPivot.pivot.row + 1,
      column : zeroedUnderPivot.pivot.column + 1
    };
    return changeToEtchlonForm(zeroedUnderPivotPostIteration);
  }
}
