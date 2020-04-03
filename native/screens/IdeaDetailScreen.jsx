import React, { Component } from "react";
import { Button, ScrollView, Text, KeyboardAvoidingView } from "react-native";
import { ideaAPI } from "../server";
import { YELLOW, RED } from "../colors";
import IdeaForm from "../components/idea/IdeaForm";
import { connect } from "react-redux";
import axios from "axios";
import * as currentUserActions from "../actions/currentUser";
import CommentSection from "../components/comment/CommentSection";

class IdeaDetailScreen extends Component {
  state = {
    idea: {},
    titleField: "",
    descriptionField: "",
    idEditing: false
  };

  componentDidMount() {
    const idea = this.props.route.params.idea;
    this.props.navigation.setOptions({ title: idea.title });
    this.setState({ idea, titleField: idea.title, descriptionField: idea.description });
  }

  onChangeTitle = text => this.setState({ titleField: text });
  onChangeDescription = text => this.setState({ descriptionField: text });
  editing = () => this.setState({ isEditing: !this.state.isEditing });

  putIdea = () => {
    const { id } = this.state.idea;
    const { titleField: title, descriptionField: description } = this.state;
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
        this.setState({
          isEditing: false,
          idea: res.data,
          titleField: res.data.title,
          descriptionField: res.data.description
        });
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
              title={this.state.titleField}
              description={this.state.descriptionField}
              handleSubmit={this.putIdea}
            />
          ) : (
            <>
              <Text style={{ padding: 15, fontSize: 18 }}>{idea.description}</Text>
            </>
          )}
          <CommentSection id={idea.id} kind="idea" kind="idea" />
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
