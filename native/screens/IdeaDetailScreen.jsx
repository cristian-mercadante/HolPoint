import React, { Component } from "react";
import { ScrollView, Text, KeyboardAvoidingView, Alert, View, RefreshControl } from "react-native";
import { ideaAPI } from "../server";
import { YELLOW, RED } from "../colors";
import IdeaForm from "../components/idea/IdeaForm";
import { connect } from "react-redux";
import axios from "axios";
import * as currentUserActions from "../actions/currentUser";
import * as alertActions from "../actions/alerts";
import CommentSection from "../components/comment/CommentSection";
import RoundedButton from "../components/misc/RoundedButton";

class IdeaDetailScreen extends Component {
  state = {
    idea: {},
    titleField: "",
    descriptionField: "",
    idEditing: false,
    refreshing: false,
  };

  componentDidMount() {
    const idea = this.props.route.params.idea;
    this.props.navigation.setOptions({ title: idea.title });
    this.setState({
      idea,
      titleField: idea.title,
      descriptionField: idea.description,
    });
  }

  onChangeTitle = text => this.setState({ titleField: text });
  onChangeDescription = text => this.setState({ descriptionField: text });
  editing = () => this.setState({ isEditing: !this.state.isEditing });

  getIdea = () => {
    const headers = { headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` } };
    const id = this.state.idea.id;
    return axios
      .get(`${ideaAPI}${id}/`, headers)
      .then(res => {
        this.setState({ idea: res.data });
        this.props.updateIdeaInStore(res.data);
        this.props.navigation.setOptions({ title: res.data.title });
      })
      .catch(error => this.props.error(error));
  };

  putIdea = () => {
    const { id } = this.state.idea;
    const { titleField: title, descriptionField: description } = this.state;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    };

    return axios
      .put(`${ideaAPI}${id}/`, { title, description }, headers)
      .then(res => {
        this.props.updateIdeaInStore(res.data);
        this.setState({
          isEditing: false,
          idea: res.data,
          titleField: res.data.title,
          descriptionField: res.data.description,
        });
        this.props.navigation.setOptions({ title: res.data.title });
        this.props.navigation.navigate(this.props.route.params.fromScreen, { idea: res.data });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  deleteIdea = () => {
    const { id } = this.state.idea;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    };
    return axios
      .delete(`${ideaAPI}${id}/`, headers)
      .then(res => {
        this.props.removeIdeaFromStore(id);
        this.setState({ isEditing: false });
        this.props.navigation.navigate(this.props.route.params.fromScreen, { deletedIdeaId: id });
      })
      .catch(error => {
        this.props.error(error);
      });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getIdea()
      .then(() => this.setState({ refreshing: false }))
      .catch(error => {
        this.props.error(error);
        this.setState({ refreshing: false });
      });
  };

  render() {
    const idea = this.state.idea;

    return (
      <>
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
          <KeyboardAvoidingView behavior="padding">
            {idea.creator && this.props.currentUserId === idea.creator.id && (
              <View style={{ marginTop: 10 }}>
                <RoundedButton
                  title={this.state.isEditing ? "Annulla" : "Modifica"}
                  backgroundColor={YELLOW}
                  color="#000"
                  onPress={this.editing}
                />
                <RoundedButton
                  title="Elimina"
                  backgroundColor={RED}
                  color="#fff"
                  onPress={() =>
                    Alert.alert(
                      `Sicuro di voler eliminare ${idea.title}?`,
                      "Non potrai più ripristinarla",
                      [{ text: "No" }, { text: "Sì", onPress: () => this.deleteIdea() }],
                      { cancelable: true }
                    )
                  }
                />
              </View>
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
                <Text
                  style={{
                    padding: 15,
                    fontSize: 18,
                  }}
                >
                  {idea.description}
                </Text>
              </>
            )}
            <CommentSection id={idea.id} kind="idea" kind="idea" refreshing={this.state.refreshing} />
          </KeyboardAvoidingView>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentUserId: state.currentUser.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateIdeaInStore: idea => dispatch(currentUserActions.updateIdeaInStore(idea)),
    removeIdeaFromStore: ideaId => dispatch(currentUserActions.removeIdeaFromStore(ideaId)),
    error: error => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaDetailScreen);
