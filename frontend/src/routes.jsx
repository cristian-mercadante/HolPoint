import React from "react";
import { Route, Switch } from "react-router-dom";

import requireAuth from "./requireAuth";

import HomePage from "./containers/HomePage";
import LandingPage from "./containers/LandingPage";

import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

const BaseRouter = props => (
  <div>
    <Switch>
      <Route exact path="/">
        <LandingPage form={() => <LoginForm />} />
      </Route>
      <Route exact path="/login">
        <LandingPage form={() => <LoginForm />} />
      </Route>
      <Route exact path="/register">
        <LandingPage form={() => <SignupForm />} />
      </Route>
      <Route exact path="/home" component={requireAuth(HomePage)} />
      <Route path="*">{"404 not found"}</Route>
    </Switch>
  </div>
);

export default BaseRouter;
