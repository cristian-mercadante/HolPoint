import React, { Component } from "react";
import { Button, InputGroup } from "react-bootstrap";
import "./Comment.css";

export default class AddComment extends Component {
  onClick = () => {
    this.props.addComment(document.getElementById("commentText").value);
    document.getElementById("commentText").value = "";
  };

  render() {
    return (
      <div className="comment">
        <InputGroup className="input-group-prepend">
          <Button variant="success" onClick={this.onClick}>
            Commenta
          </Button>
          <textarea id="commentText" className="form-control" rows="3" />
        </InputGroup>
      </div>
    );
  }
}
