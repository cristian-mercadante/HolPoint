import React from "react";
import { Button } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";

export default function WaitButton() {
  return (
    <Button variant="info" disabled>
      <FaUserPlus /> Attesa
    </Button>
  );
}
