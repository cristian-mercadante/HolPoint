import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import { ideaAPI } from "../server";

class IdeaCreateForm extends Component {
  handleError = err => {
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
    } else {
      this.props.removeAllAlerts();
      this.props.history.push("/home");
    }
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
        this.props.history.push(`/profile/${this.props.currentUser.username}`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" placeholder="Bellissima vacanza a..." />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control as="textarea" rows="10" />
        </Form.Group>
        <Button type="submit">Crea!</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IdeaCreateForm));
