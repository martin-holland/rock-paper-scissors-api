import React from "react";

function PlayerStatsCard(props) {
  return (
    <div className="player-stats">
      <p>{props.name}</p>
    </div>
  );
}

export default PlayerStatsCard;
