import React, { Component, Fragment } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ActivityForm from "./ActivityForm";
import CommentSection from "../comment/CommentSection";
import { KIND_CHOICES } from "./kindChoices";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import {
  dateToString_or_Null,
  timeToString_or_Null,
  stringToDate_or_Null,
  stringToTime_or_Null,
  validateDateInBetween
} from "../../dateUtils";

class ActivityContent extends Component {
  state = {
    date: stringToDate_or_Null(this.props.activity.date),
    time: stringToTime_or_Null(this.props.activity.time)
  };

  setDate = date => this.setState({ date });
  setTime = time => this.setState({ time });

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = form.title.value;
    const description = form.description.value;
    const url = form.url.value;
    const kind = form.kind.value;
    let { date, time } = this.state;
    if (!validateDateInBetween(date, this.props.dateStart, this.props.dateFinish, this.props.addAlert)) return;
    date = dateToString_or_Null(date);
    time = timeToString_or_Null(time);
    this.props.putActivity(title, description, url, date, time, kind);
  };

  render() {
    const activity = this.props.activity;

    return (
      <Fragment>
        <ButtonGroup className="float-right">
          <Button variant="warning" onClick={this.props.showEditFormInModal}>
            {this.props.editing ? "Annulla" : "Modifica"}
          </Button>
          {this.props.doesCurrentUserOwnThisActivity() && (
            <Button variant="danger" onClick={this.props.showModalDelete}>
              Elimina
            </Button>
          )}
        </ButtonGroup>
        {this.props.editing ? (
          <ActivityForm
            onSubmit={this.handleSubmit}
            date={this.state.date}
            time={this.state.time}
            setDate={this.setDate}
            setTime={this.setTime}
            defaultTitle={activity.title}
            defaultDescription={activity.description}
            defaultUrl={activity.url}
            defaultKind={activity.kind}
          />
        ) : (
          <Fragment>
            <h6>Categoria: {KIND_CHOICES[activity.kind].name}</h6>
            <h6>Data: {activity.date ? activity.date : "Non definita"}</h6>
            <h6>Ora: {activity.time ? activity.time : "Non definita"}</h6>
            {activity.url && (
              <h6 className="activity-url">
                URL: <a href={activity.url}>{activity.url}</a>
              </h6>
            )}
            {activity.description && (
              <Fragment>
                <h3>Descrizione</h3>
                <div className="lead text-with-newline">{activity.description}</div>
              </Fragment>
            )}
          </Fragment>
        )}
        <CommentSection id={this.props.activity.id} kind="activity" />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style))
  };
};

export default connect(null, mapDispatchToProps)(ActivityContent);
