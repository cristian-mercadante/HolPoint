import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import { connect } from "react-redux";
import PageLayout from "./containers/PageLayout";

import * as actions from "./auth/actions/auth";

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
    isAuthenticated: state.token !== null,
    username: state.username
  };
};

// authomatic auth check
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
