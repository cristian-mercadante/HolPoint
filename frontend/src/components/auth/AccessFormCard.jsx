import React from "react";
import * as colors from "../../colors";
import { Card } from "react-bootstrap";

const AccessFormCard = props => {
  const cardStyle = {
    backgroundColor: colors.YELLOW
  };

  return (
    <Card style={cardStyle} className="card-login">
      {props.children}
    </Card>
  );
};

export default AccessFormCard;
