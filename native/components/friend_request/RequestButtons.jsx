import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LIGHT_BLUE, BLUE, RED, GREEN, YELLOW } from "../../colors";
import { FontAwesome } from "@expo/vector-icons";
import RoundedButton from "../misc/RoundedButton";

export const AddButton = ({ onPress }) => {
  return (
    <RoundedButton
      title={
        <>
          <FontAwesome name="user-plus" color="#fff" size={15} /> AGGIUNGI
        </>
      }
      backgroundColor={BLUE}
      color="#fff"
      onPress={onPress}
    />
  );
};

export const RemoveButton = ({ onPress }) => {
  return (
    <RoundedButton
      title={
        <>
          <FontAwesome name="user-times" color="#fff" size={15} /> RIMUOVI
        </>
      }
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
      title={
        <>
          <FontAwesome name="user-plus" color="#fff" size={15} /> ATTESA
        </>
      }
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
          title={
            <>
              <FontAwesome name="user-plus" color="#fff" size={15} />
              {!compact && " ACCETTA"}
            </>
          }
          backgroundColor={GREEN}
          color="#fff"
          onPress={() => onPress("Acc")}
        />
      </View>
      <View style={{ flex: 1 }}>
        <RoundedButton
          title={
            <>
              <FontAwesome name="user-times" color="#000" size={15} />
              {!compact && " RIFIUTA"}
            </>
          }
          backgroundColor={YELLOW}
          color="#000"
          onPress={() => onPress("Ref")}
        ></RoundedButton>
      </View>
    </View>
  );
};
