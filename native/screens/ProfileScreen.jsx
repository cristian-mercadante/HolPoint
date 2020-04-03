import React, { Component } from "react";
import { View, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as currentUserActions from "../actions/currentUser";
import ProfileView from "../components/profile/ProfileView";
import * as colors from "../colors";
import Spinner from "../components/misc/Spinner";
import { FontAwesome } from "@expo/vector-icons";

class ProfileScreen extends Component {
  state = {
    refreshing: false
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Impostazioni")} style={{ marginRight: 20 }}>
          <FontAwesome name="gear" size={25} />
        </TouchableOpacity>
      )
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getCurrentUser().then(() => this.setState({ refreshing: false }));
  };

  render() {
    return (
      <>
        {!this.props.currentUser.loading ? (
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
            <ProfileView
              profile={this.props.currentUser}
              navigation={this.props.navigation}
              routeParams={this.props.route.params}
            />
          </ScrollView>
        ) : (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Spinner color={colors.YELLOW} />
          </View>
        )}
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
    getCurrentUser: () => dispatch(currentUserActions.getCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
