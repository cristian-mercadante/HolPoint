import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import CardModal from "../../containers/CardModal";
import IdeaForm from "./IdeaForm";
import { ideaAPI } from "../../server";
import axios from "axios";

import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import * as currentUserActions from "../../actions/currentUser";

class IdeaCreateButton extends Component {
  state = {
    showCreate: false
  };

  showCreate = () => {
    this.setState({ showCreate: !this.state.showCreate });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = form.title.value;
    const description = form.description.value;
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .post(
        `${ideaAPI}`,
        {
          title,
          description
        },
        headers
      )
      .then(res => {
        this.props.addIdeaToState(res.data).then(() => {
          this.showCreate();
          this.props.removeAllAlerts();
        });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  render() {
    return (
      <Fragment>
        <Button variant="info" onClick={this.showCreate}>
          Crea
        </Button>
        <CardModal
          show={this.state.showCreate}
          type="idea-modal"
          header="Crea idea"
          onHide={this.showCreate}
          body={<IdeaForm onSubmit={this.handleSubmit} />}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
    addIdeaToStore: idea => dispatch(currentUserActions.addIdeaToStore(idea)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts())
  };
};

export default connect(null, mapDispatchToProps)(IdeaCreateButton);
