import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import logo from "../../assets/imgs/logo.png";
import "./style.css";

class FriendBall extends Component {
  state = {
    selected: false
  };

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
    const src = this.props.friend.picture ? this.props.friend.picture : logo;
    return (
      <Fragment>
        <div style={this.divStyle}>
          {this.props.selectable ? (
            <Image
              src={src}
              className={`profile-pic-medium friend-image ${selectedClassName}`}
              onClick={this.onSelectClick}
            />
          ) : (
            <Link to={`/profile/${this.props.friend.username}`}>
              <Image src={src} className={`profile-pic-medium friend-image ${selectedClassName}`} />
            </Link>
          )}
          <legend style={this.legendStyle}>{this.props.friend.username}</legend>
        </div>
      </Fragment>
    );
  }
}

export default FriendBall;
