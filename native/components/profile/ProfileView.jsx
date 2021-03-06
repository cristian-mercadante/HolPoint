import React, { Component } from "react";
import { Text, View } from "react-native";
import IdeaCardManager from "../idea/IdeaCardManager";
import ProfilePicture from "./ProfilePicture";
import { BLUE, YELLOW } from "../../colors";
import FriendUnfriendButtons from "../friend_request/FriendUnfriendButtons";
import RoundedButton from "../misc/RoundedButton";

export default class ProfileView extends Component {
  state = {
    refreshing: false,
  };

  render() {
    return (
      <>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <ProfilePicture size={100} source={this.props.profile.profile.picture} />
          <Text style={{ flex: 1, fontSize: 30, flexWrap: "wrap", alignSelf: "center" }}>
            {this.props.profile.first_name}
            {"\n"}
            {this.props.profile.last_name}
          </Text>
        </View>
        <FriendUnfriendButtons {...this.props} />
        <RoundedButton
          onPress={() =>
            this.props.navigation.navigate("Amici", {
              friends: this.props.profile.profile.friends,
            })
          }
          backgroundColor={YELLOW}
          color="#000"
          title="AMICI"
        />
        <IdeaCardManager
          userId={this.props.profile.id}
          ideas={this.props.profile.profile.ideas}
          navigation={this.props.navigation}
          routeParams={this.props.routeParams}
          fromScreen="Profilo"
        />
      </>
    );
  }
}
