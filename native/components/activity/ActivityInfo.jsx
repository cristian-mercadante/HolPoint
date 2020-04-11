import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { KIND_CHOICES } from "./kindChoices";
import OpenURLButton from "../misc/OpenURLButton";

const ActivityInfo = ({ activity }) => {
  return (
    <View style={styles.container}>
      {activity.creator && (
        <>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Creato da:</Text>
            <Text>{` ${activity.creator.username}`}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Categoria:</Text>
            <Text>{` ${KIND_CHOICES[activity.kind].name}`}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Data:</Text>
            <Text>{` ${activity.date ? activity.date : "non definita"}`}</Text>
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Ora:</Text>
            <Text>{` ${activity.time ? activity.time : "non definita"}`}</Text>
          </Text>
          {activity.url ? <OpenURLButton url={activity.url}>{activity.url}</OpenURLButton> : <></>}
          <Text style={styles.text}>
            <Text style={styles.textBold}>Descrizione:</Text>
          </Text>
          <Text style={styles.text}>{activity.description}</Text>
        </>
      )}
    </View>
  );
};

export default ActivityInfo;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    fontSize: 16,
  },
  textBold: {
    fontWeight: "bold",
  },
});
