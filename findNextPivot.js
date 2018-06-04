export function findNextPivot(system) {
  const { pivot, ...nextSystem } = system;
  if (! nextSystem.leadingValues) {
    nextSystem.leadingValues = [];
  } else {
    console.log(pivot);
    nextSystem.leadingValues.push(pivot);
  }

  nextSystem.pivot = {
    row :  pivot.row + 1,
    column : pivot.column + 1
  };

    console.log(nextSystem);
  return nextSystem;
}
