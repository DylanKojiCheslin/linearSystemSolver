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

  it('linearSystem._switch should exchange places of two diffrent rows', () => {
    let thing = linSys._switch(data,0,1);
    expect(thing.s).toEqual([[9,9,30],[2,2,6]]);
  });

  it('linearSystem._getRowScaledBy should return array mulitplied by scale', () => {
    let row = linSys._getRowScaledBy([2,0,6],2);
    expect(row).toEqual([4,0,12]);
  });

  it('linearSystem._getRowScaledBy should return array mulitplied to negitive scale', () => {
    let row = linSys._getRowScaledBy([2,0,-6],-1);
    expect(row).toEqual([-2,0,6]);
  });

  it('linearSystem._rowReplacement should call _getRowScaledBy with data', () => {
    let scaledBy = sinon.spy(linSys, '_getRowScaledBy');
    let rowToBeReplaced = 0, otherRow = 1, scale = 2;
    linSys._rowReplacement(data, rowToBeReplaced, otherRow, scale);
    scaledBy.restore();
    sinon.assert.calledWith(scaledBy, [9,9,30], 2);
  });

  // data = {
  //   s : [[2,2,6],[9,9,30]]
  // };

  it('linearSystem._rowReplacement should return array with a row replaced by itself mulitplied to scale', () => {
    let rowToBeReplaced = 0,otherRow = 1,scale = 2;
    let newthing = linSys._rowReplacement(data, rowToBeReplaced, otherRow, scale);
    expect(newthing).toEqual({s : [[20,20,66],[9,9,30]]});
  });

});
