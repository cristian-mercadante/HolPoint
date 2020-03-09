import React, { Component, Fragment } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import CommentSection from "../../containers/CommentSection";
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

  descriptionColProps = { xs: "12", sm: "12", md: "8", lg: "8", xl: "8" };
  commentsColProps = { xs: "12", sm: "12", md: "4", lg: "4", xl: "4" };

  showModalDelete = () => {
    this.setState({ showModalDelete: !this.state.showModalDelete });
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

  edit = () => {
    this.setState({ editing: true });
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

  render() {
    return (
      <Fragment>
        <Row>
          <Col {...this.descriptionColProps}>
            {!this.state.editing ? (
              <Fragment>
                <ButtonGroup>
                  <Button variant="warning" onClick={this.edit}>
                    Modifica
                  </Button>
                  <Button variant="danger" onClick={this.showModalDelete}>
                    Elimina
                  </Button>
                </ButtonGroup>
                <div>{this.props.description}</div>
              </Fragment>
            ) : (
              <Fragment>
                <IdeaForm
                  onSubmit={this.onSubmit}
                  defaulttitle={this.props.title}
                  defaultdescription={this.props.description}
                />
              </Fragment>
            )}
          </Col>
          <Col {...this.commentsColProps}>
            <CommentSection />
          </Col>
        </Row>
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
