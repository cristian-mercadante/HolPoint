import React, { Component } from "react";
import { FlatList } from "react-native-gesture-handler";
import FriendProfileListItem from "../components/profile/FriendProfileListItem";
import SearchBox from "../components/misc/SearchBox";
import RoundedButton from "../components/misc/RoundedButton";
import { GREEN } from "../colors";

class GroupAddFriendScreen extends Component {
  state = {
    friends: [],
    selectedFriends: [],
    searchField: "",
  };

  componentDidMount() {
    const { friends, selectedFriends } = this.props.route.params;
    this.setState({ friends, selectedFriends });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedFriends !== this.props.route.params.selectedFriends) {
      const selectedFriends = this.props.route.params.selectedFriends;
      this.setState({ selectedFriends });
    }
  }

  deselectFriend = friend => {
    let selectedFriends = this.state.selectedFriends;
    const index = selectedFriends.map(sf => sf.id).indexOf(friend.id);
    if (index !== -1) {
      selectedFriends.splice(index, 1);
      this.setState({ selectedFriends });
    }
  };

  selectFriend = friend => {
    let selectedFriends = this.state.selectedFriends;
    if (selectedFriends.map(sf => sf.id).includes(friend.id)) {
      this.deselectFriend(friend);
    } else {
      selectedFriends.push(friend);
      this.setState({ selectedFriends });
    }
  };

  doSearch = text => {
    this.setState({ searchField: text });
    const searchedFriend = String(text).toLowerCase();
    const friends = this.props.route.params.friends.filter(
      friend =>
        String(friend.username).toLowerCase().includes(searchedFriend) || this.state.selectedFriends.includes(friend.id)
    );
    this.setState({ friends });
  };

  render() {
    const { friends } = this.state;
    return (
      <>
        <FlatList
          ListHeaderComponent={
            <RoundedButton
              title="Conferma"
              color="#fff"
              backgroundColor={GREEN}
              onPress={() =>
                this.props.navigation.navigate(this.props.route.params.fromScreen, {
                  selectedFriends: this.state.selectedFriends,
                })
              }
            />
          }
          data={friends}
          renderItem={({ item }) => (
            <FriendProfileListItem
              friend={item}
              selectable={true}
              selected={this.state.selectedFriends.map(sf => sf.id).includes(item.id)}
              selectFriend={this.selectFriend}
            />
          )}
          keyExtractor={item => String(item.id)}
        />
        <SearchBox searchField={this.state.searchField} doSearch={this.doSearch} />
      </>
    );
  }
}

export default GroupAddFriendScreen;
