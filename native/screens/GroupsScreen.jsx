import React, { Component } from "react";
import { Button } from "react-native";
import * as colors from "../colors";
import { connect } from "react-redux";
import GroupCardManager from "../components/group/GroupCardManager";
import axios from "axios";
import { groupAPI } from "../server";
import { RED } from "../colors";
import Spinner from "../components/misc/Spinner";

class GroupsScreen extends Component {
  state = {
    loading: true,
    groups: []
  };

  addGroup = group => {
    this.setState({ groups: [...this.state.groups, group] });
  };

  getGroups = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      }
    };
    return axios
      .get(`${groupAPI}`, headers)
      .then(res => {
        this.setState({ loading: false, groups: res.data });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  componentDidMount() {
    this.getGroups();
  }

  render() {
    return (
      <>
        <Button title="Crea gruppo" color={colors.RED} />
        {this.state.loading ? <Spinner color={RED} /> : <GroupCardManager groups={this.state.groups} />}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(GroupsScreen);
