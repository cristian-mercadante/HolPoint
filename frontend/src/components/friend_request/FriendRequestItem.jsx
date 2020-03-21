import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import { AcceptRefuseButtons } from ".";
import { connect } from "react-redux";
import * as friendRequestActions from "../../actions/friendRequest";
import * as currentUserActions from "../../actions/currentUser";

class FriendRequestItem extends Component {
  acceptOrRefuseFriendRequest = status => {
    if (!["Acc", "Ref"].includes(status)) return;
    const senderId = this.props.sender.id;
    const receiverId = this.props.receiver.id;
    const requestId = this.props.id;
    this.props.respondRequest(requestId, senderId, receiverId, status).then(() => {
      status === "Acc" && this.props.addFriendToStore(this.props.sender);
    });
  };

  render() {
    return (
      <Fragment>
        <tr style={{ height: "50px" }}>
          <td onClick={() => this.props.history.push(`/profile/${this.props.sender.username}`)}>
            <div style={{ fontWeight: "bold" }}>{this.props.sender.username}</div> {this.props.sender.first_name}{" "}
            {this.props.sender.last_name}
          </td>
          <td style={{ textAlign: "right" }}>
            <AcceptRefuseButtons compact={true} size="sm" onClick={this.acceptOrRefuseFriendRequest} />
          </td>
        </tr>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    respondRequest: (requestId, senderId, receiverId, status) =>
      dispatch(friendRequestActions.respondRequest(requestId, senderId, receiverId, status)),
    addFriendToStore: friend => dispatch(currentUserActions.addFriendToStore(friend))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(FriendRequestItem));
