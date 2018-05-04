export function getRowScaledBy (row, scale) {
  let rowScaled = row.map(function (entry, idx) {
    let number;
    if (entry != 0) {
      number = scale * Number(entry);
    }else {
      number = Number(entry);
    }
    return number;
  });
  return rowScaled;
}
