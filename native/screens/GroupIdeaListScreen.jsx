import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import IdeaCardManagerVote from "../components/idea/IdeaCardManagerVote";

class GroupIdeaListScreen extends Component {
  render() {
    return (
      <IdeaCardManagerVote
        ideas={this.props.route.params?.ideas}
        userId={this.props.currentUserId}
        navigation={this.props.navigation}
        routeParams={this.props.route.params?.routeParams}
        fromScreen="GroupDetail"
        group_to_idea={this.props.route.params?.group.group_to_idea}
        updateVotes={this.props.route.params?.updateVotes}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id,
  };
};

export default connect(mapStateToProps)(GroupIdeaListScreen);
