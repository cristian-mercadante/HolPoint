import React, { Component } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { GroupCardsManager, GroupCreateButton } from "../components/group";
import Panel from "../containers/Panel";
import { connect } from "react-redux";
import axios from "axios";
import { groupAPI } from "../server";
import * as alertActions from "../actions/alerts";

class HomePage extends Component {
  _isMounted = false;

  state = {
    loading: true,
    groups: [],
  };

  addGroup = (group) => {
    this.setState({ groups: [...this.state.groups, group] });
  };

  getGroups = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    return axios
      .get(`${groupAPI}`, headers)
      .then((res) => {
        if (this._isMounted) this.setState({ loading: false, groups: res.data });
      })
      .catch((error) => {
        this.props.error(error);
      });
  };

  componentDidMount() {
    this._isMounted = true;
    this.getGroups();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Container>
        {this.props.currentUser.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <Panel
            title="Home"
            component={<GroupCardsManager {...this.state} />}
            badge={<GroupCreateButton addGroup={this.addGroup} />}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    error: (error) => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
