import React, { Component } from "react";
import IdeaCard from "./IdeaCard";
import H1 from "../misc/H1";
import { connect } from "react-redux";
import { BLUE } from "../../colors";
import RoundedButton from "../misc/RoundedButton";

class IdeaCardManager extends Component {
  state = { ideas: [] };

  componentDidMount() {
    this.setState({ ideas: this.props.ideas });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.routeParams?.deletedIdeaId !== this.props.routeParams?.deletedIdeaId) {
      const ideaId = this.props.routeParams.deletedIdeaId;
      const ideas = [...this.state.ideas];
      const index = ideas.findIndex((i) => i.id === ideaId);
      if (index > -1) {
        ideas.splice(index, 1);
      }
      this.setState({ ideas });
    } else if (prevProps.routeParams?.idea !== this.props.routeParams?.idea) {
      const idea = this.props.routeParams.idea;
      const ideas = [...this.state.ideas];
      const index = ideas.findIndex((i) => i.id === idea.id);
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
      ideas.forEach((idea) => buffer.push(<IdeaCard key={idea.id} idea={idea} />));
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
          <RoundedButton
            title="CREA IDEA"
            onPress={() => this.props.navigation.navigate("IdeaAdd")}
            backgroundColor={BLUE}
            color="#fff"
          />
        )}
        {this.renderIdeas()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.currentUser.id,
  };
};

export default connect(mapStateToProps)(IdeaCardManager);
