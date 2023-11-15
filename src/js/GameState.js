import PositionedCharacter from './PositionedCharacter';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import Zombie from './characters/Zombie';

export default class GameState {
  constructor(gameController) {
    if (!gameController) {
      throw new Error('GameController instance is required');
    }

    this.gameController = gameController;
    this.classMapping = {
      Bowman,
      Daemon,
      Magician,
      Swordsman,
      Undead,
      Vampire,
      Zombie,
    };
  }

  getPositionedCharacters(characters) {
    return characters.map((item) => {
      const ClassName = this.classMapping[item.character.type];
      const character = new ClassName(item.character.level);
      character.health = item.character.health;
      character.defence = item.character.defence;
      character.attack = item.character.attack;
      return new PositionedCharacter(character, item.position);
    });
  }

  from(state) {
    // TODO: create object
    if (!state) {
      throw new Error('Got wrong state');
    }

    try {
      this.gameController.gameLevel = state.gameLevel;
      this.gameController.activeCharacter = undefined;
      this.gameController.gamePlay.boardSize = state.boardSize;
      this.gameController.score = state.score;
      this.gameController.userPositionedCharacters = this.getPositionedCharacters(state.userPositionedCharacters);
      this.gameController.enemyPositionedCharacters = this.getPositionedCharacters(state.enemyPositionedCharacters);
      this.gameController.gamePlay.deselectAllCells();
      this.gameController.gamePlay.redrawPositions(
        [...state.userPositionedCharacters, ...state.enemyPositionedCharacters],
      );
      console.log('Load success');
    } catch (e) {
      throw new Error('Got wrong state data');
    }
  }
}
