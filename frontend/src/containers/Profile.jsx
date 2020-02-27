import React, { Component, Fragment } from "react";
import { Container, ProgressBar, Badge } from "react-bootstrap";
import Panel from "./Panel";
import FriendBallsManager from "../components/FriendBallsManager";
import UserProfileManager from "../components/UserProfileManager";

import { connect } from "react-redux";
import * as profileActions from "../actions/profile";
import * as alertActions from "../actions/alerts";

class Profile extends Component {
  handleError(err) {
    if (err) {
      if (err.response) {
        let message = "";
        for (const v of Object.values(err.response.data)) {
          message += v;
          message += "\n";
        }
        //console.log(message);
        this.props.addAlert(message, "danger");
      } else {
        this.props.addAlert(err.message, "danger");
      }
      this.props.history.push(`/home`);
    } else {
      this.props.removeAllAlerts();
    }
  }

  componentDidMount() {
    console.log("CDM getProfile");
    this.props.getProfile(this.props.match.params.username).then(error => {
      this.handleError(error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUsername = prevProps.match.params.username;
    const username = this.props.match.params.username;
    if (prevUsername !== username) {
      console.log("CDU getProfile");
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
            <Panel title={this.props.profile.username} component={<UserProfileManager {...this.props} />} />
            <Panel
              title="Amici"
              badge={
                <Badge pill variant="primary">
                  {this.props.profile.profile.friends.length}
                </Badge>
              }
              component={<FriendBallsManager friends={this.props.profile.profile.friends} />}
            />
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
    getProfile: (username, token) => dispatch(profileActions.getProfile(username, token)),
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style)),
    removeAllAlerts: (text, style) => dispatch(alertActions.removeAllAlerts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
