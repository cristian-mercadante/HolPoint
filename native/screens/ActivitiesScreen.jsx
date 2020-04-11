import React, { Component } from "react";
import { Text, View, SectionList, StyleSheet } from "react-native";
import ActivityCard from "../components/activity/ActivityCard";
import RoundedButton from "../components/misc/RoundedButton";
import Spinner from "../components/misc/Spinner";
import { GREEN, BLUE } from "../colors";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import axios from "axios";
import { activityAPI } from "../server";
import {
  differenceInDays,
  stringToDate_or_Null,
  dateToString_or_Null,
  incrementDate,
  stringToTime_or_Null,
} from "../dateUtils";
import { KIND_CHOICES } from "../components/activity/kindChoices";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

class ActivitiesScreen extends Component {
  state = {
    loading: true,
    activities: [],
    sections: [],
  };

  componentDidMount() {
    this.getActivities().then(() => this.setState({ loading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.route.params?.activity !== this.props.route.params?.activity) {
      let activity = this.props.route.params.activity;
      this.updateOrAddActivityInSection(activity);
    }
  }

  updateOrAddActivityInSection = activity => {
    let { activities, sections } = this.state;

    // this.state.activities
    let index = activities.findIndex(a => a.id === activity.id);
    if (index > -1) {
      // update
      activities[index] = activity;
    } else {
      // add
      activities.push(activity);
    }

    // this.state.sections
    const activityDate = activity.date; // string
    index = sections.findIndex(s => s.title === activityDate);
    console.log(index);
    if (index > -1) {
      // if section exists
      const i = sections[index].data.findIndex(d => d.id === activity.id);
      if (i > -1) {
        // update
        sections[index].data[i] = activity;
      } else {
        // add
        sections[index].data.push(activity);
      }
      //sort by index
      sections[index].data.sort(this.compareIndexes);
    } else {
      // use 'default' section
      const i = sections[sections.length - 1].data.findIndex(d => d.id === activity.id);
      if (i > -1) {
        // update
        sections[sections.length - 1].data[i] = activity;
      } else {
        // add
        sections[sections.length - 1].data.push(activity);
      }
      //sort by index
      sections[sections.length - 1].data.sort(this.compareIndexes);
    }

    this.setState({ sections, activities });
  };

  putActivityIndex = activity => {
    const headers = { headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` } };
    return axios
      .put(`${activityAPI}${this.props.route.params.group.id}/${activity.id}`, { index: activity.index }, headers)
      .catch(error => this.props.error(error));
  };

  compareIndexes = (a, b) => {
    if (a.index > b.index) return 1;
    if (b.index > a.index) return -1;
    return 0;
  };

  compareTime = (a, b) => {
    const a_ = stringToTime_or_Null(a.time);
    const b_ = stringToTime_or_Null(b.time);
    if (a_ > b_) return 1;
    if (b_ > a_) return -1;
    return 0;
  };

  sortActivityIndexesByTime = sectionIndex => {
    let { activities, sections } = this.state;
    sections[sectionIndex].data.sort(this.compareTime);
    sections[sectionIndex].data.forEach((d, i) => {
      d.index = i;
      activities.filter(a => a.id === d.id)[0].index = i;
      this.putActivityIndex(d);
    });
    this.setState({ sections, activities });
  };

  createSections = (activities, dateStart, dateFinish) => {
    let sections = this.state.sections;
    for (let i = 0; i < differenceInDays(dateStart, dateFinish); i++) {
      let sectionTitle = dateToString_or_Null(incrementDate(dateStart, i));
      sections.push({
        index: i,
        title: sectionTitle,
        date: stringToDate_or_Null(sectionTitle),
        data: activities.filter(act => act.date === sectionTitle).sort(this.compareIndexes),
      });
    }
    sections.push({
      index: differenceInDays(dateStart, dateFinish),
      title: "Non assegnate",
      date: null,
      data: activities.filter(act => act.date === null),
    });
    return sections;
  };

  getActivities = () => {
    const headers = {
      headers: { "Content-Type": "application/json", Authorization: `Token ${this.props.token}` },
    };
    const group = this.props.route.params.group;
    return axios
      .get(`${activityAPI}${group.id}/0`, headers)
      .then(res => {
        dateStart = stringToDate_or_Null(group.date_start);
        dateFinish = stringToDate_or_Null(group.date_finish);
        const sections = this.createSections(res.data, dateStart, dateFinish);
        this.setState({ activities: res.data, sections, loading: false });
      })
      .catch(error => this.props.error(error));
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Spinner color={GREEN} />
          </View>
        ) : (
          <SectionList
            ListHeaderComponent={
              <View style={{ marginTop: 15 }}>
                <RoundedButton
                  title="Crea"
                  backgroundColor={GREEN}
                  color="#fff"
                  onPress={() =>
                    this.props.navigation.navigate("ActivityAdd", { group: this.props.route.params.group })
                  }
                />
              </View>
            }
            sections={this.state.sections}
            renderSectionHeader={({ section: { title, index } }) => (
              <View style={styles.sectionHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionHeaderText}>{title}</Text>
                </View>
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.sortActivityIndexesByTime(index)}>
                  <FontAwesome5 name="clock" size={20} color={BLUE} />
                </TouchableOpacity>
              </View>
            )}
            renderItem={({ item }) => (
              <ActivityCard activity={item} icon={KIND_CHOICES[item.kind].icon} group={this.props.route.params.group} />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 5,
    backgroundColor: "#c8e0d7",
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesScreen);
