import React, { Component, Fragment } from "react";
import { ProgressBar, Container, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import axios from "axios";
import { groupAPI, groupCreatorAPI } from "../server";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import { GroupDesign, GroupPlanning } from "../components/group";

import { stringToDate_or_Null } from "../dateUtils";

class GroupDetail extends Component {
  state = {
    loading: true,
    group: {},
    selectedFriends: [],
    dateStart: null,
    dateFinish: null,
    phase: 0, // should be 0 for "ideazione" and 1 for "planning"
  };

  setDateStart = date => this.setState({ dateStart: date });
  setDateFinish = date => this.setState({ dateFinish: date });

  componentDidMount() {
    this.getGroup().then(() => {
      const { dateStart, dateFinish } = this.state;
      const prefered_idea = this.state.group.prefered_idea;
      if (prefered_idea && dateStart && dateFinish) {
        this.setState({ phase: 1 });
      }
    });
  }

  getGroup = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const id = this.props.match.params.id;
    return axios
      .get(`${groupAPI}${id}/`, headers)
      .then(res => {
        let selectedFriends = [];
        res.data.profiles.forEach(profile => selectedFriends.push(profile.id));
        this.setState({
          loading: false,
          group: res.data,
          selectedFriends: selectedFriends,
          dateStart: stringToDate_or_Null(res.data.date_start),
          dateFinish: stringToDate_or_Null(res.data.date_finish),
        });
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

  putGroup = (name, description, profiles, ideas = [], dateStart, dateFinish) => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      name,
      description,
      profiles,
      ideas, //: ideas.length === 0 ? this.state.group.ideas.map(idea => idea.id) : ideas, // fixed deleting ideas
      date_start: dateStart,
      date_finish: dateFinish,
    };
    return axios
      .put(`${groupAPI}${this.state.group.id}/`, data, headers)
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
        Authorization: `Token ${token}`,
      },
    };
    return axios
      .delete(`${groupCreatorAPI}${this.state.group.id}/`, headers)
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
    let group = { ...this.state.group };
    if (group.profiles) group.profiles = group.profiles.map(profile => profile.id);
    if (group.ideas) group.ideas = group.ideas.map(idea => idea.id);
    return group;
  };

  removeIdeaFromGroup = ideaId => {
    let group = this.getCleanDataForPutGroup();
    group.ideas = group.ideas.filter(idea => idea !== ideaId);
    const { name, description, profiles, ideas } = group;
    return this.putGroup(name, description, profiles, ideas).then(() => {
      if (this.state.group.prefered_idea && this.state.group.prefered_idea.id === ideaId) {
        this.putFavIdea(null);
      }
    });
  };

  updateIdeaInState = idea => {
    return new Promise(resolve => {
      let group = this.state.group;
      let ideas = [...this.state.group.ideas];
      let index = ideas.findIndex(idea_ => idea_.id === idea.id);
      if (index > -1) {
        ideas[index] = idea;
        group.ideas = ideas;
        this.setState({ group: group });
      }
      resolve();
    });
  };

  addIdeaToState = idea => {
    let group = this.state.group;
    group.ideas.push(idea);
    this.setState({ group });

    // add to group
    let group_ = this.getCleanDataForPutGroup();
    const { name, description, profiles, ideas } = group_;
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

  removeAttFromState = id => {
    const attachments = this.state.group.attachments.filter(att => att.id !== id);
    this.setState({
      group: {
        ...this.state.group,
        attachments,
      },
    });
  };

  addAttToState = att => {
    const attachments = [...this.state.group.attachments, att];
    this.setState({
      group: {
        ...this.state.group,
        attachments,
      },
    });
  };

  putFavIdea = ideaId => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    const data = {
      prefered_idea: ideaId,
    };
    return axios
      .put(`${groupCreatorAPI}${this.state.group.id}/`, data, headers)
      .then(res => {
        let group = this.state.group;
        group.prefered_idea = res.data.prefered_idea;
        this.setState({ group: group });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Fragment>
            <Nav style={{ marginTop: "10px" }} justify variant="tabs">
              <Nav.Item>
                <Nav.Link onClick={() => this.setState({ phase: 0 })}>Ideazione</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => this.setState({ phase: 1 })}>Pianificazione</Nav.Link>
              </Nav.Item>
            </Nav>
            {this.state.phase === 0 ? (
              <GroupDesign
                group={this.state.group}
                selectFriend={this.selectFriend}
                selectedFriends={this.state.selectedFriends}
                putGroup={this.putGroup}
                deleteGroup={this.deleteGroup}
                dateStart={this.state.dateStart}
                dateFinish={this.state.dateFinish}
                setDateStart={this.setDateStart}
                setDateFinish={this.setDateFinish}
                removeIdeaFromGroup={this.removeIdeaFromGroup}
                updateIdeaInState={this.updateIdeaInState}
                addIdeaToState={this.addIdeaToState}
                addIdeaIdsListForPutGroup={this.addIdeaIdsListForPutGroup}
                putFavIdea={this.putFavIdea}
              />
            ) : (
              <GroupPlanning
                addAttToState={this.addAttToState}
                removeAttFromState={this.removeAttFromState}
                group={this.state.group}
                dateStart={this.state.dateStart}
                dateFinish={this.state.dateFinish}
              />
            )}
          </Fragment>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupDetail));
