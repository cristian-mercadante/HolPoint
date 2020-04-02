import React from "react";
import Card from "../misc/Card";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BLUE, DARK_BLUE } from "../../colors";
import { useNavigation } from "@react-navigation/native";

export default function IdeaCard({ idea }) {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("IdeaDetail", { idea })}>
        <Card
          color={BLUE}
          darkColor={DARK_BLUE}
          textColor="#fff"
          header={idea.title}
          body={idea.description}
          footer={idea.date_creation}
        />
      </TouchableOpacity>
    </>
  );
}
