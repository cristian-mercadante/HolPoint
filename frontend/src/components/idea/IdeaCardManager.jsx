import React, { Component } from "react";
import IdeaCard from "./IdeaCard";
import { CardColumns } from "react-bootstrap";

class IdeaCardManager extends Component {
  renderIdeaCards = () => {
    let buffer = [];
    const ideas = this.props.ideas;
    if (ideas) {
      ideas.forEach(i => buffer.push(<IdeaCard key={i.id} {...i} />));
    }
    return buffer;
  };

  render() {
    return <CardColumns style={{ WebkitColumnCount: "2" }}>{this.renderIdeaCards()}</CardColumns>;
  }
}

export default IdeaCardManager;
