# linearSystemUtility

[![Build Status](https://travis-ci.org/DylanKojiCheslin/linearSystemUtility.svg?branch=master)](https://travis-ci.org/DylanKojiCheslin/linearSystemUtility)  
tools for exploring linear systems

what is a [System of linear equations](https://en.wikipedia.org/wiki/System_of_linear_equations "System_of_linear_equations")

## project specifications

### code specifications
all methods on the class should be purely functional
all methods should have a test preventing input mutation

### features
takes a array of integers that conform to the augmented matrix notation
find out if the systems has: no solution, one solution, infinite solutions
if there is one or more solutions then define them for the user

a LinearSystem object.

```javascript
const intObject = [
  [2,3,0,5],
  [0,0,1,20],
  [0,-2,0,5]
]
const theSystem = new LinearSystem(intObject);
```

##find out if the systems has: no solution, one solution, infinite solutions

what is a [solving a linear system](https://en.wikipedia.org/wiki/Augmented_matrix#Solution_of_a_linear_system "solving_a_System_of_linear_equations")

[3 row operations:](https://en.wikipedia.org/wiki/Elementary_matrix#Operations "matrix_Operations")

1. (switch) switch 2 rows positions
2. (scaling) multiply every entry in a row by a non-zero constant
3. (rowReplacement) replace a row with its sum and a multiple of a different row and a non-zero constant


```javascript
const solution = theSystem.solve();
console.log(solution);
```

## API

## instance methods

### new LinearSystem
new LinearSystem( theSystemAugmentedMatrixNotation );

return an instance of LinearSystem

### solve
  yourInstance.solve({verbose:false,reduced:true})

optional parameter object has:
"verbose" bool prints console logs of the details of the solution default false,
"reduced" bool if the solutions should return in reduced echelon form default true

return a description of the systems solution (or lack of one)

1. the left most non-zero column is the _pivotColumn
2. the top row/column postion of the _pivotColumn is the _pivot
foreach row:
a. _largestAbsoluteMovedToTopOfColumn on the _pivotColumn - largest to top
b. _zeroAllRowsUnderThePevot() - row replacement operations to "zero" all entry under the pivot
c. _pivot.row++, _pivot.column++
3. foreach row:
a. _zeroAllRowsAboveThePivot(), _scalePivotToOne
b. _pivot.row--, _pivot--

### isSolvable
yourInstance.solve({verbose:false})

optional parameter object has "verbose" bool
prints console logs of the details

a system is solvable if it is in echelon form regardless of if it is reduced

return a bool indicating if the system has one or more solutions

### _logState

console.log of _systemState

### _switch
yourInstance._switch(rowNumberOne, rowNumberTwo)
exchange the location of 2 rows

### _scaling
yourInstance._scaling(rowNumber, scaleNumber)
scales all entries in row by a non-zero number

### _rowReplacement
yourInstance._rowReplacement(rowToBeReplaced, diffrenctRowNumber, scaleNumberForOtherRow)
replaces the row in rowToBeReplaced with the the product of the row in diffrenctRowNumber and scaleNumberForOtherRow

### _zeroAllRowsUnderThePivot
iterate over all entries below the pivot, use _rowReplacementRemover on each

### _zeroAllRowsAboveThePivot
iterate over all entries above the pivot, use _rowReplacementRemover on each

### _rowReplacementRemover()
zeros out the entry using _rowReplacement and the _pivot

### _scalePivotToOne
uses _scaling on the row of _pivot to scale _pivot to 1

### _largestAbsoluteMovedToTopOfColumn(columnNumber, rowsOffSetNumber)
rearranges rows to move the largest absolute value to the top of the column row to the top.
this is sometimes called partial pivoting

## instance properties

### _systemState
the internal storage of the linear systems matrix as an array

### _pivot
the pivot position, a obj with props row/column

### _pivotColumn
the pivot column

### _isEchelonForm
returns a bool indicating if the matrix is in [echelon form](https://en.wikipedia.org/wiki/Row_echelon_form "etchlon_Form")

### _isReducedEchelonForm
returns a bool indicating if the matrix is in [reduced echelon form](https://en.wikipedia.org/wiki/Row_echelon_form#Reduced_row_echelon_form "reduced_echelon_form")

## possible features or research topics

### graph solutions
after solved a nice chart to look at if low enough number of dimensions

### animation of algorithm behavior
ui element that shows system and animates switching, adding, scaling

### optional parameter bool back-substitution instead of going from echelon to reduced echelon form

### optional constructor parameter bool toggles validateInput function

### function approximation of this class with less complexity cost or overhead

### how neural networks solve linear system
