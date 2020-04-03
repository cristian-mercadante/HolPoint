import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { TextInput, TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { BLUE } from "../../colors";
import TextInputLabel from "../misc/TextInputLabel";
import * as ImagePicker from "expo-image-picker";
import ProfilePicture from "../profile/ProfilePicture";

export default class SettingsForm extends Component {
  constructor(props) {
    super(props);
    const profile = this.props.profile;
    this.state = {
      profile: profile,
      username: profile.username,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      picture: null
    };
  }

  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    this.setState({ picture: pickerResult });
  };

  onChangeUsername = text => this.setState({ username: text });
  onChangeEmail = text => this.setState({ email: text });
  onChangeFirstName = text => this.setState({ first_name: text });
  onChangeLastName = text => this.setState({ last_name: text });

  handleSubmit = () => {
    const { username, email, first_name, last_name, picture } = this.state;
    this.props.putCurrentUser(username, email, first_name, last_name).then(() => {
      if (picture) {
        this.props.putCurrentUserPicture(picture).then(() => this.props.navigation.navigate("Profilo"));
      } else {
        this.props.navigation.navigate("Profilo");
      }
    });
  };

  render() {
    const { username, email, first_name, last_name } = this.state;
    return (
      <ScrollView>
        <Button title="Modifica" onPress={this.handleSubmit} />
        <TextInputLabel
          placeholder="Username"
          onChangeText={text => this.onChangeUsername(text)}
          value={username}
          placeholderTextColor="#777"
        />
        <TextInputLabel
          placeholder="Email"
          onChangeText={text => this.onChangeEmail(text)}
          value={email}
          placeholderTextColor="#777"
        />
        <TextInputLabel
          placeholder="Nome"
          onChangeText={text => this.onChangeFirstName(text)}
          value={first_name}
          placeholderTextColor="#777"
        />
        <TextInputLabel
          placeholder="Cognome"
          onChangeText={text => this.onChangeLastName(text)}
          value={last_name}
          placeholderTextColor="#777"
        />
        <Button onPress={this.openImagePickerAsync} title="Selezione nuova immagine del profilo" />
        {this.state.picture && (
          <View style={{ alignSelf: "center" }}>
            <ProfilePicture source={this.state.picture.uri} size={150} />
          </View>
        )}
      </ScrollView>
    );
  }
}