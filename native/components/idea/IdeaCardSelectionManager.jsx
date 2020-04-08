import React, { Component } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import IdeaCardSelectable from "./IdeaCardSelectable";
import H1WithButton from "../misc/H1WithButton";
import RoundedButton from "../misc/RoundedButton";
import { GREEN } from "../../colors";

class IdeaCardSelectionManager extends Component {
  state = {
    selectedIdeas: [],
  };

  selectIdea = idea => {
    let selectedIdeas = this.state.selectedIdeas;
    const index = selectedIdeas.findIndex(si => si.id === idea.id);
    if (index > -1) {
      // deselect
      selectedIdeas = selectedIdeas.splice(index, 1);
    } else {
      // select
      selectedIdeas.push(idea);
    }
    this.setState({ selectedIdeas });
  };

  render() {
    const ideasInGroupIds = this.props.ideasInGroup.map(i => i.id);
    const ideasToShow = this.props.ideas.filter(i => !ideasInGroupIds.includes(i.id));
    return (
      <FlatList
        ListHeaderComponent={
          <H1WithButton
            text="Seleziona"
            button={
              <RoundedButton
                title="Invia"
                onPress={() =>
                  this.props.navigation.navigate("GroupDetail", { selectedIdeas: this.state.selectedIdeas })
                }
                backgroundColor={GREEN}
                color="#fff"
              />
            }
          />
        }
        data={ideasToShow}
        renderItem={({ item }) => (
          <IdeaCardSelectable
            idea={item}
            selected={this.state.selectedIdeas.map(si => si.id).includes(item.id)}
            selectIdea={this.selectIdea}
          />
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

export default connect(mapStateToProps)(IdeaCardSelectionManager);
