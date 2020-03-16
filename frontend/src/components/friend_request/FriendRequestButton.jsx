import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { FaUserFriends } from "react-icons/fa";

export default class FriendRequestButton extends Component {
  render() {
    return (
      <Button className="ml-2 mr-2" variant="danger">
        <FaUserFriends />
      </Button>
    );
  }
}
