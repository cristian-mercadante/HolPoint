import React from "react";
import { Route, Switch } from "react-router-dom";

// import requireAuth from "./requireAuth"; // deprecated

import HomePage from "./containers/HomePage";
import LandingPage from "./containers/LandingPage";
import Profile from "./containers/Profile";
import GroupDetail from "./containers/GroupDetail";
import Settings from "./containers/Settings";

import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import NotFound404 from "./containers/NotFound404";

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
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/profile/:username" component={Profile} />
      <Route exact path="/group/:id" component={GroupDetail} />
      <Route exact path="/settings" component={Settings} />
      <Route path="*" component={NotFound404} />
    </Switch>
  </div>
);

export default BaseRouter;
