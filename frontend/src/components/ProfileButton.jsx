import React, { Component, Fragment } from "react";
import { Dropdown, Button, ButtonGroup, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

import * as authActions from "../actions/auth";
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
    const path = `/profile/${this.props.username}`;
    this.props.history.push(path);
  };

  dropdownItems = [
    { key: 1, name: "Crea gruppo", to: "/group/create" },
    { key: 2, name: "Crea idea", to: "/idea/create" },
    { key: 3, name: "Impostazioni", to: "/settings" }
  ];

  render() {
    return (
      <Fragment>
        <Dropdown as={ButtonGroup} alignRight>
          <Button variant="success" onClick={this.onClickProfile}>
            <Image src={logo} height={30} width={30} roundedCircle thumbnail />
            {"   " + this.props.username}
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
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.authLogout())
  };
};

export default withRouter(connect(null, mapDispatchToProps)(ProfileButton));
