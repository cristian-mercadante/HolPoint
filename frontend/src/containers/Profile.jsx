import React, { Component, Fragment } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import Panel from "./Panel";
import FriendBallsManager from "../components/FriendBallsManager";
import UserProfileManager from "../components/UserProfileManager";

import { connect } from "react-redux";
import * as profileActions from "../actions/profile";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      profile: {
        friends: []
      }
    };
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.getProfile(username);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUsername = prevProps.match.params.username;
    const username = this.props.match.params.username;
    if (prevUsername !== username) {
      this.props.getProfile(username);
    }
  }

  render() {
    return (
      <Container>
        {this.props.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Fragment>
            <Panel title={this.props.profile.username} component={<UserProfileManager profile={this.props.profile} />} />
            <Panel title="Amici" component={<FriendBallsManager friends={this.props.profile.profile.friends} />} />
          </Fragment>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    loading: state.profile.loading,
    profile: state.profile.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: username => dispatch(profileActions.getProfile(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
