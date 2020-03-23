import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import "./style.css";
import ActivityColumn from "./ActivityColumn";
import { DragDropContext } from "react-beautiful-dnd";

import axios from "axios";
import { activityAPI } from "../../server";

import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";

import { differenceInDays, incrementDate, dateToString_or_Null, stringToTime_or_Null } from "../../dateUtils";
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

  /* Given start and finish date,
  creates columns and returns them.
  Does not set them in state*/
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
    this.setState({ columnOrder });
    return columns;
  };

  compareIndexes = (a, b) => {
    if (a.index > b.index) return 1;
    if (b.index > a.index) return -1;
    return 0;
  };

  /* Takes list of activities and all columns.
  Pushes activity ids to column.actIds, only if not already there.
  Then, sorts each column on activity.index property (from lower to higher).
  Returns all the columns updated */
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

  putActivityIndexDate = activity => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .put(
        `${activityAPI}${this.props.group.id}/${activity.id}`,
        { index: activity.index, date: activity.date },
        headers
      )
      .catch(error => this.props.error(error));
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
      console.error("Activity not found.");
      return;
    }
    const newColumn = updatedActivity.date ? updatedActivity.date : "default";
    if (newColumn !== oldColumn) {
      index = columns[oldColumn].actIds.indexOf(updatedActivity.id);
      columns[oldColumn].actIds.splice(index, 1);
      columns[newColumn].actIds.push(updatedActivity.id);
    }
    this.setState({ activities, columns });
  };

  /* Takes a column and for each actIds, updates the corresponding in
  this.state.activities index property, according to actIds position
  (i.e. index in forEach loop) */
  updateActivityIndexesInState = column => {
    let activities = [...this.state.activities];
    column.actIds.forEach((actId, index) => {
      let i = activities.findIndex(a => a.id === actId);
      // if activities[i] exists AND (new index is different OR new column is different), then...
      if (i > -1 && (activities[i].index !== index || activities[i].date !== column.id)) {
        activities[i].index = index;
        activities[i].date = column.id !== "default" ? column.id : null;
        this.putActivityIndexDate(activities[i]);
      }
    });
    this.setState({ activities });
  };

  compareTime = (a, b) => {
    const a_ = stringToTime_or_Null(a.time);
    const b_ = stringToTime_or_Null(b.time);
    if (a_ > b_) return 1;
    if (b_ > a_) return -1;
    return 0;
  };

  sortActivityIndexesByTime = column => {
    let colActivities = column.actIds.map(actId => this.state.activities.find(a => a.id === actId));
    colActivities.sort(this.compareTime);
    column.actIds = colActivities.map(ca => ca.id);
    this.updateActivityIndexesInState(column);
    this.setState({
      columns: {
        ...this.state.columns,
        [column.id]: column
      }
    });
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    if (start === finish) {
      const newActIds = [...start.actIds];
      newActIds.splice(source.index, 1);
      newActIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, actIds: newActIds };
      this.updateActivityIndexesInState(newColumn);
      const newState = { ...this.state, columns: { ...this.state.columns, [newColumn.id]: newColumn } };
      this.setState(newState);
      return;
    }

    //moving from one column to another
    const startActIds = [...start.actIds];
    startActIds.splice(source.index, 1);
    const newStart = { ...start, actIds: startActIds };
    this.updateActivityIndexesInState(newStart);

    const finishActIds = [...finish.actIds];
    finishActIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, actIds: finishActIds };
    this.updateActivityIndexesInState(newFinish);

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
                  <ActivityColumn
                    key={column.id}
                    column={column}
                    activities={activities}
                    addActivityToState={this.addActivityToState}
                    updateActivityInState={this.updateActivityInState}
                    removeActivityFromState={this.removeActivityFromState}
                    group={this.props.group}
                    dateStart={this.props.dateStart}
                    dateFinish={this.props.dateFinish}
                    sortActivityIndexesByTime={this.sortActivityIndexesByTime}
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
