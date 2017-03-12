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
      let limit = this._systemState.length - 1;
      // forEach row:
      this._systemState.forEach(function(row, index, array){
        // a. _largestAbsoluteMovedToTopOfColumn on the _pivotColumn - largest to top
        that._largestAbsoluteMovedToTopOfColumn();
        // b. _zeroAllRowsUnderThePivot() - row replacement operations to "zero" all entry under the pivot
        that._zeroAllRowsUnderThePivot();
        //unless pivot in the bottom right
        if (that._pivot.column < limit && that._pivot.row < limit) {
        // c. _pivot.row++, _pivot.column++
          that._pivot.column = that._pivot.column + 1;
          that._pivot.row = that._pivot.row + 1;
        }
      });

      // 3. forEach row:
        // a. _zeroAllRowsAboveThePivot(),
      for (var i = limit; i > -1; i--) {
        that._zeroAllRowsAboveThePivot();
        // b. _pivot.row--, _pivot.column--
        // move the pivot up and over unless
        if (i > -1) {
        that._pivot.row = that._pivot.row - 1;
        that._pivot.column = that._pivot.column - 1;
        }
        // the pivot shoud be scaled to postive one
        // _scalePivotToOne
      }
      console.table(this._systemState);
    }

    _switch(aRowNumber, differentRowNumber){
      let holder = this._systemState[differentRowNumber];
      this._systemState[differentRowNumber] = this._systemState[aRowNumber];
      this._systemState[aRowNumber] = holder;
    }

    _rowReplacement(rowToBeReplaced, otherRow, scale){
      const that = this;
      const deleteCount = 1;
      let otherRowScaled = that._getRowScaledBy(that._systemState[otherRow], scale);
      let sumOfRows = otherRowScaled.map(function (num, idx) {
        let otherRowAtIndexValue = that._systemState[rowToBeReplaced][idx];
        let value = num + otherRowAtIndexValue;
        return value;
      });
      that._systemState.splice(rowToBeReplaced, deleteCount, sumOfRows)
    }

    _getRowScaledBy (row, scale) {
      let rowScaled = row.map(function (entry, idx) {
        let number = scale * Number(entry);
        return number;
      });
      return rowScaled;
    }
    _zeroAllRowsAboveThePivot(){
      const column = this._pivot.column;
      const row = this._pivot.row;
      const rowAboveThePivot = row - 1;
      //for each of the rows above the pivot
      for (var i = rowAboveThePivot; i > -1; i--) {
        // if the row is non-zero
        if (this._systemState[row][column] != 0) {
          //use  _rowReplacementRemover on each
          this._rowReplacementRemover(i);
        }
      }
    };
  // that._zeroAllRowsUnderThePivot(that._pivot.column, that._pivot.row);
    _zeroAllRowsUnderThePivot(){
      const column = this._pivot.column;
      const row = this._pivot.row;
      const rowUnderThePivot = row + 1;
    // for each entries below the pivot,
      for (var i = rowUnderThePivot; i < this._systemState.length; i++) {
        // if the row is non-zero
        if (this._systemState[column][i] != 0) {
          //use  _rowReplacementRemover on each
          this._rowReplacementRemover(i);
        }
      }
    }

    // zeros out the entry using _rowReplacement and the _pivot
    _rowReplacementRemover(rowNumber){
      const rowValue = Number(this._systemState[rowNumber][this._pivot.column]);
      const pivotValue = Number(this._systemState[this._pivot.row][this._pivot.column]);
      const scale = (rowValue / pivotValue)  * -1;
      this._rowReplacement(rowNumber, this._pivot.row, scale);
    }

    _largestAbsoluteMovedToTopOfColumn(){
      const rowsOffSetNumber = this._pivot.row;
      const columnNumber = this._pivot.column;
      let largestValue = 0;
      let indexOfLargestValue = undefined;
      const columnArray = this._systemState.map(function(value) {
        return Number(value[columnNumber]);
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
    [1,1,1,20],
    [2,3,1,5],
    [-3,-2,1,5]
  ];

  const largestToTopSystem = new LinearSystem(largestToTopInitObject);
  largestToTopSystem.solve();
