import React, { useEffect, useState } from "react";
import { FetchWrapper } from "./FetchWrapper";
import Table from "react-bootstrap/Table";
import paper from "./assets/paper.png";
import rock from "./assets/rock.png";
import scissors from "./assets/scissors.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { gameResult } from "./functions";

const url =
  "https://cors-anywhere.herokuapp.com/https://bad-api-assignment.reaktor.com";
const historyEndpoint = "/rps/history";
const API = new FetchWrapper(url);
const pagesToFetch = 20;

const Statistics = () => {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);

  let page = 0;
  let allTimePlayers = [];

  const getGames = (cursor, historyGames = []) => {
    if (page < pagesToFetch) {
      try {
        return API.get(cursor ? cursor : historyEndpoint)
          .then((response) => response.json())
          .then((results) => {
            if (results.data.length < 1) return historyGames;
            historyGames.push.apply(historyGames, results.data);
            setGames((games) => [...games, historyGames].flat());
            page += 1;
            for (let game of historyGames) {
              if (
                !allTimePlayers.some(
                  (player) => player.name === game.playerA.name
                )
              ) {
                allTimePlayers.push({
                  name: game.playerA.name,
                  totGames: 0,
                  wins: 0,
                  winRatio: 0,
                  hands: {
                    SCISSORS: 0,
                    ROCK: 0,
                    PAPER: 0,
                    mostPlayed: "rock",
                  },
                });
              }
              if (
                !allTimePlayers.some(
                  (player) => player.name === game.playerB.name
                )
              ) {
                allTimePlayers.push({
                  name: game.playerB.name,
                  totGames: 0,
                  wins: 0,
                  winRatio: 0,
                  hands: {
                    SCISSORS: 0,
                    ROCK: 0,
                    PAPER: 0,
                    mostPlayed: "rock",
                  },
                });
              }
              allTimePlayers.map((player) =>
                player.name === game.playerA.name
                  ? (player.totGames += 1) &&
                    (player.hands[game.playerA.played] += 1) &&
                    (gameResult(game.playerA.played, game.playerB.played) ===
                    "won"
                      ? (player.wins += 1)
                      : "unknown") &&
                    (player.winRatio = player.wins / player.totGames) &&
                    (player.hands.SCISSORS > player.hands.ROCK &&
                    player.hands.SCISSORS > player.hands.PAPER
                      ? (player.hands.mostPlayed = "SCISSORS")
                      : player.hands.ROCK > player.hands.SCISSORS &&
                        player.hands.ROCK > player.hands.PAPER
                      ? (player.hands.mostPlayed = "ROCK")
                      : player.hands.PAPER > player.hands.SCISSORS &&
                        player.hands.PAPER > player.hands.ROCK
                      ? (player.hands.mostPlayed = "PAPER")
                      : "unknown")
                  : "unknown"
              );

              // possibly add 1 to total game count, played hand, won/lost/draw FOR PLAYER B
              allTimePlayers.map((player) =>
                player.name === game.playerB.name
                  ? (player.totGames += 1) &&
                    (player.hands[game.playerB.played] += 1) &&
                    (gameResult(game.playerB.played, game.playerA.played) ===
                    "won"
                      ? (player.wins += 1)
                      : "unknown") &&
                    // updating wins ratio
                    (player.winRatio = player.wins / player.totGames) &&
                    // updating most played hand
                    (player.hands.SCISSORS > player.hands.ROCK &&
                    player.hands.SCISSORS > player.hands.PAPER
                      ? (player.hands.mostPlayed = "SCISSORS")
                      : player.hands.ROCK > player.hands.SCISSORS &&
                        player.hands.ROCK > player.hands.PAPER
                      ? (player.hands.mostPlayed = "ROCK")
                      : player.hands.PAPER > player.hands.SCISSORS &&
                        player.hands.PAPER > player.hands.ROCK
                      ? (player.hands.mostPlayed = "PAPER")
                      : "unknown")
                  : "unknown"
              );
            }
            return getGames(results.cursor, historyGames);
          });
      } catch (err) {
        console.error(err);
      }
    }
    setPlayers((players) =>
      allTimePlayers.filter((player) => !players.includes(player))
    );
  };
  useEffect(() => {
    getGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main">
      <div className="history">
        <h4 className="alldata">Games played: {games.length}</h4>
        <h4 className="alldata">Players in total: {players.length}</h4>
        <h4 className="alldata">Fetched pages:{pagesToFetch}</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Total games</th>
              <th>Wins</th>
              <th>Win ratio</th>
              <th>{<img src={rock} alt="rock" />}</th>
              <th>{<img src={paper} alt="paper" />}</th>
              <th>{<img src={scissors} alt="scissor" />}</th>
              <th>Most played</th>
            </tr>
          </thead>
          <tbody>
            {players
              ? players.map((player, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{player ? player.name : "---"}</td>
                      <td>{player ? player.totGames : "---"}</td>
                      <td>{player ? player.wins : "---"}</td>
                      <td>
                        {player
                          ? (Math.round(player.winRatio * 100) / 100).toFixed(2)
                          : "---"}
                      </td>
                      <td>{player.hands.ROCK}</td>
                      <td>{player.hands.PAPER}</td>
                      <td>{player.hands.SCISSORS}</td>
                      <td>
                        <img
                          src={
                            player.hands.mostPlayed === "ROCK"
                              ? rock
                              : player.hands.mostPlayed === "SCISSORS"
                              ? scissors
                              : player.hands.mostPlayed === "PAPER"
                              ? paper
                              : "unknown"
                          }
                          alt={player.hands.mostPlayed}
                        />
                      </td>
                    </tr>
                  );
                })
              : "unknown"}
            <tr>
              <th>#</th>
              <th></th>
              <th>Grand Total games</th>
              <th>Total Wins</th>
              <th>Win ratio</th>
              <th>{<img src={rock} alt="rock" />}</th>
              <th>{<img src={paper} alt="paper" />}</th>
              <th>{<img src={scissors} alt="scissor" />}</th>
              <th></th>
            </tr>
            <tr>
              <th>#</th>
              <th></th>
              <th>{}</th>
              <th>Total Wins</th>
              <th>Win ratio</th>
              <th>{<img src={rock} alt="rock" />}</th>
              <th>{<img src={paper} alt="paper" />}</th>
              <th>{<img src={scissors} alt="scissor" />}</th>
              <th></th>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Statistics;
