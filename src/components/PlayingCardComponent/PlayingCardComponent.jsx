import React from 'react';
import './PlayingCardStyle.css';
import {Container, Row} from 'react-bootstrap';






function PlayingCard(props) {

    return (
      <Container className="CardOutline">
        <Row>
          { props.type == "♥" ? (<h1 className="RedCardTxT">{props.type}</h1>)
          : props.type == "♦" ? (<h1 className="RedCardTxT">{props.type}</h1>) 
          : (<h1 className="BlackCardTxT">{props.type}</h1>)}
        </Row>
        <Row>
          { props.type == "♥" ? (<h1 className="RedCardTxT">{props.value}</h1>)
          : props.type == "♦" ? (<h1 className="RedCardTxT">{props.value}</h1>) 
          : (<h1 className="BlackCardTxT">{props.value}</h1>)}
        </Row>
        <Row>
          { props.type == "♥" ? (<h1 className="RedCardTxT">{props.type}</h1>)
          : props.type == "♦" ? (<h1 className="RedCardTxT">{props.type}</h1>) 
          : (<h1 className="BlackCardTxT">{props.type}</h1>)}
        </Row>
      </Container>
    );
}


export default PlayingCard;
    