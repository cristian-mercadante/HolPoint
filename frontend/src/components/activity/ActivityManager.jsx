import React, { Component } from "react";
import { differenceInDays, incrementDate, dateToString_or_Null } from "../../dateUtils";
import "./style.css";

export default class ActivityManager extends Component {
  showColumns = () => {
    const { dateStart, dateFinish } = this.props;
    const n = differenceInDays(dateStart, dateFinish);
    let buffer = [];
    for (let i = 0; i < n; i++) {
      buffer.push(
        <div key={i} className="column">
          <div className="title">{dateToString_or_Null(incrementDate(dateStart, i))}</div>
        </div>
      );
    }
    return (
      <div className="column-container">
        <section className="hs">{buffer}</section>
      </div>
    );
  };

  render() {
    return <div>{this.showColumns()}</div>;
  }
}
