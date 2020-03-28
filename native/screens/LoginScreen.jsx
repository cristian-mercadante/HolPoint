import React, { Component } from "react";
import { View, Text } from "react-native";
import Title from "../components/misc/Title";

class LoginScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", flexDirection: "column", justifyContent: "space-around" }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Title />
        </View>
        <View style={{ flex: 1 }}>
          <Text>Login FORM</Text>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
