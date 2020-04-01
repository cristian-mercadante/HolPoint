import React from "react";
import * as colors from "../../colors";
import Card from "../misc/Card";

export default function IdeaCard({ idea }) {
  return (
    <Card
      color={colors.BLUE}
      darkColor={colors.DARK_BLUE}
      textColor={"#fff"}
      header={idea.title}
      body={idea.description}
      footer={idea.date_creation}
    />
  );
}
