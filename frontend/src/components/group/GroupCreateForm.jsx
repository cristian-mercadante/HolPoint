import React, { Component, Fragment } from "react";
import { Form, ProgressBar, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FriendBallsManagerSelect } from "../friend";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import axios from "axios";
import { groupsAPI } from "../../server";

class GroupCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFriends: []
    };
  }

  componentDidMount() {
    if (!this.props.currentUser.loading) {
      this.setState({ selectedFriends: [this.props.currentUser.id] });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentUser.id !== this.props.currentUser.id) {
      this.setState({ selectedFriends: [...this.state.selectedFriends, this.props.currentUser.id] });
    }
  }

  deselect = id => {
    var array = [...this.state.selectedFriends];
    var index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selectedFriends: array });
    }
  };

  selectFriend = id => {
    if (this.state.selectedFriends.includes(id)) {
      this.deselect(id);
    } else {
      this.setState({ selectedFriends: [...this.state.selectedFriends, id] });
    }
  };

  postGroup = (name, description, profiles) => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .post(
        `${groupsAPI}`,
        {
          name,
          description,
          profiles
        },
        headers
      )
      .then(res => {
        this.props.addGroup(res.data);
        this.props.onHide();
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const description = form.description.value;
    const profiles = this.state.selectedFriends;
    this.postGroup(name, description, profiles);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nome gruppo</Form.Label>
          <Form.Control type="text" placeholder="Super-mega-vacanza" />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control as="textarea" rows="5" />
        </Form.Group>
        {this.props.currentUser.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Fragment>
            <h3>Aggiungi amici</h3>
            <FriendBallsManagerSelect
              friends={this.props.currentUser.profile.friends}
              selectFriend={this.selectFriend}
            />
          </Fragment>
        )}
        <Button type="submit">Crea!</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupCreateForm));
