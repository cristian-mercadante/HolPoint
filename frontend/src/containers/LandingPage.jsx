import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Title from "../components/Title";
import { isAuthenticated } from "../routes";

class LandingPage extends Component {
  divStyle = {
    marginBottom: "20px"
  };

  colProps = {
    xs: "12",
    sm: "12",
    md: "6",
    lg: "6",
    xl: "6"
  };

  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <div style={this.divStyle}>
              <Title fontSize="110px" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col {...this.colProps}>
            <div style={this.divStyle}>{this.props.form()}</div>
          </Col>
          <Col {...this.colProps}>
            <div style={this.divStyle}>
              <h3 className="display-4">Contatta i tuoi amici e organizza splendide vacanze!</h3>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(LandingPage);
