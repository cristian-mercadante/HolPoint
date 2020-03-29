import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

const ProfileFriendsTab = props => {
  return (
    <View>
      <Text>Lista amici</Text>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(ProfileFriendsTab);
