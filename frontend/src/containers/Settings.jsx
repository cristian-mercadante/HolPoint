import React, { Component, Fragment } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import Panel from "./Panel";
import { SettingsUser } from "../components/profile";
import { connect } from "react-redux";

class Settings extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          {this.props.currentUser.loading ? (
            <ProgressBar striped variant="success" now={100} animated />
          ) : (
            <Panel title="Impostazioni utente" component={<SettingsUser currentUser={this.props.currentUser} />} />
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(Settings);
