import React, { Component } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";
import * as colors from "../../colors";

class Title extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      "rancho-regular": require("../../assets/fonts/Rancho-Regular.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <>
        {this.state.fontLoaded && (
          <Text style={{ fontFamily: "rancho-regular", fontSize: 80 }}>
            <Text style={{ color: colors.BLUE }}>Hol</Text>
            <Text style={{ color: colors.RED }}>Point</Text>
          </Text>
        )}
      </>
    );
  }
}

export default Title;
