import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import { FaUserFriends } from "react-icons/fa";
import { isAuthenticated } from "../routes";

export default class FriendUnfriendButtons extends Component {
  isAlreadyFriend = () => {
    if (!this.props.currentUser.loading) {
      const friends = this.props.currentUser.profile.friends;
      let friend = friends.find(element => {
        return element.id === this.props.profile.id;
      });
      return Boolean(friend);
    }
  };

  renderFriendButton = () => {
    return (
      <Button variant="success">
        <FaUserFriends /> Aggiungi agli amici
      </Button>
    );
  };

  renderUnfriendButton = () => {
    return (
      <Button variant="danger">
        <FaUserFriends /> Rimuovi dagli amici
      </Button>
    );
  };

  renderButtons = () => {
    if (isAuthenticated() && this.props.profile.id !== this.props.currentUser.id) {
      return <Fragment>{this.isAlreadyFriend() ? this.renderUnfriendButton() : this.renderFriendButton()}</Fragment>;
    }
  };

  render() {
    return <div>{this.renderButtons()}</div>;
  }
}
