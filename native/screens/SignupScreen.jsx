import React from "react";
import { View, Text } from "react-native";
import Title from "../components/misc/Title";

const SignupScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", flexDirection: "column", justifyContent: "space-around" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Title />
      </View>
      <View style={{ flex: 1 }}>
        <Text>Signup FORM</Text>
      </View>
    </View>
  );
};

export default SignupScreen;
