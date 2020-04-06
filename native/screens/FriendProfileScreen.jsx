import React, { Component } from "react";
import ProfileView from "../components/profile/ProfileView";
import axios from "axios";
import { profileAPI } from "../server";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import Spinner from "../components/misc/Spinner";
import * as colors from "../colors";
import { View, ScrollView, RefreshControl } from "react-native";

class FriendProfileScreen extends Component {
  state = {
    loading: true,
    profile: {},
    refreshing: false,
  };

  getProfile = () => {
    this.setState({ loading: true });
    const token = this.props.token;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    return axios
      .get(`${profileAPI}${this.props.route.params.friend.username}`, headers)
      .then((res) => this.setState({ loading: false, profile: res.data }))
      .catch((error) => this.props.error(error));
  };

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.route.params.friend.username });
    this.getProfile();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getProfile().then(() => this.setState({ refreshing: false }));
  };

  render() {
    return (
      <>
        {!this.state.loading ? (
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
            <ProfileView profile={this.state.profile} navigation={this.props.navigation} />
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

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (error) => {
  return {
    error: (error) => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps)(FriendProfileScreen);
