import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import GroupForm from "./GroupForm";
import ConfirmModal from "../../containers/ConfirmModal";

import { dateToString_or_Null, validateDates } from "../../dateUtils";
import GroupPreview from "./GroupPreview";

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
    window.scrollTo(0, 0); // scroll top
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
    this.props.deleteGroup().then(() => {
      this.setState({ editing: false });
      this.showModalDelete();
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const description = form.description.value;
    const profiles = this.props.selectedFriends;
    let { dateStart, dateFinish } = this.props;
    if (!validateDates(dateStart, dateFinish, this.props.addAlert)) return;
    dateStart = dateToString_or_Null(dateStart);
    dateFinish = dateToString_or_Null(dateFinish);
    this.props.putGroup(name, description, profiles, [], dateStart, dateFinish).then(err => {
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
        <ButtonGroup className="float-right">
          <Button variant="success" onClick={this.edit}>
            {this.state.editing ? "Annulla" : "Modifica"}
          </Button>
          {this.isCreator() && (
            <Button variant="danger" onClick={this.showModalDelete}>
              Elimina
            </Button>
          )}
        </ButtonGroup>

        {this.state.editing ? (
          <GroupForm
            onSubmit={this.onSubmit}
            defaultname={this.props.name}
            defaultdescription={this.props.description}
            profiles={this.state.profiles} // concatenation of user friends and users in group (not friends)
            selectFriend={this.props.selectFriend}
            selectedFriends={this.props.selectedFriends}
            dateStart={this.props.dateStart}
            dateFinish={this.props.dateFinish}
            setDateStart={this.props.setDateStart}
            setDateFinish={this.props.setDateFinish}
          />
        ) : (
          <GroupPreview {...this.props} />
        )}

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

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupContent);
