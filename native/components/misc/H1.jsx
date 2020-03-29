import React from "react";
import { View, Text } from "react-native";

const H1 = props => {
  return <Text style={{ fontSize: 40, margin: 10 }}>{props.text}</Text>;
};

export default H1;
