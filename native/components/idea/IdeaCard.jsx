import React from "react";
import Card from "../misc/Card";
import { BLUE, DARK_BLUE } from "../../colors";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function IdeaCard({ idea }) {
  const navigation = useNavigation();

  return (
    <>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("IdeaDetail", { idea })}>
        <Card
          color={BLUE}
          darkColor={DARK_BLUE}
          textColor="#fff"
          header={idea.title}
          body={idea.description}
          footer={idea.date_creation}
        />
      </TouchableWithoutFeedback>
    </>
  );
}
