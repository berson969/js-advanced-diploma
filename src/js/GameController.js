import themes from './themes';
import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';
import cursors from './cursors';
import createActiveCharacter from './createActiveCharacter';
import computerTurn from './computerTurns';

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
    this.userTeam = generateTeam(this.userTypeCharacters, 1, 4);
    this.enemyTeam = generateTeam(['Undead', 'Daemon', 'Vampire', 'Zombie'], 2, 8);

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
    this.gamePlay.redrawPositions([...this.userPositionedCharacters, ...this.enemyPositionedCharacters]);

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
    let userPositionedCharacter = this.userPositionedCharacters.find((character) => character.position === index);
    const enemyPositionedCharacter = this.enemyPositionedCharacters.find((character) => character.position === index);

    if (userPositionedCharacter) {
      if (this.activeCharacter === userPositionedCharacter) {
        this.gamePlay.deselectCell(index);
        this.activeCharacter = undefined;
      } else {
        this.gamePlay.deselectAllCells();
        this.gamePlay.selectCell(index);
        this.activeCharacter = createActiveCharacter(userPositionedCharacter, this.gamePlay.boardSize);
        console.log('activeCharacter', this.activeCharacter);
      }
    } else if (enemyPositionedCharacter) {
      if (this.activeCharacter && this.activeCharacter.attack.includes(index)) {
        // attack
        const attacker = this.activeCharacter.character.attack;
        const damage = Math.floor(Math.max(attacker
          - enemyPositionedCharacter.character.defence, attacker * 0.1));
        this.gamePlay.showDamage(index, damage).then(() => {
          enemyPositionedCharacter.character.health -= damage;
          if (enemyPositionedCharacter.character.health <= 0) {
            this.enemyPositionedCharacters.splice(this.enemyPositionedCharacters.indexOf(enemyPositionedCharacter), 1);
            this.activeCharacter.character.levelUp();
            console.log('LevelUp');
          }
          this.gamePlay.redrawPositions([
            ...this.userPositionedCharacters,
            ...this.enemyPositionedCharacters,
          ]);
          console.log('Damage animation completed', damage);
          computerTurn(enemyPositionedCharacter, this);
        });

        // GamePlay.showMessage('Change turn')
        console.log('Change turn after attack');
      }
    } else if (this.activeCharacter && this.activeCharacter.move.includes(index)) {
      // moving
      userPositionedCharacter = this.userPositionedCharacters
        .find((positionedCharacter) => positionedCharacter.character === this.activeCharacter.character);
      userPositionedCharacter.position = index;
      this.gamePlay.redrawPositions([...this.userPositionedCharacters, ...this.enemyPositionedCharacters]);
      this.gamePlay.deselectAllCells();
      this.activeCharacter = createActiveCharacter(userPositionedCharacter, this.gamePlay.boardSize);
      this.gamePlay.selectCell(index);

      console.log('Change turn');
      const randomIndex = Math.floor(Math.random() * this.enemyPositionedCharacters.length);
      computerTurn(this.enemyPositionedCharacters[randomIndex], this);
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const enemyPositionedCharacter = this.enemyPositionedCharacters.find((character) => character.position === index);
    const userPositionedCharacter = this.userPositionedCharacters.find((character) => character.position === index);
    console.log('Enter', enemyPositionedCharacter, userPositionedCharacter);
    console.log('this.enemyPositionedCharacters', this.enemyPositionedCharacters);
    if (this.activeCharacter) {
      this.gamePlay.deselectAllCells();
      this.gamePlay.selectCell(this.activeCharacter.position);

      if (enemyPositionedCharacter && this.activeCharacter.attack.includes(index)) {
        this.gamePlay.setCursor(cursors.crosshair);
        this.gamePlay.selectCell(index, 'red');
      } else if (userPositionedCharacter) {
        this.gamePlay.setCursor(cursors.pointer);
      } else if (!enemyPositionedCharacter && !userPositionedCharacter && this.activeCharacter.move.includes(index)) {
        this.gamePlay.setCursor(cursors.pointer);
        this.gamePlay.selectCell(index, 'green');
      } else {
        this.gamePlay.setCursor(cursors.notallowed);
      }
    }
    if (enemyPositionedCharacter) {
      this.gamePlay.showCellTooltip(enemyPositionedCharacter);
    }
    if (userPositionedCharacter) {
      this.gamePlay.showCellTooltip(userPositionedCharacter);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
    this.gamePlay.setCursor(cursors.auto);
  }
}
