import {largestAbsoluteMovedToTopOfColumn} from './largestAbsoluteMovedToTopOfColumn'
import {zeroAllRowsUnderThePivot} from './zeroAllRowsUnderThePivot'
import {scalePivotToOne} from './scalePivotToOne'
import {pivotValueIsOne} from './pivotValueIsOne'

export function changeToEtchlonForm(system){
  let newSystem = { ...system };
  console.log("pivotValueIsOne");
  console.log(pivotValueIsOne);
  const valueIsOne = pivotValueIsOne(newSystem);
  if ( ! valueIsOne) {
    newSystem = scalePivotToOne(newSystem);
  }
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
