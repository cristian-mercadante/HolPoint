import React from "react";
import { Text } from "react-native";

const UsernameLabel = ({ size, username }) => {
  return (
    <Text
      style={{
        flex: 1,
        fontSize: size,
        flexWrap: "wrap",
        alignSelf: "center",
      }}
    >
      {username}
    </Text>
  );
};

export default UsernameLabel;
