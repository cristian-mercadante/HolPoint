import React, { Component } from "react";
import FriendBall from "./FriendBall";

class FriendBallsManagerSelect extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center flex-wrap">
        {this.props.friends.map(f => {
          let selected = this.props.selectedFriends.includes(f.id);

          return (
            <FriendBall
              key={f.username}
              friend={f}
              selectable={true}
              selectFriend={this.props.selectFriend}
              selected={selected}
            />
          );
        })}
      </div>
    );
  }
}

export default FriendBallsManagerSelect;
