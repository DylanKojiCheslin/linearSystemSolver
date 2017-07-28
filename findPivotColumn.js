export function findPivotColumn(matrix){
  // remove the right most column (the column vector of solutions)
  const withOutTheRightestColumn = matrix.map(
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
    //find column with non-zero the columns
    const pivotColumn = columns.findIndex(function( x, index, array ){
      const nonZeroInColumn = x.some( function( y ){
        return Math.abs(y) > 0
      })
      return nonZeroInColumn;
      //if none found throw otherwise return
    })
      if ( pivotColumn == -1 ){
        throw 'empty sets have no solutions';
      }
      return pivotColumn;
  }
