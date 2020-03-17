import React from "react";
import { Button } from "react-bootstrap";
import { FaUserMinus } from "react-icons/fa";

export default function RemoveButton(props) {
  return (
    <Button variant="danger" onClick={props.onClick}>
      <FaUserMinus /> Rimuovi
    </Button>
  );
}
