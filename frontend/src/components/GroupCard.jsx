import React, { Component, Fragment } from "react";
import { Col, Card, Badge } from "react-bootstrap";

import * as colors from "../colors";

import axios from "axios";
import { userBasicAPI } from "../server";
import ProfileBadge from "./ProfileBadge";

const MAIN_COLOR = colors.RED;
//const LIGHT_COLOR = colors.LIGHT_RED;

class GroupCard extends Component {
  onClick = e => {
    e.preventDefault();
    alert("detail");
  };

  constructor(props) {
    super(props);
    this.state = {
      creatorBaseInfo: {},
      profilesBaseInfo: []
    };
  }

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

  componentDidMount() {
    this.getUserBaseInfo(this.props.creator).then(data => {
      this.setState({ creatorBaseInfo: data });
    });

    this.props.profiles.forEach(profile =>
      this.getUserBaseInfo(profile).then(data => {
        this.setState({ profilesBaseInfo: [...this.state.profilesBaseInfo, data] });
      })
    );
  }

  componentDidUpdate(prevProps, prevState) {}

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
              <Card.Body>
                <h6>Partecipanti</h6>
                {this.state.profilesBaseInfo.map(profile => (
                  <ProfileBadge profile={profile} />
                ))}
              </Card.Body>
              <Card.Footer>
                Creato da {this.state.creatorBaseInfo.username} il {this.props.date_creation}
              </Card.Footer>
            </Card>
          </a>
        </Col>
      </Fragment>
    );
  }
}

export default GroupCard;
