import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./style.css";

export default class Task extends Component {
  render() {
    return (
      <Draggable key={this.props.taskId} draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            className="activity noselect"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDragging ? "var(--holpoint-yellow)" : "white",
              ...provided.draggableProps.style
            }}
          >
            {this.props.task.description}
          </div>
        )}
      </Draggable>
    );
  }
}
