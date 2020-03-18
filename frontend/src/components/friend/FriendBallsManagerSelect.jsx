import React, { Component, Fragment } from "react";
import FriendBall from "./FriendBall";
import { Form } from "react-bootstrap";

class FriendBallsManagerSelect extends Component {
  state = {
    friends: []
  };

  componentDidMount() {
    this.setState({ friends: this.props.friends });
  }

  search = () => {
    const f = document.getElementById("search-friend").value;
    const friends = this.props.friends.filter(
      friend => friend.username.includes(f) || this.props.selectedFriends.includes(friend.id)
    );
    this.setState({ friends });
  };

  render() {
    return (
      <Fragment>
        <Form.Control id="search-friend" type="text" placeholder="Cerca per username" onChange={this.search} />
        <div className="d-flex justify-content-center flex-wrap">
          {this.state.friends.map(f => {
            let selected = this.props.selectedFriends.includes(f.id);

            return (
              <FriendBall
                key={f.username}
                friend={f}
                selectable={true}
                selectFriend={this.props.selectFriend}
                selected={selected}
              />
            );
          })}
        </div>
      </Fragment>
    );
  }
}

export default FriendBallsManagerSelect;
