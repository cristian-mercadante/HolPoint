import React, { Component } from "react";

class Panel extends Component {
  divStyle = {
    marginTop: "10px",
    marginBottom: "20px"
  };

  render() {
    return (
      <div style={this.divStyle}>
        <h1 className="display-4">{this.props.title}</h1>
        {this.props.component}
      </div>
    );
  }
}

export default Panel;
