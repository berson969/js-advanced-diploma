import { expect, test } from '@jest/globals';
import Undead from '../../characters/Undead';

test('create-Undead', () => {
  const undead = new Undead(3);
  undead.health = 50;
  expect(undead).toEqual({
    attack: 48,
    attackDistance: 1,
    defence: 12,
    health: 50,
    level: 3,
    moveDistance: 4,
    type: 'Undead',
  });
});
