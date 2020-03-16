import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import { isAuthenticated } from "../../routes";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import * as friendRequestActions from "../../actions/friendRequest";
import * as currentUserActions from "../../actions/currentUser";
import axios from "axios";
import { unfriendAPI } from "../../server";

class FriendUnfriendButtons extends Component {
  state = {
    sent: false,
    received: false,
    requestId: null,
    friend: false
  };

  checkSentReceived = () => {
    if (!this.props.friendRequests.loading) {
      const friendRequests = this.props.friendRequests;
      const profile = this.props.profile;
      let { sent, received } = false;
      let id = null;
      if (friendRequests.sentRequests) {
        sent = friendRequests.sentRequests.find(req => req.receiver === profile.id);
        if (sent) id = sent.id;
        sent = Boolean(sent);
      }
      if (friendRequests.receivedRequests) {
        received = friendRequests.receivedRequests.find(req => req.sender === profile.id);
        if (received) id = received.id;
        received = Boolean(received);
      }
      this.setState({ sent, received, requestId: id });
    }
  };

  componentDidMount() {
    this.checkSentReceived();
    this.isAlreadyFriend();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.friendRequests.loading !== this.props.friendRequests.loading ||
      prevProps.currentUser.loading !== this.props.currentUser.loading
    ) {
      this.checkSentReceived();
      this.isAlreadyFriend();
    }
  }

  isAlreadyFriend = () => {
    let friend = null;
    if (!this.props.currentUser.loading) {
      const friends = this.props.currentUser.profile.friends;
      if (friends) {
        friend = friends.find(element => {
          return element.id === this.props.profile.id;
        });
      }
      this.setState({ friend: Boolean(friend) });
    }
  };

  sendFriendRequest = () => {
    const senderId = this.props.currentUser.id;
    const receiverId = this.props.profile.id;
    this.props.sendRequest(senderId, receiverId).then(this.setState({ sent: true, received: false }));
  };

  acceptFriendRequest = () => {
    const senderId = this.props.profile.id;
    const receiverId = this.props.currentUser.id;
    const requestId = this.state.requestId;
    this.props.respondRequest(requestId, senderId, receiverId, "Acc").then(() => {
      this.props.addFriendToState(this.props.profile);
      this.setState({ sent: false, received: false, requestId: null, friend: true });
    });
  };

  unfriend = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios.delete(`${unfriendAPI}${this.props.profile.id}`, headers).catch(error => this.props.error(error));
  };

  removeFriend = () => {
    this.unfriend().then(() => {
      this.props.removeFriendFromState(this.props.profile);
      this.setState({ friend: false });
    });
  };

  renderFriendButton = () => {
    return (
      <Fragment>
        {this.state.sent && (
          <Button variant="info" disabled>
            <FaUserPlus /> Attesa
          </Button>
        )}
        {this.state.received && (
          <Button variant="primary" onClick={this.acceptFriendRequest}>
            <FaUserPlus /> Accetta
          </Button>
        )}
        {!this.state.sent && !this.state.received && (
          <Button variant="success" onClick={this.sendFriendRequest}>
            <FaUserPlus /> Aggiungi
          </Button>
        )}
      </Fragment>
    );
  };

  renderUnfriendButton = () => {
    return (
      <Button variant="danger" onClick={this.removeFriend}>
        <FaUserMinus /> Rimuovi
      </Button>
    );
  };

  renderButtons = () => {
    if (isAuthenticated() && this.props.profile.id !== this.props.currentUser.id) {
      return <span>{this.state.friend ? this.renderUnfriendButton() : this.renderFriendButton()}</span>;
    }
  };

  render() {
    return <span>{!this.props.friendRequests.loading && this.renderButtons()}</span>;
  }
}

const mapStateToProps = state => {
  return {
    friendRequests: state.friendRequest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
    sendRequest: (senderId, receiverId) => dispatch(friendRequestActions.sendRequest(senderId, receiverId)),
    respondRequest: (requestId, senderId, receiverId, status) =>
      dispatch(friendRequestActions.respondRequest(requestId, senderId, receiverId, status)),
    addFriendToState: friend => dispatch(currentUserActions.addFriendToState(friend)),
    removeFriendFromState: friend => dispatch(currentUserActions.removeFriendFromState(friend))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendUnfriendButtons);
