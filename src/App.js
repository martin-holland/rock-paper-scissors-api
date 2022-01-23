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
import _ from "lodash";

const wsUrl = "wss://bad-api-assignment.reaktor.com/rps/live";
const webSocketUrl = "wss://bad-api-assignment.reaktor.com/rps/live";

function App() {
  const [liveInfo, setLiveInfo] = useState();

  useEffect(() => {
    const socket = new WebSocket(webSocketUrl);

    // Listen for messages

    socket.addEventListener("message", function (event) {
      console.log("Message from server ", JSON.parse(JSON.parse(event.data)));
      const infoParsed = JSON.parse(JSON.parse(event.data));
      setLiveInfo(infoParsed);
      socket.close();
    });
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
        <Container className="live-games">
          <Card bg="dark" text="light">
            <Card.Header>Game in Progress</Card.Header>
            <Card.Body>
              <h2 className="smaller">
                {liveInfo ? liveInfo.gameId : "Loading..."}
              </h2>
              <h3>
                {liveInfo ? liveInfo.playerA.name : "Loading"} vs.{" "}
                {liveInfo ? liveInfo.playerB.name : "Loading"}
              </h3>
            </Card.Body>
          </Card>
        </Container>
        <Container className="history">
          <Container></Container>
          <Container>
            <Table className="striped bordered hover">
              <thead className="">
                <tr>
                  <th className="table-info">#</th>
                  <th className="table-warning">Player A</th>
                  <th className="table-danger">Player B</th>
                  <th className="table-success">Winning Player</th>
                </tr>
              </thead>
              {!loading &&
                games.data.map((id) => (
                  <tbody key={id.gameId}>
                    <tr>
                      <td className="td-smaller table-info">{id.gameId}</td>
                      <td className="table-warning">{id.playerA.name}</td>
                      <td className="table-danger">{id.playerB.name}</td>
                      <td className="table-success">
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
