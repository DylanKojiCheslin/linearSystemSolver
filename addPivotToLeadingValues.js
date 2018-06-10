export function addPivotToLeadingValues(system) {
  let newSystem = { ...system };
  const pivot = { ...newSystem.pivot};
  newSystem.leadingValues.push(pivot);
  return newSystem;
}
