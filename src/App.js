import "./App.css";
import { useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import PlayingCard from "./components/PlayingCardComponent/PlayingCardComponent";
import EmptyCard from "./components/PlayingCardComponent/EmptyCardComponent";
import { useEffect } from "react";

function App() {
  const [gameMode, setGameMode] = useState("Highest Card");
  const url = "https://localhost:7289/Alex/CardGames/";
  const [fetchData, setFetchData] = useState([]);
  const [cards, setCards] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [computerHand, setComputerHand] = useState([]);
  const [loaded, setLoaded] = useState(false);





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
          //request is successful, but WebAPI is not send a response, so I return the body which represenst the effect on the database
          return body;

        //get the data from server
        let data = await res.json();
        //JSON.stringify(data);
        return data;
      } else {
        //typcially you would log an error instead
        console.log(`Failed to recieved data from server: ${res.status}`);
        alert(`Failed to recieved data from server: ${res.status}`);
      }
    } catch (err) {
      //typcially you would log an error instead
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
            <h1>Player</h1>
          </Col>
          <Col>
            <h1>Computer</h1>
          </Col>
        </Row>
          {loaded ? 
          <Row>
            <Col>
              <Row>
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
              <Row>
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
                <Row>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                  <Col><EmptyCard /></Col>
                </Row>
              </Col>
            </Row>}
    </Container>
  );
}

export default App;