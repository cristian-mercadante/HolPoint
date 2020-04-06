import React, { Component } from "react";
import { View } from "react-native";
import GroupCard from "./GroupCard";
import H1WithButton from "../misc/H1WithButton";
import RoundedButton from "../misc/RoundedButton";
import { FlatList } from "react-native-gesture-handler";
import { RED } from "../../colors";

class GroupCardManager extends Component {
  render() {
    return (
      <>
        <FlatList
          ListHeaderComponent={
            <H1WithButton
              text="Gruppi"
              button={
                <RoundedButton title="Crea" color="#fff" backgroundColor={RED} onPress={() => alert("pressed")} />
              }
            />
          }
          data={this.props.groups}
          renderItem={({ item }) => <GroupCard group={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      </>
    );
  }
}

export default GroupCardManager;
