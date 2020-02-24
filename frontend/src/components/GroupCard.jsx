import React, { Component, Fragment } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as colors from "../colors";

const MAIN_COLOR = colors.RED;
const LIGHT_COLOR = colors.LIGHT_RED;

class GroupCard extends Component {
  onClick = e => {
    e.preventDefault();
    alert("detail");
  };

  render() {
    return (
      <Fragment>
        <>
          <style type="text/css">
            {`
            a:hover, a:visited, a:link, a:active{
              text-decoration: none;
            }
            .card{
              color: white;
              background-color: ${MAIN_COLOR}
            }
            .card:hover,
            .card:active,
            .card:focus,
            .card.active {
              opacity: 0.8
            }
            `}
          </style>
        </>
        <Col {...this.props.colProps}>
          <a href="/#" onClick={this.onClick}>
            <Card className="groupCard">
              <Card.Header>Titolo</Card.Header>
              <Card.Body>Contenuto</Card.Body>
              <Card.Footer>Partecipanti</Card.Footer>
            </Card>
          </a>
        </Col>
      </Fragment>
    );
  }
}

export class EmptyGroupCard extends GroupCard {
  render() {
    return (
      <Fragment>
        <>
          <style type="text/css">
            {`
            .btn-outline {
              color: ${MAIN_COLOR};
              background-color: white;
              border-color: ${MAIN_COLOR};

            }
            .btn-outline:hover,
            .btn-outline:active,
            .btn-outline:focus,
            .btn-outline.active {
              background: ${LIGHT_COLOR};
              color: ${MAIN_COLOR};
              border-color: ${MAIN_COLOR};
            }
          `}
          </style>
        </>
        <Col {...this.props.colProps}>
          <Button as={Card} variant="outline" className="groupCard" onClick={() => alert("add")}>
            <FaPlus />
          </Button>
        </Col>
      </Fragment>
    );
  }
}

export default GroupCard;
