import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import * as colors from "../colors";
import Logo from "../images/Logo.png";

export default class LoadingScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={Logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.YELLOW,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 250,
    height: 250
  }
});
