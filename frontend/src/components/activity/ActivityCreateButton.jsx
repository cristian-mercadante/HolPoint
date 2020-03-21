import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import CardModal from "../../containers/CardModal";

import axios from "axios";
import { activityAPI, activityCreatorAPI } from "../../server";

import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import ActivityForm from "./ActivityForm";

class ActivityCreateButton extends Component {
  state = {
    showCreate: false
  };

  showCreate = () => this.setState({ showCreate: !this.state.showCreate });

  handleSubmit = e => {
    e.preventDefault();
    alert("sumbitted");
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    // TODO: submit
  };

  render() {
    return (
      <Fragment>
        <Button
          variant="success"
          style={{ backgroundColor: "var(--holpoint-green)", color: "white" }}
          onClick={this.showCreate}
        >
          Crea
        </Button>
        <CardModal
          show={this.state.showCreate}
          type="activity-modal"
          header="Crea Attività"
          onHide={this.showCreate}
          body={<ActivityForm onSubmit={this.handleSubmit} />}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts())
  };
};

export default connect(null, mapDispatchToProps)(ActivityCreateButton);
