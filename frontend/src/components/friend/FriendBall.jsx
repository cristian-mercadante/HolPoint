import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import logo from "../../assets/imgs/logo.png";
import "./style.css";

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

  componentDidMount() {
    this.setState({ selected: this.props.selected });
  }

  onSelectClick = () => {
    const newState = !this.state.selected;

    this.setState({ selected: newState });
    this.props.selectFriend(this.props.friend.id);
  };

  render() {
    const selectedClassName = this.state.selected ? "selected" : "";

    return (
      <Fragment>
        <div style={this.divStyle}>
          {this.props.selectable ? (
            <Image
              src={logo}
              height={this.imgSize}
              width={this.imgSize}
              roundedCircle
              thumbnail
              className={`friend-image ${selectedClassName}`}
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
                className={`friend-image ${selectedClassName}`}
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
