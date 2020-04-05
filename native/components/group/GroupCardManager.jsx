import React from "react";
import { View } from "react-native";
import GroupCard from "./GroupCard";
import H1WithButton from "../misc/H1WithButton";
import RoundedButton from "../misc/RoundedButton";
import { FlatList } from "react-native-gesture-handler";
import { RED } from "../../colors";

export default function GroupCardManager({ groups }) {
  return (
    <View>
      {/* FIXME: */}
      <H1WithButton
        text="Gruppi"
        button={<RoundedButton title="Crea" color="#fff" backgroundColor={RED} onPress={() => alert("pressed")} />}
      />
      <FlatList data={groups} renderItem={({ item }) => <GroupCard group={item} />} keyExtractor={(item) => item.id} />
    </View>
  );
}
