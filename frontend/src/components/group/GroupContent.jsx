import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
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
      // we should not display creator inside friend balls
      // because he has the privileges to delete the group
      // and no one else should
      profiles = profiles.filter(profile => profile.id !== this.props.creator.id);
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

  onSubmitDelete = () => {
    this.props.deleteGroup();
    this.setState({ editing: false });
    this.showModalDelete();
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const description = form.description.value;
    const profiles = this.props.selectedFriends;
    this.props.putGroup(name, description, profiles).then(err => {
      if (!err) {
        this.setState({ editing: false });
      }
    });
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

        <ConfirmModal show={this.state.showModalDelete} onHide={this.showModalDelete} onClick={this.onSubmitDelete} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(GroupContent);
