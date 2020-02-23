import React, { Component, Fragment } from "react";
import { Navbar, Nav, Container, Button, ButtonGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";

import AlertComponent from "../components/alerts/AlertComponent";
import AlertsOverlayComponent from "../components/alerts/AlertsOverlayComponent";

import * as authActions from "../actions/auth";
import { connect } from "react-redux";

import Title from "../components/Title";
import * as colors from "../colors";
import ProfileButton from "../components/ProfileButton";
import LogInSignUp from "../components/LogInSignUp";

class PageLayout extends Component {
  navbarStyle = {
    backgroundColor: colors.YELLOW
  };

  render() {
    return (
      <Fragment>
        <Navbar style={this.navbarStyle} expand="lg">
          <Navbar.Brand to="/">
            <LinkContainer to="/">
              <Navbar.Brand>
                <Title fontSize="30px" />
              </Navbar.Brand>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {this.props.isAuthenticated ? <ProfileButton username={this.props.username} logout={this.props.logout} /> : <LogInSignUp />}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <AlertsOverlayComponent alerts={this.props.alerts}>
            <AlertComponent />
          </AlertsOverlayComponent>
          {this.props.children}
        </Container>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(PageLayout));
