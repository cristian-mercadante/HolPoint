import React from "react";
import { Image } from "react-native";
import { YELLOW } from "../../colors";

const ProfilePicture = ({ size, source }) => {
  return (
    <Image
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        borderColor: YELLOW,
        borderWidth: 2,
        margin: 15,
      }}
      source={source ? { uri: source, cache: "force-cache" } : require("../../assets/default.png")}
    />
  );
};

export default ProfilePicture;
