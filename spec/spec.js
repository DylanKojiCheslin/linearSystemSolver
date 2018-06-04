import {changeToEtchlonForm} from '../changeToEtchlonForm';
import {findNextPivotColumn} from '../findNextPivotColumn';
import {initializePivot} from '../initializePivot';
import {moveLargestToTopOfPivotColumn} from '../moveLargestToTopOfPivotColumn';
import {pivotValueIsOne} from '../pivotValueIsOne';
import {zeroAllRowsUnderThePivot} from '../zeroAllRowsUnderThePivot';
import sinon from 'sinon';

// findNextPivotColumn handles non-init state case
// findNextPivot init state case
// findNextPivot should add current pivot to leadingValues array
// findNextPivot should handle columns that empty under pivot and empty rows
// findNextPivot include findNextPivotColumn with non-zero under pivot

describe('changeToEtchlonForm', () => {
  it('return expected value', () => {
    let inputSystem = {
      s : [
        [3,3,3],
        [4,0,2]
      ],
      pivot : {
        row : 0,
        column : 0
      }
    }
    const expectedOutput = {
      s: [
        [ 1, 0, 0.5 ],
        [ 0, 1, 0.5 ]
      ],
      pivot: {
        row: 1,
        column: 1
      },
      leadingValues: [ ]
    }
    let outputSystem = changeToEtchlonForm(inputSystem);
    console.log("outputSystem");
    console.log(outputSystem);
    expect(outputSystem).toEqual(expectedOutput);
  });
});

describe('findNextPivotColumn', () => {

  it('returns the correct pivot column', () => {
    const inputMatrix =
    [
      [0,0,0,0],
      [0,1,0,0],
      [0,0,0,0]
    ];
    const expectedOutput = 1;
    const output = findNextPivotColumn(inputMatrix);
    expect(output).toEqual(expectedOutput);
  });

  it('returns the correct pivot column non rotational symmetry input', () => {
    const inputMatrix =
    [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,1,0,1]
    ];
    const expectedOutput = 4;
    const output = findNextPivotColumn(inputMatrix);
    expect(output).toEqual(expectedOutput);
  });

  it('throws error if all coefficients are zero', () => {
    const inputMatrix =
    [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,1]
    ];
    expect(
      function(){findNextPivotColumn(inputMatrix)}
    ).toThrow('sets with no pivot column have no solutions');
  });

  it('does not modifiy input', () => {
    const input =
    [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,1,0,1]
    ];
    const expectedInput =
    [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,1,0,1]
    ];
    const output = findNextPivotColumn(input);
    expect(input).toEqual(expectedInput);
  });
});

describe('initializePivot', () => {
  it('returns the correct value', () => {
    const inputMatrix =
    [
      [0,0,0,0],
      [0,1,0,0],
      [0,0,0,0]
    ];
    const expectedOutput = {
      s : [
        [0,0,0,0],
        [0,1,0,0],
        [0,0,0,0]
      ],
      pivot : {
        row : 0,
        column : 1
      }
    };
    const outputSystem = initializePivot(inputMatrix);
    expect(outputSystem).toEqual(expectedOutput);
  });
});

describe("moveLargestToTopOfPivotColumn", () => {
  it('should return array with largest absolute value to top of each pivot', () => {
    let inputSystem = {
      s : [
        [0,1,2,3],
        [1,2,3,4],
        [-3,2,1,5]
      ],
      pivot : {
        column : 0,
        row : 0
      }
    };
    let expectedOutput = {
      s : [
        [-3,2,1,5],
        [1,2,3,4],
        [0,1,2,3]
      ],
      pivot : {
        column : 0,
        row : 0
      }
    };
    let output = moveLargestToTopOfPivotColumn(inputSystem);
    expect(output).toEqual(expectedOutput);
  });
});

describe('pivotValueIsOne', () => {
  it('return expected value', () => {
    let inputSystem = {
      s : [
        [3,3,3],
        [4,0,2]
      ],
      pivot : {
        row : 0,
        column : 0
      }
    };
    let output = pivotValueIsOne(inputSystem);
    expect(output).toEqual(false);
  });
});

describe("zeroAllRowsUnderThePivot", () => {
  it('returns correct value', () => {
    let inputSystem = {
      s : [
        [5,1,1,10],
        [-1,1,1,-2],
        [1,1,1,2]
      ],
      pivot : {
        column : 0,
        row : 0
      }
    };
    let outSystem = zeroAllRowsUnderThePivot(inputSystem);
    expect(outSystem.s).toEqual(
      [
        [ 5, 1, 1, 10 ],
        [ 0, 1.2, 1.2, 0 ],
        [ 0, 0.8, 0.8, 0 ]
      ]
      );
  });
});
