export function findNextPivotColumn(system){
  // remove the right most column (the column vector of solutions)
  const currentPivotColumn = system.pivot.column;
  const currentPivotRow = system.pivot.row;
  const withOutTheRightestColumn = system.s.map(
    function(x, index, array){
      const thisRowWithOutTheRightestColumn =  x.filter(function(y, index, array){
        return !!(array.length -1 != index);
      })
      return thisRowWithOutTheRightestColumn;
    })
    // get the columns from the matrix as rows in a new array for easyer searching
    const columns = withOutTheRightestColumn.map(function(column, index, array){
      return withOutTheRightestColumn.map(function(row){
        return row[index];
      })
    })
    //find column after the pivot with non-zero value in the column
    // let pivotColumn = newestPivotColumn || undefined;
      const nextPivotColumn = columns.findIndex(function( x, clmIndex, array ){
        if (clmIndex > currentPivotColumn) {
            const nonZeroInColumn = x.some( function( y, rowIndex ){
              return (Math.abs(y) > 0 && rowIndex > currentPivotRow)
            })
        return nonZeroInColumn;
        }
    })
    return nextPivotColumn;
  }
