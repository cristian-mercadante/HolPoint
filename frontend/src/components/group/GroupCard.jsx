import React, { Component, Fragment } from "react";
import { Card } from "react-bootstrap";
import { ProfileBadge } from "../misc";
import { LinkContainer } from "react-router-bootstrap";

import "./style.css";

class GroupCard extends Component {
  render() {
    return (
      <Fragment>
        <LinkContainer to={`/group/${this.props.id}`}>
          <Card className="group-card" style={{ flex: 1 }}>
            <Card.Header>
              <h4>{this.props.name}</h4>
            </Card.Header>
            <Card.Body>
              <h6>Partecipanti</h6>
              {this.props.profiles.map(profile => (
                <ProfileBadge key={`${this.props.id}_${profile.id}`} variant="primary" profile={profile} />
              ))}
            </Card.Body>
            <Card.Footer>
              <ProfileBadge variant="warning" profile={this.props.creator} />
              <span className="float-right">{this.props.date_creation}</span>
            </Card.Footer>
          </Card>
        </LinkContainer>
      </Fragment>
    );
  }
}

export default GroupCard;
