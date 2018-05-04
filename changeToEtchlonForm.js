import {largestAbsoluteMovedToTopOfColumn} from './largestAbsoluteMovedToTopOfColumn'
export function changeToEtchlonForm(system){
  const newSystem = { ...system };
  if (newSystem.s.length - 1 == newSystem.pivot.row) {
    return newSystem
  }else {
    const systemLargestTop = largestAbsoluteMovedToTopOfColumn(newSystem);
    const zeroedUnderPivot = this._zeroAllRowsUnderThePivot(systemLargestTop);
    // const { pivot, ...zeroedUnderPivotPostIteration } = zeroedUnderPivot;
    // zeroedUnderPivotPostIteration.pivot = {
    //   row :  zeroedUnderPivot.pivot.row + 1,
    //   column : zeroedUnderPivot.pivot.column + 1
    // };
    // return this._changeToEtchlonForm(zeroedUnderPivotPostIteration);
  }

}
