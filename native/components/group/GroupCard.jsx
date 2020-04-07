import React from "react";
import Card from "../misc/Card";
import { RED, DARK_RED } from "../../colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const GroupCard = ({ group, updateGroupInState, deleteGroupFromState }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("GroupDetail", {
            group,
            updateGroupInState,
            deleteGroupFromState,
          })
        }
      >
        <Card
          color={RED}
          darkColor={DARK_RED}
          textColor="#fff"
          header={group.name}
          body={group.description}
          footer={group.creator.username}
        />
      </TouchableWithoutFeedback>
    </>
  );
};

export default GroupCard;
