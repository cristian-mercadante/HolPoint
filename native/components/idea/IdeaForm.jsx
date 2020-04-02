import React, { Component } from "react";
import { TextInput, Button, StyleSheet } from "react-native";
import { DARK_YELLOW, YELLOW } from "../../colors";

export default class IdeaForm extends Component {
  styles = StyleSheet.create({
    formField: {
      margin: 10,
      borderColor: YELLOW,
      borderBottomWidth: 1,
      fontSize: 20,
      color: "#fff"
    }
  });

  render() {
    return (
      <>
        <TextInput
          style={this.styles.formField}
          placeholder="Titolo"
          onChangeText={text => this.props.onChangeTitle(text)}
          value={this.props.title}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={this.styles.formField}
          placeholder="Descrizione"
          multiline={true}
          onChangeText={text => this.props.onChangeDescription(text)}
          value={this.props.description}
          placeholderTextColor="#fff"
        />
        <Button title="Invia" color={DARK_YELLOW} onPress={this.props.handleSubmit} />
      </>
    );
  }
}
