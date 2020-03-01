import React, { Component } from "react";
import GroupCard from "./GroupCard";
import GroupCardEmpty from "./GroupCardEmpty";
import { Row } from "react-bootstrap";

import * as groupActions from "../actions/group";
import * as alertActions from "../actions/alerts";
import { connect } from "react-redux";

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

  componentDidMount() {
    if (this.props.group.loading) {
      const groups = this.props.currentUser.profile.groups;
      groups.forEach(g => {
        this.props.getGroup(g);
      });
    }
  }

  renderGroupCards = () => {
    let buffer = [];
    if (!this.props.group.loading) {
      const groups = this.props.group.groups;
      groups.map(g => buffer.push(<GroupCard key={g.id} {...this.groupCardProps} {...g} />));
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
              min-height: 400px;
              margin-top: 10px;
              margin-bottom: 10px;
            }
            `}
          </style>
        </>
        <Row>
          {this.renderGroupCards()}
          <GroupCardEmpty {...this.groupCardProps} />
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    group: state.group
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGroup: id => dispatch(groupActions.getGroup(id)),
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style)),
    removeAllAlerts: () => dispatch(alertActions.removeAllAlerts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupCardsManager);
