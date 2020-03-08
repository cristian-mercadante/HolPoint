import React, { Component, Fragment } from "react";
import { Container, ProgressBar, Badge, Row, Col } from "react-bootstrap";
import Panel from "./Panel";
import FriendBallsManager from "../components/FriendBallsManager";
import UserProfileManager from "../components/UserProfileManager";
import FriendUnfriendButtons from "../components/FriendUnfriendButtons";
import IdeaCardManager from "../components/IdeaCardManager";

import { connect } from "react-redux";
import * as profileActions from "../actions/profile";
import * as alertActions from "../actions/alerts";
import IdeaCreateButton from "../components/IdeaCreateButton";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.username).then(error => {
      if (error) {
        this.props.history.push(`/home`);
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUsername = prevProps.match.params.username;
    const username = this.props.match.params.username;
    if (prevUsername !== username) {
      this.props.getProfile(this.props.match.params.username);
    }
  }

  render() {
    return (
      <Container>
        {this.props.profileLoading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Fragment>
            <Row>
              <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                <Panel
                  title={this.props.profile.username}
                  badge={<FriendUnfriendButtons {...this.props} />}
                  component={<UserProfileManager {...this.props} />}
                />
                <Panel
                  title="Amici"
                  badge={
                    <Badge pill variant="primary">
                      {this.props.profile.profile.friends.length}
                    </Badge>
                  }
                  component={<FriendBallsManager friends={this.props.profile.profile.friends} />}
                />
              </Col>
              <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <Panel
                  title="Idee"
                  component={
                    <IdeaCardManager
                      ideas={
                        this.props.currentUser.username === this.props.profile.username
                          ? this.props.currentUser.profile.ideas
                          : this.props.profile.profile.ideas
                      }
                    />
                  }
                  badge={
                    <IdeaCreateButton
                      currentUsername={this.props.currentUser.username}
                      username={this.props.match.params.username}
                    />
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
    token: state.auth.token,
    profileLoading: state.profile.loading,
    profile: state.profile.profile,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: (username, token) => dispatch(profileActions.getProfile(username, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
