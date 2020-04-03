import React, { Component } from "react";
import { Text, View } from "react-native";
import ProfilePicture from "./ProfilePicture";
import UsernameLabel from "./UsernameLabel";
import { TouchableOpacity } from "react-native-gesture-handler";

const FriendProfileListItem = ({ navigation, friend }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: -20
      }}
      onPress={() => navigation.navigate("FriendProfile", { friend })}
    >
      <ProfilePicture size={60} source={friend.picture || friend.profile?.picture} />
      <UsernameLabel size={20} username={friend.username} />
    </TouchableOpacity>
  );
};

export default FriendProfileListItem;
