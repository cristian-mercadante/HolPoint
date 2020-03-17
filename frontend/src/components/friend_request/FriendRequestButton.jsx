import React, { Component } from "react";
import { Button, OverlayTrigger, Popover, Spinner } from "react-bootstrap";
import { FaUserFriends, FaRedo, FaCircle } from "react-icons/fa";
import { connect } from "react-redux";
import * as friendRequestActions from "../../actions/friendRequest";
import { FriendRequestItem } from ".";

class FriendRequestButton extends Component {
  state = {
    loading: true,
    receivedRequests: []
  };

  updateRrInState = () => {
    if (this.props.friendRequests.receivedRequests)
      this.setState({ receivedRequests: this.props.friendRequests.receivedRequests });
  };

  componentDidMount() {
    this.updateRrInState();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.friendRequests !== this.props.friendRequests) {
      this.setState({ loading: this.props.friendRequests.loading });
      this.updateRrInState();
    }
  }

  updateList = () => {
    this.setState({ loading: true });
    this.props.loadRequests().then(this.setState({ loading: false }));
  };

  listRequests = () => {
    const receivedRequests = this.props.friendRequests.receivedRequests;
    let buffer = [];
    if (receivedRequests.length !== 0) {
      receivedRequests.forEach(rr => buffer.push(<FriendRequestItem key={rr.id} {...rr} />));
      return (
        <table style={{ tableLayout: "fixed", width: "100%" }}>
          <tbody>{buffer}</tbody>
        </table>
      );
    } else {
      return <div style={{ textAlign: "center" }}>Non ci sono richieste</div>;
    }
  };

  render() {
    const popover = (
      <Popover>
        <Popover.Title as="h3">
          Richieste di amicizia{" "}
          {this.state.loading ? (
            <Spinner className="float-right" size="sm" animation="border" />
          ) : (
            <Button className="float-right" variant="plain" size="sm" onClick={this.updateList}>
              <FaRedo style={{ marginTop: "-10px" }} />
            </Button>
          )}
        </Popover.Title>
        <Popover.Content>{this.listRequests()}</Popover.Content>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="plain" className="ml-2 mr-2">
          <FaUserFriends />
          {this.props.friendRequests.receivedRequests.length !== 0 && (
            <FaCircle className="mb-2" size="0.6em" color="var(--danger)" />
          )}
        </Button>
      </OverlayTrigger>
    );
  }
}

const mapStateToProps = state => {
  return {
    friendRequests: state.friendRequest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRequests: () => dispatch(friendRequestActions.loadRequests())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequestButton);
