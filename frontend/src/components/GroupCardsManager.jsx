import React, { Component } from "react";
import GroupCard from "./GroupCard";
//import GroupCardEmpty from "../discarded/GroupCardEmpty";
import { CardColumns } from "react-bootstrap";

import * as groupActions from "../actions/group";
import { connect } from "react-redux";

class GroupCardsManager extends Component {
  componentDidMount() {
    const groups = this.props.currentUser.profile.groups;
    if (groups) {
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
    return <CardColumns>{buffer}</CardColumns>;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderGroupCards()}
        {/*<GroupCardEmpty {...this.groupCardProps} />*/}
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
    getGroup: id => dispatch(groupActions.getGroup(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupCardsManager);
