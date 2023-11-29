import createActiveCharacter from './createActiveCharacter';

export default function computerTurn(positionedCharacter, obj) {
  const { gamePlay } = obj;
  const gameController = obj;
  const enemyActiveCharacter = createActiveCharacter(positionedCharacter, gamePlay.boardSize);
  const opponentCharacter = gameController.userPositionedCharacters
    .filter((character) => enemyActiveCharacter.attack.includes(character.position))
    .sort((a, b) => a.character.health - b.character.health)[0];

  // TODO: enemy attack
  if (opponentCharacter) {
    const damage = Math.floor(Math.max(enemyActiveCharacter.character.attack
      - opponentCharacter.character.defence, enemyActiveCharacter.character.attack * 0.1));

    gamePlay.showDamage(opponentCharacter.position, damage).then(() => {
      opponentCharacter.character.health -= damage;
      gamePlay.score -= damage;
      if (opponentCharacter.character.health <= 0) {
        enemyActiveCharacter.character.levelUp();
        if (opponentCharacter === gameController.activeCharacter) {
          gamePlay.score -= opponentCharacter.character.defence;
          gameController.activeCharacter = undefined;
          gamePlay.deselectAllCells();
        }

        gameController.userPositionedCharacters.splice(gameController.userPositionedCharacters.indexOf(opponentCharacter), 1);
        if (!gameController.userPositionedCharacters.length) {
          gameController.nextLevel();
        } else {
          gamePlay.redrawPositions([...gameController.userPositionedCharacters, ...gameController.enemyPositionedCharacters]);
        }
      }
      if (gameController.activeCharacter) {
        gamePlay.selectCell(gameController.activeCharacter.position);
      } else {
        gamePlay.deselectAllCells();
      }
    });
    return;
  }
  // TODO: enemy moving
  const movingPlaces = enemyActiveCharacter.move;
  while (movingPlaces.length) {
    const movingPlace = movingPlaces.splice(Math.floor(Math.random() * movingPlaces.length), 1)[0];
    const characterInMovingPlace = [...gameController.userPositionedCharacters,
      ...gameController.enemyPositionedCharacters].filter((character) => character.position === movingPlace);
    if (!characterInMovingPlace.length) {
      enemyActiveCharacter.position = movingPlace;
      gamePlay.redrawPositions([
        ...gameController.userPositionedCharacters,
        ...gameController.enemyPositionedCharacters,
      ]);
    }
  }
}
