import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import { GroupForm, GroupPreview } from ".";
import { IdeaListForm } from "../idea";
import ConfirmModal from "../../containers/ConfirmModal";
import CardModal from "../../containers/CardModal";

import { dateToString_or_Null, validateDates } from "../../dateUtils";

class GroupContent extends Component {
  state = {
    editing: false,
    showModalDelete: false,
    showModalFavIdea: false,
    profiles: [],
  };

  showModalDelete = () => {
    this.setState({ showModalDelete: !this.state.showModalDelete });
  };

  showModalFavIdea = () => {
    this.setState({ showModalFavIdea: !this.state.showModalFavIdea });
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
    this.props.deleteGroup();
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
    const ideaIds = this.props.ideas.map(idea => idea.id);
    this.props.putGroup(name, description, profiles, ideaIds, dateStart, dateFinish).then(err => {
      if (!err) {
        this.setState({ editing: false });
      }
    });
  };

  isCreator = () => {
    return this.props.currentUser.id === this.props.creator.id;
  };

  selectFavIdea = e => {
    e.preventDefault();
    let checkedIdea = document.querySelector("input[name=ideas]:checked");
    if (checkedIdea) {
      this.props.putFavIdea(checkedIdea.id).then(() => {
        this.showModalFavIdea();
        this.props.removeAllAlerts();
      });
    } else {
      this.props.addAlert("Nessuna idea selezionata", "warning");
    }
  };

  render() {
    return (
      <Fragment>
        <ButtonGroup className="float-right">
          <Button variant="warning" onClick={this.edit}>
            {this.state.editing ? "Annulla" : "Modifica"}
          </Button>
          {this.isCreator() && (
            <Fragment>
              <Button variant="success" onClick={this.showModalFavIdea}>
                Seleziona idea preferita
              </Button>
              <Button variant="danger" onClick={this.showModalDelete}>
                Elimina
              </Button>
            </Fragment>
          )}
        </ButtonGroup>

        {this.state.editing ? (
          <GroupForm
            onSubmit={this.onSubmit}
            defaultname={this.props.name}
            defaultDescription={this.props.description}
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
        <CardModal
          show={this.state.showModalFavIdea}
          type="idea-modal"
          header="Seleziona idea preferita"
          onHide={this.showModalFavIdea}
          body={<IdeaListForm onSubmit={this.selectFavIdea} ideas={this.props.ideas} type="radio" />}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupContent);
