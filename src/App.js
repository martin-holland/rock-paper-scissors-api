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
import Table from "react-bootstrap/Table";
import { gameResult } from "./functions";

const wsUrl = "wss://bad-api-assignment.reaktor.com/rps/live";

function App() {
  const [liveGame, setLiveGame] = useState();
  const [liveInfo, setLiveInfo] = useState();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const intervalID = setTimeout(() => {
      setToggle((toggle) => !toggle);
    }, 100);

    const ws = new WebSocket(wsUrl);
    ws.onmessage = function (event) {
      const gameInfo = event.data;
      setLiveGame(gameInfo);
      console.log(liveGame);
      try {
        const info = JSON.parse(liveGame);
        const infoParsed = JSON.parse(info);
        if (infoParsed !== undefined) {
        }
        setLiveInfo(infoParsed);
        console.log(liveInfo);
      } catch (error) {
        console.log(error.message);
      }
    };

    return () => clearInterval(intervalID);
  }, []);

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
            <Card.Header>Game in Progress</Card.Header>
            <Card.Body>
              <h2>{liveInfo.gameId}</h2>
              <h3>
                {liveInfo.playerA.name} vs. {liveInfo.playerB.name}
              </h3>
              {/* <p>
                {liveInfo.playedA.name} played {liveInfo.playerA.played}
              </p>
              <p>
                {liveInfo.playedB.name} played {liveInfo.playerB.played}
              </p> */}
            </Card.Body>
          </Card>
        </Container>
        <Container className="history">
          <Container></Container>
          <Container>
            <Table className="striped bordered hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player A</th>
                  <th>Player B</th>
                  <th>Winning Player</th>
                </tr>
              </thead>
              {!loading &&
                games.data.map((id) => (
                  <tbody key={id.gameId}>
                    <tr>
                      <td className="td-smaller">{id.gameId}</td>
                      <td>{id.playerA.name}</td>
                      <td>{id.playerB.name}</td>
                      <td>
                        {gameResult(id.playerA.played, id.playerB.played)}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Container>
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
