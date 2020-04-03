import React, { Component } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView, StatusBar } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import { ideaAPI } from "../server";
import * as currentUserActions from "../actions/currentUser";
import * as alertActions from "../actions/alerts";
import IdeaForm from "../components/idea/IdeaForm";
import { DARK_BLUE } from "../colors";

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
        this.props.error(error);
      });
  };

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={DARK_BLUE} />
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
      </>
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
    addIdeaToStore: idea => dispatch(currentUserActions.addIdeaToStore(idea)),
    error: error => dispatch(alertActions.error(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaAddScreen);
