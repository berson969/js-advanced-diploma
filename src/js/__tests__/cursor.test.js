import { expect, test } from '@jest/globals';
import cursors from '../cursors';

test('cursors', () => {
  expect(cursors).toEqual({
    auto: 'auto',
    crosshair: 'crosshair',
    notallowed: 'not-allowed',
    pointer: 'pointer',
  });
});
