import React, { Component } from "react";
import { Form, Card, Button, Col, Spinner } from "react-bootstrap";
import AccessFormCard from "./AccessFormCard";

import * as authActions from "../../actions/auth";
import * as alertActions from "../../actions/alerts";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class SignupForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const email = form.email.value;
    const password1 = form.password1.value;
    const password2 = form.password2.value;
    this.props.onAuth(username, email, password1, password2).then(err => {
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
          <h1 className="display-4">Sign Up</h1>
        </Card.Header>
        <Form onSubmit={this.handleSubmit}>
          <Card.Body>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="user_name" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="email@email.com" />
            </Form.Group>
            <Form.Row>
              <Form.Group controlId="password1" as={Col} xs={12} sm={12} md={12} lg={6}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="mysecretpassword" />
              </Form.Group>
              <Form.Group controlId="password2" as={Col} xs={12} sm={12} md={12} lg={6}>
                <Form.Label>Conferma</Form.Label>
                <Form.Control type="password" placeholder="mysecretpassword" />
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer>
            {this.props.loading ? (
              <Button variant="primary" disabled>
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Registrazione
              </Button>
            ) : (
              <Button type="submit">Registrati</Button>
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
    onAuth: (username, email, password1, password2) => dispatch(authActions.authSignup(username, email, password1, password2)),
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm));
