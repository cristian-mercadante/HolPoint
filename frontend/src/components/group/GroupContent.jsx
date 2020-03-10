import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { groupsAPI } from "../../server";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import * as currentUserActions from "../../actions/currentUser";
import GroupForm from "./GroupForm";
import ConfirmModal from "../../containers/ConfirmModal";

class GroupContent extends Component {
  state = {
    editing: false,
    showModalDelete: false
  };

  showModalDelete = () => {
    this.setState({ showModalDelete: !this.state.showModalDelete });
  };

  edit = () => {
    this.setState({ editing: !this.state.editing });
  };

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

  onSubmit = e => {
    e.preventDefault();
    // const form = e.currentTarget;
    // const title = form.title.value;
    // const description = form.description.value;
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
          //TODO:
        },
        headers
      )
      .then(res => {
        //this.props.getCurrentUser();
        this.setState({ editing: false });
      })
      .catch(error => {
        this.props.error(error);
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
            defaulttitle={this.props.title}
            defaultdescription={this.props.description}
          />
        ) : (
          <Fragment>
            <div className="text-with-newline">{this.props.description}</div>
          </Fragment>
        )}
        {this.isCreator() ? (
          <ButtonGroup className="float-right">
            <Button variant="success" onClick={this.edit}>
              {this.state.editing ? "Annulla" : "Modifica"}
            </Button>
            <Button variant="danger" onClick={this.showModalDelete}>
              Elimina
            </Button>
          </ButtonGroup>
        ) : (
          ""
        )}

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
    getCurrentUser: () => dispatch(currentUserActions.getCurrentUser()),
    error: error => dispatch(alertActions.error(error))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupContent));
