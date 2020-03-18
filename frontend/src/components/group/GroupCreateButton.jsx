import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import CardModal from "../../containers/CardModal";
import GroupForm from "./GroupForm";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import axios from "axios";
import { groupAPI } from "../../server";
import { dateToString_or_Null, validateDates } from "../../dateUtils";

class GroupCreateButton extends Component {
  state = {
    showCreate: false,
    selectedFriends: [],
    dateStart: null,
    dateFinish: null
  };

  setDateStart = date => this.setState({ dateStart: date });
  setDateFinish = date => this.setState({ dateFinish: date });

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

  postGroup = (name, description, profiles, dateStart, dateFinish) => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .post(
        `${groupAPI}`,
        {
          name,
          description,
          profiles,
          date_start: dateStart,
          date_finish: dateFinish
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
    let { dateStart, dateFinish } = this.state;
    if (!validateDates(dateStart, dateFinish, this.props.addAlert)) return;
    dateStart = dateToString_or_Null(dateStart);
    dateFinish = dateToString_or_Null(dateFinish);
    this.postGroup(name, description, profiles, dateStart, dateFinish);
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
          body={
            <GroupForm
              onSubmit={this.handleSubmit}
              selectFriend={this.selectFriend}
              selectedFriends={this.state.selectedFriends}
              profiles={this.props.currentUser.profile.friends}
              dateStart={this.state.dateStart}
              dateFinish={this.state.dateFinish}
              setDateStart={this.setDateStart}
              setDateFinish={this.setDateFinish}
            />
          }
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
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupCreateButton));
