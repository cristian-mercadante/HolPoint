import React, { Component, Fragment } from "react";
import { Card } from "react-bootstrap";

import * as colors from "../../colors";

import axios from "axios";
import { userBasicAPI } from "../../server";
import { ProfileBadge } from "../misc";
import { LinkContainer } from "react-router-bootstrap";

const MAIN_COLOR = colors.RED;

class GroupCard extends Component {
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
        <LinkContainer to={`/group/${this.props.id}`}>
          <Card className="groupCard" style={{ flex: 1 }}>
            <Card.Header>
              <h4>{this.props.name}</h4>
            </Card.Header>
            <Card.Body>
              <h6>Partecipanti</h6>
              {this.state.profilesBaseInfo.map(profile => (
                <ProfileBadge key={`${this.props.id}_${profile.id}`} profile={profile} />
              ))}
            </Card.Body>
            <Card.Footer>
              Creato da {this.state.creatorBaseInfo.username} il {this.props.date_creation}
            </Card.Footer>
          </Card>
        </LinkContainer>
      </Fragment>
    );
  }
}

export default GroupCard;
