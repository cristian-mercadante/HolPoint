import React, { Component } from "react";
import FriendBall from "./FriendBall";

class FriendBallsManagerSelect extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center flex-wrap">
        {this.props.friends.map(f => (
          <FriendBall key={f.username} friend={f} selectable={true} selectFriend={this.props.selectFriend} />
        ))}
      </div>
    );
  }
}

export default FriendBallsManagerSelect;
