import React, { Component, Fragment } from "react";
import { ProgressBar } from "react-bootstrap";
import Comment from "./Comment";
import axios from "axios";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import { commentIdeaAPI, commentActivityAPI } from "../../server";
import AddComment from "./AddComment";

class CommentSection extends Component {
  state = {
    comments: [],
    loading: true
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    const url = this.getCommentUrl();
    return axios
      .get(`${url}${this.props.id}`, headers)
      .then(res => {
        this.setState({ loading: false, comments: res.data });
      })
      .catch(error => {
        this.props.error(error);
      });
  }

  getCommentUrl = () => {
    switch (this.props.kind) {
      case "idea":
        return commentIdeaAPI;
      case "activity":
        return commentActivityAPI;
      default:
        return;
    }
  };

  addComment = commentText => {
    if (commentText === "") return;
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    const url = this.getCommentUrl();
    return axios
      .post(
        url,
        {
          text: commentText,
          to: this.props.id
        },
        headers
      )
      .then(res => {
        this.setState({ comments: [...this.state.comments, res.data] });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  deleteComment = commentId => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    const url = this.getCommentUrl();
    return axios
      .delete(`${url}${commentId}/`, headers)
      .then(res => {
        this.setState({
          comments: this.state.comments.filter(comment => {
            return comment.id !== commentId;
          })
        });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  renderComments = () => {
    let buffer = [];
    if (this.state.comments) {
      this.state.comments.forEach(comment =>
        buffer.push(<Comment {...comment} key={comment.id} deleteComment={this.deleteComment} kind={this.props.kind} />)
      );
    }
    return buffer;
  };

  render() {
    return (
      <Fragment>
        <h3>Commenti</h3>
        <AddComment addComment={this.addComment} kind={this.props.kind} />
        {this.state.loading ? (
          <ProgressBar striped variant="info" now={100} animated />
        ) : (
          <div>{this.renderComments()}</div>
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error))
  };
};

export default connect(null, mapDispatchToProps)(CommentSection);
