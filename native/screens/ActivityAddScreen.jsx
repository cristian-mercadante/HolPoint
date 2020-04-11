import React, { Component } from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ActivityForm from "../components/activity/ActivityForm";

class ActivityAddScreen extends Component {
  render() {
    return (
      <>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding">
            <ActivityForm activity={{}} />
          </KeyboardAvoidingView>
        </ScrollView>
      </>
    );
  }
}

export default ActivityAddScreen;
