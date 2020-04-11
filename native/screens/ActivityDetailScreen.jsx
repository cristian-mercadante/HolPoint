import React, { Component } from "react";
import { Text, View, Alert } from "react-native";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import { ScrollView } from "react-native-gesture-handler";
import RoundedButton from "../components/misc/RoundedButton";
import { YELLOW, RED } from "../colors";
import ActivityForm from "../components/activity/ActivityForm";
import axios from "axios";
import { activityAPI, activityCreatorAPI } from "../server";
import ActivityInfo from "../components/activity/ActivityInfo";

class ActivityDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: this.props.route.params.activity,
      isEditing: false,
    };
  }

  editing = () => this.setState({ isEditing: !this.state.isEditing });

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.route.params.activity.title });
  }

  putActivity = (title, description, url, date, time, kind) => {
    const headers = { headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` } };
    return axios
      .put(
        `${activityAPI}${this.props.route.params.group.id}/${this.state.activity.id}`,
        {
          title,
          description,
          url,
          date,
          time,
          kind,
        },
        headers
      )
      .then(res => this.props.navigation.navigate("Activities", { activity: res.data }))
      .catch(error => this.props.error(error));
  };

  deleteActivity = () => {
    const headers = { headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` } };
    return axios
      .delete(`${activityCreatorAPI}${this.state.activity.id}/`, headers)
      .then(res => this.props.navigation.navigate("Activities", { deletedActivity: this.state.activity }))
      .catch(error => this.props.error(error));
  };

  render() {
    const activity = this.state.activity;

    return (
      <ScrollView>
        <View style={{ marginTop: 10 }}>
          <RoundedButton
            title={this.state.isEditing ? "Annulla" : "Modifica"}
            backgroundColor={YELLOW}
            color="#000"
            onPress={this.editing}
          />
          {activity.creator.id === this.props.currentUserId && (
            <RoundedButton
              title="Elimina"
              backgroundColor={RED}
              color="#fff"
              onPress={() =>
                Alert.alert(
                  `Sicuro di voler eliminare ${activity.title}?`,
                  "Non potrai più rispristinarla",
                  [{ text: "No" }, { text: "Sì", onPress: () => this.deleteActivity() }],
                  { cancelable: true }
                )
              }
            />
          )}
        </View>
        {this.state.isEditing ? (
          <ActivityForm handleSubmit={this.putActivity} activity={activity} />
        ) : (
          <ActivityInfo activity={this.state.activity} />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentUserId: state.currentUser.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps)(ActivityDetailScreen);
