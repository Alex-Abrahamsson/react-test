import './App.css';
import react, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';




function App() {

  //Fetch from API
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://localhost:7289/CardGames/HighestCard")
      .then((response) => response.json())
      .then((json) => setData(json));
    } , []);
  
    const getCards = () => {
      return data.map((card, index) => {
        return (
          <div key={index}>
            <p>{card.type} {card.value}</p>
          </div>
        );
      }
    );
  }


  


  return (
    <div className="App">
      <header className="App-header">
        <Button>BlackJack</Button>
        <Button>Highest Card</Button>
        <Button>Poker</Button>
        <p>HighestCard game</p>
        {getCards()}
      </header>
    </div>
  );
}

export default App;
