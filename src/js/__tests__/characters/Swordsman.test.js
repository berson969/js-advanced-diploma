import { expect, test } from '@jest/globals';
import Swordsman from '../../characters/Swordsman';

test('create-Swordsman', () => {
  expect(new Swordsman(3)).toEqual({
    attack: 48,
    attackDistance: 1,
    defence: 12,
    health: 50,
    level: 3,
    moveDistance: 4,
    type: 'Swordsman',
  });
});
