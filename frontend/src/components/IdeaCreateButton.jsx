import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

export default class IdeaCreateButton extends Component {
  render() {
    return this.props.currentUsername === this.props.username ? (
      <LinkContainer to="/idea/create">
        <Button variant="info">Crea idea</Button>
      </LinkContainer>
    ) : (
      ""
    );
  }
}
