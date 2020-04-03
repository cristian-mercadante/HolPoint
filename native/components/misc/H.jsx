import React from "react";
import { Text } from "react-native";

const H = ({ size, text, color }) => {
  return <Text style={{ fontSize: size, margin: 10, color }}>{text}</Text>;
};

export default H;
