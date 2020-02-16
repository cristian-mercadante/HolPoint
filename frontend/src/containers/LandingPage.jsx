import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Title from "../components/Title";

class LandingPage extends Component {
  state = {
    login: true
  };

  divStyle = {
    marginTop: "20px",
    marginBottom: "20px"
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <div style={this.divStyle}>
              <Title fontSize="120px" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div style={this.divStyle}>{this.props.form()}</div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div style={this.divStyle}>
              <h3 className="display-4">Contatta i tuoi amici e organizza splendide vacanze!</h3>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LandingPage;
