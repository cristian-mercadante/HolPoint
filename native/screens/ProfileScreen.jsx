import React, { Component } from "react";
import { View, Text, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//temp
import DetailsScreen from "./DetailsScreen";
import ProfileInfoTab from "./ProfileTabs/ProfileInfoTab";
import ProfileFriendsTab from "./ProfileTabs/ProfileFriendsTab";

const Tab = createMaterialTopTabNavigator();

class ProfileScreen extends Component {
  logout = () => {
    this.props.logout();
    alert("logged out");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer independent={true}>
          <Tab.Navigator>
            <Tab.Screen name="Info" component={ProfileInfoTab} />
            <Tab.Screen name="Amici" component={ProfileFriendsTab} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default ProfileScreen;
