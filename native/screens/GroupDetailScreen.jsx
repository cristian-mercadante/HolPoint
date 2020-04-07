import React, { Component } from "react";
import { Text, View, Alert, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GroupInfo from "../components/group/GroupInfo";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import RoundedButton from "../components/misc/RoundedButton";
import { RED, YELLOW, DARK_RED } from "../colors";
import GroupForm from "../components/group/GroupForm";
import axios from "axios";
import { groupAPI, groupCreatorAPI } from "../server";

class GroupDetailScreen extends Component {
  state = {
    group: {},
    isEditing: false,
  };

  editing = () => this.setState({ isEditing: !this.state.isEditing });

  componentDidMount() {
    const group = this.props.route.params.group;
    this.props.navigation.setOptions({ title: group.name });
    this.setState({ group });
  }

  isCurrentUserAPartecipant = group => {
    if (group.profiles) {
      return Boolean(group.profiles.find(profile => profile.id === this.props.currentUserId));
    }
  };

  putGroup = (name, description, profiles, date_start, date_finish, ideas = []) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    };
    const data = {
      name,
      description,
      profiles,
      date_start,
      date_finish,
      ideas,
    };
    return axios
      .put(`${groupAPI}${this.state.group.id}/`, data, headers)
      .then(res => {
        this.setState({ group: res.data });
        this.props.route.params.updateGroupInState(res.data);
        this.editing();
        this.props.navigation.setOptions({ title: res.data.name });
        // checking if a user deleted himself from the group
        if (!this.isCurrentUserAPartecipant(res.data)) {
          this.props.addAlert(`Non fai più parte del gruppo ${this.props.name}`);
          this.props.navigation.navigate("Home");
        }
      })
      .catch(error => {
        this.props.error(error);
        return error;
      });
  };

  deleteGroup = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    };
    return axios
      .delete(`${groupCreatorAPI}${this.state.group.id}/`, headers)
      .then(res => {
        this.props.route.params.deleteGroupFromState(this.state.group.id);
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  render() {
    const group = this.state.group;
    return (
      <>
        <StatusBar backgroundColor={DARK_RED} barStyle="light-content" />
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <RoundedButton
              title={this.state.isEditing ? "Annulla" : "Modifica"}
              backgroundColor={YELLOW}
              color="#000"
              onPress={this.editing}
            />
            {group.creator && this.props.currentUserId === group.creator.id && (
              <RoundedButton
                title="Elimina"
                backgroundColor={RED}
                color="#fff"
                onPress={() =>
                  Alert.alert(
                    `Sicuro di voler eliminare ${group.name}?`,
                    "Non potrai più ripristinarlo",
                    [{ text: "No" }, { text: "Sì", onPress: () => this.deleteGroup() }],
                    { cancelable: true }
                  )
                }
              />
            )}
          </View>
          {!this.state.isEditing ? (
            <GroupInfo group={this.state.group} />
          ) : (
            <GroupForm
              handleSubmit={this.putGroup}
              routeParams={this.props.route.params}
              group={group}
              fromScreen="GroupDetail"
            />
          )}
        </ScrollView>
      </>
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
    addAlert: text => dispatch(alertActions.addAlert(text)),
    error: error => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailScreen);
