import React, { Component } from "react";

class Panel extends Component {
  divStyle = {
    marginTop: "10px",
    marginBottom: "20px"
  };

  render() {
    return (
      <div style={this.divStyle}>
        <h1>
          {this.props.title} {this.props.badge}
        </h1>
        {this.props.component}
      </div>
    );
  }
}

export default Panel;
