import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class LogInSignUp extends Component {
  render() {
    return (
      <Fragment>
        <ButtonGroup>
          <LinkContainer to="/login">
            <Button variant="outline-success">Log In</Button>
          </LinkContainer>
          <LinkContainer to="/register">
            <Button variant="outline-primary">Sign Up</Button>
          </LinkContainer>
        </ButtonGroup>
      </Fragment>
    );
  }
}

export default LogInSignUp;
