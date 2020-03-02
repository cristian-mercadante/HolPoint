import React, { Component } from "react";
import { Container, ProgressBar, Button } from "react-bootstrap";
import GroupCardsManager from "../components/GroupCardsManager";
import Panel from "../containers/Panel";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

class HomePage extends Component {
  divStyle = {
    marginTop: "10px",
    marginBottom: "10px"
  };

  render() {
    return (
      <Container>
        {this.props.currentUser.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Panel
            title="Gruppi"
            badge={
              <LinkContainer to="/group/create">
                <Button variant="danger">Crea nuovo</Button>
              </LinkContainer>
            }
            component={<GroupCardsManager {...this.props} />}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(HomePage);
