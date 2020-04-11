import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

class ActivityDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: this.props.route.params.activity,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.route.params.activity.title });
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentUserId: state.currentUser.id,
  };
};

export default connect(mapStateToProps)(ActivityDetailScreen);
