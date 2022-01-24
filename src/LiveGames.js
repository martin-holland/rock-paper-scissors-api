import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";

const ws = "wss://bad-api-assignment.reaktor.com/rps/live";

const LiveGames = () => {
  const [liveGames, setLiveGames] = useState([]);

  useEffect(() => {
    if (liveGames.length > 5) {
      liveGames.length = 3;
    }
    const socket = new WebSocket(ws);
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
  });

  return (
    <Container className="live-games">
      <h2>Live games:</h2>
      <Row
        xs={2}
        md={5}
        lg={5}
        className="justify-content-between my-2 d-flex gap-1"
      >
        {liveGames.map((game) => (
          <Card
            bg="success"
            text="light"
            style={{ width: "15rem" }}
            className="mb-2 livegame"
            key={game.gameId}
          >
            <Card.Header>{game.gameId}</Card.Header>
            <Card.Body>
              <h2 className="players">{game.playerA.name}</h2>
              <p>VS.</p>
              <h2 className="players">{game.playerB.name}</h2>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default LiveGames;
