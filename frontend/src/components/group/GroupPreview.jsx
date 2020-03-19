import React, { Fragment } from "react";
import { ProfileBadge } from "../misc";
import { dateToString_or_Null } from "../../dateUtils";
import { Badge } from "react-bootstrap";

export default function GroupPreview(props) {
  return (
    <Fragment>
      <div>
        Creato da: <ProfileBadge profile={props.creator} variant="danger" placement="right" />
      </div>
      <div>Data partenza: {props.dateStart ? dateToString_or_Null(props.dateStart) : "non definita"}</div>
      <div>Data ritorno: {props.dateFinish ? dateToString_or_Null(props.dateFinish) : "non definita"}</div>
      <div>
        Partecipanti:{" "}
        {props.profiles.map(p => (
          <ProfileBadge profile={p} key={p.id} variant="primary" placement="bottom" />
        ))}
      </div>
      <div>
        Idea preferita:{" "}
        <Badge variant="success">{props.prefered_idea ? props.prefered_idea.title : "non definita"}</Badge>
      </div>
      <hr />
      <div className="text-with-newline lead">{props.description}</div>
    </Fragment>
  );
}
