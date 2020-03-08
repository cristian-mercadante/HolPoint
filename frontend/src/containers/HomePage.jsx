import React, { Component } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { GroupCardsManager, GroupCreateButton } from "../components/group";
import Panel from "../containers/Panel";
import { connect } from "react-redux";

class HomePage extends Component {
  render() {
    return (
      <Container>
        {this.props.currentUser.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Panel title="Gruppi" component={<GroupCardsManager {...this.props} />} badge={<GroupCreateButton />} />
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
