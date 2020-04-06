import React, { Component } from "react";
import { RefreshControl } from "react-native";
import GroupCard from "./GroupCard";
import H1WithButton from "../misc/H1WithButton";
import RoundedButton from "../misc/RoundedButton";
import { FlatList } from "react-native-gesture-handler";
import { RED } from "../../colors";
import axios from "axios";
import { groupAPI } from "../../server";
import { connect } from "react-redux";
import Spinner from "../misc/Spinner";
import * as alertActions from "../../actions/alerts";

class GroupCardManager extends Component {
  state = {
    loading: true,
    groups: [],
    refreshing: false,
  };

  addGroup = group => {
    this.setState({ groups: [...this.state.groups, group] });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.routeParams?.deletedGroupId !== this.props.routeParams?.deletedGroupId) {
      const groupId = this.props.routeParams.deletedGroupId;
      const groups = [...this.state.groups];
      const index = groups.findIndex(g => g.id === groupId);
      if (index > -1) {
        groups.splice(index, 1);
      }
      this.setState({ groups });
    } else if (prevProps.routeParams?.group !== this.props.routeParams?.group) {
      const group = this.props.routeParams.group;
      const groups = [...this.state.groups];
      const index = groups.findIndex(g => g.id === group.id);
      if (index > -1) {
        // update group
        groups[index] = group;
      } else {
        // add group
        groups.push(group);
      }
      this.setState({ groups });
    }
  }

  getGroups = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
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

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getGroups()
      .then(() => this.setState({ refreshing: false }))
      .catch(error => {
        this.props.error(error);
        this.setState({ refreshing: false });
      });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Spinner color={RED} />
        ) : (
          <FlatList
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
            ListHeaderComponent={
              <H1WithButton
                text="Gruppi"
                button={
                  <RoundedButton
                    title="Crea"
                    color="#fff"
                    backgroundColor={RED}
                    onPress={() => this.props.navigation.navigate("GroupAdd")}
                  />
                }
              />
            }
            data={this.state.groups}
            renderItem={({ item }) => <GroupCard group={item} />}
            keyExtractor={item => String(item.id)}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupCardManager);
