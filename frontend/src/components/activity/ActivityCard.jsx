import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import "./style.css";
import { ProfileBadge } from "../misc";
import {
  FaCalendarAlt,
  FaCarAlt,
  FaHome,
  FaUtensils,
  FaUniversity,
  FaMountain,
  FaMusic,
  FaStore
} from "react-icons/fa";

export default class ActivityCard extends Component {
  getCardIcon = () => {
    /*
    ('GEN', 'Generico'),
    ('SPO', 'Spostamento'),
    ('PER', 'Pernottamento'),
    ('RIS', 'Ristorante'),
    ('VIS', 'Visita'),
    ('ESC', 'Escursione'),
    ('SVA', 'Svago'),
    ('ACQ', 'Acquisti'),
     */
    switch (this.props.activity.kind) {
      case "GEN":
        return <FaCalendarAlt />;
      case "SPO":
        return <FaCarAlt />;
      case "PER":
        return <FaHome />;
      case "RIS":
        return <FaUtensils />;
      case "VIS":
        return <FaUniversity />;
      case "ESC":
        return <FaMountain />;
      case "SVA":
        return <FaMusic />;
      case "ACQ":
        return <FaStore />;
      default:
        return "";
    }
  };

  render() {
    const activity = this.props.activity;

    return (
      <Draggable key={this.props.activityId} draggableId={this.props.activity.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Card
            className="activity-card mb-2"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDragging ? "var(--holpoint-yellow)" : "var(--holpoint-green)",
              ...provided.draggableProps.style
            }}
          >
            <Card.Header>
              {this.getCardIcon()}
              <span className="float-right">{activity.title}</span>
            </Card.Header>
            <Card.Footer>
              <ProfileBadge profile={activity.creator} variant="danger" />
              <span className="float-right">{activity.date || "N/D"}</span>
            </Card.Footer>
          </Card>
        )}
      </Draggable>
    );
  }
}
