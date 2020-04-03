import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import * as currentUserActions from "../actions/currentUser";
import * as authActions from "../actions/auth";
import SettingsForm from "../components/settings/SettingsForm";
import { RED } from "../colors";

class SettingsScreen extends Component {
  render() {
    return (
      <>
        <View>
          {!this.props.currentUser.loading && (
            <SettingsForm
              profile={this.props.currentUser}
              putCurrentUser={this.props.putCurrentUser}
              putCurrentUserPicture={this.props.putCurrentUserPicture}
              navigation={this.props.navigation}
            />
          )}
        </View>
        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Button title="Logout" onPress={this.props.logout} color={RED} />
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putCurrentUser: (username, email, first_name, last_name) =>
      dispatch(currentUserActions.putCurrentUser(username, email, first_name, last_name)),
    putCurrentUserPicture: picture => dispatch(currentUserActions.putCurrentUserPicture(picture)),
    logout: () => dispatch(authActions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
