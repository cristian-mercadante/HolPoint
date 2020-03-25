import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import CardModal from "../../containers/CardModal";

import axios from "axios";
import { activityCreatorAPI } from "../../server";
import { dateToString_or_Null, timeToString_or_Null, validateDateInBetween } from "../../dateUtils";

import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import ActivityForm from "./ActivityForm";

class ActivityCreateButton extends Component {
  state = {
    showCreate: false,
    date: null,
    time: null
  };

  showCreate = () => this.setState({ showCreate: !this.state.showCreate });
  setDate = date => this.setState({ date });
  setTime = time => this.setState({ time });

  componentDidMount() {
    if (this.props.columnDate) this.setState({ date: this.props.columnDate });
  }

  postActivity = (title, description, url, date, time, kind) => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .post(
        activityCreatorAPI,
        {
          group: this.props.group.id,
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
        this.props.addActivityToState(res.data);
        this.showCreate();
      })
      .catch(error => this.props.error(error));
  };

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
    this.postActivity(title, description, url, date, time, kind);
  };

  render() {
    return (
      <Fragment>
        <Button
          variant="plain"
          style={{ backgroundColor: "var(--holpoint-green)", color: "white" }}
          onClick={this.showCreate}
          size={this.props.size}
          className={this.props.className}
        >
          Crea
        </Button>
        <CardModal
          show={this.state.showCreate}
          type="activity-modal"
          header="Crea Attività"
          onHide={this.showCreate}
          body={
            <ActivityForm
              onSubmit={this.handleSubmit}
              date={this.state.date}
              time={this.state.time}
              setDate={this.setDate}
              setTime={this.setTime}
            />
          }
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    error: error => dispatch(alertActions.error(error)),
    addAlert: (text, style) => dispatch(alertActions.addAlert(text, style))
  };
};

export default connect(null, mapDispatchToProps)(ActivityCreateButton);
