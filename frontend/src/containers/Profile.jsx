import React, { Component, Fragment } from "react";
import { Container, ProgressBar, Badge, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Panel from "./Panel";
import { FriendBallsManager } from "../components/friend";
import { UserProfileManager } from "../components/profile";
import { IdeaCardManager, IdeaCreateButton } from "../components/idea";
import * as alertActions from "../actions/alerts";
import * as currentUserActions from "../actions/currentUser";
import axios from "axios";
import { profileAPI, ideaAPI } from "../server";

import { connect } from "react-redux";

class Profile extends Component {
  state = {
    loading: true,
    profile: {}
  };

  addIdeaToState = idea => {
    return new Promise(resolve => {
      let profile = { ...this.state.profile };
      profile.profile.ideas = [...profile.profile.ideas, idea];
      this.setState({ profile: profile });
      resolve();
    });
  };

  updateIdeaInState = idea => {
    return new Promise(resolve => {
      let profile = { ...this.state.profile };
      let ideas = [...this.state.profile.profile.ideas];
      let index = ideas.findIndex(idea_ => {
        // eslint-disable-next-line
        return idea_.id == idea.id;
      });
      ideas[index] = idea;
      profile.profile.ideas = ideas;
      this.setState({ profile: profile });
      resolve();
    });
  };

  deleteIdea = ideaId => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .delete(`${ideaAPI}${ideaId}/`, headers)
      .then(res => {
        this.removeIdeaFromState(ideaId);
        this.props.removeIdeaFromStore(ideaId);
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  removeIdeaFromState = ideaId => {
    let profile = { ...this.state.profile };
    profile.profile.ideas = profile.profile.ideas.filter(idea => {
      return idea.id !== ideaId;
    });
    this.setState({ profile: profile });
  };

  getProfile = () => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .get(`${profileAPI}${this.props.match.params.username}`, headers)
      .then(res => {
        this.setState({ loading: false, profile: res.data });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  componentDidMount() {
    this.getProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUsername = prevProps.match.params.username;
    const username = this.props.match.params.username;
    if (prevUsername !== username) {
      this.getProfile();
    }
  }

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Fragment>
            <Row>
              <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                <Panel
                  title={this.state.profile.username}
                  component={<UserProfileManager profile={this.state.profile} currentUser={this.props.currentUser} />}
                />
                <Panel
                  title="Amici"
                  badge={
                    <Badge pill variant="primary">
                      {this.state.profile.profile.friends.length}
                    </Badge>
                  }
                  component={<FriendBallsManager friends={this.state.profile.profile.friends} />}
                />
              </Col>
              <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <Panel
                  title="Idee"
                  component={
                    <IdeaCardManager
                      ideas={this.state.profile.profile.ideas}
                      deleteIdea={this.deleteIdea}
                      updateIdeaInState={this.updateIdeaInState}
                    />
                  }
                  badge={
                    <Fragment>
                      {this.props.currentUser.username === this.props.match.params.username && (
                        <IdeaCreateButton addIdeaToState={this.addIdeaToState} />
                      )}
                    </Fragment>
                  }
                />
              </Col>
            </Row>
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
    removeIdeaFromStore: ideaId => dispatch(currentUserActions.removeIdeaFromStore(ideaId)),
    error: error => dispatch(alertActions.error(error))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
