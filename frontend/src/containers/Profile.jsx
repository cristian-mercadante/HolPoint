import React, { Component, Fragment } from "react";
import { Container, ProgressBar, Badge } from "react-bootstrap";
import Panel from "./Panel";
import FriendBallsManager from "../components/FriendBallsManager";
import UserProfileManager from "../components/UserProfileManager";

import { connect } from "react-redux";
import * as profileActions from "../actions/profile";
import * as alertActions from "../actions/alerts";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      username: "",
      first_name: "",
      last_name: "",
      profile: {
        friends: []
      }
    };
  }

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
    } else {
      this.props.removeAllAlerts();
    }
  }

  componentDidMount() {
    const username = this.props.match.params.username;
    const token = this.props.token;
    console.log("CDM - token: " + token + " username: " + username);
    this.props.getProfile(username, token).then(err => {
      this.handleError(err);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUsername = prevProps.match.params.username;
    const username = this.props.match.params.username;
    const prevToken = prevProps.token;
    const token = this.props.token;
    console.log("CDU - token: " + token + " username: " + username);
    if (prevToken !== token) {
      this.props.getProfile(username, token).then(err => {
        this.handleError();
      });
      console.log("token changed CDU");
    }
    if (prevUsername !== username) {
      this.props.getProfile(username, token).then(err => {
        this.handleError();
      });
      console.log("username changed CDU");
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
    username: state.auth.username,
    token: state.auth.token,
    loading: state.profile.loading,
    error: state.profile.error,
    profile: state.profile.profile
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
