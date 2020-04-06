import React from "react";
import Card from "../misc/Card";
import { RED, DARK_RED } from "../../colors";

const GroupCard = ({ group }) => {
  return (
    <Card
      color={RED}
      darkColor={DARK_RED}
      textColor={"#fff"}
      header={group.name}
      body={group.description}
      footer={group.creator.username}
    />
  );
};

export default GroupCard;
