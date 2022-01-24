import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";

const webSocketUrl = "ws://bad-api-assignment.reaktor.com/rps/live";

const LiveGames = () => {
  const [liveGames, setLiveGames] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(webSocketUrl);
    socket.addEventListener("message", function (event) {
      if (JSON.parse(JSON.parse(event.data)).type === "GAME_BEGIN") {
        setLiveGames((liveGames) => [
          ...liveGames,
          JSON.parse(JSON.parse(event.data)),
        ]);
      }
      if (JSON.parse(JSON.parse(event.data)).type === "GAME_RESULT") {
        setLiveGames(
          liveGames.filter(
            (game) => game.gameId !== JSON.parse(JSON.parse(event.data)).gameId
          )
        );
      }
    });

    return () => socket.close();
  }, [liveGames]);

  return (
    <Container className="live-games">
      <h2>Live games:</h2>
      <Table striped bordered hover size="sm" className="live_table">
        <thead>
          <tr>
            <th>Player A</th>
            <th></th>
            <th>VS.</th>
            <th></th>
            <th>Player B</th>
          </tr>
        </thead>
        <tbody>
          {liveGames
            ? liveGames.map((game) => {
                return (
                  <tr key={`${game.gameId}${game.type}`}>
                    <td>{game.playerA.name}</td>
                    <td></td>
                    <td>VS</td>
                    <td></td>
                    <td>{game.playerB.name}</td>
                  </tr>
                );
              })
            : "unknown"}
        </tbody>
      </Table>
    </Container>
  );
};

export default LiveGames;
