import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FriendTag from "../profile/FriendTag";

const GroupInfo = ({ group }) => {
  return (
    <View style={styles.container}>
      {group.creator && (
        <>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Creato da:</Text>
            <Text>{` ${group.creator.username}`}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Data partenza:</Text>
            <Text>{` ${group.date_start}`}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Data ritorno:</Text>
            <Text>{` ${group.date_finish}`}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Idea preferita:</Text>
            <Text>{` ${group.prefered_idea ? group.prefered_idea.title : "non definita"}`}</Text>
          </Text>
          <Text style={styles.textBold}>Partecipanti:</Text>
          {group.profiles.map(p => (
            <FriendTag username={p.username} key={p.id} />
          ))}
        </>
      )}
    </View>
  );
};

export default GroupInfo;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    fontSize: 15,
  },
  textBold: {
    fontWeight: "bold",
  },
});
