import React from "react";
import { View, Text, Button } from "react-native";

function RequestsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>RequestsScreen screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate("Details")} />
    </View>
  );
}

export default RequestsScreen;
