import React, { Component, Fragment } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

// import AlertComponent from "../components/alerts/AlertComponent";
// import AlertsOverlayComponent from "../components/alerts/AlertsOverlayComponent";
import { AlertComponent, AlertsOverlayComponent } from "../components/alerts/index";

import * as colors from "../colors";
import { Title, LogInSignUp, ProfileButton } from "../components/misc";

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

        <AlertsOverlayComponent alerts={this.props.alerts}>
          <AlertComponent />
        </AlertsOverlayComponent>
        {this.props.children}
      </Fragment>
    );
  }
}

export default withRouter(PageLayout);
