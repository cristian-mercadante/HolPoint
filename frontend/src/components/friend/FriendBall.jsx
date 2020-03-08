import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import logo from "../../assets/imgs/logo.png";
import * as colors from "../../colors";

const MAIN_COLOR = colors.YELLOW;
const SELECTED_COLOR = colors.GREEN;

class FriendBall extends Component {
  state = {
    selected: false
  };

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

  onSelectClick = () => {
    const newState = !this.state.selected;

    this.setState({ selected: newState });
    this.props.selectFriend(this.props.friend.id);
  };

  render() {
    const selectedClassName = this.state.selected ? "selected" : "";

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
            .frndImg.selected{
              border-width: 3px;
              border-color: ${SELECTED_COLOR};
            }

          `}
          </style>
        </>
        <div style={this.divStyle}>
          {this.props.selectable ? (
            <Image
              src={logo}
              height={this.imgSize}
              width={this.imgSize}
              roundedCircle
              thumbnail
              className={`frndImg ${selectedClassName}`}
              onClick={this.onSelectClick}
            />
          ) : (
            <Link to={`/profile/${this.props.friend.username}`}>
              <Image
                src={logo}
                height={this.imgSize}
                width={this.imgSize}
                roundedCircle
                thumbnail
                className={`frndImg ${selectedClassName}`}
              />
            </Link>
          )}
          <legend style={this.legendStyle}>{this.props.friend.username}</legend>
        </div>
      </Fragment>
    );
  }
}

export default FriendBall;
