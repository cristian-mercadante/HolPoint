import React from "react";
import { BLUE, GREEN } from "../../colors";
import TextInputLabel from "../misc/TextInputLabel";
import RoundedButton from "../misc/RoundedButton";

const IdeaForm = props => {
  return (
    <>
      <TextInputLabel
        borderColor={BLUE}
        placeholder="Titolo"
        onChangeText={text => props.onChangeTitle(text)}
        value={props.title}
        placeholderTextColor="#777"
      />
      <TextInputLabel
        borderColor={BLUE}
        placeholder="Descrizione"
        multiline={true}
        onChangeText={text => props.onChangeDescription(text)}
        value={props.description}
        placeholderTextColor="#777"
      />
      <RoundedButton title="Invia" onPress={props.handleSubmit} backgroundColor={GREEN} color="#fff" />
    </>
  );
};

export default IdeaForm;
