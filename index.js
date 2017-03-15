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
      this._pivot = {
        row: undefined,
        column: undefined
      };
      this._isEchelonForm = undefined;
      this._isReducedEchelonForm = undefined;
    }

    solve(){
      // 1. the left most non-zero column is the _pivot.column
      //try first column, iterate until a column has a non-zero int in it
      let system = {};
      system.s = this._systemState;
      system.pivot = this._pivot;
      let isNonZero = false;
      const that = this;
      for (var i = 0; i < system.s.length; i++) {
        let thisColumn = system.s.map(function(value) {
          return value[i];
        });
        isNonZero = thisColumn.some(function(entry){
          return Math.abs(entry) > 0
        });
        if (isNonZero) {
          system.pivot.column = i;
          break;
        }
      }
      //if there isn't a non-zero column then the set is empty and has no solutions
      if ( undefined === system.pivot.column) {
        throw 'empty sets have no solutions';
      }
      // 2. the top row/column postion of the _pivot.column is the _pivot location
      system.pivot.row = 0;
      system.pivot.column = this._pivot.column;
      let limit = system.s.length - 1;
      // forEach row:
      for (var i = 0; i < system.s.length; i++) {
        // a. _largestAbsoluteMovedToTopOfColumn on the _pivot.column - largest to top
        system = that._largestAbsoluteMovedToTopOfColumn(system)
        // b. _zeroAllRowsUnderThePivot() - row replacement operations to "zero" all entry under the pivot
        system = that._zeroAllRowsUnderThePivot(system);
        //unless the pivot is in the bottom right
        if (system.pivot.column < limit && system.pivot.row < limit) {
        // c. _pivot.row++, _pivot.column++
          system.pivot.column = system.pivot.column + 1;
          system.pivot.row = system.pivot.row + 1;
        }
      }

      // 3. forEach row:
      for (var i = limit; i > -1; i--) {
        // a. _zeroAllRowsAboveThePivot(),
        system = that._zeroAllRowsAboveThePivot(system);
        // the pivot shoud be scaled to postive one
        system = that._scalePivotToOne(system);
        // b. _pivot.row--, _pivot.column--
        // move the pivot up and over unless its at the top
        if (i > -1) {
          that._pivot.row = that._pivot.row - 1;
          that._pivot.column = that._pivot.column - 1;
        }
      }
      console.table(system.s);
    }

    _switch(system, aRowNumber, differentRowNumber){
      //change to splice
      let holder = system.s[differentRowNumber];
      system.s[differentRowNumber] = system.s[aRowNumber];
      system.s[aRowNumber] = holder;
      return system;
    }

    _rowReplacement(system, rowToBeReplaced, otherRow, scale){
      const that = this;
      const deleteCount = 1;
      let otherRowScaled = that._getRowScaledBy(that._systemState[otherRow], scale);
      let sumOfRows = otherRowScaled.map(function (num, idx) {
        let otherRowAtIndexValue = system.s[rowToBeReplaced][idx];
        let value = num + otherRowAtIndexValue;
        return value;
      });
      system.s.splice(rowToBeReplaced, deleteCount, sumOfRows)
      return system;
    }

    _getRowScaledBy (row, scale) {
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
    _zeroAllRowsAboveThePivot(system){
      const column = system.pivot.column;
      const row = system.pivot.row;
      const rowAboveThePivot = row - 1;
      //for each of the rows above the pivot
      for (var i = rowAboveThePivot; i > -1; i--) {
        // if the row is non-zero
        if (system.s[row][column] != 0) {
          //use  _rowReplacementRemover on each
          system = this._rowReplacementRemover(system, i);
        }
      }
      return system;
    };
  // that._zeroAllRowsUnderThePivot(that._pivot.column, that._pivot.row);
    _zeroAllRowsUnderThePivot(system){
      const column = system.pivot.column;
      const row = system.pivot.row;
      const rowUnderThePivot = row + 1;
      const limit = system.s.length;
      let newSystem = system;
    // for each entries below the pivot,
      for (var i = rowUnderThePivot; i < limit; i++) {
        // if the row is non-zero
        if (newSystem.s[row][i] != 0) {
          //use  _rowReplacementRemover on each
          newSystem = this._rowReplacementRemover(system, i);
        }
      }
      return newSystem;
    }

    // zeros out the entry using _rowReplacement and the _pivot
    _rowReplacementRemover(system, rowNumber){
      const rowValue = Number(system.s[rowNumber][system.pivot.column]);
      const pivotValue = Number(system.s[system.pivot.row][system.pivot.column]);
      const scale = (rowValue / pivotValue)  * -1;
      system = this._rowReplacement(system, rowNumber, system.pivot.row, scale);
      return system;
    }

    _scalePivotToOne(system){
      // a = ((a/b) * b)
      const deleteCount = 1;
      const rowNumber = system.pivot.row;
      const pivotValue = Number(system.s[system.pivot.row][system.pivot.column]);
      const scale = 1 / pivotValue;
      const rowPivotScaledToOne = this._getRowScaledBy(system.s[rowNumber], scale);
      system.s.splice(rowNumber, deleteCount, rowPivotScaledToOne)
      return system;
    }

    _largestAbsoluteMovedToTopOfColumn(system){
      const rowsOffSetNumber = system.pivot.row;
      const columnNumber = system.pivot.column;
      let largestValue = 0;
      let indexOfLargestValue = undefined;
      const columnArray = system.s.map(function(value) {
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
      system = this._switch(system, system.pivot.row, indexOfLargestValue)
      return system;
    }
  }

  const largestToTopInitObject = [
    [1,1,1,20],
    [2,3,1,5],
    [-3,-2,1,5]
  ];

  const largestToTopSystem = new LinearSystem(largestToTopInitObject);
  largestToTopSystem.solve();
