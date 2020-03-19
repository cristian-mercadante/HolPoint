import React, { Component, Fragment } from "react";
import { Dropdown, Button, ButtonGroup, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";

import * as authActions from "../../actions/auth";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

class ProfileButton extends Component {
  onClickLogout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  };

  onClickProfile = e => {
    e.preventDefault();
    const path = `/profile/${this.props.currentUser.username}`;
    this.props.history.push(path);
  };

  dropdownItems = [{ key: 1, name: "Impostazioni", to: "/settings" }];

  render() {
    return (
      <Fragment>
        {!this.props.currentUser.loading && (
          <Dropdown as={ButtonGroup} alignRight>
            <Button variant="success" onClick={this.onClickProfile}>
              <Image
                src={this.props.currentUser.profile.picture ? this.props.currentUser.profile.picture : logo}
                className="profile-pic-small"
              />
              {"   " + this.props.currentUser.username}
            </Button>
            <Dropdown.Toggle split variant="success" />
            <Dropdown.Menu>
              {this.dropdownItems.map(item => (
                <LinkContainer to={item.to} key={item.key}>
                  <Dropdown.Item>{item.name}</Dropdown.Item>
                </LinkContainer>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button variant="outline-danger" onClick={this.onClickLogout}>
                  Log Out
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.authLogout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileButton));
