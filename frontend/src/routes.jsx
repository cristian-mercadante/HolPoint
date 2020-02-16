import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

const BaseRouter = () => (
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
    </Switch>
  </div>
);

export default BaseRouter;
