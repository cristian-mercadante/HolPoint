import React, { Component, Fragment } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

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
              {this.props.isAuthenticated ? (
                <Fragment>
                  <LinkContainer to="/home">
                    <Nav.Link className="mr-sm-2">Home</Nav.Link>
                  </LinkContainer>
                  <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success" className="mr-sm-2">
                      <FaSearch /> Search
                    </Button>
                  </Form>
                  <ProfileButton username={this.props.username} logout={this.props.logout} />
                </Fragment>
              ) : (
                <LogInSignUp />
              )}
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
