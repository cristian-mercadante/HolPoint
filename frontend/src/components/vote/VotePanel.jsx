import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import { voteAPI } from "../../server";
import { VoteOverlay } from ".";
import "./style.css";

class VotePanel extends Component {
  state = {
    gti: {}
  };

  componentDidMount() {
    this.setState({ gti: this.props.gti });
  }

  hasCurrentUserVotedThisIdea = () => {
    const userId = this.props.currentUser.id;
    if (this.state.gti.votes) {
      return Boolean(this.state.gti.votes.map(user => user.id).find(id => id === userId));
    } else return false;
  };

  vote = (group_id, idea_id) => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .post(`${voteAPI}${group_id}/${idea_id}`, {}, headers)
      .then(res => {
        this.setState({ gti: res.data });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  render() {
    return (
      <div style={{ marginBottom: "20px" }}>
        <div className="vote-panel">
          <VoteOverlay votes={this.state.gti.votes}>
            <h4 style={{ margin: "auto", textAlign: "center" }}>
              Voti: {this.state.gti.votes && this.state.gti.votes.length}
            </h4>
          </VoteOverlay>

          <Button
            style={{ width: "100px" }}
            variant={this.hasCurrentUserVotedThisIdea() ? "warning" : "success"}
            onClick={() => {
              this.vote(this.state.gti.group, this.state.gti.idea);
            }}
          >
            {this.hasCurrentUserVotedThisIdea() ? "Rimuovi" : "Vota"}
          </Button>
        </div>
        <div>{this.props.ideaCard}</div>
      </div>
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
    error: error => dispatch(alertActions.error(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VotePanel);
