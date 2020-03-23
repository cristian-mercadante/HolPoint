import React, { Component } from "react";
import ActivityCard from "./ActivityCard";
import { Droppable } from "react-beautiful-dnd";
import ActivityCreateButton from "./ActivityCreateButton";
import { stringToDate_or_Null } from "../../dateUtils";
import { ButtonGroup, Button } from "react-bootstrap";
import { FaClock } from "react-icons/fa";

export default class ActivityColumn extends Component {
  render() {
    return (
      <div>
        <div>
          <div className="title">
            {this.props.column.title}
            {this.props.column.id !== "default" && (
              <ButtonGroup className="float-right">
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => this.props.sortActivityIndexesByTime(this.props.column)}
                >
                  <FaClock />
                </Button>
                <ActivityCreateButton
                  size="sm"
                  columnDate={stringToDate_or_Null(this.props.column.title)}
                  group={this.props.group}
                  addActivityToState={this.props.addActivityToState}
                  dateStart={this.props.dateStart}
                  dateFinish={this.props.dateFinish}
                />
              </ButtonGroup>
            )}
          </div>
        </div>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              className="column"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "var(--holpoint-red)" : "var(--holpoint-light-green)",
                borderColor: snapshot.isDraggingOver ? "var(--holpoint-dark-red)" : "var(--holpoint-green)"
              }}
            >
              {this.props.activities.map((activity, index) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  group={this.props.group}
                  index={index}
                  updateActivityInState={this.props.updateActivityInState}
                  removeActivityFromState={this.props.removeActivityFromState}
                  dateStart={this.props.dateStart}
                  dateFinish={this.props.dateFinish}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
