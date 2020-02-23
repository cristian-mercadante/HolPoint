import React, { Component } from "react";
import { Container } from "react-bootstrap";
import GroupCardsManager from "../components/GroupCardsManager";

class HomePage extends Component {
  render() {
    return (
      <Container>
        <GroupCardsManager />
      </Container>
    );
  }
}

export default HomePage;
