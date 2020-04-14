import React, { Component } from "react";
import { View, Alert, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GroupInfo from "../components/group/GroupInfo";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import RoundedButton from "../components/misc/RoundedButton";
import { RED, YELLOW, BLUE, GREEN } from "../colors";
import GroupForm from "../components/group/GroupForm";
import axios from "axios";
import { groupAPI, groupCreatorAPI } from "../server";

class GroupDetailScreen extends Component {
  state = {
    group: {},
    isEditing: false,
    refreshing: false,
  };

  editing = () => this.setState({ isEditing: !this.state.isEditing });

  componentDidMount() {
    const group = this.props.route.params.group;
    this.props.navigation.setOptions({ title: group.name });
    this.setState({ group });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.route.params?.idea !== this.props.route.params?.idea) {
      const idea = this.props.route.params.idea;
      const index = this.state.group.ideas.findIndex(i => i.id === idea.id);
      if (index > -1) {
        // update idea
        this.updateIdeaInGroupInState(idea);
      } else {
        // add idea
        this.addIdeaToGroupInState(idea);
      }
    }
    if (prevProps.route.params?.deletedIdeaId !== this.props.route.params?.deletedIdeaId) {
      const ideaId = this.props.route.params.deletedIdeaId;
      this.removeIdeaFromGroupInState(ideaId);
    }
    if (prevProps.route.params?.selectedIdeas !== this.props.route.params?.selectedIdeas) {
      const selectedIdeas = this.props.route.params.selectedIdeas;
      this.addSelectedIdeasToGroupInState(selectedIdeas);
    }
    if (prevProps.route.params?.favIdea !== this.props.route.params?.favIdea) {
      const favIdea = this.props.route.params.favIdea;
      if (favIdea !== null) this.putFavIdea(favIdea.id);
    }
    if (prevProps.route.params?.deletedAttId !== this.props.route.params?.deletedAttId) {
      const attId = this.props.route.params?.deletedAttId;
      this.removeAttFromGroupInState(attId);
    }
  }

  isCurrentUserAPartecipant = group => {
    if (group.profiles) {
      return Boolean(group.profiles.find(profile => profile.id === this.props.currentUserId));
    }
  };

  getGroup = () => {
    const headers = { headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` } };
    const id = this.state.group.id;
    return axios
      .get(`${groupAPI}${id}/`, headers)
      .then(res => {
        this.setState({ group: res.data });
        this.props.route.params.updateGroupInState(res.data);
        this.props.navigation.setOptions({ title: res.data.name });
      })
      .catch(error => this.props.error(error));
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
          this.props.addAlert("Non fai più parte del gruppo");
          this.props.route.params.deleteGroupFromState(this.state.group.id);
          this.props.navigation.navigate("Home");
        }
      })
      .catch(error => {
        this.props.error(error);
        return error;
      });
  };

  putFavIdea = ideaId => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    };
    const data = { prefered_idea: ideaId };
    return axios
      .put(`${groupCreatorAPI}${this.state.group.id}/`, data, headers)
      .then(res => {
        let group = this.state.group;
        group.prefered_idea = res.data.prefered_idea;
        this.props.route.params.updateGroupInState(res.data);
        this.setState({ group: group });
      })
      .catch(error => this.props.error(error));
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

  addIdeaToGroupInState = idea => {
    let group = this.state.group;
    group.ideas = [...this.state.group.ideas, idea];
    this.props.route.params.updateGroupInState(group);
    // put
    const { name, description, profiles, date_start, date_finish, ideas } = group;
    this.putGroup(
      name,
      description,
      profiles.map(p => p.id),
      date_start,
      date_finish,
      ideas.map(i => i.id)
    ).then(() => this.editing());
  };

  addSelectedIdeasToGroupInState = selectedIdeas => {
    let group = this.state.group;
    group.ideas = [...group.ideas, ...selectedIdeas];
    this.props.route.params.updateGroupInState(group);
    const { name, description, profiles, date_start, date_finish, ideas } = group;
    this.putGroup(
      name,
      description,
      profiles.map(p => p.id),
      date_start,
      date_finish,
      ideas.map(i => i.id)
    ).then(() => this.editing());
  };

  updateIdeaInGroupInState = idea => {
    let group = this.state.group;
    const index = group.ideas.findIndex(i => i.id == idea.id);
    if (index > -1) {
      group.ideas[index] = idea;
      // put
      const { name, description, profiles, date_start, date_finish, ideas } = group;
      this.putGroup(
        name,
        description,
        profiles.map(p => p.id),
        date_start,
        date_finish,
        ideas.map(i => i.id)
      ).then(() => this.editing());
    }
  };

  removeIdeaFromGroupInState = ideaId => {
    let group = this.state.group;
    const index = group.ideas.findIndex(i => i.id == ideaId);
    if (index > -1) {
      group.ideas.splice(index, 1);
      const { name, description, profiles, date_start, date_finish, ideas } = group;
      this.putGroup(
        name,
        description,
        profiles.map(p => p.id),
        date_start,
        date_finish,
        ideas.map(i => i.id)
      ).then(() => this.editing());
    }
  };

  updateVotes = gti => {
    let group = this.state.group;
    const index = group.group_to_idea.findIndex(k => k.group === gti.group && k.idea === gti.idea);
    if (index > -1) {
      group.group_to_idea[index] = gti;
    }
  };

  removeAttFromGroupInState = attId => {
    let group = this.state.group;
    const index = group.attachments.findIndex(a => a.id === attId);
    if (index > -1) {
      group.attachments.splice(index, 1);
      this.setState({ group });
    }
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getGroup()
      .then(() => this.setState({ refreshing: false }))
      .catch(error => {
        this.props.error(error);
        this.setState({ refreshing: false });
      });
  };

  render() {
    return (
      <>
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
          <View style={{ marginTop: 10 }}>
            <RoundedButton
              title={this.state.isEditing ? "Annulla" : "Modifica"}
              backgroundColor={YELLOW}
              color="#000"
              onPress={this.editing}
            />
            {this.state.group.creator && this.props.currentUserId === this.state.group.creator.id && (
              <>
                <RoundedButton
                  title="Seleziona Idea Preferita"
                  backgroundColor={BLUE}
                  color="#fff"
                  onPress={() =>
                    this.props.navigation.navigate("GroupIdeaSelect", {
                      ideasInGroup: this.state.group.ideas,
                      mode: "fav",
                    })
                  }
                />
                <RoundedButton
                  title="Elimina"
                  backgroundColor={RED}
                  color="#fff"
                  onPress={() =>
                    Alert.alert(
                      `Sicuro di voler eliminare ${this.state.group.name}?`,
                      "Non potrai più ripristinarlo",
                      [{ text: "No" }, { text: "Sì", onPress: () => this.deleteGroup() }],
                      { cancelable: true }
                    )
                  }
                />
              </>
            )}
          </View>
          {this.state.isEditing ? (
            <GroupForm
              handleSubmit={this.putGroup}
              routeParams={this.props.route.params}
              group={this.state.group}
              fromScreen="GroupDetail"
            />
          ) : (
            <>
              <GroupInfo group={this.state.group} />
              <RoundedButton
                title="Idee"
                onPress={() =>
                  this.props.navigation.navigate("GroupIdeaList", {
                    ideas: this.state.group?.ideas,
                    updateVotes: this.updateVotes,
                    group: this.state.group,
                    routeParams: this.props.route.params,
                  })
                }
                backgroundColor={BLUE}
                color="#fff"
              />
              <RoundedButton
                title="Allegati"
                onPress={() =>
                  this.props.navigation.navigate("Attachments", {
                    attachments: this.state.group?.attachments,
                    groupId: this.state.group?.id,
                  })
                }
                backgroundColor={RED}
                color="#fff"
              />
              <RoundedButton
                title="Attività"
                onPress={() =>
                  this.state.group?.date_start && this.state.group?.date_finish
                    ? this.props.navigation.navigate("Activities", {
                        group: this.state.group,
                      })
                    : Alert.alert(
                        "Date mancanti",
                        "È necessario aver definito le date di partenza e di ritorno per accedere alle attività"
                      )
                }
                backgroundColor={GREEN}
                color="#fff"
              />
            </>
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
