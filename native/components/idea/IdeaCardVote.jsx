import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { BLUE, GREEN, RED } from "../../colors";
import IdeaCard from "./IdeaCard";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import axios from "axios";
import { voteAPI } from "../../server";

class IdeaCardVote extends Component {
  state = {
    idea: {},
    gti: {},
    voted: false,
  };

  componentDidMount() {
    const idea = this.props.idea;
    const gti = this.props.group_to_idea.filter(k => k.idea === idea.id)[0];
    this.checkCurrentUserVoted(gti);
    this.setState({ gti, idea });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gti !== this.state.gti) {
      this.checkCurrentUserVoted(this.state.gti);
    }
  }

  checkCurrentUserVoted = gti => {
    if (gti.votes.map(v => v.id).includes(this.props.currentUser.id)) {
      this.setState({ voted: true });
    }
  };

  vote = (group_id, idea_id) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    };
    return axios
      .post(`${voteAPI}${group_id}/${idea_id}`, {}, headers)
      .then(res => {
        this.setState({ gti: res.data, voted: !this.state.voted });
        this.props.updateVotes(res.data);
      })
      .catch(error => this.props.error(error));
  };

  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: 50,
            paddingHorizontal: 10,
            marginBottom: -20,
            marginHorizontal: 10,
            borderWidth: 2,
            borderColor: BLUE,
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, color: "#000" }}>{`Voti: ${this.state.gti.votes?.length}`}</Text>
          </View>
          <View style={{ flex: 1 }}>
            {this.props.currentUser.id === this.props.idea.creator.id && (
              <TouchableWithoutFeedback
                onPress={() =>
                  Alert.alert(
                    "Vuoi rimuovere quest'idea dal gruppo?",
                    "Potrai proporla nuovamente, ma perderai i voti attuali.",
                    [
                      { text: "No" },
                      {
                        text: "Sì",
                        onPress: () =>
                          this.props.navigation.navigate("GroupDetail", { deletedIdeaId: this.props.idea.id }),
                      },
                    ],
                    { cancelable: true }
                  )
                }
              >
                <FontAwesome5 name="times" size={20} color={RED} />
              </TouchableWithoutFeedback>
            )}
          </View>
          <TouchableWithoutFeedback onPress={() => this.vote(this.state.gti.group, this.state.gti.idea)}>
            <FontAwesome5 name="thumbs-up" solid size={20} color={this.state.voted ? GREEN : "#aaa"} />
          </TouchableWithoutFeedback>
        </View>
        <IdeaCard {...this.props} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaCardVote);
