import React, { Component } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import GroupCardsManager from "../components/GroupCardsManager";
import Panel from "../containers/Panel";

import * as groupsActions from "../actions/groups";
import * as alertActions from "../actions/alerts";
import { connect } from "react-redux";

class HomePage extends Component {
  divStyle = {
    marginTop: "10px",
    marginBottom: "10px"
  };

  handleError(err) {
    if (err) {
      if (err.response) {
        let message = "";
        for (const v of Object.values(err.response.data)) {
          message += v;
          message += "\n";
        }
        this.props.addAlert(message, "danger");
      } else {
        this.props.addAlert(err.message, "danger");
      }
      this.props.history.push(`/home`);
    } else {
      this.props.removeAllAlerts();
    }
  }

  componentDidMount() {
    this.props.getGroups().then(error => {
      this.handleError(error);
    });
  }

  render() {
    return (
      <Container>
        {this.props.groups.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Panel title="Gruppi" component={<GroupCardsManager {...this.props} />} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    groups: state.groups
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGroups: () => dispatch(groupsActions.getGroups()),
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style)),
    removeAllAlerts: (text, style) => dispatch(alertActions.removeAllAlerts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
