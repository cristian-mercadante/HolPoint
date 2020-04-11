import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as colors from "./colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { AppLoading } from "expo";

import HomeStackScreen from "./stacks/HomeStackScreen";
import ProfileStackScreen from "./stacks/ProfileStackScreen";
import SearchStackScreen from "./stacks/SearchStackScreen";
import RequestsStackScreen from "./stacks/RequestsStackScreen";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import { connect } from "react-redux";
import * as authActions from "./actions/auth";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const IconWithBadge = ({ name, color, size, badgeCount }) => {
  const size_ = 15;
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <FontAwesome5 name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: colors.RED,
            borderRadius: size_ / 2,
            width: size_,
            height: size_,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

class AppNavigationContainer extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.props.onTryAutoSignup().then(() => this.setState({ isLoading: false }));
  }

  RequestIconWithBadge = props => {
    return <IconWithBadge {...props} badgeCount={this.props.receivedRequests.length} />;
  };

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
              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Cerca") {
                iconName = "search";
              } else if (route.name === "Richieste") {
                iconName = "plus";
              } else if (route.name === "Profilo") {
                iconName = "user-alt";
              } else if (route.name === "LogIn") {
                iconName = "sign-in-alt";
              } else if (route.name === "SignUp") {
                iconName = "plus";
              }
              if (route.name === "Richieste") {
                return <this.RequestIconWithBadge name={iconName} size={size} color={color} />;
              } else {
                return <FontAwesome5 name={iconName} size={size} color={color} />;
              }
            },
          })}
          tabBarOptions={{
            activeBackgroundColor: colors.YELLOW,
            inactiveBackgroundColor: colors.YELLOW,
            activeTintColor: colors.BLUE,
            inactiveTintColor: "gray",
          }}
        >
          {this.props.isAuthenticated ? (
            <>
              <Tab.Screen name="Home" component={HomeStackScreen} />
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
    isAuthenticated: state.auth.token !== null,
    receivedRequests: state.friendRequest.receivedRequests,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigationContainer);
