import React from "react";
import { View, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import FriendProfileListItem from "../components/profile/FriendProfileListItem";

const FriendListScreen = (props) => {
  return (
    <>
      {props.route.params.friends.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 20, color: "#777" }}>Non ci sono amici</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={props.route.params.friends}
            renderItem={({ item }) => <FriendProfileListItem friend={item} />}
            keyExtractor={(item) => `${item.id}`}
          />
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(FriendListScreen);
