import React, { Component } from "react";
import { Button, ProgressBar, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Panel from "./Panel";

import axios from "axios";
import { groupsAPI } from "../server";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";

class GroupDetail extends Component {
  state = {
    loading: true,
    group: {}
  };

  getGroup = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    const id = this.props.match.params.id;
    return axios
      .get(`${groupsAPI}${id}/`, headers)
      .then(res => {
        this.setState({ loading: false, group: res.data });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  componentDidMount() {
    this.getGroup();
  }

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Panel
            title={this.state.group.name}
            badge={
              <LinkContainer to={`/group/${this.state.group.id}/edit`}>
                <Button variant="warning">Modifica</Button>
              </LinkContainer>
            }
          />
        )}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(GroupDetail));
