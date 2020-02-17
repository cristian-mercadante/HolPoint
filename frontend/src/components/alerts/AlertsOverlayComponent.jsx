import React, { Component } from "react";

class AlertsOverlayComponent extends Component {
  renderAlerts = (alerts, children) => {
    return alerts.map(alert => {
      return React.cloneElement(children, { alert: alert, key: alert.id });
    });
  };

  render() {
    var { alerts, children } = this.props;
    return <div>{this.renderAlerts(alerts, children)}</div>;
  }
}

export default AlertsOverlayComponent;
