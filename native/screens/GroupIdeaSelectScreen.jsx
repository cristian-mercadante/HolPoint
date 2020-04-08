import React, { Component } from "react";
import { Text, View } from "react-native";
import IdeaCardSelectionManager from "../components/idea/IdeaCardSelectionManager";

class GroupIdeaSelectScreen extends Component {
  render() {
    return (
      <IdeaCardSelectionManager
        navigation={this.props.navigation}
        ideasInGroup={this.props.route.params.ideasInGroup}
      />
    );
  }
}

export default GroupIdeaSelectScreen;
