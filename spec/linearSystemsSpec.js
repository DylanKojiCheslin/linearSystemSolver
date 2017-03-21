import linearSystem from '../index.js'

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

})
