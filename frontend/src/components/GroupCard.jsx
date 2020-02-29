import React, { Component, Fragment } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as colors from "../colors";

import axios from "axios";
import { userBasicAPI } from "../server";

const MAIN_COLOR = colors.RED;
const LIGHT_COLOR = colors.LIGHT_RED;

class GroupCard extends Component {
  onClick = e => {
    e.preventDefault();
    alert("detail");
  };

  state = { creatorBaseInfo: {} };

  async getUserBaseInfo(id) {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    };
    return axios
      .get(`${userBasicAPI}${id}`, headers)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  async componentDidMount() {
    const creatorBaseInfo = await this.getUserBaseInfo(this.props.creator);
    this.setState({ creatorBaseInfo });
  }

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
            .card_header {
              font-size: 20px,
            }
            `}
          </style>
        </>
        <Col {...this.props.colProps}>
          <a href="/#" onClick={this.onClick}>
            <Card className="groupCard">
              <Card.Header>
                <h4>{this.props.name}</h4>
              </Card.Header>
              <Card.Body></Card.Body>
              <Card.Footer>
                Creato il {this.props.date_creation} da {this.state.creatorBaseInfo.username}
              </Card.Footer>
            </Card>
          </a>
        </Col>
      </Fragment>
    );
  }
}

export class EmptyGroupCard extends Component {
  onClick = e => {
    e.preventDefault();
    alert("add");
  };

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
          <Button as={Card} variant="outline" className="groupCard" onClick={this.onClick}>
            <div className="iconDiv">
              <FaPlus />
            </div>
          </Button>
        </Col>
      </Fragment>
    );
  }
}

export default GroupCard;
