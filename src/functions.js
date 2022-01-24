function gameResult(playerA, playerB) {
  switch (playerA + playerB) {
    case "SCISSORSPAPER":
    case "ROCKSCISSORS":
    case "PAPERROCK":
      return "won";
    case "PAPERSCISSORS":
    case "SCISSORSROCK":
    case "ROCKPAPER":
      return "lost";
    case "SCISSORSSCISSORS":
    case "PAPERPAPER":
    case "ROCKROCK":
      return "DRAW";
    default:
      return "unknown";
  }
}

// no longer used
function checkValid(object) {
  const loading = "loading";
  if (object) {
    return object;
  }
  return loading;
}

module.exports = { gameResult, checkValid };
