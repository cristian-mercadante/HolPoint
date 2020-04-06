import React, { Component } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";
import { BLUE, RED } from "../../colors";

class Title extends Component {
  _isMounted = false;

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    this._isMounted = true;
    await Font.loadAsync({
      "rancho-regular": require("../../assets/fonts/Rancho-Regular.ttf"),
    });
    if (this._isMounted) this.setState({ fontLoaded: true });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        {this.state.fontLoaded && (
          <Text style={{ fontFamily: "rancho-regular", fontSize: 80 }}>
            <Text style={{ color: BLUE }}>Hol</Text>
            <Text style={{ color: RED }}>Point</Text>
          </Text>
        )}
      </>
    );
  }
}

export default Title;
