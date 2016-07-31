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
 "x3 = 20:,  
 "-2x2 = 5"]
