import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { DatePicker, TimePicker } from "../misc";
import { KIND_CHOICES } from "./kindChoices";

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
          <Form.Control as="select" defaultValue={this.props.defaultKind}>
            {Object.keys(KIND_CHOICES).map(choice => (
              <option key={choice} value={choice}>
                {KIND_CHOICES[choice].name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="date">
            <Form.Label>Data</Form.Label>
            <br />
            <DatePicker
              selected={this.props.date}
              onChange={date => this.props.setDate(date)}
              minDate={this.props.dateStart}
              maxDate={this.props.dateFinish} // FIXME: not working, somehow...
            />
          </Form.Group>
          <Form.Group as={Col} controlId="time">
            <Form.Label>Ora</Form.Label>
            <br />
            <TimePicker selected={this.props.time} onChange={time => this.props.setTime(time)} />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="url">
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" defaultValue={this.props.defaultUrl} />
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
