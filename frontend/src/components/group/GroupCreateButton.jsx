import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import CardModal from "../../containers/CardModal";
import GroupForm from "./GroupForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import axios from "axios";
import { groupsAPI } from "../../server";

class GroupCreateButton extends Component {
  state = {
    showCreate: false,
    selectedFriends: []
  };

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

  deselectFriend = id => {
    var array = [...this.state.selectedFriends];
    var index = array.indexOf(id);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selectedFriends: array });
    }
  };

  selectFriend = id => {
    if (this.state.selectedFriends.includes(id)) {
      this.deselectFriend(id);
    } else {
      this.setState({ selectedFriends: [...this.state.selectedFriends, id] });
    }
  };

  showCreate = () => {
    this.setState({ showCreate: !this.state.showCreate });
  };

  postGroup = (name, description, profiles) => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    axios
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
        this.showCreate();
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
      <Fragment>
        <Button variant="danger" onClick={this.showCreate}>
          Crea
        </Button>
        <CardModal
          show={this.state.showCreate}
          onHide={this.showCreate}
          type="group-modal"
          header="Crea gruppo"
          body={<GroupForm onSubmit={this.handleSubmit} selectFriend={this.selectFriend} />}
        />
      </Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupCreateButton));
