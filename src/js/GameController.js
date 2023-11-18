import themes from './themes';
import PositionedCharacter from './PositionedCharacter';
import cursors from './cursors';
import createActiveCharacter from './createActiveCharacter';
import computerTurn from './computerTurns';
import { generateTeam } from './generators';
import GameState from './GameState';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.userTypeCharacters = ['Bowman', 'Swordsman', 'Magician'];
    this.enemyTypeCharacters = ['Undead', 'Daemon', 'Vampire', 'Zombie'];
    this.activeCharacter = undefined;
    this.characterCount = 5;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.nextLevel();

    this.gamePlay.addCellEnterListener((index) => {
      this.onCellEnter(index);
    });
    this.gamePlay.addCellLeaveListener((index) => {
      this.onCellLeave(index);
    });
    this.gamePlay.addCellClickListener((index) => {
      this.onCellClick(index);
    });
    this.gamePlay.addNewGameListener(() => {
      const gameController = new GameController(this.gamePlay, this.stateService);
      this.gamePlay.level = 0
      gameController.init();
      GamePlay.showMessage('New Game loaded');
    });
    this.gamePlay.addSaveGameListener(() => {
      const state = {
        level: this.gamePlay.level,
        boardSize: this.gamePlay.boardSize,
        userPositionedCharacters: this.userPositionedCharacters,
        enemyPositionedCharacters: this.enemyPositionedCharacters,
        score: this.gamePlay.score,
      };
      this.stateService.save(state);
      console.log('Game saved');
      GamePlay.showMessage('Game saved');
    });
    this.gamePlay.addLoadGameListener(() => {
      new GameState(this).from(this.stateService.load());
      GamePlay.showMessage('Game loaded');
    });
  }

  startPositionList(team, typeOfTeam, size = this.gamePlay.boardSize) {
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
  }

  nextLevel() {
    this.gamePlay.level++;
    if (this.gamePlay.level > 8) {
      console.log('Game over');
      GamePlay.showMessage('Game over');
      this.gamePlay.removeAllCellListeners();
    } else {
      this.gamePlay.drawUi(Object.values(themes)[(this.gamePlay.level - 1) % 4]);
      this.userTeam = generateTeam(this.userTypeCharacters, this.gamePlay.level, this.characterCount);
      this.enemyTeam = generateTeam(this.enemyTypeCharacters, this.gamePlay.level, this.characterCount);
      this.userPositionedCharacters = this.startPositionList(this.userTeam, 'user');
      this.enemyPositionedCharacters = this.startPositionList(this.enemyTeam, 'enemy');
      this.gamePlay.deselectAllCells();
      this.gamePlay.redrawPositions([...this.userPositionedCharacters, ...this.enemyPositionedCharacters]);
    }
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
      }
    } else if (enemyPositionedCharacter) {
      if (this.activeCharacter && this.activeCharacter.attack.includes(index)) {
        // attack
        const attacker = this.activeCharacter.character.attack;
        const damage = Math.floor(Math.max(attacker
          - enemyPositionedCharacter.character.defence, attacker * 0.1));
        this.gamePlay.showDamage(index, damage).then(() => {
          enemyPositionedCharacter.character.health -= damage;
          this.gamePlay.score += damage;
          if (enemyPositionedCharacter.character.health <= 0) {
            this.gamePlay.score += enemyPositionedCharacter.character.defence;
            this.activeCharacter.character.levelUp()
            this.enemyPositionedCharacters.splice(this.enemyPositionedCharacters.indexOf(enemyPositionedCharacter), 1);

            if (!this.enemyPositionedCharacters.length) {
              // Level grows
              this.nextLevel();
            }
          }
          this.gamePlay.redrawPositions([
            ...this.userPositionedCharacters,
            ...this.enemyPositionedCharacters,
          ]);
          computerTurn(enemyPositionedCharacter, this);
        });
      }
    } else if (this.activeCharacter && this.activeCharacter.move.includes(index)) {
      // moving
      this.gamePlay.deselectCell(this.activeCharacter.position);
      userPositionedCharacter = this.userPositionedCharacters
        .find((positionedCharacter) => positionedCharacter.position === this.activeCharacter.position);
      console.log('Problem after moving', userPositionedCharacter);
      console.log('this.activeCharacter', this.activeCharacter);
      userPositionedCharacter.position = index;
      this.gamePlay.redrawPositions([...this.userPositionedCharacters, ...this.enemyPositionedCharacters]);
      // this.gamePlay.deselectCell(this.activeCharacter.position);
      this.activeCharacter = createActiveCharacter(userPositionedCharacter, this.gamePlay.boardSize);
      this.gamePlay.selectCell(index);

      const randomIndex = Math.floor(Math.random() * this.enemyPositionedCharacters.length);
      computerTurn(this.enemyPositionedCharacters[randomIndex], this);
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const enemyPositionedCharacter = this.enemyPositionedCharacters.find((character) => character.position === index);
    const userPositionedCharacter = this.userPositionedCharacters.find((character) => character.position === index);

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
    this.gamePlay.deselectCell(index);
    this.gamePlay.setCursor(cursors.auto);
  }
}
