import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as colors from "../colors";
import DetailsScreen from "../screens/DetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { connect } from "react-redux";
import * as authActions from "../actions/auth";

const ProfileStack = createStackNavigator();

function ProfileStackScreen(props) {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.YELLOW },
        headerTintColor: "#000"
      }}
    >
      <ProfileStack.Screen name="Profilo" component={ProfileScreen} options={{ title: props.username }} />
      <ProfileStack.Screen name="Details" component={DetailsScreen} />
    </ProfileStack.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    username: state.currentUser.username
  };
};

export default connect(mapStateToProps)(ProfileStackScreen);
