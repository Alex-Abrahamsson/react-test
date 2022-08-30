import "./App.css";
import { useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";

function App() {
  const [gameMode, setGameMode] = useState("Highest Card");
  const url = "https://localhost:7289/Alex/CardGames/";
  const [fetchData, setFetchData] = useState([]);
  const [cards, setCards] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [computerHand, setComputerHand] = useState([]);





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
  }








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
        {fetchData.map((card, index) => ( 
          <Col sm key={index}>
            <Badge pill variant="primary">{card.playerName}</Badge>
            <Badge pill variant="primary">{card.sum}</Badge>
            {card.isWinner == true ? (<p style={{color:"red"}}>Looser</p>) : (<p style={{color:"lime"}}>Winner</p>)}
          </Col>
        ))}
      </Row>
      <Row>
        {cards.map((card, index) => 
          card.map((element) => (
            <Col sm={3} key={index}>
              <Container style={{border: '2px solid', minHeight:"200px", maxWidth:"150px", paddingTop:"40px"}}>
                <Row>
                  { element.type == "♥" ? (<h1 style={{color:"red"}}>{element.type}</h1>)
                  : element.type == "♦" ? (<h1 style={{color:"red"}}>{element.type}</h1>) 
                  : (<h1>{element.type}</h1>)}
                </Row>
                <Row>
                  { element.type == "♥" ? (<h1 style={{color:"red"}}>{element.value}</h1>)
                  : element.type == "♦" ? (<h1 style={{color:"red"}}>{element.value}</h1>) 
                  : (<h1>{element.value}</h1>)}
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
