import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { YELLOW } from "../colors";
import FriendListScreen from "../screens/FriendListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { connect } from "react-redux";
import FriendProfileScreen from "../screens/FriendProfileScreen";

const ProfileStack = createStackNavigator();

function ProfileStackScreen(props) {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: YELLOW },
        headerTintColor: "#000"
      }}
    >
      <ProfileStack.Screen name="Profilo" component={ProfileScreen} options={{ title: props.username }} />
      <ProfileStack.Screen name="Amici" component={FriendListScreen} />
      <ProfileStack.Screen name="FriendProfile" component={FriendProfileScreen} />
    </ProfileStack.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    username: state.currentUser.username
  };
};

export default connect(mapStateToProps)(ProfileStackScreen);
