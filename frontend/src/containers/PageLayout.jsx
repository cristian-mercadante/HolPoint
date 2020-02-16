import React, { Component, Fragment } from "react";
import { Navbar, Nav, Container, Button, ButtonGroup, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as colors from "../colors";
import Title from "../components/Title";
import * as actions from "../auth/actions/auth";

import { connect } from "react-redux";

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
                <Title fontSize="40px" />
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

                  <NavDropdown variant="danger" title={this.props.username} alignRight>
                    <NavDropdown.Item>Profilo</NavDropdown.Item>
                    <NavDropdown.Item>Impostazioni</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <LinkContainer to="/">
                        <Button variant="outline-danger" onClick={this.props.logout}>
                          Log Out
                        </Button>
                      </LinkContainer>
                    </NavDropdown.Item>
                  </NavDropdown>
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
        <Container>{this.props.children}</Container>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(PageLayout);
