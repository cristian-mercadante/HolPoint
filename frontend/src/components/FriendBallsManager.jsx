import React, { Component } from "react";
import FriendBall from "./FriendBall";

class FriendBallsManager extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center flex-wrap">
        <FriendBall friendname="Cristian Mercadante" />
        <FriendBall friendname="2" />
        <FriendBall friendname="3" />
        <FriendBall friendname="4" />
        <FriendBall friendname="5" />
        <FriendBall friendname="6" />
        <FriendBall friendname="7" />
        <FriendBall friendname="8" />
        <FriendBall friendname="9" />
        <FriendBall friendname="10" />
      </div>
    );
  }
}

export default FriendBallsManager;
