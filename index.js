import clonedeep from 'lodash.clonedeep'
  export default class LinearSystem {
    constructor(matrix) {
      if (matrix != undefined) {
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
      }
      this._systemState = matrix;
      this._pivot = {
        row: undefined,
        column: undefined
      };
      this._isEchelonForm = undefined;
      this._isReducedEchelonForm = undefined;
    }

    solve(){
      if (this._systemState == undefined) {
        throw "_systemState undefined"
      }
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
        return system;
    }

    _switch(system, aRowNumber, differentRowNumber){
      //change to splice
      let newSystem = JSON.parse(JSON.stringify(system));
      let holder = newSystem.s[differentRowNumber];
      newSystem.s[differentRowNumber] = newSystem.s[aRowNumber];
      newSystem.s[aRowNumber] = holder;
      return newSystem;
    }

    _rowReplacement(system, rowToBeReplaced, otherRow, scale){
      let newSystem = JSON.parse(JSON.stringify(system));
      const that = this;
      const deleteCount = 1;
      let otherRowScaled = that._getRowScaledBy(newSystem.s[otherRow], scale);
      let sumOfRows = otherRowScaled.map(function (num, idx) {
        let otherRowAtIndexValue = newSystem.s[rowToBeReplaced][idx];
        let value = num + otherRowAtIndexValue;
        return value;
      });
      newSystem.s.splice(rowToBeReplaced, deleteCount, sumOfRows);
      return newSystem;
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

    _zeroAllRowsUnderThePivot(system){
      let newSystem = JSON.parse(JSON.stringify(system));
      const column = newSystem.pivot.column;
      const row = newSystem.pivot.row;
      const rowUnderThePivot = row + 1;
      const limit = newSystem.s.length;
    // for each entries below the pivot,
      for (var i = rowUnderThePivot; i < limit; i++) {
        // if the row is non-zero
        if (newSystem.s[row][i] != 0) {
          //use  _rowReplacementRemover on each
          newSystem = this._rowReplacementRemover(newSystem, i);
        }
      }
      return newSystem;
    }

    // zeros out the entry using _rowReplacement and the _pivot
    _rowReplacementRemover(system, rowNumber){
      let newSystem = JSON.parse(JSON.stringify(system));
      const rowValue = Number(newSystem.s[rowNumber][newSystem.pivot.column]);
      const pivotValue = Number(newSystem.s[newSystem.pivot.row][newSystem.pivot.column]);
      const scale = (rowValue / pivotValue)  * -1;
      newSystem = this._rowReplacement(newSystem, rowNumber, system.pivot.row, scale);
      return newSystem;
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
      let newSystem = JSON.parse(JSON.stringify(system));
      const rowsOffSetNumber = newSystem.pivot.row;
      const columnNumber = newSystem.pivot.column;
      let largestValue = 0;
      let indexOfLargestValue = undefined;
      const columnArray = newSystem.s.map(function(value) {
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
      newSystem = this._switch(newSystem, system.pivot.row, indexOfLargestValue)
      return newSystem;
    }
  }
