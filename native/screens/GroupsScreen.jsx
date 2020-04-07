import React, { Component } from "react";

import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import GroupCardManager from "../components/group/GroupCardManager";
import { RED, DARK_YELLOW } from "../colors";
import Spinner from "../components/misc/Spinner";
import { StatusBar, View } from "react-native";

class GroupsScreen extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={DARK_YELLOW} />
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
