import linearSystem from '../index.js'
import sinon from 'sinon'
describe('linearSystem', () => {
    let linSys;
    beforeEach(function() {
        linSys = new linearSystem();
    });

    describe('integration',() => {

      it('returns expected values',() => {
      const initObject =
      [
        [0,0,5,5],
        [0,3,0,3],
        [-4,0,0,20]
      ];
      const expectedOutput = {
        s : [
          [1,0,0,-5],
          [0,1,0,1],
          [0,0,1,1]
        ],
        pivot : {
          column : 0,
          row : 0
        }
      }
      const fullSystem = new linearSystem(initObject);
      const solution = fullSystem.solve();
      expect(solution).toEqual(expectedOutput);
      });
    });

describe('_changeToEtchlonForm', () => {
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
        [ 4, 0, 2 ],
        [ 0, 3, 1.5 ]
      ],
      pivot: {
        row: 1,
        column: 1
      }
    }
    let outputSystem = linSys._changeToEtchlonForm(inputSystem);
    expect(outputSystem).toEqual(expectedOutput);
  });

  it('calls _largestAbsoluteMovedToTopOfColumn correctly', () => {
    let mover = sinon.spy(linSys, '_largestAbsoluteMovedToTopOfColumn');
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
        [ 4, 0, 2 ],
        [ 0, 3, 1.5 ]
      ],
      pivot: {
        row: 1,
        column: 1
      }
    }
    let outputSystem = linSys._changeToEtchlonForm(inputSystem);
    expect(outputSystem).toEqual(expectedOutput);
    mover.restore();
    expect(
      mover.calledWithExactly({
        s : [
          [3,3,3],
          [4,0,2]
        ],
        pivot : {
          row : 0,
          column : 0
        }
      })
    ).toBe(true);
    expect(
      mover.calledWith({
         s: [
           [ 4, 0, 2 ],
           [ 0, 3, 1.5 ]
         ],
         pivot: {
           row: 1,
           column: 1 } })
    ).toBe(true);
  });

});

    describe('_findPivotColumn', () => {

      it('returns with correct pivot', () => {
        const inputSystem = {
          s : [
            [0,0,0,0],
            [0,1,0,0],
            [0,0,0,0]
          ],
          pivot :{
            row : undefined,
            column : undefined
          }
        };
        const expectedOutput = {
          s : [
            [0,0,0,0],
            [0,1,0,0],
            [0,0,0,0]
          ],
          pivot :{
            row : undefined,
            column : 1
          }
        }
        let outputSystem = linSys._findPivotColumn(inputSystem);
        expect(outputSystem).toEqual(expectedOutput);
      });

      it('throws error for empty sets', () => {
        const emptyObject = {
          s:[
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
          ],
          pivot:{
            row : undefined,
            column : undefined
          }
        };
        expect(
          function(){
            linSys._findPivotColumn(emptyObject)
          }).toThrow('empty sets have no solutions');
      });
    });

    describe('_switch', () => {
      it('should exchange places of two diffrent rows', () => {
        let thing = linSys._switch(
          {
            s : [[2,2,6],[9,9,30]]
          },
          0,
          1
        );
        expect(thing.s).toEqual([[9,9,30],[2,2,6]]);
      });

      it('should not mutate input', () => {
        let inputSystem = {s : [[2,2,6],[9,9,30]]};
        let thing = linSys._switch( inputSystem, 0, 1);
        expect(thing.s).toEqual([[9,9,30],[2,2,6]]);
        expect(inputSystem).toEqual({ s : [[2,2,6],[9,9,30]]});
      });
    });

    describe("_getRowScaledBy", () => {
      it('should return array mulitplied by scale', () => {
        let row = linSys._getRowScaledBy([2,0,6],2);
        expect(row).toEqual([4,0,12]);
      });

      it('should return array mulitplied to negitive scale', () => {
        let row = linSys._getRowScaledBy([2,0,-6],-1);
        expect(row).toEqual([-2,0,6]);
      });

      it('should not mutate input', () => {
        let inputSystem = {s : [[2,2,6],[9,9,30]]};
        let row = linSys._getRowScaledBy(inputSystem.s[0],-1);

        expect(inputSystem).toEqual({s : [[2,2,6],[9,9,30]]});
      });
    });

    describe("_rowReplacement", () => {
      it('should call _getRowScaledBy with correctly', () => {
        let inputSystem = {s : [[2,2,6],[9,9,30]]};
        let scaledBy = sinon.spy(linSys, '_getRowScaledBy');
        let rowToBeReplaced = 0, otherRow = 1, scale = 2;
        linSys._rowReplacement(inputSystem, rowToBeReplaced, otherRow, scale);
        scaledBy.restore();
        expect(
          scaledBy.calledWith([9,9,30], 2)
        ).toBe(true);
      });

      it('should return array with a row replaced by itself mulitplied to scale', () => {
        let inputSystem = {s : [[2,2,6],[9,9,30]]};
        let rowToBeReplaced = 0,otherRow = 1,scale = 2;
        let newthing = linSys._rowReplacement(inputSystem, rowToBeReplaced, otherRow, scale);
        expect(newthing).toEqual({s : [[20,20,66],[9,9,30]]});
      });

      it('should not mutate input value', () => {
        let inputSystem = {s : [[2,2,6],[9,9,30]]};
        let rowToBeReplaced = 0, otherRow = 1, scale = 2;
        linSys._rowReplacement(inputSystem, rowToBeReplaced, otherRow, scale);
        expect(inputSystem).toEqual({ s : [[2,2,6],[9,9,30]]});
      });
    });

    describe("_largestAbsoluteMovedToTopOfColumn", () => {
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
        let output = linSys._largestAbsoluteMovedToTopOfColumn(inputSystem);
        expect(output).toEqual(expectedOutput);
      });

      it("calls _switch with correct values", () => {
        let switchy = sinon.spy(linSys, '_switch');
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
        let output = linSys._largestAbsoluteMovedToTopOfColumn(inputSystem);
        switchy.restore();
        expect(
          switchy.calledWith({
            s : [
              [0,1,2,3],
              [1,2,3,4],
              [-3,2,1,5]
            ],
            pivot : {
              column : 0,
              row : 0
            }
        })
      ).toBe(true);
      });

      it("should not mutate input", () => {
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
        linSys._largestAbsoluteMovedToTopOfColumn(inputSystem);
        expect(inputSystem).toEqual({
          s : [
            [0,1,2,3],
            [1,2,3,4],
            [-3,2,1,5]
          ],
          pivot : {
            column : 0,
            row : 0
          }
        });
      });
    });

    describe("_zeroAllRowsUnderThePivot", () => {
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
        let outSystem = linSys._zeroAllRowsUnderThePivot(inputSystem);
        expect(outSystem.s).toEqual(
          [
            [ 5, 1, 1, 10 ],
            [ 0, 1.2, 1.2, 0 ],
            [ 0, 0.8, 0.8, 0 ]
          ]);
      });

      it('should not mutate input', () => {
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
        let outSystem = linSys._zeroAllRowsUnderThePivot(inputSystem);
        expect(inputSystem).toEqual({
          s : [
            [5,1,1,10],
            [-1,1,1,-2],
            [1,1,1,2]
          ],
          pivot : {
            column : 0,
            row : 0
          }
        });
      });

      it("calls _rowReplacementRemover with correct values", () => {
        let replacer = sinon.spy(linSys, '_rowReplacementRemover');
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
        let outSystem = linSys._zeroAllRowsUnderThePivot(inputSystem);
        replacer.restore();
        replacer.calledWithExactly({
          s : [
            [0,1,2,3],
            [1,2,3,4],
            [-3,2,1,5]
          ],
          pivot : {
            column : 0,
            row : 0
          }
        },
      1);
      });

      it('works for smallest input', () => {
        let inputSystem = {
          s: [
            [ 4, 0, 2 ],
            [ 4, 5, 20 ]
          ],
          pivot: {
            row: 0,
            column: 0 }
          };
        let expectedOutput = {
          s: [
            [ 4, 0, 2 ],
            [ 0, 5, 18 ]
          ],
          pivot: {
            row: 0,
            column: 0 }
          };
        let output = linSys._zeroAllRowsUnderThePivot(inputSystem);
      expect(output).toEqual(expectedOutput);
      });
    });

    describe("_zeroAllRowsAboveThePivot", () => {
      it("should return correct output", () => {
        let inputSystem = {
          s : [
            [5,3,4,10],
            [0,5,7,14],
            [0,0,2,54],
          ],
          pivot:{row:2,column:2}
        };
        let outputSystem = linSys._zeroAllRowsAboveThePivot(inputSystem);
        expect(outputSystem).toEqual({
          s:[
            [ 5, 3, 0, -98 ],
            [ 0, 5, 0, -175 ],
            [ 0, 0, 2, 54 ]
          ],
          pivot:{row:2,column:2}});
      });

    it('should not mutate input', () => {
      let inputSystem = {
        s : [
          [5,3,4,10],
          [0,5,7,14],
          [0,0,2,54],
        ],
        pivot:{row:2,column:2}
      };
      let outputSystem = linSys._zeroAllRowsAboveThePivot(inputSystem);
      expect(inputSystem).toEqual({
        s : [
          [5,3,4,10],
          [0,5,7,14],
          [0,0,2,54],
        ],
        pivot:{row:2,column:2}
      });
    });

    it("calls _rowReplacementRemover with correct values", () => {
      let replacer = sinon.spy(linSys, '_rowReplacementRemover');
      let inputSystem = {
        s : [
          [1,2,3,5],
          [0,2,1,5],
          [0,0,5,5]
        ],
        pivot : {row:2,column:2}
      };
      let outSystem = linSys._zeroAllRowsAboveThePivot(inputSystem);
      replacer.restore();
      expect(replacer.calledWithExactly(
        {
          s : [
            [1,2,3,5],
            [0,2,1,5],
            [0,0,5,5]
          ],
          pivot : {row:2,column:2}
        },
      1)).toBe(true);
    });
  });

  describe("_rowReplacementRemover", () => {
    it("returns expected value", () => {
      const rowNumber = 1;
      const inputSystem = {
        s : [
          [2,1,1],
          [1,1,1]
        ],
        pivot : {
          row: 0,
          column: 0
        }
      };
      const expectedOutput = {
        s : [
          [2,1,1],
          [0, .5, .5]
        ],
        pivot : {
          row: 0,
          column: 0
        }
      }
      const output = linSys._rowReplacementRemover(inputSystem, rowNumber);
      expect(output).toEqual(expectedOutput);
    });

    it('calls _rowReplacement with expected paramiters', () => {
      const replacer = sinon.spy(linSys, '_rowReplacement');
      const rowNumber = 1;
      const inputSystem = {
        s : [
          [2,1,1],
          [1,1,1]
        ],
        pivot : {
          row: 0,
          column: 0
        }
      };
      const output = linSys._rowReplacementRemover(inputSystem, rowNumber);
      replacer.restore();
      //._rowReplacement(newSystem, rowNumber, system.pivot.row, scale);
        expect(replacer.calledWithExactly(
          {s : [[2,1,1],[1,1,1]],pivot : {row: 0,column: 0}},
          1,
          0,
          -.5
        )).toBe(true);
    });

    it("handles zero pivot input", () => {
      const inputSystem = {
        s : [
          [0,1,1],
          [1,1,1]
        ],
        pivot : {
          row: 0,
          column: 0}
        };

        const rowNumber = 1;

      const output = linSys._rowReplacementRemover(inputSystem, rowNumber);
      expect(output).toEqual({
        s: [
          [ 0, 1, 1 ],
          [ 1, 1, 1 ] ],
        pivot: {
          row: 0,
          column: 0 } })
    });

  });

    describe("_scalePivotToOne", () => {
      it("return expected value", () => {
        let testSystem = {
          s : [
            [3,0,0,3],
            [0,2,1,5],
            [0,5,6,7,]
          ],
          pivot : {row:0,column:0}
        };
        let outSystem = linSys._scalePivotToOne(testSystem);
        expect(outSystem).toEqual({
          s : [
            [1,0,0,1],
            [0,2,1,5],
            [0,5,6,7,]
          ],
          pivot : {row:0,column:0}
        });
      });

      it('should call _getRowScaledBy with correct values', () => {
        let inputSystem = {
          s : [
            [2,0,0,2],
            [0,2,1,5],
            [0,5,6,7,]
          ],
          pivot : {row:0,column:0}
        };
        let replacer = sinon.spy(linSys, "_getRowScaledBy");
        linSys._scalePivotToOne(inputSystem);
        replacer.restore();
        expect(
          replacer.calledWith([2,0,0,2], 0.5)
        ).toBe(true);
      });
    });

    it('should not mutate input', () => {
      let inputSystem = {
        s : [
          [2,0,0,2],
          [0,2,1,5],
          [0,5,6,7,]
        ],
        pivot : {row:0,column:0}
      };
      linSys._scalePivotToOne(inputSystem);
      expect(inputSystem).toEqual({
        s : [
          [2,0,0,2],
          [0,2,1,5],
          [0,5,6,7,]
        ],
        pivot : {row:0,column:0}
      });
    });
});
