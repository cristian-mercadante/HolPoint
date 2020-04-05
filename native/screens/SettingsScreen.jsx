import React, { Component } from "react";
import { Text, View, Button, Alert } from "react-native";
import { connect } from "react-redux";
import * as currentUserActions from "../actions/currentUser";
import * as authActions from "../actions/auth";
import SettingsForm from "../components/settings/SettingsForm";
import { RED } from "../colors";
import RoundedButton from "../components/misc/RoundedButton";
import { ScrollView } from "react-native-gesture-handler";

class SettingsScreen extends Component {
  render() {
    return (
      <ScrollView>
        <>
          {!this.props.currentUser.loading && (
            <SettingsForm
              profile={this.props.currentUser}
              putCurrentUser={this.props.putCurrentUser}
              putCurrentUserPicture={this.props.putCurrentUserPicture}
              navigation={this.props.navigation}
            />
          )}
        </>
        <RoundedButton
          title="Logout"
          onPress={() =>
            Alert.alert("Vuoi uscire?", "", [{ text: "No" }, { text: "Sì", onPress: this.props.logout }], {
              cancelable: true,
            })
          }
          backgroundColor={RED}
          color="#fff"
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    putCurrentUser: (username, email, first_name, last_name) =>
      dispatch(currentUserActions.putCurrentUser(username, email, first_name, last_name)),
    putCurrentUserPicture: (picture) => dispatch(currentUserActions.putCurrentUserPicture(picture)),
    logout: () => dispatch(authActions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
