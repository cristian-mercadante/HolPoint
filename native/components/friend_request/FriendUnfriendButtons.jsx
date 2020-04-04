import React, { Component } from "react";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import * as friendRequestActions from "../../actions/friendRequest";
import * as currentUserActions from "../../actions/currentUser";
import axios from "axios";
import { unfriendAPI } from "../../server";
import { WaitButton, AcceptRefuseButtons, AddButton, RemoveButton } from "./RequestButtons";

class FriendUnfriendButtons extends Component {
  state = {
    sent: false,
    received: false,
    requestId: null,
    friend: false,
  };

  isAuthenticated = () => {
    if (this.props.token !== null) return true;
    else return false;
  };

  checkSentReceived = () => {
    if (!this.props.friendRequests.loading) {
      const friendRequests = this.props.friendRequests;
      const profile = this.props.profile;
      let { sent, received } = false;
      let requestId = null;
      if (friendRequests.sentRequests) {
        sent = friendRequests.sentRequests.find((req) => req.receiver.id === profile.id);
        if (sent) requestId = sent.id;
        sent = Boolean(sent);
      }
      if (friendRequests.receivedRequests) {
        received = friendRequests.receivedRequests.find((req) => req.sender.id === profile.id);
        if (received) requestId = received.id;
        received = Boolean(received);
      }
      this.setState({ sent, received, requestId });
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
        friend = friends.find((element) => {
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

  acceptOrRefuseFriendRequest = (status) => {
    if (!["Acc", "Ref"].includes(status)) return;
    const senderId = this.props.profile.id;
    const receiverId = this.props.currentUser.id;
    const requestId = this.state.requestId;
    this.props.respondRequest(requestId, senderId, receiverId, status).then(() => {
      status === "Acc" && this.props.addFriendToStore(this.props.profile);
      this.setState({
        sent: false,
        received: false,
        requestId: null,
        friend: status === "Acc" ? true : false,
      });
    });
  };

  unfriend = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    };
    return axios.delete(`${unfriendAPI}${this.props.profile.id}`, headers).catch((error) => this.props.error(error));
  };

  removeFriend = () => {
    this.unfriend().then(() => {
      this.props.removeFriendFromStore(this.props.profile);
      this.setState({ friend: false });
    });
  };

  renderFriendButton = () => {
    return (
      <>
        {this.state.sent && <WaitButton />}
        {this.state.received && <AcceptRefuseButtons compact={false} onPress={this.acceptOrRefuseFriendRequest} />}
        {!this.state.sent && !this.state.received && <AddButton onPress={this.sendFriendRequest} />}
      </>
    );
  };

  renderUnfriendButton = () => {
    return <RemoveButton onPress={this.removeFriend} />;
  };

  renderButtons = () => {
    if (this.props.profile.id !== this.props.currentUser.id) {
      return (
        <>{this.isAuthenticated() && this.state.friend ? this.renderUnfriendButton() : this.renderFriendButton()}</>
      );
    }
  };

  render() {
    return <>{!this.props.friendRequests.loading && this.renderButtons()}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    friendRequests: state.friendRequest,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    error: (error) => dispatch(alertActions.error(error)),
    sendRequest: (senderId, receiverId) => dispatch(friendRequestActions.sendRequest(senderId, receiverId)),
    respondRequest: (requestId, senderId, receiverId, status) =>
      dispatch(friendRequestActions.respondRequest(requestId, senderId, receiverId, status)),
    addFriendToStore: (friend) => dispatch(currentUserActions.addFriendToStore(friend)),
    removeFriendFromStore: (friend) => dispatch(currentUserActions.removeFriendFromStore(friend)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendUnfriendButtons);
