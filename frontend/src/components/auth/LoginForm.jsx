import React, { Component } from "react";
import { Form, Card, Button, Spinner, Alert } from "react-bootstrap";
import AccessFormCard from "./AccessFormCard";

import * as actions from "../../auth/actions/auth";
import { connect } from "react-redux";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    //console.log(`Submitted:\n${username} ${password}`);
    this.props.onAuth(username, password);
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <Alert variant="danger">{this.props.error.message}</Alert>;
    }

    return (
      <AccessFormCard>
        <Card.Header>
          <h1 className="display-4">Log In</h1>
        </Card.Header>
        {errorMessage}
        <Form onSubmit={this.handleSubmit}>
          <Card.Body>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="user_name" />
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
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
