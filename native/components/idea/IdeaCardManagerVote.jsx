import React, { Component } from "react";
import IdeaCard from "./IdeaCard";
import { connect } from "react-redux";
import { BLUE } from "../../colors";
import RoundedButton from "../misc/RoundedButton";
import H1WithButton from "../misc/H1WithButton";
import { FlatList } from "react-native-gesture-handler";
import IdeaCardVote from "./IdeaCardVote";

class IdeaCardManagerVote extends Component {
  state = { ideas: [] };

  componentDidMount() {
    this.setState({ ideas: this.props.ideas });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.routeParams?.deletedIdeaId !== this.props.routeParams?.deletedIdeaId) {
      const ideaId = this.props.routeParams.deletedIdeaId;
      const ideas = [...this.state.ideas];
      const index = ideas.findIndex(i => i.id === ideaId);
      if (index > -1) {
        ideas.splice(index, 1);
      }
      this.setState({ ideas });
    } else if (prevProps.routeParams?.idea !== this.props.routeParams?.idea) {
      const idea = this.props.routeParams.idea;
      const ideas = [...this.state.ideas];
      const index = ideas.findIndex(i => i.id === idea.id);
      if (index > -1) {
        // update idea
        ideas[index] = idea;
      } else {
        // add idea
        ideas.push(idea);
      }
      this.setState({ ideas });
    }
  }

  render() {
    const currentUserId = this.props.currentUserId;
    const ideas = this.state.ideas;

    return (
      <FlatList
        ListHeaderComponent={
          <H1WithButton
            text="Idee"
            button={
              currentUserId === this.props.userId && (
                <>
                  <RoundedButton
                    title="Crea"
                    onPress={() => this.props.navigation.navigate("IdeaAdd", { fromScreen: this.props.fromScreen })}
                    backgroundColor={BLUE}
                    color="#fff"
                  />
                  {this.props.fromScreen === "GroupDetail" && (
                    <RoundedButton
                      title="Seleziona"
                      onPress={() =>
                        this.props.navigation.navigate("GroupIdeaSelect", { ideasInGroup: ideas, mode: "multi" })
                      }
                      backgroundColor={BLUE}
                      color="#fff"
                    />
                  )}
                </>
              )
            }
          />
        }
        data={ideas}
        renderItem={({ item }) => (
          <IdeaCardVote
            idea={item}
            fromScreen={this.props.fromScreen}
            group_to_idea={this.props.group_to_idea}
            updateVotes={this.props.updateVotes}
            navigation={this.props.navigation}
          />
        )}
        keyExtractor={item => String(item.id)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
  };
};

export default connect(mapStateToProps)(IdeaCardManagerVote);
