import React, { Component } from "react";
import { connect } from "react-redux";
import GroupCardManager from "../components/group/GroupCardManager";
import { RED } from "../colors";
import Spinner from "../components/misc/Spinner";
import { View } from "react-native";

class GroupsScreen extends Component {
  render() {
    return (
      <>
        {this.props.currentUser.loading ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Spinner color={RED} />
          </View>
        ) : (
          <GroupCardManager navigation={this.props.navigation} routeParams={this.props.route.params} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(GroupsScreen);
