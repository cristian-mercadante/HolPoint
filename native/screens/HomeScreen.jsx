import React from "react";
import { View, StatusBar, Text, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar barStyle="dark-content" />
      <Text>Home screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate("Details")} />
    </View>
  );
}

export default HomeScreen;
