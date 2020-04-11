import React, { Component } from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ActivityForm from "../components/activity/ActivityForm";
import axios from "axios";
import { activityCreatorAPI } from "../server";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";

class ActivityAddScreen extends Component {
  postActivity = (title, description, url, date, time, kind) => {
    const headers = { headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` } };
    return axios
      .post(
        activityCreatorAPI,
        {
          group: this.props.route.params.group.id,
          title,
          description,
          url,
          date,
          time,
          kind,
        },
        headers
      )
      .then(res => {
        //this.props.addActivityToState(res.data);
        this.props.navigation.navigate("Activities", { activity: res.data });
        return "ok";
      })
      .catch(error => this.props.error(error));
  };

  render() {
    return (
      <>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding">
            <ActivityForm activity={{}} handleSubmit={this.postActivity} group={this.props.route.params.group} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivityAddScreen);
