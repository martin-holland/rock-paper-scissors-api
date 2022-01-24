import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import LiveGames from "./LiveGames";
import HistoryComp from "./HistoryComp";
import Statistics from "./Statistics";

function App() {
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
        <LiveGames />
        <Statistics />
      </Container>
      <HistoryComp />
    </div>
  );
}

export default App;
