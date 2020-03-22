import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import "./style.css";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

import axios from "axios";
import { activityAPI } from "../../server";

import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";

import { differenceInDays, incrementDate, dateToString_or_Null } from "../../dateUtils";
import ActivityCreateButton from "./ActivityCreateButton";

class ActivityManagerDND extends Component {
  state = {
    loading: true,
    activities: [],
    columns: {
      default: {
        id: "default",
        title: "Non assegnate",
        actIds: []
      }
    },
    columnOrder: ["default"]
  };

  componentDidMount() {
    this.getActivities().then(() => this.setState({ loading: false }));
  }

  createColumnsFromDates = (dateStart, dateFinish) => {
    let { columns, columnOrder } = this.state;
    for (let i = 0; i < differenceInDays(dateStart, dateFinish); i++) {
      let columnId = dateToString_or_Null(incrementDate(dateStart, i));
      columns[columnId] = {
        id: columnId,
        title: columnId,
        actIds: []
      };
      columnOrder.push(columnId);
    }
    this.setState(columnOrder);
    return columns;
  };

  compareIndexes = (a, b) => {
    if (a.index > b.index) return 1;
    if (b.index > a.index) return -1;
    return 0;
  };

  addActivitiesToColumns = (activities, columns) => {
    activities.forEach(act => {
      // for each activity, put its id into the corresponding column
      if (act.date in columns) {
        !columns[act.date].actIds.includes(act.id) && columns[act.date].actIds.push(act.id);
      } else {
        !columns["default"].actIds.includes(act.id) && columns["default"].actIds.push(act.id);
      }
    });
    for (let col in columns) {
      // for each column, sort activities by index
      columns[col].actIds = columns[col].actIds.map(aId => activities.find(act => act.id === aId));
      columns[col].actIds.sort(this.compareIndexes);
      // then list only activity.id
      columns[col].actIds = columns[col].actIds.map(a => a.id);
    }
    return columns;
  };

  getActivities = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .get(`${activityAPI}${this.props.group.id}/0`, headers)
      .then(res => {
        const { dateStart, dateFinish } = this.props;
        let columns = this.createColumnsFromDates(dateStart, dateFinish, res.data);
        columns = this.addActivitiesToColumns(res.data, columns);
        this.setState({ activities: res.data, columns });
      })
      .catch(error => this.props.error(error));
  };

  putActivityIndex = activity => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .put(`${activityAPI}${this.props.group.id}/${activity.id}`, { index: activity.index }, headers)
      .then(res => this.updateActivityInState(res.data)) // FIXME: se facciamo un aggiornamento a livello di colonna, allora non serve più aggiornare qua
      .catch(error => this.props.error(error));
  };

  reIndexActivitiesInColum = column => {
    let activities = this.state.activities;
    let columnActivities = column.actIds.map(activityId => activities.find(activity => activityId === activity.id));
    console.log(columnActivities);
    columnActivities.forEach((activity, index) => {
      activity.index = index;
      index++;
      this.putActivityIndex(activity);
      return activity;
    });
    for (let colAct in columnActivities) {
      let i = activities.findIndex(a => a.id === colAct.id);
      if (i !== -1) activities[i] = colAct;
    }
    console.log(activities);
    this.setState({ activities });
    // returns array of activities (not an array of activity ids)
    return columnActivities;
  };

  addActivityToState = activity => {
    const activities = [...this.state.activities, activity];
    let columns = this.state.columns;
    columns = this.addActivitiesToColumns(activities, columns);
    this.setState({ activities, columns });
  };

  removeActivityFromState = activityId => {
    const activities = this.state.activities.filter(act => act.id !== activityId);
    const columns = this.state.columns;
    for (let colKey in columns) {
      const index = columns[colKey].actIds.indexOf(activityId);
      if (index > -1) {
        columns[colKey].actIds.splice(index, 1);
        break;
      }
    }
    this.setState({ activities, columns });
  };

  updateActivityInState = updatedActivity => {
    const { activities, columns } = this.state;
    let index = activities.findIndex(act => act.id === updatedActivity.id);
    let oldColumn = "default";
    if (index > -1) {
      oldColumn = activities[index].date ? activities[index].date : "default";
      activities[index] = updatedActivity;
    } else {
      console.log("not found act");
      return;
    }
    const newColumn = updatedActivity.date ? updatedActivity.date : "default";
    console.log("oldcolumn " + oldColumn);
    console.log("newcolumn " + newColumn);
    if (newColumn !== oldColumn) {
      index = columns[oldColumn].actIds.indexOf(updatedActivity.id);
      columns[oldColumn].actIds.splice(index, 1);
      columns[newColumn].actIds.push(updatedActivity.id);
    }
    this.setState({ activities, columns });
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // console.log("destination: ");
    // console.log(destination);
    // console.log("source: ");
    // console.log(source);

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = [...start.actIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      console.log(destination);

      const newColumn = {
        ...start,
        actIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };

      this.setState(newState);
      // QUERY DATABASE HERE
      return;
    }

    //moving from one list to another
    const startTaskIds = [...start.actIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      actIds: startTaskIds
    };

    const finishTaskIds = [...finish.actIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      actIds: finishTaskIds
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };

  render() {
    return (
      <div style={{ marginTop: "10px", marginBottom: "20px" }}>
        <h1>
          {"Attività"}{" "}
          <ActivityCreateButton
            group={this.props.group}
            addActivityToState={this.addActivityToState}
            dateStart={this.props.dateStart}
            dateFinish={this.props.dateFinish}
          />
        </h1>
        {this.state.loading ? (
          <ProgressBar striped variant="success" now={100} animated />
        ) : (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="hs noselect">
              {this.state.columnOrder.map(columnId => {
                const column = this.state.columns[columnId];
                const activities = column.actIds.map(activityId =>
                  this.state.activities.find(activity => activity.id === activityId)
                );
                return (
                  <Column
                    key={column.id}
                    column={column}
                    activities={activities}
                    addActivityToState={this.addActivityToState}
                    updateActivityInState={this.updateActivityInState}
                    removeActivityFromState={this.removeActivityFromState}
                    group={this.props.group}
                    dateStart={this.props.dateStart}
                    dateFinish={this.props.dateFinish}
                  />
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error))
  };
};

export default connect(null, mapDispatchToProps)(ActivityManagerDND);
