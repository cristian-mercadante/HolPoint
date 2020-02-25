import React, { Component } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { FaUserFriends } from "react-icons/fa";

import logo from "../assets/imgs/logo.png";

class UserProfileManager extends Component {
  imageSize = 200;

  rowStyle = {
    marginTop: "20px"
  };

  render() {
    return (
      <Container>
        <Row style={this.rowStyle}>
          <Col style={{ textAlign: "center" }}>
            <Image src={logo} height={this.imageSize} width={this.imageSize} roundedCircle thumbnail />
          </Col>
          <Col>
            <h1 className="display-4">
              {this.props.profile.first_name} {this.props.profile.last_name}
            </h1>
            <Button variant="success">
              <FaUserFriends /> Invia richiesta di amicizia
            </Button>
            <Button variant="danger">
              <FaUserFriends /> Rimuovi dagli amici
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserProfileManager;
