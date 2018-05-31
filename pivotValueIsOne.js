export function pivotValueIsOne(system) {
  if (system.s[system.pivot.row][system.pivot.column] == 1) {
    return true;
  } else{
    return false;
  }
}
