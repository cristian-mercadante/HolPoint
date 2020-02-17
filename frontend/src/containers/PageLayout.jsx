import React, { Component, Fragment } from "react";
import { Navbar, Nav, Container, Button, ButtonGroup, Image, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";

import AlertComponent from "../components/alerts/AlertComponent";
import AlertsOverlayComponent from "../components/alerts/AlertsOverlayComponent";

import * as authActions from "../actions/auth";
import { connect } from "react-redux";

import logo from "../assets/imgs/logo.png";
import Title from "../components/Title";
import * as colors from "../colors";

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
                  <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>

                  <Dropdown as={ButtonGroup} alignRight>
                    <Button variant="success">
                      <Image src={logo} height={30} width={30} roundedCircle thumbnail />
                      {"   " + this.props.username}
                    </Button>
                    <Dropdown.Toggle split variant="success" />
                    <Dropdown.Menu>
                      <Dropdown.Item>Impostazioni</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <Button variant="outline-danger" onClick={this.props.logout}>
                          Log Out
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Fragment>
              ) : (
                <Fragment>
                  <ButtonGroup>
                    <LinkContainer to="/login">
                      <Button variant="outline-success">Log In</Button>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <Button variant="outline-primary">Sign Up</Button>
                    </LinkContainer>
                  </ButtonGroup>
                </Fragment>
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
