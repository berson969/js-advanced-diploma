export default function createActiveCharacter(positionedCharacter, boardSize) {
  const index = positionedCharacter.position;
  const { moveDistance } = positionedCharacter.character;
  const { attackDistance } = positionedCharacter.character;
  const moveIndexes = [];
  const attackIndexes = [];
  const row = Math.floor(index / boardSize);
  const col = index % boardSize;

  for (let i = -moveDistance; i <= moveDistance; i++) {
    for (let j = -moveDistance; j <= moveDistance; j++) {
      if (i === 0 || j === 0 || Math.abs(i) === Math.abs(j)) {
        const newRow = row + i;
        const newCol = col + j;

        if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
          const newIndex = newRow * boardSize + newCol;
          moveIndexes.push(newIndex);
        }
      }
    }
  }

  for (let i = -attackDistance; i <= attackDistance; i++) {
    for (let j = -attackDistance; j <= attackDistance; j++) {
      const newRow = row + i;
      const newCol = col + j;

      if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
        const newIndex = newRow * boardSize + newCol;
        attackIndexes.push(newIndex);
      }
    }
  }

  positionedCharacter.move = moveIndexes;
  positionedCharacter.attack = attackIndexes;
  return positionedCharacter;
}
