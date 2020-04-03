import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import IdeaCardManager from "../idea/IdeaCardManager";
import ProfilePicture from "./ProfilePicture";
import { BLUE } from "../../colors";

export default class ProfileView extends Component {
  state = {
    refreshing: false
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
        <View style={{ alignItems: "center" }}>
          <Button
            title="Amici"
            onPress={() =>
              this.props.navigation.navigate("Amici", {
                friends: this.props.profile.profile.friends
              })
            }
            color={BLUE}
          />
        </View>
        <IdeaCardManager
          userId={this.props.profile.id}
          ideas={this.props.profile.profile.ideas}
          navigation={this.props.navigation}
          routeParams={this.props.routeParams}
        />
      </>
    );
  }
}