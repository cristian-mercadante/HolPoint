import React from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, Modal } from "react-native";
import H1 from "../components/misc/H1";

const MyModal = props => {
  const styles = StyleSheet.create({
    backgroundView: {
      flex: 1,
      padding: 20,
      backgroundColor: props.backgroundColor
    }
  });

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => props.setModalVisible()}
    >
      <ScrollView style={styles.backgroundView}>
        <H1 text={props.header} color={props.textColor || "#fff"} />
        <KeyboardAvoidingView behavior="padding">{props.body}</KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
};

export default MyModal;
