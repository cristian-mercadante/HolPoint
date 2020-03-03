import React, { Component, Fragment } from "react";
import { Card } from "react-bootstrap";

import * as colors from "../colors";

import { LinkContainer } from "react-router-bootstrap";

const MAIN_COLOR = colors.BLUE;

class IdeaCard extends Component {
  render() {
    return (
      <Fragment>
        <>
          <style type="text/css">
            {`
            .card{
              color: white;
              background-color: ${MAIN_COLOR};
              margin-bottom: 10px;
            }
            .card-body{
              overflow: auto;
              height: 200px;
            }
            .card:hover,
            .card:active,
            .card:focus,
            .card.active {
              opacity: 0.8
            }
            .card-body::-webkit-scrollbar {
              width: 0.25rem;
            }
            .card-body::-webkit-scrollbar-track {
              background: ${colors.DARK_BLUE};
            }
            .card-body::-webkit-scrollbar-thumb {
              background: #ffffff;
            }
            `}
          </style>
        </>
        <LinkContainer to={`/idea/${this.props.id}`}>
          <Card>
            <Card.Header>
              <h4>{this.props.title}</h4>
            </Card.Header>
            <Card.Body className="card-body">{this.props.description}</Card.Body>
            <Card.Footer>{this.props.date_creation}</Card.Footer>
          </Card>
        </LinkContainer>
      </Fragment>
    );
  }
}

export default IdeaCard;
