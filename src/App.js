import "./App.css";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import PlayingCard from "./components/PlayingCardComponent/PlayingCardComponent";
import EmptyCard from "./components/PlayingCardComponent/EmptyCardComponent";
import Test from "./components/TestComp/Test";


function App() {
  const url = "https://localhost:7289/Alex/CardGames/";
  const [gameMode, setGameMode] = useState("Highest Card");
  const [fetchData, setFetchData] = useState([]);
  const [cards, setCards] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [computerHand, setComputerHand] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [winner, setWinner] = useState("");





  async function myFetch(url, method = null, body = null) {
    try {
      let res = await fetch(url, {
        method: method ?? "GET",
        headers: { "content-type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });
      if (res.ok) {
        console.log("Request successful");
        if (method === "PUT" || method === "DELETE")
          return body;
        let data = await res.json();
        return data;
      } else {
        console.log(`Failed to recieved data from server: ${res.status}`);
        alert(`Failed to recieved data from server: ${res.status}`);
      }
    } catch (err) {
      console.log(`Failed to recieved data from server: ${err.message}`);
      alert(`Failed to recieved data from server: ${err.message}`);
    }
  }

  async function getPlayData() {
    myFetch(`${url}PlayGame`)
      .then((data) => {
        setFetchData(data);
        let cards = [];
        for (let i = 0; i < data.length; i++) {
          cards.push(data[i].cards);
        }
        setCards(cards);
        myFetch(`${url}EndGame`);
        setLoaded(false);
        setPlayerHand([]);
        setComputerHand([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function SortCardHands() {
    for (let i = 0; i < fetchData.length; i++) {
      if (fetchData[i].playerName === "Player") {
        playerHand.push(fetchData[i].cards);
      } else {
        computerHand.push(fetchData[i].cards);
      }
    }
    setLoaded(true);
    for (let index = 0; index < fetchData.length; index++) {
      if (fetchData[index].isWinner === true) {
        setWinner(fetchData[index].playerName);
      }
    }
  }






  return (
    <Container className="App">
      <Row>
        <Col style={{ height: "45px", marginTop:"50px" }}>
          <h3 className="gmText">{gameMode}</h3>
        </Col>
      </Row>
        <Container style={{ display:"flex", flexDirection:"column", alignItems: "center"}}>
          <Row>
            <Button className="gmBtn"onClick={() => myFetch(`${url}StartGame?gameType=HighestCard`)}>Start Game</Button>
          </Row>
          <Row>
            <Button className="gmBtn" onClick={() => getPlayData()}> Deal 5 Cards</Button>
          </Row>
          <Row>
            <Button className="gmBtn" onClick={() => SortCardHands()}> Show Cards</Button>
          </Row>
        </Container>
        <Row>
          <Col>
            {winner == "Player" ? <h1 className="winner">Player Wins</h1> : <h1 className="looser">Player</h1>}
          </Col>
          <Col>
            {winner == "Player" ? <h1 className="looser">Computer</h1> : <h1 className="winner">Computer Wins</h1>}
          </Col>
        </Row>
          {loaded ? 
          <Row>
            <Col>
              <Row className="PlayerTable">
                {playerHand.map((cards) => 
                  cards.map((card, index) => (
                    <Col key={index}>
                      <PlayingCard type={card.type} value={card.value} />
                    </Col>
                  ))
                )}
              </Row>
            </Col>
            <Col>
              <Row className="ComputerTable">
                {computerHand.map((cards) =>
                  cards.map((card, index) => (
                    <Col key={index}>
                      <PlayingCard type={card.type} value={card.value} />
                    </Col>
                  ))
                )}
              </Row>
            </Col>
          </Row>
          : <Row>
              <Col>
                <Row className="PlayerTable">
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                </Row>
              </Col>
              <Col>
                <Row className="ComputerTable">
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                </Row>
              </Col>
            </Row>}
            <Row>
              <Col>
                <h1>*The winner is*</h1>
                <h1>{winner}</h1>
                <Test text="Hello" onClick={() => console.log("Hej")}/>
                </Col>
            </Row>
    </Container>
  );
}

export default App;