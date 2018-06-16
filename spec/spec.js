import {addPivotToLeadingValues} from '../addPivotToLeadingValues';
import {changeToEtchlonForm} from '../changeToEtchlonForm';
import {findNextPivotColumn} from '../findNextPivotColumn';
import {findNextPivot} from '../findNextPivot';
import {initializeSystem} from '../initializeSystem';
import {partialPivoting} from '../partialPivoting';
import {pivotValueIsOne} from '../pivotValueIsOne';
import {zeroAllRowsUnderThePivot} from '../zeroAllRowsUnderThePivot';
import sinon from 'sinon';

// findNextPivot should handle no coefficients state
// change no coefficients error into state solvable:false
// findNextPivot if leadingValues.length & no more coefficients coefficientsFound = true
// findNextPivot init state case
// findNextPivot should handle columns that empty under pivot and empty rows

describe('addPivotToLeadingValues', () => {
  it('returns expected value', () => {
    const inputSystem = {
      s : [
        [5,6,7],
        [0,9,1]
      ],
      pivot : {row:0,column:0},
      leadingValues : []
    };
    const expectedOutput = {
      s : [
        [5,6,7],
        [0,9,1]
      ],
      pivot : {row:0,column:0},
      leadingValues : [Object({ row: 0, column: 0 })]
    };
    const outputSystem = addPivotToLeadingValues(inputSystem);
    expect(outputSystem).toEqual(expectedOutput);
  });
});


describe('changeToEtchlonForm', () => {
  it('return expected value 0', () => {
    let inputSystem = {
      s : [
        [3,3,3],
        [4,0,2]
      ],
      pivot : {
        row : 0,
        column : 0
      },
      leadingValues : []
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
      leadingValues: [
        Object({ row: 0, column: 0 }),
        Object({ row: 1, column: 1 })
      ]
    }
    let outputSystem = changeToEtchlonForm(inputSystem);
    expect(outputSystem).toEqual(expectedOutput);
  });

  it('return expected value 1', () => {
    let inputSystem = {
      s : [
        [2,3,0,5],
        [0,0,1,20],
        [0,-2,0,5]
      ],
      pivot : {
        row : 0,
        column : 0
      },
      leadingValues : []
    }
    const expectedOutput = {
      s: [
          [1,1.5,0,2.5],
          [0,1,0,-2.5],
          [0,0,1,20]
      ],
      pivot: {
        row: 2,
        column: 2
      },
      leadingValues: [
        Object({ row: 0, column: 0 }),
        Object({ row: 1, column: 1 }),
        Object({ row: 2, column: 2 })
       ]
    }
    let outputSystem = changeToEtchlonForm(inputSystem);
    expect(outputSystem).toEqual(expectedOutput);
  });

});

describe('findNextPivot', () => {
  it('returns correctly', () => {
    const inputSystem = {
      s: [
        [ 1, 0, 0.5 ],
        [ 0, 3, 1.5 ]
      ],
      pivot: {row: 0, column: 0},
      leadingValues: [
        { row: 0, column: 0 }
      ]
    }
    const expectedOutput = {
      s: [
        [ 1, 0, 0.5 ],
        [ 0, 3, 1.5 ]
      ],
      pivot: {row: 1, column: 1},
      leadingValues: [
        { row: 0, column: 0 }
      ]
    }
    let outputSystem = findNextPivot(inputSystem);
    expect(outputSystem).toEqual(expectedOutput);
  });

  it('returns correctly on last pivot', () => {
    const inputSystem = {
      s: [
        [ 1, 0, 0, 0.5 ],
        [ 0, 3, 0, 1.5 ],
        [ 0, 0, 0, 0   ]
      ],
      pivot: {row: 1, column: 1},
      leadingValues: [
        { row: 0, column: 0 },
        { row: 1, column: 1 }
      ]
    };
    const expectedOutput = {
      s: [
        [ 1, 0, 0, 0.5 ],
        [ 0, 3, 0, 1.5 ],
        [ 0, 0, 0, 0   ]
      ],
      pivot: {row: 1, column: 1},
      leadingValues: [
        { row: 0, column: 0 },
        { row: 1, column: 1 }
      ],
      lastLeadingEntryFound: true
    };
    let outputSystem = findNextPivot(inputSystem);
    expect(outputSystem).toEqual(expectedOutput);
  });

});

describe('findNextPivotColumn', () => {

  it('returns the correct pivot column', () => {
    const inputMatrix = {
      s :
      [
        [0,0,0,0],
        [0,1,0,0],
        [0,0,0,0]
      ],
      pivot : {
        row : -1,
        column : -1
      },
      leadingValues : []
    };
    const expectedOutput = 1;
    const output = findNextPivotColumn(inputMatrix);
    expect(output).toEqual(expectedOutput);
  });

  it('returns the correct pivot column non rotational symmetry input', () => {
    const inputMatrix = {
      s :
      [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,1,0,1]
      ],
      pivot : {
        row : -1,
        column : -1
      },
      leadingValues : []
    };
    const expectedOutput = 4;
    const output = findNextPivotColumn(inputMatrix);
    expect(output).toEqual(expectedOutput);
  });

  it('returns the correct for first column', () => {
    const inputMatrix = {
      s :
      [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0],
        [0,0,0,0,0,0,1]
      ],
      pivot : {
        row : -1,
        column : -1
      },
      leadingValues : []
    };
    const expectedOutput = 0;
    const output = findNextPivotColumn(inputMatrix);
    expect(output).toEqual(expectedOutput);
  });

  it('returns correct for all zeros', () => {
    const inputMatrix = {
      s :
      [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1]
      ],
      pivot : {
        row : -1,
        column : -1
      },
      leadingValues : []
    };
    const expectedOutput = -1;
    const output = findNextPivotColumn(inputMatrix);
    expect(output).toEqual(expectedOutput);
  });

  it('returns correctly on last leadingValue', () => {
    const inputMatrix = {
      s :
      [
        [0,1,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      pivot : {
        row : 0,
        column : 1
      },
      leadingValues : [
        Object({ row: 0, column: 1 })
      ]
    };
    const expectedOutput = -1;
    const output = findNextPivotColumn(inputMatrix);
    expect(output).toEqual(expectedOutput);
  });

});

describe('initializeSystem', () => {
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
      },
      leadingValues : []
    };
    const outputSystem = initializeSystem(inputMatrix);
    expect(outputSystem).toEqual(expectedOutput);
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
        function(){initializeSystem(inputMatrix)}
      ).toThrow('sets with no pivot column have no solutions');
    });

});

describe("partialPivoting", () => {
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
    let output = partialPivoting(inputSystem);
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
