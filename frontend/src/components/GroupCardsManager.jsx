import React, { Component } from "react";
import GroupCard, { EmptyGroupCard } from "./GroupCard";
import { Row } from "react-bootstrap";
import * as colors from "../colors";

class GroupCardsManager extends Component {
  groupCardProps = {
    colStyle: {
      xs: "12",
      sm: "6",
      md: "6",
      lg: "4",
      xl: "4",
      style: {
        marginTop: "10px",
        marginBottom: "10px"
      }
    },
    cardStyle: {
      text: "white",
      style: {
        minHeight: "200px",
        backgroundColor: colors.GREEN
      }
    },
    emptyCardStyle: {
      variant: "outline-success",
      border: "success",
      style: {
        textAlign: "center",
        verticalAlign: "middle"
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <GroupCard {...this.groupCardProps} />
          <GroupCard {...this.groupCardProps} />
          <GroupCard {...this.groupCardProps} />
          <GroupCard {...this.groupCardProps} />
          <EmptyGroupCard {...this.groupCardProps} />
        </Row>
      </React.Fragment>
    );
  }
}

export default GroupCardsManager;
