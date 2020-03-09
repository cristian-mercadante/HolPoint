import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import CommentSection from "../comment/CommentSection";
import { IdeaForm } from "../idea";

import { ideaAPI } from "../../server";
import * as alertActions from "../../actions/alerts";
import * as currentUserActions from "../../actions/currentUser";
import axios from "axios";
import { connect } from "react-redux";
import ConfirmModal from "../../containers/ConfirmModal";

class IdeaContent extends Component {
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
    return axios
      .delete(`${ideaAPI}${this.props.id}/`, headers)
      .then(res => {
        this.props.getCurrentUser();
        this.setState({ editing: false });
      })
      .catch(error => {
        this.props.error(error);
        return error;
      });
  };

  onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = form.title.value;
    const description = form.description.value;
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };

    return axios
      .put(
        `${ideaAPI}${this.props.id}/`,
        {
          title,
          description
        },
        headers
      )
      .then(res => {
        this.props.getCurrentUser();
        this.setState({ editing: false });
      })
      .catch(error => {
        this.props.error(error);
        return error;
      });
  };

  isCurrentUser = () => {
    return this.props.currentUsername === this.props.username;
  };

  render() {
    return (
      <Fragment>
        {this.isCurrentUser() ? (
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
        {this.state.editing ? (
          <IdeaForm
            onSubmit={this.onSubmit}
            defaulttitle={this.props.title}
            defaultdescription={this.props.description}
          />
        ) : (
          <Fragment>
            <h3>Descrizione</h3>
            <div className="comment-text-with-newline">{this.props.description}</div>
          </Fragment>
        )}

        <div style={{ marginTop: "10px" }}>
          <CommentSection {...this.props} />
        </div>

        <ConfirmModal show={this.state.showModalDelete} onHide={this.showModalDelete} onClick={this.delete} />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUser: () => dispatch(currentUserActions.getCurrentUser()),
    error: error => dispatch(alertActions.error(error))
  };
};

export default connect(null, mapDispatchToProps)(IdeaContent);
