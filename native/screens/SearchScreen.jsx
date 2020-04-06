import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { YELLOW } from "../colors";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import axios from "axios";
import { searchAPI } from "../server";

import Spinner from "../components/misc/Spinner";
import FriendProfileListItem from "../components/profile/FriendProfileListItem";
import SearchBox from "../components/misc/SearchBox";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      searchField: "",
    };
    this.timeout = 0;
  }

  doSearch = text => {
    this.setState({ searchField: text, loading: true });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getUsers();
    }, 300);
  };

  isEmptyOrSpaces = str => {
    return str === null || str.match(/^ *$/) !== null;
  };

  getUsers = () => {
    const username = this.state.searchField;
    if (this.isEmptyOrSpaces(username)) {
      this.setState({ loading: false });
      return;
    }
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    };
    return axios
      .get(`${searchAPI}${username}`, headers)
      .then(res => {
        // remove currentUser from results
        let results = res.data.filter(r => r.id !== this.props.currentUserId);
        this.setState({ results, loading: false });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Spinner color={YELLOW} />
          </View>
        ) : (
          <>
            {this.state.results.length === 0 ? (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 17, color: "#777" }}>Nessun risultato</Text>
              </View>
            ) : (
              <View>
                <FlatList
                  data={this.state.results}
                  renderItem={({ item }) => <FriendProfileListItem friend={item} />}
                  keyExtractor={item => String(item.id)}
                />
              </View>
            )}
          </>
        )}
        <SearchBox searchField={this.state.searchField} doSearch={this.doSearch} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentUserId: state.currentUser.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
