import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as colors from "../colors";
import GroupsScreen from "../screens/GroupsScreen";
import DetailsScreen from "../screens/DetailsScreen";

const HomeStack = createStackNavigator();

function GroupsStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.YELLOW },
        headerTintColor: "#000"
      }}
    >
      <HomeStack.Screen name="Gruppi" component={GroupsScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

export default GroupsStackScreen;