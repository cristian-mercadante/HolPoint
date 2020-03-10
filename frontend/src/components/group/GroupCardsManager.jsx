import React, { Component, Fragment } from "react";
import GroupCard from "./GroupCard";
import { CardColumns, ProgressBar } from "react-bootstrap";

class GroupCardsManager extends Component {
  renderGroupCards = () => {
    let buffer = [];
    if (!this.props.loading) {
      this.props.groups.forEach(group => buffer.push(<GroupCard key={group.id} {...group} />));
    }
    return <CardColumns style={{ WebkitColumnCount: "3" }}>{buffer}</CardColumns>;
  };

  render() {
    return (
      <Fragment>
        {this.props.loading ? <ProgressBar striped variant="success" now={100} animated /> : this.renderGroupCards()}
      </Fragment>
    );
  }
}

export default GroupCardsManager;
