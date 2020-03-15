import React, { Component } from "react";
import IdeaCard from "./IdeaCard";

class IdeaCardManager extends Component {
  renderIdeaCards = () => {
    let buffer = [];
    const ideas = this.props.ideas;
    if (ideas) {
      ideas.forEach(i =>
        buffer.push(
          <IdeaCard
            key={i.id}
            {...i}
            deleteIdea={this.props.deleteIdea}
            updateIdeaInState={this.props.updateIdeaInState}
          />
        )
      );
    }
    return buffer;
  };

  render() {
    return <div className="overflow-auto">{this.renderIdeaCards()}</div>;
  }
}

export default IdeaCardManager;
