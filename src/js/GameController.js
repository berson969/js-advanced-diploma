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
    this.gameLevel = 0;
    this.activeCharacter = undefined;
    this.characterCount = 2;
    this.stateService = stateService;
    this.score = 0;
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
      gameController.init();
      GamePlay.showMessage('New Game loaded');
    });
    this.gamePlay.addSaveGameListener(() => {
      const state = {
        level: this.gameLevel,
        boardSize: this.gamePlay.boardSize,
        userPositionedCharacters: this.userPositionedCharacters,
        enemyPositionedCharacters: this.enemyPositionedCharacters,
        score: this.score,
      };
      this.stateService.save(state);
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
    this.gameLevel++;
    this.gamePlay.drawUi(Object.values(themes)[(this.gameLevel - 1) % 4]);
    console.log('themes', this.gameLevel, Object.values(themes)[(this.gameLevel - 1) % 4]);
    this.userTeam = generateTeam(this.userTypeCharacters, this.gameLevel, this.characterCount);
    this.enemyTeam = generateTeam(this.enemyTypeCharacters, this.gameLevel, this.characterCount);
    this.userPositionedCharacters = this.startPositionList(this.userTeam, 'user');
    this.enemyPositionedCharacters = this.startPositionList(this.enemyTeam, 'enemy');
    this.gamePlay.deselectAllCells();
    this.gamePlay.redrawPositions([...this.userPositionedCharacters, ...this.enemyPositionedCharacters]);

    this.gamePlay.removeAllCellListeners();
  }

  onCellClick(index) {
    // TODO: react to click
    let userPositionedCharacter = this.userPositionedCharacters.find((character) => character.position === index);
    const enemyPositionedCharacter = this.enemyPositionedCharacters.find((character) => character.position === index);
    console.log('after onClick', userPositionedCharacter, enemyPositionedCharacter, this.activeCharacter);
    console.log('check PositionedChar class', (userPositionedCharacter instanceof PositionedCharacter));
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
            if (!this.enemyPositionedCharacters.length) {
              // переход на новый уровень
              console.log('user wins');
              this.nextLevel();
              this.activeCharacter.character.levelUp();
            }
          }
          this.gamePlay.redrawPositions([
            ...this.userPositionedCharacters,
            ...this.enemyPositionedCharacters,
          ]);
          computerTurn(enemyPositionedCharacter, this);
        });

        // GamePlay.showMessage('Change turn')
        console.log('Change turn after attack');
      }
    } else if (this.activeCharacter && this.activeCharacter.move.includes(index)) {
      // moving
      this.gamePlay.deselectCell(this.activeCharacter.position);
      userPositionedCharacter = this.userPositionedCharacters
        .find((positionedCharacter) => positionedCharacter.position === this.activeCharacter.position);
      console.log('Problem after moving', userPositionedCharacter);
      userPositionedCharacter.position = index;
      this.gamePlay.redrawPositions([...this.userPositionedCharacters, ...this.enemyPositionedCharacters]);
      // this.gamePlay.deselectCell(this.activeCharacter.position);
      this.activeCharacter = createActiveCharacter(userPositionedCharacter, this.gamePlay.boardSize);
      this.gamePlay.selectCell(index);

      console.log('Change turn after move');
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
      // this.gamePlay.deselectAllCells();
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
