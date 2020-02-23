import React, { Component } from "react";
import { Form, Card, Button, Spinner } from "react-bootstrap";
import AccessFormCard from "./AccessFormCard";

import * as authActions from "../../actions/auth";
import * as alertActions from "../../actions/alerts";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const password = form.password.value;
    this.props.onAuth(username, password).then(err => {
      if (err) {
        if (err.response) {
          let message = "";
          for (const v of Object.values(err.response.data)) {
            message += v;
            message += "\n";
          }
          //console.log(message);
          this.props.addAlert(message, "danger");
        } else {
          this.props.addAlert(err.message, "danger");
        }
      } else {
        this.props.history.push("/home");
        this.props.removeAllAlerts();
      }
    });
  };

  /*
  componentWillUnmount() {
    this.props.removeAllAlerts();
  }
  */

  render() {
    return (
      <AccessFormCard>
        <Card.Header>
          <h1 className="display-4">Log In</h1>
        </Card.Header>
        <Form onSubmit={this.handleSubmit}>
          <Card.Body>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="user_name" />
              <Form.Control.Feedback>ciao</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="mysecretpassword" />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            {this.props.loading ? (
              <Button variant="primary" disabled>
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                Accesso
              </Button>
            ) : (
              <Button type="submit">Accedi</Button>
            )}
          </Card.Footer>
        </Form>
      </AccessFormCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(authActions.authLogin(username, password)),
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
