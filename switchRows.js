export function switchRows(system, aRowNumber, differentRowNumber){
  let newSystem = JSON.parse(JSON.stringify(system));
  let holder = newSystem.s[differentRowNumber];
  newSystem.s[differentRowNumber] = newSystem.s[aRowNumber];
  newSystem.s[aRowNumber] = holder;
  return newSystem;
}
