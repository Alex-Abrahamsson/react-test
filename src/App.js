import "./App.css";
import { useState, useEffect } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";

function App() {
  const [gameMode, setGameMode] = useState("");

  const url = "https://localhost:7289/Alex/CardGames/";

  async function myFetch(url, method = null, body = null) {
    try {
      let res = await fetch(url, {
        method: method ?? "GET",
        headers: { "content-type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      if (res.ok) {
        console.log("Request successful");

        if (method == "PUT" || method == "DELETE")
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

  const [fetchData, setFetchData] = useState([]);
  const [cards, setCards] = useState([]);

  async function getPlayData() {
    myFetch(`${url}PlayGame`)
      .then((data) => {
        setFetchData(data);
        let cards = [];
        for (let i = 0; i < data.length; i++) {
          cards.push(data[i].cards);
        }
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // (async () => {
  //   //Here I write all the code to be executed at script top level, c# main level

  //   //Start a game
  //   const responseStart = await myFetch(`${url}StartGame?gameType=HighCard`);
  //   if (responseStart) {
  //     console.log(responseStart);
  //   }

  //   //Deal a card
  //   const card = await myFetch(`${url}DealCard`);
  //   if (card) {
  //     console.log(card);
  //   }

  //   //Deal 5 cards DealCards?nrOfCards=5
  //   const cards = await myFetch(`${url}DealCards?nrOfCards=5`);
  //   if (cards) {
  //     console.log(cards);
  //   }

  //   //WinningCards
  //   const winners = await myFetch(`${url}WinningCards`, "POST", cards);
  //   if (winners) {
  //     console.log(winners);
  //   }

  //   //End game
  //   const responseEnd = await myFetch(`${url}EndGame`);
  //   if (responseEnd) {
  //     console.log(responseEnd);
  //   }
  // })();

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1>Choose GameMode</h1>
        </Col>
      </Row>
      <Row>
        <Col style={{ height: "45px" }}>
          <h3 className="gmText">{gameMode}</h3>
        </Col>
      </Row>
      <Row>
        <Col sm>
          <Button className="gmBtn"onClick={() => myFetch(`${url}StartGame?gameType=HighestCard`)}>Start Game</Button>
        </Col>
        <Col sm>
          <Button className="gmBtn" onClick={() => getPlayData()}> Deal 5 Cards</Button>
        </Col>
        <Col sm>
          <Button className="gmBtn" onClick={() => myFetch(`${url}EndGame`)}>End Game</Button>
        </Col>
      </Row>
      <Row>
        {fetchData.map((card, index) => ( 
          <Col sm key={index}>
            <Badge pill variant="primary">{card.playerName}</Badge>
            <Badge pill variant="primary">{card.sum}</Badge>
          </Col>
        ))}
      </Row>
      <Row>
        {cards.map((card, index) =>
          card.map((element) => (
            <Col sm={3} key={index}>
              <Container style={{border: '1px solid', minHeight:"200px", maxWidth:"150px", paddingTop:"40px"}}>
                <Row>
                  <h1>{element.type}</h1>
                </Row>
                <Row>
                  <h1>{element.value}</h1>
                </Row>
              </Container>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default App;
