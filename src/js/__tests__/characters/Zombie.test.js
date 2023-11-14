import { expect, test } from '@jest/globals';
import Zombie from '../../characters/Zombie';

test('create-Zombie', () => {
  expect(new Zombie(3)).toEqual({
    attack: 12,
    attackDistance: 1,
    defence: 30,
    health: 50,
    level: 3,
    moveDistance: 1,
    type: 'Zombie',
  });
});
