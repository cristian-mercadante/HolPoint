import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RED } from "../../colors";

export default class Card extends Component {
  styles = StyleSheet.create({
    card: {
      margin: 10,
      borderColor: RED,
      borderRadius: 13,
    },
    header: {
      padding: 5,
      backgroundColor: this.props.darkColor,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
    },
    headerText: {
      color: this.props.textColor,
      fontSize: 20,
      textAlign: "center",
    },
    body: {
      backgroundColor: this.props.color,
      padding: 10,
      maxHeight: 150,
      overflow: "hidden",
    },
    bodyText: {
      color: this.props.textColor,
      fontSize: 15,
    },
    footer: {
      height: 30,
      backgroundColor: this.props.darkColor,
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
      justifyContent: "center",
      paddingHorizontal: 10,
    },
    footerText: { color: this.props.textColor, textAlign: "right" },
  });

  render() {
    return (
      <View
        style={{
          ...this.styles.card,
          borderWidth: this.props.selected ? 3 : 0,
          margin: this.props.selected ? 7 : 10,
        }}
      >
        <View style={this.styles.header}>
          <Text style={this.styles.headerText}>{this.props.header}</Text>
        </View>
        <View style={this.styles.body}>
          <Text style={this.styles.bodyText}>{this.props.body}</Text>
        </View>
        <View style={this.styles.footer}>
          <Text style={this.styles.footerText}>{this.props.footer}</Text>
        </View>
      </View>
    );
  }
}
