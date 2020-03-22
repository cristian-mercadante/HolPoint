import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { DatePicker, TimePicker } from "../misc";

export default class ActivityForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Titolo</Form.Label>
          <Form.Control type="text" defaultValue={this.props.defaultTitle} />
        </Form.Group>
        <Form.Group controlId="kind">
          <Form.Label>Tipo</Form.Label>
          <Form.Control as="select">
            <option value="GEN">Generico</option>
            <option value="SPO">Spostamento</option>
            <option value="PER">Pernottamento</option>
            <option value="RIS">Ristorante</option>
            <option value="VIS">Visita</option>
            <option value="ESC">Escursione</option>
            <option value="SVA">Svago</option>
            <option value="ACQ">Acquisti</option>
          </Form.Control>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="date">
            <Form.Label>Data</Form.Label>
            <br />
            <DatePicker selected={this.props.date} onChange={date => this.props.setDate(date)} />
          </Form.Group>
          <Form.Group as={Col} controlId="time">
            <Form.Label>Ora</Form.Label>
            <br />
            <TimePicker selected={this.props.time} onChange={time => this.props.setTime(time)} />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="url">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" defaultValue={this.props.defaultUrlL} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control as="textarea" rows="10" defaultValue={this.props.defaultDescription} />
        </Form.Group>
        <Button varian="warning" type="submit">
          Invia!
        </Button>
      </Form>
    );
  }
}
