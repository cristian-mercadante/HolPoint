import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as colors from "./colors";
import LoadingScene from "./scenes/LoadingScene";
import AuthScene from "./scenes/AuthScene";

export default function App() {
  return <AuthScene />;
}
