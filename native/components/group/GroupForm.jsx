import React, { useState, useEffect } from "react";
import { GREEN, RED, YELLOW } from "../../colors";
import TextInputLabel from "../misc/TextInputLabel";
import RoundedButton from "../misc/RoundedButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dateToString_or_Null, stringToDate_or_Null } from "../../dateUtils";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import FriendTag from "../profile/FriendTag";
import { Switch, View, Text } from "react-native";

const getProfileList = (profiles, friends, creatorId = null) => {
  let list = [];
  if (friends) {
    let friendIds = friends.map(f => f.id);
    let notFriends = profiles.filter(p => !friendIds.includes(p.id));
    list = friends.concat(notFriends);
  } else {
    list = friends;
  }
  list = list.filter(p => p.id !== creatorId);
  return list;
};

const GroupForm = props => {
  const navigation = useNavigation();

  const [name, setName] = useState(props.group?.name || "");
  const [description, setDescription] = useState(props.group?.description || "");
  const [profiles, setProfiles] = useState(props.group?.profiles || []);
  const [date_start, setDateStart] = useState(stringToDate_or_Null(props.group?.date_start) || new Date());
  const [show_start, setShowStart] = useState(false);
  const [date_finish, setDateFinish] = useState(stringToDate_or_Null(props.group?.date_finish) || new Date(date_start));
  const [show_finish, setShowFinish] = useState(false);

  const [null_date_start, setNullDateStart] = useState(stringToDate_or_Null(props.group?.date_start) === null);
  const [null_date_finish, setNullDateFinish] = useState(stringToDate_or_Null(props.group?.date_finish) === null);

  useEffect(() => {
    if (props.routeParams?.selectedFriends) {
      setProfiles(props.routeParams.selectedFriends);
    }
  });

  let list = [];
  if (props.friends) {
    list = getProfileList(profiles, props.friends, props.group?.creator.id);
  }

  return (
    <>
      <TextInputLabel
        borderColor={RED}
        placeholder="Nome"
        onChangeText={text => setName(text)}
        value={name}
        placeholderTextColor="#777"
      />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 3 }}>
          <RoundedButton
            title={`Partenza ${dateToString_or_Null(date_start) || "non definita"}`}
            onPress={() => setShowStart(true)}
            color="#fff"
            backgroundColor={RED}
            icon="calendar-alt"
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ textAlign: "right", marginRight: 10, fontSize: 15 }}>N/D</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#faaa9b" }}
            thumbColor={null_date_start ? RED : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNullDateStart}
            value={null_date_start}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 3 }}>
          <RoundedButton
            title={`Ritorno ${dateToString_or_Null(date_finish) || "non definito"}`}
            onPress={() => setShowFinish(true)}
            color="#fff"
            backgroundColor={RED}
            icon="calendar-alt"
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ textAlign: "right", marginRight: 10, fontSize: 15 }}>N/D</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#faaa9b" }}
            thumbColor={null_date_finish ? RED : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNullDateFinish}
            value={null_date_finish}
          />
        </View>
      </View>

      <TextInputLabel
        multiline={true}
        borderColor={RED}
        placeholder="Descrizione"
        onChangeText={text => setDescription(text)}
        value={description}
        placeholderTextColor="#777"
      />
      <RoundedButton
        title="Partecipanti"
        onPress={() =>
          navigation.navigate("GroupAddFriend", {
            friends: list,
            selectedFriends: profiles,
            fromScreen: props.fromScreen,
          })
        }
        backgroundColor={YELLOW}
        color="#000"
      />
      {profiles
        .filter(p => p.id !== props.group?.creator.id)
        .map(p => (
          <FriendTag username={p.username} key={p.id} />
        ))}
      <RoundedButton
        title="Invia"
        onPress={() =>
          props
            .handleSubmit(
              name,
              description,
              profiles.map(p => p.id),
              null_date_start ? null : dateToString_or_Null(date_start),
              null_date_finish ? null : dateToString_or_Null(date_finish),
              props.group ? props.group.ideas.map(i => i.id) : []
            )
            .then(ok => {
              if (ok === "ok") {
                setName("");
                setDescription("");
                setProfiles([]);
                setDateStart(new Date());
                setDateFinish(new Date());
              }
            })
        }
        backgroundColor={GREEN}
        color="#fff"
      />
      {show_start && (
        <DateTimePicker
          testID="groupAdd_DatePickerStart"
          timeZoneOffsetInMinutes={0}
          value={date_start}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date_start;
            setShowStart(Platform.OS === "ios");
            setNullDateStart(false);
            setDateStart(currentDate);
          }}
        />
      )}
      {show_finish && (
        <DateTimePicker
          testID="groupAdd_DatePickerFinish"
          timeZoneOffsetInMinutes={0}
          value={date_finish}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date_finish;
            setShowFinish(Platform.OS === "ios");
            setNullDateFinish(false);
            setDateFinish(currentDate);
          }}
        />
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    friends: state.currentUser.profile.friends,
  };
};

export default connect(mapStateToProps)(GroupForm);
