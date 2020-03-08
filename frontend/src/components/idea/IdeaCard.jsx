import React, { Component, Fragment } from "react";
import { Card } from "react-bootstrap";

import CardModal from "../../containers/CardModal";

import "./style.css";

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
        <Card className="idea-card" onClick={this.showUpdate}>
          <Card.Header>
            <h4>{this.props.title}</h4>
          </Card.Header>
          <Card.Body className="card-body">{this.props.description}</Card.Body>
          <Card.Footer>{this.props.date_creation}</Card.Footer>
        </Card>
        <CardModal
          show={this.state.showUpdate}
          onHide={this.showUpdate}
          type="idea-modal"
          header={this.props.title}
          body={this.props.description}
          editable="true"
        />
      </Fragment>
    );
  }
}

export default IdeaCard;
