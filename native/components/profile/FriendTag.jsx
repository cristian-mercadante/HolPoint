import React from "react";
import { View, Text } from "react-native";
import { RED, DARK_RED } from "../../colors";

const FriendTag = ({ username }) => {
  return (
    <View
      style={{
        flex: 1,
        borderColor: RED,
        borderWidth: 1,
        alignSelf: "center",
        minWidth: "50%",
        margin: 3,
        borderRadius: 100,
        paddingHorizontal: 5,
      }}
    >
      <Text style={{ textAlign: "center", color: DARK_RED }}>{username}</Text>
    </View>
  );
};

export default FriendTag;
