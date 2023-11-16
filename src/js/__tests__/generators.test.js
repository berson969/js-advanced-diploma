import { expect, test } from '@jest/globals';
import { characterGenerator, generateTeam } from '../generators';

// class MockCharacter {
//   constructor(level, type = 'generic') {
//     this.level = level;
//     this.type = type;
//   }
// }

// class MockTeam {
//   constructor(characters) {
//     this.characters = characters
//   }
// }

// jest.mock('../Character', () => {
//   return {
//     MockCharacter: jest.fn(),
//   };
// });
//
// jest.mock('../Team', () => {
//   return {
//     MockTeam: jest.fn(),
//   };
// });

test('generates a character with the correct level', () => {
  const allowedTypes = ['Undead', 'Daemon', 'Vampire', 'Zombie'];
  const maxLevel = 4;
  const character = characterGenerator(allowedTypes, maxLevel).next().value;
  expect(character.level).toBeGreaterThanOrEqual(1);
  expect(character.level).toBeLessThanOrEqual(maxLevel);
  expect(allowedTypes).toContain(character.type);
});

test('generates a team with the correct number of characters', () => {
  const allowedTypes = ['Bowman', 'Swordsman', 'Magician'];
  const maxLevel = 3;
  const characterCount = 3;
  const team = generateTeam(allowedTypes, maxLevel, characterCount);
  expect(team.characters).toHaveLength(3);
  expect(team.characters.every((character) => allowedTypes.includes(character.type))).toBe(true);
});
