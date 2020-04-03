import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { YELLOW, BLUE } from "../colors";
import FriendProfileScreen from "../screens/FriendProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import FriendListScreen from "../screens/FriendListScreen";
import IdeaDetailScreen from "../screens/IdeaDetailScreen";

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: YELLOW },
        headerTintColor: "#000"
      }}
    >
      <SearchStack.Screen name="Cerca" component={SearchScreen} />
      <SearchStack.Screen name="FriendProfile" component={FriendProfileScreen} />
      <SearchStack.Screen name="Amici" component={FriendListScreen} />
      <SearchStack.Screen
        name="IdeaDetail"
        component={IdeaDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: BLUE
          },
          headerTintColor: "#fff"
        }}
      />
    </SearchStack.Navigator>
  );
}

export default SearchStackScreen;
