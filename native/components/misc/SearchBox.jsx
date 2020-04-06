import React from "react";
import { View, KeyboardAvoidingView, TextInput, StyleSheet } from "react-native";
import { DARK_YELLOW } from "../../colors";

const SearchBox = ({ doSearch, searchField }) => {
  return (
    <View style={styles.container} behavior="position">
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.searchField}
          onChangeText={text => doSearch(text)}
          value={searchField}
          placeholder="Cerca username..."
          placeholderTextColor="#777"
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchField: {
    margin: 10,
    fontSize: 17,
    padding: 10,
    borderColor: DARK_YELLOW,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});

export default SearchBox;
