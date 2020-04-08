import React, { Component } from "react";
import { Text, View } from "react-native";
import IdeaCardManager from "../components/idea/IdeaCardManager";
import { connect } from "react-redux";

class GroupIdeaListScreen extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.route.params?.idea !== this.props.route.params?.idea) {
      const idea = this.props.route.params.idea;
      const index = this.props.route.params.ideas.findIndex(i => i.id === idea.id);
      if (index > -1) {
        // update idea
        this.props.route.params.updateIdeaInGroupInState(idea);
      } else {
        // add idea
        this.props.route.params.addIdeaToGroupInState(idea);
      }
    }
  }

  render() {
    return (
      <IdeaCardManager
        ideas={this.props.route.params?.ideas}
        userId={this.props.currentUserId}
        navigation={this.props.navigation}
        routeParams={this.props.route.params}
        fromScreen="GroupIdeaList"
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
