import React from "react";
import { View, Text, Button } from "react-native";
import FriendProfileListItem from "../profile/FriendProfileListItem";
import { AcceptRefuseButtons } from "./RequestButtons";
import { connect } from "react-redux";
import * as friendRequestActions from "../../actions/friendRequest";
import * as currentUserActions from "../../actions/currentUser";

const RequestListItem = (props) => {
  return (
    <FriendProfileListItem
      friend={props.friend}
      buttons={
        <AcceptRefuseButtons
          compact={true}
          onPress={(status) => {
            if (!["Acc", "Ref"].includes(status)) return;
            const senderId = props.request.sender.id;
            const receiverId = props.request.receiver.id;
            const requestId = props.request.id;
            props.respondRequest(requestId, senderId, receiverId, status).then(() => {
              status === "Acc" && props.addFriendToStore(props.request.sender);
            });
          }}
        />
      }
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    respondRequest: (requestId, senderId, receiverId, status) =>
      dispatch(friendRequestActions.respondRequest(requestId, senderId, receiverId, status)),
    addFriendToStore: (friend) => dispatch(currentUserActions.addFriendToStore(friend)),
  };
};

export default connect(null, mapDispatchToProps)(RequestListItem);
