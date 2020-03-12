import React, { Component, Fragment } from "react";
import { ProgressBar, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Panel from "./Panel";

import axios from "axios";
import { groupsAPI } from "../server";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import { GroupContent } from "../components/group";
import { IdeaCardManager } from "../components/idea";

class GroupDetail extends Component {
  state = {
    loading: true,
    group: {},
    selectedFriends: []
  };

  updateGroup = group => {
    this.setState({ group: group });
  };

  getGroup = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    const id = this.props.match.params.id;
    axios
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

  componentDidMount() {
    this.getGroup();
  }

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
                  updateGroup={this.updateGroup}
                />
              }
            />
            <Panel title="Idee proposte" component={<IdeaCardManager ideas={this.state.group.ideas} />} />
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
    error: error => dispatch(alertActions.error(error))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupDetail));
