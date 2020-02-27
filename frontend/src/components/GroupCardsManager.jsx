import React, { Component } from "react";
import GroupCard, { EmptyGroupCard } from "./GroupCard";
import { Row } from "react-bootstrap";

class GroupCardsManager extends Component {
  groupCardProps = {
    colProps: {
      xs: "12",
      sm: "6",
      md: "6",
      lg: "4",
      xl: "4"
    }
  };

  renderGroupCards = () => {
    let buffer = [];
    if (!this.props.groups.loading) {
      const groups = this.props.groups.groups;
      groups.map(g => buffer.push(<GroupCard key={g.id} {...this.groupCardProps} group={g} />));
    }
    return buffer;
  };

  render() {
    return (
      <React.Fragment>
        <>
          <style type="text/css">
            {`
            .groupCard{
              min-height: 200px;
              margin-top: 10px;
              margin-bottom: 10px;
            }
            `}
          </style>
        </>
        <Row>
          {this.renderGroupCards()}
          <EmptyGroupCard {...this.groupCardProps} />
        </Row>
      </React.Fragment>
    );
  }
}

export default GroupCardsManager;
