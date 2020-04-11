import React, { useCallback } from "react";
import { Alert, Button, Linking } from "react-native";
import RoundedButton from "./RoundedButton";
import { BLUE } from "../../colors";

const OpenURLButton = ({ url, children, color }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <RoundedButton title={children} onPress={handlePress} color={color || "#000"} />;
};

export default OpenURLButton;
