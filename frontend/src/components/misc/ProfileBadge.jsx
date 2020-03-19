import React, { Component } from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default class ProfileBadge extends Component {
  render() {
    return (
      <OverlayTrigger
        placement={this.props.placement ? this.props.placement : "top"}
        overlay={
          <Tooltip>
            {this.props.profile.first_name || this.props.profile.last_name
              ? `${this.props.profile.first_name} ${this.props.profile.last_name}`
              : this.props.profile.username}
          </Tooltip>
        }
      >
        <LinkContainer to={`/profile/${this.props.profile.username}`}>
          <span style={{ zIndex: "999" }}>
            <Badge className="mr-1" variant={this.props.variant} pill>
              {this.props.profile.username}
            </Badge>
          </span>
        </LinkContainer>
      </OverlayTrigger>
    );
  }
}
