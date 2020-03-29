import React from "react";
import { View, Button, Image } from "react-native";
import { connect } from "react-redux";
import * as authActions from "../../actions/auth";
import * as colors from "../../colors";

const ProfileInfoTab = props => {
  return (
    <View>
      <Button title="Logout" onPress={props.logout} color={colors.RED} />
      <Image
        style={{
          height: 50,
          width: 50,
          borderRadius: 50 / 2
        }}
        source={{ uri: props.currentUser.profile.picture }}
      />
    </View>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfoTab);
