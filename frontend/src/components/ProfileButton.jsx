import React, { Component, Fragment } from "react";
import { Dropdown, Button, ButtonGroup, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

class ProfileButton extends Component {
  onClick = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <Fragment>
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
              <Button variant="outline-danger" onClick={this.onClick}>
                Log Out
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  }
}

export default withRouter(ProfileButton);
