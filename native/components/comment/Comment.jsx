import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { DARK_BLUE, DARK_GREEN, RED, BLUE, GREEN } from "../../colors";
import { FontAwesome } from "@expo/vector-icons";

export const darkColor = kind => {
  switch (kind) {
    case "idea":
      return DARK_BLUE;
    case "activity":
      return DARK_GREEN;
    default:
      return "#000";
  }
};

export const color = kind => {
  switch (kind) {
    case "idea":
      return BLUE;
    case "activity":
      return GREEN;
    default:
      return "#000";
  }
};

class Comment extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          borderColor: darkColor(this.props.kind),
          borderWidth: 2,
          padding: 5,
          borderRadius: 10,
          marginBottom: 10
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#777", fontSize: 15 }}>{this.props.creator.username}</Text>
          <Text style={{ color: "#777", fontSize: 10 }}>{this.props.datetime}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ flex: 1, fontSize: 17 }}>{this.props.text}</Text>
          {this.props.currentUserId === this.props.creator.id && (
            <TouchableOpacity onPress={() => this.props.deleteComment(this.props.id)}>
              <FontAwesome name="trash" size={30} color={RED} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id
  };
};

export default connect(mapStateToProps)(Comment);

/*
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Comment.css";
import { connect } from "react-redux";
import { ProfileBadge } from "../misc";

class Comment extends Component {
  render() {
    return (
      <div className={`${this.props.kind}-comment`}>
        {this.props.currentUserId === this.props.creator.id && (
          <Button
            size="sm"
            variant="danger"
            className="float-right"
            onClick={() => this.props.deleteComment(this.props.id)}
          >
            Elimina
          </Button>
        )}
        <h5>
          <ProfileBadge profile={this.props.creator} variant="warning" />
        </h5>
        <div className="text-with-newline">{this.props.text}</div>
        <div style={{ fontStyle: "italic", fontSize: "10pt", textAlign: "right" }}>{this.props.datetime}</div>
      </div>
    );
  }
}

*/
