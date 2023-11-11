// import {
//   beforeEach, describe, expect, jest, test,
// } from '@jest/globals';
// import GameController from '../GameController';
// import GamePlay from '../GamePlay';
//
// jest.mock('../PositionedCharacter');
//
// describe('GameController', () => {
//   test('position-list', () => {
//     const team = [
//       {
//         level: 3, attack: 40, defence: 10, health: 50, type: 'Swordsman',
//       },
//       {
//         level: 3, attack: 10, defence: 40, health: 50, type: 'Magician',
//       },
//       {
//         level: 2, attack: 40, defence: 10, health: 50, type: 'Swordsman',
//       },
//       {
//         level: 3, attack: 25, defence: 25, health: 50, type: 'Bowman',
//       },
//     ];
//
//     const mockController = new GameController('GamePlay', 'statService');
//     const result = mockController.init().startPositionList(team, 'user', 8);
//     console.log(result);
//     // expect(GameController.init().startPositionList(team, 'user', 8)).toEqual(
//     //   [
//     //
//     //   ]
//     // )
//   });
// });
//
// describe('GameController', () => {
//   beforeEach(() => {
//     GamePlay.mockClear();
//   });
//
//   test('react-to-click', () => {
//     const mockGamePlay = new GamePlay();
//     mockGamePlay.onSelectClick = jest.fn();
//
//     const mockController = new GameController(mockGamePlay, 'statService');
//
//     mockController.userPositionedCharacters = [
//       { position: 0 },
//       { position: 1 },
//     ];
//     mockController.onCellClick(1);
//
//     expect(mockGamePlay.selectCell(1)).toHaveBeenCalledWith(1);
//   });
// });
