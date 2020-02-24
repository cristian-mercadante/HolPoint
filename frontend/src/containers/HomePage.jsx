import React, { Component } from "react";
import { Container } from "react-bootstrap";
import GroupCardsManager from "../components/GroupCardsManager";
import HomePagePanel from "../containers/HomePagePanel";
import FriendBallsManager from "../components/FriendBallsManager";

class HomePage extends Component {
  divStyle = {
    marginTop: "10px",
    marginBottom: "10px"
  };

  render() {
    return (
      <Container>
        <HomePagePanel title="Gruppi" component={<GroupCardsManager />} />
        <HomePagePanel title="Amici" component={<FriendBallsManager />} />
      </Container>
    );
  }
}

export default HomePage;
