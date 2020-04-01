import React from "react";
import { Image } from "react-native";
import * as colors from "../../colors";

const ProfilePicture = ({ size, source }) => {
  return (
    <Image
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        borderColor: colors.YELLOW,
        borderWidth: 2,
        margin: 20
      }}
      source={source ? { uri: source } : require("../../assets/default.png")}
    />
  );
};

export default ProfilePicture;
