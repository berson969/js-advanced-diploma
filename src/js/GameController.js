import themes from './themes';
import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';
import cursors from './cursors';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.userTypeCharacters = ['Bowman', 'Swordsman', 'Magician'];
    this.activeCharacter = undefined;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    const differentThemes = Object.values(themes);
    this.gamePlay.drawUi(differentThemes[Math.floor(Math.random() * differentThemes.length)]);
    this.userTeam = generateTeam(this.userTypeCharacters, 3, 10);
    this.enemyTeam = generateTeam(['Undead', 'Daemon', 'Vampire', 'Zombie'], 2, 10);

    const startPositionList = (team, typeOfTeam, size = this.gamePlay.boardSize) => {
      const col = (typeOfTeam === 'user') ? 0 : size - 2;
      const startArray = [];

      for (let i = col; i < size ** 2 - 1; i += size) {
        startArray.push(i);
        startArray.push(i + 1);
      }
      return team.characters.map((character) => {
        const position = startArray[Math.floor(Math.random() * startArray.length)];
        startArray.splice(startArray.indexOf(position), 1);
        return new PositionedCharacter(character, position);
      });
    };

    this.userPositionedCharacters = startPositionList(this.userTeam, 'user');
    this.enemyPositionedCharacters = startPositionList(this.enemyTeam, 'enemy');
    this.positionedAllCharacters = [...this.userPositionedCharacters, ...this.enemyPositionedCharacters];
    this.gamePlay.redrawPositions(this.positionedAllCharacters);

    this.gamePlay.addCellEnterListener((index) => {
      this.onCellEnter(index);
    });
    this.gamePlay.addCellLeaveListener((index) => {
      this.onCellLeave(index);
    });
    this.gamePlay.addCellClickListener((index) => {
      this.onCellClick(index);
    });
  }

  onCellClick(index) {
    // TODO: react to click
    const positionedCharacter = this.userPositionedCharacters.find((character) => character.position === index);
    if (positionedCharacter) {
      if (this.activeCharacter === positionedCharacter) {
        this.gamePlay.deselectCell(index);
        this.activeCharacter = undefined;
      } else {
        this.gamePlay.deselectAllCells();
        this.gamePlay.selectCell(index);
        this.activeCharacter = positionedCharacter;
      }
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const positionedCharacter = this.positionedAllCharacters.find((character) => character.position === index);
    if (this.activeCharacter) {
      this.gamePlay.deselectAllCells();
      this.gamePlay.selectCell(this.activeCharacter.position);
      if (positionedCharacter) {
        if (this.userTypeCharacters.includes(positionedCharacter.character.type)) {
          this.gamePlay.setCursor(cursors.pointer);
        } else {
          this.gamePlay.setCursor(cursors.crosshair);
          this.gamePlay.selectCell(index, 'red');
        }
      } else {
        this.gamePlay.setCursor(cursors.pointer);
        this.gamePlay.selectCell(index, 'green');
      }
    }

    if (positionedCharacter) {
      const char = positionedCharacter.character;
      const message = `
        ${char.type}\n
        \u{1F396}${char.level}\u{2694}${char.attack}\u{1F6E1}${char.defence}\u{2764}${char.health}
        `;
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
