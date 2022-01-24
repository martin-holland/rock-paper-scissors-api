import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import LiveGames from "./LiveGames";
import HistoryComp from "./HistoryComp";

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
        <HistoryComp />
      </Container>
    </div>
  );
}

export default App;
