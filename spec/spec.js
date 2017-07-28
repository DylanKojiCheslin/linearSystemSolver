import {findPivotColumn} from '../findPivotColumn'
import sinon from 'sinon'

  describe('findPivotColumn', () => {

    it('returns the correct pivot column', () => {
      const inputSystem =
        [
          [0,0,0,0],
          [0,1,0,0],
          [0,0,0,0]
        ];
      const expectedOutput = 1;
      const output = findPivotColumn(inputSystem);
      expect(output).toEqual(expectedOutput);
    });

    it('returns the correct pivot column non rotational symmetry input', () => {
      const inputSystem =
        [
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,1,0,1]
        ];
      const expectedOutput = 4;
      const output = findPivotColumn(inputSystem);
      expect(output).toEqual(expectedOutput);
    });

    it('throws error if all coefficients are zero', () => {
      const inputSystem =
        [
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,1]
        ];
      expect(
        function(){findPivotColumn(inputSystem)}
      ).toThrow('empty sets have no solutions');
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
          const output = findPivotColumn(input);
          expect(input).toEqual(expectedInput);
    });


});
