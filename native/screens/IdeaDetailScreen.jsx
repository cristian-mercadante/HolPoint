import React, { Component } from "react";
import { Button, ScrollView, Text, KeyboardAvoidingView } from "react-native";
import { ideaAPI } from "../server";
import { YELLOW, RED } from "../colors";
import IdeaForm from "../components/idea/IdeaForm";
import { connect } from "react-redux";
import axios from "axios";
import * as currentUserActions from "../actions/currentUser";

class IdeaDetailScreen extends Component {
  state = {
    idea: {},
    idEditing: false
  };

  componentDidMount() {
    const idea = this.props.route.params.idea;
    this.props.navigation.setOptions({ title: idea.title });
    this.setState({ idea });
  }

  onChangeTitle = text => this.setState({ idea: { ...this.state.idea, title: text } });
  onChangeDescription = text => this.setState({ idea: { ...this.state.idea, description: text } });
  editing = () => this.setState({ isEditing: !this.state.isEditing });

  putIdea = () => {
    const { title, description, id } = this.state.idea;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      }
    };

    return axios
      .put(`${ideaAPI}${id}/`, { title, description }, headers)
      .then(res => {
        this.props.updateIdeaInStore(res.data);
        this.setState({ isEditing: false, idea: res.data });
        this.props.navigation.setOptions({ title: res.data.title });
        this.props.navigation.navigate("Profilo", { idea: res.data });
      })
      .catch(error => {
        //this.props.error(error);
        alert(error.message);
      });
  };

  render() {
    const idea = this.state.idea;

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          {idea.creator && this.props.currentUserId === idea.creator.id && (
            <>
              <Button title={this.state.isEditing ? "Annulla" : "Modifica"} color={YELLOW} onPress={this.editing} />
              <Button title="Elimina" color={RED} onPress={() => alert("handle delete")} />
            </>
          )}
          {this.state.isEditing ? (
            <IdeaForm
              onChangeTitle={this.onChangeTitle}
              onChangeDescription={this.onChangeDescription}
              title={idea.title}
              description={idea.description}
              handleSubmit={this.putIdea}
            />
          ) : (
            <Text style={{ paddingHorizontal: 15, fontSize: 18 }}>{idea.description}</Text>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentUserId: state.currentUser.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIdeaToStore: idea => dispatch(currentUserActions.addIdeaToStore(idea)),
    updateIdeaInStore: idea => dispatch(currentUserActions.updateIdeaInStore(idea))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaDetailScreen);
