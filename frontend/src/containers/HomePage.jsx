import React, { Component } from "react";
import { Container } from "react-bootstrap";
import GroupCardsManager from "../components/GroupCardsManager";
import Panel from "../containers/Panel";

class HomePage extends Component {
  divStyle = {
    marginTop: "10px",
    marginBottom: "10px"
  };

  render() {
    return (
      <Container>
        <Panel title="Gruppi" component={<GroupCardsManager />} />
      </Container>
    );
  }
}

export default HomePage;
