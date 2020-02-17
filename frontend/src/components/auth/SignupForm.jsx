import React, { Component } from "react";
import { Form, Card, Button, Col, Spinner, Alert } from "react-bootstrap";
import AccessFormCard from "./AccessFormCard";

import * as actions from "../../actions/auth";
import { connect } from "react-redux";

class SignupForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;
    console.log(`Submitted:\n${username} ${email} ${password1} ${password2}`);
    this.props.onAuth(username, email, password1, password2);
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <Alert variant="danger">{this.props.error.message}</Alert>;
    }

    return (
      <AccessFormCard>
        <Card.Header>
          <h1 className="display-4">Sign Up</h1>
        </Card.Header>
        {errorMessage}
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
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                Registrazione
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
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
