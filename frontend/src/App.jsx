import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import { connect } from "react-redux";
import PageLayout from "./containers/PageLayout";

import * as authActions from "./actions/auth";
import * as alertActions from "./actions/alerts";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Fragment>
        <Router>
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
    username: state.auth.username,
    alerts: state.alerts
  };
};

// authomatic auth check
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState()),
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
