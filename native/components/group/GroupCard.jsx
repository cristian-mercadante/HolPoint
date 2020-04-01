import React from "react";
import * as colors from "../../colors";
import Card from "../misc/Card";

const GroupCard = ({ group }) => {
  return (
    <Card
      color={colors.RED}
      darkColor={colors.DARK_RED}
      textColor={"#fff"}
      header={group.name}
      body={group.description}
      footer={group.creator.username}
    />
  );
};

export default GroupCard;
