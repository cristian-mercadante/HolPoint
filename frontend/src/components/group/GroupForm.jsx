import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { FriendBallsManagerSelect } from "../friend";
import { connect } from "react-redux";

class GroupForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nome gruppo</Form.Label>
          <Form.Control type="text" placeholder="Super-mega-vacanza" />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control as="textarea" rows="5" />
        </Form.Group>
        <h3>Aggiungi amici</h3>
        <FriendBallsManagerSelect
          //friends={this.props.currentUser.profile.friends}
          friends={this.props.profiles}
          selectFriend={this.props.selectFriend}
          selectedFriends={this.props.selectedFriends}
        />
        <Button type="submit">Invia!</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(GroupForm);
