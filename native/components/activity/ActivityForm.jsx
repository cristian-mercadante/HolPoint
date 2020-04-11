import React, { useState } from "react";
import { View, Text, Switch, Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  stringToDate_or_Null,
  stringToTime_or_Null,
  dateToString_or_Null,
  timeToString_or_Null,
} from "../../dateUtils";
import TextInputLabel from "../misc/TextInputLabel";
import { GREEN, DARK_GREEN, YELLOW } from "../../colors";
import RoundedButton from "../misc/RoundedButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KIND_CHOICES } from "./kindChoices";
import { FontAwesome5 } from "@expo/vector-icons";

const ActivityForm = props => {
  const [title, setTitle] = useState(props.activity?.title || "");
  const [description, setDescription] = useState(props.activity?.description || "");
  const [kind, setKind] = useState(props.activity?.kind || "GEN");
  const [date, setDate] = useState(stringToDate_or_Null(props.activity?.date) || new Date());
  const [showDate, setShowDate] = useState(false);
  const [time, setTime] = useState(stringToTime_or_Null(props.activity?.time) || new Date());
  const [showTime, setShowTime] = useState(false);
  const [nullDate, setNullDate] = useState(stringToDate_or_Null(props.activity?.date) === null);
  const [nullTime, setNullTime] = useState(stringToTime_or_Null(props.activity?.time) === null);
  const [url, setUrl] = useState(props.activity?.url || "");

  return (
    <>
      {/* title */}
      <TextInputLabel
        borderColor={GREEN}
        placeholder="Titolo"
        onChangeText={text => setTitle(text)}
        value={title}
        placeholderTextColor="#777"
      />

      {/* kind */}
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
        <FontAwesome5 name={KIND_CHOICES[kind].icon} size={20} color="#000" />
        <Picker
          selectedValue={kind}
          style={{ height: 50, width: "50%" }}
          onValueChange={(itemValue, itemIndex) => setKind(itemValue)}
        >
          {Object.keys(KIND_CHOICES).map((key, index) => (
            <Picker.Item label={KIND_CHOICES[key].name} value={KIND_CHOICES[key].kind} key={key} />
          ))}
        </Picker>
      </View>

      {/* date */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 3 }}>
          <RoundedButton
            title={`Data ${!nullDate ? dateToString_or_Null(date) : "non definita"}`}
            onPress={() => setShowDate(true)}
            color="#fff"
            backgroundColor={GREEN}
            icon="calendar-alt"
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ textAlign: "right", marginRight: 10, fontSize: 15 }}>N/D</Text>
          <Switch
            trackColor={{ false: "#767577", true: DARK_GREEN }}
            thumbColor={nullDate ? GREEN : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNullDate}
            value={nullDate}
          />
        </View>
      </View>

      {/* time */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 3 }}>
          <RoundedButton
            title={`Ora ${!nullTime ? timeToString_or_Null(time) : "non definita"}`}
            onPress={() => setShowTime(true)}
            color="#fff"
            backgroundColor={GREEN}
            icon="clock"
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ textAlign: "right", marginRight: 10, fontSize: 15 }}>N/D</Text>
          <Switch
            trackColor={{ false: "#767577", true: DARK_GREEN }}
            thumbColor={nullTime ? GREEN : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNullTime}
            value={nullTime}
          />
        </View>
      </View>

      {/* url */}
      <TextInputLabel
        borderColor={GREEN}
        placeholder="URL"
        onChangeText={text => setUrl(text)}
        value={url}
        placeholderTextColor="#777"
      />

      {/* description */}
      <TextInputLabel
        multiline={true}
        borderColor={GREEN}
        placeholder="Descrizione"
        onChangeText={text => setDescription(text)}
        value={description}
        placeholderTextColor="#777"
      />

      {/* SUBMIT */}
      <RoundedButton
        title="Invia"
        onPress={() =>
          props
            .handleSubmit(
              title,
              description,
              url,
              nullDate ? null : dateToString_or_Null(date),
              nullTime ? null : timeToString_or_Null(time),
              kind
            )
            .then(ok => {
              if (ok === "ok") {
                setTitle("");
                setDescription("");
                setUrl("");
                setKind("GEN");
                setDate(new Date());
                setTime(new Date());
              }
            })
        }
        backgroundColor={YELLOW}
        color="#000"
      />

      {showDate && (
        <DateTimePicker
          testID="activityAdd_datepicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode="date"
          minimumDate={stringToDate_or_Null(props.group.date_start)}
          maximumDate={stringToDate_or_Null(props.group.date_finish)}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDate(Platform.OS === "ios");
            setNullDate(false);
            setDate(currentDate);
          }}
        />
      )}
      {showTime && (
        <DateTimePicker
          testID="activityAdd_timepicker"
          timeZoneOffsetInMinutes={0}
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedTime) => {
            const currentTime = selectedTime || time;
            setShowTime(Platform.OS === "ios");
            setNullTime(false);
            setTime(currentTime);
          }}
        />
      )}
    </>
  );
};

export default ActivityForm;
