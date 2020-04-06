import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  button: {
    width: "80%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
});

const RoundedButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.button, backgroundColor: props.backgroundColor }}
      disabled={props.disabled || false}
    >
      <Text style={{ textAlign: "center", color: props.color }}>
        {props.icon}
        {props.title && ` ${String(props.title).toUpperCase()}`}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
