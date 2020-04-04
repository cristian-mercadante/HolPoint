import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { YELLOW, BLUE } from "../colors";
import RequestsScreen from "../screens/RequestsScreen";
import FriendProfileScreen from "../screens/FriendProfileScreen";
import FriendListScreen from "../screens/FriendListScreen";
import IdeaDetailScreen from "../screens/IdeaDetailScreen";

const RequestsStack = createStackNavigator();

function RequestsStackScreen() {
  return (
    <RequestsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: YELLOW },
        headerTintColor: "#000",
      }}
    >
      <RequestsStack.Screen name="Richieste" component={RequestsScreen} />
      <RequestsStack.Screen name="FriendProfile" component={FriendProfileScreen} />
      <RequestsStack.Screen name="Amici" component={FriendListScreen} />
      <RequestsStack.Screen
        name="IdeaDetail"
        component={IdeaDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: BLUE,
          },
          headerTintColor: "#fff",
        }}
      />
    </RequestsStack.Navigator>
  );
}

export default RequestsStackScreen;
