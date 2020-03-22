import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FriendBallsManagerSelect } from "../friend";
import { connect } from "react-redux";
import { DatePicker } from "../misc";

const GroupForm = props => {
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Nome gruppo</Form.Label>
        <Form.Control type="text" defaultValue={props.defaultname} />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="date_start">
            <Form.Label>Data partenza</Form.Label>
            <br />
            <DatePicker selected={props.dateStart} onChange={date => props.setDateStart(date)} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="date_finish">
            <Form.Label>Data ritorno</Form.Label>
            <br />
            <DatePicker selected={props.dateFinish} onChange={date => props.setDateFinish(date)} />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="description">
        <Form.Label>Descrizione</Form.Label>
        <Form.Control as="textarea" rows="10" defaultValue={props.defaultDescription} />
      </Form.Group>
      <h3>Aggiungi amici</h3>
      <FriendBallsManagerSelect
        //friends={props.currentUser.profile.friends}
        friends={props.profiles}
        selectFriend={props.selectFriend}
        selectedFriends={props.selectedFriends}
      />
      <Button type="submit">Invia!</Button>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(GroupForm);
