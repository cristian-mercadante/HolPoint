import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import axios from "axios";
import { commentIdeaAPI, commentActivityAPI } from "../../server";
import H2 from "../misc/H2";
import Comment from "./Comment";
import AddComment from "./AddComment";
import Spinner from "../misc/Spinner";
import { BLUE, GREEN } from "../../colors";

class CommentSection extends Component {
  state = {
    comments: [],
    loading: true,
  };

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

  getComments = () => {
    const headers = { headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` } };
    const url = this.getCommentUrl();
    return axios
      .get(`${url}${this.props.id}`, headers)
      .then(res => this.setState({ loading: false, comments: res.data }))
      .catch(error => this.props.error(error));
  };

  componentDidMount() {
    switch (this.props.kind) {
      case "idea":
        this.props.idea?.id && this.getComments();
        break;
      case "activity":
        this.getComments();
        break;
      default:
        return;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.getComments();
    }
    if (prevProps?.refreshing === false && this.props?.refreshing === true) {
      this.getComments();
    }
  }

  addComment = commentText => {
    if (commentText === "") return;
    const headers = { headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` } };
    const url = this.getCommentUrl();
    return axios
      .post(
        url,
        {
          text: commentText,
          to: this.props.id,
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
    const headers = { headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` } };
    const url = this.getCommentUrl();
    return axios
      .delete(`${url}${commentId}/`, headers)
      .then(res => {
        this.setState({
          comments: this.state.comments.filter(comment => {
            return comment.id !== commentId;
          }),
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
      <>
        <H2 text="Commenti" />
        <AddComment addComment={this.addComment} kind={this.props.kind} />
        {this.state.loading ? (
          <Spinner color={this.props.kind === "idea" ? BLUE : GREEN} />
        ) : (
          <View style={{ paddingHorizontal: 20 }}>{!this.state.loading && this.renderComments()}</View>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);
