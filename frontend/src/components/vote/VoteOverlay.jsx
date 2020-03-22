import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default class VoteOverlay extends Component {
  render() {
    return (
      <OverlayTrigger
        placement="top"
        overlay={
          this.props.votes && (
            <Tooltip>
              {this.props.votes.length > 0 ? (
                this.props.votes.map(p => <div key={p.username}>{p.username}</div>)
              ) : (
                <div>Nessun voto</div>
              )}
            </Tooltip>
          )
        }
      >
        {this.props.children}
      </OverlayTrigger>
    );
  }
}
