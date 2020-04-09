import React, { Component } from "react";
import { Text, View } from "react-native";
import IdeaCardSelectionManager from "../components/idea/IdeaCardSelectionManager";
import IdeaCardFavSelectionManager from "../components/idea/IdeaCardFavSelectionManager";

class GroupIdeaSelectScreen extends Component {
  render() {
    return (
      <>
        {this.props.route.params.mode === "multi" ? (
          <IdeaCardSelectionManager
            navigation={this.props.navigation}
            ideasInGroup={this.props.route.params.ideasInGroup}
          />
        ) : (
          <IdeaCardFavSelectionManager
            navigation={this.props.navigation}
            ideasInGroup={this.props.route.params.ideasInGroup}
          />
        )}
      </>
    );
  }
}

export default GroupIdeaSelectScreen;
