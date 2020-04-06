import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import UsernameLabel from "./UsernameLabel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { YELLOW, GREEN } from "../../colors";

const FriendProfileListItem = ({ friend, buttons, selected: selected_, selectable, selectFriend }) => {
  const navigation = useNavigation();

  const [selected, setSelected] = useState(selected_);

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: selectable ? 2 : 0,
        borderRadius: 10,
        borderColor: selected ? GREEN : YELLOW,
        marginVertical: 5,
        marginHorizontal: 10,
      }}
      onPress={
        selectable
          ? () => {
              setSelected(!selected);
              selectFriend(friend.id);
            }
          : () => navigation.navigate("FriendProfile", { friend })
      }
    >
      <ProfilePicture size={60} source={friend.picture || friend.profile?.picture} />
      <UsernameLabel size={20} username={friend.username} />
      {buttons}
    </TouchableOpacity>
  );
};

export default FriendProfileListItem;
