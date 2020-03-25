import React, { Component } from "react";
import "../assets/css/font.css";

export default class NotFound404 extends Component {
  style = {
    fontFamily: "'Rancho', cursive",
    textAlign: "center",
    marginTop: "60px",
    marginBottom: "-20px"
  };

  render() {
    return (
      <div style={this.style}>
        <div style={{ fontSize: "100px", color: "var(--holpoint-blue)" }}>404</div>
        <div style={{ fontSize: "50px", color: "var(--holpoint-red)" }}>not found :(</div>
      </div>
    );
  }
}
