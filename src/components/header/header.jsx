import React from "react";
import { Badge, Container } from "react-bootstrap";

export default function Header() {
  return (
    <Container style={styles.container}>
      <Badge>Choose Gamemode</Badge>
    </Container>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    backgroundColor: "#282C34",
    padding: "0px",
    margin: "0px",
    color: "red",  
    fontSize: "30px",
    },
};
