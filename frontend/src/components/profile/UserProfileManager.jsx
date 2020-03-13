import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { FriendUnfriendButtons } from "../misc";

import logo from "../../assets/imgs/logo.png";

class UserProfileManager extends Component {
  imageSize = 200;

  rowStyle = {
    marginTop: "20px"
  };

  render() {
    return (
      <Container>
        <div style={{ textAlign: "center" }}>
          <Image src={logo} height={this.imageSize} width={this.imageSize} roundedCircle thumbnail />
          <h1 className="display-4">
            {this.props.profile.first_name} {this.props.profile.last_name}
          </h1>
          <h3>{this.props.profile.email}</h3>
          <FriendUnfriendButtons {...this.props} />
        </div>
      </Container>
    );
  }
}

export default UserProfileManager;