import React from "react";
import { Button } from "react-bootstrap";
import { FaUserClock } from "react-icons/fa";

export default function WaitButton() {
  return (
    <Button variant="info" disabled>
      <FaUserClock /> Attesa
    </Button>
  );
}
