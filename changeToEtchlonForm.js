import {partialPivoting} from './partialPivoting';
import {zeroAllRowsUnderThePivot} from './zeroAllRowsUnderThePivot';
import {scalePivotToOne} from './scalePivotToOne';
import {findNextPivot} from './findNextPivot';
import {addPivotToLeadingValues} from './addPivotToLeadingValues';

export function changeToEtchlonForm(system){
  let newSystem = { ...system };
  if (newSystem.s.length - 1 == newSystem.pivot.row) {
    const scaled = scalePivotToOne(newSystem);
    const lastSystem = addPivotToLeadingValues(scaled);
    return lastSystem;
  }else {
    const systemLargestTop = partialPivoting(newSystem);
    const zeroedUnderPivot = zeroAllRowsUnderThePivot(systemLargestTop);
    const scaled = scalePivotToOne(zeroedUnderPivot);
    const newLeadingValue = addPivotToLeadingValues(scaled);
    const nextSystem = findNextPivot(newLeadingValue);
    return changeToEtchlonForm(nextSystem);
  }
}
