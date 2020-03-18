import React, { Fragment } from "react";
import { ProfileBadge } from "../misc";
import { dateToString_or_Null } from "../../dateUtils";

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
          <ProfileBadge profile={p} variant="primary" placement="bottom" />
        ))}
      </div>
      <hr />
      <div className="text-with-newline lead">{props.description}</div>
    </Fragment>
  );
}
