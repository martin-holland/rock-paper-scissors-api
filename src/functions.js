function gameResult(playerA, playerB) {
  let result;
  if (playerA === playerB) {
    result = "Tie";
  } else if (playerA === "ROCK") {
    if (playerB === "PAPER") {
      result = "Player B Won";
    } else {
      result = "Player A Won";
    }
  } else if (playerA === "SCISSORS") {
    if (playerB === "ROCK") {
      result = "Player A Won";
    } else {
      result = "Player A Won";
    }
  } else if (playerA === "PAPER") {
    if (playerB === "SCISSORS") {
      result = "Player B Won";
    } else {
      result = "Player A Won";
    }
  }
  return result;
}

// function splitter(liveGame) {
//     const infoArray = liveGame.split('\')
// }

module.exports = { gameResult };
