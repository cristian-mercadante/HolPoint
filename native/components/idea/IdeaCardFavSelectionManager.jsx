import React, { Component } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import IdeaCardSelectable from "./IdeaCardSelectable";
import H1WithButton from "../misc/H1WithButton";
import RoundedButton from "../misc/RoundedButton";
import { GREEN } from "../../colors";

class IdeaCardFavSelectionManager extends Component {
  state = {
    favIdea: null,
  };

  selectIdea = idea => {
    if (this.state.favIdea?.id === idea.id) {
      this.setState({ favIdea: null });
      return;
    }
    this.setState({ favIdea: idea });
  };

  render() {
    return (
      <FlatList
        ListHeaderComponent={
          <H1WithButton
            text="Seleziona"
            button={
              <RoundedButton
                title="Invia"
                onPress={() => this.props.navigation.navigate("GroupDetail", { favIdea: this.state.favIdea })}
                backgroundColor={GREEN}
                color="#fff"
              />
            }
          />
        }
        data={this.props.ideasInGroup}
        renderItem={({ item }) => (
          <IdeaCardSelectable idea={item} selected={this.state.favIdea?.id === item.id} selectIdea={this.selectIdea} />
        )}
        keyExtractor={item => String(item.id)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ideas: state.currentUser.profile.ideas,
  };
};

export default connect(mapStateToProps)(IdeaCardFavSelectionManager);
