import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { FriendUnfriendButtons } from "../friend_request";

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
          <Image
            src={this.props.profile.profile.picture ? this.props.profile.profile.picture : logo}
            className="profile-pic-big"
          />
          <h1 className="display-4">
            {this.props.profile.first_name} {this.props.profile.last_name}
          </h1>
          <FriendUnfriendButtons {...this.props} />
        </div>
      </Container>
    );
  }
}

export default UserProfileManager;
