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
    _largestAbsoluteMovedToTopOfColumn = this._pivotColumn;
    // foreach row:
    this._systemState.forEach(function(row, index){
    // a. _largestAbsoluteMovedToTopOfColumn on the _pivotColumn - largest to top
      this._largestAbsoluteMovedToTopOfColumn(this._piviot.column, this._piviot.row);
    });
    // b. _zeroAllRowsUnderThePevot() - row replacement operations to "zero" all entry under the pivot
    // c. _pivot.row++, _pivot.column++
    // 3. foreach row:
    // a. _zeroAllRowsAboveThePivot(), _scalePivotToOne
    // b. _pivot.row--, _pivot--
  }
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
    //this._switch(this._piviot.row, indexOfLargestValue)
  }
}

const initObject = [
  [2,3,0,5],
  [0,0,1,20],
  [0,-2,0,5]
];

const theSystem = new LinearSystem(initObject);
theSystem.solve();
