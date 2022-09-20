import React from "react";
import "./PlayingCardStyle.css";
import { Container, Row } from "react-bootstrap";

function EmptyCard() {
  return (
    <Container className="EmptyCardOutline">
      <Row style={{ paddingRight: "70px" }}>
        <h1>$</h1>
      </Row>
      <Row>
        <h1>$</h1>
      </Row>
      <Row style={{ paddingLeft: "55px" }}>
        <h1>$</h1>
      </Row>
    </Container>
  );
}

export default EmptyCard;
