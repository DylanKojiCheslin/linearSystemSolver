import {findPivotColumn} from '../findPivotColumn'
import {initializePivot} from '../initializePivot'
import sinon from 'sinon'

  describe('findPivotColumn', () => {

    it('returns the correct pivot column', () => {
      const inputMatrix =
        [
          [0,0,0,0],
          [0,1,0,0],
          [0,0,0,0]
        ];
      const expectedOutput = 1;
      const output = findPivotColumn(inputMatrix);
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
      const output = findPivotColumn(inputMatrix);
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
        function(){findPivotColumn(inputMatrix)}
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
    })
  })

});
