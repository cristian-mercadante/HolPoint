import React from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import FriendProfileListItem from "../components/profile/FriendProfileListItem";

const FriendListScreen = props => {
  return (
    <View>
      <FlatList
        data={props.route.params.friends}
        renderItem={({ item }) => <FriendProfileListItem friend={item} navigation={props.navigation} />}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(FriendListScreen);
