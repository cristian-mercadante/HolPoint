import React, { Component } from "react";
import Task from "./Task";
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
              style={{ backgroundColor: snapshot.isDraggingOver && "var(--holpoint-red)" }}
            >
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
