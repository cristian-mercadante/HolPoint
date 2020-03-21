import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import "./style.css";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

import axios from "axios";
import { activityAPI, activityCreatorAPI } from "../../server";

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

  addActivitiesToColumns = (activities, columns) => {
    activities.forEach(act => {
      if (act.date in columns) {
        columns[act.date].actIds.push(act.id);
      } else {
        columns["default"].actIds.push(act.id);
      }
    });
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

  componentDidMount() {
    this.getActivities().then(() => this.setState({ loading: false }));
  }

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
          {"Attività"} <ActivityCreateButton />
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
                return <Column key={column.id} column={column} activities={activities} />;
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
