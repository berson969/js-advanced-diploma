import createActiveCharacter from './createActiveCharacter';

export default function computerTurn(positionedCharacter, obj) {
  const { gamePlay } = obj;
  const gameController = obj;
  const enemyActiveCharacter = createActiveCharacter(positionedCharacter, gamePlay.boardSize);
  const opponentCharacter = gameController.userPositionedCharacters
    .filter((character) => enemyActiveCharacter.attack.includes(character.position))
    .sort((a, b) => a.character.health - b.character.health)[0];
  console.log('damage for Enemy', opponentCharacter);
  if (opponentCharacter) {
    const damage = Math.floor(Math.max(enemyActiveCharacter.character.attack
      - opponentCharacter.character.defence, enemyActiveCharacter.character.attack * 0.1));

    gamePlay.showDamage(opponentCharacter.position, damage).then(() => {
      opponentCharacter.character.health -= damage;
      if (opponentCharacter.character.health <= 0) {
        gameController.userPositionedCharacters.splice(gameController.userPositionedCharacters.indexOf(opponentCharacter), 1);
        enemyActiveCharacter.character.levelUp();
        console.log('Enemy=LevelUp');
      }
    });
    return console.log('computerAttackTurn is done');
  }

  const movingPlaces = enemyActiveCharacter.move;
  while (movingPlaces) {
    const movingPlace = movingPlaces.splice(Math.floor(Math.random() * movingPlaces.length), 1)[0];
    if (![...gameController.userPositionedCharacters, ...gameController.enemyPositionedCharacters]
      .filter((character) => character.position === movingPlace).length) {
      gameController.enemyPositionedCharacters.find((character) => character
        .character === enemyActiveCharacter.character).position = movingPlace;
      gamePlay.redrawPositions([
        ...gameController.userPositionedCharacters,
        ...gameController.enemyPositionedCharacters,
      ]);
      gamePlay.deselectAllCells();

      return console.log('computerMovingTurn is done');
    }
  }
  return console.log('Game over');
}
