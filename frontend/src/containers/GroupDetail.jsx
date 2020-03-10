import React, { Component, Fragment } from "react";
import { ProgressBar, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Panel from "./Panel";

import axios from "axios";
import { groupsAPI } from "../server";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import { GroupContent } from "../components/group";
import { IdeaCardManager } from "../components/idea";

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
    axios
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
          <Fragment>
            <Panel title={this.state.group.name} component={<GroupContent {...this.state.group} />} />
            <Panel title="Idee proposte" component={<IdeaCardManager ideas={this.state.group.ideas} />} />
          </Fragment>
        )}
      </Container>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupDetail));
