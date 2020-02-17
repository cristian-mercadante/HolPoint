import React, { Component } from "react";
import { connect } from "react-redux";
import * as alertActions from "../../actions/alerts";
import { Alert } from "react-bootstrap";

class AlertComponent extends Component {
  render() {
    const { alert } = this.props;

    return (
      <Alert variant={alert.style} key={alert.id} onClose={() => this.props.removeAlert(alert.id)} dismissible>
        {alert.text}
      </Alert>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeAlert: id => dispatch(alertActions.removeAlert(id))
  };
};

export default connect(null, mapDispatchToProps)(AlertComponent);
