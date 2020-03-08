import React, { Component } from "react";
import { Form, ProgressBar, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FriendBallsManagerSelect } from "../friend";
import Panel from "../../containers/Panel";
import { connect } from "react-redux";
import * as groupActions from "../../actions/group";
import * as alertActions from "../../actions/alerts";

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

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const description = form.description.value;
    const profiles = this.state.selectedFriends;
    this.props.postGroup(name, description, profiles).then(err => {
      if (!err) {
        this.props.removeAllAlerts();
        this.props.history.push("/home");
      }
    });
  };

  render() {
    return (
      <Form style={{ marginTop: "20px" }} onSubmit={this.handleSubmit}>
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
          <Panel
            title="Aggiungi amici"
            component={
              <FriendBallsManagerSelect
                friends={this.props.currentUser.profile.friends}
                selectFriend={this.selectFriend}
              />
            }
          />
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
    postGroup: (name, description, profiles) => dispatch(groupActions.postGroup(name, description, profiles)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupCreateForm));
