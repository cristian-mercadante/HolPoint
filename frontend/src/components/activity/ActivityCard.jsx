import React, { Component, Fragment } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import "./style.css";
import { ProfileBadge } from "../misc";
import ActivityContent from "./ActivityContent";
import CardModal from "../../containers/CardModal";
import ConfirmModal from "../../containers/ConfirmModal";
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
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import axios from "axios";
import { activityAPI, activityCreatorAPI } from "../../server";

class ActivityCard extends Component {
  _isMounted = false;

  state = {
    showUpdate: false,
    showModalDelete: false,
    editing: false
  };

  showUpdate = () => this._isMounted && this.setState({ showUpdate: !this.state.showUpdate, editing: false });
  showModalDelete = () => this._isMounted && this.setState({ showModalDelete: !this.state.showModalDelete });
  showEditFormInModal = () => this._isMounted && this.setState({ editing: !this.state.editing });

  componentDidMount = () => (this._isMounted = true);
  componentWillUnmount = () => (this._isMounted = false);

  getCardIcon = () => {
    switch (this.props.activity.kind) {
      case "GEN": // Generico
        return <FaCalendarAlt />;
      case "SPO": // Spostamento
        return <FaCarAlt />;
      case "PER": // Pernottamento
        return <FaHome />;
      case "RIS": // Ristorante
        return <FaUtensils />;
      case "VIS": // Visita
        return <FaUniversity />;
      case "ESC": // Escursione
        return <FaMountain />;
      case "SVA": // Svago
        return <FaMusic />;
      case "ACQ": // Acquisti
        return <FaStore />;
      default:
        return "";
    }
  };

  doesCurrentUserOwnThisActivity = () => {
    if (this.props.activity.creator && this.props.currentUser.id === this.props.activity.creator.id) return true;
    else return false;
  };

  putActivity = (title, description, url, date, time, kind) => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .put(
        `${activityAPI}${this.props.group.id}/${this.props.activity.id}`,
        {
          title,
          description,
          url,
          date,
          time,
          kind
        },
        headers
      )
      .then(res => {
        if (this._isMounted) {
          this.props.updateActivityInState(res.data);
          this.showEditFormInModal();
        }
      })
      .catch(error => this.props.error(error));
  };

  deleteActivity = () => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .delete(`${activityCreatorAPI}${this.props.activity.id}/`, headers)
      .then(res => {
        if (this._isMounted) {
          this.props.removeActivityFromState(this.props.activity.id);
          // modal disappears on delete
          // no need to call "setState"
        }
      })
      .catch(error => this.props.error(error));
  };

  render() {
    const activity = this.props.activity;

    return (
      <Fragment>
        <Draggable key={this.props.activityId} draggableId={this.props.activity.id} index={this.props.index}>
          {(provided, snapshot) => (
            <Fragment>
              <Card
                onClick={this.showUpdate}
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
              <CardModal
                show={this.state.showUpdate}
                onHide={this.showUpdate}
                type="activity-modal"
                header={
                  <Fragment>
                    {this.getCardIcon()}
                    <span className="ml-3">{activity.title}</span>
                  </Fragment>
                }
                body={
                  <ActivityContent
                    {...this.props}
                    doesCurrentUserOwnThisActivity={this.doesCurrentUserOwnThisActivity}
                    putActivity={this.putActivity}
                    showEditFormInModal={this.showEditFormInModal}
                    showModalDelete={this.showModalDelete}
                    editing={this.state.editing}
                  />
                }
                footer={
                  <Fragment>
                    <ProfileBadge profile={this.props.activity.creator} variant="danger" />
                    <span className="float-right">{this.props.activity.date}</span>
                  </Fragment>
                }
              />
            </Fragment>
          )}
        </Draggable>
        <ConfirmModal show={this.state.showModalDelete} onHide={this.showModalDelete} onClick={this.deleteActivity} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCard);
