import React, { Component } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

class GroupCard extends Component {
  render() {
    return (
      <Col {...this.props.colStyle}>
        <Card {...this.props.cardStyle}>
          <Card.Header>Titolo</Card.Header>
          <Card.Body>Contenuto</Card.Body>
          <Card.Footer>Partecipanti</Card.Footer>
        </Card>
      </Col>
    );
  }
}

export class EmptyGroupCard extends GroupCard {
  render() {
    return (
      <Col {...this.props.colStyle}>
        <Button as={Card} {...this.props.emptyCardStyle}>
          <FaPlus />
        </Button>
      </Col>
    );
  }
}

export default GroupCard;
