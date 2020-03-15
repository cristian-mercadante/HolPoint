import React from "react";
import { withRouter } from "react-router-dom";

export default withRouter(function SearchResult(props) {
  return (
    <div onClick={() => props.history.push(`/profile/${props.username}`)}>
      <div>
        <span style={{ fontWeight: "bold" }}>{props.username}</span> {props.first_name} {props.last_name}
      </div>
    </div>
  );
});
