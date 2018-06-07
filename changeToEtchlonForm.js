import {moveLargestToTopOfPivotColumn} from './moveLargestToTopOfPivotColumn';
import {zeroAllRowsUnderThePivot} from './zeroAllRowsUnderThePivot';
import {scalePivotToOne} from './scalePivotToOne';
import  {findNextPivot} from './findNextPivot';

export function changeToEtchlonForm(system){
  let newSystem = { ...system };
  if (newSystem.s.length - 1 == newSystem.pivot.row) {
    const scaled = scalePivotToOne(newSystem);
    const lastSystem = findNextPivot(scaled);
    return lastSystem;
  }else {
    const systemLargestTop = moveLargestToTopOfPivotColumn(newSystem);
    const zeroedUnderPivot = zeroAllRowsUnderThePivot(systemLargestTop);
    const scaled = scalePivotToOne(zeroedUnderPivot);
    const nextSystem = findNextPivot(scaled);
    return changeToEtchlonForm(nextSystem);
  }
}
