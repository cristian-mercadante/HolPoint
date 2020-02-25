import React, { Component } from "react";
import FriendBall from "./FriendBall";

class FriendBallsManager extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center flex-wrap">
        {this.props.friends.map(f => (
          <FriendBall key={f.username} username={f.username} />
        ))}
      </div>
    );
  }
}

export default FriendBallsManager;
