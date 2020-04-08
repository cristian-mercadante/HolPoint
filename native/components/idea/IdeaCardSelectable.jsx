import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "../misc/Card";
import { DARK_BLUE, BLUE, RED } from "../../colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const IdeaCardSelectable = ({ idea, selected, selectIdea }) => {
  return (
    <TouchableWithoutFeedback onPress={() => selectIdea(idea)}>
      <Card
        color={BLUE}
        darkColor={DARK_BLUE}
        textColor="#fff"
        header={idea.title}
        body={idea.description}
        footer={idea.date_creation}
        selected={selected}
      />
    </TouchableWithoutFeedback>
  );
};

export default IdeaCardSelectable;
