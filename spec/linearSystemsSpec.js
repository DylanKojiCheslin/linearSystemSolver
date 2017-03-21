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
	})
})
