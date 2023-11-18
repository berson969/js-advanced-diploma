import PositionedCharacter from './PositionedCharacter';

export default class GameState {
  constructor(gameController) {
    if (!gameController) {
      throw new Error('GameController instance is required');
    }
    this.gameController = gameController;
  }

  getPositionedCharacters(characters) {
    return characters.map((item) => {
      const CharacterClass = require(`./characters/${item.character.type}`).default;
      const character = new CharacterClass(item.character.level);
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
      this.gameController.gamePlay.level = state.level;
      this.gameController.activeCharacter = undefined;
      this.gameController.gamePlay.boardSize = state.boardSize;
      this.gameController.gamePlay.score = state.score;
      this.gameController.userPositionedCharacters = this.getPositionedCharacters(state.userPositionedCharacters);
      this.gameController.enemyPositionedCharacters = this.getPositionedCharacters(state.enemyPositionedCharacters);
      this.gameController.gamePlay.deselectAllCells();
      this.gameController.gamePlay.redrawPositions(
        [...state.userPositionedCharacters, ...state.enemyPositionedCharacters],
      );
    } catch (e) {
      throw new Error('Got wrong state data');
    }
  }
}
