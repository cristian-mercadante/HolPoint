import React from "react";
import { Route, Switch } from "react-router-dom";

import requireAuth from "./requireAuth";

import HomePage from "./containers/HomePage";
import LandingPage from "./containers/LandingPage";
import Profile from "./containers/Profile";
import GroupCreate from "./containers/GroupCreate";
import IdeaCreate from "./containers/IdeaCreate";

import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import GroupDetail from "./containers/GroupDetail";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token === undefined) {
    return false;
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      return false;
    } else {
      return true;
    }
  }
};

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
      <Route exact path="/profile/:username" component={Profile} />
      <Route exact path="/group/create" component={requireAuth(GroupCreate)} />
      <Route exact path="/group/:id" component={requireAuth(GroupDetail)} />
      <Route exact path="/idea/create" component={requireAuth(IdeaCreate)} />
      <Route path="*">{"404 not found"}</Route>
    </Switch>
  </div>
);

export default BaseRouter;
