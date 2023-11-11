import { expect, test } from '@jest/globals';
import Undead from '../../characters/Undead';

test('create-Undead', () => {
  expect(new Undead(3)).toEqual({
    attack: 40,
    attackDistance: 1,
    defence: 10,
    health: 50,
    level: 3,
    moveDistance: 4,
    type: 'Undead',
  });
});
