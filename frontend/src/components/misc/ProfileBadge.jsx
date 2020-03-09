import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class ProfileBadge extends Component {
  render() {
    return (
      <LinkContainer to={`/profile/${this.props.username}`}>
        <span style={{ zIndex: "999" }}>
          <Badge variant={this.props.variant} pill>
            {this.props.username}
          </Badge>
        </span>
      </LinkContainer>
    );
  }
}
