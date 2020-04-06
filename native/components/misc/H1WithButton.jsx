import React from "react";
import { View } from "react-native";
import H1 from "../misc/H1";

const H1WithButton = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 2, justifyContent: "center" }}>
        <H1 text={props.text} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        {props.button}
      </View>
    </View>
  );
};

export default H1WithButton;
