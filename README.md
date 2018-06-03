# linearSystemUtility

<!-- [![Build Status](https://travis-ci.org/DylanKojiCheslin/linearSystemUtility.svg?branch=master)](https://travis-ci.org/DylanKojiCheslin/linearSystemSolver)   -->
tools for exploring linear systems

what is a [System of linear equations](https://en.wikipedia.org/wiki/System_of_linear_equations "System_of_linear_equations")

## project specifications

### features
takes systems of linear equations in augmented matrix notation and
find if the systems have: no solution, one solution, infinite solutions.
if there is a solution defines it.

##find if the systems has: no solution, one solution, infinite solutions

what is a [solving a system of linear equations](https://en.wikipedia.org/wiki/Augmented_matrix#Solution_of_a_linear_system "solving_a_System_of_linear_equations")[of linear equations](http://mathworld.wolfram.com/LinearSystemofEquations.html)

[3 row operations:](https://en.wikipedia.org/wiki/Elementary_matrix#Operations "matrix_Operations")

1. (switch) switch 2 rows positions
2. (scaling) multiply every entry in a row by a non-zero constant
3. (rowReplacement) replace a row with its sum and a multiple of a different row and a non-zero constant

## API

### LinearSystemSolution

```javascript
const intObject = [
  [2,3,0,5],
  [0,0,1,20],
  [0,-2,0,5]
]
const solution = LinearSystemSolution(intObject);
```
return a description of the systems solution (or lack of one)

initializePivot
1. the left most non-zero column is the pivot column
2. the top row position of the pivot column is the pivot row

foreach row:
a. moveLargestToTopOfPivotColumn on the pivotColumn - largest to top
b. zeroAllRowsUnderThePevot() - row replacement operations to "zero" all entry under the pivot
c. pivot.row++, pivot.column++
3. foreach row:
a. zeroAllRowsAboveThePivot(), scalePivotToOne
b. pivot.row--, pivot--

### switchRows
switchRows(system, rowNumberOne, rowNumberTwo)
exchange the location of 2 rows

### scaling
scaling(system, rowNumber, scaleNumber)
scales all entries in row by a non-zero number

### rowReplacement
rowReplacement(system, rowToBeReplaced, differentRowNumber, scaleNumberForOtherRow)
replaces the row in rowToBeReplaced with the the product of the row in differentRowNumber and scaleNumberForOtherRow

### zeroAllRowsUnderThePivot
iterate over all entries below the pivot, use rowReplacementRemover on each

### zeroAllRowsAboveThePivot
iterate over all entries above the pivot, use rowReplacementRemover on each

### rowReplacementRemover
zeros out the entry using rowReplacement and the pivot

### scalePivotToOne
uses scaling on the row of pivot to scale the entry in the pivot position to 1

### moveLargestToTopOfPivotColumn(system)
rearranges rows to move the largest absolute value to the top of the column row to the top.
this is sometimes called partial pivoting

### isEchelonForm
returns a bool indicating if the matrix is in [echelon form](https://en.wikipedia.org/wiki/Row_echelon_form "etchlon_Form")

### isReducedEchelonForm
returns a bool indicating if the matrix is in [reduced echelon form](https://en.wikipedia.org/wiki/Row_echelon_form#Reduced_row_echelon_form "reduced_echelon_form")

## possible features or research topics

### graph solutions
after solved a nice chart to look at if, low enough number of dimensions

### animation of algorithm behavior
ui element that shows system and animates switching, adding, scaling

### optional parameter bool back-substitution instead of going from echelon to reduced echelon form

### function approximation of this class with less complexity cost or overhead
find cases that are easy examples where skipping one or more steps doesn't affect the solution or an approximation of it

### how do linear systems handle infinite entries
many checks for non-zero numbers in code check like:

```javascript
Math.abs(x) > 0
```
could also be

```javascript
!isNaN(parseFloat(num)) && isFinite(num);
```

not sure how or if linear algebra handle infinite, or how could relate to the js version of infinity

### how neural networks solve linear system
there are many ways, check them out...... If you want me to list resources make an issue
