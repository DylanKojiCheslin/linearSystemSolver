  export default class LinearSystem {
    constructor(matrix) {
      if (matrix != undefined) {
        this._isCorrectFormat(matrix);
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
      let system = {};
      system.s = this._systemState;
      system.pivot = this._pivot;
      system = this._initializePivot(system);
      system = this._changeToEtchlonForm(system);
      system = this._changeToRowCanonicalForm(system);
        return system;
    }

    _changeToRowCanonicalForm(system){
      // 3. forEach row:
      let limit = system.s.length - 1;
      for (var i = limit; i >= 0; i--) {
        // a. _zeroAllRowsAboveThePivot(),
        system = this._zeroAllRowsAboveThePivot(system);
        // the pivot shoud be scaled to postive one
        system = this._scalePivotToOne(system);
        // b. pivot.row--, pivot.column--
        // move the pivot up and over unless its at the top
        if (i > 0) {
          system.pivot.row = system.pivot.row - 1;
          system.pivot.column = system.pivot.column - 1;
        }
      }
      return system;
    }

    _changeToEtchlonForm(system){
      let limit = system.s.length - 1;
      // forEach row:
      for (var i = 0; i < system.s.length; i++) {
        // a. _largestAbsoluteMovedToTopOfColumn on the pivot.column - largest to top
        system = this._largestAbsoluteMovedToTopOfColumn(system)
        // b. _zeroAllRowsUnderThePivot() - row replacement operations to "zero" all entry under the pivot
        system = this._zeroAllRowsUnderThePivot(system);
        //unless the pivot is in the bottom right
        if (system.pivot.column < limit && system.pivot.row < limit) {
        // c. pivot.row++, pivot.column++
          system.pivot.column = system.pivot.column + 1;
          system.pivot.row = system.pivot.row + 1;
        }
      }
      return system;
    }

    //checks if input is correctly formatted linear system
    _isCorrectFormat(matrix){
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
    };


  // _initaialzePivot
    _initializePivot(system){
      const pivotColumn = this._findPivot(system);
      let newSystem = JSON.parse(JSON.stringify(system));
      newSystem.pivot.row = 0;
      newSystem.pivot.column = pivotColumn;
      return newSystem;
  }

      //the left most non-zero entry that is also (not the right most column) is the pivot column
    _findPivot(system){
      // remove the rightmost solution column
      const withOutTheRightestColumn = system.s.map(
        function(x, index, array){
          const thisRowWithOutTheRightestColumn =  x.filter(function(y, index, array){
            return !!(array.length -1 != index);
          })
        return thisRowWithOutTheRightestColumn;
      })
      // get the columns
      const columns = withOutTheRightestColumn.map(function(column, index, array){
        return withOutTheRightestColumn.map(function(row){
          return row[index];
        })
      })
      //find column with non-zero the columns
      const pivotColumn = columns.findIndex(function( x, index, array ){
        const nonZeroIncolumn = x.some( function( y ){
          return Math.abs(y) > 0
        })
        return nonZeroIncolumn;
      })

      //none found
      if ( pivotColumn == -1 ){
        throw 'empty sets have no solutions';
      }
      return pivotColumn;
    }

    _switch(system, aRowNumber, differentRowNumber){
      let newSystem = JSON.parse(JSON.stringify(system));
      let holder = newSystem.s[differentRowNumber];
      newSystem.s[differentRowNumber] = newSystem.s[aRowNumber];
      newSystem.s[aRowNumber] = holder;
      return newSystem;
    }

    _rowReplacement(system, rowToBeReplaced, otherRow, scale){
      let newSystem = JSON.parse(JSON.stringify(system));
      const deleteCount = 1;
      let otherRowScaled = this._getRowScaledBy(newSystem.s[otherRow], scale);
      let sumOfRows = otherRowScaled.map(function (num, idx) {
        let otherRowAtIndexValue = newSystem.s[rowToBeReplaced][idx];
        let value = num + otherRowAtIndexValue;
        return value;
      });
      newSystem.s[rowToBeReplaced] = sumOfRows;
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
        if (system.s[i][column] != 0) {
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
        if (newSystem.s[i][column] != 0) {
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
      if (pivotValue != 0) {
        const scale = (rowValue / pivotValue)  * -1;
        newSystem = this._rowReplacement(newSystem, rowNumber, system.pivot.row, scale);
      }
      return newSystem;
    }

    _scalePivotToOne(system){
      // a = ((a/b) * b)
      let newSystem = JSON.parse(JSON.stringify(system));
      const deleteCount = 1;
      const rowNumber = newSystem.pivot.row;
      const pivotValue = Number(newSystem.s[system.pivot.row][newSystem.pivot.column]);
      if (pivotValue != 1) {
        const scale = 1 / pivotValue;
        const rowPivotScaledToOne = this._getRowScaledBy(newSystem.s[rowNumber], scale);
        newSystem.s.splice(rowNumber, deleteCount, rowPivotScaledToOne);
      }
      return newSystem;
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
