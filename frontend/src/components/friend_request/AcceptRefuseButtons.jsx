import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function AcceptRefuseButtons(props) {
  return (
    <ButtonGroup>
      <Button variant="success" onClick={() => props.onClick("Acc")} size={props.size}>
        <FaCheck />
        {!props.compact && " Accetta"}
      </Button>
      <Button variant="warning" onClick={() => props.onClick("Ref")} size={props.size}>
        <FaTimes />
        {!props.compact && " Rifiuta"}
      </Button>
    </ButtonGroup>
  );
}
