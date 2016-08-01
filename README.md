# linearSystemUtility
tools for exploring linear systems

what is a [System of linear equations](https://en.wikipedia.org/wiki/System_of_linear_equations "System_of_linear_equations")

## behavior of this code

while showing its work and making its desicion process known the code should do the following:

take a linear systems as a array of strings or as a array of numbers that confrom to the augmented matrix notation
if it is an array of strings convert it into augmented matrix notation
find out if the systems has: no solution, one solution, infinite solutions
if there is one or more solutions then define them for the user

optionaly to graph the system

##taking a linear system as a array of strings
a linear system as an array of two or more strings where each should have the following properties:  
1. is an "equation" ends in a "=" symbol followed by a space and a real or complex number  
2. before the equation there are one or more groupings of:  
2a.  positive "+" or negitive "-" sypmbol(if it is the first in the string the positive may be assumed and not written) this may be followed by a space " " symbol,  
2b. a real or complex coefficient(if the coefficient is one it will not be written), followed by "x" subscriped by any positive integer  

example:  
["2x1 + 3x2 = 5",   
 "x3 = 2",  
 "-2x2 = 5"]

## convert into augmented matrix notation

the intrenal workings of the codebase will be a wrapper object w/utils around a array that is the state data storage in the form of augmented matrix notation. there will be a static method to convert arrays of strings.

```javascript
let theSystemAnArrayOfStrings = [
"2x1 + 3x2 = 5",   
   "x3 = 20",  
   "-2x2 = 5"
 ];
 
 let theSystemAugmentedMatrixNotation = LinearSystem.convertToAugmentedMartrixNotation(theSystemAnArrayOfStrings);
```

after it is converted it can be used to instanseate a LinearSystem object.

```javascript
let theSystem = new LinearSystem(theSystemAugmentedMatrixNotation);
```

##find out if the systems has: no solution, one solution, infinite solutions

what is a [solving a linear system](https://en.wikipedia.org/wiki/Augmented_matrix#Solution_of_a_linear_system "solving_a_System_of_linear_equations")

[3 row operations:](https://en.wikipedia.org/wiki/Elementary_matrix#Operations "matrix_Operations")

1. (switch) switch 2 rows positions
2. (scaling) mulitply every entry in a row by a non-zero constant
3. (addition) replace a row with its sum and a mulitple of a diffrent row and a non-zero constant


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

### _floatingSortOfColumn(columnNumber, rowsOffSetNumber)
does a floating sort to rearage rows to move non zero rows to the top.
rosOffSetNumber argumemt will prevent the rows from being rearagned,
the rowsOffSetNumber argument defaluts to zero

### _switch
yourInstance._switch(rowNumberOne, rowNumberTwo)
excnage the location of 2 rows

### _scaling
yourInstance._scaling(rowNumber, scaleNumber)
scales all entries in row by a non-zero number

### _addition
yourInstance._addition(rowNumberToBeReplaced, diffrenctRowNumber, scaleNumberForOtherRow)
replaces the row in rowNumberToBeReplaced with the the product of the row in diffrenctRowNumber and scaleNumberForOtherRow

## instance properties


### _systemState
the internal storage of the linear systems matrix as an array

### _isEchelonForm
returns a bool indecating if the matrix is in [echelon form](https://en.wikipedia.org/wiki/Row_echelon_form "etchlon_Form")

### _isReducedEchelonForm 
returns a bool indecating if the matrix is in [reduced echelon form](https://en.wikipedia.org/wiki/Row_echelon_form#Reduced_row_echelon_form "reduced_Etchelon_form")

