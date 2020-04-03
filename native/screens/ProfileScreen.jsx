import React, { Component } from "react";
import { Button } from "react-native";
import { connect } from "react-redux";
import * as authActions from "../actions/auth";
import ProfileScrollView from "../components/profile/ProfileScrollView";
import * as colors from "../colors";

class ProfileScreen extends Component {
  logout = () => {
    this.props.logout();
    alert("logged out");
  };

  render() {
    return (
      <>
        {!this.props.currentUser.loading && (
          <ProfileScrollView
            profile={this.props.currentUser}
            navigation={this.props.navigation}
            routeParams={this.props.route.params}
          />
        )}
        <Button title="Logout" onPress={this.logout} color={colors.RED} />
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
    logout: () => dispatch(authActions.authLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
