import React, { Component, Fragment } from "react";
import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

import CardModal from "../../containers/CardModal";
import ConfirmModal from "../../containers/ConfirmModal";

import "./style.css";
import { IdeaContent } from ".";

import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";

import axios from "axios";
import { ideaAPI } from "../../server";

class IdeaCard extends Component {
  state = {
    showUpdate: false,
    showModalDelete: false,
    editing: false
  };

  showUpdate = () => {
    this.setState({ showUpdate: !this.state.showUpdate });
  };

  showModalDelete = () => {
    this.setState({ showModalDelete: !this.state.showModalDelete });
  };

  showEditFormInModal = () => {
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
      .delete(`${ideaAPI}${this.props.id}/`, headers)
      .then(res => {
        this.props.removeIdea(this.props.id);
        this.setState({ editing: false });
        this.showModalDelete();
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  update = e => {
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

    axios
      .put(
        `${ideaAPI}${this.props.id}/`,
        {
          title,
          description
        },
        headers
      )
      .then(res => {
        this.props.updateIdea(res.data);
        this.setState({ editing: false });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  render() {
    return (
      <Fragment>
        <Card className="idea-card">
          <Card.Header>
            <h4>
              {this.props.title}
              {this.props.currentUsername === this.props.match.params.username ? (
                <Button className="float-right" variant="danger" onClick={this.showModalDelete}>
                  <FaTrashAlt />
                </Button>
              ) : (
                ""
              )}
            </h4>
          </Card.Header>
          <Card.Body className="card-body" onClick={this.showUpdate}>
            {this.props.description}
          </Card.Body>
          <Card.Footer>{this.props.date_creation}</Card.Footer>
        </Card>
        <CardModal
          show={this.state.showUpdate}
          onHide={this.showUpdate}
          type="idea-modal"
          header={this.props.title}
          body={
            <IdeaContent
              {...this.props}
              currentUsername={this.props.currentUsername}
              username={this.props.match.params.username}
              update={this.update}
              showEditFormInModal={this.showEditFormInModal}
              editing={this.state.editing}
            />
          }
          footer={
            <Fragment>
              <span style={{ fontWeight: "bold" }}>{this.props.creator.username}</span>
              <span className="float-right">{this.props.date_creation}</span>
            </Fragment>
          }
        />
        <ConfirmModal show={this.state.showModalDelete} onHide={this.showModalDelete} onClick={this.delete} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUsername: state.currentUser.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IdeaCard));
