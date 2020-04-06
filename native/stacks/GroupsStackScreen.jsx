import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { YELLOW, RED } from "../colors";
import GroupsScreen from "../screens/GroupsScreen";
import GroupAddScreen from "../screens/GroupAddScreen";
import GroupAddFriendScreen from "../screens/GroupAddFriendScreen";

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
      <HomeStack.Screen
        name="GroupAdd"
        component={GroupAddScreen}
        options={{
          headerStyle: {
            backgroundColor: RED,
          },
          headerTintColor: "#fff",
          title: "Crea Gruppo",
        }}
      />
      <HomeStack.Screen
        name="GroupAddFriend"
        component={GroupAddFriendScreen}
        options={{
          headerStyle: {
            backgroundColor: RED,
          },
          headerTintColor: "#fff",
          title: "Aggiungi amici",
        }}
      />
    </HomeStack.Navigator>
  );
}

export default GroupsStackScreen;
