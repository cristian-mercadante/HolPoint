import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { groupsAPI } from "../../server";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import GroupForm from "./GroupForm";
import ConfirmModal from "../../containers/ConfirmModal";

class GroupContent extends Component {
  state = {
    editing: false,
    showModalDelete: false,
    profiles: []
  };

  showModalDelete = () => {
    this.setState({ showModalDelete: !this.state.showModalDelete });
  };

  edit = () => {
    this.setState({ editing: !this.state.editing });
  };

  addProfileToListNoDuplicates = () => {
    if (!this.props.currentUser.loading) {
      let friends = this.props.currentUser.profile.friends;
      let profiles = [];
      if (friends) {
        const friendIds = friends.map(friend => friend.id);
        const notFriends = this.props.profiles.filter(profile => {
          return !friendIds.includes(profile.id);
        });
        profiles = friends.concat(notFriends);
      } else {
        profiles = friends;
      }
      this.setState({ profiles: profiles });
    }
  };

  componentDidMount() {
    this.addProfileToListNoDuplicates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentUser.id !== this.props.currentUser.id) {
      this.addProfileToListNoDuplicates();
    }
  }

  delete = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    axios
      .delete(`${groupsAPI}${this.props.id}/`, headers)
      .then(res => {
        this.setState({ editing: false });
        this.showModalDelete();
        this.props.history.push("/home");
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  isCurrentUserAPartecipant = group => {
    let found = group.profiles.find(profile => {
      return profile.id === this.props.currentUser.id;
    });
    return Boolean(found);
  };

  putGroup = (name, description, profiles) => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    axios
      .put(
        `${groupsAPI}${this.props.id}/`,
        {
          name,
          description,
          profiles
        },
        headers
      )
      .then(res => {
        this.props.updateGroup(res.data);
        this.setState({ editing: false });
        // checking if a user deleted himself from the group
        if (!this.isCurrentUserAPartecipant(res.data)) {
          this.props.addAlert(`Non fai più parte del gruppo ${this.props.name}.`, "warning");
          this.props.history.push("/home");
        }
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const description = form.description.value;
    const profiles = this.props.selectedFriends;
    this.putGroup(name, description, profiles);
  };

  isCreator = () => {
    return this.props.currentUser.id === this.props.creator.id;
  };

  render() {
    return (
      <Fragment>
        {this.state.editing ? (
          <GroupForm
            onSubmit={this.onSubmit}
            defaultname={this.props.name}
            defaultdescription={this.props.description}
            profiles={this.state.profiles} // concatenation of user friends and users in group (not friends)
            selectFriend={this.props.selectFriend}
            selectedFriends={this.props.selectedFriends}
          />
        ) : (
          <Fragment>
            <div className="text-with-newline">{this.props.description}</div>
          </Fragment>
        )}
        <ButtonGroup className="float-right">
          <Button variant="success" onClick={this.edit}>
            {this.state.editing ? "Annulla" : "Modifica"}
          </Button>
          {this.isCreator() ? (
            <Button variant="danger" onClick={this.showModalDelete}>
              Elimina
            </Button>
          ) : (
            ""
          )}
        </ButtonGroup>

        <ConfirmModal show={this.state.showModalDelete} onHide={this.showModalDelete} onClick={this.delete} />
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
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupContent));
