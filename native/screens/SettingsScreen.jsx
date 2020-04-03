import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import * as currentUserActions from "../actions/currentUser";
import * as alertActions from "../actions/alerts";
import SettingsForm from "../components/settings/SettingsForm";

class SettingsScreen extends Component {
  render() {
    return (
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
    putCurrentUserPicture: picture => dispatch(currentUserActions.putCurrentUserPicture(picture))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
