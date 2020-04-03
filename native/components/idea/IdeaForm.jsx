import React, { Component } from "react";
import { TextInput, Button, StyleSheet } from "react-native";
import { BLUE, GREEN } from "../../colors";
import TextInputLabel from "../misc/TextInputLabel";

export default class IdeaForm extends Component {
  styles = StyleSheet.create({
    formField: {
      margin: 10,
      borderColor: BLUE,
      borderBottomWidth: 1,
      fontSize: 20,
      color: "#000"
    }
  });

  render() {
    return (
      <>
        <Button title="Invia" color={GREEN} onPress={this.props.handleSubmit} />
        <TextInputLabel
          style={this.styles.formField}
          placeholder="Titolo"
          onChangeText={text => this.props.onChangeTitle(text)}
          value={this.props.title}
          placeholderTextColor="#777"
        />
        <TextInputLabel
          style={this.styles.formField}
          placeholder="Descrizione"
          multiline={true}
          onChangeText={text => this.props.onChangeDescription(text)}
          value={this.props.description}
          placeholderTextColor="#777"
        />
      </>
    );
  }
}
