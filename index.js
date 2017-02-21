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
    this._pivotColumn = null;
    this._pivot = null;
    this._isEchelonForm = null;
    this._isReducedEchelonForm = null;
  }
  solve(){
    // 1. the left most non-zero column is the _pivotColumn
    //try the first column then iterate until a column is has at least one non-zero int in them
    let searchingForNonZeroColumn = true;
    let columIndex = this._systemState.length;
    let i = 0;
    while (searchingForNonZeroColumn && (i < columIndex)) {
      if (this._columnHasNonZero(i)) {
        this._pivotColumn = i;
        searchingForNonZeroColumn = false;
      }
      i++;
    }
    //if there isn't a non-zero column then the set is empty and has no solutions
    if (searchingForNonZeroColumn) {
      throw "all inputs are zeros error"
    }
    // 2. the top row/column postion of the _pivotColumn is the _pivot

    // 3. _largestAbsoluteMovedToTopOfColumn on the _pivotColumn - largest to top
    // 4. _zeroAllRowsUnderThePevot() - row replacement operations to "zero" all entry under the pivot
    // foreach other row:
    // a. _pivot.row++, _pivot.column++
    // b. _zeroAllRowsUnderThePevot()
    // 5. _zeroAllRowsAboveThePivot(), _scalePivotToOne
    // 6. foreach other row:
    // a. _pivot.row--, _pivot--
    // b. _zeroAllRowsAboveThePivot(), _scalePivotToOne
  }
  _columnHasNonZero (columnNumber){
    this._systemState.find( function ( row ) {
      const isInt = Number.isInteger(row[columnNumber]);
      const biggerThanZero = Math.abs(row[columnNumber]) > 0;
      return (isInt && biggerThanZero)
    })
  }
}

const initObject = [
  [2,3,0,5],
  [0,0,1,20],
  [0,-2,0,5]
];

const theSystem = new LinearSystem(initObject);
theSystem.solve();
