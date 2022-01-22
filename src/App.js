import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { gameResult } from "./functions";

const wsUrl = "wss://bad-api-assignment.reaktor.com/rps/live";

function App() {
  const [liveGame, setLiveGame] = useState();
  const [liveGameId, setLiveGameId] = useState();
  // const [livePlayerA, setLivePlayerA] = useState();
  // const [livePlayerB, setLivePlayerB] = useState();
  // const [livePlayerAPlayed, setLivePlayerAPlayed] = useState();
  // const [livePlayerBPlayed, setLivePlayerBPlayed] = useState();

  const ws = new WebSocket(wsUrl);

  useEffect(() => {
    ws.onmessage = function (event) {
      const gameInfo = event.data;
      setLiveGame(gameInfo);

      console.log(liveGame);
      const info = JSON.parse(liveGame);
      const infoParsed = JSON.parse(info);
      console.log(infoParsed);
      console.log(`Game ID: ${infoParsed.gameId}`);
      console.log(`Game ID: ${infoParsed.playerA.played}`);
      setLiveGameId(infoParsed.gameId);
      // setLivePlayerA(infoParsed.playerA.name);
      // setLivePlayerB(infoParsed.playerB.name);
      // setLivePlayerAPlayed(infoParsed.playerA.played);
      // setLivePlayerBPlayed(infoParsed.playerA.played);
    };
  });

  // History Data hooks
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);

  // History Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          "https://bad-api-assignment.reaktor.com/rps/history"
        );
        setGames(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav.Link href="#" className="text-light bg-dark">
            Rock, Paper..... Scissors!
          </Nav.Link>
        </Container>
      </Navbar>
      <Container className="main">
        <Container className="live games">
          <Card bg="dark" text="light">
            <Card.Header>{/* {livePlayerA} vs.{livePlayerB} */}</Card.Header>
            <Card.Body>
              <h2>Game Id: {liveGameId}</h2>
            </Card.Body>
          </Card>
        </Container>
        <Container className="history">
          <Row
            xs={1}
            md={3}
            lg={4}
            className="justify-content-between my-5 d-flex gap-3"
          >
            {loading && (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            {!loading &&
              games.data.map((id) => (
                <Card bg="dark" text="light" key={id.gameId}>
                  <Card.Header>
                    <h2 className="players">
                      {id.playerA.name} vs {id.playerB.name}
                    </h2>
                  </Card.Header>

                  <Card.Body>
                    <h3 className="single-result">
                      Game Result for: {id.gameId}
                    </h3>
                    <p className="playedA">
                      Player A Played: {id.playerA.played.toLowerCase()}
                    </p>
                    <p className="playedB">
                      Player B Played: {id.playerB.played.toLowerCase()}
                    </p>
                    <p>{gameResult(id.playerA.played, id.playerB.played)}</p>
                  </Card.Body>
                </Card>
              ))}
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default App;
