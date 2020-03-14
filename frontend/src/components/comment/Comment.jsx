import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Comment.css";
import { connect } from "react-redux";
import { ProfileBadge } from "../misc";

class Comment extends Component {
  render() {
    return (
      <div className="comment">
        {this.props.currentUserId === this.props.creator.id && (
          <Button
            size="sm"
            variant="danger"
            className="float-right"
            onClick={() => this.props.deleteComment(this.props.id)}
          >
            Elimina
          </Button>
        )}
        <h5>
          <ProfileBadge profile={this.props.creator} variant="warning" />
        </h5>
        <div className="text-with-newline">{this.props.text}</div>
        <div style={{ fontStyle: "italic", fontSize: "10pt", textAlign: "right" }}>{this.props.datetime}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id
  };
};

export default connect(mapStateToProps)(Comment);
