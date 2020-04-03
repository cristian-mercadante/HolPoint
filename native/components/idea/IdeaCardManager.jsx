import React, { Component } from "react";
import { View, Button } from "react-native";
import IdeaCard from "./IdeaCard";
import H1 from "../misc/H1";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { BLUE } from "../../colors";

class IdeaCardManager extends Component {
  state = { ideas: [] };

  componentDidMount() {
    this.setState({ ideas: this.props.ideas });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.routeParams !== this.props.routeParams) {
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

  renderIdeas = () => {
    let buffer = [];
    const ideas = this.state.ideas;
    if (ideas) {
      ideas.forEach(idea => buffer.push(<IdeaCard key={idea.id} idea={idea} />));
    }
    return buffer;
  };

  render() {
    const currentUserId = this.props.currentUserId;
    const ideas = this.state.ideas;

    return (
      <>
        <H1 text="Idee" />
        {currentUserId === this.props.userId && (
          <Button title="Crea idea" onPress={() => this.props.navigation.navigate("IdeaAdd")} color={BLUE} />
        )}
        {this.renderIdeas()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id
  };
};

export default connect(mapStateToProps)(IdeaCardManager);
