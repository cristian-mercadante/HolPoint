import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { YELLOW } from "../colors";
import GroupsScreen from "../screens/GroupsScreen";

const HomeStack = createStackNavigator();

function GroupsStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: YELLOW },
        headerTintColor: "#000",
      }}
    >
      <HomeStack.Screen name="Home" component={GroupsScreen} />
    </HomeStack.Navigator>
  );
}

export default GroupsStackScreen;
