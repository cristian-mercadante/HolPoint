import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as colors from "./colors";
import { FontAwesome } from "@expo/vector-icons";
import { AppLoading } from "expo";

import GroupsStackScreen from "./stacks/GroupsStackScreen";
import ProfileStackScreen from "./stacks/ProfileStackScreen";
import SearchStackScreen from "./stacks/SearchStackScreen";
import RequestsStackScreen from "./stacks/RequestsStackScreen";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import { connect } from "react-redux";
import * as authActions from "./actions/auth";

const Tab = createBottomTabNavigator();

class AppNavigationContainer extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.onTryAutoSignup().then(() => this.setState({ isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Gruppi") {
                iconName = "home";
              } else if (route.name === "Cerca") {
                iconName = "search";
              } else if (route.name === "Richieste") {
                iconName = "users";
              } else if (route.name === "Profilo") {
                iconName = "user";
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
          {this.props.isAuthenticated ? (
            <>
              <Tab.Screen name="Gruppi" component={GroupsStackScreen} />
              <Tab.Screen name="Cerca" component={SearchStackScreen} />
              <Tab.Screen name="Richieste" component={RequestsStackScreen} />
              <Tab.Screen name="Profilo" component={ProfileStackScreen} />
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigationContainer);
