import linearSystem from '../index.js'
import sinon from 'sinon'
describe('linearSystem', () => {
    let linSys;
    let data;
    beforeEach(function() {
        linSys = new linearSystem();
        data = {
          s : [[2,2,6],[9,9,30]]
        };
    });
    describe('_switch', () => {
      it('linearSystem._switch should exchange places of two diffrent rows', () => {
        let thing = linSys._switch(data,0,1);
        expect(thing.s).toEqual([[9,9,30],[2,2,6]]);
        //mutation check
      });

      it('_switch mutation check', () => {
        let thing = linSys._switch(data,0,1);
        expect(thing.s).toEqual([[9,9,30],[2,2,6]]);
        expect(data).toEqual({ s : [[2,2,6],[9,9,30]]});
      });
    });


  it('linearSystem._getRowScaledBy should return array mulitplied by scale', () => {
    let row = linSys._getRowScaledBy([2,0,6],2);
    expect(row).toEqual([4,0,12]);
  });

  it('linearSystem._getRowScaledBy should return array mulitplied to negitive scale', () => {
    let row = linSys._getRowScaledBy([2,0,-6],-1);
    expect(row).toEqual([-2,0,6]);
  });

  it('_rowReplacement should call _getRowScaledBy with data', () => {
    let scaledBy = sinon.spy(linSys, '_getRowScaledBy');
    let rowToBeReplaced = 0, otherRow = 1, scale = 2;
    linSys._rowReplacement(data, rowToBeReplaced, otherRow, scale);
    scaledBy.restore();
    sinon.assert.calledWith(scaledBy, [9,9,30], 2);
  });

  it('linearSystem._rowReplacement should return array with a row replaced by itself mulitplied to scale', () => {
    let rowToBeReplaced = 0,otherRow = 1,scale = 2;
    let newthing = linSys._rowReplacement(data, rowToBeReplaced, otherRow, scale);
    expect(newthing).toEqual({s : [[20,20,66],[9,9,30]]});
  });

  it('linearSystem._largestAbsoluteMovedToTopOfColumn should return array with largest absolute value to top of each pivot', () => {
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

  it('linearSystem._zeroAllRowsUnderThePivot returns correct value', () => {
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

  it('_zeroAllRowsUnderThePivot mutation check', () => {
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
});
