# linearSystemUtility
tools for exploring linear systems

what is a [System of linear equations](https://en.wikipedia.org/wiki/System_of_linear_equations "System_of_linear_equations")

## behavior of this code

while showing its work and making its decision process known the code should do the following:

take a linear systems as a array of strings or as a array of numbers that conform to the augmented matrix notation
if it is an array of strings convert it into augmented matrix notation
find out if the systems has: no solution, one solution, infinite solutions
if there is one or more solutions then define them for the user

optionaly to graph the system

##taking a linear system as a array of strings
a linear system as an array of two or more strings where each should have the following properties:  
1. is an "equation" ends in a "=" symbol followed by a space and a real or complex number  
2. before the equation there are one or more groupings of:  
2a.  positive "+" or negative "-" sypmbol(if it is the first in the string the positive may be assumed and not written) this may be followed by a space " " symbol,  
2b. a real or complex coefficient(if the coefficient is one it will not be written), followed by "x" subscripted by any positive integer  

example:  
["2x1 + 3x2 = 5",   
 "x3 = 2",  
 "-2x2 = 5"]

## convert into augmented matrix notation

the internal workings will be a wrapper object w/utils around a array that is the state data storage in the form of augmented matrix notation. there will be a static method to convert arrays of strings.

```javascript
let theSystemAnArrayOfStrings = [
"2x1 + 3x2 = 5",   
   "x3 = 20",  
   "-2x2 = 5"
 ];

 let theSystemAugmentedMatrixNotation = LinearSystem.convertToAugmentedMartrixNotation(theSystemAnArrayOfStrings);
```

after it is converted it can be used to instantiate a LinearSystem object.

```javascript
let theSystem = new LinearSystem(theSystemAugmentedMatrixNotation);
```

##find out if the systems has: no solution, one solution, infinite solutions

what is a [solving a linear system](https://en.wikipedia.org/wiki/Augmented_matrix#Solution_of_a_linear_system "solving_a_System_of_linear_equations")

[3 row operations:](https://en.wikipedia.org/wiki/Elementary_matrix#Operations "matrix_Operations")

1. (switch) switch 2 rows positions
2. (scaling) multiply every entry in a row by a non-zero constant
3. (addition) replace a row with its sum and a multiple of a different row and a non-zero constant


```javascript
let solution = theSystem.solve();
console.log(solution);
```

## API

### static methods

#### convertToAugmentedMartrixNotation
LinearSystem.convertToAugmentedMartrixNotation(arrayOfStrings);

returns a array of the system

## instance methods

### new LinearSystem
new LinearSystem( theSystemAugmentedMatrixNotation );

return an instance of LinearSystem

### solve
yourInstance.solve()

return a description of the systems solution in reduced echelon form

1. the left most non-zero column is the _pivotColumn
2. the top row/column postion of the _pivotColumn is the _pivot
3. _largestAbsoluteMovedToTopOfColumn on the _pivotColumn - largest to top
4. _zeroAllRowsUnderThePevot() - row replacement operaitons to "zero" all entry under the pivot

4. foreach other row:
- note this doesn't work with non-square linear systems, find a way to fix this
-provide example of non-square linear system
- possible solution is to go down&right one then go right until there is a non-zero number?
a. _pivot.row++, _pivot.column++
b. _zeroAllRowsUnderThePevot()
5. _zeroAllRowsAboveThePivot(), _scalePivotToOne
6. foreach other row:
a. _pivot.row--, _pivot--
b. _zeroAllRowsAboveThePivot(), _scalePivotToOne


### verboseSolution
yourInstance.verboseSolution()

prints console logs of the details of what it is doing, returns a solution in reduced echelon form

### isSolvable
yourInstance.solve()

return a description of the systems solution in echelon form (non-reduced)

### verboseIsSolvable
yourInstance.verboseIsSolveable()

prints console logs of the details of what it is doing, returns a solution in echelon form (non-reduced)

### _logState

console.log of _systemState

### _switch
yourInstance._switch(rowNumberOne, rowNumberTwo)
exchange the location of 2 rows

### _scaling
yourInstance._scaling(rowNumber, scaleNumber)
scales all entries in row by a non-zero number

### _addition
yourInstance._addition(rowNumberToBeReplaced, diffrenctRowNumber, scaleNumberForOtherRow)
replaces the row in rowNumberToBeReplaced with the the product of the row in diffrenctRowNumber and scaleNumberForOtherRow

### _zeroAllRowsUnderThePevot
iterate over all entries below the pivot, use _rowReplacementRemover on each

### _zeroAllRowsAboveThePevot
iterate over all entries above the pivot, use _rowReplacementRemover on each

### _rowReplacementRemover()
zeros out the entry using _addition and the _pivot

### _scalePivotToOne
uses _scaling on the row of _pivot to scale _pivot to 1

### _largestAbsoluteMovedToTopOfColumn(columnNumber, rowsOffSetNumber)

rearranges rows to move the largest absolute value in to the top of the column row to the top.
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
returns a bool indicating if the matrix is in [reduced echelon form](https://en.wikipedia.org/wiki/Row_echelon_form#Reduced_row_echelon_form "reduced_Etchelon_form")
