import React, { Component } from "react";
import ActivityCard from "./ActivityCard";
import { Droppable } from "react-beautiful-dnd";

export default class Column extends Component {
  render() {
    return (
      <div>
        <div className="title">{this.props.column.title}</div>
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
                <ActivityCard key={activity.id} activity={activity} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
