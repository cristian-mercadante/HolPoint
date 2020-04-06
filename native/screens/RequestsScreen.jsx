import React, { Component } from "react";
import { View, Text, Button, FlatList, RefreshControl } from "react-native";
import { connect } from "react-redux";
import * as friendRequestActions from "../actions/friendRequest";
import RequestListItem from "../components/friend_request/RequestListItem";
import { ScrollView } from "react-native-gesture-handler";

class RequestsScreen extends Component {
  state = {
    loading: false,
    receivedRequests: [],
  };

  updateRrInState = () => {
    if (this.props.friendRequests.receivedRequests)
      this.setState({ receivedRequests: this.props.friendRequests.receivedRequests, loading: false });
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.updateRrInState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.friendRequests !== this.props.friendRequests) {
      this.setState({ loading: this.props.friendRequests.loading });
      this.updateRrInState();
    }
  }

  updateList = () => {
    this.setState({ loading: true });
    this.props.loadRequests().then(this.setState({ loading: false }));
  };

  render() {
    return (
      <>
        {this.state.receivedRequests.length === 0 ? (
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.updateList} />}>
            <Text style={{ textAlign: "center", marginTop: 100, fontSize: 20, color: "#777" }}>
              Non ci sono richieste
            </Text>
          </ScrollView>
        ) : (
          <FlatList
            data={this.state.receivedRequests}
            renderItem={({ item }) => <RequestListItem friend={item.sender} request={item} />}
            keyExtractor={(item) => String(item.id)}
            refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.updateList} />}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendRequests: state.friendRequest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRequests: () => dispatch(friendRequestActions.loadRequests()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsScreen);
