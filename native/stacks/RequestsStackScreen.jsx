import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { YELLOW } from "../colors";
import DetailsScreen from "../screens/DetailsScreen";
import RequestsScreen from "../screens/RequestsScreen";

const RequestsStack = createStackNavigator();

function RequestsStackScreen() {
  return (
    <RequestsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: YELLOW },
        headerTintColor: "#000"
      }}
    >
      <RequestsStack.Screen name="Richieste" component={RequestsScreen} />
      <RequestsStack.Screen name="Details" component={DetailsScreen} />
    </RequestsStack.Navigator>
  );
}

export default RequestsStackScreen;
