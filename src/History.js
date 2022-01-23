import React, { useEffect, useState } from "react";
import { FetchWrapper } from "./FetchWrapper";
import Spinner from "react-bootstrap/Spinner";
import PlayerStatsCard from "./PlayerStatsCard";

const url = "https://bad-api-assignment.reaktor.com";
const historyEndpoint = "/rps/history";
const API = new FetchWrapper(url);

const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerChosen, setPlayerChosen] = useState("");
  const [playerGames, setPlayerGames] = useState({});
  // const [next, setNext] = useState("");

  let page = 0;

  const getGames = (cursor, historyGames = []) => {
    setIsLoading(true);
    console.log("page", page);
    if (page === 499 || page === 999) {
      setTimeout(() => {
        console.log(`Reached page ${page}, waiting not to flood API...`);
      }, 10000);
    }
    try {
      setTimeout(() => {
        return API.get(cursor ? cursor : historyEndpoint)
          .then((response) => response.json())
          .then((results) => {
            if (results.data.length < 1) return historyGames;
            historyGames.push(...results.data);
            page += 1;
            return getGames(results.cursor, historyGames);
          });
      }, 30);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
    // console.log('pages fetched:', page);
  };

  const seeGames = () => {
    if (games) {
      console.log("games in hook", games);
    }
  };
  // for (let game of results.data) {
  //         if (!players.includes(game.playerA.name)) {
  //             setPlayers(players => [...players, game.playerA.name]);
  //         }
  //         if (!players.includes(game.playerB.name)) {
  //             setPlayers(players => [...players, game.playerB.name])
  //         }
  // }

  const compareHands = (player, opponent) => {
    switch (player) {
      case "ROCK":
        switch (opponent) {
          case "ROCK":
            return "draw";
          case "PAPER":
            return "lost";
          case "SCISSORS":
            return "won";
          default:
            return "result unknown";
        }
      case "PAPER":
        switch (opponent) {
          case "ROCK":
            return "won";
          case "PAPER":
            return "draw";
          case "SCISSORS":
            return "lost";
          default:
            return "result unknown";
        }
      case "SCISSORS":
        switch (opponent) {
          case "ROCK":
            return "lost";
          case "PAPER":
            return "won";
          case "SCISSORS":
            return "draw";
          default:
            return "result unknown";
        }
      default:
        return "result unknown";
    }
  };

  useEffect(() => {
    setGames(getGames());
    if (!isLoading) {
      seeGames();
    }
  }, []);

  // const playerStats = (player) => {
  //     let games = [];
  //     let totGames = 0;
  //     let won = 0;
  //     let lost = 0;
  //     let draw = 0;
  //     let scissors = 0;
  //     let rock = 0;
  //     let paper = 0;
  //     let resultsJson = API.get(historyEndpoint);
  //     resultsJson.then((data) => {
  //         for (let game of data.data) {
  //             if (game.playerA.name === player ||
  //                 game.playerB.name === player) {
  //                 games.push(game);
  //             }
  //         }
  //         setPlayerGames(games);
  //         console.log("Player games:", games);
  //         for (let game of games) {
  //             totGames += 1;
  //             if (compareHands(game.playerA.played, game.playerB.played) === "won" && game.playerA.name === player) {
  //                 won += 1;
  //             } else if (compareHands(game.playerA.played, game.playerB.played) === "lost" && game.playerA.name === player) {
  //                 lost += 1;
  //             } else if (compareHands(game.playerA.played, game.playerB.played) === "won" && game.playerB.name === player) {
  //                 lost += 1;
  //             } else if (compareHands(game.playerA.played, game.playerB.played) === "lost" && game.playerB.name === player) {
  //                 won += 1;
  //             } else {
  //                 draw += 1;
  //             }
  //         }
  //         console.log('Games:', totGames, 'won:', won, 'lost:', lost, 'draw:', draw);

  //         return (<div className="stats">
  //                     <p>Number of games: {totGames}</p>
  //                     <p>Wins:</p>
  //                     <p>Win ratio:</p>
  //                     <p>Most played hand:</p>
  //                 </div>)
  //     });
  // }

  return (
    <div className="history">
      <p> Players:</p>
      {!isLoading ? (
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => {
            setPlayerChosen(e.target.value);
          }}
        >
          <option key="default" value="DEFAULT" disabled>
            Select player*
          </option>
          {players.map((obj) => {
            return (
              <option key={obj} value={obj}>
                {obj}
              </option>
            );
          })}
        </select>
      ) : (
        <p>'Loading...'</p>
      )}
      {playerChosen ? (
        <PlayerStatsCard
          name={playerChosen}
          gamesCount={games}
          wins={games}
          winRatio={games}
          mostPlayed={games}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default History;
