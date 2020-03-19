import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as currentUserActions from "../../actions/currentUser";

class SettingsUser extends Component {
  state = {
    picture: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const email = form.email.value;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const picture = this.state.picture;
    this.props.putCurrentUser(username, email, first_name, last_name, picture);
  };

  handlePictureChange = e => {
    this.setState({ picture: e.target.files[0] });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" defaultValue={this.props.currentUser.username} />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" defaultValue={this.props.currentUser.email} />
        </Form.Group>
        <Form.Group controlId="first_name">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" defaultValue={this.props.currentUser.first_name} />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Cognome</Form.Label>
          <Form.Control type="text" defaultValue={this.props.currentUser.last_name} />
        </Form.Group>
        <Form.Group controlId="picture">
          <Form.Label>Immagine profilo</Form.Label>
          <Form.Control type="file" accept="image/png, image/jpeg" onChange={this.handlePictureChange} />
        </Form.Group>
        <Button type="submit">Modifica</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putCurrentUser: (username, email, first_name, last_name, picture) =>
      dispatch(currentUserActions.putCurrentUser(username, email, first_name, last_name, picture))
  };
};

export default connect(null, mapDispatchToProps)(SettingsUser);
