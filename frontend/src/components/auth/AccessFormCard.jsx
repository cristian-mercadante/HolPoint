import React from "react";
import { Card } from "react-bootstrap";

const AccessFormCard = props => {
  const cardStyle = {
    backgroundColor: "var(--holpoint-yellow)",
  };

  return (
    <Card style={cardStyle} className="card-login">
      {props.children}
    </Card>
  );
};

export default AccessFormCard;
