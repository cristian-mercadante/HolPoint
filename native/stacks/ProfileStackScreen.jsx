import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { YELLOW, BLUE } from "../colors";
import FriendListScreen from "../screens/FriendListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import IdeaDetailScreen from "../screens/IdeaDetailScreen";
import IdeaAddScreen from "../screens/IdeaAddScreen";
import { connect } from "react-redux";
import FriendProfileScreen from "../screens/FriendProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const ProfileStack = createStackNavigator();

function ProfileStackScreen(props) {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: YELLOW },
        headerTintColor: "#000"
      }}
    >
      <ProfileStack.Screen name="Profilo" component={ProfileScreen} options={{ headerTitle: props.username }} />
      <ProfileStack.Screen name="Amici" component={FriendListScreen} />
      <ProfileStack.Screen name="FriendProfile" component={FriendProfileScreen} />
      <ProfileStack.Screen
        name="IdeaDetail"
        component={IdeaDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: BLUE
          },
          headerTintColor: "#fff"
        }}
      />
      <ProfileStack.Screen
        name="IdeaAdd"
        component={IdeaAddScreen}
        options={{
          headerStyle: {
            backgroundColor: BLUE
          },
          headerTintColor: "#fff",
          title: "Crea Idea"
        }}
      />
      <ProfileStack.Screen name="Impostazioni" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    username: state.currentUser.username
  };
};

export default connect(mapStateToProps)(ProfileStackScreen);
