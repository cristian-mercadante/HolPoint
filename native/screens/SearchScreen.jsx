import React, { Component } from "react";
import { View, TextInput, KeyboardAvoidingView, StyleSheet, FlatList, Text } from "react-native";
import { DARK_YELLOW, YELLOW } from "../colors";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import axios from "axios";
import { searchAPI } from "../server";

import Spinner from "../components/misc/Spinner";
import FriendProfileListItem from "../components/profile/FriendProfileListItem";

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

  setSearchField = (text) => this.setState({ searchField: text });

  doSearch = (text) => {
    this.setState({ searchField: text, loading: true });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getUsers();
    }, 300);
  };

  isEmptyOrSpaces = (str) => {
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
      .then((res) => {
        // remove currentUser from results
        let results = res.data.filter((r) => r.id !== this.props.currentUserId);
        this.setState({ results, loading: false });
      })
      .catch((error) => {
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
                  keyExtractor={(item) => item.id}
                />
              </View>
            )}
          </>
        )}
        <View style={styles.container} behavior="position">
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              style={styles.searchField}
              onChangeText={(text) => this.doSearch(text)}
              value={this.state.searchField}
              placeholder="Cerca username..."
              placeholderTextColor="#777"
            />
          </KeyboardAvoidingView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  searchField: {
    margin: 10,
    fontSize: 17,
    padding: 10,
    borderColor: DARK_YELLOW,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    currentUserId: state.currentUser.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    error: (error) => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
