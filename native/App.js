import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as colors from "./colors";
import { FontAwesome } from "@expo/vector-icons";

import HomeStackScreen from "./stacks/HomeStackScreen";
import SettingsStackScreen from "./stacks/SettingsStackScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Tab = createBottomTabNavigator();

class App extends Component {
  state = {
    isAuthenticated: false,
    isLoading: true
  };

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Settings") {
                iconName = "cog";
              } else if (route.name === "LogIn") {
                iconName = "sign-in";
              } else if (route.name === "SignUp") {
                iconName = "plus";
              }
              return <FontAwesome name={iconName} size={size} color={color} />;
            }
          })}
          tabBarOptions={{
            activeBackgroundColor: colors.YELLOW,
            inactiveBackgroundColor: colors.YELLOW,
            activeTintColor: colors.BLUE,
            inactiveTintColor: "gray"
          }}
        >
          {this.state.isAuthenticated ? (
            <>
              <Tab.Screen name="Home" component={HomeStackScreen} />
              <Tab.Screen name="Settings" component={SettingsStackScreen} />
            </>
          ) : (
            <>
              <Tab.Screen name="LogIn" component={LoginScreen} />
              <Tab.Screen name="SignUp" component={SignupScreen} />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
