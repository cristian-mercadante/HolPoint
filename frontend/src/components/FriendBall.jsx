import React, { Component, Fragment } from "react";
import { Image } from "react-bootstrap";

import logo from "../assets/imgs/logo.png";
import * as colors from "../colors";

const MAIN_COLOR = colors.YELLOW;

class FriendBall extends Component {
  imgSize = 80;

  divStyle = {
    margin: "10px",
    width: `${this.imgSize}px`,
    wordWrap: "break-word"
  };

  legendStyle = {
    textAlign: "center",
    fontSize: "15px"
  };

  onClick = e => {
    e.preventDefault();
    alert("profilo");
  };

  render() {
    return (
      <Fragment>
        <>
          <style type="text/css">
            {`
            .frndImg{
              border-width: 1px;
              border-color: ${MAIN_COLOR};
            }
            .frndImg:hover,
            .frndImg:visited,
            .frndImg:link,
            .frndImg:active,
            .frndImg.active{
              text-decoration: none;
              border-width: 2px;
            }
          `}
          </style>
        </>
        <div style={this.divStyle}>
          <a href="/#" onClick={this.onClick}>
            <Image src={logo} height={this.imgSize} width={this.imgSize} roundedCircle thumbnail className="frndImg" />
          </a>
          <legend style={this.legendStyle}>{this.props.friendname}</legend>
        </div>
      </Fragment>
    );
  }
}

export default FriendBall;
