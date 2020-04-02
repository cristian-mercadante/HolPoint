import React from "react";
import { View, Text } from "react-native";

const H1 = ({ text, color }) => {
  return <Text style={{ fontSize: 40, margin: 10, color }}>{text}</Text>;
};

export default H1;
