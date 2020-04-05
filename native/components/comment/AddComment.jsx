import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { darkColor, color } from "./Comment";

export default class AddComment extends Component {
  state = {
    commentText: "",
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          padding: 5,
          borderColor: darkColor(this.props.kind),
          borderWidth: 2,
          marginHorizontal: 20,
          marginBottom: 10,
          borderRadius: 10,
        }}
      >
        <TextInput
          style={{ fontSize: 17, flex: 1 }}
          placeholder="Lascia un commento..."
          multiline={true}
          onChangeText={(text) => this.setState({ commentText: text })}
          value={this.state.commentText}
          placeholderTextColor="#777"
        />
        <Button
          title="invia"
          color={color(this.props.kind)}
          onPress={() => {
            this.props.addComment(this.state.commentText);
            this.setState({ commentText: "" });
          }}
        />
      </View>
    );
  }
}
