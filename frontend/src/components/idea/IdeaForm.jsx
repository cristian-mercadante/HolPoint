import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class IdeaForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" placeholder="Bellissima vacanza a..." defaultValue={this.props.defaultTitle} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control as="textarea" rows="10" defaultValue={this.props.defaultDescription} />
        </Form.Group>
        <Button variant="success" type="submit">
          Invia
        </Button>
      </Form>
    );
  }
}

export default IdeaForm;
