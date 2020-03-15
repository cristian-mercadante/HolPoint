import React, { Component } from "react";
import IdeaCard from "./IdeaCard";
import { Row, Col } from "react-bootstrap";
import { VotePanel } from "../vote";

class IdeaCardManagerVote extends Component {
  colProps = { xs: "12", sm: "12", md: "6", lg: "6", xl: "4" };

  renderIdeaCards = () => {
    let buffer = [];
    const { ideas, group_to_idea } = this.props;
    if (group_to_idea) {
      group_to_idea.forEach(gti => {
        let i = ideas.find(idea => idea.id === gti.idea);
        buffer.push(
          <Col {...this.colProps} key={i.id}>
            <VotePanel
              count={gti.votes.length}
              gti={gti}
              ideaCard={
                <IdeaCard
                  key={i.id}
                  {...i}
                  deleteIdea={this.props.deleteIdea}
                  updateIdeaInState={this.props.updateIdeaInState}
                />
              }
            />
          </Col>
        );
      });
    }
    return <Row>{buffer}</Row>;
  };

  render() {
    return this.renderIdeaCards();
  }
}

export default IdeaCardManagerVote;
