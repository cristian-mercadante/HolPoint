import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { YELLOW, RED, BLUE, GREEN } from "../colors";
import GroupsScreen from "../screens/GroupsScreen";
import GroupAddScreen from "../screens/GroupAddScreen";
import GroupAddFriendScreen from "../screens/GroupAddFriendScreen";
import GroupDetailScreen from "../screens/GroupDetailScreen";
import GroupIdeaListScreen from "../screens/GroupIdeaListScreen";
import IdeaDetailScreen from "../screens/IdeaDetailScreen";
import IdeaAddScreen from "../screens/IdeaAddScreen";
import GroupIdeaSelectScreen from "../screens/GroupIdeaSelectScreen";
import AttachmentsScreen from "../screens/AttachmentsScreen";
import ActivitiesScreen from "../screens/ActivitiesScreen";
import ActivityAddScreen from "../screens/ActivityAddScreen";
import ActivityDetailScreen from "../screens/ActivityDetailScreen";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: YELLOW },
        headerTintColor: "#000",
      }}
    >
      <HomeStack.Screen name="Home" component={GroupsScreen} />
      <HomeStack.Screen
        name="GroupAdd"
        component={GroupAddScreen}
        options={{
          headerStyle: {
            backgroundColor: RED,
          },
          headerTintColor: "#fff",
          title: "Crea Gruppo",
        }}
      />
      <HomeStack.Screen
        name="GroupAddFriend"
        component={GroupAddFriendScreen}
        options={{
          headerStyle: {
            backgroundColor: RED,
          },
          headerTintColor: "#fff",
          title: "Partecipanti",
        }}
      />
      <HomeStack.Screen
        name="GroupDetail"
        component={GroupDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: RED,
          },
          headerTintColor: "#fff",
        }}
      />
      <HomeStack.Screen
        name="GroupIdeaList"
        component={GroupIdeaListScreen}
        options={{
          headerStyle: {
            backgroundColor: RED,
          },
          headerTintColor: "#fff",
          title: "Idee proposte",
        }}
      />
      <HomeStack.Screen
        name="IdeaDetail"
        component={IdeaDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: BLUE,
          },
          headerTintColor: "#fff",
        }}
      />
      <HomeStack.Screen
        name="IdeaAdd"
        component={IdeaAddScreen}
        options={{
          headerStyle: {
            backgroundColor: BLUE,
          },
          headerTintColor: "#fff",
          title: "Crea Idea",
        }}
      />
      <HomeStack.Screen
        name="GroupIdeaSelect"
        component={GroupIdeaSelectScreen}
        options={{
          headerStyle: {
            backgroundColor: RED,
          },
          headerTintColor: "#fff",
          title: "Seleziona idee",
        }}
      />
      <HomeStack.Screen
        name="Attachments"
        component={AttachmentsScreen}
        options={{
          headerStyle: { backgroundColor: RED },
          headerTintColor: "#fff",
          title: "Allegati",
        }}
      />
      <HomeStack.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          headerStyle: { backgroundColor: GREEN },
          headerTintColor: "#fff",
          title: "Attività",
        }}
      />
      <HomeStack.Screen
        name="ActivityAdd"
        component={ActivityAddScreen}
        options={{
          headerStyle: { backgroundColor: GREEN },
          headerTintColor: "#fff",
          title: "Crea attività",
        }}
      />
      <HomeStack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{
          headerStyle: { backgroundColor: GREEN },
          headerTintColor: "#fff",
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
