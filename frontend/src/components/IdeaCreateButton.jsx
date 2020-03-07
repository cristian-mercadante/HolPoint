import React, { Component, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import * as cardColors from "./IdeaCard";
import CardModal from "./CardModal";
import IdeaCreateForm from "./IdeaCreateForm";

export default class IdeaCreateButton extends Component {
  state = {
    showCreate: false
  };

  showCreate = () => {
    this.setState({ showCreate: !this.state.showCreate });
  };

  render() {
    return this.props.currentUsername === this.props.username ? (
      <Fragment>
        <Button variant="info" onClick={this.showCreate}>
          Crea idea
        </Button>
        <CardModal
          show={this.state.showCreate}
          onHide={this.showCreate}
          backgroundColor={cardColors.MAIN_COLOR}
          textColor={cardColors.TEXT_COLOR}
          darkColor={cardColors.DARK_COLOR}
          header="Crea idea"
          body={<IdeaCreateForm />}
        />
      </Fragment>
    ) : (
      ""
    );
  }
}
