import React from "react";
import { View } from "react-native";
import GroupCard from "./GroupCard";
import H1 from "../misc/H1";
import { FlatList } from "react-native-gesture-handler";

export default function GroupCardManager({ groups }) {
  return (
    <>
      <H1 text="Gruppi" />
      <FlatList data={groups} renderItem={({ item }) => <GroupCard group={item} />} keyExtractor={item => item.id} />
    </>
  );
}
