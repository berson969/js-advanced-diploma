import { expect, test } from '@jest/globals';
import Zombie from '../../characters/Zombie';

test('create-Zombie', () => {
  expect(new Zombie(3)).toEqual({
    attack: 10,
    attackDistance: 1,
    defence: 25,
    health: 50,
    level: 3,
    moveDistance: 1,
    type: 'Zombie',
  });
});
