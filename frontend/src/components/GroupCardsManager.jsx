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
          <GroupCard {...this.groupCardProps} />
          <GroupCard {...this.groupCardProps} />
          <EmptyGroupCard {...this.groupCardProps} />
        </Row>
      </React.Fragment>
    );
  }
}

export default GroupCardsManager;
