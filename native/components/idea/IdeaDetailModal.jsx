import React, { Component } from "react";
import { Button, ScrollView, Modal, StyleSheet, Text, KeyboardAvoidingView, View } from "react-native";
import { BLUE, YELLOW, DARK_YELLOW } from "../../colors";
import H1 from "../misc/H1";
import { connect } from "react-redux";
import axios from "axios";
import { ideaAPI } from "../../server";
import * as currentUserActions from "../../actions/currentUser";
import IdeaForm from "./IdeaForm";
import { SafeAreaView } from "react-native-safe-area-context";

class IdeaDetailModal extends Component {
  styles = StyleSheet.create({
    backgroundView: {
      flex: 1,
      padding: 20,
      backgroundColor: BLUE,
      paddingBottom: 100
    },
    text: {
      fontSize: 15,
      padding: 10,
      color: "#fff"
    }
  });

  state = {
    title: this.props.idea.title,
    description: this.props.idea.description,
    idEditing: false
  };

  onChangeTitle = text => this.setState({ title: text });
  onChangeDescription = text => this.setState({ description: text });
  editing = () => this.setState({ isEditing: !this.state.isEditing });

  handleSubmit = () => {
    alert("TODO: implement put");
  };

  render() {
    const { idea } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => this.props.setModalVisible()}
      >
        <ScrollView style={this.styles.backgroundView}>
          <H1 text={idea.title} color="#fff" />
          <KeyboardAvoidingView behavior="padding">
            <SafeAreaView emulateUnlessSupported={false}>
              <Button title={this.state.isEditing ? "Annulla" : "Modifica"} color={YELLOW} onPress={this.editing} />
              {this.state.isEditing ? (
                <IdeaForm
                  onChangeTitle={this.onChangeTitle}
                  onChangeDescription={this.onChangeDescription}
                  title={this.state.title}
                  description={this.state.description}
                  handleSubmit={this.handleSubmit}
                />
              ) : (
                <>
                  <Text style={this.styles.text}>{idea.description}</Text>
                  <View style={{ height: 30 }}>
                    {/* hack to display some spacing at bottom */}
                    <Text>{""}</Text>
                  </View>
                </>
              )}
            </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(IdeaDetailModal);
