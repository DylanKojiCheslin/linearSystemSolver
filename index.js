class LinearSystem {
  constructor(matrix) {
    //input should be a array of array of ints
    if ( ! Array.isArray(matrix)) {
      throw 'not array type error';
    }
    const hight = matrix.length;
    matrix.forEach(function(row){
      if ( ! Array.isArray(row)) {
        throw 'not array type error';
      }
      //checks if input matrix is ( column.length + 1 == rows.length )
      if ( hight + 1 != row.length ) {
        throw 'not in required shape (width == hight + 1)';
      }
      row.forEach(function(entry){
        if ( ! Number.isInteger(entry)) {
          throw 'not a integer error';
        }
      });
    });
    this._systemState = matrix;
    this._pivotColumn = undefined;
    this._pivot = {
      row: undefined,
      column: undefined
    };
    this._isEchelonForm = undefined;
    this._isReducedEchelonForm = undefined;
  }

  solve(){
    // 1. the left most non-zero column is the _pivotColumn
    //try first column, iterate until a column has a non-zero int in it
    let isNonZero = false;
    const that = this;
    for (var i = 0; i < this._systemState.length; i++) {
      let thisColumn = this._systemState.map(function(value) {
        return value[i];
      });
      isNonZero = thisColumn.some(function(entry){
        return Math.abs(entry) > 0
      });
      if (isNonZero) {
        this._pivotColumn = i;
        break;
      }
    }
    //if there isn't a non-zero column then the set is empty and has no solutions
    if ( undefined === this._pivotColumn) {
      throw 'empty sets have no solutions';
    }
    // 2. the top row/column postion of the _pivotColumn is the _pivot location
    this._pivot.row = 0;
    this._pivot.column = this._pivotColumn;
    // foreach row:
    this._systemState.forEach(function(row, index){
      // a. _largestAbsoluteMovedToTopOfColumn on the _pivotColumn - largest to top
      that._largestAbsoluteMovedToTopOfColumn(that._pivot.column, that._pivot.row);
      // b. _zeroAllRowsUnderThePevot() - row replacement operations to "zero" all entry under the pivot
      // _zeroAllRowsUnderThePevot(that._pivot.column, that._pivot.row);
      // c. _pivot.row++, _pivot.column++
    });
    // 3. foreach row:
    // a. _zeroAllRowsAboveThePivot(), _scalePivotToOne
    // b. _pivot.row--, _pivot--
  }

  _switch(aRowNumber, differentRowNumber){
    let holder = this._systemState[differentRowNumber];
    this._systemState[differentRowNumber] = this._systemState[aRowNumber];
    this._systemState[aRowNumber] = holder;
  }

  _rowReplacement(rowToBeReplaced, otherRow, scale){
  let otherRowScaled = this._getRowScaledBy(this._systemState[otherRow], scale))
  let sumOfRows = otherRowScaled.map(function (num, idx) {
    return num + this._systemState[idx];
  });
  this._systemState[rowToBeReplaced] = sumOfRows;
  }

_getRowScaledBy (rowNumber, scale) {
  return (this._systemState[rowNumber] * scale)
}

  // _zeroAllRowsUnderThePivot(){
  // for each entries below the pivot,
  // if the row is non-zero
    // _rowReplacementRemover on each
    // pass index and keep in mind the offset based on the pivot location
  // }

  // zeros out the entry using _rowReplacement and the _pivot
  // _rowReplacementRemover(entry){
    // let scale = (_this._systemState[this._pivot.row][this._pivot.column]) / entry;
    //scale = -scale;
    // rowReplacement(rowToBeReplaced, otherRow, scale)
  // }

  _largestAbsoluteMovedToTopOfColumn(columnNumber, rowsOffSetNumber){
    let largestValue = 0;
    let indexOfLargestValue = undefined;
    let columnArray = this._systemState.map(function(value) {
      return value[columnNumber];
    });
    columnArray.forEach(function(value, index){
      if (index >= rowsOffSetNumber) {
        if (Math.abs(value) > largestValue) {
          largestValue = Math.abs(value);
          indexOfLargestValue = index;
        }
      }
    });
    this._switch(this._pivot.row, indexOfLargestValue)
  }
}

const largestToTopInitObject = [
  [0,0,1,20],
  [2,3,0,5],
  [-3,-2,0,5]
];

const largestToTopSystem = new LinearSystem(largestToTopInitObject);
largestToTopSystem.solve();
