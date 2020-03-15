import React, { Component, Fragment } from "react";
import { ProgressBar, Container, ButtonGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Panel from "./Panel";

import axios from "axios";
import { groupsAPI } from "../server";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import { GroupContent } from "../components/group";
import { IdeaCardManagerVote, IdeaCreateButton, IdeaAddToGroupButton } from "../components/idea";

class GroupDetail extends Component {
  state = {
    loading: true,
    group: {},
    selectedFriends: []
  };

  componentDidMount() {
    this.getGroup();
  }

  getGroup = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    const id = this.props.match.params.id;
    return axios
      .get(`${groupsAPI}${id}/`, headers)
      .then(res => {
        let selectedFriends = [];
        res.data.profiles.forEach(profile => selectedFriends.push(profile.id));
        this.setState({ loading: false, group: res.data, selectedFriends: selectedFriends });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  isCurrentUserAPartecipant = group => {
    if (group.profiles) {
      return Boolean(group.profiles.find(profile => profile.id === this.props.currentUser.id));
    }
  };

  putGroup = (name, description, profiles, ideas = []) => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    const data = {
      name,
      description,
      profiles,
      ideas: ideas.length === 0 ? this.state.group.ideas.map(idea => idea.id) : ideas // fixed deleting ideas
    };
    return axios
      .put(`${groupsAPI}${this.state.group.id}/`, data, headers)
      .then(res => {
        this.setState({ group: res.data });
        // checking if a user deleted himself from the group
        if (!this.isCurrentUserAPartecipant(res.data)) {
          this.props.addAlert(`Non fai più parte del gruppo ${this.props.name}.`, "warning");
          this.props.history.push("/home");
        }
      })
      .catch(error => {
        this.props.error(error);
        return error;
      });
  };

  deleteGroup = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .delete(`${groupsAPI}${this.state.group.id}/`, headers)
      .then(res => {
        this.props.history.push("/home");
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  deselectFriend = id => {
    var array = [...this.state.selectedFriends];
    var index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selectedFriends: array });
    }
  };

  selectFriend = id => {
    if (this.state.selectedFriends.includes(id)) {
      this.deselectFriend(id);
    } else {
      this.setState({ selectedFriends: [...this.state.selectedFriends, id] });
    }
  };

  getCleanDataForPutGroup = () => {
    let group = this.state.group;
    if (group.profiles) group.profiles = group.profiles.map(profile => profile.id);
    if (group.ideas) group.ideas = group.ideas.map(idea => idea.id);
    return group;
  };

  removeIdeaFromGroup = ideaId => {
    let group = this.getCleanDataForPutGroup();
    group.ideas = group.ideas.filter(idea => idea !== ideaId);
    const { name, description, profiles, ideas } = group;
    return this.putGroup(name, description, profiles, ideas);
  };

  updateIdeaInState = idea => {
    let group = this.state.group;
    let ideas = [...this.state.group.ideas];
    let index = ideas.findIndex(idea_ => idea_.id === idea.id);
    ideas[index] = idea;
    group.ideas = ideas;
    this.setState({ group: group });
  };

  addIdeaToState = idea => {
    let group = this.state.group;
    group.ideas = [...this.state.group.ideas, idea];
    this.setState({ group: group });

    // add to group
    let group_ = this.getCleanDataForPutGroup();
    group_.ideas = [...group_.ideas, idea.id];
    const { name, description, profiles, ideas } = group;
    return this.putGroup(name, description, profiles, ideas);
  };

  addIdeaIdsListForPutGroup = ideasToAdd => {
    if (ideasToAdd.length !== 0) {
      let group = this.getCleanDataForPutGroup();
      group.ideas = [...group.ideas, ...ideasToAdd];
      const { name, description, profiles, ideas } = group;
      return this.putGroup(name, description, profiles, ideas);
    }
  };

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Fragment>
            <Panel
              title={this.state.group.name}
              component={
                <GroupContent
                  {...this.state.group}
                  selectFriend={this.selectFriend}
                  selectedFriends={this.state.selectedFriends}
                  putGroup={this.putGroup}
                  deleteGroup={this.deleteGroup}
                />
              }
            />
            <Panel
              title="Idee proposte"
              component={
                <IdeaCardManagerVote
                  ideas={this.state.group.ideas}
                  deleteIdea={this.removeIdeaFromGroup}
                  updateIdeaInState={this.updateIdeaInState}
                  group_to_idea={this.state.group.group_to_idea}
                />
              }
              badge={
                <ButtonGroup>
                  <IdeaCreateButton addIdeaToState={this.addIdeaToState} />
                  <IdeaAddToGroupButton
                    addIdeaToState={this.addIdeaIdsListForPutGroup}
                    groupIdeas={this.state.group.ideas}
                  />
                </ButtonGroup>
              }
            />
          </Fragment>
        )}
      </Container>
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
    error: error => dispatch(alertActions.error(error)),
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupDetail));
