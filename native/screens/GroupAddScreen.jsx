import React, { Component } from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import { DARK_RED } from "../colors";
import GroupForm from "../components/group/GroupForm";
import axios from "axios";
import { groupAPI } from "../server";

class GroupAddScreen extends Component {
  postGroup = (name, description, profiles, date_start, date_finish) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    };
    return axios
      .post(groupAPI, { name, description, profiles, date_start, date_finish }, headers)
      .then(res => {
        this.props.navigation.navigate("Home", { group: res.data });
        return "ok";
      })
      .catch(error => this.props.error(error));
  };

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={DARK_RED} />
        <ScrollView>
          <KeyboardAvoidingView behavior="padding">
            <GroupForm handleSubmit={this.postGroup} routeParams={this.props.route.params} />
          </KeyboardAvoidingView>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupAddScreen);
