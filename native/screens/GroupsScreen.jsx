import React from "react";
import { View, StatusBar, Text, Button } from "react-native";
import H1 from "../components/misc/H1";
import * as colors from "../colors";

function GroupsScreen({ navigation }) {
  return (
    <View>
      <StatusBar barStyle="dark-content" />

      <View>
        <Button title="Crea gruppo" color={colors.RED} />
      </View>
    </View>
  );
}

export default GroupsScreen;
