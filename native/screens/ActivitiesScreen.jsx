import React, { Component } from "react";
import { Text, View, SectionList, StyleSheet, RefreshControl } from "react-native";
import ActivityCard from "../components/activity/ActivityCard";
import H1WithButton from "../components/misc/H1WithButton";
import RoundedButton from "../components/misc/RoundedButton";
import Spinner from "../components/misc/Spinner";
import { GREEN } from "../colors";
import { connect } from "react-redux";
import * as alertActions from "../actions/alerts";
import axios from "axios";
import { activityAPI } from "../server";
import { differenceInDays, stringToDate_or_Null, dateToString_or_Null, incrementDate } from "../dateUtils";
import { KIND_CHOICES } from "../components/activity/kindChoices";

class ActivitiesScreen extends Component {
  state = {
    loading: true,
    activities: [],
    sections: [],
    refreshing: false,
  };

  componentDidMount() {
    this.getActivities().then(() => this.setState({ loading: false }));
  }

  compareIndexes = (a, b) => {
    if (a.index > b.index) return 1;
    if (b.index > a.index) return -1;
    return 0;
  };

  createSections = (activities, dateStart, dateFinish) => {
    let sections = this.state.sections;
    for (let i = 0; i < differenceInDays(dateStart, dateFinish); i++) {
      let sectionTitle = dateToString_or_Null(incrementDate(dateStart, i));
      sections.push({
        title: sectionTitle,
        date: stringToDate_or_Null(sectionTitle),
        data: activities.filter(act => act.date === sectionTitle).sort(this.compareIndexes),
      });
    }
    sections.push({
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
        this.setState({ activities: res.data, loading: false, sections });
      })
      .catch(error => this.props.error(error));
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.getActivities().then(() => this.setState({ refreshing: false }));
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
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
            ListHeaderComponent={
              <View style={{ marginTop: 15 }}>
                <RoundedButton
                  title="Crea"
                  backgroundColor={GREEN}
                  color="#fff"
                  onPress={() => this.props.navigation.navigate("ActivityAdd")}
                />
              </View>
            }
            sections={this.state.sections}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            renderItem={({ item }) => <ActivityCard activity={item} icon={KIND_CHOICES.icon} />}
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
