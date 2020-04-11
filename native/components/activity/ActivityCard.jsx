import React from "react";
import { View, Text } from "react-native";
import { DARK_GREEN, GREEN } from "../../colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const ActivityCard = ({ activity, icon }) => {
  const navigation = useNavigation();

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("ActivityDetail", { activity })}
        style={{
          backgroundColor: GREEN,
          margin: 10,
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 10,
        }}
      >
        <FontAwesome5 name={icon} color="#fff" size={20} />
        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "center", color: "#fff", fontSize: 20 }}>{activity.title}</Text>
        </View>
        <View>
          <Text style={{ color: "#fff", fontSize: 15 }}>{activity.time}</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ActivityCard;
