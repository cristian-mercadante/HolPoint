import React from "react";
import { Button } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";

export default function AddButton(props) {
  return (
    <Button variant="primary" onClick={props.onClick}>
      <FaUserPlus /> Aggiungi
    </Button>
  );
}
