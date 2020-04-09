import React from "react";
import { View, Alert } from "react-native";
import { LIGHT_BLUE, BLUE, RED, GREEN, YELLOW } from "../../colors";
import { FontAwesome } from "@expo/vector-icons";
import RoundedButton from "../misc/RoundedButton";

export const AddButton = ({ onPress }) => {
  return <RoundedButton icon="user-plus" title="Aggiungi" backgroundColor={BLUE} color="#fff" onPress={onPress} />;
};

export const RemoveButton = ({ onPress }) => {
  return (
    <RoundedButton
      icon="user-minus"
      title="Rimuovi"
      backgroundColor={RED}
      color="#fff"
      onPress={() =>
        Alert.alert("Annullare l'amicizia?", "", [{ text: "No" }, { text: "Sì", onPress: onPress }], {
          cancelable: true,
        })
      }
    />
  );
};

export const WaitButton = ({ onPress }) => {
  return (
    <RoundedButton
      icon="user-clock"
      title="Attesa"
      backgroundColor={LIGHT_BLUE}
      color="#fff"
      onPress={onPress}
      disabled={true}
    />
  );
};

export const AcceptRefuseButtons = ({ onPress, compact }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <RoundedButton
          icon="user-check"
          title={!compact ? "Accetta" : ""}
          backgroundColor={GREEN}
          color="#fff"
          onPress={() => onPress("Acc")}
        />
      </View>
      <View style={{ flex: 1 }}>
        <RoundedButton
          icon="user-times"
          title={!compact ? "Rifiuta" : ""}
          backgroundColor={YELLOW}
          color="#000"
          onPress={() => onPress("Ref")}
        ></RoundedButton>
      </View>
    </View>
  );
};
