import React, { Component, Fragment } from "react";
import GroupCard from "./GroupCard";
import { ProgressBar, Row, Col } from "react-bootstrap";

class GroupCardsManager extends Component {
  colProps = { xs: "12", sm: "12", md: "6", lg: "4", xl: "3" };

  renderGroupCards = () => {
    let buffer = [];
    if (!this.props.loading) {
      this.props.groups.forEach(group =>
        buffer.push(
          <Col {...this.colProps} style={{ marginBottom: "10px" }} key={group.id}>
            <GroupCard key={group.id} {...group} />
          </Col>
        )
      );
    }
    return <Row>{buffer}</Row>;
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
