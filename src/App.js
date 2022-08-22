import "./App.css";
import { useState, useEffect } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch("https://localhost:7289/CardGames/" + gameMode)
      .then((response) => response.json())
      .then((json) => setData(json));
    console.log(gameMode);
  }, [gameMode]);

  const getCards = () => {
    return data.map((card, index) => {
      return (
        <Container
          style={{
            width:"150px",
            height:"200px",
            margin: "5px",
            backgroundColor: "peru",
          }}
          key={index}
        >
          <Row>
            <Badge style={{display: "flex", flexDirection: "column", alignItems: "center"}}variant="primary">{card.type}</Badge>
          </Row>
          <Row style={{ height:"50%",paddingTop:"50px"}}>
            <Badge style={{display: "flex", flexDirection: "column", alignItems: "center"}}variant="primary">{card.value}</Badge>
          </Row>
        </Container>
      );
    });
  };

  return (
    <Container style={{border: "1px solid yellow"}} className="App-header">
      <Row>
        <Col style={{ border:"1px solid red", display:"flex", flexDirection:"column"}}>
          <Row style={{ height: "7vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Badge>{gameMode}</Badge>
          </Row>
          <Row style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <Button className="gmBtn"variant="primary"onClick={() => setGameMode("BlackJack")}>BlackJack</Button>
            <Button className="gmBtn"variant="primary"onClick={() => setGameMode("HighestCard")}>Highest Card</Button>
            <Button className="gmBtn"variant="primary"onClick={() => setGameMode("Poker")}>Poker</Button>
          </Row>
          {getCards()}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
