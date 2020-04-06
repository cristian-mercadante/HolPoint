import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { BLUE } from "../../colors";

const TextInputLabel = props => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15, color: "#777" }}>{props.placeholder}</Text>
      <TextInput
        style={{ ...styles.formField, borderColor: props.borderColor }}
        {...props}
        placeholder={String(props.placeholder).toLowerCase()}
      />
    </View>
  );
};

export default TextInputLabel;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  formField: {
    borderColor: BLUE,
    borderBottomWidth: 1,
    fontSize: 20,
    color: "#000",
  },
});
