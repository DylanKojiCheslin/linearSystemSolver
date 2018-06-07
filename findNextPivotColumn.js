export function findNextPivotColumn(system){
  // remove the right most column (the column vector of solutions)
  const currentPivotColumn = system.pivot.column;
  // const newestPivotColumn = system.leadingValues[system.leadingValues.length - 1 ].column;
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
      const nextPivotColumn = columns.findIndex(function( x, index, array ){
        if ( index > currentPivotColumn) {
          const nonZeroInColumn = x.some( function( y ){
            return Math.abs(y) > 0
            // return Math.abs(y) > 0 && index < currentPivotColumn
          })
      return nonZeroInColumn;
        }
    })
    return nextPivotColumn;
  }
