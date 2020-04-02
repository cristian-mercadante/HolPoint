import React, { Component } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { ideaAPI } from "../server";
import * as currentUserActions from "../actions/currentUser";
import IdeaForm from "../components/idea/IdeaForm";

class IdeaAddScreen extends Component {
  initialState = {
    title: "",
    description: ""
  };

  state = { ...this.initialState };

  onChangeTitle = text => this.setState({ title: text });
  onChangeDescription = text => this.setState({ description: text });

  postIdea = () => {
    const { title, description } = this.state;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      }
    };
    return axios
      .post(ideaAPI, { title, description }, headers)
      .then(res => {
        this.setState(this.initialState);
        this.props.addIdeaToStore(res.data);
        this.props.navigation.navigate("Profilo", { idea: res.data });
      })
      .catch(error => {
        //this.props.error(error);
        alert(error.message);
      });
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <IdeaForm
            onChangeTitle={this.onChangeTitle}
            onChangeDescription={this.onChangeDescription}
            title={this.state.title}
            description={this.state.description}
            handleSubmit={this.postIdea}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIdeaToStore: idea => dispatch(currentUserActions.addIdeaToStore(idea))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaAddScreen);
