import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav.Link href="#" className="text-light bg-dark">
            PokeApp
          </Nav.Link>
        </Container>
      </Navbar>
      <Container className="main"></Container>
    </div>
  );
}

export default App;
