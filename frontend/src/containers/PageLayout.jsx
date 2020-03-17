import React, { Component, Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import { AlertComponent, AlertsOverlayComponent } from "../components/alerts/index";
import { isAuthenticated } from "../routes";
import * as colors from "../colors";
import { Title, LogInSignUp, ProfileButton } from "../components/misc";
import { SearchBar } from "../components/search";
import { FriendRequestButton } from "../components/friend_request";

class PageLayout extends Component {
  navbarStyle = {
    backgroundColor: colors.YELLOW
  };

  componentDidMount() {
    if (!isAuthenticated()) {
      this.props.history.push("/login");
    }
  }

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
                  <Nav.Item>
                    <FriendRequestButton />
                  </Nav.Item>
                  <Nav.Item>
                    <SearchBar />
                  </Nav.Item>
                  <Nav.Item>
                    <ProfileButton username={this.props.username} logout={this.props.logout} />
                  </Nav.Item>
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
