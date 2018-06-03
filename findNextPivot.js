export function findNextPivot(system) {
  const { pivot, ...nextSystem } = system;
  nextSystem.pivot = {
    row :  pivot.row + 1,
    column : pivot.column + 1
  };
  return nextSystem;
}
