import React, { Component, Fragment } from "react";
import { Router } from "react-router-dom";
import BaseRouter from "./routes";
import { connect } from "react-redux";
import PageLayout from "./containers/PageLayout";
import history from "./history";

import * as authActions from "./actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <PageLayout {...this.props}>
            <BaseRouter />
          </PageLayout>
        </Router>
      </Fragment>
    );
  }
}

// map the state in some property
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    username: state.currentUser.username,
    alerts: state.alerts
  };
};

// authomatic auth check
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
