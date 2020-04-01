import React from "react";
import { View, Button } from "react-native";
import IdeaCard from "./IdeaCard";
import H1 from "../misc/H1";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";

function IdeaCardManager({ ideas, currentUserId }) {
  return (
    <>
      <H1 text="Idee" />
      {ideas.length !== 0 && currentUserId === ideas[0].creator.id && (
        <Button title="Crea idea" onPress={() => alert("TODO: handle add idea")} />
      )}
      <FlatList data={ideas} renderItem={({ item }) => <IdeaCard idea={item} />} keyExtractor={item => `${item.id}`} />
    </>
  );
}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUser.id
  };
};

export default connect(mapStateToProps)(IdeaCardManager);
