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
              Creato da <ProfileBadge variant="warning" profile={this.props.creator} /> il {this.props.date_creation}
            </Card.Footer>
          </Card>
        </LinkContainer>
      </Fragment>
    );
  }
}

export default GroupCard;
