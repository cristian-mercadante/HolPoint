import React, { Component } from "react";
import ProfileScrollView from "../components/profile/ProfileScrollView";
import axios from "axios";
import { profileAPI } from "../server";
import { connect } from "react-redux";
import Spinner from "../components/misc/Spinner";
import * as colors from "../colors";

class FriendProfileScreen extends Component {
  state = {
    loading: true,
    profile: {}
  };

  getProfile = () => {
    this.setState({ loading: true });
    const token = this.props.token;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .get(`${profileAPI}${this.props.route.params.friend.username}`, headers)
      .then(res => {
        this.setState({ loading: false, profile: res.data });
      })
      .catch(error => error && alert(error));
  };

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.route.params.friend.username });
    this.getProfile();
  }

  render() {
    return (
      <>
        {!this.state.loading ? (
          <ProfileScrollView profile={this.state.profile} navigation={this.props.navigation} />
        ) : (
          <Spinner color={colors.BLUE} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(FriendProfileScreen);
