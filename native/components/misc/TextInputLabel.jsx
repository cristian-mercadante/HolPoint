import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { BLUE } from "../../colors";

const TextInputLabel = props => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15 }}>{props.placeholder}</Text>
      <TextInput
        style={styles.formField}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor="#777"
      />
    </View>
  );
};

export default TextInputLabel;

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  formField: {
    borderColor: BLUE,
    borderBottomWidth: 1,
    fontSize: 20,
    color: "#000"
  }
});
