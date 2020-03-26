import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as colors from "../colors";

export default class AuthScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.middle}>
            <Text style={styles.textContainer}>AA</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  top: {
    position: "relative",
    backgroundColor: colors.YELLOW,

    height: 250
  },
  middle: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
    zIndex: 2,
    backgroundColor: "transparent"
  },
  textContainer: {
    color: "#000",
    fontSize: 24,
    marginBottom: 30,
    position: "relative",
    top: "60%",
    alignSelf: "center"
  }
});
