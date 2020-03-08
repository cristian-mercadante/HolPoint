import React, { Component, Fragment } from "react";
import { Card } from "react-bootstrap";

import * as colors from "../../colors";

import CardModal from "../../containers/CardModal";

export const MAIN_COLOR = colors.BLUE;
export const TEXT_COLOR = "#ffffff";
export const DARK_COLOR = colors.DARK_BLUE;

class IdeaCard extends Component {
  state = {
    showUpdate: false
  };

  showUpdate = () => {
    this.setState({ showUpdate: !this.state.showUpdate });
  };

  render() {
    return (
      <Fragment>
        <>
          <style type="text/css">
            {`
            .card{
              color: ${TEXT_COLOR};
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
              background: ${DARK_COLOR};
            }
            .card-body::-webkit-scrollbar-thumb {
              background: ${TEXT_COLOR};
            }
            `}
          </style>
        </>
        <Card onClick={this.showUpdate}>
          <Card.Header>
            <h4>{this.props.title}</h4>
          </Card.Header>
          <Card.Body className="card-body">{this.props.description}</Card.Body>
          <Card.Footer>{this.props.date_creation}</Card.Footer>
        </Card>
        <CardModal
          show={this.state.showUpdate}
          onHide={this.showUpdate}
          backgroundColor={MAIN_COLOR}
          textColor={TEXT_COLOR}
          darkColor={DARK_COLOR}
          header={this.props.title}
          body={this.props.description}
        />
      </Fragment>
    );
  }
}

export default IdeaCard;
