import "./App.css";
import { useState, useEffect } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";



function App() {
  const [gameMode, setGameMode] = useState("");
  const [data, setData] = useState([]);
  const [cards, setCards] = useState([]);


  async function FetchData(gameMode) {
    await fetch("https://localhost:7289/CardGames/"+gameMode)
      .then((response) => response.json())
      .then((data) => setData(data));
    setGameMode(gameMode);
    console.log(data);
    }

    const PrintPlayerAndScore = () => {
      return data.map((player, index) => {
        return (
          <Col key={index}>
            <Badge pill variant="primary">
              {player.playerName}
            </Badge>
          </Col>
        );
      }
      );
    }





  return (
    <Container className="App">
      <Row>
        <Col>
          <h1>Choose GameMode</h1>
        </Col>
      </Row>
      <Row>
        <Col style={{ height:"45px"}}>
          <h3 className="gmText">{gameMode}</h3>
        </Col>
      </Row>
      <Row>
        <Col sm>
          <Button className="gmBtn" onClick={() => FetchData("HighestCard")}>HighestCard</Button>
        </Col>
        <Col sm>
          <Button className="gmBtn" onClick={() => FetchData("BlackJack")}>BlackJack</Button>
        </Col>
        <Col sm>
          <Button className="gmBtn" onClick={() => FetchData("Poker")}>Poker</Button> 
        </Col>
      </Row>
      <Row>
        {PrintPlayerAndScore()}
      </Row>
      <Row>
        {console.log("CARDS HERE!!")}
      </Row>
    </Container>
  )
}

export default App;
