import React from "react";
import { StyleSheet, Text, View, Button, TextInput, StatusBar, Image } from "react-native";
import * as colors from "./colors";
// import LoadingScene from "./scenes/LoadingScene";
// import AuthScene from "./scenes/AuthScene";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => setCount(c => c + 1)} title="Update count" />
    });
  }, [navigation, setCount]);

  return <Text>Count: {count}</Text>;
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button title="press me" onPress={() => navigation.setOptions({ title: "AHIIIII!" })} />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate("Gruppi", { post: postText });
        }}
      />
    </>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100)
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Gruppi")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function LogoTitle() {
  return <Image style={{ width: 50, height: 50 }} source={require("./assets/icon.png")} />;
}

const Stack = createStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Gruppi"
        component={HomeScreen}
        options={
          {
            //headerTitle: props => <LogoTitle {...props} />
            //headerRight: () => <Button onPress={() => alert("This is a button!")} title="Info" color="#000" />
          }
        }
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackScreen />
      {/* <Stack.Navigator
        initialRouteName="Gruppi"
        screenOptions={{
          headerStyle: { backgroundColor: colors.YELLOW },
          headerTintColor: "#000"
        }}
      >
        <Stack.Screen name="Gruppi" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} initialParams={{ itemId: 42 }} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
