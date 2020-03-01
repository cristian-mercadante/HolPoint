import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Col, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as colors from "../colors";

const MAIN_COLOR = colors.RED;
const LIGHT_COLOR = colors.LIGHT_RED;

class GroupCardEmpty extends Component {
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
              .iconDiv{
                margin: auto;
                font-size: 20px;
                position: block;
              }
            `}
          </style>
        </>
        <Col {...this.props.colProps}>
          <LinkContainer to="/create">
            <Button as={Card} variant="outline" className="groupCard">
              <div className="iconDiv">
                <FaPlus />
              </div>
            </Button>
          </LinkContainer>
        </Col>
      </Fragment>
    );
  }
}

export default withRouter(GroupCardEmpty);
