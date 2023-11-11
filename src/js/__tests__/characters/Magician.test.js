import { expect, test } from '@jest/globals';
import Magician from '../../characters/Magician';

test('create-Magician', () => {
  expect(new Magician(3)).toEqual({
    attack: 10,
    attackDistance: 4,
    defence: 40,
    health: 50,
    level: 3,
    moveDistance: 1,
    type: 'Magician',
  });
});
