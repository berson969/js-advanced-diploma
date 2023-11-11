import { expect, test } from '@jest/globals';
import Vampire from '../../characters/Vampire';

test('create-Vampire', () => {
  expect(new Vampire(4)).toEqual({
    attack: 25,
    attackDistance: 2,
    defence: 25,
    health: 50,
    level: 4,
    moveDistance: 2,
    type: 'Vampire',
  });
});