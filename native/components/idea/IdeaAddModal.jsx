import React, { Component } from "react";
import { Button, ScrollView, Modal, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import { BLUE, YELLOW, DARK_YELLOW } from "../../colors";
import H1 from "../misc/H1";
import { connect } from "react-redux";
import axios from "axios";
import { ideaAPI } from "../../server";
import * as currentUserActions from "../../actions/currentUser";
import IdeaForm from "./IdeaForm";

class IdeaAddModal extends Component {
  styles = StyleSheet.create({
    backgroundView: {
      flex: 1,
      padding: 20,
      backgroundColor: BLUE
    }
  });

  initialState = {
    title: "",
    description: ""
  };

  state = { ...this.initialState };

  onChangeTitle = text => this.setState({ title: text });
  onChangeDescription = text => this.setState({ description: text });

  handleSubmit = () => {
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
        this.props.setModalVisible();
      })
      .catch(error => {
        //this.props.error(error);
        alert(error.message);
      });
  };

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => this.props.setModalVisible()}
      >
        <ScrollView style={this.styles.backgroundView}>
          <H1 text="Crea Idea" color="#fff" />
          <KeyboardAvoidingView behavior="padding">
            <IdeaForm
              onChangeTitle={this.onChangeTitle}
              onChangeDescription={this.onChangeDescription}
              title={this.state.title}
              description={this.state.description}
              handleSubmit={this.handleSubmit}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(IdeaAddModal);
